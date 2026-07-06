import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Camera,
  Home,
  UtensilsCrossed,
  Tickets,
  Truck,
  FileText,
  GraduationCap,
  Wrench,
  MapPin,
  Star,
  Clock,
  Users,
  ChevronRight,
  Search,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BookingModal from "@/components/marketplace/BookingModal";
import {
  BOOKING_CATEGORY_LABELS,
  type BookingCategory,
  type BookingItem,
} from "@/types/marketplace";
import { BOOKING_ITEMS } from "@/data/booking-catalog";

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<BookingCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  agritourism: Camera,
  farm_stay: Home,
  restaurant: UtensilsCrossed,
  events_festivals: Tickets,
  transportation: Truck,
  digital_products: FileText,
  education: GraduationCap,
  agriculture_services: Wrench,
};

// Hero accent colour per category
const ACCENT_MAP: Record<BookingCategory, string> = {
  agritourism:         "from-green-600 to-emerald-500",
  farm_stay:           "from-amber-600 to-yellow-500",
  restaurant:          "from-orange-600 to-red-500",
  events_festivals:    "from-purple-600 to-pink-500",
  transportation:      "from-sky-600 to-blue-500",
  digital_products:    "from-indigo-600 to-violet-500",
  education:           "from-teal-600 to-cyan-500",
  agriculture_services:"from-lime-600 to-green-500",
};

const CATEGORY_DESCRIPTIONS: Record<BookingCategory, string> = {
  agritourism:          "Guided farm tours, harvest experiences and cultural farm activities.",
  farm_stay:            "Eco-lodges, farmhouses and rustic cottages on working farms.",
  restaurant:           "Farm-to-table dining, lakeside grills and traditional Ugandan cuisine.",
  events_festivals:     "Harvest festivals, coffee workshops and community celebrations.",
  transportation:       "Farm produce transfers, airport pickups and 4x4 tours.",
  digital_products:     "Mobile apps, spreadsheet bundles and digital farming tools.",
  education:            "Certified courses, bootcamps and hands-on agritech training.",
  agriculture_services: "Soil testing, farm advisory and agronomy consultancy.",
};

const AVAILABILITY_STYLES: Record<string, string> = {
  available: "bg-green-100 text-green-700 border-green-200",
  limited:   "bg-amber-100 text-amber-700 border-amber-200",
  booked:    "bg-red-100 text-red-700 border-red-200",
};

const ALL_CATEGORIES = Object.keys(BOOKING_CATEGORY_LABELS) as BookingCategory[];

// ── BookingCard ───────────────────────────────────────────────────────────────
function BookingCard({ item, onBook }: { item: BookingItem; onBook: (item: BookingItem) => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/locale/dairy.webp";
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${AVAILABILITY_STYLES[item.availability]}`}>
            {item.availability === "available" ? "Available" : item.availability === "limited" ? "Limited" : "Booked"}
          </span>
        </div>
        {item.farmName && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <p className="text-white text-xs font-medium truncate">{item.farmName}</p>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="font-bold text-sm text-foreground leading-snug">{item.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{item.shortDescription}</p>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {item.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {item.location}
            </span>
          )}
          {item.rating && (
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={11} fill="currentColor" /> {item.rating}
              <span className="text-muted-foreground font-normal">({item.reviewCount})</span>
            </span>
          )}
        </div>

        {/* Detail chips */}
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(item.details).slice(0, 2).map(([k, v]) => (
            <span key={k} className="inline-flex items-center gap-1 text-[11px] bg-muted rounded-full px-2 py-0.5 text-muted-foreground">
              {k === "duration" && <Clock size={10} />}
              {k === "groupSize" || k === "guests" || k === "passengers" ? <Users size={10} /> : null}
              {v}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between gap-3 border-t border-border pt-3">
        <div>
          <span className="text-primary font-extrabold text-base">
            UGX {item.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground ml-1">/ {item.unit}</span>
        </div>
        <Button
          size="sm"
          disabled={item.availability === "booked"}
          onClick={() => onBook(item)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4"
        >
          {item.availability === "booked" ? "Fully Booked" : "Book Now"}
        </Button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as BookingCategory | null;
  const activeCategory: BookingCategory = ALL_CATEGORIES.includes(categoryParam as BookingCategory)
    ? (categoryParam as BookingCategory)
    : "agritourism";

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<BookingItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const setCategory = (cat: BookingCategory) => {
    setSearchParams({ category: cat });
    setSearch("");
  };

  const filteredItems = useMemo(() => {
    const base = BOOKING_ITEMS.filter((i) => i.bookingCategory === activeCategory);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.shortDescription.toLowerCase().includes(q) ||
        (i.location ?? "").toLowerCase().includes(q) ||
        i.tags.some((t) => t.includes(q))
    );
  }, [activeCategory, search]);

  const Icon = ICON_MAP[activeCategory];
  const accent = ACCENT_MAP[activeCategory];

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className={`bg-gradient-to-r ${accent} text-white`}>
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Book Your Experience</span>
            <ChevronRight size={14} />
            <span className="text-white font-semibold">{BOOKING_CATEGORY_LABELS[activeCategory]}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                {BOOKING_CATEGORY_LABELS[activeCategory]}
              </h1>
              <p className="mt-1 text-white/85 text-sm md:text-base max-w-xl">
                {CATEGORY_DESCRIPTIONS[activeCategory]}
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-6 max-w-md relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder={`Search ${BOOKING_CATEGORY_LABELS[activeCategory]}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* ── Category tabs ── */}
      <section className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => {
              const CatIcon = ICON_MAP[cat];
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  <CatIcon size={14} />
                  {BOOKING_CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">

          {/* Results count */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{filteredItems.length}</strong> {filteredItems.length === 1 ? "result" : "results"}
              {search && <> for <strong className="text-foreground">"{search}"</strong></>}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Leaf size={13} className="text-primary" />
              All experiences are from verified Agri2rist partners
            </div>
          </div>

          {/* Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <BookingCard
                  key={item.id}
                  item={item}
                  onBook={(i) => { setSelectedItem(i); setModalOpen(true); }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Icon size={28} className="text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-lg">No results found</h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                Try a different search term or browse another category.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}

          {/* ── Explore other categories ── */}
          <div className="mt-16">
            <h2 className="text-xl font-extrabold text-foreground mb-4">Explore Other Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ALL_CATEGORIES.filter((c) => c !== activeCategory).map((cat) => {
                const CatIcon = ICON_MAP[cat];
                const count = BOOKING_ITEMS.filter((i) => i.bookingCategory === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="text-left rounded-2xl border border-border bg-card hover:border-primary/60 hover:bg-primary/5 transition p-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition">
                      <CatIcon size={18} className="text-muted-foreground group-hover:text-primary transition" />
                    </div>
                    <div className="font-semibold text-sm text-foreground leading-snug">
                      {BOOKING_CATEGORY_LABELS[cat]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{count} listing{count !== 1 ? "s" : ""}</div>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium mt-2 opacity-0 group-hover:opacity-100 transition">
                      Browse <ArrowRight size={11} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedItem(null); }}
        item={selectedItem}
      />
    </PageLayout>
  );
}
