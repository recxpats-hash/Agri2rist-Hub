import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, LayoutDashboard, LogOut, Mail, Menu, MessageCircle, Phone, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { FARM_IMAGES } from "@/data/sampleData";
import { OFFICIAL_CONTACT, getSupportEmailHref } from "@/lib/contact-info";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "@/components/marketplace/CartSidebar";
import { SearchBar } from "@/components/marketplace/SearchBar";

const navLinkKeys = ["home", "explore", "marketplace", "community", "about"] as const;
const navHrefMap: Record<string, string> = {
  home: "/",
  explore: "/explore",
  marketplace: "/marketplace",
  community: "/community",
  about: "/about",
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { count: cartCount } = useCart();
  const { t } = useTranslation();

  return (
    <>
    <nav className="sticky top-0 z-50 bg-primary shadow-hero">
      <div className="border-b border-primary-light bg-primary-light/95 text-primary-foreground">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-2 text-xs md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href={`tel:${OFFICIAL_CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-1 hover:text-secondary">
              <Phone size={13} />
              <span>Office Line: {OFFICIAL_CONTACT.phone}</span>
            </a>
            <a href={`https://wa.me/${OFFICIAL_CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-secondary">
              <MessageCircle size={13} />
              <span>WhatsApp</span>
            </a>
            <a href={getSupportEmailHref()} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-secondary">
              <Mail size={13} />
              <span>{OFFICIAL_CONTACT.email}</span>
            </a>
            <span className="flex items-center gap-1 text-primary-foreground/85">
              <Clock size={13} />
              <span>Working Hours: Mon-Sat, 8:00 AM-6:00 PM</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="hidden md:block w-56">
              <SearchBar
                compact
                inputClassName="h-8 text-xs border-primary-foreground/25 bg-primary text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-secondary"
              />
            </div>
            {user ? (
              <Link to="/account" className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-semibold hover:text-secondary">
                {user.name}
              </Link>
            ) : (
              <div className="flex items-center gap-1">
                <Link to="/login" className="rounded-md px-2.5 py-1.5 font-semibold hover:bg-primary hover:text-secondary">
                  {t("nav.login")}
                </Link>
                <Link to="/signup" className="rounded-md bg-secondary px-2.5 py-1.5 font-semibold text-secondary-foreground hover:bg-secondary/90">
                  {t("nav.register")}
                </Link>
                <LanguageSwitcher compact />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <span className="h-10 w-10 overflow-hidden rounded-full bg-primary-foreground md:h-12 md:w-12">
              <img
                src={FARM_IMAGES.logo}
                alt="Agri2rist Hub"
                width={48}
                height={48}
                loading="eager"
                decoding="async"
                className="h-full w-full scale-125 object-cover"
              />
            </span>
            <div className="hidden sm:block">
              <div className="text-primary-foreground font-bold text-lg leading-tight">
                Agri2rist Hub
              </div>
              <div className="text-secondary text-xs leading-tight">
                Local Roots • Global Impacts
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinkKeys.map((key) => (
              <Link
                key={key}
                to={navHrefMap[key]}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === navHrefMap[key]
                    ? "bg-primary-light text-secondary"
                    : "text-primary-foreground hover:bg-primary-light hover:text-secondary"
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/get-listed">
              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold"
              >
                {t("nav.becomeHost")}
              </Button>
            </Link>
            <Link to="/explore">
              <Button
                size="sm"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-gold"
              >
                {t("home.hero.cta.book")}
              </Button>
            </Link>
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-md bg-primary-light px-3 py-2 text-primary-foreground hover:text-secondary transition-colors"
              aria-label={`Shopping cart (${cartCount} items)`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {user && (
              <div className="flex items-center gap-2 rounded-md bg-primary-light px-3 py-2">
                <UserRound size={16} className="text-secondary" />
                <Link
                  to="/account"
                  className="max-w-28 truncate text-sm font-medium text-primary-foreground hover:text-secondary"
                >
                  {user.name}
                </Link>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="text-[10px] font-semibold text-primary-foreground hover:text-secondary bg-primary/40 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                    title="Management Panel"
                  >
                    <LayoutDashboard size={10} /> Management
                  </Link>
                ) : (
                  <button
                    onClick={logout}
                    className="text-primary-foreground/70 hover:text-secondary"
                    aria-label="Logout"
                  >
                    <LogOut size={15} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-light border-t border-primary-glow animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinkKeys.map((key) => (
              <Link
                key={key}
                to={navHrefMap[key]}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === navHrefMap[key]
                    ? "bg-primary text-secondary"
                    : "text-primary-foreground hover:bg-primary hover:text-secondary"
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-primary-glow">
              <div className="flex items-center gap-2 px-4">
                <LanguageSwitcher compact />
              </div>
              <Link to="/get-listed" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full border-secondary text-secondary">
                  {t("nav.becomeHost")}
                </Button>
              </Link>
              <Link to="/explore" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-secondary text-secondary-foreground">
                  {t("home.hero.cta.book")}
                </Button>
              </Link>
              {user && (
                <div className="rounded-md bg-primary px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      to="/account"
                      onClick={() => setMobileOpen(false)}
                      className="truncate text-sm font-medium text-primary-foreground"
                    >
                      {user.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1"
                      >
                        <Button size="sm" variant="outline" className="w-full border-secondary text-secondary text-xs">
                          <LayoutDashboard size={12} className="mr-1" /> Management
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className={cn("text-primary-foreground", isAdmin ? "flex-1" : "w-full")}
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                    >
                      <LogOut size={14} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
    <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
  </>
  );
}
