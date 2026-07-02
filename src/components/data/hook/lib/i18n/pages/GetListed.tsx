import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Crown,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

const FARM_TYPES = ["Dairy", "Poultry", "Aquaculture", "Crop Farming", "Mixed Farm", "Cultural Tourism", "Eco Farm", "Winery / Orchard"];
const REGIONS = ["Kenya", "Tanzania", "Uganda", "South Africa", "Ethiopia", "Ghana", "Morocco", "Rwanda"];
const ACTIVITIES_LIST = [
  "Farm Tours", "Farm Stays", "Cooking Classes", "Workshops", "Pick-Your-Own",
  "Farmers Market", "Farm-to-Table Dining", "Wildlife Watching", "Cultural Experiences",
  "Horse Riding", "Fishing", "Camping", "Eco Trails",
];
const ACCOMMODATION_LIST = [
  "Farmhouse B&B", "Private Cottage", "Glamping Tent", "Farm Cabin",
  "Eco Tent", "Outback Cabin", "Self-Contained Unit", "Shared Dormitory",
  "Cultural Camp", "No Accommodation",
];

const HOST_TYPES = [
  "Crop farmers",
  "Livestock farmers",
  "Poultry farms",
  "Dairy farms",
  "Fish farms and aquaculture centers",
  "Beekeeping farms",
  "Coffee, tea and cocoa plantations",
  "Fruit orchards",
  "Farm stay operators",
  "Eco-lodges and guest houses",
  "Community tourism groups",
  "Agricultural cooperatives",
  "Youth farmer groups",
  "Women's farming associations",
];

const HOST_OFFERINGS = [
  {
    title: "Farm Stay Accommodation",
    items: ["Farm houses", "Eco-lodges", "Country cottages", "Cabins", "Tree houses", "Tiny homes", "Glamping", "Camping sites", "Luxury farm villas"],
  },
  {
    title: "Farm Experiences",
    items: ["Guided farm tours", "Animal feeding", "Crop harvesting", "Fruit picking", "Fishing experiences", "Milking demonstrations", "Tractor rides", "Coffee tours", "Farm-to-table dining"],
  },
  {
    title: "Farm Products",
    items: ["Fresh fruits", "Vegetables", "Organic produce", "Eggs", "Milk", "Honey", "Fish", "Coffee", "Herbs and spices", "Seedlings", "Handmade crafts"],
  },
];

const HOST_BENEFITS = [
  "Reach local and international visitors",
  "Receive online bookings 24/7",
  "Promote your farm globally",
  "Increase farm income",
  "Sell products directly to customers",
  "Advertise special events",
  "Manage availability calendars",
  "Receive secure online payments",
  "Build reviews and ratings",
  "Access booking reports and business insights",
];

const HOST_REQUIREMENTS = [
  "Personal or business information",
  "National identification or passport",
  "Farm or business registration where applicable",
  "Farm location and contact details",
  "High-quality photos",
  "Property and experience descriptions",
  "Pricing and availability calendar",
  "Emergency contact",
  "Bank or mobile money payment details",
];

const HOST_STANDARDS = [
  "Maintain clean accommodation",
  "Provide safe visitor areas",
  "Follow food hygiene practices",
  "Ensure guest safety around animals and equipment",
  "Respect environmental sustainability",
  "Offer honest descriptions of services",
  "Respond promptly to booking requests",
];

const HOST_PROCESS = [
  "Create your host account",
  "Verify your identity",
  "Add your farm or property",
  "Upload photos and videos",
  "List accommodation and experiences",
  "Set prices and availability",
  "Receive booking requests",
  "Welcome guests",
  "Get paid securely",
  "Build your reputation through reviews",
];

const HOST_DASHBOARD = [
  "Booking management",
  "Calendar",
  "Guest messaging",
  "Earnings dashboard",
  "Reservation reports",
  "Product marketplace",
  "Tour management",
  "Event management",
  "Promotions",
  "Customer reviews",
  "Analytics",
  "Notifications",
];

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    icon: Star,
    color: "border-muted-foreground",
    highlight: false,
    features: [
      "Basic farm listing",
      "1 photo upload",
      "Location & contact info",
      "Farm description",
      "Community visibility",
    ],
    limitations: ["No booking system", "No marketplace access", "No priority listing"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 9.99,
    icon: Zap,
    color: "border-primary",
    highlight: false,
    features: [
      "Up to 10 photos",
      "Guest booking system",
      "Marketplace access",
      "Activity listings",
      "Email enquiries",
      "Monthly analytics report",
    ],
    limitations: ["No priority placement"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 24.99,
    icon: Crown,
    color: "border-secondary",
    highlight: true,
    features: [
      "Unlimited photos",
      "Priority listing placement",
      "Full booking system",
      "Marketplace with promotions",
      "Featured on homepage",
      "Advanced analytics",
      "Dedicated support",
      "Social media kit",
    ],
    limitations: [],
  },
];

type Step = 1 | 2 | 3 | 4 | 5;

export default function GetListedPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    farmName: "",
    farmType: "",
    region: "",
    location: "",
    description: "",
    activities: [] as string[],
    accommodationTypes: [] as string[],
    membershipTier: "free" as "free" | "standard" | "premium",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const { toast } = useToast();

  const update = (field: string, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field: "activities" | "accommodationTypes", item: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const handleSubmit = () => {
    const listing = {
      ...form,
      id: `listing-${Date.now()}`,
      status: "pending_review",
      createdAt: new Date().toISOString(),
    };
    const saved = JSON.parse(localStorage.getItem("agri2rist_listings") || "[]");
    localStorage.setItem("agri2rist_listings", JSON.stringify([...saved, listing]));
    setStep(5);
  };

  const steps = [
    { id: 1, label: "Business Info" },
    { id: 2, label: "Offerings" },
    { id: 3, label: "Choose Plan" },
    { id: 4, label: "Contact" },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
            Become a <span className="text-gradient-gold">Host</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-2">
            Share your farm, welcome the world, and grow your income with authentic agritourism experiences.
          </p>
          <p className="text-primary-foreground/60 text-base max-w-xl mx-auto">
            Turn your farm, fish farm, orchard, lodge, campsite, or rural property into a destination.
          </p>
        </div>
      </section>

      {step === 1 && (
        <section className="bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-4xl text-center">
              <h2 className="mb-3 text-3xl font-extrabold text-foreground">
                Share Your Farm. Welcome the World. Grow Your Income.
              </h2>
              <p className="text-muted-foreground">
                Agri2rist Hub connects farmers, rural communities, accommodation providers, and tourism entrepreneurs with visitors seeking authentic agricultural and cultural experiences.
              </p>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {HOST_OFFERINGS.map((group) => (
                <div key={group.title} className="rounded-lg border border-border bg-card p-5 shadow-brand">
                  <h3 className="mb-3 font-extrabold text-foreground">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/75">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <FeatureGrid title="Who Can Become a Host?" items={HOST_TYPES} />
            <FeatureGrid title="Benefits of Becoming a Host" items={HOST_BENEFITS} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <FeaturePanel title="Registration Requirements" items={HOST_REQUIREMENTS} />
              <FeaturePanel title="Safety and Quality Standards" items={HOST_STANDARDS} />
              <FeaturePanel title="Host Dashboard Features" items={HOST_DASHBOARD} />
            </div>

            <div className="mt-10 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-5 text-xl font-extrabold text-foreground">Simple Hosting Process</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {HOST_PROCESS.map((item, index) => (
                  <div key={item} className="rounded-md bg-muted p-3">
                    <div className="mb-1 text-xs font-bold uppercase text-primary">Step {index + 1}</div>
                    <div className="text-sm font-medium text-foreground">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Plans Overview */}
      {step === 1 && (
        <section className="py-10 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xl font-bold text-foreground mb-6">Choose your membership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl border-2 p-5 relative ${plan.highlight ? "border-secondary bg-secondary/5" : `${plan.color} bg-card`}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <plan.icon size={24} className={plan.highlight ? "text-secondary mb-2" : "text-primary mb-2"} />
                  <h3 className="font-extrabold text-foreground text-lg">{plan.name}</h3>
                  <div className="text-2xl font-extrabold text-primary my-1">
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                    {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                  </div>
                  <ul className="space-y-1 mt-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-foreground/75">
                        <Check size={12} className="text-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step Indicators */}
      {step < 5 && (
        <div className="bg-muted border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-colors ${
                      step >= s.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {step > s.id ? <Check size={12} /> : s.id}
                  </div>
                  <span className={`hidden md:block text-sm ${step >= s.id ? "text-primary font-medium" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-6 md:w-12 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {step === 5 ? (
              // Confirmation
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-light mb-6">
                  <CheckCircle size={40} className="text-accent" />
                </div>
                <h2 className="text-3xl font-extrabold text-foreground mb-3">
                  Application Submitted!
                </h2>
                <p className="text-muted-foreground text-lg mb-2">
                  Welcome to Agri2rist Hub, <strong>{form.contactName}</strong>!
                </p>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Your farm listing for <strong>{form.farmName}</strong> has been submitted for review.
                  Our team will contact you at <strong>{form.contactEmail}</strong> within 2 business days.
                </p>
                <div className="bg-card border border-border rounded-2xl p-6 text-left mb-8 max-w-md mx-auto">
                  <h3 className="font-bold text-foreground mb-3">Summary</h3>
                  {[
                    ["Farm", form.farmName],
                    ["Type", form.farmType],
                    ["Region", form.region],
                    ["Plan", PLANS.find(p => p.id === form.membershipTier)?.name || "Free"],
                    ["Activities", form.activities.join(", ") || "Not specified"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground text-right max-w-[60%]">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/explore">
                    <Button variant="outline" className="border-primary text-primary">
                      Browse Other Farms
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-primary text-primary-foreground">Back to Home</Button>
                  </Link>
                </div>
              </div>
            ) : step === 1 ? (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">Business Information</h2>

                <div>
                  <Label htmlFor="farmName">Farm / Business Name *</Label>
                  <Input
                    id="farmName"
                    value={form.farmName}
                    onChange={(e) => update("farmName", e.target.value)}
                    placeholder="e.g. Green Valley Dairy Farm"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Farm Type *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {FARM_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => update("farmType", type)}
                        className={`p-2.5 rounded-xl border text-sm text-left transition-colors ${
                          form.farmType === type
                            ? "border-primary bg-primary/5 text-primary font-medium"
                            : "border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Region *</Label>
                    <div className="space-y-1 mt-2">
                      {REGIONS.map((region) => (
                        <button
                          key={region}
                          type="button"
                          onClick={() => update("region", region)}
                          className={`w-full p-2 rounded-lg border text-sm text-left transition-colors ${
                            form.region === region
                              ? "border-primary bg-primary/5 text-primary font-medium"
                              : "border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          {region}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Town / Address</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="e.g. Bundaberg, QLD 4670"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Farm Description *</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Tell visitors about your farm, what makes it special, and what experiences you offer..."
                    className="mt-1 resize-none"
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground"
                  disabled={!form.farmName || !form.farmType || !form.region || !form.description}
                  onClick={() => setStep(2)}
                >
                  Next: Activities & Accommodation <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            ) : step === 2 ? (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">Activities & Offerings</h2>

                <div>
                  <Label>Activities Offered (select all that apply)</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ACTIVITIES_LIST.map((activity) => (
                      <button
                        key={activity}
                        type="button"
                        onClick={() => toggleArray("activities", activity)}
                        className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-colors ${
                          form.activities.includes(activity)
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-foreground border-border hover:border-accent"
                        }`}
                      >
                        {form.activities.includes(activity) && (
                          <Check size={12} className="inline mr-1" />
                        )}
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Accommodation Types (select all that apply)</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ACCOMMODATION_LIST.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleArray("accommodationTypes", type)}
                        className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-colors ${
                          form.accommodationTypes.includes(type)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:border-primary"
                        }`}
                      >
                        {form.accommodationTypes.includes(type) && (
                          <Check size={12} className="inline mr-1" />
                        )}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ChevronLeft size={16} className="mr-1" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    disabled={form.activities.length === 0}
                    onClick={() => setStep(3)}
                  >
                    Next: Choose Plan <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            ) : step === 3 ? (
              <div className="space-y-5 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">Choose Your Membership Plan</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => update("membershipTier", plan.id)}
                      className={`rounded-2xl border-2 p-6 text-left transition-all relative ${
                        form.membershipTier === plan.id
                          ? plan.highlight
                            ? "border-secondary bg-secondary/10 shadow-gold"
                            : "border-primary bg-primary/5 shadow-brand"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                            Most Popular
                          </span>
                        </div>
                      )}
                      {form.membershipTier === plan.id && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle size={20} className="text-primary" />
                        </div>
                      )}
                      <plan.icon size={28} className={plan.highlight ? "text-secondary mb-2" : "text-primary mb-2"} />
                      <h3 className="font-extrabold text-foreground text-xl">{plan.name}</h3>
                      <div className="text-2xl font-extrabold text-primary my-1">
                        {plan.price === 0 ? "Free" : `$${plan.price}`}
                        {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                      </div>
                      <ul className="space-y-1.5 mt-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-foreground/75">
                            <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    <ChevronLeft size={16} className="mr-1" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    onClick={() => setStep(4)}
                  >
                    Next: Contact Details <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            ) : step === 4 ? (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
                <h2 className="text-xl font-bold text-foreground">Contact Details</h2>

                <div>
                  <Label htmlFor="contactName">Full Name *</Label>
                  <Input
                    id="contactName"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    placeholder="Your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Email Address *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="you@yourfarm.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    placeholder="+61 4xx xxx xxx"
                    className="mt-1"
                  />
                </div>

                {/* Summary */}
                <div className="bg-muted rounded-xl p-4 text-sm space-y-2">
                  <h3 className="font-semibold text-foreground">Submission Summary</h3>
                  {[
                    ["Farm", form.farmName],
                    ["Type", form.farmType],
                    ["Region", form.region],
                    ["Plan", PLANS.find(p => p.id === form.membershipTier)?.name || ""],
                    ["Activities", form.activities.length + " selected"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                    <ChevronLeft size={16} className="mr-1" />
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-gold"
                    disabled={!form.contactName || !form.contactEmail}
                    onClick={handleSubmit}
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function FeatureGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-xl font-extrabold text-foreground">{title}</h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-border bg-card p-3 text-sm text-foreground/80">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturePanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-3 font-extrabold text-foreground">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check size={14} className="mt-0.5 flex-shrink-0 text-accent" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
