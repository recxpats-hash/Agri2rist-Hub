import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, MapPin, Search, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

const MARKETPLACE_IMAGES = {
  beverages: "/locale/Marketplace/local-beverages.jpg",
  farmStay: "/locale/Marketplace/farm-stay-accommodation.webp",
  apples: "/locale/Marketplace/fruits-apples.jpg",
  goats: "/locale/Marketplace/livestock-goats.jpg",
  sportsFishing: "/locale/Marketplace/fish-sports-fishing.webp",
  seeds: "/locale/Marketplace/seeds.jpg",
  onions: "/locale/Marketplace/organic-vegetables-onions.jpg",
  honey: "/locale/Marketplace/honey.jpg",
  pineapple: "/locale/Marketplace/fruits-pineapple.webp",
  nilePerch: "/locale/Marketplace/fish-nile-perch.jpg",
  tomatoFarm: "/locale/Marketplace/farm-produce-tomato-farm.jpg",
  eggs: "/locale/Marketplace/poultry-eggs.jpg",
  herbs: "/locale/Marketplace/herbs-spices.jpeg",
  pigs: "/locale/Marketplace/livestock-pigs.jpg",
  dairy: "/locale/Marketplace/dairy-cows.jpg",
  flowers: "/locale/Marketplace/flowers.jpg",
  seedlings: "/locale/Marketplace/tree-seedlings.jpeg",
  equipment: "/locale/Marketplace/farm-equipment.jpg",
  cocoaTree: "/locale/Marketplace/cocoa-tree.jpg",
  cattle: "/locale/Marketplace/livestock-cattle.jpg",
  training: "/locale/Marketplace/training-services.jpg",
  handicrafts: "/locale/Marketplace/handicrafts.png",
  cocoaValueAdded: "/locale/Marketplace/cocoa-value-added.jpg",
  poultry: "/locale/Marketplace/poultry-cock.jpg",
  appleTrees: "/locale/Marketplace/apple-trees.png",
  tomatoes: "/locale/Marketplace/tomatoes.jpg",
};

const CATEGORIES = [
  {
    name: "Farm Produce",
    type: "Cereals, legumes, roots, vegetables",
    primary: "Fresh grains, tubers, vegetables, fruits",
    valueAdded: "Flours, dried produce, canned produce",
    byproducts: "Bran, husks, compost materials",
    images: [MARKETPLACE_IMAGES.tomatoFarm, MARKETPLACE_IMAGES.tomatoes, MARKETPLACE_IMAGES.pineapple],
  },
  {
    name: "Organic Vegetables",
    type: "Leafy, fruiting, root vegetables, herbs",
    primary: "Organic salad mixes and fresh vegetables",
    valueAdded: "Pickles, sauces, powders, pre-cut mixes",
    byproducts: "Scraps and seeds",
    images: [MARKETPLACE_IMAGES.onions, MARKETPLACE_IMAGES.tomatoes],
  },
  {
    name: "Honey Products",
    type: "Raw, comb, creamed, infused honey",
    primary: "Honey, beeswax, propolis, pollen",
    valueAdded: "Candles, cosmetics, tinctures",
    byproducts: "Wax residues and comb pieces",
    images: [MARKETPLACE_IMAGES.honey],
  },
  {
    name: "Dairy Products",
    type: "Cow, goat, and sheep milk",
    primary: "Milk, yogurt, cheese, butter, ghee",
    valueAdded: "Ice cream, flavored yogurt, milk powder",
    byproducts: "Whey and manure",
    images: [MARKETPLACE_IMAGES.dairy],
  },
  {
    name: "Fish & Aquaculture",
    type: "Tilapia, catfish, trout, prawns",
    primary: "Fresh fish, live fish, fillets",
    valueAdded: "Smoked fish, dried fish, fish oil",
    byproducts: "Fish meal and compost inputs",
    images: [MARKETPLACE_IMAGES.nilePerch, MARKETPLACE_IMAGES.sportsFishing],
  },
  {
    name: "Livestock",
    type: "Cattle, goats, sheep, pigs",
    primary: "Meat, milk, hides and skins",
    valueAdded: "Sausages, cured meats, leather goods",
    byproducts: "Bones, blood meal, manure",
    images: [MARKETPLACE_IMAGES.cattle, MARKETPLACE_IMAGES.goats, MARKETPLACE_IMAGES.pigs],
  },
  {
    name: "Poultry",
    type: "Broilers, layers, ducks, turkeys",
    primary: "Eggs and chicken meat",
    valueAdded: "Dressed chicken, smoked chicken, egg powder",
    byproducts: "Feathers and manure",
    images: [MARKETPLACE_IMAGES.eggs, MARKETPLACE_IMAGES.poultry],
  },
  {
    name: "Seeds & Seedlings",
    type: "Vegetable, fruit, grain, herb seeds",
    primary: "Certified seeds and seedlings",
    valueAdded: "Hybrid packs, organic seed collections",
    byproducts: "Seed husks",
    images: [MARKETPLACE_IMAGES.seeds],
  },
  {
    name: "Tree Seedlings",
    type: "Fruit, timber, shade, ornamental trees",
    primary: "Seedlings and grafted trees",
    valueAdded: "Tissue-cultured and high-yield grafts",
    byproducts: "Nursery compost",
    images: [MARKETPLACE_IMAGES.seedlings, MARKETPLACE_IMAGES.appleTrees],
  },
  {
    name: "Flowers",
    type: "Cut flowers, potted flowers, ornamentals",
    primary: "Bouquets and floral stems",
    valueAdded: "Arrangements, essential oils, potpourri",
    byproducts: "Petals and leaves",
    images: [MARKETPLACE_IMAGES.flowers],
  },
  {
    name: "Fruits",
    type: "Tropical, citrus, berries, stone fruits",
    primary: "Fresh fruits",
    valueAdded: "Juices, dried fruits, jams, wines",
    byproducts: "Peels and seeds",
    images: [MARKETPLACE_IMAGES.apples, MARKETPLACE_IMAGES.pineapple, MARKETPLACE_IMAGES.appleTrees],
  },
  {
    name: "Coffee",
    type: "Arabica and Robusta",
    primary: "Green beans, roasted beans, ground coffee",
    valueAdded: "Instant coffee, cascara tea, cosmetics",
    byproducts: "Husks and parchment",
    images: [MARKETPLACE_IMAGES.training],
  },
  {
    name: "Cocoa",
    type: "Cocoa beans and nibs",
    primary: "Beans, nibs, powder",
    valueAdded: "Chocolate, butter, cocoa liquor",
    byproducts: "Pod husks and shells",
    images: [MARKETPLACE_IMAGES.cocoaTree, MARKETPLACE_IMAGES.cocoaValueAdded],
  },
  {
    name: "Herbs & Spices",
    type: "Culinary, medicinal, aromatic spices",
    primary: "Fresh herbs, dried herbs, whole spices",
    valueAdded: "Essential oils, teas, spice blends",
    byproducts: "Powder residues",
    images: [MARKETPLACE_IMAGES.herbs],
  },
  {
    name: "Handicrafts",
    type: "Woodwork, basketry, leather, beadwork",
    primary: "Decor and household items",
    valueAdded: "Custom crafts and fashion accessories",
    byproducts: "Reusable offcuts",
    images: [MARKETPLACE_IMAGES.handicrafts],
  },
  {
    name: "Local Beverages",
    type: "Fruit juices, fermented, herbal drinks",
    primary: "Fresh beverages",
    valueAdded: "Bottled drinks, concentrates, craft brews",
    byproducts: "Fruit pulp compost",
    images: [MARKETPLACE_IMAGES.beverages],
  },
  {
    name: "Farm Stay Accommodation",
    type: "Lodges, cottages, camping sites",
    primary: "Accommodation and meals",
    valueAdded: "Farm tours, workshops, cultural experiences",
    byproducts: "Local supplier demand",
    images: [MARKETPLACE_IMAGES.farmStay],
  },
  {
    name: "Farm Equipment",
    type: "Tools, machinery, irrigation, greenhouses",
    primary: "Tools and machines",
    valueAdded: "Rental, repair, custom fabrication",
    byproducts: "Parts recovery",
    images: [MARKETPLACE_IMAGES.equipment],
  },
  {
    name: "Training Services",
    type: "Farmer training, workshops, field days, study tours",
    primary: "Practical agriculture and agritourism skills",
    valueAdded: "Certification, mentorship, and business readiness",
    byproducts: "Youth employment and knowledge transfer",
    images: [MARKETPLACE_IMAGES.training],
  },
];

const FEATURED_LISTINGS = [
  { name: "Tropical Fruit Box", category: "Fruits", seller: "Community Harvest Cooperative", price: "UGX 38,000 / box", location: "Masaka", image: MARKETPLACE_IMAGES.pineapple },
  { name: "Fresh Nile Perch Order", category: "Fish & Aquaculture", seller: "Blue Lagoon Aquaculture", price: "UGX 18,000 / kg", location: "Jinja", image: MARKETPLACE_IMAGES.nilePerch },
  { name: "Safari Farm Lodge Weekend", category: "Farm Stay Accommodation", seller: "Green Valley Farm Stay", price: "UGX 240,000 / night", location: "Fort Portal", image: MARKETPLACE_IMAGES.farmStay },
  { name: "Tractor Rental", category: "Farm Equipment", seller: "Regional Equipment Pool", price: "UGX 300,000 / day", location: "Mbarara", image: MARKETPLACE_IMAGES.equipment },
  { name: "Youth Agribusiness Training", category: "Training Services", seller: "Agri2rist Training Hub", price: "UGX 60,000 / seat", location: "Kampala", image: MARKETPLACE_IMAGES.training },
  { name: "Free-Range Egg Tray", category: "Poultry", seller: "Sunrise Poultry Farm", price: "UGX 14,000 / tray", location: "Mukono", image: MARKETPLACE_IMAGES.eggs },
];

const PRODUCT_CLASSES = ["All", "Primary", "ValueAdded", "ByProduct"];

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [productClass, setProductClass] = useState("All");
  const { toast } = useToast();

  const filteredCategories = useMemo(() => {
    const search = query.toLowerCase();
    return CATEGORIES.filter((item) => {
      const matchesCategory = category === "All" || item.name === category;
      const text = `${item.name} ${item.type} ${item.primary} ${item.valueAdded} ${item.byproducts}`.toLowerCase();
      const matchesSearch = !search || text.includes(search);
      const matchesClass =
        productClass === "All" ||
        (productClass === "Primary" && item.primary.toLowerCase().includes(search || "")) ||
        (productClass === "ValueAdded" && item.valueAdded.toLowerCase().includes(search || "")) ||
        (productClass === "ByProduct" && item.byproducts.toLowerCase().includes(search || ""));
      return matchesCategory && matchesSearch && matchesClass;
    });
  }, [category, productClass, query]);

  const listings = FEATURED_LISTINGS.filter((listing) => category === "All" || listing.category === category);

  const addToCart = (name: string) => {
    toast({ title: "Added to cart", description: `${name} is ready for checkout or quote request.` });
  };

  return (
    <PageLayout>
      <section className="bg-primary py-16">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Farm and rural enterprise marketplace</Badge>
            <h1 className="max-w-3xl text-4xl font-extrabold text-primary-foreground md:text-5xl">
              Buy products, book stays, and request farm services from verified sellers.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/78">
              A cleaner catalog for primary products, value-added goods, byproducts, accommodation, equipment, and rural services.
            </p>
          </div>
          <div className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 p-5">
            <div className="grid grid-cols-3 gap-3 text-center text-primary-foreground">
              <Metric value={String(CATEGORIES.length)} label="Categories" />
              <Metric value="3" label="Product classes" />
              <Metric value="100%" label="Verified flow" />
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-border bg-background/95 py-4 backdrop-blur">
        <div className="container mx-auto grid grid-cols-1 gap-3 px-4 lg:grid-cols-[1fr_220px_180px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, value-added goods, byproducts, or location" className="pl-10" />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              {CATEGORIES.map((item) => <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={productClass} onValueChange={setProductClass}>
            <SelectTrigger><Filter size={16} className="mr-2" /><SelectValue /></SelectTrigger>
            <SelectContent>
              {PRODUCT_CLASSES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 xl:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">Marketplace Catalog</h2>
                <p className="text-sm text-muted-foreground">{filteredCategories.length} category groups match your filters.</p>
              </div>
              {(query || category !== "All" || productClass !== "All") && (
                <Button variant="outline" onClick={() => { setQuery(""); setCategory("All"); setProductClass("All"); }}>Clear</Button>
              )}
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="hidden p-3 lg:table-cell">Types</th>
                    <th className="p-3">Primary / Value-added / Byproducts</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((item) => (
                    <tr key={item.name} className="border-t border-border align-top">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <CategoryImages name={item.name} images={item.images} />
                          <div>
                            <div className="font-bold text-foreground">{item.name}</div>
                            <div className="text-xs text-muted-foreground lg:hidden">{item.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden p-3 text-muted-foreground lg:table-cell">{item.type}</td>
                      <td className="p-3 text-muted-foreground">
                        <span className="font-medium text-foreground">{item.primary}</span>
                        <span className="block">{item.valueAdded}</span>
                        <span className="block text-xs">{item.byproducts}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside>
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-xl font-extrabold text-foreground">Featured Listings</h2>
              <div className="mt-4 space-y-4">
                {listings.map((listing) => (
                  <div key={listing.name} className="grid grid-cols-[76px_1fr] gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                    <img src={listing.image} alt={listing.name} className="h-20 w-full rounded-md object-cover" loading="lazy" decoding="async" />
                    <div>
                      <div className="font-bold text-foreground">{listing.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={12} />{listing.location}</div>
                      <div className="mt-1 text-sm font-semibold text-primary">{listing.price}</div>
                      <Button size="sm" variant="outline" className="mt-2 h-8" onClick={() => addToCart(listing.name)}>
                        <ShoppingCart size={14} className="mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 lg:grid-cols-3">
          <TrustPoint icon={ShieldCheck} title="Verified Sellers" body="Identity, contact, business, location, and product validation before publishing." />
          <TrustPoint icon={ShoppingCart} title="Cart or Quote" body="Buy products directly, reserve farm stays, or request pricing for services and equipment." />
          <TrustPoint icon={Star} title="Reviews and Ratings" body="Ratings connect product quality, seller reliability, and farm experience feedback." />
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">Ready to sell through Agri2rist?</h2>
            <p className="mt-1 text-muted-foreground">Create a verified host profile, add products, and manage bookings from one dashboard.</p>
          </div>
          <Link to="/get-listed">
            <Button className="bg-primary text-primary-foreground">Become a Vendor <ArrowRight size={16} className="ml-2" /></Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-primary-foreground/70">{label}</div>
    </div>
  );
}

function CategoryImages({ name, images }: { name: string; images: string[] }) {
  return (
    <div className="flex w-[88px] shrink-0 -space-x-3">
      {images.slice(0, 3).map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`${name} ${index + 1}`}
          className="h-14 w-14 rounded-md border-2 border-background object-cover"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}

function TrustPoint({ icon: Icon, title, body }: { icon: typeof ShieldCheck; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <Icon className="mb-3 text-primary" size={24} />
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
