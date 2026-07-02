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
    image: FARM_IMAGES.farmStay,
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
    image: FARM_IMAGES.fishFarmPonds,
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
    image: FARM_IMAGES.training,
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
    image: FARM_IMAGES.equipment,
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
const CURRENCIES = ["USD", "UGX", "EUR", "GBP", "AUD"];
const UNIVERSAL_SEARCH_TYPES = ["Farm Products", "Farm Stay", "Tours", "Experiences", "Restaurants", "Guides", "Location"];
const MARKETPLACE_CATEGORY_CARDS = [
  "Farm Produce",
  "Organic Vegetables",
  "Honey Products",
  "Dairy Products",
  "Fish & Aquaculture",
  "Livestock",
  "Poultry",
  "Seeds & Seedlings",
  "Tree Seedlings",
  "Flowers",
  "Fruits",
  "Coffee",
  "Cocoa",
  "Herbs & Spices",
  "Handicrafts",
  "Local Beverages",
  "Farm Stay Accommodation",
  "Farm Equipment",
  "Training Services",
];

const CATEGORY_LISTINGS = [
  ["farm-produce", "Farm Produce", "Seasonal Farm Produce Box", "Community Harvest Cooperative", "A mixed box of fresh farm produce for families, restaurants, and local retailers.", 28, "box", FARM_IMAGES.farmFruits],
  ["organic-vegetables", "Organic Vegetables", "Organic Vegetable Basket", "Green Valley Market Garden", "Seasonal greens, carrots, tomatoes, and leafy vegetables from verified organic growers.", 18, "basket", FARM_IMAGES.farmFruits],
  ["honey-products", "Honey Products", "Raw Wildflower Honey", "Community Apiary Network", "Pure local honey packed for households, chefs, lodges, and farm shops.", 12, "500g jar", FARM_IMAGES.groupTour],
  ["dairy-products", "Dairy Products", "Farm Dairy Pack", "Green Valley Dairy Farm", "Fresh milk, yoghurt, and cheese prepared from pasture-fed dairy herds.", 24, "bundle", FARM_IMAGES.dairy],
  ["fish-aquaculture", "Fish & Aquaculture", "Fresh Fish and Pond Support", "Blue Lagoon Aquaculture", "Fresh fish, fingerlings, pond setup support, and aquaculture advisory services.", 45, "order", FARM_IMAGES.fishFarm],
  ["livestock", "Livestock", "Verified Goat Supply", "Regional Livestock Cooperative", "Healthy goats for breeding, meat production, and community farm projects.", 85, "per animal", FARM_IMAGES.groupTour],
  ["poultry", "Poultry", "Free-Range Poultry Pack", "Sunrise Poultry & Egg Farm", "Eggs, broiler chicken, chicks, and poultry farm supply requests.", 18, "pack", FARM_IMAGES.poultry],
  ["seeds-seedlings", "Seeds & Seedlings", "Vegetable Seedling Tray", "Agri2rist Nursery", "Ready-to-plant seedlings for gardens, farms, schools, and community growers.", 15, "tray", FARM_IMAGES.groupTour],
  ["tree-seedlings", "Tree Seedlings", "Fruit Tree Seedlings", "Agri2rist Nursery", "Mango, avocado, citrus, and shade tree seedlings for farms and homesteads.", 6, "seedling", FARM_IMAGES.groupTour],
  ["flowers", "Flowers", "Fresh Farm Flowers", "Rural Flower Growers", "Seasonal flower bunches for events, hospitality, homes, and local markets.", 14, "bunch", FARM_IMAGES.groupTour],
  ["fruits", "Fruits", "Tropical Fruit Box", "Community Harvest Cooperative", "Bananas, mangoes, passion fruit, papaya, and seasonal farm fruit.", 20, "box", FARM_IMAGES.farmFruits],
  ["coffee", "Coffee", "Single-Origin Coffee Beans", "Uganda Highlands Coffee Farm", "Washed arabica beans sourced from highland farmers and roasted to order.", 16, "500g bag", FARM_IMAGES.groupTour],
  ["cocoa", "Cocoa", "Farm Cocoa Nibs", "Western Cocoa Growers", "Fermented and dried cocoa nibs for chocolate makers, bakeries, and cafes.", 19, "500g pack", FARM_IMAGES.groupTour],
  ["herbs-spices", "Herbs & Spices", "Fresh Herb and Spice Pack", "Organic Roots Farm", "Basil, rosemary, ginger, turmeric, chili, and seasonal farm spices.", 10, "pack", FARM_IMAGES.groupTour],
  ["handicrafts", "Handicrafts", "Rural Artisan Gift Set", "Village Makers Collective", "Handmade baskets, woven decor, and local craft items from rural artisans.", 35, "set", FARM_IMAGES.groupTour],
  ["local-beverages", "Local Beverages", "Farm Beverage Tasting Pack", "Harvest Table Kitchen", "Local juices, herbal drinks, coffee samples, and farm-made refreshments.", 22, "pack", FARM_IMAGES.groupTour],
  ["farm-stay-accommodation", "Farm Stay Accommodation", "Farm Stay Booking Request", "Green Valley Dairy Farm", "Request cottages, farm lodges, homestays, and guided rural accommodation.", 95, "night", FARM_IMAGES.farmStay],
  ["farm-equipment", "Farm Equipment", "Tractor and Tool Rental", "Regional Farm Equipment Pool", "Book tractors, sprayers, irrigation tools, and processing equipment by day.", 120, "day", FARM_IMAGES.equipment],
  ["training-services", "Training Services", "Agritourism Training Session", "Agri2rist Professional Network", "Training for farm hosting, product sales, visitor safety, and rural experience design.", 55, "seat", FARM_IMAGES.training],
].map(([id, category, name, farmName, description, price, unit, image]) => ({
  id: `cat-${id}`,
  farmId: "category-service",
  farmName,
  name,
  category,
  marketplaceCategory: category,
  description,
  price,
  unit,
  image,
  available: true,
  minimumOrder: "1 unit",
  availability: "Available now",
  certification: "Vendor verified",
  delivery: "Pickup, delivery, booking, or quote request",
  rating: 4.7,
}));

const ALL_MARKETPLACE_LISTINGS = [...MODULE_LISTINGS, ...CATEGORY_LISTINGS];

const FARM_EXPERIENCES = [
  ["Coffee Harvest Experience", "3 hours", "Uganda Highlands", "$35", "4.9"],
  ["Dairy Farm Tour", "2 hours", "Green Valley Dairy", "$28", "4.8"],
  ["Tea Plantation Visit", "Half day", "Fort Portal", "$42", "4.7"],
  ["Beekeeping Experience", "2.5 hours", "Community Apiary", "$30", "4.9"],
  ["Fishing Adventure", "4 hours", "Blue Lagoon Aquaculture", "$45", "4.8"],
  ["Organic Vegetable Harvest", "2 hours", "Market Garden", "$22", "4.6"],
  ["Vineyard Experience", "Half day", "Rural Estate", "$58", "4.8"],
  ["Cultural Village Tour", "Full day", "Local Community", "$65", "5.0"],
];
const ACCOMMODATIONS = [
  ["Farm Lodge Suite", "Green Valley Dairy Farm", "Family room", "$120/night", "WiFi, Breakfast, Farm tour", "Available"],
  ["Eco Cottage", "Blue Lagoon Aquaculture", "Private cottage", "$95/night", "Lake view, Breakfast, Fishing", "3 rooms left"],
  ["Village Homestay", "Cultural Farm Stay", "Shared home", "$60/night", "Meals, Guide, Cultural evening", "Request booking"],
];
const RESTAURANTS = [
  ["Harvest Table Kitchen", "Farm-to-table", "1.2 km", "4.8"],
  ["Organic Roots Cafe", "Fresh organic plates", "2.4 km", "4.7"],
  ["Village Cuisine House", "Traditional cuisine", "3.1 km", "4.9"],
];
const UPCOMING_EVENTS = [
  ["Harvest Festival", "Aug 16", "Community Farm Grounds", FARM_IMAGES.eventHosting],
  ["Farmers Market", "Sep 02", "Agri2rist Market Square", FARM_IMAGES.farmFruits],
  ["Coffee Festival", "Sep 21", "Uganda Highlands", FARM_IMAGES.training],
  ["Agricultural Show", "Oct 05", "Regional Expo Center", FARM_IMAGES.equipment],
];
const EVENT_HOSTS = [
  "Farmers",
  "Agricultural cooperatives",
  "Agribusiness companies",
  "Tourism operators",
  "Farm stay hosts",
  "Hotels and lodges",
  "Local communities",
  "Cultural institutions",
  "Educational institutions",
  "NGOs",
  "Government agencies",
  "Youth organizations",
  "Women’s associations",
  "Event companies",
  "Food vendors",
  "Handicraft producers",
];
const EVENT_TYPE_GROUPS = [
  {
    title: "Agricultural Events",
    items: ["Agricultural shows", "Farm open days", "Livestock exhibitions", "Poultry shows", "Dairy competitions", "Fish farming exhibitions", "Apiary demonstrations", "Irrigation demonstrations"],
  },
  {
    title: "Tourism Events",
    items: ["Farm tours", "Nature walks", "Bird watching", "Camping weekends", "Eco-tourism adventures", "Recreational fishing", "Cycling tours", "Hiking expeditions"],
  },
  {
    title: "Educational Events",
    items: ["Farmer training", "Workshops", "Seminars", "Conferences", "Field days", "Student study tours", "Research visits", "Innovation forums"],
  },
  {
    title: "Cultural and Food Events",
    items: ["Traditional dance festivals", "Heritage celebrations", "Music festivals", "Traditional food festivals", "Farm-to-table experiences", "Coffee festivals", "Fruit festivals", "Farmers markets"],
  },
  {
    title: "Business Events",
    items: ["Trade fairs", "Investment forums", "Agribusiness networking", "Product launches", "Business matchmaking", "Startup pitch competitions"],
  },
];
const EVENT_CREATION_FIELDS = [
  "Event title and category",
  "Description and objectives",
  "Organizer and contact person",
  "Farm, venue, address, GPS and map location",
  "Date, time, multi-day schedule and deadline",
  "Free, paid, VIP, early bird, student and group tickets",
  "Participant capacity and waiting list",
  "Banner, photos, videos, sponsor logos and venue images",
  "Facilities, parking, accommodation, first aid and security",
];
const EVENT_DASHBOARD = [
  "Create and edit events",
  "Publish event pages",
  "Sell tickets online",
  "Track registrations",
  "Manage attendance",
  "Send announcements",
  "View financial reports",
  "Download participant lists",
  "Manage sponsors and exhibitors",
  "Collect feedback",
];
const EVENT_VISITOR_TOOLS = [
  "Search by country, region, farm, date, category and price",
  "Register participants and special requirements",
  "Receive instant confirmation and booking number",
  "Use QR code tickets and digital receipts",
  "Get event directions and calendar reminders",
  "Download event programmes",
  "Reserve accommodation and book farm tours",
  "Check in using the mobile app",
  "Leave reviews and download certificates",
];
const EVENT_STANDARDS = [
  "Safe visitor access",
  "Clear health and safety guidance",
  "Emergency response procedures",
  "Qualified event coordinators",
  "Clean sanitation facilities",
  "Food hygiene compliance",
  "Parking and traffic management",
  "Visitor liability information where required",
  "Environmental sustainability practices",
];
const EVENT_BENEFITS = [
  "Reach local and international visitors",
  "Increase farm and business income",
  "Promote products and services",
  "Build your brand",
  "Strengthen community partnerships",
  "Support rural tourism development",
  "Generate repeat visitors",
  "Sell products directly during events",
  "Access event performance analytics",
];
const FILTER_GROUPS = [
  ["Product Type", "Produce", "Livestock", "Experiences", "Accommodation", "Equipment", "Services"],
  ["Availability", "Available now", "Organic certified", "Free delivery", "Instant booking"],
  ["Amenities", "Family friendly", "Swimming pool", "WiFi", "Pet friendly", "Breakfast included"],
];
const SUSTAINABILITY_BADGES = [
  "Sustainable Farming",
  "Organic Practices",
  "Eco Tourism",
  "Community Impact",
  "Biodiversity",
  "Water Conservation",
];
const REVIEWS = [
  ["Amazing coffee farm tour in Uganda.", "Grace M.", "5.0"],
  ["Fresh organic produce delivered quickly.", "Daniel K.", "5.0"],
  ["Best rural experience ever.", "Amina R.", "5.0"],
];
const MEMBER_BENEFITS = ["Sell Products", "List Accommodation", "Promote Farm Tours", "Access Global Buyers", "Analytics Dashboard", "Secure Payments"];
const MOBILE_FEATURES = ["Instant Booking", "GPS Navigation", "QR Check-in", "Mobile Payments", "Notifications"];
const RECOMMENDED_FEATURES = [
  "AI-powered search and personalized recommendations",
  "Multi-vendor dashboards for farmers, artisans, and tourism providers",
  "Secure cards, mobile money, and international payments",
  "Real-time calendars for farm stays, tours, and experiences",
  "Multi-language and multi-currency support",
  "QR code e-tickets and digital check-in",
  "Vendor analytics for sales, bookings, visitor trends, and reviews",
  "Wishlist, product comparison, and order tracking",
  "Integrated visitor-to-vendor messaging",
  "Sustainability badges for Organic, Fair Trade, Eco-Certified, and Community Impact",
];
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

type Listing = (typeof ALL_MARKETPLACE_LISTINGS)[number];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [recxpatsSlide, setRecxpatsSlide] = useState(0);
  const [recxpatsPlan, setRecxpatsPlan] = useState("rent");
  const [recxpatsPayment, setRecxpatsPayment] = useState("MTN Mobile Money");
  const [currency, setCurrency] = useState("USD");
  const [searchType, setSearchType] = useState("Farm Products");
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const filtered = useMemo(
    () =>
      ALL_MARKETPLACE_LISTINGS.filter((listing) => {
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

  const viewCart = () => {
    toast({
      title: cart.length > 0 ? "Cart ready" : "Cart is empty",
      description:
        cart.length > 0
          ? `${cart.length} item${cart.length !== 1 ? "s are" : " is"} saved for checkout, booking, or quote request.`
          : "Choose Buy Now or the cart icon on a listing to add items.",
    });
  };

  const runMarketplaceSearch = () => {
    toast({
      title: "Search updated",
      description: search
        ? `Showing marketplace results for "${search}".`
        : "Showing all available marketplace listings.",
    });
  };

  const subscribeToUpdates = () => {
    if (!subscriberEmail.trim()) {
      toast({
        title: "Email required",
        description: "Enter an email address to receive marketplace updates.",
      });
      return;
    }

    const saved = JSON.parse(localStorage.getItem("agri2rist_marketplace_subscribers") || "[]");
    if (!saved.includes(subscriberEmail.trim())) {
      localStorage.setItem(
        "agri2rist_marketplace_subscribers",
        JSON.stringify([...saved, subscriberEmail.trim()])
      );
    }
    toast({
      title: "Subscribed",
      description: "You will receive rural experience and marketplace updates.",
    });
    setSubscriberEmail("");
  };

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
      <section className="relative overflow-hidden bg-primary py-16 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${FARM_IMAGES.fishPonds})` }}
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative container mx-auto">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 md:justify-end">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-9 w-[110px] border-primary-foreground/30 bg-primary/80 text-primary-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-secondary text-secondary-foreground" onClick={viewCart}>
              <ShoppingCart size={14} className="mr-2" />
              Cart {cart.length > 0 ? `(${cart.length})` : ""}
            </Button>
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Commercial center for rural experiences</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">
              Discover Authentic Farm Experiences, Products, Service & Rural Adventures
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-5 max-w-3xl mx-auto">
              Book farm stays, buy fresh farm products, discover local experiences, and connect directly with farmers worldwide.
            </p>
            <p className="text-primary-foreground/75 mb-8 max-w-3xl mx-auto">
              Agri2rist Hub helps members create unique and memorable visitor experiences for tourists seeking authentic rural experiences.
            </p>

            <div className="rounded-lg bg-card p-3 shadow-hero">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr_auto_auto]">
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIVERSAL_SEARCH_TYPES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search farm products, stays, tours, restaurants, guides, and locations..."
                    className="h-10 pl-11"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground" onClick={runMarketplaceSearch}>
                  <Search size={16} className="mr-2" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  onClick={() => setShowAdvancedFilters((value) => !value)}
                >
                  Advanced Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <div className="bg-secondary/10 border-b border-secondary/30 py-2">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <span className="text-sm text-secondary-foreground font-medium">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart, booking list, or quote request
            </span>
            <Button size="sm" className="bg-secondary text-secondary-foreground" onClick={viewCart}>
              <ShoppingCart size={14} className="mr-2" />
              View Cart
            </Button>
          </div>
        </div>
      )}

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Shop by Category"
            body="Choose a category to display matching products, services, rentals, stays, or training below."
          />
          <div className="mb-4 flex justify-center">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearch("");
              }}
              className={`rounded-lg border px-5 py-2 text-sm font-semibold transition-colors ${
                selectedCategory === "All"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All Marketplace
            </button>
          </div>
          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {MARKETPLACE_CATEGORY_CARDS.map((item, index) => {
              const icons = [Tractor, ShoppingCart, Users, CalendarDays, GraduationCap, Truck, Handshake, MonitorSmartphone];
              const Icon = icons[index % icons.length];
              return (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedCategory(item);
                    setSearch("");
                  }}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    selectedCategory === item
                      ? "border-primary bg-primary text-primary-foreground shadow-brand"
                      : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`mb-3 ${selectedCategory === item ? "text-secondary" : "text-secondary"}`}
                  />
                  <span className="text-sm font-semibold">{item}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
            <aside className={`${showAdvancedFilters ? "" : "hidden lg:block"} h-fit rounded-lg border border-border bg-card p-4 lg:sticky lg:top-32`}>
              <h2 className="mb-3 font-bold text-foreground">Marketplace Filters</h2>
              <div className="space-y-4">
                {FILTER_GROUPS.map(([title, ...items]) => (
                  <div key={title}>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</div>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm text-foreground/75">
                          <input
                            type="checkbox"
                            checked={search === item}
                            onChange={() => setSearch(search === item ? "" : item)}
                            className="h-4 w-4 rounded border-border"
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Price Range</div>
                  <input type="range" min="0" max="500" defaultValue="180" className="w-full" />
                </div>
                <Select defaultValue="Uganda">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Uganda", "Kenya", "Australia", "South Africa", "Ghana"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </aside>

            <div>
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">
                    {selectedCategory === "All" ? "All Products & Services" : selectedCategory}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Showing <strong className="text-foreground">{filtered.length}</strong> marketplace listing
                    {filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
                {selectedCategory !== "All" && (
                  <Button
                    variant="outline"
                    className="border-primary text-primary"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearch("");
                    }}
                  >
                    Clear Category
                  </Button>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((listing) => (
                    <MarketplaceListingCard
                      key={listing.id}
                      listing={listing}
                      isInCart={isInCart(listing.id)}
                      onOpen={() => openListing(listing)}
                      onAdd={(event) => {
                        event.stopPropagation();
                        if (listing.id === "recxpats-app") {
                          openListing(listing);
                        } else {
                          addToCart(listing.id, listing.name);
                        }
                      }}
                    />
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
          </div>
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

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader title="Farm Experiences" body="Book authentic hands-on agricultural adventures with real producers and local communities." />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {FARM_EXPERIENCES.map(([name, duration, place, price, rating], index) => (
              <ExperienceCard
                key={name}
                name={name}
                image={[FARM_IMAGES.groupTour, FARM_IMAGES.dairy, FARM_IMAGES.fishPonds, FARM_IMAGES.fishNet][index % 4]}
                meta={`${duration} · ${place}`}
                price={price}
                rating={rating}
                action="Book Now"
                onAction={() => navigate("/explore")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="Farm Stay Accommodation" body="Stay close to the land with lodges, cottages, homestays, and working farm accommodation." />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {ACCOMMODATIONS.map(([name, farm, room, price, amenities, availability], index) => (
              <div key={name} className="overflow-hidden rounded-lg border border-border bg-card shadow-brand">
                <img
                  src={[FARM_IMAGES.farmStay, FARM_IMAGES.farmStay, FARM_IMAGES.farmStay][index % 3]}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="mb-1 text-lg font-extrabold text-foreground">{name}</div>
                  <div className="mb-3 text-sm text-muted-foreground">{farm} · {room}</div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {amenities.split(", ").map((item) => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="font-bold text-primary">{price}</span>
                    <span className="text-muted-foreground">{availability}</span>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground" onClick={() => navigate("/explore")}>Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader title="Restaurants & Local Cuisine" body="Reserve farm-to-table meals, traditional cuisine, and fresh organic dining close to your route." />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {RESTAURANTS.map(([name, style, distance, rating]) => (
              <FeatureCard key={name} icon={ShoppingCart} title={name} body={`${style} · ${distance} away · ${rating} rating`} action="Reserve Table" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Agri2rist Hub Events"
            body="Create, promote, manage, and join agricultural, rural tourism, cultural, educational, food, and business events through one integrated platform."
          />

          <div className="mb-10 rounded-lg border border-border bg-card p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Badge className="mb-3 bg-secondary text-secondary-foreground">Host an Event</Badge>
                <h3 className="mb-3 text-2xl font-extrabold text-foreground">
                  Showcase your farm, business, products, services, culture, or destination.
                </h3>
                <p className="text-muted-foreground">
                  Event organizers can promote farm festivals, exhibitions, farmers markets, workshops, cultural celebrations, food fairs, livestock competitions, eco-tourism experiences, and more.
                </p>
              </div>
              <div>
                <h4 className="mb-3 font-extrabold text-foreground">Who Can Host Events?</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {EVENT_HOSTS.map((item) => (
                    <div key={item} className="rounded-md bg-muted p-2 text-xs font-medium text-foreground/75">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {EVENT_TYPE_GROUPS.map((group) => (
              <div key={group.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-3 font-extrabold text-foreground">{group.title}</h3>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check size={13} className="mt-0.5 flex-shrink-0 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <EventFeaturePanel title="Create an Event" items={EVENT_CREATION_FIELDS} />
            <EventFeaturePanel title="Event Management Dashboard" items={EVENT_DASHBOARD} />
            <EventFeaturePanel title="Join an Event" items={EVENT_VISITOR_TOOLS} />
            <EventFeaturePanel title="Safety and Event Standards" items={EVENT_STANDARDS} />
          </div>

          <div className="mt-10 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-extrabold text-foreground">Benefits of Hosting Events</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EVENT_BENEFITS.map((item) => (
                <div key={item} className="rounded-md bg-muted p-3 text-sm text-foreground/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader title="Upcoming Events" body="Discover harvest festivals, farmers markets, coffee festivals, agricultural shows, and cultural events." />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {UPCOMING_EVENTS.map(([name, date, venue, image]) => (
              <div key={name} className="overflow-hidden rounded-lg border border-border bg-card">
                <img src={image} alt={name} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
                <div className="p-5">
                  <div className="mb-4 inline-flex rounded-md bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground">{date}</div>
                  <h3 className="mb-2 font-bold text-foreground">{name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{venue}</p>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary"
                  onClick={() =>
                    toast({
                      title: "Event selected",
                      description: `${name} registration has been added to your interest list.`,
                    })
                  }
                >
                  Register
                </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader title="Interactive Map" body="Zoom into farms, lodges, experiences, restaurants, and markets by country or region." />
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-brand">
            <iframe
              title="Agri2rist Hub Marketplace Map"
              src="https://www.google.com/maps?q=Uganda%20farms%20agritourism&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full md:h-[460px]"
            />
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={FARM_IMAGES.groupTour} alt="Featured farmer" loading="lazy" decoding="async" className="h-full min-h-[320px] w-full object-cover" />
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <Badge className="mb-4 bg-secondary text-secondary-foreground">Vendor Spotlight</Badge>
              <h2 className="mb-3 text-3xl font-extrabold text-foreground">Featured Farmer: Community Harvest Cooperative</h2>
              <p className="mb-5 text-muted-foreground">
                A farmer-led cooperative combining organic produce, cultural village tours, coffee experiences, and water-conscious growing practices.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["Products: coffee, vegetables, honey", "Experiences: harvest tours, cooking classes", "Sustainability: composting, water conservation", "Community: youth training and local jobs"].map((item) => (
                  <div key={item} className="rounded-md bg-muted p-3 text-sm text-foreground/80">{item}</div>
                ))}
              </div>
              <Button className="mt-5 bg-primary text-primary-foreground" onClick={() => navigate("/farm/farm-001")}>View Farm Profile</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader title="Sustainability & Trust" body="Badges help visitors choose providers that support responsible rural economies and regenerative tourism." />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {SUSTAINABILITY_BADGES.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-card p-4 text-center">
                <ShieldCheck size={22} className="mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold text-foreground">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="Customer Reviews" body="Trust signals from visitors buying products, booking stays, and joining rural experiences." />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {REVIEWS.map(([quote, name, rating]) => (
              <div key={quote} className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex gap-1 text-secondary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-secondary" />)}</div>
                <p className="mb-4 text-foreground/80">"{quote}"</p>
                <div className="text-sm font-bold text-foreground">{name} · {rating}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground">Join Agri2rist Hub</Badge>
              <h2 className="mb-3 text-3xl font-extrabold text-primary-foreground">Become a Vendor, Farmer, Host, or Rural Partner</h2>
              <p className="mb-5 text-primary-foreground/80">Sell products, list accommodation, promote tours, access global buyers, view analytics, and receive secure payments.</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {MEMBER_BENEFITS.map((item) => <Badge key={item} variant="outline" className="border-primary-foreground/30 text-primary-foreground">{item}</Badge>)}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="bg-secondary text-secondary-foreground" onClick={() => navigate("/get-listed")}>Become a Vendor</Button>
                <Button variant="outline" className="border-primary-foreground text-primary-foreground" onClick={() => navigate("/get-listed")}>Register as Farmer</Button>
              </div>
            </div>
            <div className="rounded-lg bg-primary-foreground p-6 text-foreground">
              <div className="mb-4 flex items-center gap-3">
                <Smartphone className="text-primary" />
                <h3 className="text-xl font-extrabold">Download the Mobile App</h3>
              </div>
              <p className="mb-4 text-muted-foreground">Android and iPhone features for instant booking, GPS navigation, QR check-in, mobile payments, and notifications.</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {MOBILE_FEATURES.map((item) => <div key={item} className="rounded-md bg-muted p-3 text-sm">{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="Recommended Marketplace Features" body="These features make Agri2rist Hub stronger as a global agritourism platform." />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {RECOMMENDED_FEATURES.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Check size={18} className="mt-0.5 text-accent" />
                <span className="text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-foreground">Stay Connected with Rural Experiences</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">Receive marketplace updates, new farm stays, product launches, festivals, and vendor opportunities.</p>
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <Input
              value={subscriberEmail}
              onChange={(event) => setSubscriberEmail(event.target.value)}
              placeholder="Email Address"
              className="h-11"
            />
            <Button className="bg-primary text-primary-foreground" onClick={subscribeToUpdates}>Subscribe</Button>
          </div>
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
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedListing.farmName)}`,
                        "_blank",
                        "noreferrer"
                      );
                    }}
                  >
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

function SectionHeader({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <h2 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">{title}</h2>
      <p className="text-muted-foreground">{body}</p>
    </div>
  );
}

function MarketplaceListingCard({
  listing,
  isInCart,
  onOpen,
  onAdd,
}: {
  listing: Listing;
  isInCart: boolean;
  onOpen: () => void;
  onAdd: (event: { stopPropagation: () => void }) => void;
}) {
  return (
    <div
      className="bg-card rounded-lg border border-border overflow-hidden card-hover cursor-pointer"
      onClick={onOpen}
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
        <div className="mb-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
          <span>Qty: {listing.minimumOrder}</span>
          <span>{listing.delivery}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-extrabold text-primary">${listing.price}</span>
            <span className="text-xs text-muted-foreground ml-1">/ {listing.unit}</span>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="border-primary text-primary" onClick={onAdd}>
              Buy Now
            </Button>
            <Button
              size="sm"
              onClick={onAdd}
              className={
                isInCart
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              }
            >
              {listing.id === "recxpats-app" ? (
                <Sparkles size={14} />
              ) : isInCart ? (
                <Check size={14} />
              ) : (
                <ShoppingCart size={14} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  name,
  image,
  meta,
  price,
  rating,
  action,
  onAction,
}: {
  name: string;
  image: string;
  meta: string;
  price: string;
  rating: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-brand">
      <img src={image} alt={name} loading="lazy" decoding="async" className="h-44 w-full object-cover" />
      <div className="p-4">
        <h3 className="mb-2 font-bold text-foreground">{name}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{meta}</p>
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-bold text-primary">{price}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star size={14} className="fill-secondary text-secondary" />
            {rating}
          </span>
        </div>
        <Button className="w-full bg-secondary text-secondary-foreground" onClick={onAction}>{action}</Button>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  action,
  onAction,
}: {
  icon: typeof ShoppingCart;
  title: string;
  body: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <Icon size={22} className="mb-3 text-primary" />
      <h3 className="mb-2 font-bold text-foreground">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{body}</p>
      <Button
        variant="outline"
        className="border-primary text-primary"
        onClick={onAction ?? (() => window.alert(`${title} selected.`))}
      >
        {action}
      </Button>
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

function EventFeaturePanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-3 font-extrabold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={14} className="mt-0.5 flex-shrink-0 text-accent" />
            <span>{item}</span>
          </div>
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
