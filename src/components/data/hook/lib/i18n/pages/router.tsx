/**
 * Agri2rist Hub – Application Router
 * All routes are lazy-loaded for performance (Phase 10).
 * Keep catch-all "*" last.
 */
import { lazy, Suspense } from "react";
import type { ReactNode } from "react";

// ── Eager (tiny, always needed) ──────────────────────────────────────────────
import RequireAuth from "./RequireAuth";

// ── Lazy pages ────────────────────────────────────────────────────────────────
const HomePage          = lazy(() => import("./Home"));
const ExplorePage       = lazy(() => import("./Explore"));
const FarmDetailPage    = lazy(() => import("./FarmDetail"));
const BookingPage       = lazy(() => import("./Booking"));
const MarketplacePage   = lazy(() => import("./Marketplace"));
const ProductDetailPage = lazy(() => import("./ProductDetail"));
const FarmerStorePage   = lazy(() => import("./FarmerStore"));
const MarketplaceSearchPage = lazy(() => import("./MarketplaceSearch"));
const CheckoutPage      = lazy(() => import("./Checkout"));
const WishlistPage      = lazy(() => import("./Wishlist"));
const CommunityPage     = lazy(() => import("./Community"));
const GetListedPage     = lazy(() => import("./GetListed"));
const AboutPage         = lazy(() => import("./About"));
const AuthPage          = lazy(() => import("./Auth"));
const AccountPage       = lazy(() => import("./Account"));
const AdminPage         = lazy(() => import("./Admin"));
const NotFound          = lazy(() => import("./NotFound"));

// ── Suspense fallback ─────────────────────────────────────────────────────────
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

function S({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

export const routers = [
  // ── Public ──────────────────────────────────────────────────────────────────
  { path: "/",                         name: "home",          element: <S><HomePage /></S> },
  { path: "/explore",                  name: "explore",       element: <S><ExplorePage /></S> },
  { path: "/farm/:id",                 name: "farmDetail",    element: <S><FarmDetailPage /></S> },
  { path: "/marketplace",              name: "marketplace",   element: <S><MarketplacePage /></S> },
  { path: "/marketplace/search",       name: "search",        element: <S><MarketplaceSearchPage /></S> },
  { path: "/marketplace/product/:id",  name: "productDetail", element: <S><ProductDetailPage /></S> },
  { path: "/marketplace/farmer/:id",   name: "farmerStore",   element: <S><FarmerStorePage /></S> },
  { path: "/marketplace/checkout",     name: "checkout",      element: <S><CheckoutPage /></S> },
  { path: "/marketplace/wishlist",     name: "wishlist",      element: <S><WishlistPage /></S> },
  { path: "/community",                name: "community",     element: <S><CommunityPage /></S> },
  { path: "/get-listed",               name: "getListed",     element: <S><GetListedPage /></S> },
  { path: "/about",                    name: "about",         element: <S><AboutPage /></S> },
  { path: "/login",                    name: "login",         element: <S><AuthPage mode="login" /></S> },
  { path: "/signup",                   name: "signup",        element: <S><AuthPage mode="signup" /></S> },

  // ── Auth-protected ──────────────────────────────────────────────────────────
  {
    path: "/book/:farmId",
    name: "booking",
    element: <RequireAuth><S><BookingPage /></S></RequireAuth>,
  },
  {
    path: "/account",
    name: "account",
    element: <RequireAuth><S><AccountPage /></S></RequireAuth>,
  },
  {
    path: "/admin",
    name: "admin",
    element: <RequireAuth role="admin"><S><AdminPage /></S></RequireAuth>,
  },

  // ── Catch-all ───────────────────────────────────────────────────────────────
  { path: "*", name: "404", element: <S><NotFound /></S> },
];

declare global {
  interface Window { __routers__: typeof routers; }
}
window.__routers__ = routers;
