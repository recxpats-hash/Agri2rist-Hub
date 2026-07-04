/**
 * Agri2rist Hub – Client-Side Search Engine
 * Faceted, multi-field search with autocomplete support.
 */

import { MASTER_CATALOG } from "@/data/products";
import { ALL_CATEGORIES } from "@/data/categories";
import type { MarketplaceProduct, ProductSearchFilters, SearchResult, SearchFacets } from "@/types/marketplace";

// ─── MAIN SEARCH ──────────────────────────────────────────────────────────────

export function searchCatalog(filters: ProductSearchFilters = {}): SearchResult {
  const {
    query = "",
    categoryId,
    subcategoryId,
    productType,
    grade,
    organicStatus,
    availability,
    countryOfOrigin,
    region,
    certifications,
    priceMin,
    priceMax,
    isFeatured,
    isTrending,
    tags,
    sortBy = "relevance",
    page = 1,
    pageSize = 24,
  } = filters;

  const q = query.toLowerCase().trim();

  let results = MASTER_CATALOG.filter((p) => {
    if (p.listingStatus !== "active") return false;
    if (categoryId && p.categoryId !== categoryId) return false;
    if (subcategoryId && p.subcategoryId !== subcategoryId) return false;
    if (productType?.length && !productType.includes(p.productType)) return false;
    if (grade?.length && !grade.includes(p.grade)) return false;
    if (organicStatus?.length && !organicStatus.includes(p.organicStatus)) return false;
    if (availability?.length && !availability.includes(p.availability)) return false;
    if (countryOfOrigin?.length && !countryOfOrigin.includes(p.countryOfOrigin)) return false;
    if (region?.length && !region.some((r) => p.region.toLowerCase().includes(r.toLowerCase()))) return false;
    if (certifications?.length && !certifications.some((c) => p.certifications.includes(c))) return false;
    if (priceMin !== undefined && p.retailPrice < priceMin) return false;
    if (priceMax !== undefined && p.retailPrice > priceMax) return false;
    if (isFeatured !== undefined && p.isFeatured !== isFeatured) return false;
    if (isTrending !== undefined && p.isTrending !== isTrending) return false;
    if (tags?.length && !tags.some((t) => p.tags.includes(t))) return false;
    if (q) return matchesQuery(p, q);
    return true;
  });

  // Sort
  results = sortResults(results, sortBy, q);

  const total = results.length;
  const start = (page - 1) * pageSize;
  const paged = results.slice(start, start + pageSize);
  const facets = buildFacets(results);

  return { products: paged, total, page, pageSize, facets };
}

// ─── QUERY MATCHING ───────────────────────────────────────────────────────────

function matchesQuery(p: MarketplaceProduct, q: string): boolean {
  // Weighted field search – higher-priority fields first
  if (p.name.toLowerCase().includes(q)) return true;
  if (p.sku.toLowerCase() === q) return true;
  if (p.scientificName?.toLowerCase().includes(q)) return true;
  if (p.commonName?.toLowerCase().includes(q)) return true;
  if (p.tags.some((t) => t.includes(q))) return true;
  if (p.shortDescription.toLowerCase().includes(q)) return true;
  if (p.description.toLowerCase().includes(q)) return true;
  if (p.farmName.toLowerCase().includes(q)) return true;
  if (p.region.toLowerCase().includes(q)) return true;
  if (p.countryOfOrigin.toLowerCase().includes(q)) return true;
  if (p.variety?.toLowerCase().includes(q)) return true;
  if (p.certifications.some((c) => c.toLowerCase().includes(q))) return true;
  return false;
}

// ─── SORTING ─────────────────────────────────────────────────────────────────

function sortResults(
  results: MarketplaceProduct[],
  sortBy: NonNullable<ProductSearchFilters["sortBy"]>,
  query: string
): MarketplaceProduct[] {
  switch (sortBy) {
    case "price_asc":
      return [...results].sort((a, b) => a.retailPrice - b.retailPrice);
    case "price_desc":
      return [...results].sort((a, b) => b.retailPrice - a.retailPrice);
    case "rating":
      return [...results].sort((a, b) => b.rating - a.rating);
    case "newest":
      return [...results].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "trending":
      return [...results].sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.viewCount - a.viewCount);
    case "popular":
      return [...results].sort((a, b) => b.orderCount - a.orderCount);
    case "relevance":
    default: {
      if (!query) {
        // Boost featured + trending when no search
        return [...results].sort((a, b) => {
          const scoreA = (a.isFeatured ? 3 : 0) + (a.isTrending ? 2 : 0) + a.rating;
          const scoreB = (b.isFeatured ? 3 : 0) + (b.isTrending ? 2 : 0) + b.rating;
          return scoreB - scoreA;
        });
      }
      return [...results].sort((a, b) => relevanceScore(b, query) - relevanceScore(a, query));
    }
  }
}

function relevanceScore(p: MarketplaceProduct, q: string): number {
  let score = 0;
  if (p.name.toLowerCase().includes(q)) score += 10;
  if (p.name.toLowerCase().startsWith(q)) score += 5;
  if (p.tags.some((t) => t === q)) score += 8;
  if (p.scientificName?.toLowerCase().includes(q)) score += 6;
  if (p.isFeatured) score += 3;
  if (p.isTrending) score += 2;
  score += p.rating;
  return score;
}

// ─── FACETS ───────────────────────────────────────────────────────────────────

function buildFacets(results: MarketplaceProduct[]): SearchFacets {
  const catMap = new Map<string, number>();
  const typeMap = new Map<string, number>();
  const gradeMap = new Map<string, number>();
  const organicMap = new Map<string, number>();
  const countryMap = new Map<string, number>();
  const regionMap = new Map<string, number>();
  const certMap = new Map<string, number>();
  let minPrice = Infinity;
  let maxPrice = 0;

  for (const p of results) {
    inc(catMap, p.categoryId);
    inc(typeMap, p.productType);
    inc(gradeMap, p.grade);
    inc(organicMap, p.organicStatus);
    inc(countryMap, p.countryOfOrigin);
    inc(regionMap, p.region);
    p.certifications.forEach((c) => inc(certMap, c));
    if (p.retailPrice < minPrice) minPrice = p.retailPrice;
    if (p.retailPrice > maxPrice) maxPrice = p.retailPrice;
  }

  const catName = (id: string) => ALL_CATEGORIES.find((c) => c.id === id)?.name ?? id;

  return {
    categories: [...catMap.entries()].map(([id, count]) => ({ id, name: catName(id), count })).sort((a, b) => b.count - a.count),
    productTypes: [...typeMap.entries()].map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count),
    grades: [...gradeMap.entries()].map(([grade, count]) => ({ grade, count })),
    organicStatuses: [...organicMap.entries()].map(([status, count]) => ({ status, count })),
    countries: [...countryMap.entries()].map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count),
    regions: [...regionMap.entries()].map(([region, count]) => ({ region, count })).sort((a, b) => b.count - a.count),
    certifications: [...certMap.entries()].map(([cert, count]) => ({ cert, count })).sort((a, b) => b.count - a.count),
    priceRange: { min: minPrice === Infinity ? 0 : minPrice, max: maxPrice },
  };
}

function inc(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1);
}

// ─── AUTOCOMPLETE ─────────────────────────────────────────────────────────────

export function getAutocompleteSuggestions(query: string, limit = 8): string[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];
  const seen = new Set<string>();
  const results: string[] = [];

  for (const p of MASTER_CATALOG) {
    if (results.length >= limit) break;
    if (p.listingStatus !== "active") continue;
    const candidates = [p.name, ...(p.scientificName ? [p.scientificName] : []), ...p.tags];
    for (const c of candidates) {
      const lower = c.toLowerCase();
      if (lower.includes(q) && !seen.has(lower)) {
        seen.add(lower);
        results.push(c);
      }
    }
  }

  return results;
}
