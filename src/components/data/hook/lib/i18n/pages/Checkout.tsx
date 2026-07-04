/**
 * Agri2rist Hub – Checkout Page
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, CheckCircle2, ArrowLeft, Truck, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PageLayout } from "@/components/layout/PageLayout";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { createOrder, PAYMENT_METHODS } from "@/lib/order-service";
import { validateCheckoutForm, type CheckoutData, type CheckoutErrors } from "@/lib/validation";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, serviceFee, total, count } = useCart();

  const [form, setForm] = useState<CheckoutData>({
    buyerName: user?.name ?? "",
    buyerEmail: user?.email ?? "",
    buyerPhone: "",
    deliveryAddress: "",
    paymentMethod: "",
    notes: "",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [submitError, setSubmitError] = useState("");

  const set = (field: keyof CheckoutData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validateCheckoutForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (items.length === 0) { setSubmitError("Your cart is empty."); return; }

    setSubmitting(true);
    // Simulate async processing (e.g. payment gateway call)
    await new Promise((r) => setTimeout(r, 800));

    const result = createOrder({
      ...form,
      buyerId: user?.id ?? "guest",
      cartItems: items,
    });

    setSubmitting(false);
    if (!result.ok) { setSubmitError(result.error ?? "Order failed."); return; }
    setOrderRef(result.order!.orderRef);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 max-w-lg text-center">
          <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-extrabold text-foreground mb-3">Order Placed!</h1>
          <p className="text-muted-foreground mb-2">
            Your order <span className="font-mono font-bold text-primary">{orderRef}</span> has been received.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            A confirmation will be sent to <strong>{form.buyerEmail}</strong>. Our team will contact you within 24 hours.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/marketplace"><Button className="bg-primary text-primary-foreground">Continue Shopping</Button></Link>
            <Link to="/account"><Button variant="outline">My Orders</Button></Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (count === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 max-w-lg text-center">
          <ShoppingCart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h2>
          <Link to="/marketplace"><Button className="bg-primary text-primary-foreground">Browse Marketplace</Button></Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/marketplace" className="flex items-center gap-1 hover:text-primary">
            <ArrowLeft size={14} /> Marketplace
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Checkout</span>
        </div>
      </div>

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-extrabold text-lg text-foreground mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full Name" error={errors.buyerName}>
                    <Input value={form.buyerName} onChange={set("buyerName")} placeholder="Your full name" className={errors.buyerName ? "border-destructive" : ""} />
                  </Field>
                  <Field label="Email Address" error={errors.buyerEmail}>
                    <Input type="email" value={form.buyerEmail} onChange={set("buyerEmail")} placeholder="email@example.com" className={errors.buyerEmail ? "border-destructive" : ""} />
                  </Field>
                  <Field label="Phone / WhatsApp" error={errors.buyerPhone} className="md:col-span-2">
                    <Input value={form.buyerPhone} onChange={set("buyerPhone")} placeholder="+256 7XX XXX XXX" className={errors.buyerPhone ? "border-destructive" : ""} />
                  </Field>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-extrabold text-lg text-foreground mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                  <Truck size={16} className="text-primary" />
                  Delivery Address
                </h2>
                <Field label="Full Delivery Address" error={errors.deliveryAddress}>
                  <textarea
                    value={form.deliveryAddress}
                    onChange={set("deliveryAddress")}
                    rows={3}
                    placeholder="Street, town/village, district, region"
                    className={cn("w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary", errors.deliveryAddress ? "border-destructive" : "border-input")}
                  />
                </Field>
                <Field label="Order Notes (optional)">
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={2}
                    placeholder="Preferred delivery time, special instructions…"
                    className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </Field>
              </div>

              {/* Payment */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-extrabold text-lg text-foreground mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                  <CreditCard size={16} className="text-primary" />
                  Payment Method
                </h2>
                {errors.paymentMethod && <p className="text-destructive text-xs mb-3">{errors.paymentMethod}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <label
                      key={pm.value}
                      className={cn(
                        "flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all",
                        form.paymentMethod === pm.value
                          ? "border-primary bg-primary/5 ring-2 ring-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.value}
                        checked={form.paymentMethod === pm.value}
                        onChange={() => setForm((p) => ({ ...p, paymentMethod: pm.value }))}
                        className="sr-only"
                      />
                      <span className="text-xl">{pm.icon}</span>
                      <span className="font-medium text-sm text-foreground">{pm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 text-sm">
                  <AlertCircle size={16} /> {submitError}
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base py-3 shadow-gold"
              >
                {submitting ? "Processing…" : `Place Order · UGX ${total.toLocaleString()}`}
              </Button>
            </form>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                <h2 className="font-extrabold text-foreground text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3 items-center">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.qty} × UGX {item.product.retailPrice.toLocaleString()}</p>
                      </div>
                      <p className="text-sm font-bold text-primary flex-shrink-0">
                        UGX {(item.product.retailPrice * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>UGX {subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Service fee (2.5%)</span><span>UGX {serviceFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-green-600 font-medium">TBD</span></div>
                  <Separator />
                  <div className="flex justify-between font-extrabold text-base">
                    <span>Total</span>
                    <span className="text-primary">UGX {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
