import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function VerifiedHostPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // LMS UI-only: notification + dropdown state
  const [openNotif, setOpenNotif] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [activeSection, setActiveSection] = useState<
    | "dashboard"
    | "certification"
    | "students"
    | "trainers"
    | "schedule"
    | "assessments"
    | "certificates"
    | "payments"
    | "resources"
    | "reports"
    | "administration"
    | "settings"
  >("dashboard");

  // Certification Program tabs
  const [certTab, setCertTab] = useState<
    | "overview"
    | "levels"
    | "modules"
    | "specialist"
    | "development"
    | "fees"
  >("overview");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const seeded = {
        total_students: 842,
        total_trainers: 67,
        active_courses: 24,
        certificates: 214,
        revenue: 1280000000,
        pending_payments: 38,
        upcoming_classes: 12,
        today_schedule: [
          { time: "09:00", title: "Hospitality Foundation", venue: "Training Hall A" },
          { time: "11:30", title: "Agricultural Experience", venue: "Lab Room 2" },
          { time: "14:00", title: "Food Safety Practicals", venue: "Kitchen Lab" },
        ],
        recent_activity: [
          { who: "Fatima S.", action: "Enrolled", meta: "Wheelchair-friendly transport module" },
          { who: "Hassan K.", action: "Completed", meta: "Emergency Preparedness quiz" },
          { who: "Siti Nur", action: "Submitted", meta: "Assessment result uploaded" },
        ],
      };
      await new Promise((r) => setTimeout(r, 350));
      if (mounted) setData(seeded);
      if (mounted) setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const primary = "#16A34A";
  const secondary = "#166534";
  const accent = "#EAB308";

  const sections = [
    { key: "dashboard" as const, label: "Dashboard", icon: "LayoutDashboard" },
    { key: "certification" as const, label: "Certification Program", icon: "BadgeCheck" },
    { key: "students" as const, label: "Students", icon: "Users" },
    { key: "trainers" as const, label: "Trainers", icon: "UserRound" },
    { key: "schedule" as const, label: "Training Schedule", icon: "CalendarDays" },
    { key: "assessments" as const, label: "Assessments", icon: "ClipboardCheck" },
    { key: "certificates" as const, label: "Certificates", icon: "Badge" },
    { key: "payments" as const, label: "Payments", icon: "Receipt" },
    { key: "resources" as const, label: "Learning Resources", icon: "BookOpen" },
    { key: "reports" as const, label: "Reports", icon: "FileSpreadsheet" },
    { key: "administration" as const, label: "Administration", icon: "Shield" },
    { key: "settings" as const, label: "Settings", icon: "Settings" },
  ];

  const searchResults = useMemoLikeGlobalSearch(globalSearch);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <style>{`
        :root{--a2r-primary:${primary};--a2r-secondary:${secondary};--a2r-accent:${accent};--a2r-bg:#F8FAFC;--a2r-card:#ffffff;}
        .a2r-app{background:var(--a2r-bg); min-height:100vh;}
        .a2r-brand-pill{background:rgba(22,163,74,.10);border:1px solid rgba(22,163,74,.20);color:${secondary};}
        .a2r-sidebar{transition:width .2s ease; border-right:1px solid rgba(0,0,0,.06); background:#fff;}
        .a2r-navitem{cursor:pointer; border-radius:14px; padding:10px 12px; display:flex; align-items:center; gap:10px; border:1px solid transparent; color:#0f172a;}
        .a2r-navitem:hover{background:rgba(22,163,74,.06); border-color:rgba(22,163,74,.18);} 
        .a2r-navitem[data-active="true"]{background:rgba(22,163,74,.10); border-color:rgba(22,163,74,.25);} 
        .a2r-shell{display:grid; grid-template-columns: 280px 1fr; gap:0;}
        @media (max-width: 992px){ .a2r-shell{grid-template-columns: 1fr;} .a2r-sidebar{display:none;} .a2r-shell[data-mobile="true"] .a2r-sidebar{display:block; position:fixed; inset:64px auto 0 0; width:280px; z-index:60; box-shadow:0 18px 60px rgba(0,0,0,.12);} }
        .a2r-pagewrap{padding:22px;}
        .a2r-card{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:18px;box-shadow:0 10px 30px rgba(2,6,23,.04);} 
        .a2r-glassbar{background:rgba(248,250,252,.7);} 
        .a2r-badge{font-weight:700; border-radius:999px; padding:6px 10px; border:1px solid rgba(0,0,0,.06);} 
        .a2r-muted{color:rgba(15,23,42,.62);} 
        .a2r-skeleton{position:relative; overflow:hidden; background:rgba(2,6,23,.05);} 
        .a2r-skeleton::after{content:""; position:absolute; inset:0; transform:translateX(-100%); background:linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent); animation:a2r-shimmer 1.1s infinite;} 
        @keyframes a2r-shimmer{100%{transform:translateX(100%);} }
        .a2r-table td,.a2r-table th{white-space:nowrap;}
      `}</style>

      {/* App wrapper */}
      <div className="a2r-app">

        {/* Global search toast */}
        <div id="a2r-global-search-toast" data-show="false" style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 18, zIndex: 80, background: "rgba(17,24,39,.92)", color: "#fff", padding: "10px 14px", borderRadius: 999, opacity: 0, pointerEvents: "none", transition: "opacity 200ms ease" }} />
        <style>{`#a2r-global-search-toast[data-show="true"]{opacity:1;}`}</style>

        <div className="container-fluid p-0">
          <div className="a2r-shell" data-mobile={!sidebarOpen ? "true" : "false"}>
            {/* Sidebar */}
            {sidebarOpen && (
              <aside className="a2r-sidebar" style={{ width: 280, padding: 14 }}>
                <div className="a2r-card p-3" style={{ marginBottom: 12 }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-extrabold">Host Console</div>
                      <div className="small a2r-muted">Admin-grade LMS UI</div>
                    </div>
                    <span className="badge" style={{ background: "rgba(234,179,8,.15)", color: secondary, border: "1px solid rgba(234,179,8,.25)" }}>Verified</span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-1">
                  {sections.map((s) => (
                    <div
                      key={s.key}
                      className="a2r-navitem"
                      data-active={activeSection === s.key}
                      onClick={() => setActiveSection(s.key)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="rounded-circle" style={{ width: 30, height: 30, background: "rgba(22,163,74,.10)", color: secondary, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>•</span>
                      <span className="fw-semibold">{s.label}</span>
                    </div>
                  ))}

                  <div className="mt-3 d-flex gap-2">
                    <Link to="/get-listed" style={{ textDecoration: "none" }}>
                      <Button className="w-100" style={{ background: primary, borderColor: primary }}>Become a Host</Button>
                    </Link>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" className="w-100">Logout</Button>
                  </div>
                </div>
              </aside>
            )}

            {/* Main content */}
            <section className="a2r-pagewrap">
              {/* Breadcrumb + title + actions */}
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-3">
                <div>
                  <nav className="small a2r-muted">Dashboard / Verified Host / {sectionLabel(activeSection)}</nav>
                  <h2 className="fw-extrabold" style={{ fontSize: 28, marginTop: 6 }}>{pageTitle(activeSection)}</h2>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <Button variant="outline" className="rounded-3">Export Excel</Button>
                  <Button variant="outline" className="rounded-3">Export PDF</Button>
                  <Button variant="outline" className="rounded-3">Print</Button>
                  <Button className="rounded-3" style={{ background: primary, borderColor: primary }}>
                    Quick Action
                  </Button>
                </div>
              </div>

              {/* Content blocks (frontend-only) */}
              {activeSection === "dashboard" && (
                <div className="row g-3">
                  <div className="col-12">
                    <div className="a2r-card p-3 p-md-4">
                      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <div>
                          <div className="fw-extrabold">Today’s Schedule</div>
                          <div className="small a2r-muted">UI-only schedule preview</div>
                        </div>
                        <div className="d-flex gap-2">
                          <span className="badge bg-success-subtle text-success border border-success-subtle">Upcoming</span>
                          <span className="badge bg-warning-subtle text-warning border border-warning-subtle">Assessments</span>
                        </div>
                      </div>

                      <div className="table-responsive mt-3">
                        <table className="table a2r-table mb-0">
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>Training</th>
                              <th>Venue</th>
                              <th style={{ width: 180 }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(data?.today_schedule ?? []).map((r: any, idx: number) => (
                              <tr key={idx}>
                                <td className="fw-semibold">{r.time}</td>
                                <td>{r.title}</td>
                                <td className="text-muted">{r.venue}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <Button size="sm" className="rounded-3">View</Button>
                                    <Button size="sm" variant="outline" className="rounded-3">Add</Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {loading && (
                              Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i}>
                                  <td><div className="a2r-skeleton" style={{ height: 14, width: 70 }} /></td>
                                  <td><div className="a2r-skeleton" style={{ height: 14, width: 220 }} /></td>
                                  <td><div className="a2r-skeleton" style={{ height: 14, width: 180 }} /></td>
                                  <td><div className="a2r-skeleton" style={{ height: 30, width: 140, borderRadius: 10 }} /></td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="d-flex justify-content-between flex-wrap gap-2 mt-3">
                        <div className="small a2r-muted">Pagination UI demo</div>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-3">Prev</Button>
                          <Button size="sm" variant="outline" className="rounded-3">1</Button>
                          <Button size="sm" variant="outline" className="rounded-3">2</Button>
                          <Button size="sm" variant="outline" className="rounded-3">Next</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row g-3">
                      {[
                        { k: "total_students", label: "Total Students" },
                        { k: "total_trainers", label: "Total Trainers" },
                        { k: "active_courses", label: "Active Courses" },
                        { k: "certificates", label: "Certificates Issued" },
                      ].map((x) => (
                        <div key={x.k} className="col-12 col-md-6 col-xl-3">
                          <div className="a2r-card p-3">
                            <div className="small a2r-muted">{x.label}</div>
                            <div className="fw-extrabold" style={{ fontSize: 30, marginTop: 6 }}>
                              {loading ? "—" : formatNumber(data?.[x.k])}
                            </div>
                            <div className="mt-2">
                              <span className="badge bg-success-subtle text-success border border-success-subtle">Live</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-12 col-lg-7">
                    <div className="a2r-card p-3 p-md-4 h-100">
                      <div className="fw-extrabold">Recent Activities</div>
                      <div className="small a2r-muted">Frontend timeline + status patterns</div>
                      <div className="mt-3 d-flex flex-column gap-2">
                        {(data?.recent_activity ?? []).map((a: any, i: number) => (
                          <div key={i} className="d-flex gap-3 align-items-start">
                            <div className="rounded-circle" style={{ width: 34, height: 34, background: "rgba(22,163,74,.10)", display: "flex", alignItems: "center", justifyContent: "center", color: secondary, fontWeight: 900 }}>✓</div>
                            <div>
                              <div className="fw-semibold">{a.who} <span className="text-muted fw-normal">{a.action}</span></div>
                              <div className="small a2r-muted">{a.meta}</div>
                            </div>
                          </div>
                        ))}
                        {loading && (
                          <>
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="d-flex gap-3 align-items-start">
                                <div className="a2r-skeleton rounded-circle" style={{ width: 34, height: 34 }} />
                                <div className="flex-grow-1">
                                  <div className="a2r-skeleton" style={{ height: 14, width: "65%", borderRadius: 10 }} />
                                  <div className="a2r-skeleton mt-2" style={{ height: 12, width: "42%", borderRadius: 10 }} />
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-5">
                    <div className="a2r-card p-3 p-md-4 h-100">
                      <div className="fw-extrabold">Quick Actions</div>
                      <div className="small a2r-muted">Register, schedule, issue certificate, generate report</div>

                      <div className="mt-3 d-flex flex-column gap-2">
                        {["Register Student", "Schedule Training", "Issue Certificate", "Generate Report"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            className="btn btn-outline-success rounded-3 d-flex align-items-center justify-content-between"
                            onClick={() => {
                              const el = document.getElementById("a2r-action-toast");
                              if (el) {
                                el.textContent = `${t} (UI only)`;
                                el.setAttribute("data-show", "true");
                                setTimeout(() => el.setAttribute("data-show", "false"), 2200);
                              }
                            }}
                          >
                            <span className="fw-semibold">{t}</span>
                            <span style={{ color: primary }}>→</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-3">
                        <div className="fw-extrabold">Revenue</div>
                        <div className="small a2r-muted">UI-only money widget</div>
                        <div className="fw-extrabold" style={{ fontSize: 34, marginTop: 6, color: primary }}>
                          {loading ? "—" : formatMoney(data?.revenue)}
                        </div>
                        <div className="mt-2 d-flex gap-2 flex-wrap">
                          <span className="badge bg-warning-subtle text-warning border border-warning-subtle">Pending: {loading ? "—" : data?.pending_payments}</span>
                          <span className="badge bg-success-subtle text-success border border-success-subtle">Upcoming: {loading ? "—" : data?.upcoming_classes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "certification" && (
                <div className="a2r-card p-3 p-md-4">
                  <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-3">
                    <div>
                      <div className="fw-extrabold">Certification Program</div>
                      <div className="small a2r-muted">Tabs + responsive cards + tables (UI-only)</div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline" className="rounded-3" size="sm">Enroll</Button>
                      <Button className="rounded-3" size="sm" style={{ background: primary, borderColor: primary }}>Compare Levels</Button>
                    </div>
                  </div>

                  <ul className="nav nav-pills flex-wrap gap-2" role="tablist">
                    {(
                      [
                        { id: "overview", label: "Overview" },
                        { id: "levels", label: "Certification Levels" },
                        { id: "modules", label: "Training Modules" },
                        { id: "specialist", label: "Specialist Certifications" },
                        { id: "development", label: "Professional Development" },
                        { id: "fees", label: "Fee Structure" },
                      ] as const
                    ).map((t) => (
                      <li key={t.id} className="nav-item" role="presentation">
                        <button
                          className={`nav-link rounded-pill ${certTab === t.id ? "active" : ""}`}
                          onClick={() => setCertTab(t.id)}
                          type="button"
                        >
                          {t.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    {certTab === "overview" && (
                      <div className="row g-3">
                        <div className="col-12 col-lg-8">
                          <div className="a2r-card p-3 p-md-4">
                            <div className="fw-extrabold" style={{ fontSize: 18 }}>Certified, Verified, Enterprise-ready</div>
                            <div className="small a2r-muted mt-2">A complete LMS + certification CMS UI shell. Backend wiring can be added later.</div>

                            <div className="row g-3 mt-3">
                              {[{ t: "Learning", d: "Courses, modules, assignments" },{ t: "Assessments", d: "Quizzes, practical checks" },{ t: "Certificates", d: "Digital issuance + verification" },{ t: "Payments", d: "Packages, scholarships, records" }].map((x) => (
                                <div key={x.t} className="col-12 col-md-6">
                                  <div className="a2r-card p-3">
                                    <div className="fw-extrabold">{x.t}</div>
                                    <div className="small a2r-muted mt-1">{x.d}</div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 d-flex flex-wrap gap-2">
                              {["Export PDF", "Export Excel", "Print", "Pagination", "Responsive tables"].map((b) => (
                                <span key={b} className="badge bg-success-subtle text-success border border-success-subtle">{b}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-4">
                          <div className="a2r-card p-3 p-md-4">
                            <div className="fw-extrabold">Your status</div>
                            <div className="small a2r-muted">UI-only verification snapshot</div>
                            <div className="mt-3">
                              <div className="fw-extrabold" style={{ fontSize: 28, color: primary }}>{loading ? "—" : "Gold"}</div>
                              <div className="small a2r-muted">Next step: Complete Specialist module</div>
                            </div>
                            <div className="mt-3 progress" style={{ height: 12, borderRadius: 999, background: "rgba(2,6,23,.06)" }}>
                              <div className="progress-bar" style={{ width: loading ? "25%" : "64%", background: primary }} />
                            </div>
                            <div className="mt-3 d-flex gap-2 flex-wrap">
                              <span className="badge" style={{ background: "rgba(234,179,8,.14)", border: "1px solid rgba(234,179,8,.25)" }}>Fee pending: UI</span>
                              <span className="badge bg-success-subtle text-success border border-success-subtle">Verified tasks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {certTab === "levels" && (
                      <div className="row g-3">
                        {[
                          { name: "Level 1", title: "Certified Agri2rist Host", desc: "Start your verification journey.", price: "$99", tone: "bg-white" },
                          { name: "Level 2", title: "Silver Verified Host", desc: "Stronger safety, deeper module depth.", price: "$199", tone: "bg-success-subtle" },
                          { name: "Level 3", title: "Gold Verified Host", desc: "Enterprise-ready operations & training.", price: "$399", tone: "bg-warning-subtle" },
                          { name: "Level 4", title: "Platinum Verified Host", desc: "Advanced assessments and reporting.", price: "$699", tone: "bg-primary-subtle" },
                          { name: "Level 5", title: "Master Agri2rist Host", desc: "Highest tier: specialist + governance.", price: "$1299", tone: "bg-success-subtle" },
                        ].map((lvl) => (
                          <div key={lvl.name} className="col-12 col-md-6 col-lg-4">
                            <div className="a2r-card p-3 h-100">
                              <div className="d-flex align-items-start justify-content-between gap-3">
                                <div>
                                  <div className="badge bg-success-subtle text-success border border-success-subtle">{lvl.name}</div>
                                  <div className="fw-extrabold mt-2">{lvl.title}</div>
                                  <div className="small a2r-muted mt-2">{lvl.desc}</div>
                                </div>
                                <div className="text-end">
                                  <div className="fw-extrabold" style={{ color: primary, fontSize: 26 }}>{lvl.price}</div>
                                  <div className="small a2r-muted">per program</div>
                                </div>
                              </div>

                              <div className="mt-3 d-flex flex-wrap gap-2">
                                {["Requirements", "Duration", "Modules"].map((x) => (
                                  <span key={x} className="badge bg-white border">{x}</span>
                                ))}
                              </div>

                              <div className="mt-3 d-flex gap-2">
                                <Button className="rounded-3" style={{ background: primary, borderColor: primary, flex: 1 }}>Enroll</Button>
                                <Button variant="outline" className="rounded-3" style={{ flex: 1 }}>View</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {certTab === "modules" && (
                      <div>
                        <div className="row g-3">
                          {["Foundation", "Hospitality", "Agricultural Experience", "Business", "Digital Skills", "Food Safety", "Environmental Management", "Legal Compliance", "Emergency Preparedness"].map((cat) => (
                            <div key={cat} className="col-12 col-md-6">
                              <div className="a2r-card p-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="fw-extrabold">{cat}</div>
                                  <button type="button" className="btn btn-outline-success rounded-pill btn-sm" data-bs-toggle="collapse" data-bs-target={`#col_${cat.replace(/\s/g, "_")}`}>Expand</button>
                                </div>
                                <div className="collapse mt-3 show" id={`col_${cat.replace(/\s/g, "_")}`}>
                                  <div className="row g-3">
                                    {[1, 2, 3].map((n) => (
                                      <div key={n} className="col-12">
                                        <div className="a2r-card p-3">
                                          <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                                            <div>
                                              <div className="fw-extrabold">Module {n}</div>
                                              <div className="small a2r-muted">{cat} — training workflow</div>
                                              <div className="small a2r-muted mt-1">Duration: {n * 3 + 2} hours • Cost: ${n * 49 + 99}</div>
                                            </div>
                                            <div className="d-flex gap-2">
                                              <Button size="sm" className="rounded-3" style={{ background: primary, borderColor: primary }}>Enroll</Button>
                                              <Button size="sm" variant="outline" className="rounded-3">View</Button>
                                            </div>
                                          </div>
                                          <div className="mt-2 d-flex flex-wrap gap-2">
                                            {["Topics", "Trainer", "Status"].map((b) => (
                                              <span key={b} className="badge bg-success-subtle text-success border border-success-subtle">{b}</span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {certTab === "specialist" && (
                      <div className="row g-3">
                        {[
                          "Coffee Tourism","Dairy Tourism","Organic Farming","Beekeeping","Aquaculture","Farm-to-Table","Community Tourism","Eco Tourism","Climate Smart Agriculture","Export Ready Farm","Accessible Tourism","Event Hosting"
                        ].map((s, idx) => (
                          <div key={s} className="col-12 col-md-6 col-lg-4">
                            <div className="a2r-card p-3 h-100">
                              <div className="d-flex align-items-start justify-content-between gap-3">
                                <div>
                                  <div className="badge bg-warning-subtle text-warning border border-warning-subtle">Specialist</div>
                                  <div className="fw-extrabold mt-2">{s}</div>
                                  <div className="small a2r-muted mt-2">Duration: {idx % 3 === 0 ? "2 weeks" : "3 weeks"} • Price: ${149 + idx * 12}</div>
                                </div>
                                <div className="rounded-4" style={{ width: 54, height: 54, background: "linear-gradient(135deg, rgba(22,163,74,.18), rgba(234,179,8,.22))" }} />
                              </div>
                              <div className="mt-3 d-flex gap-2">
                                <Button size="sm" className="rounded-3" style={{ background: primary, borderColor: primary, flex: 1 }}>Enroll</Button>
                                <Button size="sm" variant="outline" className="rounded-3" style={{ flex: 1 }}>Learn More</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {certTab === "development" && (
                      <div className="row g-3">
                        {["Leadership","Technology","Business","Agriculture","Artificial Intelligence","Smart Farming","IoT","Drone Technology","Blockchain","Data Analytics"].map((g) => (
                          <div key={g} className="col-12 col-md-6">
                            <div className="a2r-card p-3">
                              <div className="d-flex align-items-center justify-content-between gap-2">
                                <div className="fw-extrabold">{g}</div>
                                <span className="badge bg-success-subtle text-success border border-success-subtle">Professional Development</span>
                              </div>
                              <div className="small a2r-muted mt-2">UI-only expandable group</div>
                              <div className="mt-3 d-flex flex-column gap-2">
                                {["Course A", "Course B", "Course C"].map((c) => (
                                  <div key={c} className="d-flex align-items-center justify-content-between gap-3 a2r-card p-2" style={{ boxShadow: "none" }}>
                                    <div>
                                      <div className="fw-semibold">{c}</div>
                                      <div className="small a2r-muted">2–4 hours • Self-paced</div>
                                    </div>
                                    <Button size="sm" className="rounded-3" style={{ background: primary, borderColor: primary }}>View</Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {certTab === "fees" && (
                      <div>
                        <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-3">
                          <div>
                            <div className="fw-extrabold">Fee Structure</div>
                            <div className="small a2r-muted">Training fees, assessment fees, packages, additional services</div>
                          </div>
                          <div className="d-flex gap-2">
                            <Button variant="outline" className="rounded-3">Registration</Button>
                            <Button variant="outline" className="rounded-3">Learning Materials</Button>
                          </div>
                        </div>

                        <div className="row g-3">
                          {[
                            { plan: "Bronze", price: "$199", features: ["1 training", "Email support", "Basic reporting"] },
                            { plan: "Silver", price: "$399", features: ["2 trainings", "Priority grading", "Progress tracking"] },
                            { plan: "Gold", price: "$699", features: ["3 trainings", "Assessments", "Certificate package"] },
                            { plan: "Platinum", price: "$999", features: ["4 trainings", "Practical assessments", "Verification support"] },
                            { plan: "Master", price: "$1299", features: ["Unlimited modules", "Governance reporting", "Advanced verification"] },
                          ].map((p) => (
                            <div key={p.plan} className="col-12 col-md-6 col-lg-4">
                              <div className="a2r-card p-3 h-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="fw-extrabold">{p.plan}</div>
                                  <span className="badge bg-success-subtle text-success border border-success-subtle">Package</span>
                                </div>
                                <div className="fw-extrabold" style={{ fontSize: 34, color: primary, marginTop: 8 }}>{p.price}</div>
                                <div className="small a2r-muted">per cohort</div>
                                <div className="mt-3 d-flex flex-column gap-2">
                                  {p.features.map((f) => (
                                    <div key={f} className="small d-flex gap-2 align-items-start">
                                      <span style={{ color: primary, fontWeight: 900 }}>✓</span>
                                      <span className="a2r-muted">{f}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 d-flex gap-2">
                                  <Button size="sm" className="rounded-3" style={{ background: primary, borderColor: primary, flex: 1 }}>Enroll</Button>
                                  <Button size="sm" variant="outline" className="rounded-3" style={{ flex: 1 }}>Compare</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="a2r-card p-3 mt-3">
                          <div className="fw-extrabold">Training Fees Table (UI preview)</div>
                          <div className="table-responsive mt-3">
                            <table className="table a2r-table mb-0">
                              <thead>
                                <tr>
                                  <th>Module</th>
                                  <th>Duration</th>
                                  <th>Cost</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <tr key={i}>
                                    <td className="fw-semibold">Module {i}</td>
                                    <td className="text-muted">{i % 2 === 0 ? "2 weeks" : "3 weeks"}</td>
                                    <td className="fw-extrabold" style={{ color: primary }}>${199 + i * 87}</td>
                                    <td>
                                      <Button size="sm" className="rounded-3" style={{ background: primary, borderColor: primary }}>View</Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
                            <div className="small a2r-muted">Pagination UI</div>
                            <div className="d-flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-3">Prev</Button>
                              <Button size="sm" variant="outline" className="rounded-3">1</Button>
                              <Button size="sm" variant="outline" className="rounded-3">2</Button>
                              <Button size="sm" variant="outline" className="rounded-3">Next</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection !== "dashboard" && activeSection !== "certification" && (
                <div className="a2r-card p-3 p-md-4">
                  <div className="fw-extrabold">{pageTitle(activeSection)}</div>
                  <div className="small a2r-muted mt-2">This UI shell is ready; module-by-module pages can be generated next.</div>
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {["Responsive table", "Search", "Filters", "Export Excel", "Export PDF", "Pagination", "Empty state", "Confirm dialog"].map((b) => (
                      <span key={b} className="badge bg-success-subtle text-success border border-success-subtle">{b}</span>
                    ))}
                  </div>
                </div>
              )}

              <div id="a2r-action-toast" data-show="false" style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 18, zIndex: 90, background: "rgba(22,163,74,.92)", color: "#fff", padding: "10px 14px", borderRadius: 999, opacity: 0, pointerEvents: "none", transition: "opacity 200ms ease" }} />
              <style>{`#a2r-action-toast[data-show="true"]{opacity:1;}`}</style>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString();
}
function formatMoney(n: number) {
  if (!Number.isFinite(n)) return "$0";
  return "$" + n.toLocaleString();
}

function pageTitle(section: any) {
  switch (section) {
    case "dashboard": return "Dashboard";
    case "certification": return "Certification Program";
    case "students": return "Students";
    case "trainers": return "Trainers";
    case "schedule": return "Training Schedule";
    case "assessments": return "Assessments";
    case "certificates": return "Certificates";
    case "payments": return "Payments";
    case "resources": return "Learning Resources";
    case "reports": return "Reports";
    case "administration": return "Administration";
    case "settings": return "Settings";
    default: return "Verified Host";
  }
}

function sectionLabel(section: any) {
  return pageTitle(section);
}

function useMemoLikeGlobalSearch(q: string) {
  return [
    "Students: Hassan K.",
    "Courses: Food Safety Practicals",
    "Modules: Emergency Preparedness",
    "Certificates: Gold Verified Host",
    "Payments: Pending Course Fees",
    "Trainers: Aiman Rahman",
  ].filter((x) => (q || "").trim().length >= 2 ? x.toLowerCase().includes(q.toLowerCase().trim()) : false);
}

