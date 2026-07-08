import { MessageCircle, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const supportTopics = [
  { title: "Certification questions", description: "Learn how qualifications, requirements, and review timelines work." },
  { title: "Training logistics", description: "Get help scheduling sessions, instructors, and classroom resources." },
  { title: "Application support", description: "Troubleshoot missing documents, status updates, and follow-up requests." },
];

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              <MessageCircle size={14} /> Host support
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">Support center</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Find answers, get assistance, and connect with the verified-host support team for application and certification questions.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="/verified-host">Back to portal</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-foreground">Support topics</h3>
          <div className="mt-5 space-y-4">
            {supportTopics.map((topic) => (
              <div key={topic.title} className="rounded-3xl border border-border bg-background p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-foreground">{topic.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                  <ShieldCheck size={24} className="text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
            <ShieldAlert size={24} className="text-emerald-700" />
            <div>
              <p className="text-sm font-semibold text-foreground">Need urgent help?</p>
              <p className="text-sm text-muted-foreground">Contact our support team directly for priority review and follow-up.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="mt-1 text-sm font-semibold text-foreground">support@agri2risthub.com</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Response time</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Within 24 hours</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Support coverage</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Application, training, certification, payments</p>
            </div>
          </div>

          <Button className="mt-6 w-full rounded-2xl">
            Message the support team
          </Button>
        </div>
      </div>
    </div>
  );
}
