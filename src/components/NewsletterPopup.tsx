import { FormEvent, useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { OFFICIAL_CONTACT, SOCIAL_LINKS, getSupportEmailHref } from "@/lib/contact-info";

const SUBSCRIBERS_KEY = "agri2rist_newsletter_subscribers";

const socialIcons: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
};

type NewsletterLead = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  createdAt: string;
};

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const openFromHome = () => {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user?.name || "",
        email: prev.email || user?.email || "",
      }));
      setOpen(true);
    };

    window.addEventListener("agri2rist:open-newsletter", openFromHome);
    return () => window.removeEventListener("agri2rist:open-newsletter", openFromHome);
  }, [user?.email, user?.name]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const lead: NewsletterLead = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      message: form.message.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    const subscribers: NewsletterLead[] = JSON.parse(localStorage.getItem(SUBSCRIBERS_KEY) || "[]");
    const next = subscribers.filter((subscriber) => subscriber.email.toLowerCase() !== lead.email.toLowerCase());
    localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify([...next, lead]));

    toast({
      title: "Contact request saved",
      description: `Thank you, ${lead.name}. Agri2rist Hub can follow up through ${lead.email}.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-lg">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <Mail className="text-primary" size={22} />
          </div>
          <DialogTitle>Contact Agri2rist Hub</DialogTitle>
          <DialogDescription>
            Join updates or send a quick message about bookings, farm listings, shopping, training, or support.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
          <form onSubmit={submit} className="space-y-3 md:col-span-3">
            <Input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Full name"
              required
            />
            <Input
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="Email address"
              required
            />
            <Input
              type="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="Phone number (optional)"
            />
            <Textarea
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              placeholder="Message (optional)"
              rows={4}
              className="resize-none"
            />
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Send and Subscribe
            </Button>
          </form>

          <div className="md:col-span-2 rounded-lg border border-border bg-muted p-4">
            <h3 className="font-bold text-foreground mb-3">Official Contact</h3>
            <div className="space-y-3 text-sm">
              <a href={getSupportEmailHref()} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-muted-foreground hover:text-primary">
                <Mail size={16} className="mt-0.5 text-primary" />
                <span>{OFFICIAL_CONTACT.email}</span>
              </a>
              <a href={`mailto:${OFFICIAL_CONTACT.bookingsEmail}`} className="flex items-start gap-2 text-muted-foreground hover:text-primary">
                <Mail size={16} className="mt-0.5 text-primary" />
                <span>{OFFICIAL_CONTACT.bookingsEmail}</span>
              </a>
              <a href={`tel:${OFFICIAL_CONTACT.phone.replace(/\s/g, "")}`} className="flex items-start gap-2 text-muted-foreground hover:text-primary">
                <Phone size={16} className="mt-0.5 text-primary" />
                <span>{OFFICIAL_CONTACT.phone}</span>
              </a>
              <a href={`https://wa.me/${OFFICIAL_CONTACT.whatsapp.replace(/\D/g, "")}`} className="flex items-start gap-2 text-muted-foreground hover:text-primary">
                <MessageCircle size={16} className="mt-0.5 text-primary" />
                <span>WhatsApp {OFFICIAL_CONTACT.whatsapp}</span>
              </a>
            </div>

            <h3 className="font-bold text-foreground mt-5 mb-3">Social Media</h3>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.label] || MessageCircle;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-primary hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
