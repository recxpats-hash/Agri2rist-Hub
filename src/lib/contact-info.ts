export const OFFICIAL_CONTACT = {
  name: "Agri2rist Hub Support",
  email: "support@agri2risthub.com",
  bookingsEmail: "bookings@agri2risthub.com",
  phone: "+256 700 000 000",
  whatsapp: "+256 700 000 000",
  address: "Agri2rist Hub, Kampala, Uganda",
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/agri2risthub" },
  { label: "Instagram", href: "https://instagram.com/agri2risthub" },
  { label: "X", href: "https://x.com/agri2risthub" },
  { label: "LinkedIn", href: "https://linkedin.com/company/agri2risthub" },
];

export function openNewsletterPopup() {
  window.dispatchEvent(new Event("agri2rist:open-newsletter"));
}
