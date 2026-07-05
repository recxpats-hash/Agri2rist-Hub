import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  {
    title: "Foundation",
    modules: [
      { id: "F-101", title: "Host Operations Basics", duration: "3h", topics: "Host systems, compliance, guest safety", trainer: "Jane Ouma", status: "Open" },
      { id: "F-102", title: "Customer Experience Design", duration: "2h", topics: "Journey mapping, hospitality empathy", trainer: "Kofi Mensah", status: "Open" },
    ],
  },
  {
    title: "Hospitality",
    modules: [
      { id: "H-201", title: "Farm Stay Hospitality", duration: "4h", topics: "Accommodation readiness, comfort, service standards", trainer: "Sarah Nakato", status: "Open" },
      { id: "H-202", title: "Food Safety & Dining", duration: "3h", topics: "Menu curation, hygiene, dietary handling", trainer: "Lina Okello", status: "Open" },
    ],
  },
  {
    title: "Agricultural Experience",
    modules: [
      { id: "A-301", title: "Farm Tour Crafting", duration: "3h", topics: "Experience storytelling, activity planning", trainer: "David Lubega", status: "Open" },
      { id: "A-302", title: "Hands-on Agri Workshops", duration: "4h", topics: "Crop demos, animal care, sustainability", trainer: "Maria Kamanzi", status: "Limited" },
    ],
  },
  {
    title: "Business",
    modules: [
      { id: "B-401", title: "Pricing & Revenue", duration: "2h", topics: "Packages, margins, upselling", trainer: "Richard Wekesa", status: "Open" },
      { id: "B-402", title: "Digital Booking Systems", duration: "2h", topics: "Online payments, calendars, CRM", trainer: "Amina Biko", status: "Open" },
    ],
  },
];

export default function TrainingModulesPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Foundation: true });
  const categories = useMemo(() => CATEGORIES, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Training Modules</h2>
            <p className="text-sm text-muted-foreground">Organized by category with modules, trainers, duration and enrollment actions.</p>
          </div>
          <Button variant="secondary">Manage curriculum</Button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.title} className="rounded-3xl border border-border bg-background">
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [category.title]: !prev[category.title] }))}
                className="w-full flex items-center justify-between gap-3 p-5 text-left"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.modules.length} modules available</p>
                </div>
                <div className="text-primary">
                  {expanded[category.title] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>
              {expanded[category.title] && (
                <div className="divide-y divide-border">
                  {category.modules.map((module) => (
                    <div key={module.id} className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{module.id}</span>
                          <span>•</span>
                          <span>{module.duration}</span>
                        </div>
                        <h4 className="mt-2 text-lg font-semibold text-foreground">{module.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">{module.topics}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-start md:items-end">
                        <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">Trainer: {module.trainer}</div>
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{module.status}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button size="sm">Enroll</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
