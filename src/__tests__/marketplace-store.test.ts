/**
 * Agri2rist Hub – Marketplace Store Tests (cart, wishlist, orders)
 */
import { describe, it, expect, beforeEach } from "vitest";
import {
  addToCart,
  removeFromCart,
  updateCartQty,
  clearCart,
  getCartItems,
  getCartCount,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  toggleWishlist,
  getOrders,
  saveOrder,
  getOrderById,
  buildOrderRef,
  getRecentlyViewed,
  recordView,
} from "@/lib/marketplace-store";
import { getProductById } from "@/data/products";
import type { MarketplaceOrder } from "@/types/marketplace";

// Reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

// ── CART ─────────────────────────────────────────────────────────────────────
describe("Cart", () => {
  const product = getProductById("p-001")!; // Maize (White)

  it("adds a product to cart", () => {
    addToCart(product, 2);
    const items = getCartItems();
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe("p-001");
    expect(items[0].qty).toBe(2);
  });

  it("increments quantity for existing product", () => {
    addToCart(product, 2);
    addToCart(product, 3);
    const items = getCartItems();
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(5);
  });

  it("caps quantity at stockQty", () => {
    addToCart(product, product.stockQty + 1000);
    expect(getCartItems()[0].qty).toBe(product.stockQty);
  });

  it("removes a product from cart", () => {
    addToCart(product, 1);
    removeFromCart("p-001");
    expect(getCartItems()).toHaveLength(0);
  });

  it("updates quantity correctly", () => {
    addToCart(product, 5);
    updateCartQty("p-001", 3);
    expect(getCartItems()[0].qty).toBe(3);
  });

  it("removes item when quantity updated to 0", () => {
    addToCart(product, 1);
    updateCartQty("p-001", 0);
    expect(getCartItems()).toHaveLength(0);
  });

  it("clears all items", () => {
    addToCart(product, 1);
    clearCart();
    expect(getCartItems()).toHaveLength(0);
  });

  it("counts total items across all products", () => {
    const product2 = getProductById("p-002")!;
    addToCart(product, 3);
    addToCart(product2, 2);
    expect(getCartCount()).toBe(5);
  });
});

// ── WISHLIST ─────────────────────────────────────────────────────────────────
describe("Wishlist", () => {
  it("adds a product to wishlist", () => {
    addToWishlist("p-001");
    expect(getWishlist()).toHaveLength(1);
    expect(isInWishlist("p-001")).toBe(true);
  });

  it("does not add duplicate entries", () => {
    addToWishlist("p-001");
    addToWishlist("p-001");
    expect(getWishlist()).toHaveLength(1);
  });

  it("removes a product from wishlist", () => {
    addToWishlist("p-001");
    removeFromWishlist("p-001");
    expect(isInWishlist("p-001")).toBe(false);
  });

  it("toggles wishlist – adds when not present", () => {
    const added = toggleWishlist("p-001");
    expect(added).toBe(true);
    expect(isInWishlist("p-001")).toBe(true);
  });

  it("toggles wishlist – removes when present", () => {
    addToWishlist("p-001");
    const added = toggleWishlist("p-001");
    expect(added).toBe(false);
    expect(isInWishlist("p-001")).toBe(false);
  });

  it("tracks addedAt timestamp", () => {
    addToWishlist("p-001");
    const item = getWishlist()[0];
    expect(item.addedAt).toBeTruthy();
    expect(new Date(item.addedAt).getTime()).toBeLessThanOrEqual(Date.now());
  });
});

// ── ORDERS ────────────────────────────────────────────────────────────────────
describe("Orders", () => {
  const mockOrder: MarketplaceOrder = {
    id: "ord_test001",
    orderRef: "A2R-TEST001",
    buyerId: "user-001",
    buyerName: "James Mukasa",
    buyerEmail: "james@example.com",
    buyerPhone: "+256772100001",
    items: [{
      productId: "p-001",
      productName: "Maize (White)",
      farmerId: "farmer-005",
      farmName: "Community Harvest Cooperative",
      unitOfSale: "kg",
      qty: 50,
      unitPrice: 2500,
      subtotal: 125000,
      image: "/locale/Marketplace/seeds.jpg",
    }],
    subtotal: 125000,
    serviceFee: 3125,
    deliveryFee: 0,
    total: 128125,
    paymentMethod: "mobile_money_mtn",
    paymentStatus: "pending",
    orderStatus: "pending",
    deliveryAddress: "Kampala, Uganda",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("saves and retrieves an order", () => {
    saveOrder(mockOrder);
    const orders = getOrders();
    expect(orders).toHaveLength(1);
    expect(orders[0].id).toBe("ord_test001");
  });

  it("retrieves order by id", () => {
    saveOrder(mockOrder);
    const found = getOrderById("ord_test001");
    expect(found?.orderRef).toBe("A2R-TEST001");
  });

  it("returns undefined for non-existent order", () => {
    expect(getOrderById("nonexistent")).toBeUndefined();
  });

  it("updates existing order on re-save", () => {
    saveOrder(mockOrder);
    saveOrder({ ...mockOrder, orderStatus: "confirmed" });
    const orders = getOrders();
    expect(orders).toHaveLength(1);
    expect(orders[0].orderStatus).toBe("confirmed");
  });

  it("generates unique order refs", () => {
    const refs = new Set(Array.from({ length: 10 }, () => buildOrderRef()));
    expect(refs.size).toBe(10);
  });
});

// ── RECENTLY VIEWED ───────────────────────────────────────────────────────────
describe("Recently Viewed", () => {
  it("records and retrieves viewed product ids", () => {
    recordView("p-001");
    recordView("p-002");
    const recent = getRecentlyViewed();
    expect(recent).toContain("p-001");
    expect(recent).toContain("p-002");
  });

  it("de-duplicates — moves existing id to front", () => {
    recordView("p-001");
    recordView("p-002");
    recordView("p-001"); // view again
    const recent = getRecentlyViewed();
    expect(recent[0]).toBe("p-001");
    expect(recent.filter((id) => id === "p-001")).toHaveLength(1);
  });

  it("respects limit parameter", () => {
    for (let i = 1; i <= 25; i++) recordView(`p-${String(i).padStart(3, "0")}`);
    const recent = getRecentlyViewed(5);
    expect(recent).toHaveLength(5);
  });
});
