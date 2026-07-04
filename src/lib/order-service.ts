/**
 * Agri2rist Hub – Order Service
 * Handles order creation, validation, storage and status management.
 */

import type { MarketplaceOrder, OrderItem, OrderStatus } from "@/types/marketplace";
import type { CartEntry } from "@/hooks/use-cart";
import type { CheckoutData } from "@/lib/validation";
import { sanitizeText, sanitizeEmail, sanitizeNumber } from "@/lib/validation";
import { buildOrderRef, saveOrder, getOrders, clearCart } from "@/lib/marketplace-store";

// ─── CREATE ORDER ─────────────────────────────────────────────────────────────

export interface CreateOrderInput extends CheckoutData {
  buyerId: string;
  cartItems: CartEntry[];
}

export interface CreateOrderResult {
  ok: boolean;
  order?: MarketplaceOrder;
  error?: string;
}

export function createOrder(input: CreateOrderInput): CreateOrderResult {
  const { cartItems, buyerId } = input;

  if (!cartItems.length) {
    return { ok: false, error: "Cart is empty." };
  }

  // Validate each item is still available
  for (const item of cartItems) {
    if (item.product.listingStatus !== "active") {
      return { ok: false, error: `${item.product.name} is no longer available.` };
    }
    if (item.qty > item.product.stockQty) {
      return {
        ok: false,
        error: `Insufficient stock for ${item.product.name}. Only ${item.product.stockQty} ${item.product.unitOfSale} available.`,
      };
    }
    if (item.qty < item.product.minimumOrderQty) {
      return {
        ok: false,
        error: `Minimum order for ${item.product.name} is ${item.product.minimumOrderQty} ${item.product.unitOfSale}.`,
      };
    }
  }

  // Build order items
  const items: OrderItem[] = cartItems.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    farmerId: item.product.farmerId,
    farmName: item.product.farmName,
    unitOfSale: item.product.unitOfSale,
    qty: sanitizeNumber(item.qty, 1, 100000),
    unitPrice: item.product.retailPrice,
    subtotal: item.product.retailPrice * item.qty,
    image: item.product.images[0] ?? "",
  }));

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const serviceFee = Math.round(subtotal * 0.025);
  const deliveryFee = 0; // Set per region in future
  const total = subtotal + serviceFee + deliveryFee;

  const order: MarketplaceOrder = {
    id: `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    orderRef: buildOrderRef(),
    buyerId: sanitizeText(buyerId),
    buyerName: sanitizeText(input.buyerName),
    buyerEmail: sanitizeEmail(input.buyerEmail),
    buyerPhone: sanitizeText(input.buyerPhone),
    items,
    subtotal,
    serviceFee,
    deliveryFee,
    total,
    paymentMethod: sanitizeText(input.paymentMethod),
    paymentStatus: "pending",
    orderStatus: "pending",
    deliveryAddress: sanitizeText(input.deliveryAddress),
    notes: input.notes ? sanitizeText(input.notes).slice(0, 500) : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveOrder(order);
  clearCart();

  return { ok: true, order };
}

// ─── ORDER QUERIES ─────────────────────────────────────────────────────────────

export function getOrdersByBuyer(buyerId: string): MarketplaceOrder[] {
  return getOrders().filter((o) => o.buyerId === buyerId);
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): boolean {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return false;
  order.orderStatus = status;
  order.updatedAt = new Date().toISOString();
  saveOrder(order);
  return true;
}

// ─── PAYMENT METHODS ─────────────────────────────────────────────────────────

export const PAYMENT_METHODS = [
  { value: "mobile_money_mtn",   label: "MTN Mobile Money",      icon: "📱" },
  { value: "mobile_money_airtel", label: "Airtel Money",          icon: "📱" },
  { value: "bank_transfer",       label: "Bank Transfer",          icon: "🏦" },
  { value: "cash_on_delivery",    label: "Cash on Delivery",       icon: "💵" },
  { value: "card",                label: "Debit / Credit Card",    icon: "💳" },
] as const;
