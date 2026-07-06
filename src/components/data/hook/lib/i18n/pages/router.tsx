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
const DigitalMarketplaceLandingPage = lazy(() => import("@/components/marketplace/digital/DigitalMarketplaceLandingPage"));
const ProductDetailPage = lazy(() => import("./ProductDetail"));
const FarmerStorePage   = lazy(() => import("./FarmerStore"));
const MarketplaceSearchPage = lazy(() => import("./MarketplaceSearch"));
const CatalogExplorerPage = lazy(() => import("./CatalogExplorer"));
const ProductEditorPage = lazy(() => import("./ProductEditor"));
const CheckoutPage      = lazy(() => import("./Checkout"));
const WishlistPage      = lazy(() => import("./Wishlist"));
const CommunityPage     = lazy(() => import("./Community"));
const GetListedPage     = lazy(() => import("./GetListed"));
const VerifiedHostShell = lazy(() => import("@/components/verified-host/VerifiedHostShell"));
const VerifiedHostPage  = lazy(() => import("@/components/verified-host/VerifiedHostPage"));
const CertificationLevelsPage = lazy(() => import("@/components/verified-host/CertificationLevelsPage"));
const TrainingModulesPage = lazy(() => import("@/components/verified-host/TrainingModulesPage"));
const StudentsPage      = lazy(() => import("@/components/verified-host/StudentsPage"));
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
  { path: "/digital",                 name: "digitalMarketplace", element: <S><DigitalMarketplaceLandingPage /></S> },

  { path: "/marketplace/search",       name: "search",        element: <S><MarketplaceSearchPage /></S> },
  { path: "/marketplace/catalog",      name: "catalog",       element: <S><CatalogExplorerPage /></S> },
  { path: "/marketplace/catalog/editor/:productId?", name: "productEditor", element: <S><ProductEditorPage /></S> },
  { path: "/marketplace/product/:id",  name: "productDetail", element: <S><ProductDetailPage /></S> },
  { path: "/marketplace/farmer/:id",   name: "farmerStore",   element: <S><FarmerStorePage /></S> },
  { path: "/marketplace/checkout",     name: "checkout",      element: <S><CheckoutPage /></S> },
  { path: "/marketplace/wishlist",     name: "wishlist",      element: <S><WishlistPage /></S> },
  { path: "/community",                name: "community",     element: <S><CommunityPage /></S> },
  { path: "/get-listed",               name: "getListed",     element: <S><GetListedPage /></S> },
  {
    path: "/verified-host",
    name: "verifiedHost",
    element: <S><VerifiedHostShell /></S>,
    children: [
      { index: true, element: <S><VerifiedHostPage /></S> },
      { path: "certification-levels", element: <S><CertificationLevelsPage /></S> },
      { path: "training-modules", element: <S><TrainingModulesPage /></S> },
      { path: "students", element: <S><StudentsPage /></S> },
    ],
  },
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
