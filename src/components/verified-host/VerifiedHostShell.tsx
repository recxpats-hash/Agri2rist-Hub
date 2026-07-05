import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, ClipboardList, GraduationCap, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { path: ".", label: "Dashboard", icon: Home },
  { path: "certification-levels", label: "Certification Program", icon: GraduationCap },
  { path: "training-modules", label: "Training Modules", icon: ClipboardList },
  { path: "students", label: "Students", icon: Users },
];

export default function VerifiedHostShell() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-6 shadow-sm">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70">Verified Host Certification System</div>
            <h1 className="text-3xl font-extrabold text-primary-foreground">Host Operations & Certification</h1>
            <p className="mt-2 max-w-2xl text-sm text-primary-foreground/80">Enterprise host management, certification, learning, and operational reporting in one polished portal.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">Host Application</Button>
            <Button variant="outline">Support</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm sticky top-6 self-start">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Program Nav</p>
              <h2 className="text-lg font-bold text-foreground">Host Workspace</h2>
            </div>
          </div>
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "."}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Verified Host portal</p>
              <h2 className="text-xl font-bold text-foreground">Welcome back, host partner.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Manage certifications</Button>
              <Button variant="outline">New cohort</Button>
            </div>
          </div>

          <Outlet />
        </section>
      </div>
    </div>
  );
}
