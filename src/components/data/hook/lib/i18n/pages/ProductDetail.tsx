/**
 * Agri2rist Hub – Product Detail Page
 */
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft, Heart, ShoppingCart, Star, MapPin, BadgeCheck, Leaf,
  Truck, Package, Calendar, Thermometer, Info, Share2, Minus, Plus,
  ArrowRight, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CartSidebar } from "@/components/marketplace/CartSidebar";
import { getProductById, getProductsByCategory } from "@/data/products";
import { getFarmerById } from "@/data/farmers";
import { getCategoryById } from "@/data/categories";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const GRADE_LABELS: Record<string, string> = {
  premium: "Premium", grade_a: "Grade A", grade_b: "Grade B", grade_c: "Grade C", ungraded: "Ungraded",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  in_stock: "In Stock", out_of_stock: "Out of Stock", pre_order: "Pre-Order",
  seasonal: "Seasonal", limited: "Limited Stock",
};

const AVAILABILITY_COLORS: Record<string, string> = {
  in_stock: "text-green-600", out_of_stock: "text-destructive",
  pre_order: "text-secondary", seasonal: "text-accent", limited: "text-orange-600",
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { add } = useCart();
  const { toggle, inWishlist } = useWishlist();

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const product = id ? getProductById(id) : undefined;
  const farmer = product ? getFarmerById(product.farmerId) : undefined;
  const category = product ? getCategoryById(product.categoryId) : undefined;
  const related = product
    ? getProductsByCategory(product.categoryId)
        .filter((p) => p.id !== product.id && p.listingStatus === "active")
        .slice(0, 4)
    : [];

  const wished = product ? inWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    add(product, qty);
    toast({ title: "Added to cart", description: `${qty}x ${product.name} added to your basket.` });
    setCartOpen(true);
  };

  const handleWishlist = () => {
    if (!product) return;
    const added = toggle(product.id);
    toast({
      title: added ? "Added to wishlist" : "Removed from wishlist",
      description: added ? `${product.name} saved.` : `${product.name} removed.`,
    });
  };

  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
          <Link to="/marketplace"><Button>Back to Marketplace</Button></Link>
        </div>
      </PageLayout>
    );
  }

  const isOutOfStock = product.availability === "out_of_stock";

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChevronLeft size={14} /> Back
          </button>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-primary">Marketplace</Link>
          {category && (<><span>/</span><span className="text-foreground">{category.name}</span></>)}
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square mb-3">
                <img
                  src={product.images[selectedImage] ?? product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {product.organicStatus === "certified_organic" && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600/90 text-white border-green-600 flex items-center gap-1 shadow-sm backdrop-blur-sm">
                      <Leaf size={12} /> Certified Organic
                    </Badge>
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                        i === selectedImage ? "border-primary" : "border-border hover:border-primary/50"
                      )}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              {/* Name + badges */}
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.isFeatured && <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>}
                  {product.isTrending && <Badge className="bg-accent text-accent-foreground">Trending</Badge>}
                  <Badge variant="outline">{GRADE_LABELS[product.grade]}</Badge>
                </div>
                <h1 className="text-3xl font-extrabold text-foreground mb-1 break-words" title={product.name}>{product.name}</h1>
                {product.scientificName && (
                  <p className="text-base text-muted-foreground italic">{product.scientificName}</p>
                )}
                {product.variety && (
                  <p className="text-sm text-muted-foreground">Variety: <span className="font-medium text-foreground">{product.variety}</span></p>
                )}
              </div>

              {/* SKU + Availability */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">SKU: <span className="font-mono text-foreground">{product.sku}</span></span>
                <span className={cn("font-semibold", AVAILABILITY_COLORS[product.availability])}>
                  {AVAILABILITY_LABELS[product.availability]}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={cn("transition-colors", i < Math.round(product.rating) ? "fill-secondary text-secondary" : "text-muted")} />
                  ))}
                </div>
                <span className="font-semibold text-sm">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Pricing */}
              <div className="bg-muted rounded-xl p-4 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-primary">UGX {product.retailPrice.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm">/ {product.unitOfSale}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Wholesale: </span>
                    <span className="font-semibold">UGX {product.wholesalePrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Farm Gate: </span>
                    <span className="font-semibold">UGX {product.farmGatePrice.toLocaleString()}</span>
                  </div>
                  {product.exportPrice && (
                    <div>
                      <span className="text-muted-foreground">Export: </span>
                      <span className="font-semibold">UGX {product.exportPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                {product.minimumOrderQty > 1 && (
                  <p className="text-xs text-muted-foreground">Minimum order: {product.minimumOrderQty} {product.unitOfSale}</p>
                )}
              </div>

              {/* Quantity + Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQty(Math.max(product.minimumOrderQty, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted">
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stockQty, qty + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted">
                    <Plus size={14} />
                  </button>
                </div>
                <Button
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-gold"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className={cn("w-10 h-10 p-0", wished && "border-destructive text-destructive")}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={16} className={cn(wished && "fill-current")} />
                </Button>
              </div>

              {/* Key attributes */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <InfoItem icon={MapPin} label="Origin" value={`${product.region}, ${product.countryOfOrigin}`} />
                <InfoItem icon={Package} label="Packaging" value={product.packagingType} />
                <InfoItem icon={Thermometer} label="Storage" value={product.storageCondition.replace(/_/g, " ")} />
                {product.shelfLifeDays && <InfoItem icon={Calendar} label="Shelf Life" value={`${product.shelfLifeDays} days`} />}
                <InfoItem icon={Info} label="Stock" value={`${product.stockQty.toLocaleString()} ${product.unitOfSale}`} />
                <InfoItem icon={Truck} label="Lead Time" value={`${product.leadTimeDays ?? 2} days`} />
              </div>

              {/* Certifications */}
              {product.certifications.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((c) => (
                      <Badge key={c} variant="outline" className="gap-1">
                        <BadgeCheck size={12} className="text-accent" /> {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/marketplace?q=${encodeURIComponent(tag)}`}
                      className="text-xs bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-3 py-1 rounded-full transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabs: Description | Farmer | Specs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Product Specs</TabsTrigger>
                {farmer && <TabsTrigger value="farmer">Seller Profile</TabsTrigger>}
              </TabsList>

              <TabsContent value="description" className="prose max-w-none text-foreground/80 leading-relaxed">
                <p>{product.description}</p>
              </TabsContent>

              <TabsContent value="specs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["SKU", product.sku],
                    ["Product Type", product.productType.replace(/_/g, " ")],
                    ["Grade", GRADE_LABELS[product.grade]],
                    ["Unit of Sale", product.unitOfSale],
                    ["Minimum Order Qty", String(product.minimumOrderQty)],
                    ["Country of Origin", product.countryOfOrigin],
                    ["Region", product.region],
                    product.district ? ["District", product.district] : null,
                    product.scientificName ? ["Scientific Name", product.scientificName] : null,
                    product.variety ? ["Variety / Cultivar", product.variety] : null,
                    ["Organic Status", product.organicStatus.replace(/_/g, " ")],
                    ["Storage Condition", product.storageCondition.replace(/_/g, " ")],
                    product.shelfLifeDays ? ["Shelf Life", `${product.shelfLifeDays} days`] : null,
                    product.harvestDate ? ["Harvest Date", product.harvestDate] : null,
                    product.expiryDate ? ["Expiry Date", product.expiryDate] : null,
                    ["Packaging", product.packagingType],
                    product.leadTimeDays ? ["Lead Time", `${product.leadTimeDays} days`] : null,
                    ["Availability", AVAILABILITY_LABELS[product.availability]],
                    ["Stock Quantity", `${product.stockQty.toLocaleString()} ${product.unitOfSale}`],
                  ].filter(Boolean).map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-border text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {farmer && (
                <TabsContent value="farmer">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={farmer.profileImage ?? "/locale/dairy.webp"}
                        alt={farmer.businessName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-border"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-lg text-foreground">{farmer.businessName}</h3>
                          {farmer.isVerified && (
                            <BadgeCheck size={18} className="text-accent" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{farmer.ownerName}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={12} className="text-accent" />
                          <span className="text-xs text-muted-foreground">{farmer.district}, {farmer.region}</span>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Star size={14} className="fill-secondary text-secondary" />
                          <span className="font-bold">{farmer.rating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({farmer.reviewCount})</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{farmer.totalSales} sales</div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed mb-4">{farmer.farmDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {farmer.certifications.map((c) => (
                        <Badge key={c} variant="outline" className="text-xs gap-1">
                          <BadgeCheck size={10} className="text-accent" /> {c}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/marketplace/farmer/${farmer.id}`}>
                        <Button variant="outline" size="sm">View All Products</Button>
                      </Link>
                      <a href={`tel:${farmer.phone}`}>
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          <Phone size={14} className="mr-1" /> Contact Farmer
                        </Button>
                      </a>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-foreground">Related Products</h2>
                <Link to={`/marketplace?category=${product.categoryId}`}>
                  <Button variant="outline" size="sm">
                    View More <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </PageLayout>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
      <Icon size={14} className="text-primary flex-shrink-0" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold text-sm text-foreground capitalize">{value}</div>
      </div>
    </div>
  );
}
