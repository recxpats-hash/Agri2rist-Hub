import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type AuthUser = {
  name: string;
  email: string;
};

type StoredUser = AuthUser & {
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const USERS_KEY = "agri2rist_users";
const SESSION_KEY = "agri2rist_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login(email, password) {
        const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        const found = users.find(
          (candidate) =>
            candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password
        );
        if (!found) return false;

        const session = { name: found.name, email: found.email };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return true;
      },
      signup(name, email, password) {
        const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        const exists = users.some((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
        if (exists) return false;

        const nextUser = { name, email, password };
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, nextUser]));
        const session = { name, email };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return true;
      },
      logout() {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
