import { ReactNode, useMemo } from "react";
import { ArrowRight, BadgeCheck, BarChart3, GraduationCap, MonitorSmartphone, ShieldCheck, Sparkles, Store, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type DigitalCollection = {
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
};

const FEATURED_COLLECTIONS: DigitalCollection[] = [
  {
    title: "AI Growth Tools",
    description: "Smart assistants, crop diagnosis, pricing insights, and advisor workflows.",
    icon: <Sparkles size={20} className="text-violet-600" />,
    badge: "New",
  },
  {
    title: "Digital Learning",
    description: "Premium training modules, certification prep, and guided onboarding.",
    icon: <GraduationCap size={20} className="text-sky-600" />,
    badge: "Popular",
  },
  {
    title: "Trusted Compliance",
    description: "Inspection checklists, verified host services, and secure document delivery.",
    icon: <ShieldCheck size={20} className="text-emerald-600" />,
  },
];

const QUICK_CATEGORIES = [
  { title: "Marketing Kits", subtitle: "Social, email, and listing assets", icon: <TrendingUp size={16} /> },
  { title: "Analytics Suite", subtitle: "Demand and market intelligence", icon: <BarChart3 size={16} /> },
  { title: "Mobile Apps", subtitle: "Field tools and farm operations", icon: <MonitorSmartphone size={16} /> },
  { title: "Business Storefront", subtitle: "Website, catalogue and checkout setup", icon: <Store size={16} /> },
];

export function DigitalMasterButtonModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const header = useMemo(
    () => ({
      title: "Digital storefront for modern farm businesses",
      subtitle: "Discover premium tools, trusted services, and growth solutions tailored for Agri2rist sellers.",
    }),
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto rounded-[28px] p-0 sm:w-[min(92vw,1100px)]">
        <div className="bg-background">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-900 to-slate-800 px-4 py-6 text-white sm:px-8 sm:py-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_40%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                  <BadgeCheck size={14} /> Alibaba-style digital commerce
                </div>
                <h2 className="text-3xl font-extrabold sm:text-4xl">{header.title}</h2>
                <p className="mt-3 text-sm leading-7 text-emerald-50/90 sm:text-base">{header.subtitle}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">Trusted by</div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-white">
                  <span className="rounded-full bg-white/15 px-3 py-1">Farm owners</span>
                  <span className="rounded-full bg-white/15 px-3 py-1">Hosts</span>
                  <span className="rounded-full bg-white/15 px-3 py-1">Agri brands</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/40 p-4 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {FEATURED_COLLECTIONS.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">{item.icon}</div>
                    {item.badge ? <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">{item.badge}</span> : null}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-8">
            <div className="rounded-[24px] border border-border bg-card p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Explore more</div>
                  <h3 className="mt-1 text-2xl font-semibold text-foreground">Curated digital categories</h3>
                </div>
                <Button className="rounded-2xl" onClick={() => (window.location.href = "/digital")}>
                  Open digital storefront
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {QUICK_CATEGORIES.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-background p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">{item.icon}</div>
                    <h4 className="mt-3 font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

