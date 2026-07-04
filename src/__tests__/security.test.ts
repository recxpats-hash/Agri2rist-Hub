/**
 * Agri2rist Hub – Security Utilities Tests
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  checkRateLimit,
  resetRateLimit,
  remainingAttempts,
  escapeHtmlAttr,
  safeUrl,
} from "@/lib/security";

beforeEach(() => {
  // Rate limiter uses an in-memory Map; reset between tests by key
  resetRateLimit("test:key");
});

// ── Rate Limiter ─────────────────────────────────────────────────────────────
describe("checkRateLimit", () => {
  it("allows first attempt", () => {
    expect(checkRateLimit("rl:test1", 3)).toBe(true);
  });

  it("allows up to the limit", () => {
    for (let i = 0; i < 3; i++) checkRateLimit("rl:test2", 3);
    // 4th attempt should be blocked
    expect(checkRateLimit("rl:test2", 3)).toBe(false);
  });

  it("blocks after limit exceeded", () => {
    const key = "rl:test3";
    for (let i = 0; i < 5; i++) checkRateLimit(key, 5);
    expect(checkRateLimit(key, 5)).toBe(false);
  });

  it("resets after calling resetRateLimit", () => {
    const key = "rl:test4";
    for (let i = 0; i < 5; i++) checkRateLimit(key, 5);
    resetRateLimit(key);
    expect(checkRateLimit(key, 5)).toBe(true);
  });
});

describe("remainingAttempts", () => {
  it("returns full limit when no attempts made", () => {
    expect(remainingAttempts("rem:test1", 5)).toBe(5);
  });

  it("decrements correctly", () => {
    const key = "rem:test2";
    checkRateLimit(key, 5);
    checkRateLimit(key, 5);
    expect(remainingAttempts(key, 5)).toBe(3);
  });

  it("returns 0 when blocked", () => {
    const key = "rem:test3";
    for (let i = 0; i < 5; i++) checkRateLimit(key, 5);
    expect(remainingAttempts(key, 5)).toBe(0);
  });
});

// ── XSS Prevention ───────────────────────────────────────────────────────────
describe("escapeHtmlAttr", () => {
  it("escapes double quotes", () => {
    expect(escapeHtmlAttr('"alert"')).toBe("&quot;alert&quot;");
  });
  it("escapes single quotes", () => {
    expect(escapeHtmlAttr("it's")).toBe("it&#39;s");
  });
  it("escapes < and >", () => {
    expect(escapeHtmlAttr("<script>")).toBe("&lt;script&gt;");
  });
  it("escapes ampersands", () => {
    expect(escapeHtmlAttr("a&b")).toBe("a&amp;b");
  });
  it("leaves safe strings untouched", () => {
    expect(escapeHtmlAttr("hello world")).toBe("hello world");
  });
});

// ── URL Validation ────────────────────────────────────────────────────────────
describe("safeUrl", () => {
  it("allows https URLs", () => {
    expect(safeUrl("https://example.com")).toBe("https://example.com/");
  });
  it("allows http URLs", () => {
    const result = safeUrl("http://example.com");
    expect(result).not.toBe("#");
  });
  it("blocks javascript: protocol", () => {
    expect(safeUrl("javascript:alert(1)")).toBe("#");
  });
  it("blocks data: protocol", () => {
    expect(safeUrl("data:text/html,<h1>XSS</h1>")).toBe("#");
  });
  it("returns # for invalid URLs", () => {
    expect(safeUrl("not a url!!!")).toBe("#");
  });
});
