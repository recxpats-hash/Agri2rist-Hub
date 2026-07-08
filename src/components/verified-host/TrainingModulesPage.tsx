import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ModuleItem = {
  id: string;
  title: string;
  duration: string;
  topics: string;
  trainer: string;
  status: string;
};

type Category = {
  title: string;
  modules: ModuleItem[];
};

const INITIAL_CATEGORIES: Category[] = [
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
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [query, setQuery] = useState("");
  const [modalState, setModalState] = useState<"closed" | "view" | "edit" | "add">("closed");
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Foundation");
  const [form, setForm] = useState<ModuleItem>({ id: "", title: "", duration: "", topics: "", trainer: "", status: "Open" });

  const visibleCategories = useMemo(() => categories.filter((category) =>
    category.title.toLowerCase().includes(query.toLowerCase()) || category.modules.some((module) => [module.title, module.trainer, module.status].join(" ").toLowerCase().includes(query.toLowerCase()))
  ), [categories, query]);

  const openAdd = (categoryTitle: string) => {
    setActiveCategory(categoryTitle);
    setForm({ id: `NEW-${Date.now()}`, title: "", duration: "", topics: "", trainer: "", status: "Open" });
    setActiveModule(null);
    setModalState("add");
  };

  const openView = (categoryTitle: string, moduleItem: ModuleItem) => {
    setActiveCategory(categoryTitle);
    setActiveModule(moduleItem);
    setForm(moduleItem);
    setModalState("view");
  };

  const openEdit = (categoryTitle: string, moduleItem: ModuleItem) => {
    setActiveCategory(categoryTitle);
    setActiveModule(moduleItem);
    setForm(moduleItem);
    setModalState("edit");
  };

  const closeModal = () => {
    setModalState("closed");
    setActiveModule(null);
  };

  const saveModule = () => {
    if (!form.title || !form.trainer) return;
    setCategories((prev) => prev.map((category) => {
      if (category.title !== activeCategory) return category;
      if (modalState === "edit" && activeModule) {
        return {
          ...category,
          modules: category.modules.map((module) => (module.id === activeModule.id ? { ...module, ...form } : module)),
        };
      }
      return { ...category, modules: [{ ...form }, ...category.modules] };
    }));
    closeModal();
  };

  const deleteModule = (categoryTitle: string, moduleId: string) => {
    setCategories((prev) => prev.map((category) => (category.title === categoryTitle ? { ...category, modules: category.modules.filter((module) => module.id !== moduleId) } : category)));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Training Modules</h2>
            <p className="text-sm text-muted-foreground">Organized by category with modules, trainers, duration and enrollment actions.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Search modules" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button variant="secondary" onClick={() => openAdd("Foundation")}>Add Module</Button>
          </div>
        </div>

        <div className="space-y-4">
          {visibleCategories.map((category) => (
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
                          <Button variant="outline" size="sm" onClick={() => openView(category.title, module)}>View</Button>
                          <Button variant="outline" size="sm" onClick={() => openEdit(category.title, module)}>Edit</Button>
                          <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteModule(category.title, module.id)}>Delete</Button>
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

      {modalState !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-white p-6 shadow-2xl dark:bg-slate-950">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">{modalState === "add" ? "Add Module" : modalState === "edit" ? "Edit Module" : "Module Details"}</h3>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-muted-foreground hover:bg-muted">✕</button>
            </div>

            {modalState === "view" && activeModule ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-semibold text-foreground">{activeModule.title}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Trainer</p>
                  <p className="font-semibold text-foreground">{activeModule.trainer}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Topics</p>
                  <p className="font-semibold text-foreground">{activeModule.topics}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Title</label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Duration</label>
                    <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Status</label>
                    <Input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Trainer</label>
                  <Input value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Topics</label>
                  <Input value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              {modalState !== "view" && <Button onClick={saveModule}>{modalState === "edit" ? "Update" : "Add Module"}</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
