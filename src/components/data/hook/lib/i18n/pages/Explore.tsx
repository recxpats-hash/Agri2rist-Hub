import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { FarmCard } from "@/components/farms/FarmCard";
import { SAMPLE_FARMS } from "@/data/sampleData";

const TYPES = ["All", "dairy", "poultry", "aquaculture", "crop", "mixed", "cultural"];
const REGIONS = ["All Regions", "Kenya", "Tanzania", "Uganda", "South Africa", "Ethiopia", "Ghana", "Morocco", "Rwanda"];

const typeLabels: Record<string, string> = {
  All: "All Types",
  dairy: "Dairy",
  poultry: "Poultry",
  aquaculture: "Aquaculture",
  crop: "Crop",
  mixed: "Mixed Farm",
  cultural: "Cultural",
};

export function ExploreFarmSection({ showHero = true }: { showHero?: boolean }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const filtered = SAMPLE_FARMS.filter((farm) => {
    const matchSearch =
      farm.name.toLowerCase().includes(search.toLowerCase()) ||
      farm.location.toLowerCase().includes(search.toLowerCase()) ||
      farm.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "All" || farm.type === selectedType;
    const matchRegion = selectedRegion === "All Regions" || farm.region === selectedRegion;
    return matchSearch && matchType && matchRegion;
  });

  return (
    <>
      {/* Hero */}
      {showHero && (
      <section id="explore" className="bg-primary py-14 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">
            Explore <span className="text-gradient-gold">Farm Experiences</span>
          </h1>
          <div className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-4xl mx-auto space-y-3">
            <p>
              Explore farms, book unforgettable stays, pick fresh farm produce, buy fresh products,
              connect with authentic experinced farmers & local communities, eat fresh organics
              from farm-to-table, and experience agriculture like never before.
            </p>
            <p>
              Visit real farms and meet local producers through unique, hands-on agricultural
              experiences.
            </p>
            <p className="font-semibold text-primary-foreground">Book your farm tour today!</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by farm name, location or activity..."
              className="pl-11 h-12 rounded-xl bg-card border-border text-foreground"
            />
          </div>
        </div>
      </section>
      )}

      {/* Filters + Grid */}
      <section id={showHero ? undefined : "explore"} className="py-10 bg-background">
        <div className="container mx-auto px-4">
          {!showHero && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                Explore <span className="text-primary">Farm Experiences</span>
              </h2>
              <div className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto space-y-3">
                <p>
                  Explore farms, book unforgettable stays, pick fresh farm produce, buy fresh
                  products, connect with authentic experinced farmers & local communities, eat
                  fresh organics from farm-to-table, and experience agriculture like never before.
                </p>
                <p>
                  Visit real farms and meet local producers through unique, hands-on agricultural
                  experiences.
                </p>
                <p className="font-semibold text-foreground">Book your farm tour today!</p>
              </div>
              <div className="max-w-2xl mx-auto relative mt-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by farm name, location or activity..."
                  className="pl-11 h-12 rounded-xl bg-card border-border text-foreground"
                />
              </div>
            </div>
          )}
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {typeLabels[type] || type}
                </button>
              ))}
            </div>
          </div>

          {/* Region Select */}
          <div className="flex flex-wrap gap-2 mb-8">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedRegion === region
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-card text-muted-foreground border-border hover:border-secondary hover:text-secondary"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground text-sm mb-6">
            Showing <strong className="text-foreground">{filtered.length}</strong> farm
            {filtered.length !== 1 ? "s" : ""}
            {selectedType !== "All" && ` · ${typeLabels[selectedType]}`}
            {selectedRegion !== "All Regions" && ` · ${selectedRegion}`}
          </p>

          {/* Farm Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((farm) => (
                <FarmCard key={farm.id} farm={farm} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No farms found matching your search.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSelectedType("All");
                  setSelectedRegion("All Regions");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Find Experiences on the Map
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use the map to explore nearby farms, producer communities, and rural experiences.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-brand">
            <iframe
              title="Agri2rist Hub Google Map"
              src="https://www.google.com/maps?q=Kampala%2C%20Uganda%20farms&output=embed"
              className="h-[360px] w-full md:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function ExplorePage() {
  return (
    <PageLayout>
      <ExploreFarmSection />
    </PageLayout>
  );
}
