import { useState, useEffect } from "react";
import { Star, ArrowRight, Sprout, Home, UtensilsCrossed, Music, Truck, Smartphone, BookOpen, Wrench } from "lucide-react";
import type { BookingItem } from "@/types/marketplace";
import { BOOKING_CATEGORY_LABELS } from "@/types/marketplace";
import { getBookingItemsByCategory, getAllBookingItems } from "@/data/booking-catalog";
import BookingModal from "@/components/marketplace/BookingModal";

const CATEGORY_ICONS: Record<string, typeof Sprout> = {
  agritourism: Sprout,
  farm_stay: Home,
  restaurant: UtensilsCrossed,
  events_festivals: Music,
  transportation: Truck,
  digital_products: Smartphone,
  education: BookOpen,
  agriculture_services: Wrench,
};

export default function BookingExplorer({ activeService }: { activeService?: string }) {
  const [category, setCategory] = useState<string>(activeService === 'restaurant' ? 'restaurant' : activeService === 'events_festivals' ? 'events_festivals' : activeService === 'transportation' ? 'transportation' : 'agritourism');

  // keep selected category synced when switching booking services from the mega-panel
  useEffect(() => {
    if (!activeService) return;
    if (activeService === 'restaurant') setCategory('restaurant');
    else if (activeService === 'events_festivals') setCategory('events_festivals');
    else if (activeService === 'transportation') setCategory('transportation');
    else if (activeService === 'agritourism') setCategory('agritourism');
  }, [activeService]);
  const [selected, setSelected] = useState<BookingItem | null>(null);
  const [open, setOpen] = useState(false);

  const items = getBookingItemsByCategory(category);
  const allItems = getAllBookingItems();

  const handleCardClick = (item: BookingItem) => {
    setSelected(item);
    setOpen(true);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
  };

  // Count items per category
  const getCategoryCount = (cat: string) => {
    return allItems.filter(item => item.bookingCategory === cat).length;
  };

  return (
    <div className="space-y-8">
      {/* Explore Other Services Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Explore Other Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {Object.entries(BOOKING_CATEGORY_LABELS).map(([key, label]) => {
            const Icon = CATEGORY_ICONS[key] || Sprout;
            const count = getCategoryCount(key);
            return (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`group rounded-xl p-4 border-2 transition-all duration-300 flex flex-col items-center text-center gap-3 ${
                  category === key
                    ? "bg-secondary border-secondary text-secondary-foreground shadow-md"
                    : "bg-card border-border text-foreground hover:border-secondary hover:bg-secondary/5"
                }`}
              >
                <div className={`p-3 rounded-lg transition-colors ${
                  category === key ? "bg-secondary-foreground/10" : "bg-secondary/10 group-hover:bg-secondary/20"
                }`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">{label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{count} listing{count !== 1 ? 's' : ''}</p>
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Browse by Category</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(BOOKING_CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${category === key ? "bg-secondary text-secondary-foreground border-secondary" : "bg-card text-foreground border-border hover:border-secondary hover:text-secondary"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group rounded-xl border border-border overflow-hidden bg-card flex flex-col hover:shadow-lg hover:border-secondary transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                    item.availability === 'available' ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                >
                  {item.availability === 'available' ? 'Available' : 'Limited'}
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col">
              {/* Farm Name */}
              {item.farmName && (
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                  {item.farmName}
                </p>
              )}

              {/* Title */}
              <h3 className="font-bold text-base text-foreground line-clamp-2 mb-2">
                {item.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center gap-0.5">
                  <Star size={14} className="fill-secondary text-secondary" />
                  <span className="font-bold text-sm text-foreground">{item.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-3"></div>

              {/* Location & Price */}
              <div className="space-y-2 mt-auto">
                <p className="text-xs text-muted-foreground">{item.location || "Various"}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-primary">
                    {item.currency} {item.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">/ {item.unit}</span>
                </div>
              </div>

              {/* CTA Text */}
              <p className="text-xs text-secondary font-semibold mt-3 group-hover:translate-x-1 transition-transform">
                Click to explore →
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Floating Modal Overlay */}
      <BookingModal open={open} onClose={() => { setOpen(false); setSelected(null); }} item={selected} />
    </div>
  );
}
