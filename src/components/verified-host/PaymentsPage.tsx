import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Payment = {
  id: number;
  student: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  method: string;
};

const INITIAL_PAYMENTS: Payment[] = [
  { id: 1, student: "Amina Njeri", amount: "UGX 450,000", status: "Paid", date: "2026-01-12", method: "Mobile Money" },
  { id: 2, student: "David Kato", amount: "UGX 750,000", status: "Pending", date: "2026-02-08", method: "Bank Transfer" },
  { id: 3, student: "Sarah Ade", amount: "UGX 1,200,000", status: "Overdue", date: "2025-12-04", method: "Card" },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [query, setQuery] = useState("");
  const [modalState, setModalState] = useState<"closed" | "view" | "edit" | "add">("closed");
  const [activePayment, setActivePayment] = useState<Payment | null>(null);
  const [form, setForm] = useState<Payment>({ id: Date.now(), student: "", amount: "", status: "Pending", date: "", method: "" });

  const filtered = useMemo(() => payments.filter((payment) => [payment.student, payment.amount, payment.status, payment.method].join(" ").toLowerCase().includes(query.toLowerCase())), [payments, query]);

  const openAdd = () => {
    setForm({ id: Date.now(), student: "", amount: "", status: "Pending", date: "", method: "" });
    setActivePayment(null);
    setModalState("add");
  };

  const openView = (payment: Payment) => {
    setActivePayment(payment);
    setForm(payment);
    setModalState("view");
  };

  const openEdit = (payment: Payment) => {
    setActivePayment(payment);
    setForm(payment);
    setModalState("edit");
  };

  const closeModal = () => {
    setModalState("closed");
    setActivePayment(null);
  };

  const savePayment = () => {
    if (!form.student || !form.amount || !form.date) return;
    if (modalState === "edit" && activePayment) {
      setPayments((prev) => prev.map((item) => (item.id === activePayment.id ? { ...item, ...form } : item)));
    } else {
      setPayments((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    closeModal();
  };

  const deletePayment = (id: number) => {
    setPayments((prev) => prev.filter((item) => item.id !== id));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Payments</h2>
            <p className="text-sm text-muted-foreground">Track payments, pending invoices and payment methods for verified learners.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Search payments" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button onClick={openAdd}>Add Payment</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => (
                <tr key={payment.id} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-foreground">{payment.student}</td>
                  <td className="px-5 py-4">{payment.amount}</td>
                  <td className="px-5 py-4">{payment.status}</td>
                  <td className="px-5 py-4">{payment.date}</td>
                  <td className="px-5 py-4">{payment.method}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => openView(payment)}>View</Button>
                      <Button variant="outline" size="sm" onClick={() => openEdit(payment)}>Edit</Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deletePayment(payment.id)}>Delete</Button>
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
                <h3 className="text-xl font-bold text-foreground">{modalState === "add" ? "Add Payment" : modalState === "edit" ? "Edit Payment" : "Payment Details"}</h3>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-muted-foreground hover:bg-muted">✕</button>
            </div>

            {modalState === "view" && activePayment ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Student</p>
                  <p className="font-semibold text-foreground">{activePayment.student}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold text-foreground">{activePayment.amount}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">{activePayment.status}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="font-semibold text-foreground">{activePayment.method}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Student</label>
                  <Input value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Amount</label>
                  <Input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Payment["status"] })} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground dark:bg-slate-900">
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Method</label>
                    <Input value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} />
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
              {modalState !== "view" && <Button onClick={savePayment}>{modalState === "edit" ? "Update" : "Add Payment"}</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
