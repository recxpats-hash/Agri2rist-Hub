import { useState } from "react";
import type { BookingItem } from "@/types/marketplace";
import { BOOKING_CATEGORY_LABELS } from "@/types/marketplace";
import { getBookingItemsByCategory } from "@/data/booking-catalog";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/marketplace/BookingModal";

export default function BookingExplorer() {
  const [category, setCategory] = useState<string>("agritourism");
  const [selected, setSelected] = useState<BookingItem | null>(null);
  const [open, setOpen] = useState(false);

  const items = getBookingItemsByCategory(category);

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border overflow-hidden bg-card flex flex-col">
            <img src={item.image} alt={item.name} className="h-40 w-full object-cover" loading="lazy" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-sm text-foreground truncate">{item.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{item.shortDescription}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div>
                  <div className="text-primary font-extrabold">{item.currency} {item.price.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">per {item.unit}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-muted-foreground">{item.location || "Various"}</div>
                  <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => { setSelected(item); setOpen(true); }}>
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookingModal open={open} onClose={() => { setOpen(false); setSelected(null); }} item={selected} />

    </div>
  );
}
