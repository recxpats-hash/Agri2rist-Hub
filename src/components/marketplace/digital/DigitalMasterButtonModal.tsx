import { ReactNode, useMemo } from "react";
import {
  ArrowRight,
  Box,
  BookOpen,
  Calculator,
  Calendar,
  Camera,
  ChartNoAxesCombined,
  Download,
  Globe,
  GraduationCap,
  LayoutGrid,
  List,
  Map,
  MessageCircle,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Sparkles,

  Tv,
  Users,
  Video,
  Wheat,
  Wrench,
  FileText,
  Menu,
  Languages,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type DigitalMarketplaceSectionKey =
  | "downloads"
  | "learning"
  | "memberships"
  | "software"
  | "ai"
  | "gis"
  | "marketing"
  | "photography"
  | "video"
  | "library"
  | "certification"
  | "consultancy"
  | "bi"
  | "mobile"
  | "websites"
  | "events"
  | "apis"
  | "translation"
  | "advertising"
  | "subscriptions";

const SECTION_TILES: Array<{
  key: DigitalMarketplaceSectionKey;
  title: string;
  description: string;
  icon: ReactNode;
  badge?: { label: string; tone: "primary" | "success" | "warning" | "gold" };
  href: string;
}> = [
  {
    key: "downloads",
    title: "Digital Downloads",
    description: "Farm business plans, records, templates, and manuals.",
    icon: <Download size={18} className="text-emerald-600" />,
    badge: { label: "Premium", tone: "gold" },
    href: "/digital/downloads",
  },
  {
    key: "learning",
    title: "Online Learning",
    description: "Courses, paths, certifications, and guided learning.",
    icon: <GraduationCap size={18} className="text-blue-600" />,
    badge: { label: "Verified", tone: "success" },
    href: "/digital/learning",
  },
  {
    key: "memberships",
    title: "Membership Plans",
    description: "Free → Enterprise tiers with upgrade paths.",
    icon: <Users size={18} className="text-amber-600" />,
    badge: { label: "Best Value", tone: "gold" },
    href: "/digital/memberships",
  },
  {
    key: "software",
    title: "Farm Software",
    description: "Inventory, livestock, crop records, GPS, and workflows.",
    icon: <Box size={18} className="text-amber-600" />,
    href: "/digital/software",
  },
  {
    key: "ai",
    title: "AI Services",
    description: "Advisors, diagnosis, planning tools, and AI reports.",
    icon: <Sparkles size={18} className="text-indigo-600" />,
    badge: { label: "AI Powered", tone: "primary" },
    href: "/digital/ai",
  },
  {
    key: "gis",
    title: "GIS & Maps",
    description: "Interactive farm, route, tourism, and wildlife mapping.",
    icon: <Map size={18} className="text-teal-600" />,
    href: "/digital/gis",
  },
  {
    key: "marketing",
    title: "Digital Marketing",
    description: "Campaign packs: social, email, banner, and sponsored listings.",
    icon: <Rocket size={18} className="text-orange-600" />,
    href: "/digital/marketing",
  },
  {
    key: "photography",
    title: "Photography",
    description: "Farm, wildlife, drone, and tourism image collections + licenses.",
    icon: <Camera size={18} className="text-purple-600" />,
    href: "/digital/photography",
  },
  {
    key: "video",
    title: "Video Library",
    description: "Training videos, documentaries, and series collections.",
    icon: <PlayCircle size={18} className="text-red-600" />,
    href: "/digital/video",
  },
  {
    key: "library",
    title: "Digital Library",
    description: "eBooks, research papers, manuals, and reader preview.",
    icon: <FileText size={18} className="text-slate-700" />,
    href: "/digital/library",
  },
  {
    key: "certification",
    title: "Certification Services",
    description: "Verified host, inspections, renewals, and verification status.",
    icon: <ShieldCheck size={18} className="text-emerald-700" />,
    href: "/digital/certification",
  },
  {
    key: "consultancy",
    title: "Consultancy",
    description: "Business, farm, financial, marketing, and export advisory.",
    icon: <Wrench size={18} className="text-orange-600" />,
    href: "/digital/consultancy",
  },
  {
    key: "bi",
    title: "Business Intelligence",
    description: "Market prices, demand analytics, production stats, trend charts.",
    icon: <ChartNoAxesCombined size={18} className="text-indigo-600" />,
    href: "/digital/bi-reports",
  },
  {
    key: "mobile",
    title: "Mobile Applications",
    description: "App store layout: farm management, marketplaces, AI assistants.",
    icon: <Tv size={18} className="text-blue-600" />,
    href: "/digital/mobile",
  },
  {
    key: "websites",
    title: "Website Development",
    description: "Farm, tourism, restaurants, hotels, and e-commerce builds.",
    icon: <Globe size={18} className="text-teal-600" />,
    href: "/digital/websites",
  },
  {
    key: "events",
    title: "Digital Events",
    description: "Webinars, virtual farm tours, workshops, schedules, tickets.",
    icon: <Calendar size={18} className="text-emerald-600" />,
    href: "/digital/events",
  },
  {
    key: "apis",
    title: "Premium APIs",
    description: "Weather, market prices, booking signals, maps, logistics.",
    icon: <Calculator size={18} className="text-indigo-600" />,
    href: "/digital/apis",
  },
  {
    key: "translation",
    title: "Translation Services",
    description: "Certified and curated translations for websites, manuals, support.",
    icon: <Languages size={18} className="text-emerald-600" />,
    href: "/digital/translation",
  },
  {
    key: "advertising",
    title: "Advertising Marketplace",
    description: "Homepage banners, sponsored listings, newsletter & mobile ads.",
    icon: <Rocket size={18} className="text-amber-600" />,
    href: "/digital/advertising",
  },
  {
    key: "subscriptions",
    title: "Subscription Bundles",
    description: "Learning + software + growth packages for teams and enterprises.",
    icon: <Users size={18} className="text-emerald-700" />,
    badge: { label: "Enterprise", tone: "warning" },
    href: "/digital/bundles",
  },
];

export function DigitalMasterButtonModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const header = useMemo(
    () => ({
      title: "Agri2rist Hub — Digital Products & Services",
      subtitle: "Choose a category to browse enterprise-grade digital offerings (UI preview).",
    }),
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl rounded-3xl overflow-hidden p-0">
        <div className="bg-background">
          <div className="p-5 sm:p-6 border-b border-border flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider text-muted-foreground">AGRI2RIST HUB</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">{header.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{header.subtitle}</p>
            </div>
            <button
              className="rounded-xl border border-border bg-card hover:bg-muted transition p-2"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECTION_TILES.map((tile) => (
                <a
                  key={tile.key}
                  href={tile.href}
                  className="group rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition overflow-hidden"
                  onClick={() => onOpenChange(false)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-muted/70">
                        {tile.icon}
                      </div>
                      {tile.badge ? (
                        <Badge
                          className={
                            tile.badge.tone === "gold"
                              ? "bg-amber-500/15 text-amber-800 border-amber-500/30"
                              : tile.badge.tone === "success"
                                ? "bg-emerald-500/15 text-emerald-800 border-emerald-500/30"
                                : tile.badge.tone === "warning"
                                  ? "bg-orange-500/15 text-orange-800 border-orange-500/30"
                                  : "bg-primary/10 text-primary border-primary/20"
                          }
                        >
                          {tile.badge.label}
                        </Badge>
                      ) : (
                        <span className="opacity-0">.</span>
                      )}
                    </div>

                    <div className="mt-3 font-extrabold text-foreground leading-tight">{tile.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{tile.description}</div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground group-hover:text-primary transition">
                        Browse
                        <ArrowRight size={14} />
                      </span>
                      <span className="text-[11px] text-muted-foreground group-hover:text-primary/80 transition">UI</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="text-sm">
                <div className="font-extrabold">Master navigation (frontend-only)</div>
                <div className="text-muted-foreground mt-1">Routes can be wired to backend data later.</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-2xl" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button className="rounded-2xl" onClick={() => (window.location.href = "/digital")}> 
                  Go to Landing
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

