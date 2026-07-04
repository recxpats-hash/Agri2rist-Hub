/**
 * Agri2rist Hub – Shopping Cart Hook
 */
import { useCallback, useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  getCartItems,
  getCartCount,
  removeFromCart,
  updateCartQty,
  type StoredCartItem,
} from "@/lib/marketplace-store";
import { getProductById, MASTER_CATALOG } from "@/data/products";
import type { MarketplaceProduct } from "@/types/marketplace";

export type CartEntry = StoredCartItem & { product: MarketplaceProduct };

export function useCart() {
  const [items, setItems] = useState<CartEntry[]>([]);

  const sync = useCallback(() => {
    const stored = getCartItems();
    const entries: CartEntry[] = [];
    for (const item of stored) {
      const product = getProductById(item.productId);
      if (product) entries.push({ ...item, product });
    }
    setItems(entries);
  }, []);

  useEffect(() => {
    sync();
    const handler = () => sync();
    window.addEventListener("a2r:store-changed", handler);
    return () => window.removeEventListener("a2r:store-changed", handler);
  }, [sync]);

  const add = useCallback((product: MarketplaceProduct, qty = 1) => {
    addToCart(product, qty);
  }, []);

  const remove = useCallback((productId: string) => {
    removeFromCart(productId);
  }, []);

  const update = useCallback((productId: string, qty: number) => {
    updateCartQty(productId, qty);
  }, []);

  const clear = useCallback(() => {
    clearCart();
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.product.retailPrice * i.qty, 0);
  const serviceFee = items.length > 0 ? Math.round(subtotal * 0.025) : 0;
  const total = subtotal + serviceFee;
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, count, subtotal, serviceFee, total, add, remove, update, clear };
}
