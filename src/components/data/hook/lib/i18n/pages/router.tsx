import HomePage from "./Home";
import ExplorePage from "./Explore";
import FarmDetailPage from "./FarmDetail";
import BookingPage from "./Booking";
import MarketplacePage from "./Marketplace";
import CommunityPage from "./Community";
import GetListedPage from "./GetListed";
import AboutPage from "./About";
import NotFound from "./NotFound";
import AuthPage from "./Auth";
import RequireAuth from "./RequireAuth";
import AccountPage from "./Account";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <HomePage />,
  },
  {
    path: "/explore",
    name: "explore",
    element: <ExplorePage />,
  },
  {
    path: "/farm/:id",
    name: "farmDetail",
    element: <FarmDetailPage />,
  },
  {
    path: "/book/:farmId",
    name: "booking",
    element: (
      <RequireAuth>
        <BookingPage />
      </RequireAuth>
    ),
  },
  {
    path: "/marketplace",
    name: "marketplace",
    element: <MarketplacePage />,
  },
  {
    path: "/community",
    name: "community",
    element: <CommunityPage />,
  },
  {
    path: "/get-listed",
    name: "getListed",
    element: <GetListedPage />,
  },
  {
    path: "/about",
    name: "about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    name: "login",
    element: <AuthPage mode="login" />,
  },
  {
    path: "/signup",
    name: "signup",
    element: <AuthPage mode="signup" />,
  },
  {
    path: "/account",
    name: "account",
    element: (
      <RequireAuth>
        <AccountPage />
      </RequireAuth>
    ),
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
