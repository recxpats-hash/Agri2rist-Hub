# Agri2rist Hub – Data API Reference

This document describes the **client-side data API** — the typed functions exposed by the data and library layers. These are the exact swap points for future backend integration.

---

## Products API

**Module:** `src/data/products.ts`

### `MASTER_CATALOG: MarketplaceProduct[]`
The complete seeded product catalog (163+ products).

### `getProductById(id: string): MarketplaceProduct | undefined`
Returns a single product by its unique ID.

### `getProductBySlug(slug: string): MarketplaceProduct | undefined`
Returns a product by its URL-safe slug.

### `getProductsByCategory(categoryId: string): MarketplaceProduct[]`
Returns all active products for a top-level category.

### `getProductsBySubcategory(subcategoryId: string): MarketplaceProduct[]`
Returns all active products for a subcategory.

### `getFeaturedProducts(limit?: number): MarketplaceProduct[]`
Returns featured active products. Default limit: 12.

### `getTrendingProducts(limit?: number): MarketplaceProduct[]`
Returns trending active products. Default limit: 8.

### `getProductsByFarmer(farmerId: string): MarketplaceProduct[]`
Returns all products from a specific farmer/seller.

### `searchProducts(query, filters?): MarketplaceProduct[]`
Simple keyword search with optional filters. For faceted search use `searchCatalog()`.

---

## Categories API

**Module:** `src/data/categories.ts`

### `TOP_CATEGORIES: MarketplaceCategory[]`
17 top-level marketplace categories.

### `SUBCATEGORIES: MarketplaceCategory[]`
35+ subcategories linked to parent categories.

### `ALL_CATEGORIES: MarketplaceCategory[]`
Combined array of all categories.

### `getCategoryById(id: string): MarketplaceCategory | undefined`

### `getCategoryBySlug(slug: string): MarketplaceCategory | undefined`

### `getSubcategories(parentId: string): MarketplaceCategory[]`
Returns subcategories for a given parent category ID.

### `getTopCategories(): MarketplaceCategory[]`
Returns the 17 top-level categories.

---

## Farmers API

**Module:** `src/data/farmers.ts`

### `FARMER_PROFILES: FarmerProfile[]`
10 seeded farmer/seller profiles.

### `getFarmerById(id: string): FarmerProfile | undefined`

### `getFarmerByUserId(userId: string): FarmerProfile | undefined`

---

## Search Engine API

**Module:** `src/lib/search-engine.ts`

### `searchCatalog(filters: ProductSearchFilters): SearchResult`

Full faceted search across the master catalog.

**Filters:**
```typescript
{
  query?: string           // Free-text search
  categoryId?: string      // Filter by top-level category
  subcategoryId?: string   // Filter by subcategory
  productType?: ProductType[]
  grade?: Grade[]
  organicStatus?: OrganicStatus[]
  availability?: AvailabilityStatus[]
  countryOfOrigin?: string[]
  region?: string[]
  farmerId?: string
  certifications?: string[]
  priceMin?: number        // UGX
  priceMax?: number        // UGX
  isFeatured?: boolean
  isTrending?: boolean
  tags?: string[]
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'trending' | 'popular'
  page?: number            // Default: 1
  pageSize?: number        // Default: 24
}
```

**Returns:**
```typescript
{
  products: MarketplaceProduct[]
  total: number
  page: number
  pageSize: number
  facets: {
    categories: { id, name, count }[]
    productTypes: { type, count }[]
    grades: { grade, count }[]
    organicStatuses: { status, count }[]
    countries: { country, count }[]
    regions: { region, count }[]
    certifications: { cert, count }[]
    priceRange: { min, max }
  }
}
```

### `getAutocompleteSuggestions(query: string, limit?: number): string[]`
Returns up to `limit` (default 8) autocomplete suggestions. Requires `query.length >= 2`.

---

## Marketplace Store API

**Module:** `src/lib/marketplace-store.ts`

All functions read/write `localStorage` and emit `a2r:store-changed` CustomEvents so React hooks re-render automatically.

### Cart

| Function | Signature | Description |
|---|---|---|
| `addToCart` | `(product, qty?) => void` | Add or increment item |
| `removeFromCart` | `(productId) => void` | Remove item completely |
| `updateCartQty` | `(productId, qty) => void` | Set quantity (0 = remove) |
| `clearCart` | `() => void` | Empty cart |
| `getCartItems` | `() => StoredCartItem[]` | Raw cart items |
| `getCartCount` | `() => number` | Total quantity across all items |

### Wishlist

| Function | Signature | Description |
|---|---|---|
| `addToWishlist` | `(productId) => void` | |
| `removeFromWishlist` | `(productId) => void` | |
| `isInWishlist` | `(productId) => boolean` | |
| `toggleWishlist` | `(productId) => boolean` | Returns true if added |
| `getWishlist` | `() => WishlistItem[]` | |

### Orders

| Function | Signature | Description |
|---|---|---|
| `saveOrder` | `(order) => void` | Create or update |
| `getOrders` | `() => MarketplaceOrder[]` | All orders |
| `getOrderById` | `(id) => MarketplaceOrder | undefined` | |
| `buildOrderRef` | `() => string` | Generate unique ref e.g. `A2R-LK4X2-9F3A` |

### Recently Viewed

| Function | Signature | Description |
|---|---|---|
| `recordView` | `(productId) => void` | Record product view, deduped |
| `getRecentlyViewed` | `(limit?) => string[]` | Last viewed product IDs |

---

## Order Service API

**Module:** `src/lib/order-service.ts`

### `createOrder(input: CreateOrderInput): CreateOrderResult`

Creates a validated order from cart items, saves it, and clears the cart.

**Input:**
```typescript
{
  buyerId: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  deliveryAddress: string
  paymentMethod: string
  notes?: string
  cartItems: CartEntry[]
}
```

**Returns:**
```typescript
{ ok: true;  order: MarketplaceOrder } |
{ ok: false; error: string }
```

**Validation checks:**
- Cart is not empty
- All items have `listingStatus === 'active'`
- Quantities do not exceed `stockQty`
- Quantities meet `minimumOrderQty`

### `getOrdersByBuyer(buyerId: string): MarketplaceOrder[]`

### `updateOrderStatus(orderId: string, status: OrderStatus): boolean`

### `PAYMENT_METHODS`
Array of `{ value, label, icon }` for the checkout UI.

---

## Validation API

**Module:** `src/lib/validation.ts`

### Sanitizers

| Function | Description |
|---|---|
| `sanitizeText(value)` | Strip HTML, kill JS protocol, HTML-encode specials, trim |
| `sanitizeEmail(value)` | Lowercase + trim + truncate to 320 chars |
| `sanitizeNumber(value, min, max)` | Clamp + floor to safe integer |

### Validators (all return `{ ok: true } | { ok: false; error: string }`)

| Function | Rules |
|---|---|
| `validateEmail(email)` | RFC-basic regex |
| `validatePassword(password)` | 8+ chars, 1 uppercase, 1 number, max 128 |
| `validateName(name)` | 2–100 chars |
| `validatePhone(phone)` | 9–15 digits |
| `validateQuantity(qty, min, max)` | Integer, within bounds |
| `validateRequired(value, fieldName)` | Non-empty after sanitize |

### Form Validators

| Function | Returns |
|---|---|
| `validateSignupForm({ name, email, password })` | `SignupErrors` object |
| `validateCheckoutForm(data)` | `CheckoutErrors` object |

---

## Security API

**Module:** `src/lib/security.ts`

### `checkRateLimit(key, limit?, windowMs?): boolean`
Returns `true` (allowed) or `false` (blocked). Default: 5 attempts / 60s.

### `resetRateLimit(key): void`
Clears the bucket for a key (call after successful auth).

### `remainingAttempts(key, limit?, windowMs?): number`

### `getCsrfToken(): string`
Returns (or generates) a session-scoped CSRF token.

### `validateCsrfToken(token): boolean`

### `escapeHtmlAttr(value): string`
HTML-encode for use in attribute values.

### `safeUrl(url): string`
Returns the URL if http/https, `'#'` otherwise.

### `secureStorage`
`{ set(key, value), get<T>(key, maxAgeMs?), remove(key) }` — localStorage wrapper with TTL and JSON integrity.

### `injectCspMetaTag(): void`
Injects `Content-Security-Policy` meta tag once on startup.

### `auditEnvVars(): void`
Logs a warning in DEV if sensitive-sounding `VITE_` vars are found.

---

## Auth Hook API

**Module:** `src/hooks/use-auth.tsx`

```typescript
const {
  user,            // AuthUser | null
  isAdmin,         // boolean
  isFarmer,        // boolean
  login,           // async (email, password) => boolean
  signup,          // async (name, email, password, role?) => boolean
  logout,          // () => void
  updateProfile,   // (updates) => void
} = useAuth();
```

**AuthUser shape:**
```typescript
{
  id: string
  name: string
  email: string
  role: UserRole
  membershipTier: string
  joinedAt: string
}
```

---

## React Hooks

| Hook | Returns | Description |
|---|---|---|
| `useCart()` | `{ items, count, subtotal, serviceFee, total, add, remove, update, clear }` | Shopping cart state |
| `useWishlist()` | `{ wishlistIds, count, toggle, inWishlist }` | Wishlist state |
| `useAuth()` | See above | Authentication state + actions |
| `useIntersection(options?)` | `[ref, isVisible]` | IntersectionObserver hook |
| `useToast()` | `{ toast }` | Toast notification trigger |
| `useIsMobile()` | `boolean` | True when viewport < 768px |

---

## Type Reference

Full TypeScript interfaces are in `src/types/marketplace.ts`:

- `MarketplaceProduct` — 40+ field master product type
- `MarketplaceCategory` — category/subcategory
- `FarmerProfile` — seller profile
- `MarketplaceOrder` + `OrderItem` — order types
- `ProductSearchFilters` + `SearchResult` + `SearchFacets` — search types
- `CartItem`, `WishlistItem` — store types
- `UserRole`, `ProductType`, `Grade`, `AvailabilityStatus`, `OrganicStatus`, `StorageCondition`, `OrderStatus`, `ListingStatus`, `MembershipTier` — enums/union types
- `DashboardStats`, `AdminNotification` — admin types
