import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, BadgeCheck, BookOpen, Box, ChartNoAxesCombined,
  Check, ChevronRight, Download, GraduationCap, Image as ImageIcon,
  Map as MapIcon, MessageCircle, PlayCircle, Rocket, Search, ShoppingCart,
  Sparkles, Star, TrendingUp, Users, Wrench, X, CreditCard, Smartphone,
  Tag, Lock, Zap, Globe, FileText, Camera,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ── Types ─────────────────────────────────────────────────────────────────────
type Tone = "green" | "blue" | "orange" | "purple" | "gold" | "red" | "teal";
type LicenseType = "buy" | "rent" | "both";

interface DigitalProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tone: Tone;
  tier: string;
  icon: React.ReactNode;
  buyPrice?: number;
  rentPrice?: number;
  rentUnit?: string;
  license: LicenseType;
  features: string[];
  category: string;
  rating: number;
  reviews: number;
  previewImg?: string;
}

// ── Tone styles ───────────────────────────────────────────────────────────────
const TONE: Record<Tone, { badge: string; icon: string; accent: string }> = {
  green:  { badge: "bg-emerald-50 text-emerald-700 border-emerald-200",  icon: "bg-emerald-50 text-emerald-600",  accent: "border-emerald-400" },
  blue:   { badge: "bg-blue-50 text-blue-700 border-blue-200",           icon: "bg-blue-50 text-blue-600",        accent: "border-blue-400" },
  orange: { badge: "bg-orange-50 text-orange-700 border-orange-200",     icon: "bg-orange-50 text-orange-600",    accent: "border-orange-400" },
  purple: { badge: "bg-indigo-50 text-indigo-700 border-indigo-200",     icon: "bg-indigo-50 text-indigo-600",    accent: "border-indigo-400" },
  gold:   { badge: "bg-amber-50 text-amber-700 border-amber-200",        icon: "bg-amber-50 text-amber-600",      accent: "border-amber-400" },
  red:    { badge: "bg-rose-50 text-rose-700 border-rose-200",           icon: "bg-rose-50 text-rose-600",        accent: "border-rose-400" },
  teal:   { badge: "bg-teal-50 text-teal-700 border-teal-200",           icon: "bg-teal-50 text-teal-600",        accent: "border-teal-400" },
};

// ── Product Catalog ───────────────────────────────────────────────────────────
const PRODUCTS: DigitalProduct[] = [
  {
    id: "p1", category: "Downloads", tier: "Best Seller",
    title: "Farm Business Starter Pack",
    subtitle: "Complete digital toolkit for new and growing farms.",
    description: "Professionally designed farm business plans, record books, cash flow templates, and operational manuals ready to use from day one.",
    tone: "green", icon: <Download size={20} />, license: "buy",
    buyPrice: 49000, rating: 4.8, reviews: 312,
    features: ["12 business plan templates","Cash flow & budget spreadsheets","Farm record books (PDF & Excel)","Marketing strategy guide","Legal compliance checklist","Free lifetime updates"],
  },
  {
    id: "p2", category: "Analytics", tier: "Premium",
    title: "Agriculture Analytics Reports",
    subtitle: "Live market prices, demand signals & trend charts.",
    description: "Monthly intelligence reports covering Ugandan and East African commodity prices, weather impact on yields, and demand forecasting for major crops.",
    tone: "blue", icon: <ChartNoAxesCombined size={20} />, license: "rent",
    rentPrice: 129000, rentUnit: "month", rating: 4.7, reviews: 89,
    features: ["Weekly price updates for 50+ commodities","Demand heatmaps by region","Seasonal trend forecasting","Export market signals","Mobile-friendly PDF reports","API access (add-on)"],
  },
  {
    id: "p3", category: "AI Services", tier: "AI Powered",
    title: "AI Crop Diagnosis Assistant",
    subtitle: "Photo-based disease & pest identification for farmers.",
    description: "Upload a photo of your crop and receive an instant AI diagnosis with treatment recommendations, chemical names, and dosage guidance.",
    tone: "purple", icon: <Sparkles size={20} />, license: "both",
    buyPrice: 75000, rentPrice: 15000, rentUnit: "month", rating: 4.9, reviews: 445,
    features: ["Photo-based disease detection","50+ crop types supported","Treatment & chemical recommendations","Offline mode (downloaded models)","Expert escalation chat","Swahili & Luganda support"],
  },
  {
    id: "p4", category: "Certification", tier: "Verified",
    title: "Host Inspection Toolkit",
    subtitle: "Digital checklists and compliance workflows for hosts.",
    description: "A complete digital inspection system for Agri2rist Verified Hosts — covers safety, hygiene, food handling, accommodation standards, and renewal tracking.",
    tone: "gold", icon: <BadgeCheck size={20} />, license: "buy",
    buyPrice: 60000, rating: 4.6, reviews: 67,
    features: ["12 inspection checklists","Digital signature capture","Auto-generated PDF reports","Renewal reminder calendar","Integration with host dashboard","Admin submission workflow"],
  },
  {
    id: "p5", category: "Marketing", tier: "Editor's Choice",
    title: "Digital Marketing Campaign Bundle",
    subtitle: "Social, email, sponsored listings & banner ads.",
    description: "Everything a farm or tourism business needs to run professional digital marketing campaigns — templates, copy, graphics, and a 30-day deployment guide.",
    tone: "orange", icon: <Rocket size={20} />, license: "buy",
    buyPrice: 95000, rating: 4.5, reviews: 134,
    features: ["30 social media post templates","Email campaign sequences (10 emails)","Google & Facebook ad creatives","Sponsored listing setup guide","Brand kit (logo, colours, fonts)","30-day content calendar"],
  },
  {
    id: "p6", category: "GIS & Maps", tier: "Featured",
    title: "GIS Farm Route Maps Starter",
    subtitle: "Interactive mapping for farms, tourism & wildlife.",
    description: "Build beautiful interactive maps for your farm, agritourism site, or wildlife reserve. Includes route planning, pin uploads, and embed-ready outputs.",
    tone: "teal", icon: <MapIcon size={20} />, license: "both",
    buyPrice: 45000, rentPrice: 9000, rentUnit: "month", rating: 4.4, reviews: 56,
    features: ["Drag-and-drop pin placement","Route & trail mapping","Offline map export (PDF)","Embed code for websites","GPS coordinate import","Tourism boundary overlays"],
  },
  {
    id: "p7", category: "Learning", tier: "Verified",
    title: "Online Farm Management Course",
    subtitle: "8-week accredited certification program.",
    description: "Structured learning path covering soil health, IPM, post-harvest handling, financial planning and agritourism compliance. Includes live mentorship sessions.",
    tone: "blue", icon: <GraduationCap size={20} />, license: "buy",
    buyPrice: 250000, rating: 4.7, reviews: 145,
    features: ["8 structured weekly modules","Live Q&A with certified mentors","Downloadable workbooks","Final assessment & certificate","Uganda NCTVC accreditation","Lifetime access to recordings"],
  },
  {
    id: "p8", category: "Software", tier: "Top Rated",
    title: "Farm Management Mobile App",
    subtitle: "Offline-first app for records, inventory & prices.",
    description: "Android and iOS app for managing daily farm operations — livestock records, crop scheduling, inventory, market prices, weather alerts and team tasks.",
    tone: "green", icon: <Box size={20} />, license: "rent",
    rentPrice: 35000, rentUnit: "year", rating: 4.4, reviews: 19,
    features: ["Offline-first (works without internet)","Livestock & crop record keeping","Inventory & stock management","Live market price feed","Weather alerts (SMS + app)","Multi-user team access"],
  },
  {
    id: "p9", category: "Photography", tier: "New",
    title: "Farm & Tourism Photo Library",
    subtitle: "Licensed, high-res images for commercial use.",
    description: "Curated collection of professional farm, agritourism, wildlife and food photography licensed for websites, brochures, ads, and social media.",
    tone: "red", icon: <Camera size={20} />, license: "both",
    buyPrice: 120000, rentPrice: 25000, rentUnit: "month", rating: 4.3, reviews: 28,
    features: ["500+ high-resolution images","Commercial use licence included","Organised by category & region","Instant download after purchase","New images added monthly","Exclusive Uganda farm collection"],
  },
];

// ── Category chips ────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Downloads", "Analytics", "AI Services", "Certification", "Marketing", "GIS & Maps", "Learning", "Software", "Photography"];

// ── Payment Modal ─────────────────────────────────────────────────────────────
function PaymentModal({
  open, onClose, product, mode,
}: {
  open: boolean; onClose: () => void; product: DigitalProduct | null; mode: "buy" | "rent";
}) {
  const [step, setStep] = useState<"details" | "pay" | "done">("details");
  const [method, setMethod] = useState<"card" | "mobile">("mobile");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({ num: "", exp: "", cvv: "", name: "" });

  if (!product) return null;
  const price = mode === "buy" ? product.buyPrice! : product.rentPrice!;
  const label = mode === "buy" ? "Purchase" : `Rent / ${product.rentUnit}`;
  const fee = Math.round(price * 0.035);
  const total = price + fee;

  const reset = () => { setStep("details"); setPhone(""); setCard({ num: "", exp: "", cvv: "", name: "" }); };
  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-wide">Agri2rist Hub</p>
            <h3 className="text-primary-foreground font-extrabold text-lg leading-tight">{label}</h3>
          </div>
          <button onClick={handleClose} className="text-primary-foreground/70 hover:text-primary-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {step === "details" && (
            <>
              <div className="rounded-xl border border-border bg-muted/40 p-4 flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${TONE[product.tone].icon}`}>
                  {product.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{product.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">UGX {price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service fee (3.5%)</span><span className="font-semibold">UGX {fee.toLocaleString()}</span></div>
                <Separator />
                <div className="flex justify-between text-base font-extrabold"><span>Total</span><span className="text-primary">UGX {total.toLocaleString()}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMethod("mobile")}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition text-sm font-semibold ${method === "mobile" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  <Smartphone size={20} /> Mobile Money
                </button>
                <button
                  onClick={() => setMethod("card")}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition text-sm font-semibold ${method === "card" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  <CreditCard size={20} /> Card
                </button>
              </div>

              <Button className="w-full bg-primary text-primary-foreground h-11 font-bold rounded-xl" onClick={() => setStep("pay")}>
                Continue to Payment <ArrowRight size={16} className="ml-2" />
              </Button>
            </>
          )}

          {step === "pay" && method === "mobile" && (
            <>
              <p className="text-sm text-muted-foreground">Enter your MTN or Airtel Money number to receive a payment prompt.</p>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Mobile Money Number</label>
                <Input placeholder="+256 7XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700 flex gap-2">
                <Lock size={13} className="flex-shrink-0 mt-0.5" />
                Secure payment via Agri2rist escrow. Total: <strong>UGX {total.toLocaleString()}</strong>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("details")}>Back</Button>
                <Button className="flex-1 bg-primary text-primary-foreground rounded-xl font-bold h-11" onClick={() => setStep("done")} disabled={phone.length < 9}>
                  Pay UGX {total.toLocaleString()}
                </Button>
              </div>
            </>
          )}

          {step === "pay" && method === "card" && (
            <>
              <p className="text-sm text-muted-foreground">Enter your Visa or Mastercard details.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" value={card.num} onChange={e => setCard(c => ({ ...c, num: e.target.value }))} className="h-11 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Expiry</label>
                    <Input placeholder="MM / YY" value={card.exp} onChange={e => setCard(c => ({ ...c, exp: e.target.value }))} className="h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">CVV</label>
                    <Input placeholder="123" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} className="h-11 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Cardholder Name</label>
                  <Input placeholder="As on card" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} className="h-11 rounded-xl" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("details")}>Back</Button>
                <Button className="flex-1 bg-primary text-primary-foreground rounded-xl font-bold h-11" onClick={() => setStep("done")} disabled={!card.num || !card.exp || !card.cvv || !card.name}>
                  Pay UGX {total.toLocaleString()}
                </Button>
              </div>
            </>
          )}

          {step === "done" && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check size={32} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-xl text-foreground">Payment Successful!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>{product.title}</strong> has been added to your account. Check your email for download/access details.
                </p>
              </div>
              <Button className="w-full bg-primary text-primary-foreground rounded-xl font-bold" onClick={handleClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onAction }: { product: DigitalProduct; onAction: (p: DigitalProduct, mode: "buy"|"rent") => void }) {
  const t = TONE[product.tone];
  return (
    <div className={`rounded-2xl border bg-card flex flex-col overflow-hidden hover:shadow-lg transition-shadow group ${t.accent}`}>
      {/* Card top color strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${
        product.tone === "green" ? "from-emerald-400 to-teal-400" :
        product.tone === "blue"  ? "from-blue-400 to-indigo-400" :
        product.tone === "purple"? "from-indigo-400 to-purple-400" :
        product.tone === "gold"  ? "from-amber-400 to-yellow-400" :
        product.tone === "orange"? "from-orange-400 to-red-400" :
        product.tone === "teal"  ? "from-teal-400 to-cyan-400" :
        "from-rose-400 to-pink-400"
      }`} />

      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${t.icon}`}>
            {product.icon}
          </div>
          <Badge className={`${t.badge} border text-[11px] font-bold flex-shrink-0`}>{product.tier}</Badge>
        </div>

        {/* Title & subtitle */}
        <div>
          <h3 className="font-extrabold text-foreground leading-snug">{product.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{product.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{product.description}</p>

        {/* Features */}
        <ul className="space-y-1.5">
          {product.features.slice(0, 4).map(f => (
            <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
              <Check size={12} className="mt-0.5 text-green-500 flex-shrink-0" />
              {f}
            </li>
          ))}
          {product.features.length > 4 && (
            <li className="text-xs text-muted-foreground pl-5">+{product.features.length - 4} more features</li>
          )}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={11} className={s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
          ))}
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        <Separator />

        {/* Pricing & CTAs */}
        <div className="space-y-2">
          {(product.license === "buy" || product.license === "both") && (
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Tag size={11}/> Buy once</span>
                <span className="font-extrabold text-primary text-lg">UGX {product.buyPrice?.toLocaleString()}</span>
              </div>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground rounded-xl px-4 hover:bg-primary/90"
                onClick={() => onAction(product, "buy")}
              >
                <ShoppingCart size={14} className="mr-1.5" /> Buy Now
              </Button>
            </div>
          )}
          {(product.license === "rent" || product.license === "both") && (
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Zap size={11}/> Rent / {product.rentUnit}</span>
                <span className="font-extrabold text-amber-600 text-lg">UGX {product.rentPrice?.toLocaleString()}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-amber-500 text-amber-700 hover:bg-amber-50 rounded-xl px-4"
                onClick={() => onAction(product, "rent")}
              >
                <Zap size={14} className="mr-1.5" /> Rent
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Preview link */}
      <div className="px-5 pb-4">
        <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition py-2 border border-dashed border-border rounded-xl hover:border-primary/40">
          <Search size={12} /> Preview product details
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DigitalMarketplaceLandingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { section } = useParams<{ section?: string }>();

  // Map /digital/:section path segments → category names
  const SECTION_TO_CATEGORY: Record<string, string> = {
    downloads: "Downloads", learning: "Learning", software: "Software",
    "ai": "AI Services", gis: "GIS & Maps", marketing: "Marketing",
    photography: "Photography", certification: "Certification",
    analytics: "Analytics", bi: "Analytics", "bi-reports": "Analytics",
    video: "All", library: "Downloads", consultancy: "All",
    mobile: "Software", websites: "All", events: "All",
    apis: "All", translation: "All", advertising: "Marketing",
    bundles: "All", memberships: "All", subscriptions: "All",
  };

  const initialCategory = useMemo(() => {
    // Priority: ?category= query param first, then :section path param
    const qcat = searchParams.get("category");
    if (qcat) return decodeURIComponent(qcat);
    if (section && SECTION_TO_CATEGORY[section]) return SECTION_TO_CATEGORY[section];
    return "All";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [payModal, setPayModal] = useState<{ product: DigitalProduct; mode: "buy"|"rent" } | null>(null);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchParams(cat === "All" ? {} : { category: cat });
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "All") list = list.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  return (
    <PageLayout>
      {/* ── Back nav + breadcrumb ── */}
      <div className="container mx-auto px-4 pt-5 pb-1 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition font-medium"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition">Marketplace</Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-sm font-semibold text-foreground">Digital Products & Services</span>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-emerald-700">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize:"40px 40px"}} />
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-secondary text-secondary-foreground border-secondary/30 font-bold mb-4">
                DIGITAL MARKETPLACE
              </Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Buy, Rent & Access<br />
                <span className="text-secondary">Digital Farm Tools</span>
              </h1>
              <p className="mt-4 text-primary-foreground/85 text-base md:text-lg max-w-xl">
                Enterprise-grade downloads, AI services, analytics, learning, software and maps — built for African agriculture and agritourism.
              </p>

              {/* Search */}
              <div className="mt-6 flex gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products, services, tools…"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 backdrop-blur"
                  />
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl px-5 font-bold flex-shrink-0">
                  Search
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[{n:"120+",l:"Products"},{n:"9",l:"Categories"},{n:"4.7★",l:"Avg Rating"},{n:"1,200+",l:"Customers"}].map(s=>(
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold text-white">{s.n}</div>
                    <div className="text-xs text-primary-foreground/70">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side feature cards */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { icon: <Download size={18}/>, label:"Instant Downloads",   desc:"PDF, XLSX, apps ready immediately" },
                { icon: <Zap size={18}/>,      label:"Rent Monthly",         desc:"Subscribe & cancel anytime" },
                { icon: <Lock size={18}/>,     label:"Secure Payments",      desc:"Mobile Money & card supported" },
                { icon: <Globe size={18}/>,    label:"Works Offline",        desc:"Download once, use anywhere" },
                { icon: <MessageCircle size={18}/>, label:"Expert Support",  desc:"Chat & email included" },
                { icon: <TrendingUp size={18}/>, label:"Live Data",          desc:"Market prices updated daily" },
              ].map(f=>(
                <div key={f.label} className="rounded-xl bg-white/10 backdrop-blur border border-white/15 p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/30 flex items-center justify-center text-secondary flex-shrink-0">{f.icon}</div>
                  <div>
                    <div className="text-white font-bold text-sm">{f.label}</div>
                    <div className="text-white/60 text-xs mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category filter bar ── */}
      <section className="sticky top-0 z-20 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-10 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">
                {activeCategory === "All" ? "All Digital Products & Services" : activeCategory}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
                {search && <> for "<strong>{search}</strong>"</>}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText size={13} className="text-primary" />
              All products from verified Agri2rist partners
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAction={(prod, mode) => setPayModal({ product: prod, mode })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Search size={28} className="text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-lg">No results found</h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">Try a different keyword or browse another category.</p>
              <Button variant="outline" className="mt-4 rounded-xl" onClick={() => { setSearch(""); handleCategoryChange("All"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="bg-muted/50 border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Lock size={20}/>,      label:"Secure Payments",     desc:"Mobile Money & Visa/Mastercard" },
              { icon: <Download size={20}/>,   label:"Instant Delivery",    desc:"Immediate access after payment" },
              { icon: <BadgeCheck size={20}/>, label:"Verified Products",   desc:"All products reviewed by our team" },
              { icon: <MessageCircle size={20}/>, label:"Support Included", desc:"Email & chat support on every purchase" },
            ].map(t=>(
              <div key={t.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{t.icon}</div>
                <div className="font-bold text-sm text-foreground">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment modal */}
      <PaymentModal
        open={!!payModal}
        onClose={() => setPayModal(null)}
        product={payModal?.product ?? null}
        mode={payModal?.mode ?? "buy"}
      />
    </PageLayout>
  );
}
