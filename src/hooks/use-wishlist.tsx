/**
 * Agri2rist Hub – Wishlist Hook
 */
import { useCallback, useEffect, useState } from "react";
import {
  getWishlist,
  toggleWishlist,
  isInWishlist,
} from "@/lib/marketplace-store";

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const sync = useCallback(() => {
    setWishlistIds(getWishlist().map((i) => i.productId));
  }, []);

  useEffect(() => {
    sync();
    const handler = () => sync();
    window.addEventListener("a2r:store-changed", handler);
    return () => window.removeEventListener("a2r:store-changed", handler);
  }, [sync]);

  const toggle = useCallback((productId: string): boolean => {
    return toggleWishlist(productId);
  }, []);

  const inWishlist = useCallback((productId: string): boolean => {
    return isInWishlist(productId);
  }, []);

  return { wishlistIds, count: wishlistIds.length, toggle, inWishlist };
}
