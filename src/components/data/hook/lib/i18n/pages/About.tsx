import { ArrowRight, BadgeCheck, Leaf, LockKeyhole, ShieldCheck, Sprout, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { FARM_IMAGES } from "@/data/sampleData";

const PILLARS = [
  {
    icon: Leaf,
    title: "Environmental Sustainability",
    body: "Climate-smart agriculture, organic farming, agroforestry, water harvesting, waste reduction, renewable energy, and biodiversity protection.",
  },
  {
    icon: Sprout,
    title: "Supporting Farmers",
    body: "Fair pricing, direct bookings, market access, digital marketing, agricultural innovation, value addition, and skills development.",
  },
  {
    icon: Users,
    title: "Empowering Rural Communities",
    body: "Local employment, cultural preservation, rural entrepreneurship, local food sourcing, artisan promotion, and heritage conservation.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Tourism",
    body: "Respect local customs, farm biosecurity, wildlife, natural habitats, water use, and local businesses.",
  },
];

const TRUST_ROWS = [
  ["Verified Hosts", "Identity, registration, contact, location, service validation, and farm inspection where applicable."],
  ["Secure Payments", "Encrypted transactions, fraud monitoring, multiple payment options, digital receipts, refunds, and booking protection."],
  ["Customer Protection", "Booking assistance, dispute resolution, cancellation support, emergency contacts, and complaint handling."],
  ["Data Privacy", "Protection for personal information, payment data, booking history, business records, and communications."],
  ["Quality Standards", "Reviews, ratings, farm assessment, accommodation standards, food hygiene, safety inspections, and monitoring."],
  ["Transparency", "Clear pricing, cancellation policies, honest reviews, verified listings, accurate descriptions, and fair dispute resolution."],
];

const BADGES = [
  "Eco Farm Certified",
  "Organic Producer",
  "Sustainable Farm Stay",
  "Green Tourism Partner",
  "Zero Waste Champion",
  "Water Steward",
  "Tree Planting Partner",
  "Community Impact Partner",
  "Verified Quality Host",
  "Trusted Business",
];

const IMPACT = [
  ["Farmers Registered", "1,200+"],
  ["Farm Stays Booked", "8,400+"],
  ["Rural Jobs Created", "3,600+"],
  ["Trees Planted", "42,000+"],
  ["Local Businesses Supported", "950+"],
  ["Visitor Satisfaction", "96%"],
];

const PARTNERS = [
  "Government ministries",
  "Tourism boards",
  "Agricultural organizations",
  "Farmer cooperatives",
  "Universities",
  "NGOs",
  "Conservation organizations",
  "Financial institutions",
  "Development partners",
  "Technology providers",
];

export default function AboutPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-primary py-20">
        <img src={FARM_IMAGES.fishPonds} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container relative mx-auto px-4">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">Sustainability & Trust</Badge>
          <h1 className="max-w-4xl text-4xl font-extrabold text-primary-foreground md:text-6xl">
            Growing Tourism. Protecting Communities. Preserving Nature.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            Every booking, purchase, and experience should create lasting value for farmers, rural communities, visitors, and the environment.
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-extrabold text-foreground">Our Sustainability Pillars</h2>
            <p className="mt-2 text-muted-foreground">
              Agri2rist Hub keeps sustainability visible without turning it into decoration. These commitments guide host verification, visitor guidance, and platform standards.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-lg border border-border bg-card p-6">
                <pillar.icon className="mb-4 text-accent" size={28} />
                <h3 className="text-xl font-extrabold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">Safe • Secure • Transparent</Badge>
            <h2 className="text-3xl font-extrabold text-foreground">Our Trust Promise</h2>
            <p className="mt-3 text-muted-foreground">
              Guests, hosts, farmers, restaurants, guides, and businesses should know what is verified, what is protected, and how issues are resolved.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <LockKeyhole size={20} className="text-primary" />
                <h3 className="font-bold text-foreground">Safety & Biosecurity</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Farm hygiene protocols, visitor registration, animal and crop protection, controlled access, disease prevention, emergency procedures, and food safety are part of the host quality review.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <tbody>
                {TRUST_ROWS.map(([title, body]) => (
                  <tr key={title} className="border-b border-border last:border-0">
                    <td className="w-44 p-4 font-bold text-foreground">{title}</td>
                    <td className="p-4 text-muted-foreground">{body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">Sustainability Certifications</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Participating businesses can earn badges based on verification evidence, operating standards, and ongoing performance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <Badge key={badge} variant="outline" className="px-3 py-2">
                  <BadgeCheck size={14} className="mr-1 text-accent" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 text-xl font-extrabold text-foreground">Community Impact Dashboard</h3>
            <div className="grid grid-cols-2 gap-3">
              {IMPACT.map(([label, value]) => (
                <div key={label} className="rounded-md bg-muted p-4">
                  <div className="text-2xl font-extrabold text-primary">{value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">Partnerships for Sustainable Development</h2>
            <p className="mt-2 text-muted-foreground">
              Collaboration helps turn rural tourism into practical economic growth, environmental stewardship, and inclusive innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PARTNERS.map((partner) => (
              <div key={partner} className="rounded-md border border-border bg-card p-3 text-sm font-medium text-foreground/80">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14">
        <div className="container mx-auto flex flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-primary-foreground">Travel with Purpose. Grow Local.</h2>
            <p className="mt-2 max-w-2xl text-primary-foreground/78">
              Join Agri2rist Hub to support farmers, protect the environment, celebrate cultural heritage, and strengthen rural communities.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/explore"><Button className="bg-secondary text-secondary-foreground">Explore Farms <ArrowRight size={16} className="ml-2" /></Button></Link>
            <Link to="/get-listed"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">Become a Host</Button></Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
