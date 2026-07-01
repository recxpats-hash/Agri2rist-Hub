import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  LockKeyhole,
  MapPin,
  MonitorSmartphone,
  Plane,
  ReceiptText,
  Search,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Tractor,
  Truck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/layout/PageLayout";
import { FARM_IMAGES, SAMPLE_PRODUCTS } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const CATEGORIES = [
  "All",
  "Farm Produce",
  "Livestock",
  "Fish & Aquaculture",
  "Farm Stays",
  "Accommodation",
  "Restaurants",
  "Tours",
  "Equipment",
  "Farm Inputs",
  "Events",
  "Training",
  "Jobs",
  "Investors",
  "Services",
  "Digital Solutions Products",
];

const CATEGORY_GROUPS = [
  {
    title: "Agricultural Commerce",
    icon: Tractor,
    items: ["Vegetables", "Fruits", "Cereals", "Cash crops", "Seeds", "Seedlings", "Fertilizers", "Organic inputs"],
  },
  {
    title: "Livestock & Aquaculture",
    icon: Users,
    items: ["Cattle", "Goats", "Poultry", "Bee products", "Live fish", "Fingerlings", "Fish feed", "Processing equipment"],
  },
  {
    title: "Travel & Experiences",
    icon: CalendarDays,
    items: ["Farm houses", "Eco lodges", "Glamping", "Coffee tours", "Fish farming tours", "Cooking classes", "Farm festivals"],
  },
  {
    title: "Services & Growth",
    icon: Handshake,
    items: ["Agronomists", "Veterinarians", "Soil testing", "Drone spraying", "Training", "Investment", "Jobs", "Insurance"],
  },
  {
    title: "Digital Solutions Products",
    icon: MonitorSmartphone,
    items: ["Travel apps", "Expat tools", "Marketplace software", "Booking systems", "Dashboards", "Payments", "Support portals", "SaaS rentals"],
  },
];

const MODULE_LISTINGS = [
  ...SAMPLE_PRODUCTS.map((product, index) => ({
    ...product,
    marketplaceCategory:
      product.category === "Seafood & Fish"
        ? "Fish & Aquaculture"
        : product.category === "Eggs & Poultry"
          ? "Livestock"
          : "Farm Produce",
    minimumOrder: index % 2 === 0 ? "1 unit" : "5 units",
    availability: "Available now",
    certification: index % 2 === 0 ? "Organic verified" : "Farm verified",
    delivery: "Pickup, local delivery, cold-chain request",
    rating: 4.6 + (index % 4) / 10,
  })),
  {
    id: "stay-001",
    farmId: "farm-001",
    farmName: "Green Valley Dairy Farm",
    name: "Family Farm House Weekend",
    category: "Farm Stays",
    marketplaceCategory: "Farm Stays",
    description: "Two-night farmhouse stay with dairy tour, farm-fresh meals, and morning milking orientation.",
    price: 180,
    unit: "per guest/night",
    image: FARM_IMAGES.dairy,
    available: true,
    minimumOrder: "1 night",
    availability: "Calendar booking",
    certification: "Host verified",
    delivery: "Instant booking or request booking",
    rating: 4.9,
  },
  {
    id: "tour-001",
    farmId: "farm-003",
    farmName: "Blue Lagoon Aquaculture",
    name: "Fish Farming Guided Experience",
    category: "Tours",
    marketplaceCategory: "Tours",
    description: "Guided pond tour, water quality briefing, net fishing demonstration, and fresh fish tasting.",
    price: 45,
    unit: "per guest",
    image: FARM_IMAGES.fishPonds,
    available: true,
    minimumOrder: "2 guests",
    availability: "Weekends",
    certification: "Guide verified",
    delivery: "Date, guests, transport, and insurance options",
    rating: 4.8,
  },
  {
    id: "service-001",
    farmId: "service",
    farmName: "Agri2rist Professional Network",
    name: "Agronomist Field Consultation",
    category: "Services",
    marketplaceCategory: "Services",
    description: "Book a certified agronomist for soil review, crop planning, irrigation advice, and production diagnostics.",
    price: 95,
    unit: "per appointment",
    image: FARM_IMAGES.groupTour,
    available: true,
    minimumOrder: "1 appointment",
    availability: "Request quote",
    certification: "Certificate and KYC required",
    delivery: "Book appointment or request quote",
    rating: 4.7,
  },
  {
    id: "equipment-001",
    farmId: "equipment",
    farmName: "Regional Farm Equipment Pool",
    name: "Tractor Rental Service",
    category: "Equipment",
    marketplaceCategory: "Equipment",
    description: "Rent tractors, sprayers, power tillers, harvesters, and processing machines from verified equipment owners.",
    price: 120,
    unit: "per day",
    image: FARM_IMAGES.groupTour,
    available: true,
    minimumOrder: "1 day",
    availability: "Request schedule",
    certification: "Operator verified",
    delivery: "Pickup, operator, or farm delivery",
    rating: 4.5,
  },
  {
    id: "recxpats-app",
    farmId: "agri2rist-hub",
    farmName: "Agri2rist Hub",
    name: "RecXpats App",
    category: "Digital Solutions Products",
    marketplaceCategory: "Digital Solutions Products",
    description: "A customer-ready MVP for expats and travelers to discover stays, relocation services, local experiences, community support, and trusted payments in one mobile-first app.",
    price: 39,
    unit: "monthly rental or license",
    image: FARM_IMAGES.logo,
    available: true,
    minimumOrder: "1 workspace",
    availability: "MVP demo, rental, and full license",
    certification: "Secure vendor onboarding and payment-ready workflow",
    delivery: "Rent monthly, buy a license, or request customization",
    rating: 4.9,
  },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "MTN Mobile Money", "Airtel Money", "Bank transfer", "PayPal", "Pesapal", "Stripe", "Escrow"];
const CUSTOMER_TOOLS = ["Orders", "Bookings", "Favorites", "Wallet", "Messages", "Invoices", "Refunds", "Reviews", "Support tickets"];
const SELLER_TOOLS = ["Products", "Bookings", "Inventory", "Revenue", "Analytics", "Coupons", "Withdrawals", "Performance", "Reviews"];
const ADMIN_TOOLS = ["Total sales", "Commission revenue", "Pending approvals", "Disputes", "Refunds", "Fraud monitoring", "Vendor performance"];
const AI_FEATURES = ["Smart recommendations", "Personalized travel suggestions", "Support chatbot", "Dynamic pricing insights", "Automated translation", "Image search", "Fraud detection", "Demand forecasting"];
const RECXPATS_PAYMENT_METHODS = ["MTN Mobile Money", "Airtel Money", "Visa", "Mastercard", "Bank transfer", "PayPal", "Stripe"];
const RECXPATS_PLANS = [
  {
    id: "rent",
    label: "Rent Monthly",
    price: 39,
    cadence: "per month",
    summary: "Best for pilots, demos, and teams validating demand.",
    includes: ["Hosted MVP workspace", "Core marketplace modules", "Payment workflow demo", "Monthly support"],
  },
  {
    id: "buy",
    label: "Buy License",
    price: 1490,
    cadence: "one-time",
    summary: "Best for operators ready to launch their own branded platform.",
    includes: ["Source handover package", "Brand customization", "Deployment support", "Admin dashboard setup"],
  },
];

const RECXPATS_SLIDES = [
  {
    eyebrow: "Discover",
    title: "Find trusted places and services fast",
    body: "A clean home screen for expats to search stays, relocation help, farm escapes, local hosts, and vetted service providers.",
    icon: Smartphone,
    accent: "bg-secondary",
    bullets: ["Smart city and region search", "Verified host cards", "One-tap save and compare"],
  },
  {
    eyebrow: "Book",
    title: "Reserve, rent, or request a custom package",
    body: "Customers can move from inspiration to action with dates, guests, service bundles, quote requests, and checkout-ready summaries.",
    icon: Plane,
    accent: "bg-primary",
    bullets: ["Stay and experience booking", "Relocation package builder", "Transparent fees and taxes"],
  },
  {
    eyebrow: "Pay",
    title: "Built around payment confidence",
    body: "The MVP shows mobile money, cards, bank transfer, receipts, wallet status, and escrow-ready payment messaging.",
    icon: WalletCards,
    accent: "bg-accent",
    bullets: ["Mobile money and card options", "Invoices and receipts", "Refund and dispute support"],
  },
  {
    eyebrow: "Manage",
    title: "Customer, vendor, and admin dashboards",
    body: "Every role gets a focused workspace for orders, messages, listings, analytics, payouts, support, and account status.",
    icon: LayoutDashboard,
    accent: "bg-muted-foreground",
    bullets: ["Customer trip hub", "Vendor revenue dashboard", "Admin approval queue"],
  },
];

type Listing = (typeof MODULE_LISTINGS)[number];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [recxpatsSlide, setRecxpatsSlide] = useState(0);
  const [recxpatsPlan, setRecxpatsPlan] = useState("rent");
  const [recxpatsPayment, setRecxpatsPayment] = useState("MTN Mobile Money");
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const filtered = useMemo(
    () =>
      MODULE_LISTINGS.filter((listing) => {
        const query = search.toLowerCase();
        const matchSearch =
          listing.name.toLowerCase().includes(query) ||
          listing.farmName.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.marketplaceCategory.toLowerCase().includes(query);
        const matchCat = selectedCategory === "All" || listing.marketplaceCategory === selectedCategory;
        return matchSearch && matchCat && listing.available;
      }),
    [search, selectedCategory]
  );

  const addToCart = (listingId: string, listingName: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Create an account or login to shop, request quotes, and book marketplace services.",
      });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setCart((prev) => (prev.includes(listingId) ? prev : [...prev, listingId]));
    toast({
      title: "Added to cart",
      description: `${listingName} is ready for checkout, booking, or quotation.`,
    });
  };

  const isInCart = (id: string) => cart.includes(id);
  const selectedRecxpatsPlan = RECXPATS_PLANS.find((plan) => plan.id === recxpatsPlan) ?? RECXPATS_PLANS[0];

  const openListing = (listing: Listing) => {
    setSelectedListing(listing);
    if (listing.id === "recxpats-app") {
      setRecxpatsSlide(0);
      setRecxpatsPlan("rent");
      setRecxpatsPayment("MTN Mobile Money");
    }
  };

  const submitRecxpatsCheckout = (action: "buy" | "rent") => {
    if (!selectedListing) return;
    if (!user) {
      toast({
        title: "Login required",
        description: "Login or create an account to continue with the RecXpats App checkout.",
      });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setCart((prev) => (prev.includes(selectedListing.id) ? prev : [...prev, selectedListing.id]));
    toast({
      title: action === "buy" ? "License checkout started" : "Rental checkout started",
      description: `${selectedRecxpatsPlan.label} selected with ${recxpatsPayment}.`,
    });
  };

  return (
    <PageLayout>
      <section className="bg-primary py-14 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">One-stop agriculture and agritourism hub</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">
            Agri2rist Hub <span className="text-gradient-gold">Marketplace</span>
          </h1>
          <p className="text-primary-foreground/75 text-lg mb-8 max-w-3xl mx-auto">
            Buy farm products, book farm stays and experiences, hire professionals, rent equipment, access training, and discover investment opportunities from verified providers.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, farm stays, experiences, services..."
              className="pl-11 h-12 rounded-xl bg-card border-border text-foreground"
            />
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <div className="bg-secondary/10 border-b border-secondary/30 py-2">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <span className="text-sm text-secondary-foreground font-medium">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart, booking list, or quote request
            </span>
            <Button size="sm" className="bg-secondary text-secondary-foreground">
              <ShoppingCart size={14} className="mr-2" />
              View Cart
            </Button>
          </div>
        </div>
      )}

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
            {CATEGORY_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={18} className="text-primary" />
                    <h2 className="font-bold text-foreground text-sm">{group.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline" className="text-[11px]">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-muted-foreground text-sm mb-6">
            Showing <strong className="text-foreground">{filtered.length}</strong> marketplace listing
            {filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-card rounded-lg border border-border overflow-hidden card-hover cursor-pointer"
                  onClick={() => openListing(listing)}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-primary/85 text-primary-foreground text-xs">
                        {listing.marketplaceCategory}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                      <Star size={12} className="fill-secondary text-secondary" />
                      {listing.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1 text-sm">{listing.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{listing.farmName}</p>
                    <p className="text-xs text-foreground/60 line-clamp-2 mb-3">{listing.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-primary">${listing.price}</span>
                        <span className="text-xs text-muted-foreground ml-1">/ {listing.unit}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (listing.id === "recxpats-app") {
                            openListing(listing);
                          } else {
                            addToCart(listing.id, listing.name);
                          }
                        }}
                        className={
                          isInCart(listing.id)
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        }
                      >
                        {listing.id === "recxpats-app" ? (
                          <>
                            <Sparkles size={14} className="mr-1" /> View MVP
                          </>
                        ) : isInCart(listing.id) ? (
                          <>
                            <Check size={14} className="mr-1" /> Added
                          </>
                        ) : (
                          "Add"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No marketplace listings found.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FeaturePanel icon={CreditCard} title="Shopping cart and payments" items={PAYMENT_METHODS} />
          <FeaturePanel icon={BarChart3} title="Customer, seller, and admin dashboards" items={[...CUSTOMER_TOOLS.slice(0, 4), ...SELLER_TOOLS.slice(0, 4), ...ADMIN_TOOLS.slice(0, 3)]} />
          <FeaturePanel icon={Bot} title="AI-powered marketplace" items={AI_FEATURES} />
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            ["Verified vendors", "KYC, business license, tax records, store management, commission tracking"],
            ["Location-aware search", "Interactive maps for farms, accommodations, services, and attractions"],
            ["Logistics support", "Cargo, cold chain, farm transfers, airport pickup, and livestock transport"],
            ["Learning and finance", "Courses, events, mentorship, crowdfunding, farm investment, and joint ventures"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedListing?.id === "recxpats-app" ? (
        <RecXpatsProductModal
          listing={selectedListing}
          slideIndex={recxpatsSlide}
          setSlideIndex={setRecxpatsSlide}
          planId={recxpatsPlan}
          setPlanId={setRecxpatsPlan}
          paymentMethod={recxpatsPayment}
          setPaymentMethod={setRecxpatsPayment}
          selectedPlan={selectedRecxpatsPlan}
          onClose={() => setSelectedListing(null)}
          onCheckout={submitRecxpatsCheckout}
        />
      ) : selectedListing ? (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedListing(null)}
        >
          <div
            className="bg-card rounded-lg max-w-2xl w-full overflow-hidden shadow-hero"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56">
              <img
                src={selectedListing.image}
                alt={selectedListing.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedListing(null)}
                className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">{selectedListing.name}</h2>
                  <p className="text-sm text-muted-foreground">by {selectedListing.farmName}</p>
                </div>
                <Badge className="bg-primary/10 text-primary">{selectedListing.marketplaceCategory}</Badge>
              </div>
              <p className="text-foreground/70 text-sm mb-5">{selectedListing.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
                <Detail label="Minimum order" value={selectedListing.minimumOrder} />
                <Detail label="Availability" value={selectedListing.availability} />
                <Detail label="Certification" value={selectedListing.certification} />
                <Detail label="Delivery or booking" value={selectedListing.delivery} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-2xl font-extrabold text-primary">${selectedListing.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">per {selectedListing.unit}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <MapPin size={16} className="mr-2" />
                    View Location
                  </Button>
                  <Button
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
                    onClick={() => {
                      addToCart(selectedListing.id, selectedListing.name);
                      setSelectedListing(null);
                    }}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
}

function RecXpatsProductModal({
  listing,
  slideIndex,
  setSlideIndex,
  planId,
  setPlanId,
  paymentMethod,
  setPaymentMethod,
  selectedPlan,
  onClose,
  onCheckout,
}: {
  listing: Listing;
  slideIndex: number;
  setSlideIndex: (index: number) => void;
  planId: string;
  setPlanId: (id: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  selectedPlan: (typeof RECXPATS_PLANS)[number];
  onClose: () => void;
  onCheckout: (action: "buy" | "rent") => void;
}) {
  const activeSlide = RECXPATS_SLIDES[slideIndex];
  const SlideIcon = activeSlide.icon;
  const nextSlide = () => setSlideIndex((slideIndex + 1) % RECXPATS_SLIDES.length);
  const previousSlide = () => setSlideIndex((slideIndex + RECXPATS_SLIDES.length - 1) % RECXPATS_SLIDES.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-background shadow-hero"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <img
              src={listing.image}
              alt="Agri2rist Hub"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-bold text-foreground">{listing.name}</div>
              <div className="text-xs text-muted-foreground">Digital Solutions Products by {listing.farmName}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Close RecXpats App showcase"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="bg-primary px-5 py-8 text-primary-foreground md:px-8">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge className="bg-secondary text-secondary-foreground">MVP showcase</Badge>
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                Buy or rent
              </Badge>
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                Payments included
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-7 xl:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="mb-3 text-3xl font-extrabold leading-tight md:text-5xl">
                  RecXpats App
                </h2>
                <p className="mb-6 max-w-xl text-primary-foreground/78">
                  A mobile-first expat and travel marketplace MVP for discovery, bookings, relocation services, vendor listings, payments, dashboards, and support.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    ["4", "MVP screens"],
                    ["7", "payment methods"],
                    ["3", "role dashboards"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-lg bg-primary-foreground/10 p-3">
                      <div className="text-2xl font-extrabold text-secondary">{value}</div>
                      <div className="text-xs text-primary-foreground/70">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-primary-foreground p-4 text-foreground shadow-gold">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-primary">{activeSlide.eyebrow}</div>
                    <h3 className="text-xl font-extrabold">{activeSlide.title}</h3>
                  </div>
                  <div className={`rounded-full p-3 ${activeSlide.accent} text-white`}>
                    <SlideIcon size={22} />
                  </div>
                </div>

                <div className="mb-5 overflow-hidden rounded-lg border border-border bg-muted">
                  <div className="mx-auto flex min-h-[360px] max-w-[230px] flex-col rounded-[28px] border-[8px] border-foreground bg-background p-3 shadow-hero">
                    <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-muted-foreground/30" />
                    <div className={`${activeSlide.accent} rounded-xl p-3 text-white`}>
                      <div className="text-xs opacity-80">{activeSlide.eyebrow}</div>
                      <div className="text-lg font-bold leading-tight">{activeSlide.title}</div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {activeSlide.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-2 rounded-lg bg-card p-2 text-xs">
                          <Check size={13} className="text-primary" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto rounded-lg bg-primary/10 p-3">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-medium text-primary">Checkout ready</span>
                        <ShieldCheck size={14} className="text-primary" />
                      </div>
                      <div className="h-2 rounded-full bg-primary/25">
                        <div className="h-2 w-3/4 rounded-full bg-secondary" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm text-muted-foreground">{activeSlide.body}</p>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={previousSlide}>
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {RECXPATS_SLIDES.map((slide, index) => (
                      <button
                        key={slide.eyebrow}
                        onClick={() => setSlideIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full ${index === slideIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
                        aria-label={`Show ${slide.eyebrow} slide`}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={nextSlide}>
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-background px-5 py-8 md:px-8">
            <div className="mb-6">
              <Badge className="mb-3 bg-primary/10 text-primary">{listing.marketplaceCategory}</Badge>
              <h3 className="mb-2 text-2xl font-extrabold text-foreground">Choose how to launch</h3>
              <p className="text-sm text-muted-foreground">{listing.description}</p>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3">
              {RECXPATS_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setPlanId(plan.id)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    planId === plan.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="font-bold text-foreground">{plan.label}</span>
                    <span className="text-lg font-extrabold text-primary">${plan.price}</span>
                  </div>
                  <div className="mb-2 text-xs text-muted-foreground">{plan.cadence}</div>
                  <p className="text-sm text-foreground/70">{plan.summary}</p>
                </button>
              ))}
            </div>

            <div className="mb-5 rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <ReceiptText size={18} className="text-primary" />
                <h4 className="font-bold text-foreground">Included features</h4>
              </div>
              <div className="space-y-2">
                {selectedPlan.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <LockKeyhole size={18} className="text-primary" />
                <h4 className="font-bold text-foreground">Payment process</h4>
              </div>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="mb-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {RECXPATS_PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                <div className="rounded-md bg-muted p-2">Select plan</div>
                <div className="rounded-md bg-muted p-2">Confirm payment</div>
                <div className="rounded-md bg-muted p-2">Receive setup</div>
              </div>
            </div>

            <div className="mb-5 rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Selected plan</span>
                <span className="font-bold text-foreground">{selectedPlan.label}</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-sm text-muted-foreground">Due today</span>
                <span className="text-3xl font-extrabold text-primary">${selectedPlan.price}</span>
              </div>
              <div className="mt-1 text-right text-xs text-muted-foreground">{selectedPlan.cadence}</div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => onCheckout("rent")}
              >
                Rent App
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => onCheckout("buy")}
              >
                Buy License
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function FeaturePanel({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof ShoppingCart;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-primary" />
        <h2 className="font-bold text-foreground">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="text-xs">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  );
}
