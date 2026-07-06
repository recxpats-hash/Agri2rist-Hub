import { useEffect, useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  SlidersHorizontal,
  MapPin,
  Navigation,
  CalendarDays,
  Clock,
  Search,
  Crosshair,
  Star,
  ShieldCheck,
  Leaf,
  Wrench,
  CloudRain,
  Cloud,
  Sun,
  Thunderbolt,
  Wind,
  Droplets,
  ThermometerSun,
  Gauge,
  Route,
  Truck,
  Taxi,
  Car,
  Bike,
  Ship,
  Plane,
  PawPrint,
  Footprints,
  Heart,
  Share2,
  Verified,
  Users,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type RouteCard = {
  id: string;
  from: string;
  to: string;
  km: number;
  etaMin: number;
  roadClass: "safe" | "recommended" | "caution" | "emergency" | "unavailable";
};

type DriverCard = {
  id: string;
  name: string;
  role: string;
  rating: number;
  trips: number;
  verified: boolean;
  languages: string[];
  specialty: string;
  avatarSeed: string;
};

type WeatherKey =
  | "sunny"
  | "cloudy"
  | "rain"
  | "heavy_rain"
  | "thunderstorm"
  | "fog"
  | "wind"
  | "flood"
  | "heat";

const VEHICLE_CATEGORIES = [
  { key: "road_transport", label: "Road Transport", icon: Truck, badge: "Enterprise" },
  { key: "private_transport", label: "Private Transport", icon: Taxi, badge: "Comfort" },
  { key: "farm_vehicles", label: "Farm Vehicles", icon: Car, badge: "Work-ready" },
  { key: "motorcycles", label: "Motorcycles", icon: Route, badge: "Fast" },
  { key: "bicycles", label: "Bicycles", icon: Bike, badge: "Eco" },
  { key: "water_transport", label: "Water Transport", icon: Ship, badge: "Logistics" },
  { key: "air_transport", label: "Air Transport", icon: Plane, badge: "Priority" },
  { key: "animal_transport", label: "Animal Transport", icon: PawPrint, badge: "Care-first" },
  { key: "walking_experiences", label: "Walking Experiences", icon: Footprints, badge: "Local" },
] as const;

const ROAD_CONDITIONS = [
  { key: "excellent", label: "Excellent", level: "safe", color: "bg-success" },
  { key: "good", label: "Good", level: "safe", color: "bg-primary" },
  { key: "fair", label: "Fair", level: "recommended", color: "bg-warning" },
  { key: "poor", label: "Poor", level: "caution", color: "bg-danger" },
  { key: "construction", label: "Construction", level: "caution", color: "bg-warning" },
  { key: "flooded", label: "Flooded", level: "emergency", color: "bg-danger" },
  { key: "slippery", label: "Slippery", level: "caution", color: "bg-warning" },
  { key: "muddy", label: "Muddy", level: "caution", color: "bg-warning" },
  { key: "closed", label: "Closed Roads", level: "unavailable", color: "bg-secondary" },
] as const;

function BadgeTone({ tone }: { tone: RouteCard["roadClass"] }) {
  const cls =
    tone === "safe"
      ? "bg-success text-white"
      : tone === "recommended"
        ? "bg-primary text-white"
        : tone === "caution"
          ? "bg-warning text-dark"
          : tone === "emergency"
            ? "bg-danger text-white"
            : "bg-secondary text-white";
  return <span className={`badge ${cls} rounded-pill`}>{tone.replace(/_/g, " ")}</span>;
}

function CityPill({ label, icon }: { label: string; icon: any }) {
  const Icon = icon;
  return (
    <span className="d-inline-flex align-items-center gap-2 rounded-pill border border-1 border-light/50 bg-white/5 px-3 py-2 text-white">
      <Icon size={14} className="opacity-75" />
      <span className="small fw-semibold">{label}</span>
    </span>
  );
}

function SkeletonCard({ h = 170 }: { h?: number }) {
  return (
    <div className="card border-0 shadow-sm bg-white/5 overflow-hidden">
      <div className="skeleton shimmer" style={{ height: h }} />
      <div className="card-body">
        <div className="skeleton shimmer" style={{ height: 14, width: "65%" }} />
        <div className="mt-2 skeleton shimmer" style={{ height: 12, width: "40%" }} />
        <div className="mt-3 skeleton shimmer" style={{ height: 32, width: "55%" }} />
      </div>
    </div>
  );
}

function DriverAvatar({ seed }: { seed: string }) {
  // Purely visual avatar placeholder (no backend)
  const hue = useMemo(() => {
    let acc = 0;
    for (let i = 0; i < seed.length; i++) acc = (acc + seed.charCodeAt(i) * (i + 1)) % 360;
    return acc;
  }, [seed]);

  return (
    <div
      className="rounded-4 d-flex align-items-center justify-content-center text-white fw-bold"
      style={{ width: 56, height: 56, background: `linear-gradient(135deg, hsl(${hue} 85% 50%), hsl(${(hue + 40) % 360} 85% 45%))` }}
      aria-hidden="true"
    >
      {seed
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase())
        .join("")}
    </div>
  );
}

export default function TransportationLandingPage() {
  const [loading, setLoading] = useState(true);

  // Search form state (frontend-only)
  const [pickup, setPickup] = useState("Agri2rist Farm HQ");
  const [destination, setDestination] = useState("City Market Logistics" );
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  });
  const [travelTime, setTravelTime] = useState("09:30");
  const [vehicleCategory, setVehicleCategory] = useState("road_transport");
  const [passengers, setPassengers] = useState(2);
  const [accessibility, setAccessibility] = useState(false);

  const [activeMapMode, setActiveMapMode] = useState<"preview" | "night" | "satellite">("preview");

  const routes: RouteCard[] = useMemo(
    () => [
      { id: "r1", from: "Kedah", to: "Penang", km: 120, etaMin: 135, roadClass: "recommended" },
      { id: "r2", from: "Mersing", to: "Johor Bahru", km: 86, etaMin: 98, roadClass: "safe" },
      { id: "r3", from: "Bau", to: "Kuching", km: 170, etaMin: 210, roadClass: "caution" },
      { id: "r4", from: "Ipoh", to: "Cameron Highlands", km: 145, etaMin: 165, roadClass: "safe" },
      { id: "r5", from: "Subang", to: "Port Klang", km: 34, etaMin: 55, roadClass: "recommended" },
      { id: "r6", from: "Lumut", to: "Taiping", km: 101, etaMin: 120, roadClass: "unavailable" },
    ],
    []
  );

  const popularDestinations = useMemo(
    () => ["Packing Facility Gate A", "Dairy Cooling Hub", "Seafood Dock", "Egg Sorting Center", "Agro Export Warehouse", "Market District"],
    []
  );

  const drivers: DriverCard[] = useMemo(
    () => [
      {
        id: "d1",
        name: "Aiman Rahman",
        role: "Fleet Operator",
        rating: 4.9,
        trips: 1820,
        verified: true,
        languages: ["EN", "BM"],
        specialty: "Cold-chain farm produce",
        avatarSeed: "Aiman Rahman",
      },
      {
        id: "d2",
        name: "Siti Nur",
        role: "Logistics Driver",
        rating: 4.8,
        trips: 965,
        verified: true,
        languages: ["EN"],
        specialty: "Farm-to-market routes",
        avatarSeed: "Siti Nur",
      },
      {
        id: "d3",
        name: "Jules M.",
        role: "Transport Specialist",
        rating: 4.7,
        trips: 621,
        verified: false,
        languages: ["EN", "FR"],
        specialty: "Fragile & specialty cargo",
        avatarSeed: "Jules M.",
      },
      {
        id: "d4",
        name: "Fatima S.",
        role: "Accessibility Coach",
        rating: 4.9,
        trips: 740,
        verified: true,
        languages: ["EN", "AR"],
        specialty: "Wheelchair-friendly transport",
        avatarSeed: "Fatima S.",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        id: "t1",
        quote:
          "The booking flow is fast and clear. We got a verified driver and the route ETA was accurate.",
        name: "Hassan K.",
        role: "Farm Procurement",
      },
      {
        id: "t2",
        quote:
          "Weather + road condition alerts helped us avoid delays. Enterprise UX, not basic listings.",
        name: "Mariam A.",
        role: "Distribution Manager",
      },
      {
        id: "t3",
        quote:
          "Loved the map preview and trip timeline. The UI feels like Uber Reserve but tailored for farms.",
        name: "Omar T.",
        role: "Logistics Lead",
      },
    ],
    []
  );

  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(t);
  }, [testimonials.length]);

  const [weatherKey, setWeatherKey] = useState<WeatherKey>("sunny");
  const weather = useMemo(() => {
    const map: Record<WeatherKey, { label: string; icon: any; tone: "safe" | "warning" | "danger"; desc: string }> = {
      sunny: { label: "Sunny", icon: Sun, tone: "safe", desc: "Excellent visibility, steady traction." },
      cloudy: { label: "Cloudy", icon: Cloud, tone: "safe", desc: "Low glare; keep an eye on minor hills." },
      rain: { label: "Rain", icon: CloudRain, tone: "warning", desc: "Moist roads — reduce speed near turns." },
      heavy_rain: { label: "Heavy Rain", icon: CloudRain, tone: "danger", desc: "Slippery segments likely — consider alternative route." },
      thunderstorm: { label: "Thunderstorm", icon: Thunderbolt, tone: "danger", desc: "Hold departure if lightning risk is high." },
      fog: { label: "Fog", icon: Wind, tone: "warning", desc: "Lower visibility — enable caution mode." },
      wind: { label: "Wind", icon: Wind, tone: "warning", desc: "Crosswinds near open farmland." },
      flood: { label: "Flood", icon: Droplets, tone: "danger", desc: "Avoid low-lying roads; check closure alerts." },
      heat: { label: "Heat", icon: ThermometerSun, tone: "warning", desc: "Plan chilled breaks for cold-chain cargo." },
    };
    return map[weatherKey];
  }, [weatherKey]);

  const roadWidget = useMemo(() => {
    const severity =
      weatherKey === "heavy_rain" || weatherKey === "thunderstorm" || weatherKey === "flood"
        ? "poor"
        : weatherKey === "rain" || weatherKey === "fog" || weatherKey === "wind" || weatherKey === "heat"
          ? "fair"
          : "excellent";

    const matched = ROAD_CONDITIONS.find((r) => r.key === severity) ?? ROAD_CONDITIONS[0];
    return matched;
  }, [weatherKey]);

  const weatherToneClasses =
    weather.tone === "safe"
      ? { pill: "bg-success text-white", bar: "bg-success" }
      : weather.tone === "warning"
        ? { pill: "bg-warning text-dark", bar: "bg-warning" }
        : { pill: "bg-danger text-white", bar: "bg-danger" };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only feedback (no backend)
    const summary = `${pickup} → ${destination} (${travelDate} ${travelTime})`;
    const toastEl = document.getElementById("a2r-toast");
    if (toastEl) {
      toastEl.textContent = summary;
      toastEl.setAttribute("data-show", "true");
    }
    setTimeout(() => {
      const toastEl2 = document.getElementById("a2r-toast");
      toastEl2?.setAttribute("data-show", "false");
    }, 3500);
  };

  const [openFilters, setOpenFilters] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  return (
    <PageLayout>
      <style>{`
        :root {
          --a2r-green: #18a957;
          --a2r-blue: #2563eb;
          --a2r-yellow: #f59e0b;
          --a2r-orange: #f97316;
          --a2r-red: #ef4444;
          --a2r-gray: #6b7280;
        }
        .glass {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .a2r-hero {
          position: relative;
          overflow: hidden;
        }
        .a2r-hero::before {
          content: "";
          position: absolute;
          inset: -200px -200px auto -200px;
          height: 520px;
          background: radial-gradient(circle at 20% 40%, rgba(34, 197, 94, 0.35), transparent 55%),
                      radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.35), transparent 55%),
                      radial-gradient(circle at 50% 60%, rgba(245, 158, 11, 0.20), transparent 60%);
          filter: blur(2px);
          pointer-events: none;
        }
        .shimmer {
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.06);
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150px;
          width: 150px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          animation: shimmerMove 1.1s infinite;
        }
        @keyframes shimmerMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(520px); }
        }
        .a2r-map {
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(2,6,23,0.25);
          position: relative;
        }
        .a2r-map .grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.55;
          pointer-events: none;
        }
        .a2r-map .pin {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 0 6px rgba(255,255,255,0.15);
          transform: translate(-50%, -50%);
        }
        .a2r-map .pin.pickup { left: 28%; top: 54%; background: var(--a2r-green); }
        .a2r-map .pin.dest { left: 72%; top: 34%; background: var(--a2r-blue); }
        .a2r-map .route {
          position: absolute;
          left: 22%;
          top: 52%;
          width: 56%;
          height: 26%;
          border: 2px dashed rgba(59,130,246,0.55);
          border-radius: 999px;
          transform: rotate(-12deg);
          opacity: 0.9;
        }
        .a2r-map.mode-night {
          background: rgba(0,0,0,0.35);
        }
        .a2r-map.mode-satellite {
          background: rgba(15,23,42,0.45);
        }
        .a2r-pill {
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.06);
        }
        .a2r-toast {
          position: fixed;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1200;
          background: rgba(17,24,39,0.86);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 10px 14px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 250ms ease;
          max-width: calc(100vw - 28px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .a2r-toast[data-show="true"] {
          opacity: 1;
        }
        .a2r-fade-up {
          animation: fadeUp 520ms ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Floating Toast */}
      <div id="a2r-toast" className="a2r-toast" data-show="false" />

      {/* Hero */}
      <section className="a2r-hero bg-primary py-8 py-md-12">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-7">
              <div className="glass rounded-4 p-4 p-md-5 h-100 a2r-fade-up">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge bg-white text-primary rounded-pill">On-Farm Transport</span>
                  <span className="badge bg-success text-white rounded-pill">Verified Routes</span>
                  <span className="badge bg-primary text-white rounded-pill">GPS Preview</span>
                </div>

                <h1 className="text-white fw-extrabold display-6 lh-sm">
                  AGRI2RIST HUB — Book transportation with route safety, weather awareness, and ETA clarity.
                </h1>

                <p className="text-white-50 fs-5 mt-3 mb-4" style={{ maxWidth: 620 }}>
                  Enterprise-grade booking UI inspired by Uber Reserve & Booking.com Transfers — tailored for farm logistics.
                </p>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <CityPill label="Current location" icon={Crosshair} />
                  <CityPill label="Fast ETA updates" icon={Navigation} />
                  <CityPill label="Verified drivers" icon={ShieldCheck} />
                </div>

                <div className="row g-3 align-items-stretch">
                  <div className="col-12 col-md-4">
                    <div className="glass rounded-4 p-3 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-white fw-bold" style={{ fontSize: 22 }}>24/7</div>
                          <div className="text-white-50 small">Dispatch-ready</div>
                        </div>
                        <span className="text-white"><Clock size={18} /></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="glass rounded-4 p-3 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-white fw-bold" style={{ fontSize: 22 }}>4.8★</div>
                          <div className="text-white-50 small">Avg. driver rating</div>
                        </div>
                        <span className="text-white"><Star size={18} /></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="glass rounded-4 p-3 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-white fw-bold" style={{ fontSize: 22 }}>Live</div>
                          <div className="text-white-50 small">Road & weather alerts</div>
                        </div>
                        <span className="text-white"><Sparkles size={18} /></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart Search */}
                <div className="mt-4">
                  <form onSubmit={submit} className="p-3 p-md-4 rounded-4" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-3">
                      <div>
                        <div className="text-white fw-bold">Smart Transportation Search</div>
                        <div className="text-white-50 small">Real-time UX preview (frontend only)</div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-light rounded-pill d-inline-flex align-items-center gap-2"
                        onClick={() => setOpenFilters((v) => !v)}
                        aria-expanded={openFilters}
                      >
                        <SlidersHorizontal size={14} />
                        Advanced
                      </button>
                    </div>

                    <div className="row g-2">
                      <div className="col-12 col-md-6">
                        <label className="form-label text-white-50 small">Pickup Location</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white/10 text-white border-0"><MapPin size={16} /></span>
                          <Input
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            placeholder="Enter pickup"
                            className="bg-white/5 text-white border-white/10"
                          />
                        </div>
                        <div className="form-text text-white-50">
                          <button type="button" className="btn btn-link btn-sm text-white-50 p-0" onClick={() => setPickup("Current GPS Location")}>Use current location</button>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label text-white-50 small">Destination</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white/10 text-white border-0"><Navigation size={16} /></span>
                          <Input
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination"
                            className="bg-white/5 text-white border-white/10"
                          />
                        </div>
                        <div className="form-text text-white-50">
                          <span className="d-inline-flex align-items-center gap-2"><Crosshair size={14} /> GPS preview updates below</span>
                        </div>
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label text-white-50 small">Travel Date</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white/10 text-white border-0"><CalendarDays size={16} /></span>
                          <Input
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            className="bg-white/5 text-white border-white/10"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label text-white-50 small">Travel Time</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white/10 text-white border-0"><Clock size={16} /></span>
                          <Input
                            type="time"
                            value={travelTime}
                            onChange={(e) => setTravelTime(e.target.value)}
                            className="bg-white/5 text-white border-white/10"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label text-white-50 small">Vehicle Category</label>
                        <select
                          className="form-select bg-white/5 text-white border-white/10"
                          value={vehicleCategory}
                          onChange={(e) => setVehicleCategory(e.target.value)}
                        >
                          {VEHICLE_CATEGORIES.map((c) => (
                            <option key={c.key} value={c.key} className="text-dark">{c.label}</option>
                          ))}
                        </select>
                      </div>

                      {openFilters && (
                        <>
                          <div className="col-12 col-md-4">
                            <label className="form-label text-white-50 small">Passengers</label>
                            <Input
                              type="number"
                              min={1}
                              max={12}
                              value={passengers}
                              onChange={(e) => setPassengers(Number(e.target.value || 1))}
                              className="bg-white/5 text-white border-white/10"
                            />
                          </div>

                          <div className="col-12 col-md-4">
                            <label className="form-label text-white-50 small">Accessibility Filter</label>
                            <div className="form-check form-switch form-switch-lg">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={accessibility}
                                onChange={(e) => setAccessibility(e.target.checked)}
                              />
                              <label className="form-check-label text-white-50">Wheelchair accessible</label>
                            </div>
                          </div>

                          <div className="col-12 col-md-4">
                            <label className="form-label text-white-50 small">Safety Preference</label>
                            <div className="d-flex gap-2">
                              <span className="badge bg-success text-white rounded-pill p-2">
                                <ShieldCheck size={14} /> Safe route
                              </span>
                              <span className="badge bg-primary text-white rounded-pill p-2">
                                <Leaf size={14} /> Eco travel
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 mt-3">
                      <Button type="submit" className="btn btn-light text-primary fw-bold rounded-4 flex-grow-1" aria-label="Search transportation">
                        <Search size={18} /> Search routes
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-outline-light text-white fw-semibold rounded-4"
                        onClick={() => {
                          setPickup("Agri2rist Farm HQ");
                          setDestination("City Market Logistics");
                          setVehicleCategory("road_transport");
                          setPassengers(2);
                          setAccessibility(false);
                          const d = new Date();
                          d.setDate(d.getDate() + 2);
                          setTravelDate(d.toISOString().slice(0, 10));
                          setTravelTime("09:30");
                        }}
                      >
                        Reset
                      </Button>
                    </div>

                    <div className="mt-3 d-flex flex-wrap gap-2">
                      <Badge className="rounded-pill bg-white/10 text-white border border-white/15">Estimated CO₂ shown</Badge>
                      <Badge className="rounded-pill bg-white/10 text-white border border-white/15">Weather-aware suggestions</Badge>
                      <Badge className="rounded-pill bg-white/10 text-white border border-white/15">Road caution mode</Badge>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Map Preview + Widgets */}
            <div className="col-12 col-lg-5">
              <div className="glass rounded-4 p-3 p-md-4 h-100 a2r-fade-up">
                <div className="d-flex align-items-center justify-content-between mb-3 gap-2">
                  <div>
                    <div className="text-white fw-bold">GPS Map Preview</div>
                    <div className="text-white-50 small">Interactive UI mock (no external APIs)</div>
                  </div>
                  <div className="d-flex gap-2">
                    {(
                      [
                        { key: "preview", label: "Preview" },
                        { key: "night", label: "Night" },
                        { key: "satellite", label: "Satellite" },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.key}
                        className={`btn btn-sm rounded-pill ${activeMapMode === m.key ? "btn-light text-primary fw-bold" : "btn-outline-light text-white"}`}
                        onClick={() => setActiveMapMode(m.key)}
                        type="button"
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`a2r-map ${activeMapMode === "night" ? "mode-night" : ""} ${activeMapMode === "satellite" ? "mode-satellite" : ""} ratio ratio-16x10`}>
                  <div className="grid" />
                  <div className="route" />
                  <div className="pin pickup" />
                  <div className="pin dest" />
                  <div className="position-absolute bottom-0 end-0 p-3" style={{ maxWidth: 260 }}>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between gap-3 text-white-50 small">
                        <span className="d-inline-flex align-items-center gap-2"><MapPin size={14} /> Pickup</span>
                        <span className="fw-semibold text-white">{pickup.slice(0, 18)}{pickup.length > 18 ? "…" : ""}</span>
                      </div>
                      <div className="d-flex justify-content-between gap-3 text-white-50 small">
                        <span className="d-inline-flex align-items-center gap-2"><Navigation size={14} /> Destination</span>
                        <span className="fw-semibold text-white">{destination.slice(0, 18)}{destination.length > 18 ? "…" : ""}</span>
                      </div>
                      <div className="d-flex justify-content-between gap-3 text-white-50 small">
                        <span className="d-inline-flex align-items-center gap-2"><Gauge size={14} /> ETA</span>
                        <span className="fw-semibold text-white">~{Math.max(35, Math.round((passengers * 42 + 75) / 2))} min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mt-3">
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                      <div className="text-white fw-bold">Weather Widget</div>
                      <Badge className={`rounded-pill ${weatherToneClasses.pill}`}> {weather.label}</Badge>
                    </div>
                    <div className="glass rounded-4 p-3">
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div>
                          <div className="text-white fw-semibold d-flex align-items-center gap-2">
                            <weather.icon size={18} />
                            {weather.desc}
                          </div>
                          <div className="text-white-50 small mt-1">Forecast updates with route selection</div>
                        </div>
                        <div className="text-white-50">
                          <span className="badge bg-white/10 text-white border border-white/15 rounded-pill">
                            {travelDate} • {travelTime}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 d-flex gap-2 flex-wrap">
                        {([
                          "sunny",
                          "cloudy",
                          "rain",
                          "heavy_rain",
                          "thunderstorm",
                          "fog",
                          "wind",
                          "flood",
                          "heat",
                        ] as WeatherKey[]).map((k) => {
                          const label =
                            k === "heavy_rain" ? "Heavy Rain" :
                            k === "thunderstorm" ? "Storm" :
                            k === "flood" ? "Flood" :
                            k === "heat" ? "Heat" :
                            k.replace(/_/g, " ");
                          const iconFor = k === "sunny" ? Sun : k === "cloudy" ? Cloud : k === "rain" || k === "heavy_rain" || k === "thunderstorm" ? CloudRain : k === "fog" ? Wind : k === "wind" ? Wind : k === "flood" ? Droplets : ThermometerSun;
                          const tone = k === "sunny" || k === "cloudy" ? "safe" : k === "rain" || k === "fog" || k === "wind" || k === "heat" ? "warning" : "danger";
                          const badgeCls = tone === "safe" ? "bg-success text-white" : tone === "warning" ? "bg-warning text-dark" : "bg-danger text-white";
                          const Icon = iconFor;
                          const active = weatherKey === k;

                          return (
                            <button
                              key={k}
                              type="button"
                              className={`btn btn-sm rounded-pill ${active ? "btn-light text-primary fw-bold" : "btn-outline-light text-white"}`}
                              onClick={() => setWeatherKey(k)}
                              aria-label={`Set weather to ${label}`}
                            >
                              <Icon size={14} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                      <div className="text-white fw-bold">Road Condition Widget</div>
                      <Badge className={`rounded-pill ${roadWidget.level === "safe" ? "bg-success text-white" : roadWidget.level === "recommended" ? "bg-primary text-white" : roadWidget.level === "caution" ? "bg-warning text-dark" : roadWidget.level === "emergency" ? "bg-danger text-white" : "bg-secondary text-white"}`}>
                        {roadWidget.label}
                      </Badge>
                    </div>
                    <div className="glass rounded-4 p-3">
                      <div className="d-flex align-items-center justify-content-between gap-3">
                        <div className="text-white-50 small">Live indicators based on selected weather</div>
                        <span className="badge bg-white/10 text-white border border-white/15 rounded-pill">
                          <Wrench size={14} className="me-1" /> Safety mode
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="d-flex justify-content-between text-white-50 small mb-2">
                          <span>Severity</span>
                          <span className="fw-semibold text-white">{roadWidget.key.toUpperCase()}</span>
                        </div>
                        <div className="progress" style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,0.12)" }}>
                          <div
                            className={`progress-bar ${roadWidget.color}`}
                            role="progressbar"
                            style={{ width: roadWidget.key === "excellent" || roadWidget.key === "good" ? "22%" : roadWidget.key === "fair" ? "48%" : roadWidget.key === "poor" ? "72%" : "92%" }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 d-flex flex-wrap gap-2">
                        {roadWidget.key === "excellent" && (
                          <>
                            <Badge className="rounded-pill bg-success text-white"><ShieldCheck size={14} className="me-1"/> Clear</Badge>
                            <Badge className="rounded-pill bg-white/10 text-white border border-white/15"><Leaf size={14} className="me-1"/> Eco</Badge>
                          </>
                        )}
                        {roadWidget.key === "fair" && (
                          <>
                            <Badge className="rounded-pill bg-primary text-white"><ShieldCheck size={14} className="me-1"/> Caution zone</Badge>
                            <Badge className="rounded-pill bg-warning text-dark"><CloudRain size={14} className="me-1"/> Wet segments</Badge>
                          </>
                        )}
                        {(roadWidget.key === "poor" || roadWidget.key === "flooded" || roadWidget.key === "closed") && (
                          <>
                            <Badge className="rounded-pill bg-danger text-white"><ShieldCheck size={14} className="me-1"/> Avoid</Badge>
                            <Badge className="rounded-pill bg-warning text-dark"><CloudRain size={14} className="me-1"/> High risk</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations + Featured Routes */}
      <section className="py-8 bg-body-tertiary">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-4">
            <div>
              <h2 className="fw-extrabold">Popular Destinations</h2>
              <p className="text-muted mb-0">Quick-pick locations used by enterprise fleet planners.</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline" className="rounded-pill" type="button">
                <MapPin size={16} className="me-2" /> Use saved routes
              </Button>
            </div>
          </div>

          <div className="row g-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-lg-4">
                  <SkeletonCard h={92} />
                </div>
              ))
            ) : (
              popularDestinations.map((d) => (
                <div key={d} className="col-12 col-sm-6 col-lg-4">
                  <button
                    type="button"
                    className="card border-0 shadow-sm rounded-4 bg-white hover-shadow-2 transition-all text-start"
                    onClick={() => setDestination(d)}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <MapPin size={18} className="text-primary" />
                            <div className="fw-bold">{d}</div>
                          </div>
                          <div className="text-muted small mt-2">Typical ETA: ~{Math.round(45 + Math.random() * 120)} min</div>
                        </div>
                        <span className="badge bg-primary-subtle text-primary rounded-pill">Popular</span>
                      </div>
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-3">
              <div>
                <h3 className="fw-extrabold">Featured Routes</h3>
                <p className="text-muted mb-0">Color-coded safety signals with ETA and distance.</p>
              </div>
              <div className="d-flex gap-2">
                <Badge className="bg-success text-white rounded-pill">Safe Route</Badge>
                <Badge className="bg-primary text-white rounded-pill">Recommended</Badge>
                <Badge className="bg-warning text-dark rounded-pill">Weather Warning</Badge>
                <Badge className="bg-danger text-white rounded-pill">Emergency</Badge>
              </div>
            </div>

            <div className="row g-3">
              {routes.map((r) => (
                <div key={r.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div>
                          <div className="fw-extrabold">{r.from} → {r.to}</div>
                          <div className="text-muted small mt-2">{r.km} km • ~{r.etaMin} min</div>
                        </div>
                        <div className="text-end">
                          <BadgeTone tone={r.roadClass} />
                          <div className="text-muted small mt-2">Route confidence</div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="badge bg-primary-subtle text-primary rounded-pill">GPS ETA</span>
                        <span className="badge bg-success-subtle text-success rounded-pill"><ShieldCheck size={14} className="me-1"/> Verified</span>
                        <span className="badge bg-warning-subtle text-warning rounded-pill"><CloudRain size={14} className="me-1"/> Weather-aware</span>
                      </div>

                      <div className="d-flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="rounded-pill flex-grow-1"
                          onClick={() => {
                            setPickup(r.from);
                            setDestination(r.to);
                          }}
                        >
                          <Route size={16} className="me-2" /> Plan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-pill"
                          onClick={() => setFavorites((prev) => ({ ...prev, [r.id]: !prev[r.id] }))}
                          aria-label="Favorite route"
                        >
                          <Heart size={16} className={favorites[r.id] ? "text-danger" : "text-muted"} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Vehicle Categories + Special Offers */}
      <section className="py-8">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
                <div>
                  <h3 className="fw-extrabold">Popular Vehicle Categories</h3>
                  <p className="text-muted mb-0">Designed for farm cargo, accessibility, and enterprise fleets.</p>
                </div>
                <Button variant="outline" className="rounded-pill" type="button">
                  <SlidersHorizontal size={16} className="me-2" /> Filter categories
                </Button>
              </div>

              <div className="row g-3">
                {VEHICLE_CATEGORIES.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.key} className="col-12 col-sm-6">
                      <button
                        type="button"
                        className="card border-0 shadow-sm rounded-4 text-start hover-shadow-2 transition-all"
                        onClick={() => setVehicleCategory(c.key)}
                      >
                        <div className="card-body p-4 d-flex align-items-center justify-content-between gap-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-4 d-flex align-items-center justify-content-center bg-primary-subtle text-primary" style={{ width: 46, height: 46 }}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <div className="fw-bold">{c.label}</div>
                              <div className="text-muted small">{c.badge}</div>
                            </div>
                          </div>
                          <span className={`badge rounded-pill ${vehicleCategory === c.key ? "bg-primary text-white" : "bg-secondary-subtle text-secondary"}`}>{vehicleCategory === c.key ? "Selected" : "Explore"}</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
                <div>
                  <h3 className="fw-extrabold">Special Offers</h3>
                  <p className="text-muted mb-0">UI preview of promotions (no backend).</p>
                </div>
              </div>

              <div className="row g-3">
                {[{ title: "Farm Route Peak Discount", code: "FARM-PEAK", tone: "bg-success" },
                  { title: "Cold-chain Priority Saver", code: "CHILL-FAST", tone: "bg-primary" },
                  { title: "Verified Driver Bonus", code: "VERIFIED+", tone: "bg-warning" }].map((o) => (
                  <div key={o.code} className="col-12">
                    <div className="card border-0 shadow-sm rounded-4">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start justify-content-between gap-3">
                          <div>
                            <div className="fw-extrabold">{o.title}</div>
                            <div className="text-muted small mt-1">Apply at checkout (UI only)</div>
                          </div>
                          <span className={`badge ${o.tone} text-white rounded-pill`}>{o.code}</span>
                        </div>
                        <div className="mt-3 d-flex gap-2">
                          <Button size="sm" className="rounded-pill">Use Offer <ArrowRight size={16} className="ms-1" /></Button>
                          <Button size="sm" variant="outline" className="rounded-pill">Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Accessibility */}
              <div className="mt-3">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3">
                      <span className="rounded-4 bg-success-subtle text-success" style={{ width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><ShieldCheck size={18} /></span>
                      <div>
                        <div className="fw-extrabold">Verified Transport Safety</div>
                        <div className="text-muted small">Insurance, GPS, and safety checks displayed in trip details.</div>
                      </div>
                    </div>
                    <div className="mt-3 d-flex flex-wrap gap-2">
                      <Badge className="bg-success text-white rounded-pill">Verified Vehicle</Badge>
                      <Badge className="bg-primary text-white rounded-pill">GPS Tracking</Badge>
                      <Badge className="bg-warning text-dark rounded-pill">Road Alerts</Badge>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Drivers */}
      <section className="py-8 bg-body-tertiary">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-4">
            <div>
              <h3 className="fw-extrabold">Featured Drivers</h3>
              <p className="text-muted mb-0">Verified badges, safety record and language preferences.</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline" className="rounded-pill" type="button">
                <Users size={16} className="me-2" /> Compare drivers
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="row g-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-3">
                  <SkeletonCard h={220} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-3">
              {drivers.map((d) => (
                <div key={d.id} className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <DriverAvatar seed={d.avatarSeed} />
                          <div>
                            <div className="fw-extrabold">{d.name}</div>
                            <div className="text-muted small">{d.role}</div>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className={`badge rounded-pill ${d.verified ? "bg-success text-white" : "bg-secondary text-white"}`}>
                            {d.verified ? <Verified size={14} className="me-1" /> : null}
                            {d.verified ? "Verified" : "Pending"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <Star size={16} className="text-warning" />
                            <span className="fw-bold">{d.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-muted small">{d.trips.toLocaleString()} trips</span>
                        </div>
                      </div>

                      <div className="mt-3 d-flex gap-2 flex-wrap">
                        {d.languages.slice(0, 3).map((l) => (
                          <span key={l} className="badge bg-white/10 text-muted border border-1 border-light/50 rounded-pill">{l}</span>
                        ))}
                        <span className="badge bg-primary-subtle text-primary rounded-pill"><ShieldCheck size={14} className="me-1"/> Safety</span>
                      </div>

                      <div className="mt-3 text-muted small line-clamp" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        Specialty: <span className="text-body">{d.specialty}</span>
                      </div>

                      <div className="mt-auto d-flex gap-2">
                        <Button size="sm" className="rounded-pill flex-grow-1">View Profile</Button>
                        <Button size="sm" variant="outline" className="rounded-pill" aria-label="Favorite driver">
                          <Heart size={16} className="text-muted" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials + Newsletter */}
      <section className="py-8">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
                    <div>
                      <h3 className="fw-extrabold">Customer Testimonials</h3>
                      <p className="text-muted mb-0">Enterprise-grade reassurance for logistics teams.</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary rounded-pill"
                        type="button"
                        aria-label="Previous testimonial"
                        onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="btn btn-outline-secondary rounded-pill"
                        type="button"
                        aria-label="Next testimonial"
                        onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="mt-3">
                      <div className="skeleton shimmer" style={{ height: 18, width: "72%", borderRadius: 10 }} />
                      <div className="mt-3 skeleton shimmer" style={{ height: 14, width: "60%", borderRadius: 10 }} />
                      <div className="mt-3 skeleton shimmer" style={{ height: 14, width: "55%", borderRadius: 10 }} />
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-2 text-success">
                        <MessageCircle size={18} />
                        <span className="fw-bold">Verified delivery experience</span>
                      </div>
                      <p className="fs-5 mb-0">
                        <span className="text-muted">“</span>{testimonials[testimonialIdx].quote}<span className="text-muted">”</span>
                      </p>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div>
                          <div className="fw-extrabold">{testimonials[testimonialIdx].name}</div>
                          <div className="text-muted small">{testimonials[testimonialIdx].role}</div>
                        </div>
                        <div className="d-flex gap-2">
                          {testimonials.map((t, idx) => (
                            <button
                              key={t.id}
                              type="button"
                              className={`btn btn-sm rounded-pill ${idx === testimonialIdx ? "btn-primary" : "btn-outline-secondary"}`}
                              onClick={() => setTestimonialIdx(idx)}
                              aria-label={`Select testimonial ${idx + 1}`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 d-flex flex-wrap gap-2">
                    <Badge className="bg-success text-white rounded-pill">ETA clarity</Badge>
                    <Badge className="bg-primary text-white rounded-pill">Weather + road alerts</Badge>
                    <Badge className="bg-warning text-dark rounded-pill">Verified drivers</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 bg-body-tertiary h-100">
                <div className="card-body p-4 p-md-5">
                  <h3 className="fw-extrabold">Newsletter</h3>
                  <p className="text-muted">Get route safety updates, weather insights, and booking UX tips.</p>

                  <div className="mt-3">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const el = document.getElementById("a2r-news-toast");
                        el?.setAttribute("data-show", "true");
                        setTimeout(() => el?.setAttribute("data-show", "false"), 2800);
                      }}
                    >
                      <label className="form-label text-muted small">Email address</label>
                      <div className="input-group">
                        <Input type="email" required placeholder="you@company.com" className="rounded-4" />
                        <Button className="rounded-4" type="submit">Subscribe</Button>
                      </div>
                      <div className="form-text">No backend integrations here — UI only.</div>
                      <div className="mt-4">
                        <div className="d-flex gap-2 flex-wrap">
                          <Badge className="bg-primary-subtle text-primary rounded-pill"><Sparkles size={14} className="me-1"/> Smart route tips</Badge>
                          <Badge className="bg-success-subtle text-success rounded-pill"><Leaf size={14} className="me-1"/> Eco logistics</Badge>
                          <Badge className="bg-warning-subtle text-warning rounded-pill"><CloudRain size={14} className="me-1"/> Alert previews</Badge>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4 border-top pt-4">
                    <div className="d-flex align-items-start gap-3">
                      <span className="rounded-4 bg-white border" style={{ width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <ShieldCheck size={18} className="text-success" />
                      </span>
                      <div>
                        <div className="fw-extrabold">Enterprise-ready UX</div>
                        <div className="text-muted small">Breadcrumb, sticky header, search, tables, modals, confirmations in later pages.</div>
                      </div>
                    </div>
                  </div>

                  <div id="a2r-news-toast" className="a2r-toast" data-show="false">Subscribed (UI preview)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ / Roadmap (UX improvement) */}
      <section className="py-6 bg-body-tertiary">
        <div className="container">
          <div className="row g-3">
            {[{ title: "Book in minutes", icon: Search }, { title: "Preview ETA & route", icon: Navigation }, { title: "Safety & compliance", icon: ShieldCheck }].map((x) => {
              const Icon = x.icon;
              return (
                <div key={x.title} className="col-12 col-md-4">
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3">
                        <span className="rounded-4 bg-primary-subtle text-primary" style={{ width: 46, height: 46, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={20} />
                        </span>
                        <div>
                          <div className="fw-extrabold">{x.title}</div>
                          <div className="text-muted small mt-1">UI-first with loading skeletons and confirmation patterns.</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="progress" style={{ height: 10, borderRadius: 999, background: "rgba(15,23,42,0.07)" }}>
                          <div className="progress-bar bg-primary" style={{ width: x.title === "Book in minutes" ? "75%" : x.title === "Preview ETA & route" ? "63%" : "82%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

