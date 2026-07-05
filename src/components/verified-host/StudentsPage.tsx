import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STUDENTS = [
  { name: "Amina Njeri", program: "Certified Agri2rist Host", status: "Active", progress: 78, enrolled: "2026-01-12" },
  { name: "David Kato", program: "Silver Verified Host", status: "Pending", progress: 42, enrolled: "2026-02-08" },
  { name: "Sarah Ade", program: "Gold Verified Host", status: "Active", progress: 92, enrolled: "2025-12-04" },
  { name: "Jacob Okoth", program: "Certified Agri2rist Host", status: "Completed", progress: 100, enrolled: "2025-10-21" },
  { name: "Marta Isabirye", program: "Platinum Verified Host", status: "Active", progress: 63, enrolled: "2026-03-19" },
];

const statusColor: Record<string, string> = {
  Active: "bg-secondary text-secondary-foreground",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-primary text-primary-foreground",
};

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => STUDENTS.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase()) || student.program.toLowerCase().includes(query.toLowerCase())
  ), [query]);

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
            <Button variant="secondary">Add Student</Button>
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
                <tr key={student.name} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-foreground">{student.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{student.program}</td>
                  <td className="px-5 py-4 text-muted-foreground">{student.progress}%</td>
                  <td className="px-5 py-4"><Badge className={statusColor[student.status] || "bg-muted text-foreground"}>{student.status}</Badge></td>
                  <td className="px-5 py-4 text-muted-foreground">{student.enrolled}</td>
                  <td className="px-5 py-4">
                    <Button variant="outline" size="sm">View</Button>
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
    </div>
  );
}
