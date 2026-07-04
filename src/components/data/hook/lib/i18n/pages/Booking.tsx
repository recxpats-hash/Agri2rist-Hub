import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarCheck, CheckCircle, ChevronLeft, Clock, CreditCard, MapPin, QrCode, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { FARM_IMAGES, SAMPLE_FARMS } from "@/data/sampleData";

const RESTAURANTS = [
  {
    id: "harvest-table",
    name: "Harvest Table Kitchen",
    cuisine: "Farm-to-table Ugandan cuisine",
    location: "Fort Portal",
    rating: "4.8",
    price: "$$",
    image: FARM_IMAGES.farmFruits,
    badges: ["Farm-to-Table", "Organic Food", "Traditional Cuisine"],
    hours: "11:00 - 21:30",
  },
  {
    id: "lake-bbq",
    name: "Blue Lagoon Fish Barbecue",
    cuisine: "Seafood and fish farm dining",
    location: "Jinja",
    rating: "4.7",
    price: "$$",
    image: FARM_IMAGES.tilapia,
    badges: ["Lake View", "Fresh Fish", "Outdoor Dining"],
    hours: "12:00 - 22:00",
  },
  {
    id: "coffee-breakfast",
    name: "Highlands Coffee Breakfast",
    cuisine: "Coffee, bakery, and breakfast",
    location: "Kapchorwa",
    rating: "4.9",
    price: "$",
    image: FARM_IMAGES.training,
    badges: ["Coffee Tour", "Mountain View", "Vegetarian"],
    hours: "07:00 - 16:00",
  },
];

const EXPERIENCES = [
  "Harvest & Cook Experience",
  "Pick Your Own Vegetables",
  "Coffee Farm Breakfast",
  "Tea Plantation Lunch",
  "Organic Farm Dinner",
  "Fish Farm Barbecue",
  "Traditional Cooking Class",
  "Sunset Garden Dinner",
];

const EVENTS = ["Food Festival", "Cultural Dinner Night", "BBQ Weekend", "Coffee Tasting", "Chef Masterclass", "Farm Brunch"];
const OCCASIONS = ["Casual Dining", "Birthday", "Anniversary", "Business Meeting", "Wedding Dinner", "Honeymoon", "Family Gathering"];
const SEATING = ["Indoor Dining", "Outdoor Dining", "Garden Restaurant", "Lake View", "Mountain View", "Wheelchair Accessible"];
const PAYMENT_OPTIONS = ["Pay at Restaurant", "Deposit Payment", "Full Payment", "Group Payment", "Corporate Billing", "Mobile Money", "Credit Card"];
const DASHBOARD_FEATURES = ["Upcoming reservations", "Saved menus", "Payment history", "Loyalty points", "Modify bookings", "Cancel reservations"];
const PARTNER_TOOLS = ["Menu management", "Table layout", "Availability calendar", "Reservation queue", "Promotions", "Revenue dashboard"];

type Step = 1 | 2 | 3 | 4;

export default function BookingPage() {
  const { farmId } = useParams();
  const farm = SAMPLE_FARMS.find((item) => item.id === farmId) || SAMPLE_FARMS[0];
  const [step, setStep] = useState<Step>(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[0].id);
  const [form, setForm] = useState({
    date: "",
    time: "18:30",
    guests: 2,
    seating: "Outdoor Dining",
    occasion: "Casual Dining",
    name: "",
    email: "",
    phone: "",
    country: "",
    dietary: "",
    allergies: "",
    accessibility: "",
    requests: "",
    payment: "Deposit Payment",
    experiences: [] as string[],
    events: [] as string[],
  });

  const restaurant = useMemo(() => RESTAURANTS.find((item) => item.id === selectedRestaurant) || RESTAURANTS[0], [selectedRestaurant]);
  const bookingRef = useMemo(() => `A2R-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, []);
  const deposit = form.payment === "Pay at Restaurant" ? 0 : form.guests * 15000;

  const update = (field: keyof typeof form, value: string | number | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggle = (field: "experiences" | "events", value: string) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const confirm = () => {
    const saved = JSON.parse(localStorage.getItem("agri2rist_restaurant_bookings") || "[]");
    localStorage.setItem(
      "agri2rist_restaurant_bookings",
      JSON.stringify([...saved, { ...form, restaurant: restaurant.name, bookingRef, deposit, status: "confirmed", createdAt: new Date().toISOString() }])
    );
    setStep(4);
  };

  return (
    <PageLayout>
      <div className="border-b border-border bg-muted py-3">
        <div className="container mx-auto px-4">
          <Link to={`/farm/${farm.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft size={16} />
            Back to {farm.name}
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden bg-primary py-16">
        <img src={restaurant.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container relative mx-auto px-4">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">Restaurant and cuisine booking</Badge>
          <h1 className="max-w-3xl text-4xl font-extrabold text-primary-foreground md:text-5xl">
            Taste Authentic Africa. Book Memorable Dining Experiences.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white font-medium">
            Reserve farm-to-table restaurants, traditional cuisine, private dining, culinary events, and chef-led food experiences.
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[1fr_360px]">
          <main className="space-y-8">
            {step < 4 && (
              <div className="flex flex-wrap gap-2">
                {["Find Restaurant", "Reserve Table", "Guest & Payment"].map((label, index) => (
                  <div key={label} className={`rounded-full px-4 py-2 text-sm font-semibold ${step > index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {index + 1}. {label}
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <section className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">Choose a Restaurant</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Listings show only the details guests need before booking.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {RESTAURANTS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRestaurant(item.id)}
                      className={`overflow-hidden rounded-lg border text-left transition ${selectedRestaurant === item.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}
                    >
                      <img src={item.image} alt={item.name} className="h-36 w-full object-cover" loading="lazy" decoding="async" />
                      <div className="p-4">
                        <div className="font-bold text-foreground">{item.name}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{item.cuisine}</div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin size={14} />{item.location}</span>
                          <span className="font-semibold text-primary">{item.rating}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <Button className="bg-primary text-primary-foreground" onClick={() => setStep(2)}>Continue to Reservation</Button>
              </section>
            )}

            {step === 2 && (
              <FormBlock title="Reservation Details" icon={CalendarCheck}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="Reservation Date" id="date">
                    <Input id="date" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(event) => update("date", event.target.value)} />
                  </Field>
                  <Field label="Preferred Time" id="time">
                    <Input id="time" type="time" value={form.time} onChange={(event) => update("time", event.target.value)} />
                  </Field>
                  <Field label="Number of Guests" id="guests">
                    <Input id="guests" type="number" min={1} max={80} value={form.guests} onChange={(event) => update("guests", Number(event.target.value) || 1)} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Seating Preference" id="seating">
                    <Select value={form.seating} onValueChange={(value) => update("seating", value)}>
                      <SelectTrigger id="seating"><SelectValue /></SelectTrigger>
                      <SelectContent>{SEATING.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="Occasion" id="occasion">
                    <Select value={form.occasion} onValueChange={(value) => update("occasion", value)}>
                      <SelectTrigger id="occasion"><SelectValue /></SelectTrigger>
                      <SelectContent>{OCCASIONS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                </div>
                <CompactChecklist title="Farm-to-table experiences" items={EXPERIENCES} selected={form.experiences} onToggle={(item) => toggle("experiences", item)} />
                <CompactChecklist title="Culinary events" items={EVENTS} selected={form.events} onToggle={(item) => toggle("events", item)} />
                <StepButtons back={() => setStep(1)} next={() => setStep(3)} disabled={!form.date || !form.time} />
              </FormBlock>
            )}

            {step === 3 && (
              <FormBlock title="Guest and Payment" icon={CreditCard}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full Name" id="name"><Input id="name" value={form.name} onChange={(event) => update("name", event.target.value)} /></Field>
                  <Field label="Email" id="email"><Input id="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></Field>
                  <Field label="Mobile Number" id="phone"><Input id="phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} /></Field>
                  <Field label="Country" id="country"><Input id="country" value={form.country} onChange={(event) => update("country", event.target.value)} /></Field>
                  <Field label="Payment Option" id="payment">
                    <Select value={form.payment} onValueChange={(value) => update("payment", value)}>
                      <SelectTrigger id="payment"><SelectValue /></SelectTrigger>
                      <SelectContent>{PAYMENT_OPTIONS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Dietary Preferences" id="dietary"><Textarea id="dietary" rows={2} className="resize-none" value={form.dietary} onChange={(event) => update("dietary", event.target.value)} /></Field>
                  <Field label="Allergies" id="allergies"><Textarea id="allergies" rows={2} className="resize-none" value={form.allergies} onChange={(event) => update("allergies", event.target.value)} /></Field>
                  <Field label="Accessibility Requirements" id="accessibility"><Textarea id="accessibility" rows={2} className="resize-none" value={form.accessibility} onChange={(event) => update("accessibility", event.target.value)} /></Field>
                  <Field label="Special Requests" id="requests"><Textarea id="requests" rows={2} className="resize-none" value={form.requests} onChange={(event) => update("requests", event.target.value)} /></Field>
                </div>
                <div className="rounded-lg bg-muted p-4 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Deposit due</span><span className="font-bold text-primary">UGX {deposit.toLocaleString()}</span></div>
                  <div className="mt-1 text-xs text-muted-foreground">Includes email/SMS confirmation, QR check-in, calendar reminder, directions, and cancellation policy.</div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1"><ChevronLeft size={16} className="mr-1" />Back</Button>
                  <Button disabled={!form.name || !form.email || !form.phone} onClick={confirm} className="flex-1 bg-secondary text-secondary-foreground">Confirm Booking</Button>
                </div>
              </FormBlock>
            )}

            {step === 4 && (
              <section className="rounded-lg border border-border bg-card p-8 text-center">
                <CheckCircle className="mx-auto mb-4 text-accent" size={58} />
                <h2 className="text-3xl font-extrabold text-foreground">Reservation Confirmed</h2>
                <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                  Your table at {restaurant.name} is confirmed. Use your booking reference and QR code at check-in.
                </p>
                <div className="mx-auto mt-6 max-w-md rounded-lg bg-muted p-5 text-left text-sm">
                  {[
                    ["Reference", bookingRef],
                    ["Date", form.date],
                    ["Time", form.time],
                    ["Guests", String(form.guests)],
                    ["Seating", form.seating],
                    ["Payment", form.payment],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-border py-2 last:border-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <Link to="/marketplace"><Button className="mt-6 bg-primary text-primary-foreground">Browse Local Food Products</Button></Link>
              </section>
            )}
          </main>

          <aside className="space-y-4">
            <RestaurantSummary restaurant={restaurant} />
            <SmallPanel icon={Utensils} title="Customer Dashboard" items={DASHBOARD_FEATURES} />
            <SmallPanel icon={Clock} title="Restaurant Partner Tools" items={PARTNER_TOOLS} />
            <SmallPanel icon={QrCode} title="Automated Guest Updates" items={["Booking confirmation", "Payment confirmation", "24-hour reminder", "2-hour reminder", "Review request"]} />
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}

function RestaurantSummary({ restaurant }: { restaurant: (typeof RESTAURANTS)[number] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <img src={restaurant.image} alt={restaurant.name} className="h-44 w-full object-cover" loading="lazy" decoding="async" />
      <div className="p-5">
        <h2 className="text-xl font-extrabold text-foreground">{restaurant.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{restaurant.cuisine}</p>
        <div className="mt-3 flex flex-wrap gap-2">{restaurant.badges.map((badge) => <Badge key={badge} variant="outline">{badge}</Badge>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <span className="text-muted-foreground">Hours</span><span className="font-semibold text-foreground">{restaurant.hours}</span>
          <span className="text-muted-foreground">Price</span><span className="font-semibold text-foreground">{restaurant.price}</span>
          <span className="text-muted-foreground">Rating</span><span className="font-semibold text-foreground">{restaurant.rating}</span>
        </div>
      </div>
    </div>
  );
}

function FormBlock({ title, icon: Icon, children }: { title: string; icon: typeof CalendarCheck; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <div className="mb-5 flex items-center gap-2">
        <Icon size={22} className="text-primary" />
        <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
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

function CompactChecklist({ title, items, selected, onToggle }: { title: string; items: string[]; selected: string[]; onToggle: (item: string) => void }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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

function StepButtons({ back, next, disabled }: { back: () => void; next: () => void; disabled: boolean }) {
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={back} className="flex-1"><ChevronLeft size={16} className="mr-1" />Back</Button>
      <Button disabled={disabled} onClick={next} className="flex-1 bg-primary text-primary-foreground">Continue</Button>
    </div>
  );
}

function SmallPanel({ icon: Icon, title, items }: { icon: typeof Utensils; title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={18} className="text-primary" />
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
      </div>
    </div>
  );
}
