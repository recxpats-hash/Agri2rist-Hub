/**
 * Agri2rist Hub – Input Validation & Sanitization Library
 * Pure TypeScript – no external validation lib needed.
 * All user-facing inputs must pass through these helpers before storage or display.
 */

// ─── SANITIZATION ────────────────────────────────────────────────────────────

/**
 * Strip HTML tags and dangerous characters to prevent XSS.
 * Use on any free-text user input before storing or rendering as text.
 */
export function sanitizeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/javascript:/gi, "")     // kill JS protocol
    .replace(/on\w+\s*=/gi, "")       // strip event handlers
    .replace(/[<>'"]/g, (c) =>        // HTML-encode remaining specials
      ({ "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c] ?? c)
    )
    .trim();
}

/**
 * Sanitize for safe display inside JSX (returns plain string, not JSX).
 * Use when rendering user-supplied content.
 */
export function sanitizeDisplay(value: string): string {
  return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}

/**
 * Normalise and validate email address.
 */
export function sanitizeEmail(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.toLowerCase().trim().slice(0, 320);
}

/**
 * Clamp a number to a safe integer range.
 */
export function sanitizeNumber(value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

// ─── VALIDATORS ──────────────────────────────────────────────────────────────

export type ValidationResult = { ok: true } | { ok: false; error: string };

const ok = (): ValidationResult => ({ ok: true });
const fail = (error: string): ValidationResult => ({ ok: false, error });

export function validateEmail(email: string): ValidationResult {
  const clean = sanitizeEmail(email);
  if (!clean) return fail("Email is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return fail("Enter a valid email address.");
  return ok();
}

export function validatePassword(password: string): ValidationResult {
  if (!password) return fail("Password is required.");
  if (password.length < 8) return fail("Password must be at least 8 characters.");
  if (password.length > 128) return fail("Password is too long.");
  if (!/[A-Z]/.test(password)) return fail("Password must contain at least one uppercase letter.");
  if (!/[0-9]/.test(password)) return fail("Password must contain at least one number.");
  return ok();
}

export function validateName(name: string): ValidationResult {
  const clean = sanitizeText(name);
  if (!clean) return fail("Name is required.");
  if (clean.length < 2) return fail("Name must be at least 2 characters.");
  if (clean.length > 100) return fail("Name is too long.");
  return ok();
}

export function validatePhone(phone: string): ValidationResult {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) return fail("Enter a valid phone number.");
  return ok();
}

export function validateQuantity(qty: number, min = 1, max = 10000): ValidationResult {
  if (!Number.isInteger(qty) || qty < min) return fail(`Minimum quantity is ${min}.`);
  if (qty > max) return fail(`Maximum quantity is ${max}.`);
  return ok();
}

export function validateRequired(value: string, fieldName = "This field"): ValidationResult {
  if (!sanitizeText(value)) return fail(`${fieldName} is required.`);
  return ok();
}

// ─── COMPOSITE FORM VALIDATORS ───────────────────────────────────────────────

export interface SignupData { name: string; email: string; password: string }
export interface SignupErrors { name?: string; email?: string; password?: string }

export function validateSignupForm(data: SignupData): SignupErrors {
  const errors: SignupErrors = {};
  const nameR = validateName(data.name);
  const emailR = validateEmail(data.email);
  const passR = validatePassword(data.password);
  if (!nameR.ok) errors.name = nameR.error;
  if (!emailR.ok) errors.email = emailR.error;
  if (!passR.ok) errors.password = passR.error;
  return errors;
}

export interface CheckoutData {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  deliveryAddress: string;
  paymentMethod: string;
  notes?: string;
}
export interface CheckoutErrors {
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}

export function validateCheckoutForm(data: CheckoutData): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const nameR = validateName(data.buyerName);
  const emailR = validateEmail(data.buyerEmail);
  const phoneR = validatePhone(data.buyerPhone);
  const addrR = validateRequired(data.deliveryAddress, "Delivery address");
  const pmR = validateRequired(data.paymentMethod, "Payment method");
  if (!nameR.ok) errors.buyerName = nameR.error;
  if (!emailR.ok) errors.buyerEmail = emailR.error;
  if (!phoneR.ok) errors.buyerPhone = phoneR.error;
  if (!addrR.ok) errors.deliveryAddress = addrR.error;
  if (!pmR.ok) errors.paymentMethod = pmR.error;
  return errors;
}
