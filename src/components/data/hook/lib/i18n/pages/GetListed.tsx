import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Check, CheckCircle, ChevronLeft, FileCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PageLayout } from "@/components/layout/PageLayout";

const HOST_CATEGORIES = [
  "Farm Stay",
  "Restaurant",
  "Coffee Experience",
  "Dairy Farm",
  "Fish Farm",
  "Organic Farm",
  "Cultural Tourism",
  "Event Venue",
];

const SERVICE_OPTIONS = [
  "Accommodation",
  "Meals",
  "Farm Tours",
  "Fishing",
  "Camping",
  "Cooking Classes",
  "Traditional Food Experience",
  "Conference Facilities",
  "Weddings & Events",
  "School Tours",
];

const COMPLIANCE_ITEMS = [
  "Identity verification",
  "Business certificate",
  "Tax certificate",
  "Trading license",
  "Insurance certificate",
  "Food handling certificate",
];

const SUSTAINABILITY_ITEMS = [
  "Environmental practices",
  "Community employment",
  "Local products sold",
  "Cultural experiences",
  "Conservation activities",
  "Responsible tourism commitment",
];

const PLANS = [
  {
    name: "Starter Host",
    fee: "UGX 150,000",
    bestFor: "Small farms and homestays",
    benefits: "Business profile, listing, booking calendar, guest messaging",
  },
  {
    name: "Standard Host",
    fee: "UGX 350,000",
    bestFor: "Farm stays, lodges, accommodation providers",
    benefits: "Online payments, weather alerts, reviews, promotions, analytics",
  },
  {
    name: "Premium Host",
    fee: "UGX 750,000",
    bestFor: "Commercial farms, resorts, tourism centres",
    benefits: "Priority ranking, featured listings, support, campaigns, reports",
  },
  {
    name: "Enterprise Partner",
    fee: "UGX 1,500,000",
    bestFor: "Large estates, institutions, cooperatives",
    benefits: "Multi-property tools, API integration, staff accounts, account manager",
  },
];

type Step = 1 | 2 | 3 | 4 | 5;

export default function GetListedPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    businessName: "",
    tradingName: "",
    registrationNumber: "",
    tin: "",
    businessType: "Individual",
    yearEstablished: "",
    story: "",
    ownerName: "",
    phone: "",
    whatsapp: "",
    email: "",
    country: "",
    district: "",
    town: "",
    address: "",
    mapLocation: "",
    categories: [] as string[],
    services: [] as string[],
    rooms: "",
    maxGuests: "",
    currency: "UGX",
    cancellationPolicy: "",
    emergencyContact: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    mobileMoney: "",
    plan: "Starter Host",
    declaration: false,
  });

  const selectedPlan = useMemo(() => PLANS.find((plan) => plan.name === form.plan) || PLANS[0], [form.plan]);

  const update = (field: keyof typeof form, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggle = (field: "categories" | "services", value: string) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const submit = () => {
    const saved = JSON.parse(localStorage.getItem("agri2rist_host_applications") || "[]");
    localStorage.setItem(
      "agri2rist_host_applications",
      JSON.stringify([...saved, { ...form, status: "pending_verification", createdAt: new Date().toISOString() }])
    );
    setStep(5);
  };

  return (
    <PageLayout>
      <section className="bg-primary py-16">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
              <BadgeCheck size={16} />
              Verified host onboarding
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold text-primary-foreground md:text-5xl">
              Become a Host
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/78">
              Share your farm, restaurant, lodge, campsite, or rural experience with travelers while Agri2rist Hub handles discovery, bookings, trust, and payments.
            </p>
          </div>
          <div className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 p-5 text-primary-foreground">
            <p className="text-sm uppercase tracking-wide text-primary-foreground/70">One-time verification</p>
            <p className="mt-1 text-3xl font-extrabold">UGX 100,000</p>
            <p className="mt-2 text-sm text-primary-foreground/75">
              Covers identity checks, business verification, farm inspection where applicable, digital certificate, and Agri2rist Host Badge.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-6">
        <div className="container mx-auto flex flex-wrap gap-2 px-4">
          {["Business", "Location", "Offerings", "Payment"].map((label, index) => (
            <div key={label} className={`rounded-full px-4 py-2 text-sm font-semibold ${step > index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {index + 1}. {label}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-border bg-card p-6">
            {step === 1 && (
              <FormSection title="Business Profile" note="Core details used for verification and public host profile.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Business / Farm / Host Name" id="businessName">
                    <Input id="businessName" value={form.businessName} onChange={(event) => update("businessName", event.target.value)} />
                  </Field>
                  <Field label="Trading Name" id="tradingName">
                    <Input id="tradingName" value={form.tradingName} onChange={(event) => update("tradingName", event.target.value)} />
                  </Field>
                  <Field label="Registration Number" id="registrationNumber">
                    <Input id="registrationNumber" value={form.registrationNumber} onChange={(event) => update("registrationNumber", event.target.value)} />
                  </Field>
                  <Field label="Tax Identification Number" id="tin">
                    <Input id="tin" value={form.tin} onChange={(event) => update("tin", event.target.value)} />
                  </Field>
                  <Field label="Business Type" id="businessType">
                    <Select value={form.businessType} onValueChange={(value) => update("businessType", value)}>
                      <SelectTrigger id="businessType"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Individual", "Sole Proprietorship", "Partnership", "Company", "Cooperative", "Community Organization"].map((item) => (
                          <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Year Established" id="yearEstablished">
                    <Input id="yearEstablished" value={form.yearEstablished} onChange={(event) => update("yearEstablished", event.target.value)} />
                  </Field>
                </div>
                <Field label="Mission / Story" id="story">
                  <Textarea id="story" rows={4} className="resize-none" value={form.story} onChange={(event) => update("story", event.target.value)} />
                </Field>
                <Next disabled={!form.businessName || !form.story} onClick={() => setStep(2)} />
              </FormSection>
            )}

            {step === 2 && (
              <FormSection title="Contact and Location" note="Used for guest communication, maps, directions, and emergency readiness.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Owner's Full Name" id="ownerName">
                    <Input id="ownerName" value={form.ownerName} onChange={(event) => update("ownerName", event.target.value)} />
                  </Field>
                  <Field label="Email Address" id="email">
                    <Input id="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
                  </Field>
                  <Field label="Mobile Phone" id="phone">
                    <Input id="phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
                  </Field>
                  <Field label="WhatsApp Number" id="whatsapp">
                    <Input id="whatsapp" value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} />
                  </Field>
                  <Field label="Country" id="country">
                    <Input id="country" value={form.country} onChange={(event) => update("country", event.target.value)} />
                  </Field>
                  <Field label="District / State" id="district">
                    <Input id="district" value={form.district} onChange={(event) => update("district", event.target.value)} />
                  </Field>
                  <Field label="City / Town" id="town">
                    <Input id="town" value={form.town} onChange={(event) => update("town", event.target.value)} />
                  </Field>
                  <Field label="Google Maps Location" id="mapLocation">
                    <Input id="mapLocation" value={form.mapLocation} onChange={(event) => update("mapLocation", event.target.value)} />
                  </Field>
                </div>
                <Field label="Physical Address and Directions" id="address">
                  <Textarea id="address" rows={3} className="resize-none" value={form.address} onChange={(event) => update("address", event.target.value)} />
                </Field>
                <NavButtons back={() => setStep(1)} next={() => setStep(3)} disabled={!form.email || !form.phone || !form.country} />
              </FormSection>
            )}

            {step === 3 && (
              <FormSection title="Offerings and Safety" note="Choose only what guests can actually book or buy today.">
                <ChoiceGroup title="Host Category" items={HOST_CATEGORIES} selected={form.categories} onToggle={(item) => toggle("categories", item)} />
                <ChoiceGroup title="Products and Services" items={SERVICE_OPTIONS} selected={form.services} onToggle={(item) => toggle("services", item)} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="Number of Rooms" id="rooms">
                    <Input id="rooms" value={form.rooms} onChange={(event) => update("rooms", event.target.value)} />
                  </Field>
                  <Field label="Maximum Guests" id="maxGuests">
                    <Input id="maxGuests" value={form.maxGuests} onChange={(event) => update("maxGuests", event.target.value)} />
                  </Field>
                  <Field label="Emergency Contact" id="emergencyContact">
                    <Input id="emergencyContact" value={form.emergencyContact} onChange={(event) => update("emergencyContact", event.target.value)} />
                  </Field>
                </div>
                <NavButtons back={() => setStep(2)} next={() => setStep(4)} disabled={form.categories.length === 0 || form.services.length === 0} />
              </FormSection>
            )}

            {step === 4 && (
              <FormSection title="Membership and Payments" note="Annual host plan plus payout details for booking and marketplace revenue.">
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-foreground">
                      <tr>
                        <th className="p-3">Plan</th>
                        <th className="p-3">Annual fee</th>
                        <th className="hidden p-3 md:table-cell">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PLANS.map((plan) => (
                        <tr key={plan.name} className="border-t border-border">
                          <td className="p-3">
                            <label className="flex cursor-pointer items-center gap-2 font-semibold">
                              <input type="radio" checked={form.plan === plan.name} onChange={() => update("plan", plan.name)} />
                              {plan.name}
                            </label>
                          </td>
                          <td className="p-3 text-primary">{plan.fee}</td>
                          <td className="hidden p-3 text-muted-foreground md:table-cell">{plan.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                  {selectedPlan.benefits}
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Bank Name" id="bankName">
                    <Input id="bankName" value={form.bankName} onChange={(event) => update("bankName", event.target.value)} />
                  </Field>
                  <Field label="Account Name" id="accountName">
                    <Input id="accountName" value={form.accountName} onChange={(event) => update("accountName", event.target.value)} />
                  </Field>
                  <Field label="Account Number" id="accountNumber">
                    <Input id="accountNumber" value={form.accountNumber} onChange={(event) => update("accountNumber", event.target.value)} />
                  </Field>
                  <Field label="Mobile Money Number" id="mobileMoney">
                    <Input id="mobileMoney" value={form.mobileMoney} onChange={(event) => update("mobileMoney", event.target.value)} />
                  </Field>
                </div>
                <label className="flex items-start gap-3 rounded-lg border border-border p-4 text-sm">
                  <Checkbox checked={form.declaration} onCheckedChange={(checked) => update("declaration", Boolean(checked))} />
                  <span>I certify that the information provided is accurate and agree to Agri2rist Hub Host Standards, safety requirements, privacy policy, and verification checks.</span>
                </label>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(3)} className="flex-1"><ChevronLeft size={16} className="mr-1" />Back</Button>
                  <Button onClick={submit} disabled={!form.declaration} className="flex-1 bg-secondary text-secondary-foreground">Submit Application</Button>
                </div>
              </FormSection>
            )}

            {step === 5 && (
              <div className="py-12 text-center">
                <CheckCircle className="mx-auto mb-4 text-accent" size={56} />
                <h2 className="text-3xl font-extrabold text-foreground">Application Submitted</h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  {form.businessName} is now pending verification. The Agri2rist team can review your documents, inspection status, and host badge approval.
                </p>
                <Link to="/marketplace">
                  <Button className="mt-6 bg-primary text-primary-foreground">View Marketplace</Button>
                </Link>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <SidePanel icon={FileCheck} title="Verification Documents" items={COMPLIANCE_ITEMS} />
            <SidePanel icon={ShieldCheck} title="Sustainability Review" items={SUSTAINABILITY_ITEMS} />
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}

function FormSection({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ChoiceGroup({ title, items, selected, onToggle }: { title: string; items: string[]; selected: string[]; onToggle: (item: string) => void }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm">
            <Checkbox checked={selected.includes(item)} onCheckedChange={() => onToggle(item)} />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

function Next({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <Button disabled={disabled} onClick={onClick} className="w-full bg-primary text-primary-foreground">
      Continue <ArrowRight size={16} className="ml-2" />
    </Button>
  );
}

function NavButtons({ back, next, disabled }: { back: () => void; next: () => void; disabled: boolean }) {
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={back} className="flex-1"><ChevronLeft size={16} className="mr-1" />Back</Button>
      <Button disabled={disabled} onClick={next} className="flex-1 bg-primary text-primary-foreground">Continue <ArrowRight size={16} className="ml-2" /></Button>
    </div>
  );
}

function SidePanel({ icon: Icon, title, items }: { icon: typeof FileCheck; title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={20} className="text-primary" />
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={14} className="mt-0.5 text-accent" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
