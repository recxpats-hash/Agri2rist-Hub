/**
 * Agri2rist Hub – Validation Library Tests
 */
import { describe, it, expect } from "vitest";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizeNumber,
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateQuantity,
  validateSignupForm,
  validateCheckoutForm,
} from "@/lib/validation";

// ── sanitizeText ─────────────────────────────────────────────────────────────
describe("sanitizeText", () => {
  it("strips HTML tags", () => {
    expect(sanitizeText("<script>alert(1)</script>hello")).not.toContain("<script>");
  });
  it("removes javascript: protocol", () => {
    expect(sanitizeText("javascript:alert(1)")).not.toContain("javascript:");
  });
  it("removes event handlers", () => {
    expect(sanitizeText('onclick="bad()"')).not.toContain("onclick");
  });
  it("trims whitespace", () => {
    expect(sanitizeText("  hello  ")).toBe("hello");
  });
  it("returns empty string for non-string input", () => {
    expect(sanitizeText(null as unknown as string)).toBe("");
    expect(sanitizeText(42 as unknown as string)).toBe("");
  });
});

// ── sanitizeEmail ────────────────────────────────────────────────────────────
describe("sanitizeEmail", () => {
  it("lowercases", () => {
    expect(sanitizeEmail("User@EXAMPLE.COM")).toBe("user@example.com");
  });
  it("trims", () => {
    expect(sanitizeEmail("  user@example.com  ")).toBe("user@example.com");
  });
  it("truncates at 320 chars", () => {
    expect(sanitizeEmail("a".repeat(400))).toHaveLength(320);
  });
});

// ── sanitizeNumber ───────────────────────────────────────────────────────────
describe("sanitizeNumber", () => {
  it("clamps below min", () => expect(sanitizeNumber(-5, 0, 100)).toBe(0));
  it("clamps above max", () => expect(sanitizeNumber(200, 0, 100)).toBe(100));
  it("returns min for NaN", () => expect(sanitizeNumber("abc", 0, 100)).toBe(0));
  it("floors decimals", () => expect(sanitizeNumber(4.9, 0, 100)).toBe(4));
});

// ── validateEmail ────────────────────────────────────────────────────────────
describe("validateEmail", () => {
  it("accepts valid email", () => expect(validateEmail("test@example.com").ok).toBe(true));
  it("rejects empty", () => expect(validateEmail("").ok).toBe(false));
  it("rejects no @", () => expect(validateEmail("notanemail").ok).toBe(false));
  it("rejects missing TLD", () => expect(validateEmail("user@domain").ok).toBe(false));
});

// ── validatePassword ─────────────────────────────────────────────────────────
describe("validatePassword", () => {
  it("accepts strong password", () => expect(validatePassword("Passw0rd!").ok).toBe(true));
  it("rejects empty", () => expect(validatePassword("").ok).toBe(false));
  it("rejects too short", () => expect(validatePassword("Abc1").ok).toBe(false));
  it("rejects no uppercase", () => expect(validatePassword("password1").ok).toBe(false));
  it("rejects no number", () => expect(validatePassword("Password").ok).toBe(false));
  it("rejects too long", () => expect(validatePassword("A1" + "x".repeat(200)).ok).toBe(false));
});

// ── validateName ─────────────────────────────────────────────────────────────
describe("validateName", () => {
  it("accepts valid name", () => expect(validateName("John Doe").ok).toBe(true));
  it("rejects empty", () => expect(validateName("").ok).toBe(false));
  it("rejects single char", () => expect(validateName("A").ok).toBe(false));
  it("rejects too long", () => expect(validateName("A".repeat(101)).ok).toBe(false));
});

// ── validatePhone ────────────────────────────────────────────────────────────
describe("validatePhone", () => {
  it("accepts Uganda number", () => expect(validatePhone("+256772100001").ok).toBe(true));
  it("accepts formatted number", () => expect(validatePhone("+256 772 100 001").ok).toBe(true));
  it("rejects too short", () => expect(validatePhone("12345").ok).toBe(false));
  it("rejects too long", () => expect(validatePhone("1".repeat(16)).ok).toBe(false));
});

// ── validateQuantity ─────────────────────────────────────────────────────────
describe("validateQuantity", () => {
  it("accepts valid qty", () => expect(validateQuantity(5, 1, 100).ok).toBe(true));
  it("rejects below min", () => expect(validateQuantity(0, 1, 100).ok).toBe(false));
  it("rejects above max", () => expect(validateQuantity(101, 1, 100).ok).toBe(false));
  it("rejects decimal", () => expect(validateQuantity(1.5, 1, 100).ok).toBe(false));
});

// ── validateSignupForm ───────────────────────────────────────────────────────
describe("validateSignupForm", () => {
  it("returns empty errors for valid data", () => {
    const errs = validateSignupForm({
      name: "James Mukasa",
      email: "james@example.com",
      password: "Passw0rd!",
    });
    expect(Object.keys(errs)).toHaveLength(0);
  });

  it("returns all three errors for empty data", () => {
    const errs = validateSignupForm({ name: "", email: "", password: "" });
    expect(errs.name).toBeTruthy();
    expect(errs.email).toBeTruthy();
    expect(errs.password).toBeTruthy();
  });

  it("returns only email error for bad email", () => {
    const errs = validateSignupForm({
      name: "James Mukasa",
      email: "notvalid",
      password: "Passw0rd!",
    });
    expect(errs.email).toBeTruthy();
    expect(errs.name).toBeUndefined();
    expect(errs.password).toBeUndefined();
  });
});

// ── validateCheckoutForm ─────────────────────────────────────────────────────
describe("validateCheckoutForm", () => {
  const valid = {
    buyerName: "Grace Namirembe",
    buyerEmail: "grace@example.com",
    buyerPhone: "+256772100003",
    deliveryAddress: "Mukono, Central Uganda",
    paymentMethod: "mobile_money_mtn",
  };

  it("returns no errors for valid form", () => {
    expect(Object.keys(validateCheckoutForm(valid))).toHaveLength(0);
  });

  it("flags missing delivery address", () => {
    const errs = validateCheckoutForm({ ...valid, deliveryAddress: "" });
    expect(errs.deliveryAddress).toBeTruthy();
  });

  it("flags missing payment method", () => {
    const errs = validateCheckoutForm({ ...valid, paymentMethod: "" });
    expect(errs.paymentMethod).toBeTruthy();
  });
});
