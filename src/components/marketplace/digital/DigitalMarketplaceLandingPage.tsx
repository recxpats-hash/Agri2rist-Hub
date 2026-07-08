import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, BadgeCheck, Check, ChevronRight, Download, 
  GraduationCap, MessageCircle, Rocket, Search, ShoppingCart,
  Sparkles, Star, TrendingUp, X, CreditCard, Smartphone,
  Tag, Lock, Zap, Globe, FileText, Camera, ChartNoAxesCombined, Box, MapIcon,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-primary-foreground/70 font-bold uppercase tracking-wide">Agri2rist Hub</p>
            <h3 className="text-primary-foreground font-extrabold text-lg">{label}</h3>
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
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-bold">UGX {price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service fee (3.5%)</span><span className="font-bold">UGX {fee.toLocaleString()}</span></div>
                <Separator />
                <div className="flex justify-between text-base font-extrabold"><span>Total</span><span className="text-primary">UGX {total.toLocaleString()}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMethod("mobile")}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition text-sm font-bold ${method === "mobile" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  <Smartphone size={20} /> Mobile Money
                </button>
                <button
                  onClick={() => setMethod("card")}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition text-sm font-bold ${method === "card" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
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
                <label className="text-xs font-bold text-foreground block mb-2">Mobile Money Number</label>
                <Input placeholder="+256 7XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700 flex gap-2">
                <Lock size={13} className="flex-shrink-0 mt-0.5" />
                Secure payment. Total: <strong>UGX {total.toLocaleString()}</strong>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("details")}>Back</Button>
                <Button className="flex-1 bg-primary text-primary-foreground rounded-xl font-bold h-11" onClick={() => setStep("done")} disabled={phone.length < 9}>
                  Pay
                </Button>
              </div>
            </>
          )}

          {step === "pay" && method === "card" && (
            <>
              <p className="text-sm text-muted-foreground">Enter your Visa or Mastercard details.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1.5">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" value={card.num} onChange={e => setCard(c => ({ ...c, num: e.target.value }))} className="h-11 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">Expiry</label>
                    <Input placeholder="MM / YY" value={card.exp} onChange={e => setCard(c => ({ ...c, exp: e.target.value }))} className="h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">CVV</label>
                    <Input placeholder="123" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} className="h-11 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1.5">Cardholder Name</label>
                  <Input placeholder="As on card" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} className="h-11 rounded-xl" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("details")}>Back</Button>
                <Button className="flex-1 bg-primary text-primary-foreground rounded-xl font-bold h-11" onClick={() => setStep("done")} disabled={!card.num || !card.exp || !card.cvv || !card.name}>
                  Pay
                </Button>
              </div>
            </>
          )}

          {step === "done" && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check size={32} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-foreground">Payment Successful!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>{product.title}</strong> added to your account. Check your email for access details.
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

// ── Custom marketplace solution panel ───────────────────────────────────────
function MarketplaceSolution({ product, onAction }: { product: DigitalProduct; onAction: (p: DigitalProduct, mode: "buy"|"rent") => void }) {
  const t = TONE[product.tone];

  return (
    <article className="rounded-[28px] border border-border/70 bg-background/90 p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${t.icon}`}>
            {product.icon}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${t.badge} border text-[10px] font-bold`}>{product.tier}</Badge>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{product.category}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {(product.license === "buy" || product.license === "both") && (
            <Button
              variant="outline"
              className="rounded-xl border-primary/20 text-primary hover:bg-primary/10"
              onClick={() => onAction(product, "buy")}
            >
              Buy • UGX {product.buyPrice?.toLocaleString()}
            </Button>
          )}
          {(product.license === "rent" || product.license === "both") && (
            <Button
              className="rounded-xl bg-amber-500 text-white hover:bg-amber-600"
              onClick={() => onAction(product, "rent")}
            >
              Rent • UGX {product.rentPrice?.toLocaleString()}/{product.rentUnit}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 4).map((feature) => (
              <span key={feature} className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-foreground/80">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {product.rating} · {product.reviews} reviews
          </div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-foreground">Instant</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Support</span>
              <span className="font-semibold text-foreground">Included</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment</span>
              <span className="font-semibold text-foreground">Mobile Money / Card</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DigitalMarketplaceLandingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
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
      {/* ── Breadcrumb ── */}
      <div className="container mx-auto px-4 pt-6 pb-3 flex items-center gap-2 text-sm">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition flex items-center gap-1 font-medium">
          <ArrowLeft size={16} /> Back
        </button>
        <ChevronRight size={14} className="text-muted-foreground/40" />
        <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition">Marketplace</Link>
        <ChevronRight size={14} className="text-muted-foreground/40" />
        <span className="font-bold text-foreground">Digital Products</span>
      </div>

      {/* ── Premium Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-primary to-emerald-700">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 30% 60%, rgba(34,197,94,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(79,70,229,0.2) 0%, transparent 50%)", backgroundSize:"800px 800px"}} />

        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-8 animate-fadeIn">
              <div>
                <Badge className="bg-emerald-300/20 text-emerald-200 font-bold mb-4 border-emerald-400/40 px-3 py-1.5">
                  <Sparkles size={13} className="mr-1.5" /> Enterprise Tools For African Farmers
                </Badge>

                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                  Digital Farm<br />
                  <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Solutions</span>
                </h1>

                <p className="text-emerald-100/90 text-lg max-w-xl leading-relaxed">
                  Download templates, access AI tools, subscribe to analytics, learn new skills — everything you need to scale your agritourism business.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-4">
                {[
                  { num: "120+", label: "Products" },
                  { num: "4.7★", label: "Avg Rating" },
                  { num: "1.2K+", label: "Users" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-extrabold text-emerald-300">{stat.num}</div>
                    <div className="text-sm text-emerald-100/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-3 animate-slideUp" style={{animationDelay: "0.1s"}}>
              {[
                { icon: Download, title: "Instant Downloads", desc: "PDF, Excel, mobile apps" },
                { icon: Zap, title: "Subscribe Monthly", desc: "Cancel anytime, no lock-in" },
                { icon: Lock, title: "Secure Payments", desc: "Mobile Money & cards" },
                { icon: Globe, title: "Works Offline", desc: "Download once, use anywhere" },
                { icon: MessageCircle, title: "Expert Support", desc: "Chat & email included" },
                { icon: TrendingUp, title: "Live Updates", desc: "Data refreshed daily" },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <IconComp size={18} className="text-emerald-300 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="font-bold text-white text-xs">{item.title}</div>
                      <div className="text-emerald-100/70 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Search + Categories (Sticky) ── */}
      <section className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border shadow-sm py-4">
        <div className="container mx-auto px-4 space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, tools, courses…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button className="bg-primary text-primary-foreground rounded-xl px-5 font-bold">Search</Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground">
                {activeCategory === "All" ? "All Digital Products" : activeCategory}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
                {search && <> matching "<strong>{search}</strong>"</>}
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/30 text-xs px-3 py-1.5 font-bold">
              <BadgeCheck size={12} className="mr-1" /> Verified
            </Badge>
          </div>

          {/* Custom marketplace list */}
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map(p => (
                <MarketplaceSolution
                  key={p.id}
                  product={p}
                  onAction={(prod, mode) => setPayModal({ product: prod, mode })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg">No results found</h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">Try a different search or browse another category.</p>
              <Button
                variant="outline"
                className="mt-5 rounded-xl font-bold"
                onClick={() => { setSearch(""); handleCategoryChange("All"); }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="bg-muted/40 border-y border-border py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Lock, title: "Secure", desc: "PCI-DSS compliant" },
              { icon: Download, title: "Instant Access", desc: "Immediate delivery" },
              { icon: BadgeCheck, title: "Quality", desc: "Reviewed products only" },
              { icon: MessageCircle, title: "Support", desc: "Included with purchase" },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="space-y-2">
                  <IconComp size={24} className="text-primary mx-auto" />
                  <div className="font-bold text-sm text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        open={!!payModal}
        onClose={() => setPayModal(null)}
        product={payModal?.product ?? null}
        mode={payModal?.mode ?? "buy"}
      />
    </PageLayout>
  );
}
