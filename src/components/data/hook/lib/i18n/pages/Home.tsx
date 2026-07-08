import {
  ArrowRight,
  Home,
  ShoppingBag,
  CalendarCheck,
  Globe,
  Star,
  Users,
  MapPin,
  Leaf,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { FarmCard } from "@/components/farms/FarmCard";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { SAMPLE_FARMS, FARM_IMAGES } from "@/data/sampleData";
import { TOP_CATEGORIES } from "@/data/categories";
import { getFeaturedProducts, getTrendingProducts } from "@/data/products";
import { openNewsletterPopup } from "@/lib/contact-info";

const features = [
  {
    icon: Home,
    title: "Farm Stays",
    desc: "Sleep on a working farm and wake up to the sounds of rural life.",
    color: "text-accent",
    bg: "bg-accent-light",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Buy fresh produce, dairy, fish and more directly from farm operators.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    desc: "Search, compare and book agritourism experiences in minutes.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Cultural Tourism",
    desc: "Explore Aboriginal cultural farming and the world's oldest land wisdom.",
    color: "text-accent",
    bg: "bg-accent-light",
  },
];

const stats = [
  { value: "200+", label: "Farm Listings" },
  { value: "15K+", label: "Happy Guests" },
  { value: "6", label: "States & Territories" },
  { value: "4.8", label: "Avg. Rating" },
];

const galleryImages = [
  { src: FARM_IMAGES.fishPonds, label: "Aquaculture" },
  { src: FARM_IMAGES.dairy, label: "Dairy Farming" },
  { src: FARM_IMAGES.eggs, label: "Egg Production" },
  { src: FARM_IMAGES.poultry, label: "Poultry" },
  { src: FARM_IMAGES.tilapia, label: "Fresh Fish" },
  { src: FARM_IMAGES.groupTour, label: "Group Tours" },
  { src: FARM_IMAGES.fishNet, label: "Harvest Day" },
];

export default function HomePage() {
  const featuredFarms = SAMPLE_FARMS.filter((f) => f.featured).slice(0, 4);

  return (
    <PageLayout>
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FARM_IMAGES.fishPonds})` }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <div className="flex justify-center mb-6">
            <span className="h-24 w-24 overflow-hidden rounded-full shadow-hero animate-float md:h-32 md:w-32">
              <img
                src="/assets/Logo.png"
                alt="Agri2rist Hub"
                width={128}
                height={128}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-contain"
              />
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-4 animate-fade-in">
            Discover authentic hands-on agricultural experiences.
          </h1>
          <div className="text-base md:text-lg text-primary-foreground/80 max-w-4xl mx-auto mb-10 animate-slide-up space-y-3">
            <p>
              It isn't just agritourism but a transformational, authentic experience that connects
              visitors with the land, cultures and farmers behind the food we eat.
            </p>
            <p>Enjoy new travel planning ideas with friends, family and groups.</p>
            <p>
              We are the forefront creating meaningful and immersive experiences that support
              sustainable agriculture, rural development, and environmental conservation.
            </p>
            <p>
              Whether you're a government agency, tourism board, farmer, investor, visitor or
              development organization, our expertise in Agritourism strategy and implementation
              ensures impact-ful and profitable initiatives that strengthen rural economies and
              create regenerative tourism opportunities.
            </p>
            <p className="font-semibold text-primary-foreground">
              Welcome to Agri2rsit Hub; A place for new and unique adventures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 shadow-gold"
              >
                Book Your Experience <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/get-listed">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-bold px-8"
              >
                Become a Host
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={openNewsletterPopup}
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-bold px-8"
            >
              Contact Us
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              to="/community"
              className="text-primary-foreground/60 hover:text-secondary text-sm flex items-center gap-1 transition-colors"
            >
              <Leaf size={14} />
              Explore ways to taste rural life
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Everything You Need for
              <span className="text-accent"> Rural Adventure</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Agri2rist Hub is your complete platform for discovering, booking, and experiencing
              the best of agritourism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-6 border border-border card-hover text-center"
              >
                <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4`}>
                  <f.icon size={24} className={f.color} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED FARMS ── */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                Featured <span className="text-primary">Farm Experiences</span>
              </h2>
              <p className="text-muted-foreground">Hand-picked agritourism destinations</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Farms <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFarms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE TEASERS ── */}
      <MarketplaceTeaserSection />

      {/* ── PHOTO GALLERY ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Life on the <span className="text-secondary">Farm</span>
            </h2>
            <p className="text-muted-foreground">
              Real photos from real farms — authentic, unfiltered rural life.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover min-h-[180px] transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 gradient-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground font-semibold">{img.label}</span>
                </div>
              </div>
            ))}
            {galleryImages.slice(4).map((img, i) => (
              <div key={i + 4} className="relative overflow-hidden rounded-xl">
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover min-h-[180px] transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 gradient-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground font-semibold">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET LISTED CTA ── */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Get Listed
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            If you are an agritourism destination, our free listings only take a couple steps.
            Join hundreds of farm operators already growing their visitor numbers with Agri2rist Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-listed">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-10 shadow-gold"
              >
                Start Free Listing <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-bold px-10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

// ─── Marketplace Teaser Section ───────────────────────────────────────────────

function MarketplaceTeaserSection() {
  const featured = getFeaturedProducts(8);
  const trending = getTrendingProducts(4);

  return (
    <>
      {/* Category Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge className="mb-3 bg-secondary text-secondary-foreground">Marketplace</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                Shop Farm Products <span className="text-primary">Direct</span>
              </h2>
              <p className="text-muted-foreground">
                {TOP_CATEGORIES.length} categories · 163+ products · verified farmers
              </p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Browse All <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CATEGORIES.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.id}`}
                className="group bg-card border border-border rounded-xl overflow-hidden card-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-2 text-center">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
                  <Sparkles size={28} className="text-secondary" />
                  Featured Products
                </h2>
                <p className="text-muted-foreground">Hand-picked, verified and in-season</p>
              </div>
              <Link to="/marketplace?featured=true">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Featured <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Strip */}
      {trending.length > 0 && (
        <section className="py-14 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground flex items-center gap-2">
                <TrendingUp size={24} className="text-secondary" />
                Trending Now
              </h2>
              <Link to="/marketplace?trending=true">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                  See More <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {trending.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
