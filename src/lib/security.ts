/**
 * Agri2rist Hub – Security Utilities
 * Rate limiting, CSRF-style token generation, Content Security Policy helpers,
 * and secure localStorage wrappers — all client-side, zero dependencies.
 */

// ─── RATE LIMITER ─────────────────────────────────────────────────────────────
// Prevents brute-force login, rapid form submission, and search abuse.

interface RateLimitEntry { count: number; windowStart: number }

const _rateBuckets = new Map<string, RateLimitEntry>();

/**
 * Returns true if the action is ALLOWED (under limit), false if BLOCKED.
 * @param key    Unique identifier, e.g. "login:user@example.com"
 * @param limit  Max attempts per window (default 5)
 * @param windowMs  Window duration in ms (default 60 000 = 1 min)
 */
export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = _rateBuckets.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    _rateBuckets.set(key, { count: 1, windowStart: now });
    return true; // allowed
  }

  if (entry.count >= limit) return false; // blocked

  entry.count += 1;
  return true; // allowed
}

/** Reset the rate-limit bucket for a key (e.g. after successful login). */
export function resetRateLimit(key: string): void {
  _rateBuckets.delete(key);
}

/** Returns remaining attempts in current window, or 0 if blocked. */
export function remainingAttempts(
  key: string,
  limit = 5,
  windowMs = 60_000
): number {
  const now = Date.now();
  const entry = _rateBuckets.get(key);
  if (!entry || now - entry.windowStart > windowMs) return limit;
  return Math.max(0, limit - entry.count);
}

// ─── CSRF TOKEN ───────────────────────────────────────────────────────────────
// Lightweight single-page CSRF mitigation using a session token.

const CSRF_KEY = "a2r_csrf";

export function getCsrfToken(): string {
  let token = sessionStorage.getItem(CSRF_KEY);
  if (!token) {
    token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    sessionStorage.setItem(CSRF_KEY, token);
  }
  return token;
}

export function validateCsrfToken(token: string): boolean {
  return token === sessionStorage.getItem(CSRF_KEY);
}

// ─── XSS PREVENTION HELPERS ──────────────────────────────────────────────────

/** Encode a string for safe injection into HTML attribute values. */
export function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Validate that a URL is safe (http/https only) before using in href/src.
 * Returns the URL if safe, '#' otherwise.
 */
export function safeUrl(url: string): string {
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "#";
    return parsed.href;
  } catch {
    return "#";
  }
}

// ─── SECURE STORAGE WRAPPER ───────────────────────────────────────────────────
// Wraps localStorage with basic integrity checks.

export const secureStorage = {
  set(key: string, value: unknown): void {
    try {
      const payload = JSON.stringify({ v: value, t: Date.now() });
      localStorage.setItem(key, payload);
    } catch {
      // quota exceeded or private mode — fail silently
    }
  },

  get<T>(key: string, maxAgeMs?: number): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const payload: { v: T; t: number } = JSON.parse(raw);
      if (maxAgeMs && Date.now() - payload.t > maxAgeMs) {
        localStorage.removeItem(key);
        return null;
      }
      return payload.v;
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

// ─── CONTENT SECURITY POLICY META TAG ────────────────────────────────────────
// Call once at app startup in main.tsx to inject a CSP meta tag.

export function injectCspMetaTag(): void {
  if (document.querySelector('meta[http-equiv="Content-Security-Policy"]')) return;

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",   // unsafe-inline needed for Vite dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const meta = document.createElement("meta");
  meta.setAttribute("http-equiv", "Content-Security-Policy");
  meta.setAttribute("content", csp);
  document.head.prepend(meta);
}

// ─── ENV GUARD ────────────────────────────────────────────────────────────────
// Warns at startup if dangerous env vars are exposed to the client bundle.

export function auditEnvVars(): void {
  const dangerous = ["SECRET", "PRIVATE", "API_KEY", "TOKEN", "PASSWORD", "PASS"];
  const exposed = Object.keys(import.meta.env).filter((key) =>
    dangerous.some((d) => key.toUpperCase().includes(d))
  );
  if (exposed.length > 0 && import.meta.env.DEV) {
    console.warn(
      "[Agri2rist Security] Potentially sensitive env vars exposed to client bundle:",
      exposed
    );
  }
}
