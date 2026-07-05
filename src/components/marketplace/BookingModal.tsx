import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBooking } from "@/hooks/use-booking";
import { useAuth } from "@/hooks/use-auth";
import type { BookingItem } from "@/types/marketplace";

export default function BookingModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: BookingItem | null }) {
  const { createBooking } = useBooking();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    guests: 1,
    notes: "",
    payment: "pay_now",
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, name: user.name || "", email: user.email || "" }));
    }
  }, [user, open]);

  useEffect(() => {
    if (item) {
      // reset times when a new item is selected
      setForm((f) => ({ ...f, guests: 1, notes: "", date: new Date().toISOString().split("T")[0], time: "09:00" }));
    }
  }, [item]);

  if (!item) return null;

  const subtotal = item.price * (form.guests || 1);
  const serviceFee = Math.round(subtotal * 0.025);
  const total = subtotal + serviceFee;

  const update = (k: string, v: any) => setForm((cur) => ({ ...cur, [k]: v }));

  const confirm = () => {
    createBooking(item, form as any, form.payment);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full max-w-2xl p-6 bg-card border border-border rounded-xl">
          <h3 className="text-xl font-bold mb-3">Book: {item.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" type="number" min={1} value={String(form.guests)} onChange={(e) => update("guests", Number(e.target.value) || 1)} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="payment">Payment</Label>
              <Select value={form.payment} onValueChange={(v) => update("payment", v)}>
                <SelectTrigger id="payment"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pay_now">Pay Now</SelectItem>
                  <SelectItem value="pay_later">Pay Later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1 md:col-start-2 flex flex-col gap-2">
              <div className="rounded-lg bg-muted p-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{item.currency} {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between mt-1"><span className="text-muted-foreground">Service fee</span><span className="font-semibold">{item.currency} {serviceFee.toLocaleString()}</span></div>
                <div className="flex justify-between mt-2 border-t border-border pt-2"><span className="text-muted-foreground">Total</span><span className="font-extrabold text-primary">{item.currency} {total.toLocaleString()}</span></div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                <Button onClick={confirm} className="flex-1 bg-primary text-primary-foreground">Confirm</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
