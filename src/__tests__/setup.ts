/**
 * Agri2rist Hub – Vitest Global Setup
 * Polyfills and mocks needed for jsdom environment.
 */
import { vi } from "vitest";

// ── localStorage mock ─────────────────────────────────────────────────────────
const store: Record<string, string> = {};
const localStorageMock = {
  getItem:    (key: string) => store[key] ?? null,
  setItem:    (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear:      () => { Object.keys(store).forEach((k) => delete store[k]); },
  get length() { return Object.keys(store).length; },
  key: (i: number) => Object.keys(store)[i] ?? null,
};
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

// ── sessionStorage mock ───────────────────────────────────────────────────────
const sessionStore: Record<string, string> = {};
const sessionStorageMock = {
  getItem:    (key: string) => sessionStore[key] ?? null,
  setItem:    (key: string, value: string) => { sessionStore[key] = value; },
  removeItem: (key: string) => { delete sessionStore[key]; },
  clear:      () => { Object.keys(sessionStore).forEach((k) => delete sessionStore[k]); },
  get length() { return Object.keys(sessionStore).length; },
  key: (i: number) => Object.keys(sessionStore)[i] ?? null,
};
Object.defineProperty(globalThis, "sessionStorage", { value: sessionStorageMock });

// ── crypto.subtle mock (SHA-256 hash) ─────────────────────────────────────────
Object.defineProperty(globalThis, "crypto", {
  value: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
      return arr;
    },
    subtle: {
      digest: vi.fn(async (_algo: string, data: ArrayBuffer) => {
        // Simple deterministic mock: return reversed bytes
        const view = new Uint8Array(data);
        return new Uint8Array(view).reverse().buffer;
      }),
    },
  },
});

// ── window.dispatchEvent mock ─────────────────────────────────────────────────
if (!globalThis.window) {
  (globalThis as unknown as Record<string, unknown>).window = globalThis;
}

// ── import.meta.env mock ──────────────────────────────────────────────────────
(globalThis as unknown as Record<string, unknown>).import = {
  meta: { env: { DEV: true, MODE: "test" } },
};
