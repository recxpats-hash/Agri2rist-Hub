import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, LogOut, Mail, Menu, MessageCircle, Phone, Search, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { FARM_IMAGES } from "@/data/sampleData";
import { OFFICIAL_CONTACT } from "@/lib/contact-info";
import { LanguageSwitcher } from "@/components/language-switcher";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
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
            <a href={`mailto:${OFFICIAL_CONTACT.email}`} className="flex items-center gap-1 hover:text-secondary">
              <Mail size={13} />
              <span>{OFFICIAL_CONTACT.email}</span>
            </a>
            <span className="flex items-center gap-1 text-primary-foreground/85">
              <Clock size={13} />
              <span>Working Hours: Mon-Sat, 8:00 AM-6:00 PM</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <LanguageSwitcher className="h-8 min-w-[118px] border-primary-foreground/25 bg-primary text-xs text-primary-foreground" />
            <Link to="/explore">
              <Button size="sm" variant="outline" className="h-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Search size={13} className="mr-1" />
                Search
              </Button>
            </Link>
            {user ? (
              <Link to="/account" className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-semibold hover:text-secondary">
                {user.name}
              </Link>
            ) : (
              <div className="flex items-center gap-1">
                <Link to="/login" className="rounded-md px-2.5 py-1.5 font-semibold hover:bg-primary hover:text-secondary">
                  Login
                </Link>
                <Link to="/signup" className="rounded-md bg-secondary px-2.5 py-1.5 font-semibold text-secondary-foreground hover:bg-secondary/90">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={FARM_IMAGES.logo}
              alt="Agri2rist Hub"
              width={48}
              height={48}
              loading="eager"
              decoding="async"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
            />
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary-light text-secondary"
                    : "text-primary-foreground hover:bg-primary-light hover:text-secondary"
                )}
              >
                {link.label}
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
                Become a Host
              </Button>
            </Link>
            <Link to="/explore">
              <Button
                size="sm"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-gold"
              >
                Book Your Experience
              </Button>
            </Link>
            {user && (
              <div className="flex items-center gap-2 rounded-md bg-primary-light px-3 py-2">
                <UserRound size={16} className="text-secondary" />
                <Link
                  to="/account"
                  className="max-w-28 truncate text-sm font-medium text-primary-foreground hover:text-secondary"
                >
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-primary-foreground/70 hover:text-secondary"
                  aria-label="Logout"
                >
                  <LogOut size={15} />
                </button>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary text-secondary"
                    : "text-primary-foreground hover:bg-primary hover:text-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-primary-glow">
              <Link to="/get-listed" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full border-secondary text-secondary">
                  Become a Host
                </Button>
              </Link>
              <Link to="/explore" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-secondary text-secondary-foreground">
                  Book Your Experience
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
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary-foreground"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                    >
                      <LogOut size={14} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
