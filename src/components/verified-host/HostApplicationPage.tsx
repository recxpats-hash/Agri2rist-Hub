import { ArrowRight, CheckCircle2, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const REQUIREMENTS = [
  "Verified farm or host profile",
  "Business registration or legal ID",
  "Safety and hygiene readiness",
  "Experience or training evidence",
];

export default function HostApplicationPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <Sparkles size={14} /> Apply to become a verified host
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">Host application</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Submit a complete profile to unlock certification, training access, and trusted marketplace visibility.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="/verified-host">Back to portal</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground">Application checklist</h3>
          <div className="mt-5 space-y-3">
            {REQUIREMENTS.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-primary" />
              <p className="text-sm font-semibold text-foreground">Fast review in 2–3 business days</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Your application is reviewed by the certification team for completeness and readiness.</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground">Start your application</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Full name</label>
              <Input placeholder="Enter your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Farm or venue name</label>
              <Input placeholder="Enter the host business name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Email</label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Phone</label>
                <Input placeholder="Phone number" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Supporting documents</label>
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-background p-3 text-sm text-muted-foreground">
                <FileText size={16} /> Upload ID, business proof, and safety documents
              </div>
            </div>
            <Button className="w-full rounded-2xl">
              Submit application
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
