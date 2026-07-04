/**
 * Agri2rist Hub – Dedicated Marketplace Search Page
 * Reads ?q= from URL, renders SearchBar + full result grid.
 */
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { CartSidebar } from "@/components/marketplace/CartSidebar";
import { searchCatalog } from "@/lib/search-engine";
import { TOP_CATEGORIES } from "@/data/categories";
import { useCart } from "@/hooks/use-cart";
import type { ProductSearchFilters } from "@/types/marketplace";

const SORT_OPTIONS = [
  { value: "relevance",  label: "Relevance" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "newest",     label: "Newest" },
  { value: "trending",   label: "Trending" },
];

export default function MarketplaceSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartOpen, setCartOpen] = useState(false);
  const { count: cartCount } = useCart();

  const q          = searchParams.get("q") ?? "";
  const categoryId = searchParams.get("category") ?? undefined;
  const sortBy     = (searchParams.get("sort") ?? "relevance") as ProductSearchFilters["sortBy"];
  const page       = Number(searchParams.get("page") ?? "1");
  const pageSize   = 24;

  const filters: ProductSearchFilters = useMemo(() => ({
    query: q,
    categoryId,
    sortBy,
    page,
    pageSize,
    isFeatured:  searchParams.get("featured") === "true" ? true : undefined,
    isTrending:  searchParams.get("trending") === "true" ? true : undefined,
    organicStatus: searchParams.get("organic") === "true" ? ["certified_organic"] : undefined,
  }), [q, categoryId, sortBy, page, searchParams]);

  const result = useMemo(() => searchCatalog(filters), [filters]);

  const set = (key: string, val: string | undefined) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set(key, val); else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const selectedCat = TOP_CATEGORIES.find((c) => c.id === categoryId);

  return (
    <PageLayout>
      {/* Search hero */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <Link to="/marketplace" className="inline-flex items-center gap-1 text-primary-foreground/60 hover:text-secondary text-sm mb-4">
            <ArrowLeft size={13} /> Back to Marketplace
          </Link>
          <h1 className="text-2xl font-extrabold text-primary-foreground mb-4">
            {q ? `Search: "${q}"` : "Browse All Products"}
          </h1>
          <SearchBar
            autoFocus={!q}
            inputClassName="bg-card text-foreground border-border"
            onSearch={(newQ) => set("q", newQ)}
          />
        </div>
      </section>

      {/* Filters + sort bar */}
      <section className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap">
          {/* Category pills */}
          <button
            onClick={() => set("category", undefined)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${!categoryId ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary"}`}
          >
            All
          </button>
          {TOP_CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => set("category", cat.id === categoryId ? undefined : cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${cat.id === categoryId ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary"}`}
            >
              {cat.name}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <Select value={sortBy ?? "relevance"} onValueChange={(v) => set("sort", v)}>
              <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-8 h-8 rounded-md border border-border flex items-center justify-center text-foreground hover:text-primary"
              aria-label={`Cart (${cartCount})`}
            >
              <Search size={14} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-secondary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          {/* Active filters */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{result.total}</strong> result{result.total !== 1 ? "s" : ""}
              {q && <> for <strong className="text-foreground">"{q}"</strong></>}
              {selectedCat && <> in <strong className="text-foreground">{selectedCat.name}</strong></>}
            </p>
            {q && (
              <Badge variant="outline" className="gap-1 cursor-pointer" onClick={() => set("q", undefined)}>
                "{q}" <X size={10} />
              </Badge>
            )}
            {selectedCat && (
              <Badge variant="outline" className="gap-1 cursor-pointer" onClick={() => set("category", undefined)}>
                {selectedCat.name} <X size={10} />
              </Badge>
            )}
          </div>

          {/* Facet chips */}
          {result.facets.categories.length > 1 && !categoryId && (
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {result.facets.categories.slice(0, 10).map((f) => (
                <button
                  key={f.id}
                  onClick={() => set("category", f.id)}
                  className="flex-shrink-0 px-3 py-1 rounded-full text-xs bg-muted border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {f.name} ({f.count})
                </button>
              ))}
            </div>
          )}

          {result.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {result.products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-muted-foreground/20 mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">No results found</p>
              <p className="text-muted-foreground mb-6">
                {q ? `No products match "${q}". Try a broader term.` : "No products in this category yet."}
              </p>
              <Link to="/marketplace"><Button>Browse All Products</Button></Link>
            </div>
          )}

          {/* Pagination */}
          {result.total > pageSize && (
            <div className="flex justify-center mt-10 gap-2">
              <Button variant="outline" disabled={page <= 1} onClick={() => set("page", String(page - 1))}>Previous</Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Page {page} of {Math.ceil(result.total / pageSize)}
              </span>
              <Button variant="outline" disabled={page >= Math.ceil(result.total / pageSize)} onClick={() => set("page", String(page + 1))}>Next</Button>
            </div>
          )}
        </div>
      </section>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </PageLayout>
  );
}
