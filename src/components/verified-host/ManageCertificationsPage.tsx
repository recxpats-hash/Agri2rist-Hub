import { BadgeCheck, BookOpen, ClipboardCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ManageCertificationsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              <BadgeCheck size={14} /> Certification management
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">Manage certifications</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Review host certification progress, approve credential updates, and keep courses aligned with training standards.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="/verified-host">Back to portal</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Certification pipelines</h3>
              <p className="text-sm text-muted-foreground">Monitor active host applications and status updates.</p>
            </div>
            <Sparkles className="text-emerald-600" />
          </div>
          <div className="space-y-4">
            {[
              { title: "Application review", detail: "12 hosts awaiting final approval", icon: ClipboardCheck },
              { title: "Training completion", detail: "8 cohorts ready for evaluation", icon: BookOpen },
              { title: "Verified hosts", detail: "214 hosts already certified", icon: BadgeCheck },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground">Guidance</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl border border-border bg-background p-5">
              <p className="font-semibold text-foreground">Approval checklist</p>
              <p className="mt-2 text-sm text-muted-foreground">Confirm host safety training, profile documentation, and guest readiness before issuing certification.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-5">
              <p className="font-semibold text-foreground">Program updates</p>
              <p className="mt-2 text-sm text-muted-foreground">Use this page to keep certification workflows, learning requirements, and host agreements up to date.</p>
            </div>
          </div>
          <Button className="mt-6 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700">
            Review pending hosts
          </Button>
        </div>
      </div>
    </div>
  );
}
