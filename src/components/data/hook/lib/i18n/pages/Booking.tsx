import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  FileText,
  HeartHandshake,
  Hotel,
  Plane,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { SAMPLE_FARMS } from "@/data/sampleData";

const ACCOMMODATION_CATALOG = [
  "Entire Farm House",
  "Family Farm House",
  "Luxury Farm Villa",
  "Traditional Farm Cottage",
  "Standard Cottage",
  "Deluxe Cottage",
  "Wooden Cabin",
  "Lake View Cabin",
  "Luxury Safari Tent",
  "Glamping Tent",
  "Premium Camping Pitch",
  "Mixed Dormitory",
  "Family Room",
  "Luxury Tree House",
  "Eco Suite",
  "Barn Stay",
  "Tiny House",
  "Floating Farm Cabin",
];

const PURPOSES = [
  "Leisure",
  "Holiday",
  "Business",
  "Honeymoon",
  "Family Vacation",
  "School Tour",
  "Agricultural Training",
  "Farm Experience",
  "Retreat",
  "Conference",
  "Photography",
  "Bird Watching",
  "Volunteer",
  "Research",
];

const MEAL_PLANS = ["Room Only", "Bed & Breakfast", "Half Board", "Full Board", "All Inclusive", "Farm Fresh Meals", "Organic Meals", "Vegetarian", "Vegan", "Halal", "Gluten Free"];
const FARM_EXPERIENCES = ["Dairy Farm Tour", "Poultry Tour", "Fish Farming", "Goat Farming", "Apiary Visit", "Greenhouse Tour", "Coffee Tour", "Tea Tour", "Fruit Orchard Tour", "Vegetable Harvest"];
const ACTIVITIES = ["Horse Riding", "Tractor Ride", "Nature Walk", "Hiking", "Cycling", "Canoeing", "Fishing", "Bird Watching", "Camp Fire", "BBQ Night", "Cultural Dance", "Traditional Cooking", "Fruit Picking", "Milking Cows", "Egg Collection", "Tree Planting"];
const EXTRAS = ["Baby Cot", "Extra Bed", "Laundry", "Spa", "Swimming Pool", "Gym", "WiFi", "Conference Room", "BBQ Equipment", "Bicycle Rental", "Fishing Equipment", "Horse Rental"];
const ROOM_PREFERENCES = ["Ground Floor", "Upper Floor", "Lake View", "Garden View", "Farm View", "Quiet Area", "Near Restaurant", "Pet Friendly"];
const DOCUMENTS = ["Passport", "National ID", "Visa", "Vaccination Card", "Travel Insurance", "Digital Signature"];
const CHECK_IN = ["Identity Verified", "Payment Confirmed", "Room Assigned", "Welcome Drink", "Farm Orientation", "Safety Briefing", "Keys Issued", "WiFi Password Shared"];
const CHECK_OUT = ["Room Inspection", "Keys Returned", "Outstanding Balance Cleared", "Feedback Collected", "Next Visit Discount Issued"];
const HOST_KPIS = ["Total Bookings", "Occupancy Rate", "Available Units", "Check-ins Today", "Check-outs Today", "Revenue", "Average Length of Stay", "Guest Satisfaction", "Repeat Guests", "Cancellation Rate"];
const GUEST_NOTIFICATIONS = ["Booking confirmation", "Deposit payment reminder", "Pre-arrival information", "Check-in reminder", "Daily activity schedule", "Weather updates", "Review request"];
const HOST_NOTIFICATIONS = ["New booking received", "Payment received", "Guest special request", "Upcoming arrival", "Housekeeping assignment", "Maintenance issue reported", "Overbooking warning"];

type Step = 1 | 2 | 3 | 4 | 5;

export default function BookingPage() {
  const { farmId } = useParams();
  const farm = SAMPLE_FARMS.find((f) => f.id === farmId) || SAMPLE_FARMS[0];
  const accommodationOptions = Array.from(new Set([...farm.accommodationTypes, ...ACCOMMODATION_CATALOG]));

  const [step, setStep] = useState<Step>(1);
  const bookingRef = useMemo(() => `A2H-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, []);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    arrivalTime: "",
    departureTime: "",
    adults: 2,
    children: 0,
    infants: 0,
    accommodationType: farm.accommodationTypes[0] || ACCOMMODATION_CATALOG[0],
    roomNumber: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
    idNumber: "",
    homeAddress: "",
    emergencyContact: "",
    purpose: "Farm Experience",
    mealPlan: "Farm Fresh Meals",
    bedPreference: "Queen",
    paymentMethod: "Mobile Money",
    paymentStatus: "Pending",
    transportRequired: false,
    vehicleType: "SUV",
    arrivalFlight: "",
    departureFlight: "",
    selectedExperiences: [] as string[],
    selectedActivities: [] as string[],
    selectedExtras: [] as string[],
    selectedPreferences: [] as string[],
    uploadedDocuments: [] as string[],
    specialNeeds: "",
    specialRequests: "",
    dietaryRequirements: "",
    allergyInformation: "",
  });

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const totalGuests = form.adults + form.children + form.infants;
  const experienceTotal = (form.selectedExperiences.length + form.selectedActivities.length) * 18;
  const extrasTotal = form.selectedExtras.length * 12;
  const subtotal = nights * farm.pricePerNight * Math.max(form.adults + form.children, 1);
  const taxes = Math.round((subtotal + experienceTotal + extrasTotal) * 0.08);
  const total = subtotal + experienceTotal + extrasTotal + taxes;

  const update = (field: string, value: string | number | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleList = (field: keyof typeof form, value: string) => {
    const current = form[field];
    if (!Array.isArray(current)) return;
    update(field, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const steps = [
    { id: 1, label: "Stay", icon: CalendarCheck },
    { id: 2, label: "Guests", icon: User },
    { id: 3, label: "Packages", icon: HeartHandshake },
    { id: 4, label: "Review", icon: ClipboardList },
  ];

  const handleConfirm = () => {
    const booking = {
      ...form,
      farmId: farm.id,
      farmName: farm.name,
      numGuests: totalGuests,
      bookingRef,
      bookingStatus: "Reserved",
      amountPaid: 0,
      balance: total,
      taxes,
      createdAt: new Date().toISOString(),
    };
    const saved = JSON.parse(localStorage.getItem("agri2rist_bookings") || "[]");
    localStorage.setItem("agri2rist_bookings", JSON.stringify([...saved, booking]));
    setStep(5);
  };

  return (
    <PageLayout>
      <div className="bg-muted border-b border-border py-3">
        <div className="container mx-auto px-4">
          <Link
            to={`/farm/${farm.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            Back to {farm.name}
          </Link>
        </div>
      </div>

      {step < 5 && (
        <div className="bg-primary py-8">
          <div className="container mx-auto px-4">
            <Badge className="mb-3 bg-secondary text-secondary-foreground">Guest booking module</Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-6">
              Reserve <span className="text-secondary">{farm.name}</span>
            </h1>
            <div className="flex gap-2 md:gap-6 overflow-x-auto pb-1">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 shrink-0">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm transition-colors ${
                      step >= s.id
                        ? "bg-secondary border-secondary text-secondary-foreground"
                        : "border-primary-foreground/40 text-primary-foreground/40"
                    }`}
                  >
                    {step > s.id ? <CheckCircle size={16} /> : s.id}
                  </div>
                  <span
                    className={`hidden md:block text-sm font-medium ${
                      step >= s.id ? "text-secondary" : "text-primary-foreground/40"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && <div className="w-8 md:w-16 h-0.5 bg-primary-foreground/20 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="py-10 bg-background">
        <div className="container mx-auto px-4">
          {step === 5 ? (
            <Confirmation
              farmName={farm.name}
              bookingRef={bookingRef}
              form={form}
              total={total}
              nights={nights}
              totalGuests={totalGuests}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                {step === 1 && (
                  <Section title="Stay Information" icon={Hotel}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Check-in Date" id="checkIn">
                        <Input
                          id="checkIn"
                          type="date"
                          value={form.checkIn}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => update("checkIn", e.target.value)}
                        />
                      </Field>
                      <Field label="Check-out Date" id="checkOut">
                        <Input
                          id="checkOut"
                          type="date"
                          value={form.checkOut}
                          min={form.checkIn || new Date().toISOString().split("T")[0]}
                          onChange={(e) => update("checkOut", e.target.value)}
                        />
                      </Field>
                      <Field label="Arrival Time" id="arrivalTime">
                        <Input id="arrivalTime" type="time" value={form.arrivalTime} onChange={(e) => update("arrivalTime", e.target.value)} />
                      </Field>
                      <Field label="Departure Time" id="departureTime">
                        <Input id="departureTime" type="time" value={form.departureTime} onChange={(e) => update("departureTime", e.target.value)} />
                      </Field>
                    </div>

                    <Field label="Accommodation Type" id="accommodationType">
                      <Select value={form.accommodationType} onValueChange={(value) => update("accommodationType", value)}>
                        <SelectTrigger id="accommodationType">
                          <SelectValue placeholder="Choose accommodation" />
                        </SelectTrigger>
                        <SelectContent>
                          {accommodationOptions.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <NumberField label="Adults" id="adults" value={form.adults} min={1} max={20} onChange={(value) => update("adults", value)} />
                      <NumberField label="Children" id="children" value={form.children} min={0} max={20} onChange={(value) => update("children", value)} />
                      <NumberField label="Infants" id="infants" value={form.infants} min={0} max={10} onChange={(value) => update("infants", value)} />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        className="bg-primary text-primary-foreground"
                        disabled={!form.checkIn || !form.checkOut || !form.accommodationType}
                        onClick={() => setStep(2)}
                      >
                        Continue <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Section>
                )}

                {step === 2 && (
                  <Section title="Guest Details" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" id="guestName">
                        <Input id="guestName" value={form.guestName} onChange={(e) => update("guestName", e.target.value)} placeholder="Primary guest full name" />
                      </Field>
                      <Field label="Email Address" id="guestEmail">
                        <Input id="guestEmail" type="email" value={form.guestEmail} onChange={(e) => update("guestEmail", e.target.value)} placeholder="you@example.com" />
                      </Field>
                      <Field label="Phone Number" id="guestPhone">
                        <Input id="guestPhone" type="tel" value={form.guestPhone} onChange={(e) => update("guestPhone", e.target.value)} placeholder="+256 7xx xxx xxx" />
                      </Field>
                      <Field label="Nationality" id="nationality">
                        <Input id="nationality" value={form.nationality} onChange={(e) => update("nationality", e.target.value)} placeholder="Nationality" />
                      </Field>
                      <Field label="Gender" id="gender">
                        <Select value={form.gender} onValueChange={(value) => update("gender", value)}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Female", "Male", "Non-binary", "Prefer not to say"].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Date of Birth" id="dateOfBirth">
                        <Input id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} />
                      </Field>
                      <Field label="National ID or Passport" id="idNumber">
                        <Input id="idNumber" value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} placeholder="ID or passport number" />
                      </Field>
                      <Field label="Emergency Contact" id="emergencyContact">
                        <Input id="emergencyContact" value={form.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} placeholder="Name and phone number" />
                      </Field>
                    </div>

                    <Field label="Home Address" id="homeAddress">
                      <Textarea id="homeAddress" value={form.homeAddress} onChange={(e) => update("homeAddress", e.target.value)} rows={2} className="resize-none" />
                    </Field>

                    <Field label="Special Needs" id="specialNeeds">
                      <Textarea id="specialNeeds" value={form.specialNeeds} onChange={(e) => update("specialNeeds", e.target.value)} placeholder="Mobility, medical, child care, or accessibility needs" rows={2} className="resize-none" />
                    </Field>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        className="flex-1 bg-primary text-primary-foreground"
                        disabled={!form.guestName || !form.guestEmail || !form.guestPhone}
                        onClick={() => setStep(3)}
                      >
                        Continue <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Section>
                )}

                {step === 3 && (
                  <Section title="Packages, Preferences, and Transport" icon={Plane}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Purpose of Visit" id="purpose">
                        <Select value={form.purpose} onValueChange={(value) => update("purpose", value)}>
                          <SelectTrigger id="purpose">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PURPOSES.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Meal Plan" id="mealPlan">
                        <Select value={form.mealPlan} onValueChange={(value) => update("mealPlan", value)}>
                          <SelectTrigger id="mealPlan">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MEAL_PLANS.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    <Checklist title="Farm Experience Packages" options={FARM_EXPERIENCES} selected={form.selectedExperiences} onToggle={(item) => toggleList("selectedExperiences", item)} />
                    <Checklist title="Activities" options={ACTIVITIES} selected={form.selectedActivities} onToggle={(item) => toggleList("selectedActivities", item)} />
                    <Checklist title="Booking Extras" options={EXTRAS} selected={form.selectedExtras} onToggle={(item) => toggleList("selectedExtras", item)} />
                    <Checklist title="Room Preferences" options={ROOM_PREFERENCES} selected={form.selectedPreferences} onToggle={(item) => toggleList("selectedPreferences", item)} />

                    <div className="rounded-lg border border-border p-4 space-y-4">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Checkbox checked={form.transportRequired} onCheckedChange={(checked) => update("transportRequired", Boolean(checked))} />
                        Airport pickup or farm transfer required
                      </label>
                      {form.transportRequired && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Field label="Vehicle Type" id="vehicleType">
                            <Select value={form.vehicleType} onValueChange={(value) => update("vehicleType", value)}>
                              <SelectTrigger id="vehicleType">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {["Sedan", "SUV", "Van", "Bus"].map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                          <Field label="Arrival Flight" id="arrivalFlight">
                            <Input id="arrivalFlight" value={form.arrivalFlight} onChange={(e) => update("arrivalFlight", e.target.value)} />
                          </Field>
                          <Field label="Departure Flight" id="departureFlight">
                            <Input id="departureFlight" value={form.departureFlight} onChange={(e) => update("departureFlight", e.target.value)} />
                          </Field>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Dietary Requirements" id="dietaryRequirements">
                        <Textarea id="dietaryRequirements" value={form.dietaryRequirements} onChange={(e) => update("dietaryRequirements", e.target.value)} rows={2} className="resize-none" />
                      </Field>
                      <Field label="Allergy Information" id="allergyInformation">
                        <Textarea id="allergyInformation" value={form.allergyInformation} onChange={(e) => update("allergyInformation", e.target.value)} rows={2} className="resize-none" />
                      </Field>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1 bg-primary text-primary-foreground" onClick={() => setStep(4)}>
                        Review Booking <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </Section>
                )}

                {step === 4 && (
                  <Section title="Payment, Documents, and Review" icon={CreditCard}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Payment Method" id="paymentMethod">
                        <Select value={form.paymentMethod} onValueChange={(value) => update("paymentMethod", value)}>
                          <SelectTrigger id="paymentMethod">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Cash", "Credit Card", "Mobile Money", "Bank Transfer", "Online Payment"].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Payment Status" id="paymentStatus">
                        <Select value={form.paymentStatus} onValueChange={(value) => update("paymentStatus", value)}>
                          <SelectTrigger id="paymentStatus">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Pending", "Deposit Paid", "Fully Paid", "Refunded"].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    <Checklist title="Digital Documents" options={DOCUMENTS} selected={form.uploadedDocuments} onToggle={(item) => toggleList("uploadedDocuments", item)} />

                    <Field label="Special Requests" id="specialRequests">
                      <Textarea id="specialRequests" value={form.specialRequests} onChange={(e) => update("specialRequests", e.target.value)} placeholder="Birthday decoration, anniversary package, accessibility requirements, or other notes" className="resize-none" rows={3} />
                    </Field>

                    <ReviewBlock
                      farmName={farm.name}
                      form={form}
                      nights={nights}
                      totalGuests={totalGuests}
                      subtotal={subtotal}
                      experienceTotal={experienceTotal}
                      extrasTotal={extrasTotal}
                      taxes={taxes}
                      total={total}
                    />

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-gold"
                        onClick={handleConfirm}
                      >
                        Confirm Reservation
                      </Button>
                    </div>
                  </Section>
                )}
              </div>

              <BookingSidebar farm={farm} nights={nights} total={total} totalGuests={totalGuests} />
            </div>
          )}
        </div>
      </div>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InfoPanel title="Check-in Checklist" icon={CheckCircle} items={CHECK_IN} />
          <InfoPanel title="Check-out Checklist" icon={FileText} items={CHECK_OUT} />
          <InfoPanel title="Host Dashboard KPIs" icon={ClipboardList} items={HOST_KPIS} />
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoPanel title="Guest Automated Notifications" icon={User} items={GUEST_NOTIFICATIONS} />
          <InfoPanel title="Host Automated Notifications" icon={Hotel} items={HOST_NOTIFICATIONS} />
        </div>
      </section>
    </PageLayout>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof CalendarCheck; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
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

function NumberField({ label, id, value, min, max, onChange }: { label: string; id: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <Field label={label} id={id}>
      <Input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || min)}
      />
    </Field>
  );
}

function Checklist({ title, options, selected, onToggle }: { title: string; options: string[]; selected: string[]; onToggle: (item: string) => void }) {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 rounded-lg border border-border p-2 text-sm">
            <Checkbox checked={selected.includes(option)} onCheckedChange={() => onToggle(option)} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

function ReviewBlock({
  farmName,
  form,
  nights,
  totalGuests,
  subtotal,
  experienceTotal,
  extrasTotal,
  taxes,
  total,
}: {
  farmName: string;
  form: Record<string, any>;
  nights: number;
  totalGuests: number;
  subtotal: number;
  experienceTotal: number;
  extrasTotal: number;
  taxes: number;
  total: number;
}) {
  const rows = [
    ["Farm", farmName],
    ["Stay", `${form.checkIn} to ${form.checkOut}`],
    ["Nights", nights.toString()],
    ["Guests", totalGuests.toString()],
    ["Accommodation", form.accommodationType],
    ["Purpose", form.purpose],
    ["Meal Plan", form.mealPlan],
    ["Transport", form.transportRequired ? `${form.vehicleType} requested` : "Not required"],
  ];

  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
        <h3 className="font-semibold text-foreground mb-3">Reservation Summary</h3>
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-foreground text-right">{value}</span>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2 text-sm">
        <PriceRow label="Accommodation" value={subtotal} />
        <PriceRow label="Experiences and activities" value={experienceTotal} />
        <PriceRow label="Extras" value={extrasTotal} />
        <PriceRow label="Taxes" value={taxes} />
        <div className="flex justify-between font-extrabold text-lg border-t border-primary/20 pt-2">
          <span className="text-foreground">Total Balance</span>
          <span className="text-primary">${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">${value.toLocaleString()}</span>
    </div>
  );
}

function BookingSidebar({ farm, nights, total, totalGuests }: { farm: (typeof SAMPLE_FARMS)[number]; nights: number; total: number; totalGuests: number }) {
  return (
    <div>
      <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-24">
        <img
          src={farm.image}
          alt={farm.name}
          loading="lazy"
          decoding="async"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-foreground mb-1">{farm.name}</h3>
          <p className="text-muted-foreground text-xs mb-3">{farm.location}</p>
          <div className="text-sm space-y-2 border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Per night</span>
              <span>${farm.pricePerNight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guests</span>
              <span>{totalGuests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nights</span>
              <span>{nights}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-border pt-2 mt-2">
              <span>Estimated Total</span>
              <span className="text-primary">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPanel({ title, icon: Icon, items }: { title: string; icon: typeof CalendarCheck; items: string[] }) {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-primary" />
        <h2 className="font-bold text-foreground">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="text-xs">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Confirmation({
  farmName,
  bookingRef,
  form,
  total,
  nights,
  totalGuests,
}: {
  farmName: string;
  bookingRef: string;
  form: Record<string, any>;
  total: number;
  nights: number;
  totalGuests: number;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-light mb-6">
        <CheckCircle size={40} className="text-accent" />
      </div>
      <h2 className="text-3xl font-extrabold text-foreground mb-2">Reservation Confirmed</h2>
      <p className="text-muted-foreground mb-6">
        Your stay at <strong>{farmName}</strong> has been saved with guest, package, transport, document, and payment details.
      </p>

      <div className="bg-card border border-border rounded-lg p-6 text-left mb-8">
        <div className="text-center mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Booking Reference</span>
          <div className="text-2xl font-extrabold text-primary">{bookingRef}</div>
        </div>
        <div className="space-y-2 text-sm">
          {[
            ["Guest", form.guestName],
            ["Stay", `${form.checkIn} to ${form.checkOut}`],
            ["Nights", nights.toString()],
            ["Guests", totalGuests.toString()],
            ["Accommodation", form.accommodationType],
            ["Meal Plan", form.mealPlan],
            ["Payment Status", form.paymentStatus],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium text-foreground text-right">{value}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-border pt-2 mt-2">
            <span className="font-bold text-foreground">Balance</span>
            <span className="font-bold text-primary">${total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/explore">
          <Button variant="outline" className="border-primary text-primary">
            Explore More Farms
          </Button>
        </Link>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
