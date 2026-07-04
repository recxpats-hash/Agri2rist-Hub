/**
 * Agri2rist Hub – Marketplace Product Card
 */
import { Link } from "react-router-dom";
import { Heart, MapPin, ShoppingCart, Star, Leaf, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import type { MarketplaceProduct } from "@/types/marketplace";

interface ProductCardProps {
  product: MarketplaceProduct;
  className?: string;
}

const GRADE_LABELS: Record<string, string> = {
  premium: "Premium",
  grade_a: "Grade A",
  grade_b: "Grade B",
  grade_c: "Grade C",
  ungraded: "Ungraded",
};

const GRADE_COLORS: Record<string, string> = {
  premium: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  grade_a: "bg-accent-light text-accent border-accent/30",
  grade_b: "bg-muted text-muted-foreground",
  grade_c: "bg-muted text-muted-foreground",
  ungraded: "bg-muted text-muted-foreground",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { add } = useCart();
  const { toggle, inWishlist } = useWishlist();
  const { toast } = useToast();
  const wished = inWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product, 1);
    toast({ title: "Added to cart", description: `${product.name} added to your basket.` });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const added = toggle(product.id);
    toast({
      title: added ? "Added to wishlist" : "Removed from wishlist",
      description: added ? `${product.name} saved to your wishlist.` : `${product.name} removed.`,
    });
  };

  const isOutOfStock = product.availability === "out_of_stock";

  return (
    <Link
      to={`/marketplace/product/${product.id}`}
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-border card-hover flex flex-col",
        className
      )}
      aria-label={`View ${product.name}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 gradient-overlay opacity-30" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isFeatured && (
            <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0.5 font-semibold">
              Featured
            </Badge>
          )}
          {product.isTrending && (
            <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5">
              Trending
            </Badge>
          )}
          {product.organicStatus === "certified_organic" && (
            <Badge className="bg-green-100 text-green-800 border-green-200 text-[10px] px-1.5 py-0.5 flex items-center gap-0.5">
              <Leaf size={8} />
              Organic
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
            wished
              ? "bg-destructive text-destructive-foreground shadow-md"
              : "bg-background/80 text-muted-foreground hover:bg-background hover:text-destructive"
          )}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={14} className={cn(wished && "fill-current")} />
        </button>

        {/* Grade badge bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", GRADE_COLORS[product.grade])}>
            {GRADE_LABELS[product.grade]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-2 flex-1">
            {product.name}
          </h3>
        </div>

        {/* Scientific name */}
        {product.scientificName && (
          <p className="text-xs text-muted-foreground italic mb-1 line-clamp-1">{product.scientificName}</p>
        )}

        {/* Farm + location */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin size={11} className="text-accent flex-shrink-0" />
          <span className="line-clamp-1">{product.farmName} · {product.region}</span>
        </div>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.certifications.slice(0, 2).map((cert) => (
              <span key={cert} className="flex items-center gap-0.5 text-[10px] text-accent bg-accent-light px-1.5 py-0.5 rounded-full">
                <BadgeCheck size={8} />
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
          {product.shortDescription}
        </p>

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-primary font-extrabold text-base leading-tight">
              UGX {product.retailPrice.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">per {product.unitOfSale}</div>
            {product.minimumOrderQty > 1 && (
              <div className="text-xs text-muted-foreground">MOQ: {product.minimumOrderQty}</div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-secondary text-secondary" />
              <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            <Button
              size="sm"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={12} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
