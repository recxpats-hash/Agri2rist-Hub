import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft, CreditCard, Smartphone, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/hooks/use-booking";
import { useAuth } from "@/hooks/use-auth";
import type { BookingItem } from "@/types/marketplace";

type Step = "details" | "extras" | "payment" | "done";

export default function BookingModal({
  open, onClose, item,
}: {
  open: boolean;
  onClose: () => void;
  item: BookingItem | null;
}) {
  const { createBooking } = useBooking();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>("details");
  const [payMethod, setPayMethod] = useState<"mobile" | "card">("mobile");
  const [savedRef, setSavedRef] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00", guests: 1,
    nights: 1, tickets: 1,
    pickupLocation: "", dropoffLocation: "",
    trainingTopic: "", serviceType: "",
    notes: "",
    payment: "mobile_money",
    mobileNumber: "", cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  });

  const up = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  // Pre-fill from logged-in user
  useEffect(() => {
    if (user && open) setForm(f => ({ ...f, name: user.name || "", email: user.email || "" }));
  }, [user, open]);

  // Reset on new item
  useEffect(() => {
    if (item) setStep("details");
  }, [item]);

  if (!item) return null;

  const qty = item.unit === "night" ? form.nights
    : item.unit === "ticket" ? form.tickets
    : form.guests;

  const subtotal = item.price * (qty || 1);
  const fee = Math.round(subtotal * 0.025);
  const total = subtotal + fee;

  const handleConfirm = () => {
    const booking = createBooking(item, {
      name: form.name, email: form.email, phone: form.phone,
      date: form.date, time: form.time,
      guests: form.guests, nights: form.nights, tickets: form.tickets,
      pickupLocation: form.pickupLocation, dropoffLocation: form.dropoffLocation,
      trainingTopic: form.trainingTopic, serviceType: form.serviceType,
      notes: form.notes,
    }, form.payment);
    setSavedRef(booking.bookingRef);
    setStep("done");
  };

  const handleClose = () => {
    setStep("details");
    setSavedRef("");
    onClose();
  };

  const cat = item.bookingCategory;

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-lg rounded-2xl p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="bg-primary px-5 py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-primary-foreground/60 font-semibold uppercase tracking-widest">
              {step === "done" ? "Booking Confirmed" : "Book Now"}
            </p>
            <h3 className="text-primary-foreground font-extrabold text-lg leading-tight truncate">{item.name}</h3>
            {item.farmName && (
              <p className="text-primary-foreground/70 text-xs mt-0.5">{item.farmName}</p>
            )}
          </div>
          <button onClick={handleClose} className="text-primary-foreground/60 hover:text-primary-foreground flex-shrink-0 mt-0.5">
            <X size={20} />
          </button>
        </div>

        {/* Step indicator (not shown on done) */}
        {step !== "done" && (
          <div className="flex border-b border-border bg-muted/30">
            {(["details", "extras", "payment"] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`flex-1 py-2 text-center text-xs font-semibold transition ${
                  step === s ? "text-primary border-b-2 border-primary bg-background" : "text-muted-foreground"
                }`}
              >
                {i + 1}. {s === "details" ? "Your Info" : s === "extras" ? "Details" : "Payment"}
              </div>
            ))}
          </div>
        )}

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* ── Step 1: Contact details ── */}
          {step === "details" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="bm-name" className="text-xs font-semibold mb-1 block">Full Name <span className="text-rose-500">*</span></Label>
                  <Input id="bm-name" value={form.name} onChange={e => up("name", e.target.value)} placeholder="Your full name" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="bm-phone" className="text-xs font-semibold mb-1 block">Phone <span className="text-rose-500">*</span></Label>
                  <Input id="bm-phone" value={form.phone} onChange={e => up("phone", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-10 rounded-xl" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="bm-email" className="text-xs font-semibold mb-1 block">Email <span className="text-rose-500">*</span></Label>
                  <Input id="bm-email" type="email" value={form.email} onChange={e => up("email", e.target.value)} placeholder="you@example.com" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="bm-date" className="text-xs font-semibold mb-1 block">Date <span className="text-rose-500">*</span></Label>
                  <Input id="bm-date" type="date" value={form.date} onChange={e => up("date", e.target.value)} className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="bm-time" className="text-xs font-semibold mb-1 block">Preferred Time</Label>
                  <Input id="bm-time" type="time" value={form.time} onChange={e => up("time", e.target.value)} className="h-10 rounded-xl" />
                </div>
              </div>
              <Button
                className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-bold"
                disabled={!form.name || !form.phone || !form.email || !form.date}
                onClick={() => setStep("extras")}
              >
                Continue →
              </Button>
            </>
          )}

          {/* ── Step 2: Category-specific extras ── */}
          {step === "extras" && (
            <>
              <div className="space-y-3">
                {/* Guests — most categories */}
                {(cat === "agritourism" || cat === "restaurant" || cat === "education" || cat === "agriculture_services") && (
                  <div>
                    <Label htmlFor="bm-guests" className="text-xs font-semibold mb-1 block">Number of Guests</Label>
                    <Input id="bm-guests" type="number" min={1} max={50} value={String(form.guests)} onChange={e => up("guests", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
                  </div>
                )}

                {/* Nights — farm stay */}
                {cat === "farm_stay" && (
                  <div>
                    <Label htmlFor="bm-nights" className="text-xs font-semibold mb-1 block">Number of Nights</Label>
                    <Input id="bm-nights" type="number" min={1} max={30} value={String(form.nights)} onChange={e => up("nights", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
                  </div>
                )}

                {/* Tickets — events */}
                {cat === "events_festivals" && (
                  <div>
                    <Label htmlFor="bm-tickets" className="text-xs font-semibold mb-1 block">Number of Tickets</Label>
                    <Input id="bm-tickets" type="number" min={1} max={100} value={String(form.tickets)} onChange={e => up("tickets", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
                  </div>
                )}

                {/* Transport fields */}
                {cat === "transportation" && (
                  <>
                    <div>
                      <Label htmlFor="bm-pickup" className="text-xs font-semibold mb-1 block">Pickup Location</Label>
                      <Input id="bm-pickup" value={form.pickupLocation} onChange={e => up("pickupLocation", e.target.value)} placeholder="e.g. Entebbe Airport" className="h-10 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="bm-dropoff" className="text-xs font-semibold mb-1 block">Drop-off Location</Label>
                      <Input id="bm-dropoff" value={form.dropoffLocation} onChange={e => up("dropoffLocation", e.target.value)} placeholder="e.g. Jinja Farm Stay" className="h-10 rounded-xl" />
                    </div>
                  </>
                )}

                {/* Education */}
                {cat === "education" && (
                  <div>
                    <Label htmlFor="bm-topic" className="text-xs font-semibold mb-1 block">Training Topic / Course</Label>
                    <Input id="bm-topic" value={form.trainingTopic} onChange={e => up("trainingTopic", e.target.value)} placeholder="e.g. Soil Health & IPM" className="h-10 rounded-xl" />
                  </div>
                )}

                {/* Agriculture services */}
                {cat === "agriculture_services" && (
                  <div>
                    <Label htmlFor="bm-stype" className="text-xs font-semibold mb-1 block">Service Type</Label>
                    <Select value={form.serviceType} onValueChange={v => up("serviceType", v)}>
                      <SelectTrigger id="bm-stype" className="h-10 rounded-xl"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soil_testing">Soil Testing & Analysis</SelectItem>
                        <SelectItem value="advisory">Farm Advisory</SelectItem>
                        <SelectItem value="pest_scouting">Pest Scouting</SelectItem>
                        <SelectItem value="irrigation">Irrigation Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Notes for all */}
                <div>
                  <Label htmlFor="bm-notes" className="text-xs font-semibold mb-1 block">Special Requests / Notes</Label>
                  <Textarea id="bm-notes" rows={3} value={form.notes} onChange={e => up("notes", e.target.value)} placeholder="Any dietary needs, accessibility requirements, or special requests…" className="rounded-xl resize-none" />
                </div>
              </div>

              {/* Price summary */}
              <div className="rounded-xl bg-muted/50 border border-border p-3 text-sm space-y-1.5">
                <div className="flex justify-between text-muted-foreground"><span>Unit price</span><span className="font-semibold text-foreground">{item.currency} {item.price.toLocaleString()} / {item.unit}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Quantity</span><span className="font-semibold text-foreground">{qty}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="font-semibold text-foreground">{item.currency} {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Service fee (2.5%)</span><span className="font-semibold text-foreground">{item.currency} {fee.toLocaleString()}</span></div>
                <Separator />
                <div className="flex justify-between font-extrabold text-base"><span>Total</span><span className="text-primary">{item.currency} {total.toLocaleString()}</span></div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("details")}><ChevronLeft size={15} className="mr-1" /> Back</Button>
                <Button className="flex-1 bg-primary text-primary-foreground rounded-xl font-bold" onClick={() => setStep("payment")}>Continue →</Button>
              </div>
            </>
          )}

          {/* ── Step 3: Payment ── */}
          {step === "payment" && (
            <>
              <p className="text-sm text-muted-foreground">Choose how you'd like to pay <strong className="text-foreground">{item.currency} {total.toLocaleString()}</strong>.</p>

              {/* Method selector */}
              <div className="grid grid-cols-2 gap-3">
                {([["mobile", "Mobile Money", Smartphone], ["card", "Card", CreditCard]] as const).map(([val, label, Icon]) => (
                  <button
                    key={val}
                    onClick={() => { setPayMethod(val); up("payment", val === "mobile" ? "mobile_money" : "card"); }}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-sm font-semibold transition ${payMethod === val ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                  >
                    <Icon size={20} /> {label}
                  </button>
                ))}
              </div>

              {payMethod === "mobile" && (
                <div>
                  <Label htmlFor="bm-mobile" className="text-xs font-semibold mb-1 block">MTN / Airtel Money Number <span className="text-rose-500">*</span></Label>
                  <Input id="bm-mobile" value={form.mobileNumber} onChange={e => up("mobileNumber", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-10 rounded-xl" />
                  <p className="text-xs text-muted-foreground mt-1.5">You will receive a payment prompt on your phone. Approve to confirm.</p>
                </div>
              )}

              {payMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="bm-card" className="text-xs font-semibold mb-1 block">Card Number <span className="text-rose-500">*</span></Label>
                    <Input id="bm-card" value={form.cardNumber} onChange={e => up("cardNumber", e.target.value)} placeholder="1234 5678 9012 3456" className="h-10 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="bm-exp" className="text-xs font-semibold mb-1 block">Expiry <span className="text-rose-500">*</span></Label>
                      <Input id="bm-exp" value={form.cardExpiry} onChange={e => up("cardExpiry", e.target.value)} placeholder="MM / YY" className="h-10 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="bm-cvv" className="text-xs font-semibold mb-1 block">CVV <span className="text-rose-500">*</span></Label>
                      <Input id="bm-cvv" value={form.cardCvv} onChange={e => up("cardCvv", e.target.value)} placeholder="123" className="h-10 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bm-cname" className="text-xs font-semibold mb-1 block">Cardholder Name <span className="text-rose-500">*</span></Label>
                    <Input id="bm-cname" value={form.cardName} onChange={e => up("cardName", e.target.value)} placeholder="As on card" className="h-10 rounded-xl" />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep("extras")}><ChevronLeft size={15} className="mr-1" /> Back</Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground rounded-xl font-bold h-11"
                  disabled={payMethod === "mobile" ? !form.mobileNumber : !form.cardNumber || !form.cardExpiry || !form.cardCvv || !form.cardName}
                  onClick={handleConfirm}
                >
                  Confirm Booking
                </Button>
              </div>
            </>
          )}

          {/* ── Done ── */}
          {step === "done" && (
            <div className="py-6 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 size={44} className="text-green-600" />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-foreground">Booking Confirmed!</h4>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  Your booking for <strong>{item.name}</strong> has been confirmed. Check your account for details.
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 border border-border p-4 text-left space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span className="font-extrabold text-primary">{savedRef}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{form.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total Paid</span><span className="font-extrabold">{item.currency} {total.toLocaleString()}</span></div>
              </div>
              <p className="text-xs text-muted-foreground">A notification has been added to your account.</p>
              <Button className="w-full bg-primary text-primary-foreground rounded-xl font-bold" onClick={handleClose}>
                Done
              </Button>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
