import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Assessment = {
  id: number;
  student: string;
  title: string;
  score: string;
  status: "Passed" | "Pending" | "Needs Review";
  date: string;
};

const INITIAL_ASSESSMENTS: Assessment[] = [
  { id: 1, student: "Amina Njeri", title: "Hospitality Foundations", score: "78%", status: "Passed", date: "2026-01-12" },
  { id: 2, student: "David Kato", title: "Emergency Preparedness", score: "42%", status: "Pending", date: "2026-02-08" },
  { id: 3, student: "Sarah Ade", title: "Food Safety", score: "92%", status: "Passed", date: "2025-12-04" },
];

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [query, setQuery] = useState("");
  const [modalState, setModalState] = useState<"closed" | "view" | "edit" | "add">("closed");
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [form, setForm] = useState<Assessment>({ id: Date.now(), student: "", title: "", score: "", status: "Pending", date: "" });

  const filtered = useMemo(() => assessments.filter((assessment) => [assessment.student, assessment.title, assessment.score, assessment.status].join(" ").toLowerCase().includes(query.toLowerCase())), [assessments, query]);

  const openAdd = () => {
    setForm({ id: Date.now(), student: "", title: "", score: "", status: "Pending", date: "" });
    setActiveAssessment(null);
    setModalState("add");
  };

  const openView = (assessment: Assessment) => {
    setActiveAssessment(assessment);
    setForm(assessment);
    setModalState("view");
  };

  const openEdit = (assessment: Assessment) => {
    setActiveAssessment(assessment);
    setForm(assessment);
    setModalState("edit");
  };

  const closeModal = () => {
    setModalState("closed");
    setActiveAssessment(null);
  };

  const saveAssessment = () => {
    if (!form.student || !form.title || !form.score) return;
    if (modalState === "edit" && activeAssessment) {
      setAssessments((prev) => prev.map((item) => (item.id === activeAssessment.id ? { ...item, ...form } : item)));
    } else {
      setAssessments((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    closeModal();
  };

  const deleteAssessment = (id: number) => {
    setAssessments((prev) => prev.filter((item) => item.id !== id));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Assessments</h2>
            <p className="text-sm text-muted-foreground">Track learner assessment results, scores and review status.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Search assessments" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button onClick={openAdd}>Add Assessment</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Assessment</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((assessment) => (
                <tr key={assessment.id} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-foreground">{assessment.student}</td>
                  <td className="px-5 py-4">{assessment.title}</td>
                  <td className="px-5 py-4">{assessment.score}</td>
                  <td className="px-5 py-4">{assessment.status}</td>
                  <td className="px-5 py-4">{assessment.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => openView(assessment)}>View</Button>
                      <Button variant="outline" size="sm" onClick={() => openEdit(assessment)}>Edit</Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteAssessment(assessment.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalState !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-white p-6 shadow-2xl dark:bg-slate-950">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">{modalState === "add" ? "Add Assessment" : modalState === "edit" ? "Edit Assessment" : "Assessment Details"}</h3>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-muted-foreground hover:bg-muted">✕</button>
            </div>

            {modalState === "view" && activeAssessment ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="font-semibold text-foreground">{activeAssessment.student}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Assessment</p>
                  <p className="font-semibold text-foreground">{activeAssessment.title}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="font-semibold text-foreground">{activeAssessment.score}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">{activeAssessment.status}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Student</label>
                  <Input value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Assessment Title</label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Score</label>
                    <Input value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Assessment["status"] })} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground dark:bg-slate-900">
                      <option value="Passed">Passed</option>
                      <option value="Pending">Pending</option>
                      <option value="Needs Review">Needs Review</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Date</label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              {modalState !== "view" && <Button onClick={saveAssessment}>{modalState === "edit" ? "Update" : "Add Assessment"}</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
