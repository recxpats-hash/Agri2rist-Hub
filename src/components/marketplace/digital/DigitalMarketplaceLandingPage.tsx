import { useMemo } from "react";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Box,
  ChartNoAxesCombined,
  ChevronRight,
  Download,
  GraduationCap,
  Headphones,
  Image as ImageIcon,
  Map as MapIcon,
  MessageCircle,
  PlayCircle,
  Rocket,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SECTION_BADGE_TONES = {
  blue: "bg-primary/10 text-primary border-primary/20",
  green: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  orange: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  purple: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
  red: "bg-rose-500/10 text-rose-700 border-rose-500/20",
  gold: "bg-amber-500/15 text-amber-800 border-amber-500/25",
} as const;

type Tier = "Featured" | "Best Seller" | "Top Rated" | "New" | "Verified" | "Editor's Choice" | "Premium";

type MarketplaceCard = {
  title: string;
  subtitle: string;
  tone: keyof typeof SECTION_BADGE_TONES;
  tier: Tier;
  icon: React.ReactNode;
  priceLabel: string;
};

function UXCard({
  title,
  subtitle,
  tone,
  tier,
  icon,
  priceLabel,
  href = "/marketplace",
}: {
  title: string;
  subtitle: string;
  tone: keyof typeof SECTION_BADGE_TONES;
  tier: Tier;
  icon: React.ReactNode;
  priceLabel: string;
  href?: string;
}) {
  return (
    <Link to={href} className="block group">
      <Card className="relative overflow-hidden border-border bg-card/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-muted/70 text-primary">
              {icon}
            </div>
            <Badge className={`${SECTION_BADGE_TONES[tone]} border font-semibold text-[11px]`}>{tier}</Badge>
          </div>
          <h3 className="mt-4 font-extrabold text-foreground leading-tight line-clamp-2">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm font-bold text-foreground">{priceLabel}</div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground group-hover:text-primary transition">
              Preview <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function SectionHeader({
  badge,
  title,
  description,
  right,
}: {
  badge?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        {badge && <Badge className="bg-secondary text-secondary-foreground border-secondary/20 font-bold">{badge}</Badge>}
        <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-foreground">{title}</h2>
        {description && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}

export default function DigitalMarketplaceLandingPage() {
  const trendingCategories = useMemo(
    () => [
      { label: "Digital Downloads", icon: <Download size={16} /> },
      { label: "Online Learning", icon: <GraduationCap size={16} /> },
      { label: "Memberships", icon: <Users size={16} /> },
      { label: "Farm Software", icon: <Box size={16} /> },
      { label: "AI Services", icon: <Sparkles size={16} /> },
      { label: "GIS & Maps", icon: <MapIcon size={16} /> },
      { label: "Digital Marketing", icon: <Rocket size={16} /> },
      { label: "Photography", icon: <ImageIcon size={16} /> },
      { label: "Video", icon: <PlayCircle size={16} /> },
      { label: "Digital Library", icon: <BookOpen size={16} /> },
      { label: "Certification", icon: <BadgeCheck size={16} /> },
      { label: "Consultancy", icon: <Wrench size={16} /> },
      { label: "Business Intelligence", icon: <ChartNoAxesCombined size={16} /> },
    ],
    []
  );

  const featured = useMemo<MarketplaceCard[]>(
    () => [
      {
        title: "Farm Business Starter Pack",
        subtitle: "Plans, record books, templates, and guided previews.",
        tone: "green",
        tier: "Best Seller",
        icon: <Download size={18} />,
        priceLabel: "From UGX 49,000",
      },
      {
        title: "Agriculture Analytics Reports (Monthly)",
        subtitle: "Market prices, demand signals, and trend charts.",
        tone: "blue",
        tier: "Premium",
        icon: <ChartNoAxesCombined size={18} />,
        priceLabel: "UGX 129,000 / mo",
      },
      {
        title: "AI Crop Diagnosis Preview",
        subtitle: "Interactive guidance for likely diseases (UI demo).",
        tone: "purple",
        tier: "AI Powered",
        icon: <Sparkles size={18} />,
        priceLabel: "UGX 75,000",
      } as any,
      {
        title: "Verified Host Inspection Toolkit",
        subtitle: "Inspection checklists + renewal flows (UI preview).",
        tone: "gold",
        tier: "Verified",
        icon: <BadgeCheck size={18} />,
        priceLabel: "UGX 60,000",
      },
      {
        title: "Digital Marketing Campaign Bundle",
        subtitle: "Social + email + sponsored listings package.",
        tone: "orange",
        tier: "Editor\u2019s Choice",
        icon: <Rocket size={18} />,
        priceLabel: "UGX 95,000",
      },
      {
        title: "GIS Route Maps Starter",
        subtitle: "Interactive mapping templates for farms & tourism.",
        tone: "blue",
        tier: "Featured",
        icon: <MapIcon size={18} />,
        priceLabel: "UGX 45,000",
      },
    ],
    []
  );

  const instructors = useMemo(
    () => [
      { name: "Amina K.", role: "Agribusiness Coach", stat: "4.9/5" },
      { name: "Samuel M.", role: "GIS Specialist", stat: "Top Rated" },
      { name: "Fatima S.", role: "Certified Training Host", stat: "Verified" },
      { name: "John N.", role: "AI Services Consultant", stat: "Premium" },
    ],
    []
  );

  return (
    <PageLayout>
      {/* Breadcrumb + Title */}
      <div className="container mx-auto px-4 pt-6">
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="inline-flex items-center gap-2">
            <Search size={12} /> Marketplace
          </span>
          <span className="opacity-60">/</span>
          <span className="font-semibold text-foreground">Digital Products & Services</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(22,163,74,.16),transparent_45%)]" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-secondary text-secondary-foreground border-secondary/20 font-bold">
                AGRI2RIST HUB\u2014 DIGITAL MARKETPLACE
              </Badge>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Buy, learn, subscribe, and preview enterprise-grade digital tools\nfor agriculture, tourism & business.
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-xl">
                Envato-like marketplace UX: fast browsing, faceted discovery, professional cards, and conversion-ready layouts. No backend logic—UI only.
              </p>

              {/* Global search */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search downloads, courses, software, AI services, APIs..."
                    className="pl-10 h-12 rounded-2xl border-primary/20 focus-visible:ring-primary/30"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                </div>
                <Button className="h-12 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-extrabold">
                  Search Marketplace <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Promo banners */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="p-4 border-border bg-card/70 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-primary/10 text-primary">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <div className="font-extrabold">Trending right now</div>
                      <div className="text-xs text-muted-foreground">New releases + top sellers</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-border bg-card/70 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-secondary/10 text-secondary">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <div className="font-extrabold">Need guidance?</div>
                      <div className="text-xs text-muted-foreground">Chat previews available</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Hero side stats + skeletons */}
            <div className="space-y-4">
              <Card className="p-5 rounded-3xl border-border bg-card/70 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-extrabold text-foreground">120+</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-foreground">35+</div>
                    <div className="text-xs text-muted-foreground">Services</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-foreground">18</div>
                    <div className="text-xs text-muted-foreground">Categories</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold">Top Rated Experience</div>
                  <Badge className="bg-green-500/10 text-green-700 border-green-500/20">4.9+ avg</Badge>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-3">
                {new Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="p-4 border-border bg-card/70 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-2xl" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <div className="mt-2 flex gap-2">
                          <Skeleton className="h-3 w-1/3" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 py-8">
        <SectionHeader
          badge="Popular Categories"
          title="Explore by marketplace vertical"
          description="Digital downloads, software, learning, AI services, GIS maps, media, certifications, consultancy, business intelligence, and more."
        />

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {trendingCategories.slice(0, 12).map((c) => (
            <Card key={c.label} className="p-4 border-border bg-card/60 backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">{c.icon}</div>
                <div className="min-w-0">
                  <div className="font-extrabold text-sm line-clamp-1">{c.label}</div>
                  <div className="text-xs text-muted-foreground">Browse</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <Button variant="outline" className="rounded-2xl border-primary/20 hover:bg-primary/5">
            View all categories <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Featured Products & Services */}
      <section className="container mx-auto px-4 py-8">
        <SectionHeader
          badge="Featured"
          title="Featured products & services"
          description="Conversion-ready cards with premium badges, fast scanning, and consistent layout."
          right={
            <div className="flex items-center gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[190px] rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="top">Top rated</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((f) => (
            <UXCard
              key={f.title}
              title={f.title}
              subtitle={f.subtitle}
              tone={f.tone}
              tier={f.tier}
              icon={f.icon}
              priceLabel={f.priceLabel}
            />
          ))}
        </div>
      </section>

      {/* Trending / Latest Releases / Top Sellers / Best Rated */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="p-6 border-border bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-extrabold text-foreground">Trending Products</div>
                <div className="text-xs text-muted-foreground mt-1">AI powered + popular</div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">Live</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {new Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-2xl bg-muted/70" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">Trending item #{i + 1}</div>
                      <div className="text-xs text-muted-foreground truncate">Preview included</div>
                    </div>
                  </div>
                  <Badge className="bg-amber-500/15 text-amber-800 border-amber-500/25">Top</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border bg-card/60 backdrop-blur-sm lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <div className="font-extrabold text-foreground">Latest Releases</div>
                <div className="text-xs text-muted-foreground mt-1">New digital content, updated frequently</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-2xl border-border hover:bg-muted">Top Sellers</Button>
                <Button variant="outline" className="rounded-2xl border-border hover:bg-muted">Best Rated</Button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {new Array(6).fill(0).map((_, i) => (
                <Card key={i} className="p-4 border-border bg-card/60">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Download size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="font-extrabold text-sm">Release #{i + 1}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">Fresh templates, courses and toolkits.</div>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary border-primary/20">New</Badge>
                        <div className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-2">
                          View <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Instructors & Consultants */}
      <section className="container mx-auto px-4 py-8">
        <SectionHeader
          badge="Marketplace Experts"
          title="Featured instructors & consultants"
          description="Verified profiles with consistent cards, star ratings, and enterprise trust cues."
        />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {instructors.map((p) => (
            <Card key={p.name} className="p-5 border-border bg-card/60 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-extrabold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.role}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-500" />
                  <span className="text-xs font-bold text-muted-foreground">{p.stat}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">Verified</Badge>
                <Button variant="outline" className="rounded-2xl border-border hover:bg-muted">
                  View profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-60" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Newsletter for new releases & drops</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">Get curated digital products, learning paths, and enterprise service updates. UI preview only.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="Email address" className="h-12 rounded-2xl border-primary/20" />
              <Button className="h-12 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-extrabold">
                Subscribe <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skeleton row for UX completeness */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {new Array(3).fill(0).map((_, i) => (
            <Card key={i} className="p-6 border-border bg-card/60 backdrop-blur-sm">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <div className="mt-4">
                <Skeleton className="h-4 w-2/3" />
                <div className="mt-2">
                  <Skeleton className="h-3 w-5/6" />
                </div>
                <div className="mt-5 flex gap-2">
                  <Skeleton className="h-9 w-24 rounded-xl" />
                  <Skeleton className="h-9 w-24 rounded-xl" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer is handled by PageLayout */}
    </PageLayout>
  );
}

