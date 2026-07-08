import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard, Users, FileText, Receipt, Sparkles, TrendingUp, Heart, Zap,
  ArrowRight, Download, Printer, Settings, LogOut, Menu, X, BadgeCheck, BookOpen,
  Calendar, CheckCircle2, BarChart3, Shield, MessageCircle, Award
} from "lucide-react";

export default function VerifiedHostPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    | "dashboard"
    | "students"
    | "schedule"
    | "assessments"
    | "certificates"
    | "payments"
    | "resources"
    | "reports"
    | "administration"
    | "settings"
  >("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState([
    { id: 1, name: "Fatima S.", course: "Hospitality Foundation", status: "Active", email: "fatima@agri2rist.com" },
    { id: 2, name: "Hassan K.", course: "Agricultural Experience", status: "Enrolled", email: "hassan@agri2rist.com" },
    { id: 3, name: "Siti Nur", course: "Food Safety Practicals", status: "Pending", email: "siti@agri2rist.com" },
  ]);
  const [sessions, setSessions] = useState([
    { id: 1, time: "09:00", title: "Hospitality Foundation", venue: "Training Hall A" },
    { id: 2, time: "11:30", title: "Agricultural Experience", venue: "Lab Room 2" },
    { id: 3, time: "14:00", title: "Food Safety Practicals", venue: "Kitchen Lab" },
  ]);

  const [crudPanelOpen, setCrudPanelOpen] = useState(false);
  const [crudType, setCrudType] = useState<"student" | "session">("student");
  const [crudMode, setCrudMode] = useState<"add" | "edit">("add");
  const [studentForm, setStudentForm] = useState({ id: 0, name: "", course: "", status: "Active", email: "" });
  const [sessionForm, setSessionForm] = useState({ id: 0, time: "", title: "", venue: "" });

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setData({
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
        });
        setLoading(false);
      }
    }, 300);
    return () => {
      mounted = false;
    };
  }, []);

  const sections = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "students", label: "Students", icon: Users },
    { key: "schedule", label: "Training Schedule", icon: Calendar },
    { key: "assessments", label: "Assessments", icon: CheckCircle2 },
    { key: "certificates", label: "Certificates", icon: Award },
    { key: "payments", label: "Payments", icon: Receipt },
    { key: "resources", label: "Learning Resources", icon: BookOpen },
    { key: "reports", label: "Reports", icon: BarChart3 },
    { key: "administration", label: "Administration", icon: Shield },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const handleQuickAction = (action: string) => {
    const routes: Record<string, string> = {
      "Register Student": "/verified-host/register-student",
      "Schedule Training": "/verified-host/schedule-training",
      "Issue Certificate": "/verified-host/issue-certificate",
      "Generate Report": "/verified-host/generate-report",
    };
    navigate(routes[action] || "/verified-host");
  };

  const openCrudModal = (type: "student" | "session", mode: "add" | "edit", item?: any) => {
    setCrudType(type);
    setCrudMode(mode);
    if (type === "student") {
      setStudentForm(item ? { ...item } : { id: Date.now(), name: "", course: "", status: "Active", email: "" });
    } else {
      setSessionForm(item ? { ...item } : { id: Date.now(), time: "", title: "", venue: "" });
    }
    setCrudPanelOpen(true);
  };

  const closeCrudModal = () => setCrudPanelOpen(false);

  const handleCrudSave = () => {
    if (crudType === "student") {
      if (crudMode === "edit") {
        setStudents((prev) => prev.map((student) => (student.id === studentForm.id ? studentForm : student)));
      } else {
        setStudents((prev) => [studentForm, ...prev]);
      }
    } else {
      if (crudMode === "edit") {
        setSessions((prev) => prev.map((session) => (session.id === sessionForm.id ? sessionForm : session)));
      } else {
        setSessions((prev) => [sessionForm, ...prev]);
      }
    }
    closeCrudModal();
  };

  const handleCrudDelete = (type: "student" | "session", id: number) => {
    if (type === "student") {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } else {
      setSessions((prev) => prev.filter((session) => session.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: slideIn 0.5s ease-out; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(22, 163, 74, 0.15); }
        .overlap-badge { position: relative; margin-bottom: -20px; z-index: 10; }
        .stat-card-1 { animation: slideIn 0.5s ease-out 0.1s backwards; }
        .stat-card-2 { animation: slideIn 0.5s ease-out 0.2s backwards; }
        .stat-card-3 { animation: slideIn 0.5s ease-out 0.3s backwards; }
        .stat-card-4 { animation: slideIn 0.5s ease-out 0.4s backwards; }
      `}</style>

      {/* Sidebar + Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-72" : "w-0"} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                A2R
              </div>
              <div>
                <h3 className="font-extrabold text-lg">Host Console</h3>
                <p className="text-xs text-gray-500">Verified Dashboard</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <BadgeCheck size={16} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">Verified</span>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveSection(s.key as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeSection === s.key
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <Link to="/get-listed">
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl h-11 font-bold">
                Become a Host
              </Button>
            </Link>
            <Button variant="outline" className="w-full rounded-xl h-11 font-bold" onClick={() => navigate("/")}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Search students, courses, reports..."
                className="max-w-xs rounded-xl bg-gray-50 border-gray-200"
              />
              <Button size="sm" className="rounded-xl" variant="outline">
                <Download size={18} />
              </Button>
              <Button size="sm" className="rounded-xl" variant="outline">
                <Printer size={18} />
              </Button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Dashboard / Verified Host / {sections.find(s => s.key === activeSection)?.label}</p>
              <h1 className="text-4xl font-extrabold text-gray-900">{sections.find(s => s.key === activeSection)?.label}</h1>
            </div>

            {/* Dashboard Section */}
            {activeSection === "dashboard" && (
              <div className="space-y-8">
                {/* Hero Stats with Overlapping Cards */}
                <div className="relative mb-12">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 h-80 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-700 rounded-3xl -z-10 blur-sm opacity-20" />

                  {/* Overlapping Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mb-8">
                    {[
                      { label: "Total Students", value: "842", icon: Users, color: "emerald" },
                      { label: "Active Courses", value: "24", icon: BookOpen, color: "blue" },
                      { label: "Certificates", value: "214", icon: Award, color: "purple" },
                      { label: "Revenue", value: "$1.28M", icon: TrendingUp, color: "orange" },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      const colors: Record<string, any> = {
                        emerald: "from-emerald-50 to-emerald-100 border-emerald-200 shadow-emerald-100",
                        blue: "from-blue-50 to-blue-100 border-blue-200 shadow-blue-100",
                        purple: "from-purple-50 to-purple-100 border-purple-200 shadow-purple-100",
                        orange: "from-orange-50 to-orange-100 border-orange-200 shadow-orange-100",
                      };
                      return (
                        <div
                          key={idx}
                          className={`stat-card-${idx + 1} bg-gradient-to-br ${colors[item.color]} border rounded-2xl p-6 card-hover relative`}
                        >
                          <div className="absolute top-4 right-4 p-3 bg-white rounded-xl shadow-lg">
                            <Icon size={24} className={`text-${item.color}-600`} />
                          </div>
                          <p className="text-gray-600 text-sm font-semibold mb-2">{item.label}</p>
                          <h3 className="text-4xl font-extrabold text-gray-900">{item.value}</h3>
                          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Live
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feature Badges Below */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
                    {[
                      { icon: Zap, title: "Instant Setup", desc: "Start hosting in minutes" },
                      { icon: TrendingUp, title: "Growth Tools", desc: "Analytics & insights" },
                      { icon: Heart, title: "Guest Management", desc: "Quality experiences" },
                      { icon: MessageCircle, title: "24/7 Support", desc: "Expert assistance" },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-2xl p-6 card-hover group"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all mb-4">
                            <Icon size={24} className="text-emerald-600" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Today's Schedule + Quick Actions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Schedule */}
                  <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-extrabold text-gray-900">Today's Schedule</h2>
                          <p className="text-sm text-gray-500 mt-1">Upcoming training sessions</p>
                        </div>
                        <Calendar className="text-emerald-600" size={28} />
                      </div>

                      <div className="space-y-4">
                        {(data?.today_schedule ?? []).map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                              {item.time}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900">{item.title}</p>
                              <p className="text-sm text-gray-500">{item.venue}</p>
                            </div>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg">View</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="text-emerald-600" size={24} />
                      <h2 className="text-2xl font-extrabold text-gray-900">Quick Actions</h2>
                    </div>

                    <div className="space-y-3">
                      {["Register Student", "Schedule Training", "Issue Certificate", "Generate Report"].map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all group"
                        >
                          <span>{action}</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>

                    {/* Revenue Widget */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Revenue</p>
                      <h3 className="text-3xl font-extrabold text-emerald-600">{loading ? "—" : "$1.28M"}</h3>
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-600">Pending</p>
                          <p className="font-bold text-orange-600">38</p>
                        </div>
                        <div className="flex-1 bg-emerald-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-600">Upcoming</p>
                          <p className="font-bold text-emerald-600">12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CRUD Operations */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">Operations Center</h2>
                      <p className="text-sm text-gray-500 mt-1">Add, edit, update, and delete students and training sessions directly from here.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => openCrudModal("student", "add")} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                        Add Student
                      </Button>
                      <Button onClick={() => openCrudModal("session", "add")} variant="outline" className="rounded-xl">
                        Add Session
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-gray-200 p-5 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Students</h3>
                        <span className="text-sm text-gray-500">{students.length} records</span>
                      </div>
                      <div className="space-y-3">
                        {students.map((student) => (
                          <div key={student.id} className="flex items-center justify-between rounded-xl bg-white border border-gray-200 p-4">
                            <div>
                              <p className="font-semibold text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.course}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg" onClick={() => openCrudModal("student", "edit", student)}>
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleCrudDelete("student", student.id)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 p-5 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Training Sessions</h3>
                        <span className="text-sm text-gray-500">{sessions.length} records</span>
                      </div>
                      <div className="space-y-3">
                        {sessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between rounded-xl bg-white border border-gray-200 p-4">
                            <div>
                              <p className="font-semibold text-gray-900">{session.title}</p>
                              <p className="text-sm text-gray-500">{session.time} • {session.venue}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg" onClick={() => openCrudModal("session", "edit", session)}>
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleCrudDelete("session", session.id)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Recent Activities</h2>

                  <div className="space-y-4">
                    {(data?.recent_activity ?? []).map((activity: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          ✓
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{activity.who} <span className="font-normal text-gray-600">{activity.action}</span></p>
                          <p className="text-sm text-gray-500 mt-1">{activity.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {crudPanelOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900">
                        {crudMode === "add" ? `Add ${crudType === "student" ? "Student" : "Session"}` : `Edit ${crudType === "student" ? "Student" : "Session"}`}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Changes update instantly on the dashboard.</p>
                    </div>
                    <button onClick={closeCrudModal} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">✕</button>
                  </div>

                  {crudType === "student" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Full Name</label>
                        <Input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} className="rounded-xl" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                        <Input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} className="rounded-xl" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Course</label>
                        <Input value={studentForm.course} onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })} className="rounded-xl" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Status</label>
                        <select value={studentForm.status} onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                          <option value="Active">Active</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Time</label>
                        <Input value={sessionForm.time} onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })} className="rounded-xl" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Title</label>
                        <Input value={sessionForm.title} onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })} className="rounded-xl" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Venue</label>
                        <Input value={sessionForm.venue} onChange={(e) => setSessionForm({ ...sessionForm, venue: e.target.value })} className="rounded-xl" />
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-end gap-3">
                    <Button variant="outline" className="rounded-xl" onClick={closeCrudModal}>Cancel</Button>
                    <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700" onClick={handleCrudSave}>
                      {crudMode === "edit" ? "Update" : "Add"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other sections */}
            {activeSection !== "dashboard" && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {sections.find(s => s.key === activeSection)?.icon && 
                    (() => {
                      const Icon = sections.find(s => s.key === activeSection)!.icon;
                      return <Icon size={32} className="text-gray-400" />;
                    })()
                  }
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{sections.find(s => s.key === activeSection)?.label}</h2>
                <p className="text-gray-600 mb-6">This section is ready for implementation. Click below to view the dedicated page.</p>
                <Button 
                  onClick={() => navigate(`/verified-host/${activeSection}`)}
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                >
                  Go to {sections.find(s => s.key === activeSection)?.label}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
