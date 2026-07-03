export const OFFICIAL_CONTACT = {
  name: "Agri2rist Hub Support",
  email: "support@agri2risthub.com",
  supportInbox: "agri2rist@gmail.com",
  bookingsEmail: "bookings@agri2risthub.com",
  phone: "+256 200 949 411",
  whatsapp: "+256 771 991 331",
  address: "Agri2rist Hub, Kampala, Uganda",
};

export function getSupportEmailHref(subject = "Agri2rist Hub Support Request") {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: OFFICIAL_CONTACT.supportInbox,
    su: subject,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/agri2risthub" },
  { label: "Instagram", href: "https://instagram.com/agri2risthub" },
  { label: "X", href: "https://x.com/agri2risthub" },
  { label: "LinkedIn", href: "https://linkedin.com/company/agri2risthub" },
];

export function openNewsletterPopup() {
  window.dispatchEvent(new Event("agri2rist:open-newsletter"));
}
