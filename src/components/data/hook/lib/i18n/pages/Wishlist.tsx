/**
 * Agri2rist Hub – Wishlist Page
 */
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { getProductById } from "@/data/products";
import type { MarketplaceProduct } from "@/types/marketplace";

export default function WishlistPage() {
  const { wishlistIds, toggle } = useWishlist();
  const { add } = useCart();
  const { toast } = useToast();

  const products = wishlistIds
    .map((id) => getProductById(id))
    .filter((p): p is MarketplaceProduct => Boolean(p));

  const addAllToCart = () => {
    products.forEach((p) => add(p, p.minimumOrderQty));
    toast({ title: "Added to cart", description: `${products.length} items added to your cart.` });
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-extrabold text-primary-foreground flex items-center gap-3">
                <Heart size={28} className="fill-secondary text-secondary" />
                My Wishlist
              </h1>
              <p className="text-primary-foreground/70 mt-1">
                {products.length} saved product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
            {products.length > 0 && (
              <div className="flex gap-3">
                <Button
                  onClick={addAllToCart}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-gold"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add All to Cart
                </Button>
                <Link to="/marketplace">
                  <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                    Continue Shopping <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={56} className="mx-auto text-muted-foreground/20 mb-5" />
              <h2 className="text-2xl font-bold text-foreground mb-3">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Browse the marketplace and click the heart icon to save products.
              </p>
              <Link to="/marketplace">
                <Button className="bg-primary text-primary-foreground">
                  Browse Marketplace <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Action bar */}
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {products.length} item{products.length !== 1 ? "s" : ""} saved
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    wishlistIds.forEach((id) => toggle(id));
                    toast({ title: "Wishlist cleared" });
                  }}
                  className="text-muted-foreground hover:text-destructive text-xs"
                >
                  <Trash2 size={12} className="mr-1" /> Clear Wishlist
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
