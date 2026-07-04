/**
 * Agri2rist Hub – Farmer / Seller Store Page
 */
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, BadgeCheck, Phone, Mail, MessageCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { getFarmerById } from "@/data/farmers";
import { getProductsByFarmer } from "@/data/products";

const TIER_LABELS: Record<string, string> = {
  free: "Free", starter: "Starter", standard: "Standard", premium: "Premium", enterprise: "Enterprise",
};
const TIER_COLORS: Record<string, string> = {
  free: "bg-muted text-muted-foreground",
  starter: "bg-primary/10 text-primary",
  standard: "bg-accent-light text-accent",
  premium: "bg-secondary/20 text-secondary-foreground",
  enterprise: "bg-primary text-primary-foreground",
};

export default function FarmerStorePage() {
  const { id } = useParams<{ id: string }>();
  const farmer = id ? getFarmerById(id) : undefined;
  const products = id ? getProductsByFarmer(id).filter((p) => p.listingStatus === "active") : [];

  if (!farmer) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Farmer not found</h2>
          <Link to="/marketplace"><Button>Back to Marketplace</Button></Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="relative bg-primary py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${farmer.farmImages[0] ?? farmer.profileImage})` }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative container mx-auto px-4">
          <Link to="/marketplace" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-secondary mb-6 text-sm">
            <ArrowLeft size={14} /> Back to Marketplace
          </Link>
          <div className="flex items-start gap-5 flex-wrap">
            <img
              src={farmer.profileImage ?? "/locale/dairy.webp"}
              alt={farmer.businessName}
              className="w-20 h-20 rounded-full object-cover border-4 border-secondary shadow-gold"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-3xl font-extrabold text-primary-foreground">{farmer.businessName}</h1>
                {farmer.isVerified && (
                  <span className="flex items-center gap-1 bg-secondary/20 text-secondary px-2 py-0.5 rounded-full text-xs font-bold">
                    <BadgeCheck size={12} /> Verified
                  </span>
                )}
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${TIER_COLORS[farmer.membershipTier]}`}>
                  {TIER_LABELS[farmer.membershipTier]}
                </span>
              </div>
              <p className="text-primary-foreground/80 text-sm mb-2">{farmer.ownerName}</p>
              <div className="flex items-center gap-4 flex-wrap text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1"><MapPin size={13} />{farmer.district}, {farmer.region}</span>
                <span className="flex items-center gap-1"><Star size={13} className="fill-secondary text-secondary" />{farmer.rating.toFixed(1)} ({farmer.reviewCount} reviews)</span>
                <span>{farmer.totalSales.toLocaleString()} total sales</span>
                <span>{products.length} active products</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${farmer.phone}`}>
                <Button size="sm" className="bg-secondary text-secondary-foreground">
                  <Phone size={14} className="mr-1" /> Call
                </Button>
              </a>
              {farmer.whatsapp && (
                <a href={`https://wa.me/${farmer.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                    <MessageCircle size={14} className="mr-1" /> WhatsApp
                  </Button>
                </a>
              )}
              <a href={`mailto:${farmer.email}`}>
                <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <Mail size={14} className="mr-1" /> Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Description */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="font-extrabold text-foreground text-lg mb-2">About {farmer.businessName}</h2>
              <p className="text-muted-foreground leading-relaxed">{farmer.farmDescription}</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.certifications.map((c) => (
                    <Badge key={c} variant="outline" className="text-xs gap-1">
                      <BadgeCheck size={10} className="text-accent" /> {c}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Farm Types</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.farmType.map((t) => (
                    <span key={t} className="text-xs bg-card border border-border px-2 py-1 rounded-full capitalize">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-foreground mb-6">
            {products.length} Product{products.length !== 1 ? "s" : ""} from {farmer.businessName}
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>No active products from this seller yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Farm Images */}
      {farmer.farmImages.length > 1 && (
        <section className="py-10 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-extrabold text-foreground mb-4">Farm Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {farmer.farmImages.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt={`${farmer.businessName} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
