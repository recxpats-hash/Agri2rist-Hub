export interface Farm {
  id: string;
  name: string;
  type: "dairy" | "poultry" | "aquaculture" | "crop" | "mixed" | "cultural";
  location: string;
  region: string;
  description: string;
  shortDesc: string;
  image: string;
  images: string[];
  activities: string[];
  accommodationTypes: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  membershipTier: "free" | "standard" | "premium";
}

export interface Product {
  id: string;
  farmId: string;
  farmName: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  available: boolean;
}

export interface Booking {
  id: string;
  farmId: string;
  farmName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  accommodationType: string;
  specialRequests: string;
  bookingRef: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface MemberListing {
  id: string;
  farmName: string;
  type: string;
  location: string;
  region: string;
  description: string;
  activities: string[];
  accommodationTypes: string[];
  membershipTier: "free" | "standard" | "premium";
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: "pending_review" | "approved" | "rejected";
  createdAt: string;
}

export const FARM_IMAGES = {
  dairy: "/locale/dairy.webp",
  eggs: "/locale/eggs.webp",
  poultry: "/locale/poultry.webp",
  fishPonds: "/locale/fish-ponds.webp",
  fishNet: "/locale/fish-net.webp",
  tilapia: "/locale/tilapia.webp",
  groupTour: "/locale/group-tour.webp",
  logo: "/locale/agri2rist-logo.webp",
  equipment: "/locale/Equipments/HG101 (1).jpg",
  eventHosting: "/locale/Event hosting/IMG-20230920-WA0053.jpg",
  fishFarm: "/locale/Farm fish/Tilapia-Table size.webp",
  fishFarmPonds: "/locale/Farm fish/2debc39ccdafd3e9eb3f96ceadfdfee2.jpg",
  farmFruits: "/locale/Farm fruits/0069c4be0a7e9413b9c613a5e52aa4c2.jpg",
  farmStay: "/locale/farm stay/1b3dc19aecb5ac5cb903a3994a4473ac.jpg",
  training: "/locale/Training/IMG-20170903-WA0024.jpg",
};

export const SAMPLE_FARMS: Farm[] = [
  {
    id: "farm-001",
    name: "Green Valley Dairy Farm",
    type: "dairy",
    location: "Nairobi, Kenya",
    region: "Kenya",
    description:
      "Experience authentic dairy farming at its finest. Watch our Holstein cows being milked with state-of-the-art DeLaval equipment, learn about sustainable dairy practices, and enjoy fresh milk products straight from the farm. Our 300-acre property offers breathtaking views and a genuine connection to rural life.",
    shortDesc: "Authentic dairy farm experience with modern milking technology and farm-to-table products.",
    image: FARM_IMAGES.dairy,
    images: [FARM_IMAGES.dairy, FARM_IMAGES.fishPonds],
    activities: ["Milking Demonstrations", "Farm Tours", "Cheese Making", "Nature Walks", "Farm-to-Table Meals"],
    accommodationTypes: ["Farmhouse B&B", "Private Cottage", "Glamping Tent"],
    pricePerNight: 180,
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    membershipTier: "premium",
  },
  {
    id: "farm-002",
    name: "Sunrise Poultry & Egg Farm",
    type: "poultry",
    location: "Arusha, Tanzania",
    region: "Tanzania",
    description:
      "Discover the world of egg production and poultry farming at our state-of-the-art facility. From hen houses to automated egg grading and sorting, guests get an incredible behind-the-scenes look at how fresh eggs are produced and distributed. Perfect for families and school groups.",
    shortDesc: "Behind-the-scenes look at modern poultry and egg production with hands-on experiences.",
    image: FARM_IMAGES.eggs,
    images: [FARM_IMAGES.eggs, FARM_IMAGES.poultry],
    activities: ["Egg Grading Tours", "Poultry Care Workshops", "Cooking Classes", "Farm Breakfast"],
    accommodationTypes: ["Farm Cabin", "Shared Dormitory"],
    pricePerNight: 120,
    rating: 4.6,
    reviewCount: 87,
    featured: true,
    membershipTier: "standard",
  },
  {
    id: "farm-003",
    name: "Blue Lagoon Aquaculture",
    type: "aquaculture",
    location: "Jinja, Uganda",
    region: "Uganda",
    description:
      "Nestled against mountain backdrops, our tilapia and freshwater fish farm offers one of the most unique agritourism experiences in Australia. Watch professional fish harvesting with nets, learn about sustainable aquaculture practices, and taste the freshest fish you've ever had.",
    shortDesc: "Freshwater fish farming with stunning mountain views and net-harvesting demonstrations.",
    image: FARM_IMAGES.fishPonds,
    images: [FARM_IMAGES.fishPonds, FARM_IMAGES.fishNet, FARM_IMAGES.tilapia],
    activities: ["Fish Harvesting", "Net Fishing", "Aquaculture Workshops", "Fresh Fish Tasting", "Pond Tours"],
    accommodationTypes: ["Lakeside Cabin", "Eco Tent"],
    pricePerNight: 150,
    rating: 4.9,
    reviewCount: 203,
    featured: true,
    membershipTier: "premium",
  },
  {
    id: "farm-004",
    name: "Red Tilapia Premium Fish Farm",
    type: "aquaculture",
    location: "Kampala, Uganda",
    region: "Uganda",
    description:
      "Specialising in premium red tilapia, our farm welcomes guests to experience the full cycle of commercial fish farming. From fingerling to harvest, learn about water quality management, feeding programs, and sustainable aquaculture. Fresh fish available for purchase directly from the farm.",
    shortDesc: "Premium red tilapia farming with harvest experiences and fresh produce sales.",
    image: FARM_IMAGES.tilapia,
    images: [FARM_IMAGES.tilapia, FARM_IMAGES.fishNet],
    activities: ["Harvesting Experience", "Fish Tasting", "Cooking Demo", "Aquaculture Training"],
    accommodationTypes: ["Farmstay Room", "Self-Contained Unit"],
    pricePerNight: 130,
    rating: 4.7,
    reviewCount: 56,
    featured: false,
    membershipTier: "standard",
  },
  {
    id: "farm-005",
    name: "Horizon Broiler Farm",
    type: "poultry",
    location: "Addis Ababa, Ethiopia",
    region: "Ethiopia",
    description:
      "One of Australia's most modern broiler chicken operations, our farm showcases how technology and animal husbandry combine to produce high-quality poultry. Educational tours available for all ages, focusing on biosecurity, animal welfare, and the science of modern chicken farming.",
    shortDesc: "Modern broiler chicken facility with educational tours on animal welfare and technology.",
    image: FARM_IMAGES.poultry,
    images: [FARM_IMAGES.poultry, FARM_IMAGES.eggs],
    activities: ["Poultry Farm Tours", "Animal Welfare Education", "Processing Overview", "Farm Lunch"],
    accommodationTypes: ["Farm Cottage", "B&B Room"],
    pricePerNight: 110,
    rating: 4.5,
    reviewCount: 41,
    featured: false,
    membershipTier: "free",
  },
  {
    id: "farm-006",
    name: "Dreamtime Cultural Farm Stay",
    type: "cultural",
    location: "Maasai Mara, Kenya",
    region: "Kenya",
    description:
      "A unique Aboriginal-led cultural agritourism experience combining traditional land management practices with modern farming. Learn about bush tucker, traditional fishing, indigenous aquaculture, and the deep connection between Aboriginal communities and the land. A truly transformative journey.",
    shortDesc: "Aboriginal-led cultural farming experience connecting traditional wisdom with modern agritourism.",
    image: FARM_IMAGES.groupTour,
    images: [FARM_IMAGES.groupTour, FARM_IMAGES.fishPonds],
    activities: ["Aboriginal Cultural Tours", "Bush Tucker Walk", "Traditional Fishing", "Dot Painting", "Storytelling", "Cultural Ceremonies"],
    accommodationTypes: ["Cultural Camp", "Outback Cabin", "Swag Under Stars"],
    pricePerNight: 200,
    rating: 5.0,
    reviewCount: 312,
    featured: true,
    membershipTier: "premium",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    farmId: "farm-001",
    farmName: "Green Valley Dairy Farm",
    name: "Fresh Farm Milk (2L)",
    category: "Dairy",
    description: "Unhomogenised full-cream milk from our pasture-fed Holsteins. Collected daily.",
    price: 6.5,
    unit: "2L bottle",
    image: FARM_IMAGES.dairy,
    available: true,
  },
  {
    id: "prod-002",
    farmId: "farm-001",
    farmName: "Green Valley Dairy Farm",
    name: "Artisan Cheddar Cheese (500g)",
    category: "Dairy",
    description: "Hand-crafted aged cheddar made on-site. Rich, creamy, and full of flavour.",
    price: 18.0,
    unit: "500g block",
    image: FARM_IMAGES.dairy,
    available: true,
  },
  {
    id: "prod-003",
    farmId: "farm-002",
    farmName: "Sunrise Poultry & Egg Farm",
    name: "Free-Range Eggs (Dozen)",
    category: "Eggs & Poultry",
    description: "Fresh eggs collected daily from our free-range hens. Grade A, jumbo size.",
    price: 8.0,
    unit: "dozen",
    image: FARM_IMAGES.eggs,
    available: true,
  },
  {
    id: "prod-004",
    farmId: "farm-003",
    farmName: "Blue Lagoon Aquaculture",
    name: "Fresh Red Tilapia (1kg)",
    category: "Seafood & Fish",
    description: "Premium farm-raised red tilapia, cleaned and iced. Harvested to order.",
    price: 22.0,
    unit: "per kg",
    image: FARM_IMAGES.tilapia,
    available: true,
  },
  {
    id: "prod-005",
    farmId: "farm-003",
    farmName: "Blue Lagoon Aquaculture",
    name: "Live Tilapia Fingerlings",
    category: "Seafood & Fish",
    description: "Healthy fingerlings for home aquaculture or pond stocking. Pack of 50.",
    price: 45.0,
    unit: "pack of 50",
    image: FARM_IMAGES.fishNet,
    available: true,
  },
  {
    id: "prod-006",
    farmId: "farm-005",
    farmName: "Horizon Broiler Farm",
    name: "Whole Broiler Chicken",
    category: "Eggs & Poultry",
    description: "Farm-fresh whole chicken, raised on our farm with no added hormones.",
    price: 16.0,
    unit: "per bird (~2kg)",
    image: FARM_IMAGES.poultry,
    available: true,
  },
];

export const RURAL_LIFE_WAYS = [
  {
    id: 1,
    title: "Farm Stays",
    description: "Sleep under the stars on a working farm. Wake to roosters, fresh air, and an authentic rural morning that city life can't replicate.",
    icon: "Home",
    color: "accent",
  },
  {
    id: 2,
    title: "Farm Tours & Workshops",
    description: "Go behind the scenes of real farm operations — from milking to harvesting. Learn hands-on skills directly from passionate farmers.",
    icon: "Eye",
    color: "primary",
  },
  {
    id: 3,
    title: "Farmers Markets",
    description: "Shop directly from producers. Taste seasonal, regional produce and connect with the people who grow your food.",
    icon: "ShoppingBag",
    color: "secondary",
  },
  {
    id: 4,
    title: "Pick-Your-Own Experiences",
    description: "Pick strawberries, apples, herbs and more straight from the vine or tree. A magical experience for families and food lovers.",
    icon: "Apple",
    color: "accent",
  },
  {
    id: 5,
    title: "Farm-to-Table Dining",
    description: "Eat meals prepared with ingredients harvested that morning. Taste the difference that freshness makes on every plate.",
    icon: "Utensils",
    color: "primary",
  },
  {
    id: 6,
    title: "Agri-Recreation & Adventure",
    description: "Horse riding, tractor drives, fishing in farm dams — rural adventure experiences that connect you with the land.",
    icon: "Bike",
    color: "secondary",
  },
  {
    id: 7,
    title: "Rural Festivals & Events",
    description: "From harvest festivals to field days, rural events celebrate the seasons and bring communities together in joyful ways.",
    icon: "Calendar",
    color: "accent",
  },
  {
    id: 8,
    title: "Wildlife & Nature Watching",
    description: "Farm environments teem with wildlife. Spot native birds, marsupials and insects that only thrive in healthy rural ecosystems.",
    icon: "Bird",
    color: "primary",
  },
  {
    id: 9,
    title: "Eco & Sustainable Tourism",
    description: "Visit farms pioneering regenerative agriculture, solar power, and water conservation. Witness sustainability in action.",
    icon: "Leaf",
    color: "accent",
  },
  {
    id: 10,
    title: "Aboriginal Cultural Tourism",
    description: "Experience the world's oldest farming traditions. Aboriginal guides share profound knowledge of land, water, bush tucker, and the deep spiritual connection to Country that sustains all life.",
    icon: "Globe",
    color: "secondary",
    featured: true,
  },
];
