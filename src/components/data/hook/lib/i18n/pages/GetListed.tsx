import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronLeft,
  FileCheck, ShieldCheck, MapPin, Phone, Mail, Building2, Users,
  Wallet, Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";

// ── Static data ───────────────────────────────────────────────────────────────
const HOST_CATEGORIES = ["Farm Stay","Restaurant","Coffee Experience","Dairy Farm","Fish Farm","Organic Farm","Cultural Tourism","Event Venue"];
const SERVICE_OPTIONS = ["Accommodation","Meals","Farm Tours","Fishing","Camping","Cooking Classes","Traditional Food Experience","Conference Facilities","Weddings & Events","School Tours"];
const COMPLIANCE_ITEMS = ["Identity verification","Business certificate","Tax certificate","Trading license","Insurance certificate","Food handling certificate"];
const SUSTAINABILITY_ITEMS = ["Environmental practices","Community employment","Local products sold","Cultural experiences","Conservation activities","Responsible tourism commitment"];
const HOST_TYPES = ["Crop farmers","Livestock farmers","Poultry farms","Dairy farms","Fish farms & aquaculture","Beekeeping farms","Coffee, tea & cocoa plantations","Fruit orchards","Farm stay operators","Eco-lodges & guest houses","Cultural villages","Agricultural cooperatives","Youth farmer groups","Women's farming associations"];
const HOST_OFFERINGS = ["Farm stay accommodation","Guided farm tours","Animal feeding","Crop harvesting","Fruit picking","Fishing experiences","Milking demonstrations","Coffee and tea tours","Farm-to-table dining","Fresh produce & handmade products"];
const HOST_BENEFITS = ["Reach local and international visitors","Online bookings 24/7","Promote your farm globally","Increase farm income","Sell products directly","Advertise special events","Manage availability calendars","Receive secure online payments","Build customer reviews & ratings","Access booking reports & insights"];
const HOST_STANDARDS = ["Maintain clean accommodation","Provide safe visitor areas","Follow food hygiene practices","Ensure guest safety","Respect environmental sustainability","Offer honest service descriptions","Respond promptly to bookings"];
const HOST_DASHBOARD = ["Booking management","Calendar","Guest messaging","Earnings dashboard","Reservation reports","Product marketplace","Tour management","Event management","Promotions","Customer reviews","Analytics","Notifications"];

const PLANS = [
  { name:"Starter Host",      fee:"UGX 150,000", bestFor:"Small farms and homestays",                     color:"border-emerald-200 bg-emerald-50/50", badge:"bg-emerald-100 text-emerald-700",  benefits:["Business profile & listing","Booking calendar","Guest messaging","Basic analytics"] },
  { name:"Standard Host",     fee:"UGX 350,000", bestFor:"Farm stays, lodges, accommodation providers",   color:"border-blue-200 bg-blue-50/50",    badge:"bg-blue-100 text-blue-700",     benefits:["Everything in Starter","Online payments","Weather alerts","Reviews & promotions","Advanced analytics"] },
  { name:"Premium Host",      fee:"UGX 750,000", bestFor:"Commercial farms, resorts, tourism centres",   color:"border-amber-200 bg-amber-50/60",  badge:"bg-amber-100 text-amber-700",   benefits:["Everything in Standard","Priority ranking","Featured listings","Dedicated support","Campaign management"] },
  { name:"Enterprise Partner",fee:"UGX 1,500,000",bestFor:"Large estates, institutions, cooperatives",  color:"border-purple-200 bg-purple-50/50",badge:"bg-purple-100 text-purple-700",  benefits:["Everything in Premium","Multi-property tools","API integration","Staff accounts","Dedicated account manager"] },
];

const STEPS = [
  { id:1, label:"Business",  title:"Create your public host profile",           icon:<Building2 size={16}/> },
  { id:2, label:"Location",  title:"Add contact, directions & emergency info",  icon:<MapPin size={16}/> },
  { id:3, label:"Offerings", title:"Choose what guests can book or buy",        icon:<Star size={16}/> },
  { id:4, label:"Payment",   title:"Select membership & payout method",         icon:<Wallet size={16}/> },
] as const;

type Step = 1|2|3|4|5;

// ── Sub-components ────────────────────────────────────────────────────────────
function Field({ label, id, required, children }: { label:string; id:string; required?:boolean; children:React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-foreground mb-1.5 block">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

function ChoiceGroup({ title, items, selected, onToggle }: { title:string; items:string[]; selected:string[]; onToggle:(v:string)=>void }) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(item => (
          <label key={item} className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition text-sm font-medium ${selected.includes(item) ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:border-primary/50"}`}>
            <Checkbox checked={selected.includes(item)} onCheckedChange={() => onToggle(item)} className="flex-shrink-0" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

function SideCard({ icon: Icon, title, items }: { icon: typeof FileCheck; title:string; items:string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Icon size={16} />
        </div>
        <h4 className="font-bold text-foreground text-sm">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={13} className="mt-0.5 text-primary flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureGrid({ title, items }: { title:string; items:string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-extrabold text-foreground mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80 border border-border">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function GetListedPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    businessName:"", tradingName:"", registrationNumber:"", tin:"",
    businessType:"Individual", yearEstablished:"", story:"",
    ownerName:"", phone:"", whatsapp:"", email:"",
    country:"", district:"", town:"", address:"", mapLocation:"",
    categories:[] as string[], services:[] as string[],
    rooms:"", maxGuests:"", currency:"UGX", emergencyContact:"",
    bankName:"", accountName:"", accountNumber:"", mobileMoney:"",
    plan:"Starter Host", declaration:false,
  });

  const selectedPlan = useMemo(() => PLANS.find(p => p.name === form.plan) ?? PLANS[0], [form.plan]);
  const activeStep = Math.min(step, 4) as 1|2|3|4;

  const update = (field: keyof typeof form, value: string | boolean | string[]) =>
    setForm(cur => ({ ...cur, [field]: value }));

  const toggle = (field: "categories"|"services", value: string) =>
    setForm(cur => ({
      ...cur,
      [field]: cur[field].includes(value) ? cur[field].filter(i => i !== value) : [...cur[field], value],
    }));

  const submit = () => {
    const saved = JSON.parse(localStorage.getItem("agri2rist_host_applications") || "[]");
    localStorage.setItem("agri2rist_host_applications", JSON.stringify([...saved, { ...form, status:"pending_verification", createdAt:new Date().toISOString() }]));
    setStep(5);
  };

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)", backgroundSize:"32px 32px"}} />
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left */}
            <div>
              <Badge className="bg-secondary text-secondary-foreground font-bold mb-4">
                <BadgeCheck size={13} className="mr-1.5" /> Verified Host Onboarding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Become a Host
              </h1>
              <p className="text-primary-foreground/85 text-lg max-w-xl mb-6">
                Share your farm, restaurant, lodge, campsite, or rural experience with travelers. Agri2rist Hub handles discovery, bookings, trust, and payments.
              </p>

              {/* Benefits row */}
              <div className="grid grid-cols-2 gap-3">
                {HOST_BENEFITS.slice(0,4).map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                    <Check size={14} className="text-secondary flex-shrink-0" /> {b}
                  </div>
                ))}
              </div>

              {/* Certification CTA */}
              <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-4">
                <h3 className="text-white font-bold mb-1">Verified Host Certification Program</h3>
                <p className="text-primary-foreground/75 text-sm mb-3">Get identity-checked, inspected, and earn your Verified Host badge to increase bookings and trust.</p>
                <Link to="/verified-host">
                  <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-xl">
                    Learn about Certification <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — verification fee card */}
            <div className="lg:pt-6">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full rounded-2xl border border-white/25 bg-white/10 hover:bg-white/15 backdrop-blur p-6 text-left transition group"
              >
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">One-time verification fee</p>
                <p className="text-4xl font-extrabold text-white mb-2">UGX 100,000</p>
                <p className="text-primary-foreground/75 text-sm mb-4">Covers identity checks, business verification, farm inspection, digital certificate, and Agri2rist Host Badge.</p>
                <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-3 transition-all">
                  Start verification <ArrowRight size={15} />
                </span>
              </button>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[{n:"2,400+",l:"Active Hosts"},{n:"18,000+",l:"Bookings"},{n:"4.8★",l:"Avg Rating"}].map(s=>(
                  <div key={s.l} className="rounded-xl border border-white/20 bg-white/10 p-3">
                    <div className="text-xl font-extrabold text-white">{s.n}</div>
                    <div className="text-xs text-primary-foreground/65 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="bg-muted/40 py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Turn Your Farm into a Destination</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Agri2rist Hub welcomes farmers, landowners, accommodation providers, tour operators, and local communities ready to earn through authentic agritourism.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureGrid title="Who Can Become a Host?" items={HOST_TYPES} />
            <FeatureGrid title="What Can You Offer?" items={HOST_OFFERINGS} />
            <FeatureGrid title="Benefits of Hosting" items={HOST_BENEFITS} />
            <FeatureGrid title="Safety & Quality Standards" items={HOST_STANDARDS} />
            <FeatureGrid title="Host Dashboard Features" items={HOST_DASHBOARD} />
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-extrabold text-foreground mb-3">Simple Hosting Process</h3>
              <ol className="space-y-2">
                {["Create account","Verify identity","Add farm or property","Upload photos & videos","Set prices & availability","Receive booking requests","Welcome guests","Get paid securely","Build reviews"].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step progress bar ── */}
      <section className="sticky top-0 z-20 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {STEPS.map((s, idx) => {
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => { if (step >= s.id) setStep(s.id); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      active ? "bg-primary text-primary-foreground border-primary shadow-sm" :
                      done   ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/15" :
                               "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${active ? "bg-white/20" : done ? "bg-primary/20" : "bg-muted"}`}>
                      {done ? <Check size={11}/> : s.id}
                    </span>
                    {s.label}
                  </button>
                  {idx < STEPS.length - 1 && <div className={`w-6 h-0.5 flex-shrink-0 ${done ? "bg-primary/40" : "bg-border"}`} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + sidebar ── */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

            {/* Main form card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              {/* Form header */}
              {step < 5 && (
                <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {STEPS[activeStep - 1].icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Step {activeStep} of 4</p>
                    <h2 className="font-extrabold text-foreground">{STEPS[activeStep - 1].title}</h2>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-6">
                {/* ── Step 1: Business ── */}
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Business / Farm / Host Name" id="businessName" required>
                        <Input id="businessName" value={form.businessName} onChange={e => update("businessName", e.target.value)} placeholder="e.g. Rwenzori Eco Farm" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Trading Name" id="tradingName">
                        <Input id="tradingName" value={form.tradingName} onChange={e => update("tradingName", e.target.value)} placeholder="If different from above" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Registration Number" id="regNum">
                        <Input id="regNum" value={form.registrationNumber} onChange={e => update("registrationNumber", e.target.value)} placeholder="BRLA-XXXXX" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Tax Identification Number (TIN)" id="tin">
                        <Input id="tin" value={form.tin} onChange={e => update("tin", e.target.value)} placeholder="1234567890" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Business Type" id="businessType">
                        <Select value={form.businessType} onValueChange={v => update("businessType", v)}>
                          <SelectTrigger id="businessType" className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["Individual","Sole Proprietorship","Partnership","Company","Cooperative","Community Organization"].map(v=><SelectItem key={v} value={v}>{v}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Year Established" id="yearEst">
                        <Input id="yearEst" value={form.yearEstablished} onChange={e => update("yearEstablished", e.target.value)} placeholder="2018" className="h-11 rounded-xl" />
                      </Field>
                    </div>
                    <Field label="Mission / Story" id="story">
                      <Textarea id="story" rows={4} value={form.story} onChange={e => update("story", e.target.value)} placeholder="Tell travelers about your farm, what makes it special, and why they should visit…" className="rounded-xl resize-none" />
                    </Field>
                    <Button className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-bold" onClick={() => setStep(2)}>
                      Continue <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </>
                )}

                {/* ── Step 2: Location ── */}
                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Owner's Full Name" id="ownerName" required>
                        <Input id="ownerName" value={form.ownerName} onChange={e => update("ownerName", e.target.value)} placeholder="Full legal name" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Email Address" id="email" required>
                        <Input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="host@example.com" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Mobile Phone" id="phone" required>
                        <Input id="phone" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="WhatsApp Number" id="whatsapp">
                        <Input id="whatsapp" value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Country" id="country" required>
                        <Input id="country" value={form.country} onChange={e => update("country", e.target.value)} placeholder="Uganda" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="District / State" id="district" required>
                        <Input id="district" value={form.district} onChange={e => update("district", e.target.value)} placeholder="e.g. Fort Portal" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="City / Town" id="town">
                        <Input id="town" value={form.town} onChange={e => update("town", e.target.value)} placeholder="e.g. Kasese" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Google Maps Link" id="mapLink">
                        <Input id="mapLink" value={form.mapLocation} onChange={e => update("mapLocation", e.target.value)} placeholder="https://maps.google.com/..." className="h-11 rounded-xl" />
                      </Field>
                    </div>
                    <Field label="Physical Address & Directions" id="address" required>
                      <Textarea id="address" rows={3} value={form.address} onChange={e => update("address", e.target.value)} placeholder="Detailed directions to help guests reach you…" className="rounded-xl resize-none" />
                    </Field>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(1)}>
                        <ChevronLeft size={16} className="mr-1" /> Back
                      </Button>
                      <Button className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl font-bold" onClick={() => setStep(3)}>
                        Continue <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}

                {/* ── Step 3: Offerings ── */}
                {step === 3 && (
                  <>
                    <ChoiceGroup title="Host Category" items={HOST_CATEGORIES} selected={form.categories} onToggle={v => toggle("categories", v)} />
                    <Separator />
                    <ChoiceGroup title="Products & Services Offered" items={SERVICE_OPTIONS} selected={form.services} onToggle={v => toggle("services", v)} />
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field label="Number of Rooms" id="rooms">
                        <Input id="rooms" value={form.rooms} onChange={e => update("rooms", e.target.value)} placeholder="e.g. 5" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Maximum Guests" id="maxGuests">
                        <Input id="maxGuests" value={form.maxGuests} onChange={e => update("maxGuests", e.target.value)} placeholder="e.g. 20" className="h-11 rounded-xl" />
                      </Field>
                      <Field label="Emergency Contact" id="emergency">
                        <Input id="emergency" value={form.emergencyContact} onChange={e => update("emergencyContact", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl" />
                      </Field>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(2)}>
                        <ChevronLeft size={16} className="mr-1" /> Back
                      </Button>
                      <Button className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl font-bold" onClick={() => setStep(4)}>
                        Continue <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}

                {/* ── Step 4: Payment ── */}
                {step === 4 && (
                  <>
                    {/* Plan selector */}
                    <div>
                      <h3 className="font-bold text-foreground mb-4">Choose Your Annual Host Plan</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PLANS.map(plan => (
                          <label
                            key={plan.name}
                            className={`rounded-xl border-2 p-4 cursor-pointer transition ${form.plan === plan.name ? `${plan.color} border-primary` : "border-border bg-card hover:border-primary/40"}`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <input type="radio" name="plan" checked={form.plan === plan.name} onChange={() => update("plan", plan.name)} className="accent-primary" />
                                <span className="font-extrabold text-foreground text-sm">{plan.name}</span>
                              </div>
                              <Badge className={`${plan.badge} text-xs flex-shrink-0`}>{plan.fee}/yr</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{plan.bestFor}</p>
                            <ul className="space-y-1">
                              {plan.benefits.map(b=>(
                                <li key={b} className="flex items-center gap-1.5 text-xs text-foreground/80">
                                  <Check size={11} className="text-primary flex-shrink-0" />{b}
                                </li>
                              ))}
                            </ul>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Payout details */}
                    <div>
                      <h3 className="font-bold text-foreground mb-4">Payout Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Bank Name" id="bank">
                          <Input id="bank" value={form.bankName} onChange={e => update("bankName", e.target.value)} placeholder="e.g. Stanbic Bank" className="h-11 rounded-xl" />
                        </Field>
                        <Field label="Account Name" id="accName">
                          <Input id="accName" value={form.accountName} onChange={e => update("accountName", e.target.value)} placeholder="As on bank card" className="h-11 rounded-xl" />
                        </Field>
                        <Field label="Account Number" id="accNum">
                          <Input id="accNum" value={form.accountNumber} onChange={e => update("accountNumber", e.target.value)} placeholder="XXXXXXXXXXXXXXX" className="h-11 rounded-xl" />
                        </Field>
                        <Field label="Mobile Money Number" id="momo">
                          <Input id="momo" value={form.mobileMoney} onChange={e => update("mobileMoney", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl" />
                        </Field>
                      </div>
                    </div>

                    {/* Declaration */}
                    <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4 cursor-pointer">
                      <Checkbox checked={form.declaration} onCheckedChange={v => update("declaration", Boolean(v))} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-relaxed">
                        I certify that all information provided is accurate and I agree to Agri2rist Hub's Host Standards, safety requirements, privacy policy, and verification checks.
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(3)}>
                        <ChevronLeft size={16} className="mr-1" /> Back
                      </Button>
                      <Button
                        className="flex-1 h-11 bg-secondary text-secondary-foreground rounded-xl font-bold disabled:opacity-50"
                        disabled={!form.declaration}
                        onClick={submit}
                      >
                        Submit Application <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}

                {/* ── Step 5: Success ── */}
                {step === 5 && (
                  <div className="py-10 text-center space-y-5">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={44} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-foreground">Application Submitted!</h2>
                      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                        <strong>{form.businessName || "Your farm"}</strong> is now pending verification. The Agri2rist team will review your documents and notify you within 3–5 business days.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link to="/marketplace">
                        <Button className="bg-primary text-primary-foreground rounded-xl px-6 font-bold">View Marketplace</Button>
                      </Link>
                      <Link to="/">
                        <Button variant="outline" className="rounded-xl px-6">Back to Home</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-4">
              {step < 5 && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{activeStep}</div>
                    <p className="font-bold text-foreground text-sm">{STEPS[activeStep-1].title}</p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      ["Creates your public host profile for travelers","Feeds listing name, story & host type into review queue","Supports admin verification of business identity"],
                      ["Enables map discovery and guest directions","Gives Agri2rist support a verified contact path","Captures emergency and operational contact details"],
                      ["Defines searchable categories in the marketplace","Controls bookable experiences, dining, events & services","Helps reviewers check safety before publishing"],
                      ["Stores membership choice and payout details","Confirms the UGX 100,000 verification review","Submits application into pending verification"],
                    ][activeStep-1].map(item=>(
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={13} className="mt-0.5 text-primary flex-shrink-0"/>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <SideCard icon={FileCheck} title="Verification Documents" items={COMPLIANCE_ITEMS} />
              <SideCard icon={ShieldCheck} title="Sustainability Review" items={SUSTAINABILITY_ITEMS} />
              {step === 4 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="font-bold text-amber-800 text-sm mb-2">Selected Plan</p>
                  <p className="text-lg font-extrabold text-amber-700">{selectedPlan.name}</p>
                  <p className="text-amber-600 font-bold">{selectedPlan.fee} / year</p>
                  <p className="text-xs text-amber-700/80 mt-1">{selectedPlan.bestFor}</p>
                </div>
              )}
            </aside>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
