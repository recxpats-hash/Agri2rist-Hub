/**
 * Agri2rist Hub – New Marketplace Shell with product grid, faceted search, cart
 */
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search, SlidersHorizontal, ShoppingCart, X, ChevronDown, ChevronUp,
  Filter, Leaf, Star, TrendingUp, Sparkles, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CartSidebar } from "@/components/marketplace/CartSidebar";
import { searchCatalog, getAutocompleteSuggestions } from "@/lib/search-engine";
import { TOP_CATEGORIES, getSubcategories } from "@/data/categories";
import { useCart } from "@/hooks/use-cart";
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
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<ProductSearchFilters>({
    sortBy: "relevance",
    page: 1,
    pageSize: 24,
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const { count: cartCount } = useCart();

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
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setFilters({ sortBy: "relevance", page: 1, pageSize: 24 });
  }, []);

  const hasActiveFilters = query || filters.categoryId || filters.subcategoryId || filters.organicStatus?.length || filters.certifications?.length || filters.priceMin || filters.priceMax;

  const selectedCategory = TOP_CATEGORIES.find((c) => c.id === filters.categoryId);
  const subcategories = filters.categoryId ? getSubcategories(filters.categoryId) : [];

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
              <p className="mt-3 text-primary-foreground/78 text-lg max-w-2xl">
                {result.total.toLocaleString()} verified products across {TOP_CATEGORIES.length} categories — fresh produce, livestock, honey, spices, export goods and more.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-primary-foreground border border-primary-foreground/20 rounded-xl p-5 bg-primary-foreground/10 min-w-[280px]">
              <Stat value={String(result.total)} label="Products" />
              <Stat value={String(TOP_CATEGORIES.length)} label="Categories" />
              <Stat value="10" label="Verified Farmers" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-muted border-b border-border py-3 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => updateFilter("categoryId", undefined)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${!filters.categoryId ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`}
            >
              All
            </button>
            {TOP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateFilter("categoryId", filters.categoryId === cat.id ? undefined : cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${filters.categoryId === cat.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary hover:text-primary"}`}
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
          <div className="flex-1 relative min-w-[200px]" ref={searchRef}>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search products, SKU, scientific name, farm..."
              className="pl-9 pr-8"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); setShowSuggestions(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Search size={12} className="text-muted-foreground" />
                    {s}
                  </button>
                ))}
              </div>
            )}
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
                          checked={!filters.subcategoryId}
                          onCheckedChange={() => updateFilter("subcategoryId", undefined)}
                        />
                        <span>All {selectedCategory?.name}</span>
                      </label>
                      {subcategories.map((sub) => (
                        <label key={sub.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={filters.subcategoryId === sub.id}
                            onCheckedChange={() => updateFilter("subcategoryId", filters.subcategoryId === sub.id ? undefined : sub.id)}
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
                        checked={filters.organicStatus?.includes(status) ?? false}
                        onCheckedChange={(checked) => {
                          const current = filters.organicStatus ?? [];
                          updateFilter("organicStatus", checked ? [...current, status] : current.filter((s) => s !== status));
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
                        checked={filters.certifications?.includes(cert) ?? false}
                        onCheckedChange={(checked) => {
                          const current = filters.certifications ?? [];
                          updateFilter("certifications", checked ? [...current, cert] : current.filter((c) => c !== cert));
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
                        checked={filters.isFeatured === true}
                        onCheckedChange={(c) => updateFilter("isFeatured", c ? true : undefined)}
                      />
                      <span className="text-muted-foreground flex items-center gap-1"><Sparkles size={11} /> Featured only</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={filters.isTrending === true}
                        onCheckedChange={(c) => updateFilter("isTrending", c ? true : undefined)}
                      />
                      <span className="text-muted-foreground flex items-center gap-1"><TrendingUp size={11} /> Trending only</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={filters.organicStatus?.includes("certified_organic") ?? false}
                        onCheckedChange={(c) => updateFilter("organicStatus", c ? ["certified_organic"] : undefined)}
                      />
                      <span className="text-muted-foreground flex items-center gap-1"><Leaf size={11} className="text-accent" /> Organic only</span>
                    </label>
                  </div>

                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-3 text-xs text-muted-foreground">
                      <X size={12} className="mr-1" /> Clear all filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

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

          {/* Product Grid */}
          {result.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
          )}

          {/* Pagination */}
          {result.total > (filters.pageSize ?? 24) && (
            <div className="flex justify-center mt-10 gap-2">
              <Button
                variant="outline"
                disabled={(filters.page ?? 1) <= 1}
                onClick={() => updateFilter("page", (filters.page ?? 1) - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Page {filters.page ?? 1} of {Math.ceil(result.total / (filters.pageSize ?? 24))}
              </span>
              <Button
                variant="outline"
                disabled={(filters.page ?? 1) >= Math.ceil(result.total / (filters.pageSize ?? 24))}
                onClick={() => updateFilter("page", (filters.page ?? 1) + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Facets footer strip */}
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
