import { CalendarPlus, Users, CheckCircle2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NewCohortPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              <CalendarPlus size={14} /> New cohort planning
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">New cohort</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Launch a fresh training cohort with dedicated schedules, enrollment tracking, and operational readiness tools.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="/verified-host">Back to portal</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground">Cohort setup</h3>
          <div className="mt-5 space-y-5">
            {[
              { label: "Course name", value: "Hospitality Essentials" },
              { label: "Capacity", value: "24 participants" },
              { label: "Start date", value: "May 12, 2026" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-border bg-background p-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          <Button className="mt-6 w-full rounded-2xl bg-sky-600 hover:bg-sky-700">
            Add new schedule
          </Button>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Cohort preview</h3>
              <p className="text-sm text-muted-foreground">Track enrollment and module readiness.</p>
            </div>
            <Layers size={24} className="text-sky-600" />
          </div>
          <div className="space-y-4">
            {[
              { title: "Participant onboarding", info: "12 confirmed" },
              { title: "Trainer assignment", info: "2 instructors" },
              { title: "Safety checks", info: "Ready" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.info}</p>
                  </div>
                  <CheckCircle2 className="text-sky-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
