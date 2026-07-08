import { useState, useMemo, useEffect, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Camera, Home, UtensilsCrossed, Tickets, Truck, FileText,
  GraduationCap, Wrench, MapPin, Star, Clock, Users,
  ChevronRight, ArrowRight, Leaf, ArrowLeft, Search,
  SlidersHorizontal, Sparkles, ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBooking } from "@/hooks/use-booking";
import { useAuth } from "@/hooks/use-auth";
import {
  BOOKING_CATEGORY_LABELS,
  type BookingCategory,
  type BookingItem,
} from "@/types/marketplace";
import { BOOKING_ITEMS } from "@/data/booking-catalog";

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<BookingCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  agritourism:         Camera,
  farm_stay:           Home,
  restaurant:          UtensilsCrossed,
  events_festivals:    Tickets,
  transportation:      Truck,
  digital_products:    FileText,
  education:           GraduationCap,
  agriculture_services:Wrench,
};

const ACCENT_MAP: Record<BookingCategory, string> = {
  agritourism:          "bg-green-50 text-green-700 border-green-200",
  farm_stay:            "bg-amber-50 text-amber-700 border-amber-200",
  restaurant:           "bg-orange-50 text-orange-700 border-orange-200",
  events_festivals:     "bg-purple-50 text-purple-700 border-purple-200",
  transportation:       "bg-sky-50 text-sky-700 border-sky-200",
  digital_products:     "bg-indigo-50 text-indigo-700 border-indigo-200",
  education:            "bg-teal-50 text-teal-700 border-teal-200",
  agriculture_services: "bg-lime-50 text-lime-700 border-lime-200",
};

const AVAILABILITY_STYLES: Record<string, string> = {
  available: "bg-green-100 text-green-700 border-green-200",
  limited:   "bg-amber-100 text-amber-700 border-amber-200",
  booked:    "bg-red-100 text-red-700 border-red-200",
};

const ALL_CATEGORIES = Object.keys(BOOKING_CATEGORY_LABELS) as BookingCategory[];

const TABLE_PREFERENCES = [
  "Indoor Dining", "Outdoor Dining", "Garden Restaurant", "Lake View", "Mountain View", "Private Dining", "VIP Table", "Family Table", "Romantic Table", "Business Meeting Table", "Wheelchair Accessible", "High Chair Required",
];
const OCCASIONS = [
  "Casual Dining", "Birthday", "Anniversary", "Business Meeting", "Wedding Dinner", "Honeymoon", "Family Gathering", "Corporate Dinner", "Private Dining", "Romantic Dinner",
];
const CUISINE_OPTIONS = [
  "African Cuisine", "Asian Fusion", "Italian", "French", "Mediterranean", "Seafood", "Vegetarian", "Local Delicacies", "Fine Dining", "Casual Dining",
];
const PAYMENT_OPTIONS = [
  "Pay at Restaurant", "Deposit Payment", "Full Payment", "Group Payment", "Corporate Billing", "Mobile Money", "Credit Card", "PayPal", "Bank Transfer",
];
const TRANSPORT_CATEGORIES = [
  "Road Transport", "Farm Vehicles", "Motorcycle Transport", "Bicycle Transport", "Water Transport", "Air Transport", "Animal Transport", "Walking Experience",
];
const VEHICLE_OPTIONS = [
  "Sedan", "SUV", "Pickup", "Luxury SUV", "Executive Vehicle", "Farm Pickup", "Tractor Ride", "UTV", "ATV", "Quad Bike", "Electric Farm Cart", "Motorcycle Taxi", "Off-road Motorcycle", "Mountain Bike", "Electric Bicycle", "Canoe", "Boat", "Motorboat", "Ferry", "Helicopter Charter", "Small Aircraft", "Horse", "Camel", "Donkey Cart", "Ox Cart", "Guided Walking Trail",
];
const ROAD_CONDITIONS = ["Excellent", "Good", "Fair", "Poor", "Under Construction", "Flooded", "Slippery", "Muddy", "Closed"];
const WEATHER_OPTIONS = ["Sunny", "Cloudy", "Light Rain", "Heavy Rain", "Thunderstorm", "Windy", "Fog", "Flood", "Extreme Heat"];
const ROUTE_DIFFICULTY_OPTIONS = ["Urban", "Rural", "Gravel", "Forest", "Mountain", "Wetland", "River Crossing", "Sandy"];
const TRIP_TYPES = ["One-way", "Round trip", "Multi-stop"];
const FARM_STAY_ACCOMMODATION_TYPES = [
  "Entire Farm House", "Family Farm House", "Luxury Farm Villa", "Traditional Farm Cottage", "Heritage Farm House",
  "Standard Cottage", "Deluxe Cottage", "Executive Cottage", "Honeymoon Cottage", "Eco Cottage",
  "Wooden Cabin", "Forest Cabin", "Lake View Cabin", "Mountain Cabin",
  "Standard Tent", "Luxury Safari Tent", "Glamping Tent",
  "Bring Your Own Tent", "Caravan Site", "Motorhome Site", "Premium Camping Pitch",
  "Male Dormitory", "Female Dormitory", "Mixed Dormitory", "Student Group Dormitory",
  "Standard Room", "Twin Room", "Double Room", "Queen Room", "King Room", "Family Room",
  "Single Tree House", "Family Tree House", "Luxury Tree House",
  "Eco Room", "Eco Suite", "Bamboo Lodge",
  "Barn Stay", "Shepherd's Hut", "Tiny House", "Floating Farm Cabin",
];
const FARM_STAY_PURPOSES = [
  "Leisure", "Holiday", "Business", "Honeymoon", "Family Vacation", "School Tour", "Agricultural Training", "Farm Experience", "Retreat", "Conference", "Photography", "Bird Watching", "Volunteer", "Research",
];
const FARM_STAY_MEAL_OPTIONS = [
  "Room Only", "Bed & Breakfast", "Half Board", "Full Board", "All Inclusive", "Farm Fresh Meals", "Organic Meals", "Vegetarian", "Vegan", "Halal", "Gluten Free",
];
const FARM_EXPERIENCE_OPTIONS = [
  "Dairy Farm Tour", "Poultry Tour", "Fish Farming", "Pig Farming", "Goat Farming", "Rabbit Farming", "Apiary Visit", "Greenhouse Tour", "Coffee Tour", "Cocoa Tour", "Tea Tour", "Fruit Orchard Tour", "Vegetable Harvest",
  "Horse Riding", "Tractor Ride", "Nature Walk", "Hiking", "Cycling", "Canoeing", "Fishing", "Bird Watching", "Camp Fire", "BBQ Night", "Cultural Dance", "Traditional Cooking", "Fruit Picking", "Milking Cows", "Egg Collection", "Tree Planting", "Farm Games",
];
const ROOM_PREFERENCE_OPTIONS = ["Ground Floor", "Upper Floor", "Lake View", "Garden View", "Farm View", "Quiet Area", "Near Restaurant"];
const BED_PREFERENCE_OPTIONS = ["King", "Queen", "Twin", "Double"];
const PAYMENT_STATUS_OPTIONS = ["Pending", "Deposit Paid", "Fully Paid", "Refunded"];
const BOOKING_EXTRA_OPTIONS = ["Baby Cot", "Extra Bed", "Laundry", "Spa", "Swimming Pool", "Gym", "WiFi", "Conference Room", "BBQ Equipment", "Bicycle Rental", "Fishing Equipment", "Horse Rental"];

// ── Booking Card ──────────────────────────────────────────────────────────────
function BookingCard({ item, onBook }: { item: BookingItem; onBook: (item: BookingItem) => void }) {
  return (
    <div className="group overflow-hidden rounded-[24px] border border-border/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "/locale/dairy.webp"; }}
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
            {BOOKING_CATEGORY_LABELS[item.bookingCategory]}
          </span>
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${AVAILABILITY_STYLES[item.availability]}`}>
            {item.availability === "available" ? "Available" : item.availability === "limited" ? "Limited" : "Booked"}
          </span>
        </div>
        {item.farmName && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
            <p className="truncate text-sm font-semibold text-white">{item.farmName}</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={13} fill="currentColor" />
            <span className="text-sm font-semibold text-foreground">{item.rating}</span>
            <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
          </div>
          {item.location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} /> {item.location}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-extrabold leading-snug text-foreground">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.entries(item.details).slice(0, 2).map(([k, v]) => (
            <span key={k} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              {k === "duration" && <Clock size={10} />}
              {(k === "groupSize" || k === "guests" || k === "passengers") && <Users size={10} />}
              {v}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-extrabold text-primary">{item.currency} {item.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">/ {item.unit}</p>
          </div>
          <Button
            size="sm"
            disabled={item.availability === "booked"}
            onClick={() => onBook(item)}
            className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            {item.availability === "booked" ? "Fully Booked" : "Book now"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function BookingFormOverlay({ item, onClose }: { item: BookingItem; onClose: () => void }) {
  const { createBooking } = useBooking();
  const { user } = useAuth();
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00", guests: 1, nights: 1, tickets: 1,
    country: "", city: "", nationality: "", age: "", gender: "",
    tablePreference: "Indoor Dining", occasion: "Casual Dining", cuisinePreferences: "",
    dietaryPreferences: "", allergies: "", accessibilityRequirements: "", specialRequests: "",
    vegetarian: false, vegan: false, halal: false, kosher: false, glutenFree: false, lactoseFree: false,
    organicMeals: false, childFriendly: false, petFriendly: false, wheelchairAccess: false,
    hearingAssistance: false, visionAssistance: false, prayerFacilities: false,
    pickupLocation: "", dropoffLocation: "", transportOption: "Self Drive",
    currentLocation: "", destinationFarm: "", transportCategory: "Road Transport", tripType: "One-way",
    preferredVehicle: "Sedan", distanceKm: 10, estimatedTravelTime: "20 mins", adults: 2, children: 0, seniors: 0,
    luggage: 1, pets: 0, accessibilityNeeds: "", roadCondition: "Good", weatherCondition: "Sunny", routeDifficulty: "Rural",
    emergencyContact: "", airConditioning: false, wifi: false, childSeat: false, femaleDriver: false,
    englishSpeakingDriver: false, localGuide: false, luxuryVehicle: false, farmGuideIncluded: false,
    accommodationType: "", mealPlan: "", activityPlan: "", equipmentRental: "",
    trainingTopic: "", serviceType: "",
    nationality: "", gender: "", dateOfBirth: "", nationalId: "", homeAddress: "", emergencyContact: "",
    adults: 2, children: 0, infants: 0, guestNames: "", specialNeeds: "",
    checkOutDate: "", arrivalTime: "", departureTime: "", roomNumber: "", occupancy: "", bookingReference: "",
    purposeOfVisit: "Leisure", farmExperiencePackage: "", airportPickupRequired: "Not Required", vehicleType: "Sedan",
    driverName: "", vehicleRegistration: "", arrivalFlight: "", departureFlight: "",
    babyCot: false, extraBed: false, laundry: false, spa: false, swimmingPool: false, gym: false, wifi: false,
    conferenceRoom: false, bbqEquipment: false, bicycleRental: false, fishingEquipment: false, horseRental: false,
    paymentStatus: "Pending", invoiceNumber: "", receiptNumber: "", amountPaid: "", balance: "", discount: "", taxes: "",
    roomPreference: "", bedPreference: "", pillowPreference: "", smoking: false, petFriendly: false,
    notes: "",
    paymentMethod: "Pay at Restaurant",
    mobileNumber: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name || "", email: user.email || "" }));
    }
  }, [user]);

  useEffect(() => {
    setSuccessRef(null);
    setForm((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      guests: 1,
      nights: 1,
      tickets: 1,
      country: "",
      city: "",
      nationality: "",
      age: "",
      gender: "",
      tablePreference: "Indoor Dining",
      occasion: "Casual Dining",
      cuisinePreferences: "",
      dietaryPreferences: "",
      allergies: "",
      accessibilityRequirements: "",
      specialRequests: "",
      vegetarian: false,
      vegan: false,
      halal: false,
      kosher: false,
      glutenFree: false,
      lactoseFree: false,
      organicMeals: false,
      childFriendly: false,
      petFriendly: false,
      wheelchairAccess: false,
      hearingAssistance: false,
      visionAssistance: false,
      prayerFacilities: false,
      pickupLocation: "",
      dropoffLocation: "",
      transportOption: "Self Drive",
      currentLocation: "",
      destinationFarm: "",
      transportCategory: "Road Transport",
      tripType: "One-way",
      preferredVehicle: "Sedan",
      distanceKm: 10,
      estimatedTravelTime: "20 mins",
      adults: 2,
      children: 0,
      seniors: 0,
      luggage: 1,
      pets: 0,
      accessibilityNeeds: "",
      roadCondition: "Good",
      weatherCondition: "Sunny",
      routeDifficulty: "Rural",
      emergencyContact: "",
      airConditioning: false,
      wifi: false,
      childSeat: false,
      femaleDriver: false,
      englishSpeakingDriver: false,
      localGuide: false,
      luxuryVehicle: false,
      farmGuideIncluded: false,
      accommodationType: "",
      mealPlan: "",
      activityPlan: "",
      equipmentRental: "",
      trainingTopic: "",
      serviceType: "",
      nationality: "",
      gender: "",
      dateOfBirth: "",
      nationalId: "",
      homeAddress: "",
      emergencyContact: "",
      adults: 2,
      children: 0,
      infants: 0,
      guestNames: "",
      specialNeeds: "",
      checkOutDate: "",
      arrivalTime: "",
      departureTime: "",
      roomNumber: "",
      occupancy: "",
      bookingReference: "",
      purposeOfVisit: "Leisure",
      farmExperiencePackage: "",
      airportPickupRequired: "Not Required",
      vehicleType: "Sedan",
      driverName: "",
      vehicleRegistration: "",
      arrivalFlight: "",
      departureFlight: "",
      babyCot: false,
      extraBed: false,
      laundry: false,
      spa: false,
      swimmingPool: false,
      gym: false,
      wifi: false,
      conferenceRoom: false,
      bbqEquipment: false,
      bicycleRental: false,
      fishingEquipment: false,
      horseRental: false,
      paymentStatus: "Pending",
      invoiceNumber: "",
      receiptNumber: "",
      amountPaid: "",
      balance: "",
      discount: "",
      taxes: "",
      roomPreference: "",
      bedPreference: "",
      pillowPreference: "",
      smoking: false,
      petFriendly: false,
      notes: "",
      paymentMethod: "Pay at Restaurant",
      mobileNumber: "",
    }));
  }, [item.id]);

  const up = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const qty = item.bookingCategory === "transportation"
    ? Math.max(1, form.adults + form.children + form.seniors)
    : item.unit === "night" ? form.nights
    : item.unit === "ticket" ? form.tickets
    : form.guests;

  const subtotal = item.price * (qty || 1);
  const fee = Math.round(subtotal * 0.025);
  const total = subtotal + fee;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const booking = createBooking(item, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      nights: form.nights,
      tickets: form.tickets,
      country: form.country,
      city: form.city,
      nationality: form.nationality,
      age: form.age,
      gender: form.gender,
      tablePreference: form.tablePreference,
      occasion: form.occasion,
      cuisinePreferences: form.cuisinePreferences,
      dietaryPreferences: form.dietaryPreferences,
      allergies: form.allergies,
      accessibilityRequirements: form.accessibilityRequirements,
      specialRequests: form.specialRequests,
      vegetarian: form.vegetarian,
      vegan: form.vegan,
      halal: form.halal,
      kosher: form.kosher,
      glutenFree: form.glutenFree,
      lactoseFree: form.lactoseFree,
      organicMeals: form.organicMeals,
      childFriendly: form.childFriendly,
      petFriendly: form.petFriendly,
      wheelchairAccess: form.wheelchairAccess,
      hearingAssistance: form.hearingAssistance,
      visionAssistance: form.visionAssistance,
      prayerFacilities: form.prayerFacilities,
      pickupLocation: form.pickupLocation,
      dropoffLocation: form.dropoffLocation,
      transportOption: form.transportOption,
      currentLocation: form.currentLocation,
      destinationFarm: form.destinationFarm,
      transportCategory: form.transportCategory,
      tripType: form.tripType,
      preferredVehicle: form.preferredVehicle,
      distanceKm: form.distanceKm,
      estimatedTravelTime: form.estimatedTravelTime,
      adults: form.adults,
      children: form.children,
      seniors: form.seniors,
      luggage: form.luggage,
      pets: form.pets,
      accessibilityNeeds: form.accessibilityNeeds,
      roadCondition: form.roadCondition,
      weatherCondition: form.weatherCondition,
      routeDifficulty: form.routeDifficulty,
      emergencyContact: form.emergencyContact,
      airConditioning: form.airConditioning,
      wifi: form.wifi,
      childSeat: form.childSeat,
      femaleDriver: form.femaleDriver,
      englishSpeakingDriver: form.englishSpeakingDriver,
      localGuide: form.localGuide,
      luxuryVehicle: form.luxuryVehicle,
      farmGuideIncluded: form.farmGuideIncluded,
      accommodationType: form.accommodationType,
      mealPlan: form.mealPlan,
      activityPlan: form.activityPlan,
      equipmentRental: form.equipmentRental,
      trainingTopic: form.trainingTopic,
      serviceType: form.serviceType,
      nationality: form.nationality,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
      nationalId: form.nationalId,
      homeAddress: form.homeAddress,
      emergencyContact: form.emergencyContact,
      adults: form.adults,
      children: form.children,
      infants: form.infants,
      guestNames: form.guestNames,
      specialNeeds: form.specialNeeds,
      checkOutDate: form.checkOutDate,
      arrivalTime: form.arrivalTime,
      departureTime: form.departureTime,
      roomNumber: form.roomNumber,
      occupancy: form.occupancy,
      bookingReference: form.bookingReference,
      purposeOfVisit: form.purposeOfVisit,
      farmExperiencePackage: form.farmExperiencePackage,
      airportPickupRequired: form.airportPickupRequired,
      vehicleType: form.vehicleType,
      driverName: form.driverName,
      vehicleRegistration: form.vehicleRegistration,
      arrivalFlight: form.arrivalFlight,
      departureFlight: form.departureFlight,
      babyCot: form.babyCot,
      extraBed: form.extraBed,
      laundry: form.laundry,
      spa: form.spa,
      swimmingPool: form.swimmingPool,
      gym: form.gym,
      wifi: form.wifi,
      conferenceRoom: form.conferenceRoom,
      bbqEquipment: form.bbqEquipment,
      bicycleRental: form.bicycleRental,
      fishingEquipment: form.fishingEquipment,
      horseRental: form.horseRental,
      paymentStatus: form.paymentStatus,
      invoiceNumber: form.invoiceNumber,
      receiptNumber: form.receiptNumber,
      amountPaid: form.amountPaid,
      balance: form.balance,
      discount: form.discount,
      taxes: form.taxes,
      roomPreference: form.roomPreference,
      bedPreference: form.bedPreference,
      pillowPreference: form.pillowPreference,
      smoking: form.smoking,
      petFriendly: form.petFriendly,
      notes: form.notes,
    }, form.paymentMethod);
    setSuccessRef(booking.bookingRef);
  };

  return (
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background shadow-2xl">
      <div className="flex items-start justify-between gap-3 border-b border-border bg-primary px-5 py-4 text-primary-foreground">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70">Book service</p>
          <h3 className="text-lg font-extrabold">{item.name}</h3>
          {item.farmName ? <p className="text-sm text-primary-foreground/80">{item.farmName}</p> : null}
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-primary-foreground/20 p-2 text-primary-foreground/80 transition hover:bg-primary-foreground/10 hover:text-primary-foreground">
          ×
        </button>
      </div>

      <div className="space-y-4 p-5">
        {successRef ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            Booking confirmed: <strong>{successRef}</strong>
          </div>
        ) : null}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={`overlay-name-${item.id}`} className="mb-1 block text-xs font-semibold">Full name</Label>
              <Input id={`overlay-name-${item.id}`} value={form.name} onChange={(e) => up("name", e.target.value)} placeholder="Full name" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-phone-${item.id}`} className="mb-1 block text-xs font-semibold">Mobile number</Label>
              <Input id={`overlay-phone-${item.id}`} value={form.phone} onChange={(e) => up("phone", e.target.value)} placeholder="+256 7XX XXX XXX" className="h-10 rounded-xl" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`overlay-email-${item.id}`} className="mb-1 block text-xs font-semibold">Email</Label>
              <Input id={`overlay-email-${item.id}`} type="email" value={form.email} onChange={(e) => up("email", e.target.value)} placeholder="you@example.com" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-country-${item.id}`} className="mb-1 block text-xs font-semibold">Country</Label>
              <Input id={`overlay-country-${item.id}`} value={form.country} onChange={(e) => up("country", e.target.value)} placeholder="Uganda" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-city-${item.id}`} className="mb-1 block text-xs font-semibold">City</Label>
              <Input id={`overlay-city-${item.id}`} value={form.city} onChange={(e) => up("city", e.target.value)} placeholder="Kampala" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-nationality-${item.id}`} className="mb-1 block text-xs font-semibold">Nationality</Label>
              <Input id={`overlay-nationality-${item.id}`} value={form.nationality} onChange={(e) => up("nationality", e.target.value)} placeholder="Ugandan" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-age-${item.id}`} className="mb-1 block text-xs font-semibold">Age</Label>
              <Input id={`overlay-age-${item.id}`} value={form.age} onChange={(e) => up("age", e.target.value)} placeholder="32" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-gender-${item.id}`} className="mb-1 block text-xs font-semibold">Gender</Label>
              <Input id={`overlay-gender-${item.id}`} value={form.gender} onChange={(e) => up("gender", e.target.value)} placeholder="Female" className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-date-${item.id}`} className="mb-1 block text-xs font-semibold">Visit date</Label>
              <Input id={`overlay-date-${item.id}`} type="date" value={form.date} onChange={(e) => up("date", e.target.value)} className="h-10 rounded-xl" />
            </div>
            <div>
              <Label htmlFor={`overlay-time-${item.id}`} className="mb-1 block text-xs font-semibold">Preferred time</Label>
              <Input id={`overlay-time-${item.id}`} type="time" value={form.time} onChange={(e) => up("time", e.target.value)} className="h-10 rounded-xl" />
            </div>
          </div>

          {(item.bookingCategory === "restaurant" || item.bookingCategory === "agritourism" || item.bookingCategory === "farm_stay") && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor={`overlay-table-${item.id}`} className="mb-1 block text-xs font-semibold">Table preference</Label>
                <Select value={form.tablePreference} onValueChange={(value) => up("tablePreference", value)}>
                  <SelectTrigger id={`overlay-table-${item.id}`}><SelectValue placeholder="Select table" /></SelectTrigger>
                  <SelectContent>{TABLE_PREFERENCES.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-occasion-${item.id}`} className="mb-1 block text-xs font-semibold">Occasion</Label>
                <Select value={form.occasion} onValueChange={(value) => up("occasion", value)}>
                  <SelectTrigger id={`overlay-occasion-${item.id}`}><SelectValue placeholder="Select occasion" /></SelectTrigger>
                  <SelectContent>{OCCASIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-cuisine-${item.id}`} className="mb-1 block text-xs font-semibold">Cuisine preference</Label>
                <Select value={form.cuisinePreferences} onValueChange={(value) => up("cuisinePreferences", value)}>
                  <SelectTrigger id={`overlay-cuisine-${item.id}`}><SelectValue placeholder="Select cuisine" /></SelectTrigger>
                  <SelectContent>{CUISINE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-dietary-${item.id}`} className="mb-1 block text-xs font-semibold">Dietary preferences</Label>
                <Input id={`overlay-dietary-${item.id}`} value={form.dietaryPreferences} onChange={(e) => up("dietaryPreferences", e.target.value)} placeholder="Vegetarian, halal, etc." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-allergies-${item.id}`} className="mb-1 block text-xs font-semibold">Allergies</Label>
                <Input id={`overlay-allergies-${item.id}`} value={form.allergies} onChange={(e) => up("allergies", e.target.value)} placeholder="Peanuts, gluten, etc." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-accessibility-${item.id}`} className="mb-1 block text-xs font-semibold">Accessibility needs</Label>
                <Input id={`overlay-accessibility-${item.id}`} value={form.accessibilityRequirements} onChange={(e) => up("accessibilityRequirements", e.target.value)} placeholder="Wheelchair access, etc." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-transport-${item.id}`} className="mb-1 block text-xs font-semibold">Transport option</Label>
                <Select value={form.transportOption} onValueChange={(value) => up("transportOption", value)}>
                  <SelectTrigger id={`overlay-transport-${item.id}`}><SelectValue placeholder="Select transport" /></SelectTrigger>
                  <SelectContent>
                    {['Self Drive','Shuttle','Airport Pickup','Bus','Taxi','Bicycle','Walking Trail'].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-accommodation-${item.id}`} className="mb-1 block text-xs font-semibold">Accommodation type</Label>
                <Input id={`overlay-accommodation-${item.id}`} value={form.accommodationType} onChange={(e) => up("accommodationType", e.target.value)} placeholder="Lodge, cottage, glamping..." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-meal-${item.id}`} className="mb-1 block text-xs font-semibold">Meal package</Label>
                <Input id={`overlay-meal-${item.id}`} value={form.mealPlan} onChange={(e) => up("mealPlan", e.target.value)} placeholder="Breakfast, lunch, BBQ..." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-activity-${item.id}`} className="mb-1 block text-xs font-semibold">Activity plan</Label>
                <Input id={`overlay-activity-${item.id}`} value={form.activityPlan} onChange={(e) => up("activityPlan", e.target.value)} placeholder="Milking, harvesting, yoga..." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-equipment-${item.id}`} className="mb-1 block text-xs font-semibold">Equipment rental</Label>
                <Input id={`overlay-equipment-${item.id}`} value={form.equipmentRental} onChange={(e) => up("equipmentRental", e.target.value)} placeholder="Boots, helmet, binoculars" className="h-10 rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor={`overlay-special-${item.id}`} className="mb-1 block text-xs font-semibold">Special requests</Label>
                <Textarea id={`overlay-special-${item.id}`} rows={3} value={form.specialRequests} onChange={(e) => up("specialRequests", e.target.value)} placeholder="Any special arrangements" className="rounded-xl resize-none" />
              </div>
            </div>
          )}

          {item.bookingCategory === "farm_stay" ? (
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor={`overlay-nights-${item.id}`} className="mb-1 block text-xs font-semibold">Nights</Label>
                  <Input id={`overlay-nights-${item.id}`} type="number" min={1} max={30} value={String(form.nights)} onChange={(e) => up("nights", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-checkout-${item.id}`} className="mb-1 block text-xs font-semibold">Check-out date</Label>
                  <Input id={`overlay-checkout-${item.id}`} type="date" value={form.checkOutDate} onChange={(e) => up("checkOutDate", e.target.value)} className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-accommodation-${item.id}`} className="mb-1 block text-xs font-semibold">Accommodation type</Label>
                  <Select value={form.accommodationType} onValueChange={(value) => up("accommodationType", value)}>
                    <SelectTrigger id={`overlay-accommodation-${item.id}`}><SelectValue placeholder="Select accommodation" /></SelectTrigger>
                    <SelectContent>{FARM_STAY_ACCOMMODATION_TYPES.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-room-number-${item.id}`} className="mb-1 block text-xs font-semibold">Room / cottage number</Label>
                  <Input id={`overlay-room-number-${item.id}`} value={form.roomNumber} onChange={(e) => up("roomNumber", e.target.value)} placeholder="A12" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-occupancy-${item.id}`} className="mb-1 block text-xs font-semibold">Occupancy</Label>
                  <Input id={`overlay-occupancy-${item.id}`} value={form.occupancy} onChange={(e) => up("occupancy", e.target.value)} placeholder="2 adults / 1 child" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-reference-${item.id}`} className="mb-1 block text-xs font-semibold">Booking reference</Label>
                  <Input id={`overlay-reference-${item.id}`} value={form.bookingReference} onChange={(e) => up("bookingReference", e.target.value)} placeholder="Ref" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-arrival-time-${item.id}`} className="mb-1 block text-xs font-semibold">Arrival time</Label>
                  <Input id={`overlay-arrival-time-${item.id}`} type="time" value={form.arrivalTime} onChange={(e) => up("arrivalTime", e.target.value)} className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-departure-time-${item.id}`} className="mb-1 block text-xs font-semibold">Departure time</Label>
                  <Input id={`overlay-departure-time-${item.id}`} type="time" value={form.departureTime} onChange={(e) => up("departureTime", e.target.value)} className="h-10 rounded-xl" />
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white/70 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Guest details</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`overlay-nationality-${item.id}`} className="mb-1 block text-xs font-semibold">Nationality</Label>
                    <Input id={`overlay-nationality-${item.id}`} value={form.nationality} onChange={(e) => up("nationality", e.target.value)} placeholder="Ugandan" className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-gender-${item.id}`} className="mb-1 block text-xs font-semibold">Gender</Label>
                    <Input id={`overlay-gender-${item.id}`} value={form.gender} onChange={(e) => up("gender", e.target.value)} placeholder="Female" className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-dob-${item.id}`} className="mb-1 block text-xs font-semibold">Date of birth</Label>
                    <Input id={`overlay-dob-${item.id}`} type="date" value={form.dateOfBirth} onChange={(e) => up("dateOfBirth", e.target.value)} className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-id-${item.id}`} className="mb-1 block text-xs font-semibold">National ID / Passport</Label>
                    <Input id={`overlay-id-${item.id}`} value={form.nationalId} onChange={(e) => up("nationalId", e.target.value)} placeholder="ID / passport" className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-address-${item.id}`} className="mb-1 block text-xs font-semibold">Home address</Label>
                    <Input id={`overlay-address-${item.id}`} value={form.homeAddress} onChange={(e) => up("homeAddress", e.target.value)} placeholder="Address" className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-emergency-${item.id}`} className="mb-1 block text-xs font-semibold">Emergency contact</Label>
                    <Input id={`overlay-emergency-${item.id}`} value={form.emergencyContact} onChange={(e) => up("emergencyContact", e.target.value)} placeholder="Name and phone" className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-adults-${item.id}`} className="mb-1 block text-xs font-semibold">Adults</Label>
                    <Input id={`overlay-adults-${item.id}`} type="number" min={1} value={String(form.adults)} onChange={(e) => up("adults", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-children-${item.id}`} className="mb-1 block text-xs font-semibold">Children</Label>
                    <Input id={`overlay-children-${item.id}`} type="number" min={0} value={String(form.children)} onChange={(e) => up("children", Number(e.target.value) || 0)} className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-infants-${item.id}`} className="mb-1 block text-xs font-semibold">Infants</Label>
                    <Input id={`overlay-infants-${item.id}`} type="number" min={0} value={String(form.infants)} onChange={(e) => up("infants", Number(e.target.value) || 0)} className="h-10 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor={`overlay-guests-${item.id}`} className="mb-1 block text-xs font-semibold">Guest names</Label>
                    <Input id={`overlay-guests-${item.id}`} value={form.guestNames} onChange={(e) => up("guestNames", e.target.value)} placeholder="Optional guest list" className="h-10 rounded-xl" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`overlay-special-needs-${item.id}`} className="mb-1 block text-xs font-semibold">Special needs</Label>
                    <Input id={`overlay-special-needs-${item.id}`} value={form.specialNeeds} onChange={(e) => up("specialNeeds", e.target.value)} placeholder="Accessibility, dietary needs, etc." className="h-10 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor={`overlay-purpose-${item.id}`} className="mb-1 block text-xs font-semibold">Purpose of visit</Label>
                  <Select value={form.purposeOfVisit} onValueChange={(value) => up("purposeOfVisit", value)}>
                    <SelectTrigger id={`overlay-purpose-${item.id}`}><SelectValue placeholder="Purpose" /></SelectTrigger>
                    <SelectContent>{FARM_STAY_PURPOSES.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-meal-${item.id}`} className="mb-1 block text-xs font-semibold">Meal plan</Label>
                  <Select value={form.mealPlan} onValueChange={(value) => up("mealPlan", value)}>
                    <SelectTrigger id={`overlay-meal-${item.id}`}><SelectValue placeholder="Meal plan" /></SelectTrigger>
                    <SelectContent>{FARM_STAY_MEAL_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-experience-${item.id}`} className="mb-1 block text-xs font-semibold">Farm experience package</Label>
                  <Select value={form.farmExperiencePackage} onValueChange={(value) => up("farmExperiencePackage", value)}>
                    <SelectTrigger id={`overlay-experience-${item.id}`}><SelectValue placeholder="Choose package" /></SelectTrigger>
                    <SelectContent>{FARM_EXPERIENCE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-airport-${item.id}`} className="mb-1 block text-xs font-semibold">Airport pickup</Label>
                  <Select value={form.airportPickupRequired} onValueChange={(value) => up("airportPickupRequired", value)}>
                    <SelectTrigger id={`overlay-airport-${item.id}`}><SelectValue placeholder="Airport pickup" /></SelectTrigger>
                    <SelectContent>{["Required", "Not Required"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-vehicle-type-${item.id}`} className="mb-1 block text-xs font-semibold">Vehicle type</Label>
                  <Select value={form.vehicleType} onValueChange={(value) => up("vehicleType", value)}>
                    <SelectTrigger id={`overlay-vehicle-type-${item.id}`}><SelectValue placeholder="Vehicle" /></SelectTrigger>
                    <SelectContent>{["Sedan", "SUV", "Van", "Bus"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-driver-${item.id}`} className="mb-1 block text-xs font-semibold">Driver name</Label>
                  <Input id={`overlay-driver-${item.id}`} value={form.driverName} onChange={(e) => up("driverName", e.target.value)} placeholder="Driver name" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-vehicle-reg-${item.id}`} className="mb-1 block text-xs font-semibold">Vehicle registration</Label>
                  <Input id={`overlay-vehicle-reg-${item.id}`} value={form.vehicleRegistration} onChange={(e) => up("vehicleRegistration", e.target.value)} placeholder="Plate number" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-arrival-flight-${item.id}`} className="mb-1 block text-xs font-semibold">Arrival flight</Label>
                  <Input id={`overlay-arrival-flight-${item.id}`} value={form.arrivalFlight} onChange={(e) => up("arrivalFlight", e.target.value)} placeholder="Flight number" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-departure-flight-${item.id}`} className="mb-1 block text-xs font-semibold">Departure flight</Label>
                  <Input id={`overlay-departure-flight-${item.id}`} value={form.departureFlight} onChange={(e) => up("departureFlight", e.target.value)} placeholder="Flight number" className="h-10 rounded-xl" />
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white/70 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Booking extras</p>
                <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
                  {BOOKING_EXTRA_OPTIONS.map((option) => {
                    const key = option.toLowerCase().replace(/[^a-z0-9]+/g, "");
                    return (
                      <label key={option} className="flex items-center gap-2 rounded-lg bg-white/80 px-2 py-2 text-xs text-foreground">
                        <input type="checkbox" checked={Boolean(form[key as keyof typeof form])} onChange={(e) => up(key as keyof typeof form, e.target.checked as never)} className="h-4 w-4 rounded border-border" />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor={`overlay-payment-status-${item.id}`} className="mb-1 block text-xs font-semibold">Payment status</Label>
                  <Select value={form.paymentStatus} onValueChange={(value) => up("paymentStatus", value)}>
                    <SelectTrigger id={`overlay-payment-status-${item.id}`}><SelectValue placeholder="Payment status" /></SelectTrigger>
                    <SelectContent>{PAYMENT_STATUS_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-invoice-${item.id}`} className="mb-1 block text-xs font-semibold">Invoice number</Label>
                  <Input id={`overlay-invoice-${item.id}`} value={form.invoiceNumber} onChange={(e) => up("invoiceNumber", e.target.value)} placeholder="INV-001" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-receipt-${item.id}`} className="mb-1 block text-xs font-semibold">Receipt number</Label>
                  <Input id={`overlay-receipt-${item.id}`} value={form.receiptNumber} onChange={(e) => up("receiptNumber", e.target.value)} placeholder="RCPT-001" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-amount-paid-${item.id}`} className="mb-1 block text-xs font-semibold">Amount paid</Label>
                  <Input id={`overlay-amount-paid-${item.id}`} value={form.amountPaid} onChange={(e) => up("amountPaid", e.target.value)} placeholder="0" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-balance-${item.id}`} className="mb-1 block text-xs font-semibold">Balance</Label>
                  <Input id={`overlay-balance-${item.id}`} value={form.balance} onChange={(e) => up("balance", e.target.value)} placeholder="0" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-discount-${item.id}`} className="mb-1 block text-xs font-semibold">Discount</Label>
                  <Input id={`overlay-discount-${item.id}`} value={form.discount} onChange={(e) => up("discount", e.target.value)} placeholder="0" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-taxes-${item.id}`} className="mb-1 block text-xs font-semibold">Taxes</Label>
                  <Input id={`overlay-taxes-${item.id}`} value={form.taxes} onChange={(e) => up("taxes", e.target.value)} placeholder="0" className="h-10 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor={`overlay-room-pref-${item.id}`} className="mb-1 block text-xs font-semibold">Room preference</Label>
                  <Select value={form.roomPreference} onValueChange={(value) => up("roomPreference", value)}>
                    <SelectTrigger id={`overlay-room-pref-${item.id}`}><SelectValue placeholder="Room preference" /></SelectTrigger>
                    <SelectContent>{ROOM_PREFERENCE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-bed-pref-${item.id}`} className="mb-1 block text-xs font-semibold">Bed preference</Label>
                  <Select value={form.bedPreference} onValueChange={(value) => up("bedPreference", value)}>
                    <SelectTrigger id={`overlay-bed-pref-${item.id}`}><SelectValue placeholder="Bed preference" /></SelectTrigger>
                    <SelectContent>{BED_PREFERENCE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-pillow-${item.id}`} className="mb-1 block text-xs font-semibold">Pillow preference</Label>
                  <Input id={`overlay-pillow-${item.id}`} value={form.pillowPreference} onChange={(e) => up("pillowPreference", e.target.value)} placeholder="Soft / firm" className="h-10 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor={`overlay-smoking-${item.id}`} className="mb-1 block text-xs font-semibold">Smoking</Label>
                  <Select value={form.smoking ? "Yes" : "No"} onValueChange={(value) => up("smoking", value === "Yes")}>
                    <SelectTrigger id={`overlay-smoking-${item.id}`}><SelectValue placeholder="Smoking" /></SelectTrigger>
                    <SelectContent>{["Yes", "No"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`overlay-pet-friendly-${item.id}`} className="mb-1 block text-xs font-semibold">Pet friendly</Label>
                  <Select value={form.petFriendly ? "Yes" : "No"} onValueChange={(value) => up("petFriendly", value === "Yes")}>
                    <SelectTrigger id={`overlay-pet-friendly-${item.id}`}><SelectValue placeholder="Pet friendly" /></SelectTrigger>
                    <SelectContent>{["Yes", "No"].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor={`overlay-farm-stay-notes-${item.id}`} className="mb-1 block text-xs font-semibold">Special requests</Label>
                <Textarea id={`overlay-farm-stay-notes-${item.id}`} rows={3} value={form.notes} onChange={(e) => up("notes", e.target.value)} placeholder="Birthday decoration, anniversary package, accessibility needs, allergy info" className="rounded-xl resize-none" />
              </div>
            </div>
          ) : item.bookingCategory === "events_festivals" ? (
            <div>
              <Label htmlFor={`overlay-tickets-${item.id}`} className="mb-1 block text-xs font-semibold">Tickets</Label>
              <Input id={`overlay-tickets-${item.id}`} type="number" min={1} max={20} value={String(form.tickets)} onChange={(e) => up("tickets", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
            </div>
          ) : (
            <div>
              <Label htmlFor={`overlay-guests-${item.id}`} className="mb-1 block text-xs font-semibold">Guests</Label>
              <Input id={`overlay-guests-${item.id}`} type="number" min={1} max={50} value={String(form.guests)} onChange={(e) => up("guests", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
            </div>
          )}

          {item.bookingCategory === "transportation" ? (
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-sky-200 bg-sky-50/70 p-3 md:grid-cols-2">
              <div>
                <Label htmlFor={`overlay-current-${item.id}`} className="mb-1 block text-xs font-semibold">Current location</Label>
                <Input id={`overlay-current-${item.id}`} value={form.currentLocation} onChange={(e) => up("currentLocation", e.target.value)} placeholder="Your current location" className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-destination-${item.id}`} className="mb-1 block text-xs font-semibold">Destination farm</Label>
                <Input id={`overlay-destination-${item.id}`} value={form.destinationFarm} onChange={(e) => up("destinationFarm", e.target.value)} placeholder="Farm or lodge" className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-pickup-${item.id}`} className="mb-1 block text-xs font-semibold">Pickup location</Label>
                <Input id={`overlay-pickup-${item.id}`} value={form.pickupLocation} onChange={(e) => up("pickupLocation", e.target.value)} placeholder="Enter pickup" className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-dropoff-${item.id}`} className="mb-1 block text-xs font-semibold">Drop-off location</Label>
                <Input id={`overlay-dropoff-${item.id}`} value={form.dropoffLocation} onChange={(e) => up("dropoffLocation", e.target.value)} placeholder="Enter drop-off" className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-transport-category-${item.id}`} className="mb-1 block text-xs font-semibold">Transport category</Label>
                <Select value={form.transportCategory} onValueChange={(value) => up("transportCategory", value)}>
                  <SelectTrigger id={`overlay-transport-category-${item.id}`}><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{TRANSPORT_CATEGORIES.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-trip-type-${item.id}`} className="mb-1 block text-xs font-semibold">Trip type</Label>
                <Select value={form.tripType} onValueChange={(value) => up("tripType", value)}>
                  <SelectTrigger id={`overlay-trip-type-${item.id}`}><SelectValue placeholder="Select trip" /></SelectTrigger>
                  <SelectContent>{TRIP_TYPES.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-vehicle-${item.id}`} className="mb-1 block text-xs font-semibold">Preferred vehicle</Label>
                <Select value={form.preferredVehicle} onValueChange={(value) => up("preferredVehicle", value)}>
                  <SelectTrigger id={`overlay-vehicle-${item.id}`}><SelectValue placeholder="Preferred vehicle" /></SelectTrigger>
                  <SelectContent>{VEHICLE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-distance-${item.id}`} className="mb-1 block text-xs font-semibold">Distance (km)</Label>
                <Input id={`overlay-distance-${item.id}`} type="number" min={1} value={String(form.distanceKm)} onChange={(e) => up("distanceKm", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-travel-time-${item.id}`} className="mb-1 block text-xs font-semibold">Estimated travel time</Label>
                <Input id={`overlay-travel-time-${item.id}`} value={form.estimatedTravelTime} onChange={(e) => up("estimatedTravelTime", e.target.value)} placeholder="20 mins" className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-road-${item.id}`} className="mb-1 block text-xs font-semibold">Road condition</Label>
                <Select value={form.roadCondition} onValueChange={(value) => up("roadCondition", value)}>
                  <SelectTrigger id={`overlay-road-${item.id}`}><SelectValue placeholder="Road condition" /></SelectTrigger>
                  <SelectContent>{ROAD_CONDITIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-weather-${item.id}`} className="mb-1 block text-xs font-semibold">Weather</Label>
                <Select value={form.weatherCondition} onValueChange={(value) => up("weatherCondition", value)}>
                  <SelectTrigger id={`overlay-weather-${item.id}`}><SelectValue placeholder="Weather" /></SelectTrigger>
                  <SelectContent>{WEATHER_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-route-difficulty-${item.id}`} className="mb-1 block text-xs font-semibold">Route difficulty</Label>
                <Select value={form.routeDifficulty} onValueChange={(value) => up("routeDifficulty", value)}>
                  <SelectTrigger id={`overlay-route-difficulty-${item.id}`}><SelectValue placeholder="Route difficulty" /></SelectTrigger>
                  <SelectContent>{ROUTE_DIFFICULTY_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`overlay-adults-${item.id}`} className="mb-1 block text-xs font-semibold">Adults</Label>
                <Input id={`overlay-adults-${item.id}`} type="number" min={1} value={String(form.adults)} onChange={(e) => up("adults", Number(e.target.value) || 1)} className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-children-${item.id}`} className="mb-1 block text-xs font-semibold">Children</Label>
                <Input id={`overlay-children-${item.id}`} type="number" min={0} value={String(form.children)} onChange={(e) => up("children", Number(e.target.value) || 0)} className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-seniors-${item.id}`} className="mb-1 block text-xs font-semibold">Seniors</Label>
                <Input id={`overlay-seniors-${item.id}`} type="number" min={0} value={String(form.seniors)} onChange={(e) => up("seniors", Number(e.target.value) || 0)} className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-luggage-${item.id}`} className="mb-1 block text-xs font-semibold">Luggage</Label>
                <Input id={`overlay-luggage-${item.id}`} type="number" min={0} value={String(form.luggage)} onChange={(e) => up("luggage", Number(e.target.value) || 0)} className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-pets-${item.id}`} className="mb-1 block text-xs font-semibold">Pets</Label>
                <Input id={`overlay-pets-${item.id}`} type="number" min={0} value={String(form.pets)} onChange={(e) => up("pets", Number(e.target.value) || 0)} className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-accessibility-needs-${item.id}`} className="mb-1 block text-xs font-semibold">Accessibility needs</Label>
                <Input id={`overlay-accessibility-needs-${item.id}`} value={form.accessibilityNeeds} onChange={(e) => up("accessibilityNeeds", e.target.value)} placeholder="Wheelchair, stroller..." className="h-10 rounded-xl" />
              </div>
              <div>
                <Label htmlFor={`overlay-emergency-contact-${item.id}`} className="mb-1 block text-xs font-semibold">Emergency contact</Label>
                <Input id={`overlay-emergency-contact-${item.id}`} value={form.emergencyContact} onChange={(e) => up("emergencyContact", e.target.value)} placeholder="Name and phone" className="h-10 rounded-xl" />
              </div>
              <div className="md:col-span-2 rounded-xl border border-sky-200 bg-white/70 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Travel preferences</p>
                <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
                  {[
                    ['airConditioning','Air conditioning'], ['wifi','Wi-Fi'], ['childSeat','Child seat'], ['femaleDriver','Female driver'], ['englishSpeakingDriver','English-speaking driver'], ['localGuide','Local guide'], ['luxuryVehicle','Luxury vehicle'], ['farmGuideIncluded','Farm guide included'],
                  ].map(([key,label]) => (
                    <label key={key} className="flex items-center gap-2 rounded-lg bg-white/80 px-2 py-2 text-xs text-foreground">
                      <input type="checkbox" checked={Boolean(form[key as keyof typeof form])} onChange={(e) => up(key as keyof typeof form, e.target.checked as never)} className="h-4 w-4 rounded border-border" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor={`overlay-transport-notes-${item.id}`} className="mb-1 block text-xs font-semibold">Route notes</Label>
                <Textarea id={`overlay-transport-notes-${item.id}`} rows={3} value={form.notes} onChange={(e) => up("notes", e.target.value)} placeholder="Route, luggage, safety, or meeting instructions" className="rounded-xl resize-none" />
              </div>
            </div>
          ) : null}

          {item.bookingCategory === "education" ? (
            <div>
              <Label htmlFor={`overlay-topic-${item.id}`} className="mb-1 block text-xs font-semibold">Topic</Label>
              <Input id={`overlay-topic-${item.id}`} value={form.trainingTopic} onChange={(e) => up("trainingTopic", e.target.value)} placeholder="Training or course" className="h-10 rounded-xl" />
            </div>
          ) : null}

          {item.bookingCategory === "agriculture_services" ? (
            <div>
              <Label htmlFor={`overlay-service-${item.id}`} className="mb-1 block text-xs font-semibold">Service Type</Label>
              <Input id={`overlay-service-${item.id}`} value={form.serviceType} onChange={(e) => up("serviceType", e.target.value)} placeholder="e.g. soil testing" className="h-10 rounded-xl" />
            </div>
          ) : null}

          <div className="rounded-2xl border border-border/60 bg-emerald-50/60 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Customer preferences</p>
            <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
              {[
                ['vegetarian','Vegetarian'], ['vegan','Vegan'], ['halal','Halal'], ['kosher','Kosher'], ['glutenFree','Gluten Free'], ['lactoseFree','Lactose Free'], ['organicMeals','Organic Meals'], ['childFriendly','Child Friendly'], ['petFriendly','Pet Friendly'], ['wheelchairAccess','Wheelchair Access'], ['hearingAssistance','Hearing Assistance'], ['visionAssistance','Vision Assistance'], ['prayerFacilities','Prayer Facilities'],
              ].map(([key,label]) => (
                <label key={key} className="flex items-center gap-2 rounded-lg bg-white/80 px-2 py-2 text-xs text-foreground">
                  <input type="checkbox" checked={Boolean(form[key as keyof typeof form])} onChange={(e) => up(key as keyof typeof form, e.target.checked as never)} className="h-4 w-4 rounded border-border" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor={`overlay-notes-${item.id}`} className="mb-1 block text-xs font-semibold">Health & safety notes</Label>
            <Textarea id={`overlay-notes-${item.id}`} rows={3} value={form.notes} onChange={(e) => up("notes", e.target.value)} placeholder="Allergies, med conditions, safety notes" className="rounded-xl resize-none" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor={`overlay-payment-${item.id}`} className="mb-1 block text-xs font-semibold">Payment method</Label>
              <Select value={form.paymentMethod} onValueChange={(value) => up("paymentMethod", value)}>
                <SelectTrigger id={`overlay-payment-${item.id}`}><SelectValue placeholder="Select payment" /></SelectTrigger>
                <SelectContent>{PAYMENT_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor={`overlay-country-alt-${item.id}`} className="mb-1 block text-xs font-semibold">Country</Label>
              <Input id={`overlay-country-alt-${item.id}`} value={form.country} onChange={(e) => up("country", e.target.value)} placeholder="Country" className="h-10 rounded-xl" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/50 p-3 text-sm space-y-1.5">
            <div className="flex justify-between text-muted-foreground"><span>Quantity</span><span className="font-semibold text-foreground">{qty}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="font-semibold text-foreground">{item.currency} {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Service fee</span><span className="font-semibold text-foreground">{item.currency} {fee.toLocaleString()}</span></div>
            <div className="flex justify-between text-base font-extrabold"><span>Total</span><span className="text-primary">{item.currency} {total.toLocaleString()}</span></div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" type="button" className="flex-1 rounded-xl" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" className="flex-1 h-11 rounded-xl bg-primary font-bold text-primary-foreground" disabled={!form.name || !form.phone || !form.email || !form.date}>
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<BookingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryParam = searchParams.get("category") as BookingCategory | null;
  const activeCategory: BookingCategory =
    categoryParam && ALL_CATEGORIES.includes(categoryParam)
      ? categoryParam
      : null as unknown as BookingCategory; // null means show all

  const setCategory = (cat: BookingCategory) => {
    setSearchParams({ category: cat });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearCategory = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Items to display — if a category is selected show only that, else show all
  const displayItems = useMemo(() => {
    if (!activeCategory) return BOOKING_ITEMS;
    return BOOKING_ITEMS.filter((i) => i.bookingCategory === activeCategory);
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return displayItems;

    return displayItems.filter((item) => {
      const haystack = [
        item.name,
        item.shortDescription,
        item.description,
        item.location,
        item.farmName,
        ...item.tags,
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [displayItems, searchQuery]);

  // Active category label for heading
  const heading = activeCategory
    ? BOOKING_CATEGORY_LABELS[activeCategory]
    : "Book Your Experience";

  const subheading = activeCategory
    ? `Showing ${filteredItems.length} listing${filteredItems.length !== 1 ? "s" : ""} in ${BOOKING_CATEGORY_LABELS[activeCategory]}`
    : `${filteredItems.length} experiences across all categories`;

  return (
    <PageLayout>
      {/* ── Page header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-primary to-emerald-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_38%)]" />
        <div className="container relative mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-4">
            <Link to="/" className="transition hover:text-primary-foreground">Home</Link>
            <ChevronRight size={14} />
            {activeCategory ? (
              <>
                <button onClick={clearCategory} className="transition hover:text-primary-foreground">Book Your Experience</button>
                <ChevronRight size={14} />
                <span className="font-semibold text-primary-foreground">{BOOKING_CATEGORY_LABELS[activeCategory]}</span>
              </>
            ) : (
              <span className="font-semibold text-primary-foreground">Book Your Experience</span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-primary-foreground/90 backdrop-blur">
                <Sparkles size={14} className="text-secondary" />
                Verified farm stays, tours, food, and services
              </div>
              <h1 className="text-3xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
                {heading}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-primary-foreground/80 md:text-base">{subheading}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xl font-extrabold text-white">24/7</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Instant booking</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xl font-extrabold text-white">4.8★</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Trusted ratings</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xl font-extrabold text-white">100%</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Verified partners</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck size={16} /> Why travelers choose Agri2rist
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" /> Discover authentic farm experiences and stays in one trusted place.</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" /> Pay securely, receive instant confirmations, and manage bookings smoothly.</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" /> Connect with verified hosts and local operators across Uganda.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <section className="bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.08),_transparent_35%)] py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 rounded-[28px] border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-amber-50 p-4 shadow-sm">
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Link to="/booking?category=farm_stay">
                <Button variant="outline" className="rounded-full border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 font-medium text-sm whitespace-nowrap">
                  🏠 Farm Stays & Accommodations <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
              <Link to="/booking?category=restaurant">
                <Button variant="outline" className="rounded-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 font-medium text-sm whitespace-nowrap">
                  🍽️ Restaurants & Cuisine <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
              <Link to="/booking?category=events_festivals">
                <Button variant="outline" className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-medium text-sm whitespace-nowrap">
                  🎉 Local Events & Festivals <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
              <Link to="/booking?category=transportation">
                <Button variant="outline" className="rounded-full border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 font-medium text-sm whitespace-nowrap">
                  🚗 Transportation & Transfers <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
              <Link to="/booking?category=digital_products">
                <Button variant="outline" className="rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 font-medium text-sm whitespace-nowrap">
                  💻 Digital Products <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
              <Link to="/booking?category=education">
                <Button variant="outline" className="rounded-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 font-medium text-sm whitespace-nowrap">
                  📚 Education <span className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
              <Link to="/booking?category=agriculture_services">
                <Button variant="outline" className="rounded-full border-lime-200 text-lime-700 hover:bg-lime-50 hover:border-lime-300 font-medium text-sm whitespace-nowrap">
                  🔧 Agriculture Services <span className="ml-2 rounded-full bg-lime-100 px-2 py-0.5 text-xs">2</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="space-y-4 xl:sticky xl:top-24 xl:h-fit">
              <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <SlidersHorizontal size={18} />
                  </div>
                  <div>
                    <p className="font-extrabold text-foreground">Browse by category</p>
                    <p className="text-xs text-muted-foreground">Narrow your experience</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {ALL_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        <span>{BOOKING_CATEGORY_LABELS[cat]}</span>
                        <span className="text-xs opacity-70">{BOOKING_ITEMS.filter((item) => item.bookingCategory === cat).length}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <ShieldCheck size={16} />
                  <h3 className="font-extrabold text-foreground">Why it feels premium</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Trusted verified hosts and curated experiences</li>
                  <li>• Smooth discovery, booking, and payment flow</li>
                  <li>• Professional service categories for every traveler</li>
                </ul>
              </div>
            </aside>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-border bg-card p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">{activeCategory ? BOOKING_CATEGORY_LABELS[activeCategory] : "All experiences"}</p>
                    <h2 className="text-xl font-extrabold text-foreground">{subheading}</h2>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative">
                      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search experiences"
                        className="h-10 w-full rounded-full pl-9 sm:w-56"
                      />
                    </div>
                    <select
                      value={activeCategory ?? "all"}
                      onChange={(e) => (e.target.value === "all" ? clearCategory() : setCategory(e.target.value as BookingCategory))}
                      className="h-10 rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground"
                    >
                      <option value="all">All categories</option>
                      {ALL_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{BOOKING_CATEGORY_LABELS[cat]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf size={13} className="text-primary" />
                All experiences are from verified Agri2rist partners
              </div>

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <BookingCard
                      key={item.id + item.bookingCategory}
                      item={item}
                      onBook={(i) => setSelectedItem(i)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-border bg-card py-20 text-center shadow-sm">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                    <Leaf size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground">No listings found</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">Try another keyword or view all categories to explore more experiences.</p>
                  <Button variant="outline" className="mt-4 rounded-full" onClick={clearCategory}>
                    View all categories
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <BookingFormOverlay item={selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
      ) : null}

    </PageLayout>
  );
}
