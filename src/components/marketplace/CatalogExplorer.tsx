/**
 * Agri2rist Hub – Catalog Explorer
 * Amazon-style 3-level hierarchical product catalog browser.
 * Level 1: Master Categories → Level 2: Subcategories → Level 3: Products
 */
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, X, ChevronRight, ChevronDown, Package, Layers,
  Sprout, Apple, Leaf, Beef, Fish, Hexagon, Flower2, TreePine,
  FlaskConical, Settings2, ShieldCheck, HeartPulse, Globe,
  TrendingUp, Star, Wheat, Carrot, Salad, CircleDot, Bird,
  Milk, Circle, Droplets, Cherry, Coffee, Flame, Shield, Syringe,
  ShoppingBag, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCatalog } from "@/lib/catalog-store";
import type { MarketplaceCategory, MarketplaceProduct } from "@/types/marketplace";
import { cn } from "@/lib/utils";

// ─── ICON MAP ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, typeof Sprout> = {
  Sprout, Apple, Leaf, Beef, Fish, Hexagon, Flower2, TreePine,
  FlaskConical, Settings2, ShieldCheck, HeartPulse, Globe, TrendingUp, Star,
  Wheat, Carrot, Salad, CircleDot, Bird, Milk, Circle, Droplets, Cherry,
  Coffee, Flame, Shield, Syringe, ShoppingBag, Package, Truck,
};

function CategoryIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] || Layers;
  return <Icon size={size} className={className} />;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function CatalogExplorer() {
  const {
    getTopCategories, getSubcategories, getProductsBySubcategory,
    getCategoryById, searchCatalog,
  } = useCatalog();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const topCategories = useMemo(() => getTopCategories().filter((c) => c.isActive), [getTopCategories]);

  // Search results
  const searchResults = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return null;
    return searchCatalog(debouncedQuery);
  }, [debouncedQuery, searchCatalog]);

  // Toggle category expansion
  const toggleCat = useCallback((id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSub = useCallback((id: string) => {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleProductClick = useCallback((product: MarketplaceProduct, subId: string, catId: string) => {
    setSelectedProduct(product.id);
    // Navigate to product editor with pre-populated fields
    const params = new URLSearchParams({
      categoryId: catId,
      subcategoryId: subId,
      productName: product.name,
    });
    navigate(`/marketplace/catalog/editor/${product.id}?${params.toString()}`);
  }, [navigate]);

  const handleNewProductClick = useCallback((catId: string, subId: string, subName: string, catName: string) => {
    const params = new URLSearchParams({
      categoryId: catId,
      subcategoryId: subId,
      subcategoryName: subName,
      categoryName: catName,
    });
    navigate(`/marketplace/catalog/editor?${params.toString()}`);
  }, [navigate]);

  // Count products in a category
  const getCategoryProductCount = useCallback((catId: string) => {
    const subs = getSubcategories(catId);
    return subs.reduce((sum, sub) => sum + getProductsBySubcategory(sub.id).length, 0);
  }, [getSubcategories, getProductsBySubcategory]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search categories, subcategories, products..."
          className="pl-11 pr-10 h-12 text-base rounded-xl border-2 focus-visible:ring-primary/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results Mode */}
      {searchResults ? (
        <SearchResultsView
          results={searchResults}
          query={debouncedQuery}
          getCategoryById={getCategoryById}
          onProductClick={handleProductClick}
          getSubcategories={getSubcategories}
        />
      ) : (
        /* Hierarchical Browse Mode */
        <div className="space-y-3">
          {topCategories.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              category={cat}
              isExpanded={expandedCats.has(cat.id)}
              onToggle={() => toggleCat(cat.id)}
              expandedSubs={expandedSubs}
              onToggleSub={toggleSub}
              selectedProduct={selectedProduct}
              onProductClick={handleProductClick}
              onNewProductClick={handleNewProductClick}
              getSubcategories={getSubcategories}
              getProductsBySubcategory={getProductsBySubcategory}
              getCategoryProductCount={getCategoryProductCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CATEGORY ACCORDION (LEVEL 1) ───────────────────────────────────────────

interface CategoryAccordionProps {
  category: MarketplaceCategory;
  isExpanded: boolean;
  onToggle: () => void;
  expandedSubs: Set<string>;
  onToggleSub: (id: string) => void;
  selectedProduct: string | null;
  onProductClick: (p: MarketplaceProduct, subId: string, catId: string) => void;
  onNewProductClick: (catId: string, subId: string, subName: string, catName: string) => void;
  getSubcategories: (parentId: string) => MarketplaceCategory[];
  getProductsBySubcategory: (subId: string) => MarketplaceProduct[];
  getCategoryProductCount: (catId: string) => number;
}

function CategoryAccordion({
  category, isExpanded, onToggle, expandedSubs, onToggleSub,
  selectedProduct, onProductClick, onNewProductClick,
  getSubcategories, getProductsBySubcategory, getCategoryProductCount,
}: CategoryAccordionProps) {
  const subcategories = useMemo(() => getSubcategories(category.id).filter((s) => s.isActive), [getSubcategories, category.id]);
  const productCount = getCategoryProductCount(category.id);

  return (
    <div className={cn(
      "border border-border rounded-xl overflow-hidden transition-all duration-200",
      isExpanded && "ring-1 ring-primary/20 shadow-sm"
    )}>
      {/* Category Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-4 p-4 text-left transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl",
          isExpanded && "bg-muted/30"
        )}
        aria-expanded={isExpanded}
      >
        <div className={cn(
          "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
          isExpanded ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        )}>
          <CategoryIcon name={category.icon} size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-tight">{category.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{category.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Badge variant="outline" className="text-xs font-mono">
            {productCount}
          </Badge>
          <ChevronDown
            size={18}
            className={cn(
              "text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Subcategories (Level 2) */}
      {isExpanded && (
        <div className="border-t border-border bg-background/50">
          {subcategories.length > 0 ? (
            <div className="p-2 space-y-1">
              {subcategories.map((sub) => (
                <SubcategoryAccordion
                  key={sub.id}
                  subcategory={sub}
                  parentCategory={category}
                  isExpanded={expandedSubs.has(sub.id)}
                  onToggle={() => onToggleSub(sub.id)}
                  selectedProduct={selectedProduct}
                  onProductClick={onProductClick}
                  onNewProductClick={onNewProductClick}
                  getProductsBySubcategory={getProductsBySubcategory}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No subcategories yet. Add subcategories from the Admin panel.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SUBCATEGORY ACCORDION (LEVEL 2) ────────────────────────────────────────

interface SubcategoryAccordionProps {
  subcategory: MarketplaceCategory;
  parentCategory: MarketplaceCategory;
  isExpanded: boolean;
  onToggle: () => void;
  selectedProduct: string | null;
  onProductClick: (p: MarketplaceProduct, subId: string, catId: string) => void;
  onNewProductClick: (catId: string, subId: string, subName: string, catName: string) => void;
  getProductsBySubcategory: (subId: string) => MarketplaceProduct[];
}

function SubcategoryAccordion({
  subcategory, parentCategory, isExpanded, onToggle,
  selectedProduct, onProductClick, onNewProductClick,
  getProductsBySubcategory,
}: SubcategoryAccordionProps) {
  const products = useMemo(() => getProductsBySubcategory(subcategory.id), [getProductsBySubcategory, subcategory.id]);

  return (
    <div className={cn(
      "rounded-lg overflow-hidden transition-all",
      isExpanded && "bg-muted/30"
    )}>
      {/* Subcategory Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors rounded-lg",
          "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        )}
        aria-expanded={isExpanded}
      >
        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
          <CategoryIcon name={subcategory.icon} size={14} className="text-primary" />
        </div>
        <span className="flex-1 font-medium text-sm text-foreground">{subcategory.name}</span>
        <Badge variant="outline" className="text-[10px] font-mono px-1.5">
          {products.length}
        </Badge>
        <ChevronRight
          size={14}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-90"
          )}
        />
      </button>

      {/* Products (Level 3) */}
      {isExpanded && (
        <div className="pl-10 pr-3 pb-2">
          {products.length > 0 ? (
            <div className="space-y-0.5">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct === product.id}
                  onClick={() => onProductClick(product, subcategory.id, parentCategory.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground py-2 pl-2">
              No products yet.
            </p>
          )}
          {/* Add product button */}
          <button
            onClick={() => onNewProductClick(
              parentCategory.id, subcategory.id, subcategory.name, parentCategory.name
            )}
            className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <span className="w-5 h-5 rounded-full border border-dashed border-primary/40 flex items-center justify-center">+</span>
            Add product to {subcategory.name}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT ITEM (LEVEL 3) ─────────────────────────────────────────────────

function ProductItem({
  product, isSelected, onClick,
}: {
  product: MarketplaceProduct;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-md transition-all text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        isSelected
          ? "bg-primary/10 text-primary border border-primary/20"
          : "hover:bg-muted/60 text-foreground"
      )}
    >
      <img
        src={product.images[0] || "/locale/Marketplace/farm-produce-tomato-farm.jpg"}
        alt={product.name}
        className="w-8 h-8 rounded-md object-cover flex-shrink-0 bg-muted"
        loading="lazy"
      />
      <span className="flex-1 min-w-0 truncate" title={product.name}>{product.name}</span>
      <span className="text-xs text-muted-foreground font-mono flex-shrink-0 whitespace-nowrap">
        {product.retailPrice > 0 && `${product.currency || "UGX"} ${product.retailPrice.toLocaleString()}`}
      </span>
    </button>
  );
}

// ─── SEARCH RESULTS VIEW ────────────────────────────────────────────────────

function SearchResultsView({
  results, query, getCategoryById, onProductClick, getSubcategories,
}: {
  results: { categories: MarketplaceCategory[]; products: MarketplaceProduct[] };
  query: string;
  getCategoryById: (id: string) => MarketplaceCategory | undefined;
  onProductClick: (p: MarketplaceProduct, subId: string, catId: string) => void;
  getSubcategories: (parentId: string) => MarketplaceCategory[];
}) {
  const { categories, products } = results;
  const totalResults = categories.length + products.length;

  if (totalResults === 0) {
    return (
      <div className="text-center py-16">
        <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <p className="text-lg font-semibold text-foreground mb-2">No results found</p>
        <p className="text-muted-foreground">No matches for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Found <strong className="text-foreground">{totalResults}</strong> results for "{query}"
      </p>

      {/* Matching Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Layers size={14} /> Categories ({categories.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {categories.map((cat) => {
              const parent = cat.parentId ? getCategoryById(cat.parentId) : null;
              return (
                <div key={cat.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border">
                  <CategoryIcon name={cat.icon} size={16} className="text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{cat.name}</p>
                    {parent && <p className="text-[10px] text-muted-foreground">{parent.name}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Matching Products */}
      {products.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Package size={14} /> Products ({products.length})
          </h3>
          <div className="space-y-1">
            {products.map((product) => {
              const cat = getCategoryById(product.categoryId);
              const sub = getCategoryById(product.subcategoryId);
              return (
                <button
                  key={product.id}
                  onClick={() => onProductClick(product, product.subcategoryId, product.categoryId)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
                >
                  <img
                    src={product.images[0] || "/locale/Marketplace/farm-produce-tomato-farm.jpg"}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0 bg-muted"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate" title={product.name}>{product.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {cat?.name} → {sub?.name}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0 whitespace-nowrap">
                    {product.currency || "UGX"} {product.retailPrice.toLocaleString()}
                  </span>
                  <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
