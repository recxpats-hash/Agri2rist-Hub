import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type Level = {
  title: string;
  tier: string;
  description: string;
  requirements: string[];
  duration: string;
  modules: string[];
  price: string;
};

const INITIAL_LEVELS: Level[] = [
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
  const [levels, setLevels] = useState<Level[]>(INITIAL_LEVELS);
  const [query, setQuery] = useState("");
  const [modalState, setModalState] = useState<"closed" | "view" | "edit" | "add">("closed");
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [form, setForm] = useState<Level>({ title: "", tier: "", description: "", requirements: [], duration: "", modules: [], price: "" });

  const filtered = useMemo(() => levels.filter((level) => [level.title, level.tier, level.description, level.price].join(" ").toLowerCase().includes(query.toLowerCase())), [levels, query]);

  const openAdd = () => {
    setForm({ title: "", tier: "", description: "", requirements: [], duration: "", modules: [], price: "" });
    setActiveLevel(null);
    setModalState("add");
  };

  const openView = (level: Level) => {
    setActiveLevel(level);
    setForm(level);
    setModalState("view");
  };

  const openEdit = (level: Level) => {
    setActiveLevel(level);
    setForm(level);
    setModalState("edit");
  };

  const closeModal = () => {
    setModalState("closed");
    setActiveLevel(null);
  };

  const saveLevel = () => {
    if (!form.title || !form.tier || !form.price) return;
    if (modalState === "edit" && activeLevel) {
      setLevels((prev) => prev.map((item) => (item.tier === activeLevel.tier ? { ...item, ...form } : item)));
    } else {
      setLevels((prev) => [{ ...form, tier: form.tier || `Level ${prev.length + 1}` }, ...prev]);
    }
    closeModal();
  };

  const deleteLevel = (tier: string) => {
    setLevels((prev) => prev.filter((item) => item.tier !== tier));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Certification Levels</h2>
            <p className="text-sm text-muted-foreground">Structured certification tiers for host growth and verified marketplace trust.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Search certifications" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button variant="secondary" onClick={openAdd}>Add Level</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((level) => (
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
                  <Button variant="outline" size="sm" onClick={() => openView(level)}>View</Button>
                  <Button variant="outline" size="sm" onClick={() => openEdit(level)}>Edit</Button>
                  <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteLevel(level.tier)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalState !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-white p-6 shadow-2xl dark:bg-slate-950">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">{modalState === "add" ? "Add Certification" : modalState === "edit" ? "Edit Certification" : "Certification Details"}</h3>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-muted-foreground hover:bg-muted">✕</button>
            </div>

            {modalState === "view" && activeLevel ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-semibold text-foreground">{activeLevel.title}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Tier</p>
                  <p className="font-semibold text-foreground">{activeLevel.tier}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-semibold text-foreground">{activeLevel.price}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Title</label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Tier</label>
                    <Input value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-24 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground dark:bg-slate-900" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Duration</label>
                    <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Price</label>
                    <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Requirements</label>
                  <Input value={form.requirements.join(", ")} onChange={(e) => setForm({ ...form, requirements: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Modules</label>
                  <Input value={form.modules.join(", ")} onChange={(e) => setForm({ ...form, modules: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              {modalState !== "view" && <Button onClick={saveLevel}>{modalState === "edit" ? "Update" : "Add Level"}</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
