/**
 * Agri2rist Hub – Marketplace Master Type Definitions
 * Mirrors a production database schema as TypeScript interfaces.
 * Every product carries 40–60 standardised fields per the spec.
 */

// ─────────────────────────────────────────────
// ENUMS / LITERAL UNIONS
// ─────────────────────────────────────────────

export type ProductType = "fresh" | "processed" | "organic" | "value_added" | "byproduct" | "service" | "equipment" | "seedling";
export type Grade = "premium" | "grade_a" | "grade_b" | "grade_c" | "ungraded";
export type AvailabilityStatus = "in_stock" | "out_of_stock" | "pre_order" | "seasonal" | "limited";
export type OrganicStatus = "certified_organic" | "transitional" | "conventional";
export type StorageCondition = "ambient" | "refrigerated" | "frozen" | "dry_cool" | "controlled_atmosphere";
export type UserRole = "buyer" | "farmer" | "wholesaler" | "retailer" | "exporter" | "cooperative" | "processor" | "agritourism_host" | "input_supplier" | "logistics" | "warehouse" | "admin";
export type MembershipTier = "free" | "starter" | "standard" | "premium" | "enterprise";
export type OrderStatus = "pending" | "confirmed" | "processing" | "dispatched" | "delivered" | "cancelled" | "refunded";
export type ListingStatus = "draft" | "pending_review" | "active" | "suspended" | "archived";

// ─────────────────────────────────────────────
// CATEGORY SYSTEM
// ─────────────────────────────────────────────

export interface MarketplaceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;               // lucide icon name
  image: string;              // representative image path
  parentId: string | null;    // null = top-level
  sortOrder: number;
  productCount?: number;
  isActive: boolean;
}

// ─────────────────────────────────────────────
// FARMER / SELLER PROFILE
// ─────────────────────────────────────────────

export interface FarmerProfile {
  id: string;
  userId: string;
  businessName: string;
  tradingName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  region: string;
  district: string;
  town: string;
  gpsCoordinates?: { lat: number; lng: number };
  farmDescription: string;
  farmType: string[];          // dairy, poultry, aquaculture, crop, etc.
  certifications: string[];
  membershipTier: MembershipTier;
  isVerified: boolean;
  verifiedAt?: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  joinedAt: string;
  profileImage?: string;
  farmImages: string[];
  socialLinks?: { facebook?: string; instagram?: string; whatsapp?: string };
  bankName?: string;
  mobileMoney?: string;
  listingStatus: ListingStatus;
}

// ─────────────────────────────────────────────
// MASTER PRODUCT – All 40+ fields
// ─────────────────────────────────────────────

export interface MarketplaceProduct {
  // ── Identification ──
  id: string;
  sku: string;                     // Marketplace SKU (auto-generated)
  barcode?: string;                // EAN / UPC / GS1
  qrCode?: string;                 // Traceability QR
  slug: string;                    // URL-friendly name

  // ── Naming ──
  name: string;                    // Display name
  scientificName?: string;         // Botanical / Zoological
  commonName?: string;             // Local / common name
  localNames?: Record<string, string>;  // lang → name

  // ── Classification ──
  categoryId: string;              // Top-level category
  subcategoryId: string;           // Subcategory
  productType: ProductType;
  variety?: string;                // Cultivar / breed / variety
  grade: Grade;

  // ── Description ──
  description: string;
  shortDescription: string;
  tags: string[];

  // ── Commercial ──
  unitOfSale: string;              // kg, ton, crate, piece, bag, bunch, litre
  minimumOrderQty: number;         // MOQ
  farmGatePrice: number;           // UGX
  wholesalePrice: number;          // UGX
  retailPrice: number;             // UGX
  exportPrice?: number;            // UGX (export markets)
  currency: string;                // ISO 4217

  // ── Origin ──
  countryOfOrigin: string;
  region: string;
  district?: string;
  gpsCoordinates?: { lat: number; lng: number };
  farmerId: string;                // FK → FarmerProfile.id
  farmName: string;

  // ── Quality & Certification ──
  organicStatus: OrganicStatus;
  certifications: string[];        // Organic, GAP, HACCP, Fair Trade, etc.
  grade2?: string;                 // Extra quality descriptor

  // ── Dates & Shelf Life ──
  harvestDate?: string;            // ISO date
  expiryDate?: string;             // ISO date
  shelfLifeDays?: number;
  bestBefore?: string;

  // ── Storage & Handling ──
  storageCondition: StorageCondition;
  handlingInstructions?: string;
  packagingType: string;           // Bag, box, crate, vacuum-pack, etc.
  packagingWeight?: string;

  // ── Inventory ──
  stockQty: number;
  reorderLevel: number;
  availability: AvailabilityStatus;
  seasonalMonths?: number[];       // 1–12, months when available
  leadTimeDays?: number;

  // ── Media ──
  images: string[];                // Array of image URLs
  videoUrl?: string;
  documents?: string[];            // Certificates, lab reports, etc.

  // ── Marketplace meta ──
  listingStatus: ListingStatus;
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
  orderCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// REVIEWS & RATINGS
// ─────────────────────────────────────────────

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;           // 1–5
  title: string;
  body: string;
  images?: string[];
  verifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
}

// ─────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  productName: string;
  farmerId: string;
  farmName: string;
  unitOfSale: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
  image: string;
}

export interface MarketplaceOrder {
  id: string;
  orderRef: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  items: OrderItem[];
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus: OrderStatus;
  deliveryAddress?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// SEARCH & FILTERS
// ─────────────────────────────────────────────

export interface ProductSearchFilters {
  query?: string;
  categoryId?: string;
  subcategoryId?: string;
  productType?: ProductType[];
  grade?: Grade[];
  organicStatus?: OrganicStatus[];
  availability?: AvailabilityStatus[];
  storageCondition?: StorageCondition[];
  countryOfOrigin?: string[];
  region?: string[];
  farmerId?: string;
  certifications?: string[];
  priceMin?: number;
  priceMax?: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  tags?: string[];
  sortBy?: "relevance" | "price_asc" | "price_desc" | "rating" | "newest" | "trending" | "popular";
  page?: number;
  pageSize?: number;
}

export interface SearchResult {
  products: MarketplaceProduct[];
  total: number;
  page: number;
  pageSize: number;
  facets: SearchFacets;
}

export interface SearchFacets {
  categories: { id: string; name: string; count: number }[];
  productTypes: { type: string; count: number }[];
  grades: { grade: string; count: number }[];
  organicStatuses: { status: string; count: number }[];
  countries: { country: string; count: number }[];
  regions: { region: string; count: number }[];
  certifications: { cert: string; count: number }[];
  priceRange: { min: number; max: number };
}

// ─────────────────────────────────────────────
// WISHLIST
// ─────────────────────────────────────────────

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// ─────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────

export interface CartItem {
  productId: string;
  product: MarketplaceProduct;
  qty: number;
}

// ─────────────────────────────────────────────
// ADMIN / DASHBOARD TYPES
// ─────────────────────────────────────────────

export interface DashboardStats {
  totalProducts: number;
  totalFarmers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
  activeListings: number;
  categoriesCount: number;
  newUsersThisMonth: number;
}

export interface AdminNotification {
  id: string;
  type: "new_listing" | "new_order" | "new_farmer" | "review_flagged" | "low_stock";
  message: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────
// BOOKING TYPES
// ─────────────────────────────────────────────

export type BookingCategory =
  | "agritourism"
  | "farm_stay"
  | "restaurant"
  | "events_festivals"
  | "transportation"
  | "digital_products"
  | "education"
  | "agriculture_services";

export const BOOKING_CATEGORY_LABELS: Record<BookingCategory, string> = {
  agritourism: "Agritourism Experiences",
  farm_stay: "Farm Stays & Accommodations",
  restaurant: "Restaurants & Cuisine",
  events_festivals: "Local Events & Festivals",
  transportation: "Transportation & Transfers",
  digital_products: "Digital Products",
  education: "Education",
  agriculture_services: "Agriculture Services",
};

export const BOOKING_CATEGORY_ICONS: Record<BookingCategory, string> = {
  agritourism: "Camera",
  farm_stay: "Home",
  restaurant: "UtensilsCrossed",
  events_festivals: "Tickets",
  transportation: "Truck",
  digital_products: "FileText",
  education: "GraduationCap",
  agriculture_services: "Wrench",
};

export interface BookingItem {
  id: string;
  bookingCategory: BookingCategory;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  unit: string;
  location?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  farmerId?: string;
  farmName?: string;
  availability: "available" | "limited" | "booked";
  tags: string[];
  details: Record<string, string>;
}

export interface Booking {
  id: string;
  bookingRef: string;
  bookingCategory: BookingCategory;
  itemId: string;
  itemName: string;
  buyerId?: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  date: string;
  time?: string;
  guests?: number;
  nights?: number;
  tickets?: number;
  duration?: string;
  startDate?: string;
  endDate?: string;
  vehicleType?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  licenseType?: string;
  trainingTopic?: string;
  serviceType?: string;
  farmAddress?: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  status: "pending" | "confirmed" | "processing" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
}
