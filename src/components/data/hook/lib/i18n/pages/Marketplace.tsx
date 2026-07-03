import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, MapPin, Minus, Plus, Search, ShieldCheck, ShoppingCart, Star } from "lucide-react";
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
  { id: "fruit-box", name: "Tropical Fruit Box", category: "Fruits", seller: "Community Harvest Cooperative", price: 38000, unit: "box", location: "Masaka", image: MARKETPLACE_IMAGES.pineapple },
  { id: "nile-perch", name: "Fresh Nile Perch Order", category: "Fish & Aquaculture", seller: "Blue Lagoon Aquaculture", price: 18000, unit: "kg", location: "Jinja", image: MARKETPLACE_IMAGES.nilePerch },
  { id: "farm-lodge", name: "Safari Farm Lodge Weekend", category: "Farm Stay Accommodation", seller: "Green Valley Farm Stay", price: 240000, unit: "night", location: "Fort Portal", image: MARKETPLACE_IMAGES.farmStay },
  { id: "tractor-rental", name: "Tractor Rental", category: "Farm Equipment", seller: "Regional Equipment Pool", price: 300000, unit: "day", location: "Mbarara", image: MARKETPLACE_IMAGES.equipment },
  { id: "training-seat", name: "Youth Agribusiness Training", category: "Training Services", seller: "Agri2rist Training Hub", price: 60000, unit: "seat", location: "Kampala", image: MARKETPLACE_IMAGES.training },
  { id: "egg-tray", name: "Free-Range Egg Tray", category: "Poultry", seller: "Sunrise Poultry Farm", price: 14000, unit: "tray", location: "Mukono", image: MARKETPLACE_IMAGES.eggs },
];

const PRODUCT_CLASSES = ["All", "Primary", "ValueAdded", "ByProduct"];
const PAYMENT_METHODS = ["MTN Mobile Money", "Airtel Money", "Visa / Mastercard", "Bank Transfer", "Pay on Pickup"];
const EVENT_HOSTS = ["Farmers", "Agricultural cooperatives", "Agribusiness companies", "Tourism operators", "Farm stay hosts", "Hotels and lodges", "Local communities", "Cultural institutions", "Educational institutions", "NGOs", "Government agencies", "Youth organizations", "Women’s associations", "Food vendors", "Handicraft producers"];
const EVENT_TYPES = [
  { title: "Agricultural Events", items: ["Agricultural shows", "Farm open days", "Livestock exhibitions", "Fish farming exhibitions", "Apiary demonstrations", "Greenhouse tours"] },
  { title: "Tourism Events", items: ["Farm tours", "Nature walks", "Bird watching", "Camping weekends", "Eco-tourism adventures", "Recreational fishing"] },
  { title: "Educational Events", items: ["Farmer training", "Workshops", "Seminars", "Field days", "Student study tours", "Technology demonstrations"] },
  { title: "Cultural and Food Events", items: ["Traditional dance festivals", "Heritage celebrations", "Music festivals", "Farm-to-table experiences", "Coffee festivals", "Farmers markets"] },
  { title: "Business Events", items: ["Trade fairs", "Investment forums", "Agribusiness networking", "Product launches", "Business matchmaking", "Startup pitches"] },
];
const EVENT_DASHBOARD = ["Create and edit events", "Publish event pages", "Sell tickets online", "Track registrations", "Manage attendance", "Send announcements", "View reports", "Download participant lists", "Manage sponsors", "Collect feedback"];
const EVENT_VISITOR_TOOLS = ["Search by region, date, category and price", "Register participants", "Receive instant confirmation", "Use QR code tickets", "Get directions and calendar reminders", "Download programmes", "Reserve accommodation", "Book farm tours", "Leave reviews"];
const EVENT_STANDARDS = ["Safe visitor access", "Health and safety guidance", "Emergency response procedures", "Qualified coordinators", "Clean sanitation", "Food hygiene compliance", "Parking and traffic management", "Sustainability practices"];
const EVENT_BENEFITS = ["Reach local and international visitors", "Increase farm and business income", "Promote products and services", "Build your brand", "Strengthen community partnerships", "Support rural tourism", "Generate repeat visitors", "Access performance analytics"];

type Listing = (typeof FEATURED_LISTINGS)[number];
type Cart = Record<string, number>;

const formatUgx = (amount: number) => `UGX ${amount.toLocaleString()}`;

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [productClass, setProductClass] = useState("All");
  const [cart, setCart] = useState<Cart>({});
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
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

  const cartItems = useMemo(
    () =>
      FEATURED_LISTINGS.map((listing) => ({ ...listing, quantity: cart[listing.id] || 0 }))
        .filter((item) => item.quantity > 0),
    [cart]
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = itemCount > 0 ? Math.round(subtotal * 0.025) : 0;
  const total = subtotal + serviceFee;

  const setQuantity = (listing: Listing, quantity: number) => {
    const nextQuantity = Math.max(0, quantity);
    setCart((current) => {
      const next = { ...current };
      if (nextQuantity === 0) {
        delete next[listing.id];
      } else {
        next[listing.id] = nextQuantity;
      }
      return next;
    });
  };

  const addToCart = (listing: Listing) => {
    setQuantity(listing, (cart[listing.id] || 0) + 1);
    toast({ title: "Added to basket", description: `${listing.name} quantity updated.` });
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      toast({ title: "Basket is empty", description: "Add at least one marketplace item before checkout." });
      return;
    }

    const order = {
      items: cartItems,
      paymentMethod,
      subtotal,
      serviceFee,
      total,
      status: "payment_pending",
      createdAt: new Date().toISOString(),
    };
    const saved = JSON.parse(localStorage.getItem("agri2rist_marketplace_orders") || "[]");
    localStorage.setItem("agri2rist_marketplace_orders", JSON.stringify([...saved, order]));
    toast({
      title: "Payment flow started",
      description: `${formatUgx(total)} via ${paymentMethod}. Your order is saved as payment pending.`,
    });
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

          <aside className="space-y-5">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">Shopping Basket</h2>
                  <p className="text-sm text-muted-foreground">{itemCount} product unit{itemCount === 1 ? "" : "s"} selected</p>
                </div>
                <div className="relative rounded-full bg-primary p-3 text-primary-foreground">
                  <ShoppingCart size={20} />
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-bold text-secondary-foreground">
                    {itemCount}
                  </span>
                </div>
              </div>

              {cartItems.length > 0 ? (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="rounded-md border border-border p-3">
                      <div className="mb-2 flex justify-between gap-3">
                        <div>
                          <div className="font-semibold text-foreground">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{formatUgx(item.price)} / {item.unit}</div>
                        </div>
                        <div className="text-right text-sm font-bold text-primary">{formatUgx(item.price * item.quantity)}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Units</span>
                        <div className="flex items-center rounded-md border border-border">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setQuantity(item, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>
                            <Minus size={14} />
                          </Button>
                          <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setQuantity(item, item.quantity + 1)} aria-label={`Increase ${item.name}`}>
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
                  Add products from Featured Listings to calculate basket totals and start payment.
                </div>
              )}

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <PriceRow label="Subtotal" value={subtotal} />
                <PriceRow label="Service fee" value={serviceFee} />
                <div className="flex justify-between pt-2 text-base font-extrabold">
                  <span>Total</span>
                  <span className="text-primary">{formatUgx(total)}</span>
                </div>
              </div>

              <div className="mt-4">
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="mt-3 w-full bg-secondary text-secondary-foreground" onClick={checkout}>
                  Proceed to Payment
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-xl font-extrabold text-foreground">Featured Listings</h2>
              <div className="mt-4 space-y-4">
                {listings.map((listing) => (
                  <div key={listing.name} className="grid grid-cols-[76px_1fr] gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                    <img src={listing.image} alt={listing.name} className="h-20 w-full rounded-md object-cover" loading="lazy" decoding="async" />
                    <div>
                      <div className="font-bold text-foreground">{listing.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={12} />{listing.location}</div>
                      <div className="mt-1 text-sm font-semibold text-primary">{formatUgx(listing.price)} / {listing.unit}</div>
                      <Button size="sm" variant="outline" className="mt-2 h-8" onClick={() => addToCart(listing)}>
                        <ShoppingCart size={14} className="mr-1" /> Add {cart[listing.id] ? `(${cart[listing.id]})` : ""}
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
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <Badge className="mb-3 bg-secondary text-secondary-foreground">Agri2rist Hub Events</Badge>
            <h2 className="mb-3 text-3xl font-extrabold text-foreground">
              Connect People Through Agriculture, Tourism, Culture, and Community
            </h2>
            <p className="text-muted-foreground">
              Create, promote, manage, and join farm festivals, exhibitions, farmers markets, workshops, cultural celebrations, food fairs, livestock competitions, and eco-tourism experiences.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <EventPanel title="Who Can Host Events?" items={EVENT_HOSTS} />
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-4 font-extrabold text-foreground">Types of Events</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {EVENT_TYPES.map((group) => (
                  <div key={group.title} className="rounded-md bg-muted p-3">
                    <div className="mb-2 font-bold text-foreground">{group.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full bg-card px-2 py-1 text-[11px] text-muted-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <EventPanel title="Event Management Dashboard" items={EVENT_DASHBOARD} />
            <EventPanel title="Visitor Registration and Booking" items={EVENT_VISITOR_TOOLS} />
            <EventPanel title="Safety and Event Standards" items={EVENT_STANDARDS} />
            <EventPanel title="Benefits of Hosting Events" items={EVENT_BENEFITS} />
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
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

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{formatUgx(value)}</span>
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

function EventPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-3 font-extrabold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-accent" />
            <span>{item}</span>
          </div>
        ))}
      </div>
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
