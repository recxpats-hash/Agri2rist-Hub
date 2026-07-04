# Agri2rist Hub – Architecture Guide

## Overview

Agri2rist Hub is a **production-grade agricultural marketplace and agritourism platform** built as a React 19 SPA. It connects farmers, buyers, exporters, cooperatives, agritourism hosts, and logistics providers through a unified digital marketplace.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5 |
| Build | Vite 7 with manual chunk splitting |
| UI | Tailwind CSS v3 + shadcn/ui (Radix UI) |
| Icons | lucide-react |
| Routing | react-router-dom v7 (lazy-loaded) |
| State | React hooks + localStorage store |
| i18n | i18next + react-i18next |
| Analytics | @enter-pro/analytics-sdk |
| Testing | Vitest 2 + jsdom |
| Package mgr | pnpm 8 |

---

## Folder Structure

```
AG2R/
├── public/
│   └── locale/              # Static assets (images, en.json locale)
│       └── Marketplace/     # Marketplace product images
├── src/
│   ├── __tests__/           # Vitest unit tests + setup
│   ├── components/
│   │   ├── farms/           # FarmCard component
│   │   ├── layout/          # Navbar, Footer, PageLayout
│   │   ├── marketplace/     # ProductCard, CartSidebar, MarketplaceShell,
│   │   │                    # SearchBar, MarketplaceNew
│   │   └── ui/              # shadcn/ui primitives + LazyImage
│   ├── data/
│   │   ├── categories.ts    # 17 top-level + 35+ subcategories
│   │   ├── farmers.ts       # 10 seeded farmer profiles
│   │   ├── products.ts      # 163+ seeded products (master catalog)
│   │   └── sampleData.ts    # Legacy farm/agritourism data
│   ├── hooks/
│   │   ├── use-auth.tsx     # Auth context (roles, SHA-256, session TTL)
│   │   ├── use-cart.tsx     # Shopping cart hook
│   │   ├── use-wishlist.tsx # Wishlist hook
│   │   ├── use-intersection.tsx  # IntersectionObserver hook
│   │   ├── use-mobile.tsx   # Responsive breakpoint hook
│   │   └── use-toast.ts     # Toast notifications
│   ├── lib/
│   │   ├── contact-info.ts  # Official contact constants
│   │   ├── marketplace-store.ts  # localStorage cart/wishlist/orders
│   │   ├── order-service.ts # Order creation + validation
│   │   ├── performance.ts   # Web Vitals, debounce, throttle, memoize
│   │   ├── search-engine.ts # Faceted full-text search + autocomplete
│   │   ├── security.ts      # Rate limiter, CSRF, XSS, CSP, env audit
│   │   ├── utils.ts         # cn() Tailwind merge utility
│   │   └── validation.ts    # Input validation + sanitization
│   ├── types/
│   │   └── marketplace.ts   # All TypeScript interfaces (40+ fields)
│   └── components/data/hook/lib/i18n/pages/
│       ├── main.tsx         # App entry point
│       ├── App.tsx          # Root providers
│       ├── router.tsx       # All lazy-loaded routes
│       ├── Home.tsx         # Homepage with marketplace teasers
│       ├── Marketplace.tsx  # → MarketplaceShell
│       ├── ProductDetail.tsx
│       ├── FarmerStore.tsx
│       ├── Checkout.tsx
│       ├── Wishlist.tsx
│       ├── MarketplaceSearch.tsx
│       ├── Admin.tsx        # Admin dashboard
│       ├── Explore.tsx      # Farm explorer
│       ├── FarmDetail.tsx
│       ├── Booking.tsx
│       ├── Community.tsx
│       ├── GetListed.tsx
│       ├── About.tsx
│       ├── Auth.tsx         # Login + Signup
│       ├── Account.tsx
│       ├── RequireAuth.tsx  # Route guard (supports role prop)
│       └── NotFound.tsx
├── index.html               # SEO meta, OG tags, preload hints
├── vite.config.ts           # Build config + manual chunks
├── vitest.config.ts         # Test config
├── tailwind.config.ts       # Design tokens
└── package.json
```

---

## Data Architecture

### No Backend / Database

This is a **frontend-only SPA**. All data is:
- **Static typed data** in `src/data/` — the master catalog
- **localStorage** — cart, wishlist, orders, auth sessions, recent searches

When a real backend (Supabase, PostgreSQL, REST API) is integrated, the `src/lib/marketplace-store.ts` and `src/data/` layers are the exact swap points.

### Master Product Catalog Schema

Every product carries **40+ standardised fields**:

```typescript
{
  // Identification
  id, sku, barcode, qrCode, slug,
  // Naming
  name, scientificName, commonName, localNames,
  // Classification
  categoryId, subcategoryId, productType, variety, grade,
  // Description
  description, shortDescription, tags,
  // Commercial
  unitOfSale, minimumOrderQty,
  farmGatePrice, wholesalePrice, retailPrice, exportPrice, currency,
  // Origin
  countryOfOrigin, region, district, gpsCoordinates,
  farmerId, farmName,
  // Quality
  organicStatus, certifications,
  // Dates
  harvestDate, expiryDate, shelfLifeDays, bestBefore,
  // Storage
  storageCondition, handlingInstructions,
  packagingType, packagingWeight,
  // Inventory
  stockQty, reorderLevel, availability, seasonalMonths, leadTimeDays,
  // Media
  images, videoUrl, documents,
  // Marketplace meta
  listingStatus, isFeatured, isTrending,
  viewCount, orderCount, rating, reviewCount,
  createdAt, updatedAt
}
```

### Category Taxonomy

```
17 Top-Level Categories
├── Fresh Produce (7 subcategories)
├── Fresh Fruits (5 subcategories)
├── Herbs & Spices (2 subcategories)
├── Livestock & Animal Products (5 subcategories)
├── Fish & Aquaculture (3 subcategories)
├── Beekeeping Products
├── Flowers & Ornamentals
├── Forestry Products
├── Seeds & Seedlings (3 subcategories)
├── Farm Inputs (4 subcategories)
├── Farm Machinery
├── Organic Products
├── Processed Foods (3 subcategories)
├── Medicinal & Aromatic Plants
├── Local Indigenous Products
├── Export Products (3 subcategories)
└── Value-Added Products
```

---

## Authentication

- **Storage:** `localStorage` (key: `agri2rist_session`)
- **Password hashing:** SHA-256 via `window.crypto.subtle` with app salt
- **Session TTL:** 7 days, checked on mount
- **Roles:** `buyer | farmer | wholesaler | retailer | exporter | cooperative | processor | agritourism_host | input_supplier | logistics | warehouse | admin`
- **Route guards:** `RequireAuth` component, accepts optional `role` prop
- **Rate limiting:** 5 login attempts per 60-second window per email

---

## Search Engine

The client-side search engine (`src/lib/search-engine.ts`) supports:

- **Multi-field matching:** name, SKU, scientific name, tags, description, farm name, region
- **Relevance scoring:** name match > tag exact > scientific name > featured boost
- **Faceted filters:** category, subcategory, product type, grade, organic status, country, region, certifications, price range, featured, trending
- **Sorting:** relevance, price asc/desc, rating, newest, trending, popular
- **Pagination:** configurable page size
- **Autocomplete:** debounced suggestions from name + scientific name + tags, deduped
- **Recent searches:** stored in localStorage, shown on focus

---

## Security Measures

| Threat | Mitigation |
|---|---|
| XSS | `sanitizeText()` strips tags + event handlers; `escapeHtmlAttr()` for attributes |
| Brute-force login | `checkRateLimit()` — 5 attempts / 60s per email |
| SQL Injection | N/A (no SQL — localStorage only) |
| CSRF | `getCsrfToken()` / `validateCsrfToken()` for future form submissions |
| Insecure storage | `secureStorage` wrapper with TTL; passwords SHA-256 hashed |
| Exposed secrets | `auditEnvVars()` warns at startup in DEV mode |
| Clickjacking | CSP `frame-ancestors 'none'` injected via meta tag |
| Open redirects | `safeUrl()` validates protocol before use in href/src |

---

## Performance

- **Code splitting:** Vite `manualChunks` → vendor-react, vendor-router, vendor-radix, vendor-misc, app-data, app-marketplace
- **Lazy routes:** All pages wrapped in `React.lazy()` + `Suspense` with spinner fallback
- **Image optimisation:** `LazyImage` component with blur-up placeholder, native `loading="lazy"`, `fetchPriority="high"` for hero images
- **Resource hints:** `<link rel="preload">` for hero images, `<link rel="preconnect">` for font origins
- **Web Vitals:** LCP + FCP tracked via `PerformanceObserver` on startup
- **Debounce/Throttle:** Search autocomplete debounced 200ms; utility functions in `performance.ts`
- **Node heap:** Build uses `--max-old-space-size=4096` to handle large catalog bundle

---

## Testing

```bash
pnpm install        # install deps including vitest
pnpm test           # run all tests once
pnpm test:watch     # watch mode
pnpm test:coverage  # coverage report
```

Test files in `src/__tests__/`:

| File | Coverage |
|---|---|
| `validation.test.ts` | sanitizeText, sanitizeEmail, all validators, signup + checkout form validation |
| `search-engine.test.ts` | basic query, category/organic/price filters, sorting, pagination, facets, autocomplete |
| `marketplace-store.test.ts` | cart CRUD, wishlist toggle, order save/retrieve/update, recently viewed |
| `security.test.ts` | rate limiter, remaining attempts, HTML escaping, URL safety |

---

## Build & Deploy

```bash
# Development server
pnpm dev               # Vite dev server on :8080

# Build
pnpm build             # dev-mode build (faster, source maps)
pnpm build:prod        # production build (minified)

# Type check + build
pnpm build:check       # tsc --noEmit && vite build

# Preview built dist/
pnpm preview
```

Output: `dist/` — static HTML/CSS/JS ready for any static host (Netlify, Vercel, S3+CloudFront, Nginx).

---

## Environment Variables

Prefix all client-exposed vars with `VITE_`. Never commit secrets.

```env
# .env.example
VITE_APP_NAME=Agri2rist Hub
VITE_SUPPORT_EMAIL=support@agri2risthub.com
VITE_SUPPORT_PHONE=+256200949411
```

Sensitive backend vars (Supabase keys, payment gateway secrets) must **never** use `VITE_` prefix — they must stay server-side only.

---

## Future Integration Points

| Feature | Current State | Integration Path |
|---|---|---|
| Database | localStorage | Replace `src/lib/marketplace-store.ts` with Supabase client calls |
| Auth | localStorage + SHA-256 | Replace `use-auth.tsx` with Supabase Auth |
| Payments | Simulated | Integrate Flutterwave / Pesapal in `order-service.ts` |
| Images | Static `/public/` | Replace paths with Supabase Storage or Cloudinary URLs |
| Search | Client-side | Replace `search-engine.ts` with Algolia / PostgreSQL full-text search |
| Notifications | Toast only | Add push notifications + email via Supabase Edge Functions |
| Analytics | @enter-pro SDK | Extend `reportWebVitals()` to send to analytics endpoint |
