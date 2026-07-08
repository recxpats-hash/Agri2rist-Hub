import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Student = {
  id: number;
  name: string;
  program: string;
  status: "Active" | "Pending" | "Completed";
  progress: number;
  enrolled: string;
};

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: "Amina Njeri", program: "Certified Agri2rist Host", status: "Active", progress: 78, enrolled: "2026-01-12" },
  { id: 2, name: "David Kato", program: "Silver Verified Host", status: "Pending", progress: 42, enrolled: "2026-02-08" },
  { id: 3, name: "Sarah Ade", program: "Gold Verified Host", status: "Active", progress: 92, enrolled: "2025-12-04" },
  { id: 4, name: "Jacob Okoth", program: "Certified Agri2rist Host", status: "Completed", progress: 100, enrolled: "2025-10-21" },
  { id: 5, name: "Marta Isabirye", program: "Platinum Verified Host", status: "Active", progress: 63, enrolled: "2026-03-19" },
];

const statusColor: Record<string, string> = {
  Active: "bg-secondary text-secondary-foreground",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-primary text-primary-foreground",
};

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [modalState, setModalState] = useState<"closed" | "view" | "edit" | "add">("closed");
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<Student>({
    id: Date.now(),
    name: "",
    program: "",
    status: "Active",
    progress: 0,
    enrolled: new Date().toISOString().slice(0, 10),
  });

  const filtered = useMemo(() => students.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase()) || student.program.toLowerCase().includes(query.toLowerCase())
  ), [query, students]);

  const openAddModal = () => {
    setForm({
      id: Date.now(),
      name: "",
      program: "",
      status: "Active",
      progress: 0,
      enrolled: new Date().toISOString().slice(0, 10),
    });
    setActiveStudent(null);
    setModalState("add");
  };

  const openViewModal = (student: Student) => {
    setActiveStudent(student);
    setForm(student);
    setModalState("view");
  };

  const openEditModal = (student: Student) => {
    setActiveStudent(student);
    setForm(student);
    setModalState("edit");
  };

  const closeModal = () => {
    setModalState("closed");
    setActiveStudent(null);
  };

  const saveStudent = () => {
    if (!form.name || !form.program) return;

    if (modalState === "edit" && activeStudent) {
      setStudents((prev) => prev.map((item) => (item.id === activeStudent.id ? { ...item, ...form } : item)));
    } else {
      setStudents((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }

    closeModal();
  };

  const deleteStudent = (studentId: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Student Registry</h2>
            <p className="text-sm text-muted-foreground">Track host certification trainees, progress and enrollment status.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Search students or programs" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button variant="secondary" onClick={openAddModal}>Add Student</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Program</th>
                <th className="px-5 py-3">Progress</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Enrolled</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-foreground">{student.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{student.program}</td>
                  <td className="px-5 py-4 text-muted-foreground">{student.progress}%</td>
                  <td className="px-5 py-4"><Badge className={statusColor[student.status] || "bg-muted text-foreground"}>{student.status}</Badge></td>
                  <td className="px-5 py-4 text-muted-foreground">{student.enrolled}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => openViewModal(student)}>View</Button>
                      <Button variant="outline" size="sm" onClick={() => openEditModal(student)}>Edit</Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteStudent(student.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">No students match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalState !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-white p-6 shadow-2xl dark:bg-slate-950">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {modalState === "add" ? "Add Student" : modalState === "edit" ? "Edit Student" : "Student Details"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {modalState === "view" ? "Review and manage this student record." : "Fill in the details below to save the record."}
                </p>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-muted-foreground hover:bg-muted">✕</button>
            </div>

            {modalState === "view" && activeStudent ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{activeStudent.name}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-semibold text-foreground">{activeStudent.program}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">{activeStudent.status}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="font-semibold text-foreground">{activeStudent.progress}%</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                  <p className="font-semibold text-foreground">{activeStudent.enrolled}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button onClick={() => openEditModal(activeStudent)}>Edit</Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteStudent(activeStudent.id)}>Delete</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Full name</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter student name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Program</label>
                  <Input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} placeholder="Certified Agri2rist Host" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Student["status"] })} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground dark:bg-slate-900">
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Progress %</label>
                    <Input type="number" min="0" max="100" value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Enrolled date</label>
                  <Input type="date" value={form.enrolled} onChange={(e) => setForm({ ...form, enrolled: e.target.value })} />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              {modalState !== "view" && (
                <Button onClick={saveStudent}>{modalState === "edit" ? "Update" : "Add Student"}</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
