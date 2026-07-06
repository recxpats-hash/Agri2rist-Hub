/**
 * Agri2rist Hub – New Marketplace Shell with product grid, faceted search, cart
 */
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search, SlidersHorizontal, ShoppingCart, X, ChevronDown, ChevronRight,
  Leaf, TrendingUp, Sparkles, ArrowRight, LayoutList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CartSidebar } from "@/components/marketplace/CartSidebar";
import BookingExplorer from "@/components/marketplace/BookingExplorer";
import { UtensilsCrossed, Tickets, Home, Wrench, GraduationCap, Truck, FileText, Camera } from "lucide-react";
import { DigitalMasterButtonModal } from "@/components/marketplace/digital/DigitalMasterButtonModal";

import { searchCatalog, getAutocompleteSuggestions } from "@/lib/search-engine";

import { TOP_CATEGORIES, getSubcategories, SUBCATEGORY_PRODUCTS } from "@/data/categories";

const BOOKING_ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Camera, Home, UtensilsCrossed, Tickets, Truck, FileText, GraduationCap, Wrench,
};
import { useCart } from "@/hooks/use-cart";
import {
  BOOKING_CATEGORY_ICONS,
  BOOKING_CATEGORY_LABELS,
} from "@/types/marketplace";
import type { ProductSearchFilters } from "@/types/marketplace";


const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Most Popular" },
];

const CERTIFICATIONS = ["Organic", "Fair Trade", "GlobalGAP", "HACCP", "Rainforest Alliance", "ISTA", "Halal"];

export function MarketplaceShell() {
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [bookingHubOpen, setBookingHubOpen] = useState(false);
  const [digitalModalOpen, setDigitalModalOpen] = useState(false);

  const [viewMode, setViewMode] = useState<'products'|'bookings'>('products');
  const [activeBookingService, setActiveBookingService] = useState<string>('restaurant');
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<ProductSearchFilters>({
    sortBy: "relevance",
    page: 1,
    pageSize: 24,
  });
  const [pendingFilters, setPendingFilters] = useState<ProductSearchFilters>({
    sortBy: "relevance",
    page: 1,
    pageSize: 24,
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const { count: cartCount } = useCart();

  // Slide animation state
  const prevPageRef = useRef(filters.page ?? 1);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const prev = prevPageRef.current;
    const curr = filters.page ?? 1;
    if (prev !== curr) {
      setSlideDir(curr > prev ? "left" : "right");
      setAnimKey((k) => k + 1);
      prevPageRef.current = curr;
      const t = setTimeout(() => setSlideDir(null), 400);
      return () => clearTimeout(t);
    }
  }, [filters.page]);

  // Debounce query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Autocomplete
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setSuggestions(getAutocompleteSuggestions(debouncedQuery, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  // Click outside to close suggestions
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeFilters = { ...filters, query: debouncedQuery };
  const result = useMemo(() => searchCatalog(activeFilters), [activeFilters]);

  const updateFilter = useCallback(<K extends keyof ProductSearchFilters>(key: K, value: ProductSearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value, ...(key !== "page" ? { page: 1 } : {}) }));
  }, []);

  const updatePendingFilter = useCallback(<K extends keyof ProductSearchFilters>(key: K, value: ProductSearchFilters[K]) => {
    setPendingFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const applyFilters = useCallback(() => {
    setFilters({ ...pendingFilters, page: 1 });
    setFiltersOpen(false);
  }, [pendingFilters]);

  const clearFilters = useCallback(() => {
    setQuery("");
    const reset: ProductSearchFilters = { sortBy: "relevance", page: 1, pageSize: 24 };
    setFilters(reset);
    setPendingFilters(reset);
  }, []);

  const clearPendingFilters = useCallback(() => {
    const reset: ProductSearchFilters = { sortBy: "relevance", page: 1, pageSize: 24 };
    setPendingFilters(reset);
  }, []);

  // Sync pending filters when panel opens
  useEffect(() => {
    if (filtersOpen) setPendingFilters(filters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersOpen]);

  const hasActiveFilters = query || filters.categoryId || filters.subcategoryId || filters.organicStatus?.length || filters.certifications?.length || filters.priceMin || filters.priceMax;
  const hasPendingChanges = JSON.stringify(pendingFilters) !== JSON.stringify(filters);

  const selectedCategory = TOP_CATEGORIES.find((c) => c.id === pendingFilters.categoryId);
  const subcategories = pendingFilters.categoryId ? getSubcategories(pendingFilters.categoryId) : [];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-primary py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Badge className="mb-3 bg-secondary text-secondary-foreground">Agri2rist Hub Marketplace</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground max-w-3xl leading-tight">
                Farm-to-Table, Direct from Producer
              </h1>
              <p className="mt-3 text-white text-lg max-w-2xl font-medium">
                {result.total.toLocaleString()} verified products across {TOP_CATEGORIES.length} categories — fresh produce, livestock, honey, spices, export goods and more.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-primary-foreground border border-primary-foreground/20 rounded-xl p-5 bg-primary-foreground/10 min-w-[280px]">
              <Stat value={String(result.total)} label="Products" />
              <Stat value={String(TOP_CATEGORIES.length)} label="Categories" />
              <Stat value="10" label="Verified Farmers" />
            </div>

              {/* Master Booking Button */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {/* Digital Products & Services Master Button */}
                <button
                  onClick={() => setDigitalModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-3 text-secondary-foreground font-bold shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition"
                >
                  <Sparkles size={18} />
                  Digital Marketplace
                  <ArrowRight size={16} className="ml-1" />
                </button>

                {/* Booking experiences */}
                <button

                onClick={() => {
                  setActiveBookingService('restaurant');
                  setViewMode('bookings');
                  setBookingHubOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition"
              >
                <Sparkles size={18} />
                Book Experiences
                <ArrowRight size={16} className="ml-1" />
              </button>
              <button
                onClick={() => {
                  setViewMode('products');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-foreground/10 px-6 py-3 text-white font-bold border border-primary-foreground/25 hover:bg-primary-foreground/15 transition"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-muted border-b border-border py-3 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => { setViewMode('products'); updateFilter("categoryId", undefined); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${!filters.categoryId && viewMode==='products' ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`}
            >
              All Products
            </button>

            <button
              onClick={() => { setViewMode('bookings'); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${viewMode==='bookings' ? "bg-secondary text-secondary-foreground border-secondary" : "bg-card text-foreground border-border hover:border-secondary hover:text-secondary"}`}
            >
              Bookings
            </button>

            {TOP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setViewMode('products'); updateFilter("categoryId", filters.categoryId === cat.id ? undefined : cat.id); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${filters.categoryId === cat.id && viewMode==='products' ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Sort bar */}
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap">
          <div className="flex-1 relative min-w-[200px] flex" ref={searchRef}>
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { setDebouncedQuery(query); setShowSuggestions(false); } }}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Search products, SKU, scientific name, farm..."
                className="pl-9 pr-8 rounded-r-none"
              />
              {query && (
                <button onClick={() => { setQuery(""); setDebouncedQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setQuery(s); setDebouncedQuery(s); setShowSuggestions(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Search size={12} className="text-muted-foreground" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={() => { setDebouncedQuery(query); setShowSuggestions(false); }}
              className="rounded-l-none h-[40px] bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Search"
            >
              <Search size={16} className="mr-1" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>

          <Select value={filters.sortBy ?? "relevance"} onValueChange={(v) => updateFilter("sortBy", v as ProductSearchFilters["sortBy"])}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={filtersOpen ? "border-primary text-primary" : ""}
          >
            <SlidersHorizontal size={15} className="mr-2" />
            Filters
            {hasActiveFilters && <span className="ml-1 w-2 h-2 rounded-full bg-primary" />}
          </Button>

          <Button
            variant="outline"
            onClick={() => setCartOpen(true)}
            className="relative"
            aria-label={`Open cart (${cartCount} items)`}
          >
            <ShoppingCart size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Filters Panel */}
        {filtersOpen && (
          <div className="container mx-auto px-4 mt-3 pb-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Subcategory */}
                {subcategories.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Subcategory</p>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox
                          checked={!pendingFilters.subcategoryId}
                          onCheckedChange={() => updatePendingFilter("subcategoryId", undefined)}
                        />
                        <span>All {selectedCategory?.name}</span>
                      </label>
                      {subcategories.map((sub) => (
                        <label key={sub.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={pendingFilters.subcategoryId === sub.id}
                            onCheckedChange={() => updatePendingFilter("subcategoryId", pendingFilters.subcategoryId === sub.id ? undefined : sub.id)}
                          />
                          <span className="text-muted-foreground">{sub.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Organic */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Organic Status</p>
                  {(["certified_organic", "conventional", "transitional"] as const).map((status) => (
                    <label key={status} className="flex items-center gap-2 text-sm cursor-pointer mb-1">
                      <Checkbox
                        checked={pendingFilters.organicStatus?.includes(status) ?? false}
                        onCheckedChange={(checked) => {
                          const current = pendingFilters.organicStatus ?? [];
                          updatePendingFilter("organicStatus", checked ? [...current, status] : current.filter((s) => s !== status));
                        }}
                      />
                      <span className="text-muted-foreground capitalize flex items-center gap-1">
                        {status === "certified_organic" && <Leaf size={11} className="text-accent" />}
                        {status.replace(/_/g, " ")}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Certifications */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Certifications</p>
                  {CERTIFICATIONS.map((cert) => (
                    <label key={cert} className="flex items-center gap-2 text-sm cursor-pointer mb-1">
                      <Checkbox
                        checked={pendingFilters.certifications?.includes(cert) ?? false}
                        onCheckedChange={(checked) => {
                          const current = pendingFilters.certifications ?? [];
                          updatePendingFilter("certifications", checked ? [...current, cert] : current.filter((c) => c !== cert));
                        }}
                      />
                      <span className="text-muted-foreground">{cert}</span>
                    </label>
                  ))}
                </div>

                {/* Quick toggles */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Quick Filters</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={pendingFilters.isFeatured === true}
                        onCheckedChange={(c) => updatePendingFilter("isFeatured", c ? true : undefined)}
                      />
                      <span className="text-muted-foreground flex items-center gap-1"><Sparkles size={11} /> Featured only</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={pendingFilters.isTrending === true}
                        onCheckedChange={(c) => updatePendingFilter("isTrending", c ? true : undefined)}
                      />
                      <span className="text-muted-foreground flex items-center gap-1"><TrendingUp size={11} /> Trending only</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={pendingFilters.organicStatus?.includes("certified_organic") ?? false}
                        onCheckedChange={(c) => updatePendingFilter("organicStatus", c ? ["certified_organic"] : undefined)}
                      />
                      <span className="text-muted-foreground flex items-center gap-1"><Leaf size={11} className="text-accent" /> Organic only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Apply / Clear buttons */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearPendingFilters}
                  className="text-muted-foreground"
                >
                  <X size={14} className="mr-1" /> Reset
                </Button>
                <Button
                  size="sm"
                  onClick={applyFilters}
                  disabled={!hasPendingChanges}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Master Booking Services Mega-Panel */}
      {bookingHubOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setBookingHubOpen(false)}>
          <div className="absolute left-0 right-0 top-14 mx-auto w-full max-w-6xl bg-background/90 border border-border rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 sm:p-6 border-b border-border flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider text-muted-foreground">AGRI2RIST HUB</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Choose a Booking Service</h2>
                <p className="text-sm text-muted-foreground mt-1">Restaurants, farm-to-table dining, chef experiences, private events & more.</p>
              </div>
              <button
                className="rounded-xl border border-border bg-card hover:bg-muted transition p-2"
                onClick={() => setBookingHubOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(BOOKING_CATEGORY_LABELS).map(([key, title]) => {
                  const selected = activeBookingService === key;
                  const svcIcon = BOOKING_ICON_MAP[BOOKING_CATEGORY_ICONS[key as keyof typeof BOOKING_CATEGORY_ICONS]];
                  const svcSubtitle = key === "restaurant" ? "Restaurants & cuisine booking" : title;
                  const svcSubtitle2 = key === "farm_stay" ? "Farm stays & accommodations" : svcSubtitle;
                  const svcDescription = key === "restaurant"
                    ? "OpenTable-style dining reservations with farm-to-table storytelling, availability & instant confirmations."
                    : "Book experiences with availability, premium confirmation and modern booking flow.";
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveBookingService(key);
                        setViewMode('bookings');
                        setBookingHubOpen(false);
                      }}
                      className={`text-left rounded-2xl border transition overflow-hidden group ${selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/80'}`}
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-muted/70 ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
                            {svcIcon && <svcIcon />}
                          </div>
                          <div>
                    <div className="font-extrabold text-foreground leading-tight">{title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{svcSubtitle2}</div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-muted-foreground line-clamp-3">{svcDescription}</div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                            <ArrowRight size={14} />
                            Browse
                          </div>
                          <div className="opacity-70 group-hover:opacity-100 transition">
                            {selected ? 'Selected' : ''}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="font-bold text-foreground">Premium Booking Experience</div>
                  <p className="text-sm text-muted-foreground mt-1">Enjoy OpenTable-style availability, farm-to-table storytelling, and modern confirmations.</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="font-bold text-foreground">Instant Search & Filters</div>
                  <p className="text-sm text-muted-foreground mt-1">Date, time slots, guests, indoor/outdoor, cuisine, occasion, and payment options.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{result.products.length}</strong> of{" "}
                <strong className="text-foreground">{result.total}</strong> products
                {selectedCategory && ` in ${selectedCategory.name}`}
                {debouncedQuery && ` for "${debouncedQuery}"`}
              </p>
            </div>
            {/* Active filter chips */}
            <div className="flex flex-wrap gap-2">
              {filters.organicStatus?.map((s) => (
                <Badge key={s} variant="outline" className="gap-1 cursor-pointer" onClick={() => updateFilter("organicStatus", filters.organicStatus?.filter((x) => x !== s))}>
                  {s.replace(/_/g, " ")} <X size={10} />
                </Badge>
              ))}
              {filters.certifications?.map((c) => (
                <Badge key={c} variant="outline" className="gap-1 cursor-pointer" onClick={() => updateFilter("certifications", filters.certifications?.filter((x) => x !== c))}>
                  {c} <X size={10} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Facet summary row */}
          {result.facets.categories.length > 0 && !filters.categoryId && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {result.facets.categories.slice(0, 8).map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateFilter("categoryId", f.id)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-muted border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {f.name} <span className="text-muted-foreground ml-1">({f.count})</span>
                </button>
              ))}
            </div>
          )}

          {/* Product Grid with slide animation or Bookings explorer */}
          {viewMode === 'bookings' ? (
            <BookingExplorer activeService={activeBookingService} />
          ) : (
            result.products.length > 0 ? (
              <div
                key={animKey}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                style={
                  slideDir
                    ? {
                        animation: `slideIn${slideDir === "left" ? "Left" : "Right"} 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                      }
                    : undefined
                }
              >
                {result.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">No products found</p>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )
          )}

          {/* Pagination */}
          {result.total > 0 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <Button
                variant="outline"
                disabled={(filters.page ?? 1) <= 1}
                onClick={() => { updateFilter("page", (filters.page ?? 1) - 1); }}
              >
                Previous
              </Button>
              {(() => {
                const currentPage = filters.page ?? 1;
                const totalPages = Math.ceil(result.total / (filters.pageSize ?? 24));
                const pages: number[] = [];
                const start = Math.max(1, currentPage - 2);
                const end = Math.min(totalPages, currentPage + 2);
                for (let i = start; i <= end; i++) pages.push(i);
                return (
                  <>
                    {start > 1 && (
                      <>
                        <button onClick={() => { updateFilter("page", 1); }} className="w-9 h-9 rounded-md text-sm font-medium hover:bg-muted transition-colors">1</button>
                        {start > 2 && <span className="px-1 text-muted-foreground">...</span>}
                      </>
                    )}
                    {pages.map((p) => (
                      <button
                        key={p}
                        onClick={() => { updateFilter("page", p); }}
                        className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${p === currentPage ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
                      >
                        {p}
                      </button>
                    ))}
                    {end < totalPages && (
                      <>
                        {end < totalPages - 1 && <span className="px-1 text-muted-foreground">...</span>}
                        <button onClick={() => { updateFilter("page", totalPages); }} className="w-9 h-9 rounded-md text-sm font-medium hover:bg-muted transition-colors">{totalPages}</button>
                      </>
                    )}
                  </>
                );
              })()}
              <Button
                variant="outline"
                disabled={(filters.page ?? 1) >= Math.ceil(result.total / (filters.pageSize ?? 24))}
                onClick={() => { updateFilter("page", (filters.page ?? 1) + 1); }}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Facets footer strip */}
      {digitalModalOpen && (
        <DigitalMasterButtonModal open={digitalModalOpen} onOpenChange={setDigitalModalOpen} />
      )}

      <section className="py-10 bg-muted border-t border-border">

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Become a Vendor</h2>
              <p className="text-muted-foreground text-sm mt-1">List your farm products and reach thousands of buyers.</p>
            </div>
            <Link to="/get-listed">
              <Button className="bg-primary text-primary-foreground">
                Start Selling <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </PageLayout>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-primary-foreground/70">{label}</div>
    </div>
  );
}
