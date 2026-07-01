import { Link } from "react-router-dom";
import { MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Farm } from "@/data/sampleData";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  dairy: "Dairy",
  poultry: "Poultry",
  aquaculture: "Aquaculture",
  crop: "Crop",
  mixed: "Mixed Farm",
  cultural: "Cultural",
};

const typeColors: Record<string, string> = {
  dairy: "bg-blue-100 text-blue-700",
  poultry: "bg-orange-100 text-orange-700",
  aquaculture: "bg-cyan-100 text-cyan-700",
  crop: "bg-green-100 text-green-700",
  mixed: "bg-purple-100 text-purple-700",
  cultural: "bg-amber-100 text-amber-700",
};

interface FarmCardProps {
  farm: Farm;
  className?: string;
}

export function FarmCard({ farm, className }: FarmCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl overflow-hidden border border-border card-hover",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={farm.image}
          alt={farm.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 gradient-overlay" />
        {farm.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-secondary text-secondary-foreground font-semibold">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              typeColors[farm.type]
            )}
          >
            {typeLabels[farm.type]}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-primary-foreground font-bold text-lg leading-tight drop-shadow">
            {farm.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin size={14} className="text-accent" />
          <span>{farm.location}</span>
        </div>

        <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {farm.shortDesc}
        </p>

        {/* Activities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {farm.activities.slice(0, 3).map((activity) => (
            <span
              key={activity}
              className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded-full font-medium"
            >
              {activity}
            </span>
          ))}
          {farm.activities.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-0.5">
              +{farm.activities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-secondary text-secondary" />
              <span className="font-semibold text-sm">{farm.rating}</span>
              <span className="text-muted-foreground text-xs">({farm.reviewCount})</span>
            </div>
            <div className="text-primary font-bold text-sm">
              From ${farm.pricePerNight}
              <span className="text-muted-foreground font-normal text-xs">/night</span>
            </div>
          </div>
          <Link to={`/farm/${farm.id}`}>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-light">
              View Farm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
