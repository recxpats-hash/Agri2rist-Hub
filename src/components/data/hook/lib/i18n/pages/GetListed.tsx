import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronLeft,
  FileCheck, ShieldCheck, MapPin, Phone, Mail, Building2, Users,
  Wallet, Star, Sparkles, Zap, Heart, TrendingUp, Globe,
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

const FEATURE_META: Record<string, { icon: typeof FileCheck; description: string }> = {
  "Who Can Become a Host?": { icon: Users, description: "Ideal hosts include farmers, lodges, cooperatives, and community-led tourism businesses." },
  "What Can You Offer?": { icon: Star, description: "Showcase stays, experiences, food, tours, products, and events in one listing." },
  "Benefits of Hosting": { icon: CheckCircle2, description: "Get discovered by travelers and manage bookings, payments, and reviews in one place." },
  "Safety & Quality Standards": { icon: ShieldCheck, description: "Build confidence with verified standards for safety, hospitality, and sustainability." },
  "Host Dashboard Features": { icon: Building2, description: "Stay organized with calendars, guest messaging, analytics, and promotion tools." },
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function GetListedPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentStep, setPaymentStep] = useState(1);

  const [form, setForm] = useState({
    businessName: "", tradingName: "", registrationNumber: "", tin: "", businessType: "", yearEstablished: "", story: "",
    ownerName: "", email: "", phone: "", whatsapp: "", country: "", district: "", town: "", mapLocation: "", address: "",
    categories: [] as string[], services: [] as string[], rooms: "", maxGuests: "", emergencyContact: "",
    plan: "Standard Host", bankName: "", accountName: "", accountNumber: "", mobileMoney: "", declaration: false,
  });

  const update = (key: string, value: any) => setForm(f => ({...f, [key]: value}));
  const toggle = (key: string, val: string) => setForm(f => ({...f, [key]: f[key as keyof typeof f].includes(val) ? (f[key as keyof typeof f] as string[]).filter(v => v !== val) : [...(f[key as keyof typeof f] as string[]), val]}));

  const activeStep = useMemo(() => step < 5 ? STEPS[step - 1]?.id : 4, [step]);
  const selectedPlan = useMemo(() => PLANS.find(p => p.name === form.plan), [form.plan]);

  const submit = () => {
    if (!form.declaration) return;
    const data = {...form, submittedAt: new Date().toISOString()};
    localStorage.setItem("agri2rist_host_applications", JSON.stringify([...(JSON.parse(localStorage.getItem("agri2rist_host_applications") || "[]")), data]));
    setStep(5);
  };

  return (
    <PageLayout>
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-primary to-emerald-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)", backgroundSize:"32px 32px"}} />
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition">
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Badge className="bg-secondary text-secondary-foreground font-bold mb-4">
                <BadgeCheck size={13} className="mr-1.5" /> Verified Host Onboarding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">Become a Host</h1>
              <p className="text-primary-foreground/85 text-lg max-w-xl mb-6">
                Share your farm, restaurant, lodge, campsite, or rural experience with travelers. Agri2rist Hub handles discovery, bookings, trust, and payments.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {HOST_BENEFITS.slice(0,4).map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                    <Check size={14} className="text-secondary flex-shrink-0" /> {b}
                  </div>
                ))}
              </div>

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

            <div className="lg:pt-6">
              <button type="button" onClick={() => navigate('/verified-host')} className="w-full rounded-2xl border border-white/25 bg-white/10 hover:bg-white/15 backdrop-blur p-6 text-left transition group">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">One-time verification fee</p>
                <p className="text-4xl font-extrabold text-white mb-2">UGX 100,000</p>
                <p className="text-primary-foreground/75 text-sm mb-4">Covers identity checks, business verification, farm inspection, digital certificate, and Agri2rist Host Badge.</p>
                <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-3 transition-all">
                  Start verification <ArrowRight size={15} />
                </span>
              </button>

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
      {step < 5 && (
        <section className="bg-gradient-to-b from-emerald-50/70 via-background to-background py-14 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Turn Your Farm into a Destination</h2>
              <p className="text-muted-foreground mt-3 text-base md:text-lg">Agri2rist Hub welcomes farmers, landowners, accommodation providers, tour operators, and local communities ready to earn through authentic agritourism.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Who Can Become a Host?", items: HOST_TYPES, icon: Users },
                { title: "What Can You Offer?", items: HOST_OFFERINGS, icon: Star },
                { title: "Benefits of Hosting", items: HOST_BENEFITS.slice(0,5), icon: CheckCircle2 },
                { title: "Safety & Quality Standards", items: HOST_STANDARDS, icon: ShieldCheck },
                { title: "Host Dashboard Features", items: HOST_DASHBOARD.slice(0,6), icon: Building2 },
              ].map(section => {
                const IconComp = section.icon as any;
                return (
                  <div key={section.title} className="rounded-3xl border border-border/70 bg-card p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComp size={24} className="text-primary" />
                      </div>
                      <h3 className="font-extrabold text-foreground text-base">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.slice(0, 3).map(item => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Sticky Step Navigation ── */}
      {step < 5 && (
        <section className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
              {STEPS.map((s, idx) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { if (step >= s.id) setStep(s.id); }}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                        active
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : done
                          ? "bg-primary/10 text-primary border-primary/40 hover:border-primary/60"
                          : "bg-card text-muted-foreground border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <span className={`flex items-center justify-center text-xs font-extrabold ${done ? "w-5 h-5 rounded-full bg-primary text-white" : "w-5 h-5"}`}>
                        {done ? <Check size={11} /> : s.id}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                    {idx < STEPS.length - 1 && (
                      <div className={`w-4 h-0.5 flex-shrink-0 ${done ? "bg-primary/50" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Form Section ── */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Main Form Card */}
            <div className="rounded-3xl border border-border/50 bg-card shadow-sm overflow-hidden">
              {/* Form header */}
              {step < 5 && (
                <div className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary font-bold">{step}</div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Step {step} of 4</p>
                    <h2 className="font-extrabold text-foreground text-lg">{STEPS[step - 1]?.title}</h2>
                  </div>
                </div>
              )}

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
                {/* ── Step 1: Business ── */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Business / Farm Name" id="businessName" required>
                        <Input id="businessName" value={form.businessName} onChange={e => update("businessName", e.target.value)} placeholder="e.g. Rwenzori Eco Farm" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Trading Name" id="tradingName">
                        <Input id="tradingName" value={form.tradingName} onChange={e => update("tradingName", e.target.value)} placeholder="If different" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Registration Number" id="regNum">
                        <Input id="regNum" value={form.registrationNumber} onChange={e => update("registrationNumber", e.target.value)} placeholder="BRLA-XXXXX" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Tax ID (TIN)" id="tin">
                        <Input id="tin" value={form.tin} onChange={e => update("tin", e.target.value)} placeholder="1234567890" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Business Type" id="businessType">
                        <Select value={form.businessType} onValueChange={v => update("businessType", v)}>
                          <SelectTrigger id="businessType" className="h-11 rounded-xl border-border/60 focus:border-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Individual","Sole Proprietorship","Partnership","Company","Cooperative","Community Organization"].map(v=><SelectItem key={v} value={v}>{v}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Year Established" id="yearEst">
                        <Input id="yearEst" value={form.yearEstablished} onChange={e => update("yearEstablished", e.target.value)} placeholder="2018" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                    </div>
                    <FormField label="Your Story" id="story">
                      <Textarea id="story" rows={4} value={form.story} onChange={e => update("story", e.target.value)} placeholder="Tell travelers what makes your farm special…" className="rounded-xl resize-none border-border/60 focus:border-primary" />
                    </FormField>
                    <StepButtons onContinue={() => setStep(2)} />
                  </div>
                )}

                {/* ── Step 2: Location ── */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Owner's Full Name" id="ownerName" required>
                        <Input id="ownerName" value={form.ownerName} onChange={e => update("ownerName", e.target.value)} placeholder="Full legal name" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Email Address" id="email" required>
                        <Input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="host@example.com" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Phone Number" id="phone" required>
                        <Input id="phone" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="WhatsApp" id="whatsapp">
                        <Input id="whatsapp" value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Country" id="country" required>
                        <Input id="country" value={form.country} onChange={e => update("country", e.target.value)} placeholder="Uganda" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="District / State" id="district" required>
                        <Input id="district" value={form.district} onChange={e => update("district", e.target.value)} placeholder="e.g. Fort Portal" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="City / Town" id="town">
                        <Input id="town" value={form.town} onChange={e => update("town", e.target.value)} placeholder="e.g. Kasese" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Google Maps Link" id="mapLink">
                        <Input id="mapLink" value={form.mapLocation} onChange={e => update("mapLocation", e.target.value)} placeholder="https://maps.google.com/..." className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                    </div>
                    <FormField label="Physical Address & Directions" id="address" required>
                      <Textarea id="address" rows={3} value={form.address} onChange={e => update("address", e.target.value)} placeholder="Detailed directions to help guests find you…" className="rounded-xl resize-none border-border/60 focus:border-primary" />
                    </FormField>
                    <StepButtons onContinue={() => setStep(3)} onBack={() => setStep(1)} />
                  </div>
                )}

                {/* ── Step 3: Offerings ── */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <ChoiceGroupLarge title="Host Category" items={HOST_CATEGORIES} selected={form.categories} onToggle={v => toggle("categories", v)} />
                    <Separator />
                    <ChoiceGroupLarge title="Products & Services" items={SERVICE_OPTIONS} selected={form.services} onToggle={v => toggle("services", v)} />
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <FormField label="Number of Rooms" id="rooms">
                        <Input id="rooms" value={form.rooms} onChange={e => update("rooms", e.target.value)} placeholder="e.g. 5" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Max Guests" id="maxGuests">
                        <Input id="maxGuests" value={form.maxGuests} onChange={e => update("maxGuests", e.target.value)} placeholder="e.g. 20" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                      <FormField label="Emergency Contact" id="emergency">
                        <Input id="emergency" value={form.emergencyContact} onChange={e => update("emergencyContact", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                      </FormField>
                    </div>
                    <StepButtons onContinue={() => setStep(4)} onBack={() => setStep(2)} />
                  </div>
                )}

                {/* ── Step 4: Payment ── */}
                {step === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h3 className="font-extrabold text-foreground mb-5 text-lg">Choose Your Annual Host Plan</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PLANS.map(plan => (
                          <label key={plan.name} className={`rounded-2xl border-2 p-5 cursor-pointer transition-all ${form.plan === plan.name ? `${plan.color} border-primary shadow-md` : "border-border bg-card hover:border-primary/40"}`}>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2">
                                <input type="radio" name="plan" checked={form.plan === plan.name} onChange={() => update("plan", plan.name)} className="accent-primary" />
                                <span className="font-extrabold text-foreground text-sm">{plan.name}</span>
                              </div>
                              <Badge className={`${plan.badge} text-xs flex-shrink-0 font-bold`}>{plan.fee}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{plan.bestFor}</p>
                            <ul className="space-y-1.5">
                              {plan.benefits.map(b=>(
                                <li key={b} className="flex items-center gap-1.5 text-xs text-foreground/80">
                                  <Check size={12} className="text-primary flex-shrink-0" /> {b}
                                </li>
                              ))}
                            </ul>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-extrabold text-foreground mb-5 text-lg">Payout Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Bank Name" id="bank">
                          <Input id="bank" value={form.bankName} onChange={e => update("bankName", e.target.value)} placeholder="e.g. Stanbic Bank" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                        </FormField>
                        <FormField label="Account Name" id="accName">
                          <Input id="accName" value={form.accountName} onChange={e => update("accountName", e.target.value)} placeholder="As on bank card" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                        </FormField>
                        <FormField label="Account Number" id="accNum">
                          <Input id="accNum" value={form.accountNumber} onChange={e => update("accountNumber", e.target.value)} placeholder="XXXXXXXXXXXXXXX" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                        </FormField>
                        <FormField label="Mobile Money" id="momo">
                          <Input id="momo" value={form.mobileMoney} onChange={e => update("mobileMoney", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-11 rounded-xl border-border/60 focus:border-primary" />
                        </FormField>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/40 p-4 cursor-pointer">
                      <Checkbox checked={form.declaration} onCheckedChange={v => update("declaration", Boolean(v))} className="mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground/85 leading-relaxed">
                        I certify that all information is accurate and agree to Agri2rist Hub's Host Standards, safety requirements, and verification checks.
                      </span>
                    </label>

                    <StepButtons onContinue={submit} onBack={() => setStep(3)} submitLabel="Submit Application" isSubmit disabled={!form.declaration} />
                  </div>
                )}

                {/* ── Step 5: Success ── */}
                {step === 5 && (
                  <div className="py-16 text-center space-y-6 animate-fadeIn">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={48} className="text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-foreground">Application Submitted!</h2>
                      <p className="mt-3 text-muted-foreground max-w-md mx-auto text-base">
                        <strong>{form.businessName || "Your farm"}</strong> is pending verification. We'll review your documents within 3–5 business days and notify you by email.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                      <Link to="/marketplace">
                        <Button className="bg-primary text-primary-foreground rounded-xl px-8 h-12 font-bold text-base">View Marketplace</Button>
                      </Link>
                      <Link to="/">
                        <Button variant="outline" className="rounded-xl px-8 h-12 font-bold">Back to Home</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 sticky top-32">
              {step < 5 && (
                <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/8 to-primary/3 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{step}</div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm">{STEPS[step-1]?.title}</p>
                      <p className="text-xs text-muted-foreground">What we verify</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      ["Creates your public profile", "Builds trust with travelers", "Enables search indexing"],
                      ["Enables guest discovery", "Provides contact path", "Captures emergency details"],
                      ["Drives marketplace visibility", "Defines bookable offerings", "Supports safety review"],
                      ["Confirms membership tier", "Processes verification", "Activates payout system"],
                    ][step-1]?.map(item=>(
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check size={13} className="mt-0.5 text-primary flex-shrink-0 font-bold" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step === 4 && selectedPlan && (
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
                  <p className="font-bold text-amber-900 text-sm mb-2">Plan Selected</p>
                  <p className="text-xl font-extrabold text-amber-700 mb-1">{selectedPlan.name}</p>
                  <p className="text-lg font-extrabold text-amber-600 mb-2">{selectedPlan.fee}</p>
                  <p className="text-xs text-amber-700/80">{selectedPlan.bestFor}</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

// ── Helper Components ──────────────────────────────────────────────────────────
function FormField({ label, id, required, children }: { label:string; id:string; required?:boolean; children:React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-foreground mb-2 block">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

function ChoiceGroupLarge({ title, items, selected, onToggle }: { title:string; items:string[]; selected:string[]; onToggle:(v:string)=>void }) {
  return (
    <div className="space-y-4">
      <h4 className="font-extrabold text-foreground text-base">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map(item => (
          <label key={item} className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 cursor-pointer transition-all font-medium text-sm ${selected.includes(item) ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:border-primary/50 hover:bg-card"}`}>
            <Checkbox checked={selected.includes(item)} onCheckedChange={() => onToggle(item)} className="flex-shrink-0" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

function StepButtons({ onContinue, onBack, submitLabel, isSubmit, disabled }: { onContinue:()=>void; onBack?:()=>void; submitLabel?:string; isSubmit?:boolean; disabled?:boolean }) {
  return (
    <div className="flex gap-3 pt-4">
      {onBack && (
        <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={onBack}>
          <ChevronLeft size={18} className="mr-1" /> Back
        </Button>
      )}
      <Button
        className={`flex-1 h-12 rounded-xl font-bold text-base ${isSubmit ? "bg-emerald-600 hover:bg-emerald-700" : "bg-primary"} disabled:opacity-50`}
        disabled={disabled}
        onClick={onContinue}
      >
        {submitLabel || "Continue"} <ArrowRight size={18} className="ml-1.5" />
      </Button>
    </div>
  );
}
