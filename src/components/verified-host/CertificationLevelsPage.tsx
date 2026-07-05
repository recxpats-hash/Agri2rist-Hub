import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LEVELS = [
  {
    title: "Certified Agri2rist Host",
    tier: "Level 1",
    description: "Entry certification for host readiness, guest experience and operational safety.",
    requirements: ["Profile verification", "Host safety checklist", "Basic hospitality training"],
    duration: "4 weeks",
    modules: ["Host onboarding", "Service standards", "Experience design"],
    price: "UGX 450,000",
  },
  {
    title: "Silver Verified Host",
    tier: "Level 2",
    description: "Expanded certification for consistent guest delivery and multi-experience hosting.",
    requirements: ["Level 1 completion", "Guest feedback review", "Service quality audit"],
    duration: "6 weeks",
    modules: ["Guest communications", "Booking operations", "Sustainability best practices"],
    price: "UGX 750,000",
  },
  {
    title: "Gold Verified Host",
    tier: "Level 3",
    description: "Premium certification for commercial hosts, accommodation and curated farm experiences.",
    requirements: ["Silver level", "Revenue readiness", "Advanced safety verification"],
    duration: "8 weeks",
    modules: ["Premium guest experience", "Event hosting", "Revenue optimization"],
    price: "UGX 1,200,000",
  },
  {
    title: "Platinum Verified Host",
    tier: "Level 4",
    description: "Enterprise host certification for multiple venues, training programs, and corporate partnerships.",
    requirements: ["Gold level", "Multi-site readiness", "Advanced management systems"],
    duration: "12 weeks",
    modules: ["Enterprise hosting", "Staff leadership", "Sales and partnerships"],
    price: "UGX 2,200,000",
  },
  {
    title: "Master Agri2rist Host",
    tier: "Level 5",
    description: "Top-tier certification for industry-leading hosts, experiential tourism brands and certification trainers.",
    requirements: ["Platinum level", "Trainer accreditation", "Innovation portfolio"],
    duration: "16 weeks",
    modules: ["Strategic host leadership", "Certification management", "Industry partnerships"],
    price: "UGX 3,500,000",
  },
];

export default function CertificationLevelsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Certification Levels</h2>
            <p className="text-sm text-muted-foreground">Structured certification tiers for host growth and verified marketplace trust.</p>
          </div>
          <Button variant="secondary">Review program guide</Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {LEVELS.map((level) => (
            <div key={level.tier} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Badge className="bg-primary text-primary-foreground">{level.tier}</Badge>
                  <h3 className="mt-3 text-xl font-bold text-foreground">{level.title}</h3>
                </div>
                <div className="text-right text-sm text-muted-foreground">{level.duration}</div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{level.description}</p>
              <div className="mt-4 space-y-2">
                <div className="text-sm font-semibold text-foreground">Requirements</div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {level.requirements.map((item) => (<li key={item}>{item}</li>))}
                </ul>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-sm font-semibold text-foreground">Modules Included</div>
                <div className="flex flex-wrap gap-2">
                  {level.modules.map((item) => (<span key={item} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">{item}</span>))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-muted-foreground">Program fee</div>
                  <div className="text-xl font-bold text-foreground">{level.price}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Enroll</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
