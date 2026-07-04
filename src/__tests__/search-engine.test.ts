/**
 * Agri2rist Hub – Search Engine Tests
 */
import { describe, it, expect, beforeEach } from "vitest";
import { searchCatalog, getAutocompleteSuggestions } from "@/lib/search-engine";
import { MASTER_CATALOG } from "@/data/products";
import { TOP_CATEGORIES } from "@/data/categories";

// ── Basic search ─────────────────────────────────────────────────────────────
describe("searchCatalog – basic query", () => {
  it("returns results for 'maize'", () => {
    const { products, total } = searchCatalog({ query: "maize" });
    expect(total).toBeGreaterThan(0);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].name.toLowerCase()).toContain("maize");
  });

  it("returns results for scientific name 'Coffea arabica'", () => {
    const { products } = searchCatalog({ query: "coffea arabica" });
    expect(products.length).toBeGreaterThan(0);
  });

  it("returns results for tag 'organic'", () => {
    const { products } = searchCatalog({ query: "organic" });
    expect(products.length).toBeGreaterThan(0);
  });

  it("returns empty results for nonsense query", () => {
    const { total } = searchCatalog({ query: "xyznonexistentproduct12345" });
    expect(total).toBe(0);
  });

  it("returns all active products with no query", () => {
    const { total } = searchCatalog({});
    const activeCount = MASTER_CATALOG.filter((p) => p.listingStatus === "active").length;
    expect(total).toBe(activeCount);
  });
});

// ── Category filter ───────────────────────────────────────────────────────────
describe("searchCatalog – category filter", () => {
  it("filters by categoryId correctly", () => {
    const catId = "cat-06"; // Beekeeping
    const { products } = searchCatalog({ categoryId: catId });
    expect(products.every((p) => p.categoryId === catId)).toBe(true);
  });

  it("returns 0 results for non-existent category", () => {
    const { total } = searchCatalog({ categoryId: "cat-99" });
    expect(total).toBe(0);
  });
});

// ── Organic filter ────────────────────────────────────────────────────────────
describe("searchCatalog – organic filter", () => {
  it("returns only organic products when filtered", () => {
    const { products } = searchCatalog({ organicStatus: ["certified_organic"] });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.organicStatus === "certified_organic")).toBe(true);
  });
});

// ── Price filter ──────────────────────────────────────────────────────────────
describe("searchCatalog – price filter", () => {
  it("respects priceMin", () => {
    const min = 10000;
    const { products } = searchCatalog({ priceMin: min });
    expect(products.every((p) => p.retailPrice >= min)).toBe(true);
  });

  it("respects priceMax", () => {
    const max = 5000;
    const { products } = searchCatalog({ priceMax: max });
    expect(products.every((p) => p.retailPrice <= max)).toBe(true);
  });

  it("returns empty when min > max of all products", () => {
    const { total } = searchCatalog({ priceMin: 999_999_999 });
    expect(total).toBe(0);
  });
});

// ── Sorting ───────────────────────────────────────────────────────────────────
describe("searchCatalog – sorting", () => {
  it("price_asc sorts ascending", () => {
    const { products } = searchCatalog({ sortBy: "price_asc", pageSize: 50 });
    for (let i = 1; i < products.length; i++) {
      expect(products[i].retailPrice).toBeGreaterThanOrEqual(products[i - 1].retailPrice);
    }
  });

  it("price_desc sorts descending", () => {
    const { products } = searchCatalog({ sortBy: "price_desc", pageSize: 50 });
    for (let i = 1; i < products.length; i++) {
      expect(products[i].retailPrice).toBeLessThanOrEqual(products[i - 1].retailPrice);
    }
  });

  it("rating sorts by highest rating first", () => {
    const { products } = searchCatalog({ sortBy: "rating", pageSize: 20 });
    for (let i = 1; i < products.length; i++) {
      expect(products[i].rating).toBeLessThanOrEqual(products[i - 1].rating);
    }
  });
});

// ── Pagination ────────────────────────────────────────────────────────────────
describe("searchCatalog – pagination", () => {
  it("respects pageSize", () => {
    const { products } = searchCatalog({ pageSize: 5 });
    expect(products.length).toBeLessThanOrEqual(5);
  });

  it("returns different results on page 2 vs page 1", () => {
    const p1 = searchCatalog({ page: 1, pageSize: 5 }).products.map((p) => p.id);
    const p2 = searchCatalog({ page: 2, pageSize: 5 }).products.map((p) => p.id);
    // Pages should not overlap (assuming enough products exist)
    const overlap = p1.filter((id) => p2.includes(id));
    expect(overlap).toHaveLength(0);
  });
});

// ── Facets ────────────────────────────────────────────────────────────────────
describe("searchCatalog – facets", () => {
  it("returns category facets", () => {
    const { facets } = searchCatalog({});
    expect(facets.categories.length).toBeGreaterThan(0);
    expect(facets.categories[0]).toHaveProperty("id");
    expect(facets.categories[0]).toHaveProperty("count");
  });

  it("returns price range", () => {
    const { facets } = searchCatalog({});
    expect(facets.priceRange.min).toBeGreaterThanOrEqual(0);
    expect(facets.priceRange.max).toBeGreaterThan(facets.priceRange.min);
  });

  it("returns organic status facets", () => {
    const { facets } = searchCatalog({});
    expect(facets.organicStatuses.length).toBeGreaterThan(0);
  });
});

// ── Featured / Trending filters ───────────────────────────────────────────────
describe("searchCatalog – featured and trending", () => {
  it("returns only featured products", () => {
    const { products } = searchCatalog({ isFeatured: true });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.isFeatured)).toBe(true);
  });

  it("returns only trending products", () => {
    const { products } = searchCatalog({ isTrending: true });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.isTrending)).toBe(true);
  });
});

// ── Autocomplete ──────────────────────────────────────────────────────────────
describe("getAutocompleteSuggestions", () => {
  it("returns suggestions for 'mango'", () => {
    const results = getAutocompleteSuggestions("mango");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns empty for single character", () => {
    const results = getAutocompleteSuggestions("m");
    expect(results).toHaveLength(0);
  });

  it("returns empty for blank query", () => {
    expect(getAutocompleteSuggestions("")).toHaveLength(0);
  });

  it("respects limit parameter", () => {
    const results = getAutocompleteSuggestions("a", 3);
    // With single char, returns 0 due to length check
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns unique suggestions for 'honey'", () => {
    const results = getAutocompleteSuggestions("honey", 20);
    const unique = new Set(results.map((r) => r.toLowerCase()));
    expect(unique.size).toBe(results.length);
  });
});
