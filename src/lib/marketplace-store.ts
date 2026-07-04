/**
 * Agri2rist Hub – Marketplace Client Store
 * Lightweight localStorage-backed store for cart, wishlist and orders.
 * No external state library needed – pure TypeScript with custom event bus.
 */

import type { CartItem, MarketplaceProduct, MarketplaceOrder, WishlistItem } from "@/types/marketplace";

// ─── STORAGE KEYS ────────────────────────────────────────────────────────────

const KEYS = {
  CART: "a2r_cart",
  WISHLIST: "a2r_wishlist",
  ORDERS: "a2r_orders",
  RECENTLY_VIEWED: "a2r_recent",
} as const;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("a2r:store-changed", { detail: { key } }));
  } catch {
    // storage full or unavailable – fail silently
  }
}

// ─── CART ─────────────────────────────────────────────────────────────────────

export type StoredCartItem = { productId: string; qty: number; addedAt: string };

export function getCartItems(): StoredCartItem[] {
  return read<StoredCartItem[]>(KEYS.CART, []);
}

export function addToCart(product: MarketplaceProduct, qty = 1): void {
  const items = getCartItems();
  const existing = items.find((i) => i.productId === product.id);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, product.stockQty);
  } else {
    items.push({ productId: product.id, qty, addedAt: new Date().toISOString() });
  }
  write(KEYS.CART, items);
}

export function removeFromCart(productId: string): void {
  write(KEYS.CART, getCartItems().filter((i) => i.productId !== productId));
}

export function updateCartQty(productId: string, qty: number): void {
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  const items = getCartItems().map((i) =>
    i.productId === productId ? { ...i, qty } : i
  );
  write(KEYS.CART, items);
}

export function clearCart(): void {
  write(KEYS.CART, []);
}

export function getCartCount(): number {
  return getCartItems().reduce((sum, i) => sum + i.qty, 0);
}

// ─── WISHLIST ─────────────────────────────────────────────────────────────────

export function getWishlist(): WishlistItem[] {
  return read<WishlistItem[]>(KEYS.WISHLIST, []);
}

export function addToWishlist(productId: string): void {
  const items = getWishlist();
  if (!items.find((i) => i.productId === productId)) {
    write(KEYS.WISHLIST, [...items, { productId, addedAt: new Date().toISOString() }]);
  }
}

export function removeFromWishlist(productId: string): void {
  write(KEYS.WISHLIST, getWishlist().filter((i) => i.productId !== productId));
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().some((i) => i.productId === productId);
}

export function toggleWishlist(productId: string): boolean {
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
    return false;
  }
  addToWishlist(productId);
  return true;
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export function getOrders(): MarketplaceOrder[] {
  return read<MarketplaceOrder[]>(KEYS.ORDERS, []);
}

export function saveOrder(order: MarketplaceOrder): void {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.unshift(order);
  }
  write(KEYS.ORDERS, orders);
}

export function getOrderById(id: string): MarketplaceOrder | undefined {
  return getOrders().find((o) => o.id === id);
}

// ─── RECENTLY VIEWED ──────────────────────────────────────────────────────────

export function getRecentlyViewed(limit = 8): string[] {
  return read<string[]>(KEYS.RECENTLY_VIEWED, []).slice(0, limit);
}

export function recordView(productId: string): void {
  const recent = [productId, ...getRecentlyViewed().filter((id) => id !== productId)].slice(0, 20);
  write(KEYS.RECENTLY_VIEWED, recent);
}

// ─── ORDER BUILDER ────────────────────────────────────────────────────────────

export function buildOrderRef(): string {
  return `A2R-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
