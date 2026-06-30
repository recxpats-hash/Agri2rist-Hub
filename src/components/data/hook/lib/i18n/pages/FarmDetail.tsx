import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  ChevronLeft,
  Home,
  Check,
  Phone,
  Mail,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { SAMPLE_FARMS } from "@/data/sampleData";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const typeLabels: Record<string, string> = {
  dairy: "Dairy Farm",
  poultry: "Poultry Farm",
  aquaculture: "Aquaculture Farm",
  crop: "Crop Farm",
  mixed: "Mixed Farm",
  cultural: "Cultural Tourism",
};

export default function FarmDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const farm = SAMPLE_FARMS.find((f) => f.id === id);

  const requireLoginForContact = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Login or create an account to access real farm contact details.",
      });
      navigate("/login", { state: { from: `/farm/${farm?.id || ""}` } });
      return;
    }

    toast({
      title: "Contact details unlocked",
      description: `Use the email and phone shown for ${farm?.name}.`,
    });
  };

  if (!farm) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Farm not found</h2>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Back Nav */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            Back to results
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={farm.image}
          alt={farm.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-secondary text-secondary-foreground">
              {typeLabels[farm.type]}
            </Badge>
            {farm.featured && (
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-2">
            {farm.name}
          </h1>
          <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {farm.location}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-secondary text-secondary" />
              {farm.rating} ({farm.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">About This Farm</h2>
                <p className="text-foreground/70 leading-relaxed">{farm.description}</p>
              </div>

              {/* Activities */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Activities & Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {farm.activities.map((activity) => (
                    <div key={activity} className="flex items-center gap-2 text-foreground/80">
                      <Check size={16} className="text-accent flex-shrink-0" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Accommodation Options</h2>
                <div className="flex flex-wrap gap-3">
                  {farm.accommodationTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2"
                    >
                      <Home size={16} className="text-primary" />
                      <span className="text-sm text-foreground">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {farm.images.length > 1 && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Photo Gallery</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {farm.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${farm.name} ${i + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Booking Card */}
            <div>
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-brand">
                <div className="text-2xl font-extrabold text-primary mb-1">
                  From ${farm.pricePerNight}
                  <span className="text-sm font-normal text-muted-foreground">/night</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
                  <Star size={14} className="fill-secondary text-secondary" />
                  <span>{farm.rating} · {farm.reviewCount} reviews</span>
                </div>

                <Link to={`/book/${farm.id}`}>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-gold mb-3">
                    <CalendarCheck size={18} className="mr-2" />
                    Book a Stay
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={requireLoginForContact}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Contact Farm
                </Button>

                {user ? (
                  <div className="mt-6 pt-5 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail size={14} className="text-primary" />
                      info@{farm.name.toLowerCase().replace(/\s/g, "")}.com
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone size={14} className="text-primary" />
                      +61 7 0000 0000
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Login to view verified host phone, email, and direct booking contact.
                    </p>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Free cancellation up to 7 days before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
