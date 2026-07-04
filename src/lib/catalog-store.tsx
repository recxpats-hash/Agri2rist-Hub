/**
 * Agri2rist Hub – Catalog Store
 * React Context + localStorage-backed store for dynamic catalog management.
 * Provides full CRUD for categories, subcategories and products.
 */
import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { MarketplaceCategory, MarketplaceProduct } from "@/types/marketplace";
import {
  TOP_CATEGORIES as SEED_TOP,
  SUBCATEGORIES as SEED_SUBS,
  SUBCATEGORY_PRODUCTS as SEED_PRODUCTS_MAP,
  ALL_CATEGORIES as SEED_ALL,
} from "@/data/categories";
import { MASTER_CATALOG as SEED_CATALOG } from "@/data/products";

// ─── STORAGE KEYS ────────────────────────────────────────────────────────────

const KEYS = {
  CATEGORIES: "a2r_catalog_categories",
  PRODUCTS: "a2r_catalog_products",
} as const;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("a2r:catalog-changed", { detail: { key } }));
  } catch { /* storage full */ }
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── SEED DATA BUILDERS ──────────────────────────────────────────────────────

function buildSeedCategories(): MarketplaceCategory[] {
  return [...SEED_ALL];
}

function buildSeedProducts(): MarketplaceProduct[] {
  // Use the master catalog as seed, or generate stub products from SUBCATEGORY_PRODUCTS
  if (SEED_CATALOG.length > 0) return [...SEED_CATALOG];

  const products: MarketplaceProduct[] = [];
  let id = 1;
  for (const [subId, names] of Object.entries(SEED_PRODUCTS_MAP)) {
    const sub = SEED_ALL.find((c) => c.id === subId);
    if (!sub) continue;
    for (const name of names) {
      products.push({
        id: `seed-${id++}`,
        sku: `A2R-${String(1000 + id).padStart(5, "0")}`,
        slug: slugify(name),
        name,
        shortDescription: name,
        description: `Fresh ${name} from Agri2rist Hub farms.`,
        categoryId: sub.parentId!,
        subcategoryId: subId,
        productType: "fresh",
        grade: "grade_a",
        tags: [],
        unitOfSale: "kg",
        minimumOrderQty: 1,
        farmGatePrice: 5000,
        wholesalePrice: 7000,
        retailPrice: 10000,
        currency: "UGX",
        countryOfOrigin: "Uganda",
        region: "Central",
        farmerId: "farmer-01",
        farmName: "Agri2rist Demo Farm",
        organicStatus: "conventional",
        certifications: [],
        storageCondition: "ambient",
        packagingType: "bag",
        stockQty: 100,
        reorderLevel: 20,
        availability: "in_stock",
        images: [sub.image || "/locale/Marketplace/farm-produce-tomato-farm.jpg"],
        listingStatus: "active",
        isFeatured: false,
        isTrending: false,
        viewCount: 0,
        orderCount: 0,
        rating: 4.0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }
  return products;
}

// ─── CONTEXT SHAPE ───────────────────────────────────────────────────────────

interface CatalogState {
  categories: MarketplaceCategory[];
  products: MarketplaceProduct[];
  // Category CRUD
  addCategory: (cat: Omit<MarketplaceCategory, "id" | "slug">) => MarketplaceCategory;
  updateCategory: (id: string, patch: Partial<MarketplaceCategory>) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (ids: string[]) => void;
  toggleCategory: (id: string) => void;
  // Product CRUD
  addProduct: (prod: Omit<MarketplaceProduct, "id" | "sku" | "slug" | "createdAt" | "updatedAt">) => MarketplaceProduct;
  updateProduct: (id: string, patch: Partial<MarketplaceProduct>) => void;
  deleteProduct: (id: string) => void;
  // Bulk operations
  importCategories: (cats: MarketplaceCategory[]) => void;
  exportCategories: () => string;
  importProducts: (prods: MarketplaceProduct[]) => void;
  exportProducts: () => string;
  exportProductsCSV: () => string;
  // Queries
  getTopCategories: () => MarketplaceCategory[];
  getSubcategories: (parentId: string) => MarketplaceCategory[];
  getProductsBySubcategory: (subId: string) => MarketplaceProduct[];
  getProductById: (id: string) => MarketplaceProduct | undefined;
  getCategoryById: (id: string) => MarketplaceCategory | undefined;
  searchCatalog: (query: string) => { categories: MarketplaceCategory[]; products: MarketplaceProduct[] };
}

const CatalogContext = createContext<CatalogState | null>(null);

// ─── PROVIDER ────────────────────────────────────────────────────────────────

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<MarketplaceCategory[]>(() => {
    const stored = read<MarketplaceCategory[] | null>(KEYS.CATEGORIES, null);
    return stored ?? buildSeedCategories();
  });

  const [products, setProducts] = useState<MarketplaceProduct[]>(() => {
    const stored = read<MarketplaceProduct[] | null>(KEYS.PRODUCTS, null);
    return stored ?? buildSeedProducts();
  });

  // Persist on change
  useEffect(() => { write(KEYS.CATEGORIES, categories); }, [categories]);
  useEffect(() => { write(KEYS.PRODUCTS, products); }, [products]);

  // Listen for cross-tab / cross-component changes
  useEffect(() => {
    const handler = () => {
      const storedCats = read<MarketplaceCategory[] | null>(KEYS.CATEGORIES, null);
      const storedProds = read<MarketplaceProduct[] | null>(KEYS.PRODUCTS, null);
      if (storedCats) setCategories(storedCats);
      if (storedProds) setProducts(storedProds);
    };
    window.addEventListener("a2r:catalog-changed", handler);
    return () => window.removeEventListener("a2r:catalog-changed", handler);
  }, []);

  // ── Category CRUD ──

  const addCategory = useCallback((cat: Omit<MarketplaceCategory, "id" | "slug">) => {
    const newCat: MarketplaceCategory = {
      ...cat,
      id: uid(cat.parentId ? "sub" : "cat"),
      slug: slugify(cat.name),
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  }, []);

  const updateCategory = useCallback((id: string, patch: Partial<MarketplaceCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch, ...(patch.name ? { slug: slugify(patch.name) } : {}) } : c))
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    // Also delete child subcategories and their products
    setCategories((prev) => prev.filter((c) => c.parentId !== id));
    setProducts((prev) => prev.filter((p) => p.categoryId !== id && p.subcategoryId !== id));
  }, []);

  const reorderCategories = useCallback((ids: string[]) => {
    setCategories((prev) => {
      const orderMap = new Map(ids.map((id, i) => [id, i + 1]));
      return [...prev].map((c) => ({
        ...c,
        sortOrder: orderMap.get(c.id) ?? c.sortOrder,
      })).sort((a, b) => a.sortOrder - b.sortOrder);
    });
  }, []);

  const toggleCategory = useCallback((id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }, []);

  // ── Product CRUD ──

  const addProduct = useCallback((prod: Omit<MarketplaceProduct, "id" | "sku" | "slug" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newProd: MarketplaceProduct = {
      ...prod,
      id: uid("prod"),
      sku: `A2R-${String(Date.now()).slice(-5)}`,
      slug: slugify(prod.name),
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [...prev, newProd]);
    return newProd;
  }, []);

  const updateProduct = useCallback((id: string, patch: Partial<MarketplaceProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ── Bulk Import / Export ──

  const importCategories = useCallback((cats: MarketplaceCategory[]) => {
    setCategories((prev) => {
      const existing = new Map(prev.map((c) => [c.id, c]));
      for (const cat of cats) {
        existing.set(cat.id, cat);
      }
      return [...existing.values()].sort((a, b) => a.sortOrder - b.sortOrder);
    });
  }, []);

  const exportCategories = useCallback(() => {
    return JSON.stringify(categories, null, 2);
  }, [categories]);

  const importProducts = useCallback((prods: MarketplaceProduct[]) => {
    setProducts((prev) => {
      const existing = new Map(prev.map((p) => [p.id, p]));
      for (const prod of prods) {
        existing.set(prod.id, prod);
      }
      return [...existing.values()];
    });
  }, []);

  const exportProducts = useCallback(() => {
    return JSON.stringify(products, null, 2);
  }, [products]);

  const exportProductsCSV = useCallback(() => {
    const headers = ["id","sku","name","categoryId","subcategoryId","retailPrice","stockQty","availability","listingStatus","farmerId","farmName"];
    const rows = products.map((p) =>
      headers.map((h) => {
        const val = (p as unknown as Record<string, unknown>)[h];
        if (typeof val === "string" && val.includes(",")) return `"${val}"`;
        return String(val ?? "");
      }).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  }, [products]);

  // ── Queries ──

  const getTopCategories = useCallback(() => {
    return categories.filter((c) => !c.parentId).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories]);

  const getSubcategories = useCallback((parentId: string) => {
    return categories.filter((c) => c.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories]);

  const getProductsBySubcategory = useCallback((subId: string) => {
    return products.filter((p) => p.subcategoryId === subId);
  }, [products]);

  const getProductById = useCallback((id: string) => {
    return products.find((p) => p.id === id);
  }, [products]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find((c) => c.id === id);
  }, [categories]);

  const searchCatalog = useCallback((query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return { categories: [], products: [] };
    const matchedCats = categories.filter((c) =>
      c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
    const matchedProds = products.filter((p) =>
      p.listingStatus === "active" && (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      )
    );
    return { categories: matchedCats, products: matchedProds.slice(0, 50) };
  }, [categories, products]);

  // ── Value ──

  const value: CatalogState = {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    toggleCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    importCategories,
    exportCategories,
    importProducts,
    exportProducts,
    exportProductsCSV,
    getTopCategories,
    getSubcategories,
    getProductsBySubcategory,
    getProductById,
    getCategoryById,
    searchCatalog,
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

export function useCatalog(): CatalogState {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
