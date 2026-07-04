/**
 * Agri2rist Hub – Auth Hook (upgraded)
 * Adds: role support, password hashing (SHA-256 via SubtleCrypto),
 * session expiry, and sanitized inputs.
 *
 * Existing sign-up / login API is backward-compatible.
 */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { UserRole } from "@/types/marketplace";
import { sanitizeEmail, sanitizeText } from "@/lib/validation";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  membershipTier: string;
  joinedAt: string;
};

type StoredUser = AuthUser & {
  passwordHash: string;
  /** Legacy: plain password kept for backward compat during transition */
  password?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAdmin: boolean;
  isFarmer: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<AuthUser, "name" | "role" | "membershipTier">>) => void;
};

// ─── STORAGE KEYS ─────────────────────────────────────────────────────────────

const USERS_KEY   = "agri2rist_users";
const SESSION_KEY = "agri2rist_session";
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── HARDCODED ADMIN ACCOUNT ─────────────────────────────────────────────────

const ADMIN_EMAIL = "agri2rist@gmail.com";
const ADMIN_PASSWORD = "Admin@agri2rist";
const ADMIN_NAME = "Agri2rist Admin";

// ─── CRYPTO HELPERS ───────────────────────────────────────────────────────────

async function hashPassword(password: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    // Fallback: simple obfuscation (dev / old browsers)
    return btoa(password + "a2r_salt_2025");
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "a2r_salt_2025");
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateId(): string {
  return `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Seed the hardcoded admin account — always ensure it exists
  useEffect(() => {
    (async () => {
      const passwordHash = await hashPassword(ADMIN_PASSWORD);
      const users: StoredUser[] = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );
      // Remove any stale admin entries (old email or mismatched hash)
      const filtered = users.filter(
        (u) => u.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
      );
      const existingAdmin = filtered.find(
        (u) => u.id === "u_admin_agri2rist"
      );
      // Only add if not already present with correct hash
      if (!existingAdmin || existingAdmin.passwordHash !== passwordHash) {
        const adminUser: StoredUser = {
          id: "u_admin_agri2rist",
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          passwordHash,
          role: "admin",
          membershipTier: "enterprise",
          joinedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          USERS_KEY,
          JSON.stringify([...filtered.filter((u) => u.id !== "u_admin_agri2rist"), adminUser])
        );
      }
    })();
  }, []);

  // Restore session on mount, check TTL
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed: { data: AuthUser; expiresAt: number } = JSON.parse(raw);
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        return;
      }
      setUser(parsed.data);
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const saveSession = (u: AuthUser) => {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ data: u, expiresAt: Date.now() + SESSION_TTL })
    );
    setUser(u);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAdmin: user?.role === "admin",
      isFarmer: user?.role === "farmer",

      async login(email, password) {
        const clean = sanitizeEmail(email);
        if (!clean) return false;
        const users: StoredUser[] = JSON.parse(
          localStorage.getItem(USERS_KEY) || "[]"
        );
        const found = users.find(
          (u) => u.email.toLowerCase() === clean
        );
        if (!found) return false;

        // Support legacy plain-password entries
        const incomingHash = await hashPassword(password);
        const legacyMatch = found.password === password;
        const hashMatch = found.passwordHash === incomingHash;
        if (!hashMatch && !legacyMatch) return false;

        // Upgrade legacy entry in place
        if (legacyMatch && !hashMatch) {
          found.passwordHash = incomingHash;
          delete found.password;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }

        const session: AuthUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role ?? "buyer",
          membershipTier: found.membershipTier ?? "free",
          joinedAt: found.joinedAt ?? new Date().toISOString(),
        };
        saveSession(session);
        return true;
      },

      async signup(name, email, password, _role = "buyer") {
        const cleanName  = sanitizeText(name);
        const cleanEmail = sanitizeEmail(email);
        if (!cleanName || !cleanEmail || !password) return false;

        // Block signup with the admin email
        if (cleanEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return false;

        const users: StoredUser[] = JSON.parse(
          localStorage.getItem(USERS_KEY) || "[]"
        );
        const exists = users.some(
          (u) => u.email.toLowerCase() === cleanEmail
        );
        if (exists) return false;

        const passwordHash = await hashPassword(password);
        const newUser: StoredUser = {
          id: generateId(),
          name: cleanName,
          email: cleanEmail,
          passwordHash,
          role: "buyer", // Regular users are always buyers
          membershipTier: "free",
          joinedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          USERS_KEY,
          JSON.stringify([...users, newUser])
        );
        const session: AuthUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          membershipTier: newUser.membershipTier,
          joinedAt: newUser.joinedAt,
        };
        saveSession(session);
        return true;
      },

      logout() {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      },

      updateProfile(updates) {
        if (!user) return;
        const updated: AuthUser = { ...user, ...updates };
        saveSession(updated);
        // Also update the stored users array
        const users: StoredUser[] = JSON.parse(
          localStorage.getItem(USERS_KEY) || "[]"
        );
        const idx = users.findIndex((u) => u.id === user.id);
        if (idx >= 0) {
          users[idx] = { ...users[idx], ...updates };
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
