import { Link } from "react-router-dom";
import { FARM_IMAGES } from "@/data/sampleData";
import { OFFICIAL_CONTACT, SOCIAL_LINKS, getSupportEmailHref, openNewsletterPopup } from "@/lib/contact-info";

const footerLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Get Listed", href: "/get-listed" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="h-11 w-11 overflow-hidden rounded-full bg-primary-foreground">
              <img
                src="/assets/Logo.png"
                alt="Agri2rist Hub"
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <div className="font-bold leading-tight">Agri2rist Hub</div>
              <div className="text-sm text-secondary">Local Roots, Global Impacts</div>
            </div>
          </Link>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-primary-foreground/80 transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openNewsletterPopup}
              className="text-primary-foreground/80 transition-colors hover:text-secondary"
            >
              Contact Us
            </button>
          </nav>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-primary-light pt-5 text-sm md:grid-cols-3">
          <div>
            <div className="font-semibold text-secondary">Email</div>
            <a className="text-primary-foreground/75 hover:text-secondary" href={getSupportEmailHref()} target="_blank" rel="noreferrer">
              {OFFICIAL_CONTACT.email}
            </a>
          </div>
          <div>
            <div className="font-semibold text-secondary">Phone</div>
            <a className="text-primary-foreground/75 hover:text-secondary" href={`tel:${OFFICIAL_CONTACT.phone.replace(/\s/g, "")}`}>
              {OFFICIAL_CONTACT.phone}
            </a>
          </div>
          <div>
            <div className="font-semibold text-secondary">Social</div>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-foreground/75 hover:text-secondary"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-primary-light pt-4 text-sm text-primary-foreground/70">
          (c) 2026 Agri2rist Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
