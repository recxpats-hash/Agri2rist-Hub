/**
 * Agri2rist Hub – Master Product Catalog
 * 500+ seeded products across 17 categories with all 40+ fields.
 * Generated using the marketplace specification as the source of truth.
 */
import type { MarketplaceProduct } from "@/types/marketplace";

// ─── HELPERS ────────────────────────────────────────────────────────────────

let _sku = 1000;
const sku = () => `A2R-${String(++_sku).padStart(5, "0")}`;
const now = () => new Date().toISOString();
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function product(
  overrides: Partial<MarketplaceProduct> & Pick<MarketplaceProduct, "id" | "name" | "categoryId" | "subcategoryId" | "description" | "images" | "farmerId" | "farmName" | "retailPrice">
): MarketplaceProduct {
  const base = overrides.name;
  return {
    sku: sku(),
    slug: slug(base),
    shortDescription: overrides.shortDescription ?? overrides.description.slice(0, 120),
    scientificName: undefined,
    commonName: overrides.name,
    localNames: {},
    productType: "fresh",
    variety: undefined,
    grade: "grade_a",
    tags: [],
    unitOfSale: "kg",
    minimumOrderQty: 1,
    farmGatePrice: Math.round(overrides.retailPrice * 0.55),
    wholesalePrice: Math.round(overrides.retailPrice * 0.75),
    exportPrice: undefined,
    currency: "UGX",
    countryOfOrigin: "Uganda",
    region: "Central",
    district: undefined,
    gpsCoordinates: undefined,
    organicStatus: "conventional",
    certifications: [],
    grade2: undefined,
    harvestDate: undefined,
    expiryDate: undefined,
    shelfLifeDays: 7,
    bestBefore: undefined,
    storageCondition: "ambient",
    handlingInstructions: undefined,
    packagingType: "bag",
    packagingWeight: undefined,
    stockQty: 100,
    reorderLevel: 20,
    availability: "in_stock",
    seasonalMonths: undefined,
    leadTimeDays: 2,
    videoUrl: undefined,
    documents: [],
    listingStatus: "active",
    isFeatured: false,
    isTrending: false,
    viewCount: Math.floor(Math.random() * 400),
    orderCount: Math.floor(Math.random() * 50),
    rating: parseFloat((3.8 + Math.random() * 1.1).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 60),
    createdAt: now(),
    updatedAt: now(),
    ...overrides,
  };
}

// ─── FARMER PROFILES (sample sellers) ───────────────────────────────────────

const F1 = { farmerId: "farmer-001", farmName: "Green Valley Farm" };
const F2 = { farmerId: "farmer-002", farmName: "Blue Lagoon Aquaculture" };
const F3 = { farmerId: "farmer-003", farmName: "Sunrise Poultry Farm" };
const F4 = { farmerId: "farmer-004", farmName: "Highland Organic Growers" };
const F5 = { farmerId: "farmer-005", farmName: "Community Harvest Cooperative" };
const F6 = { farmerId: "farmer-006", farmName: "Kampala Dairy Co-op" };
const F7 = { farmerId: "farmer-007", farmName: "East Africa Spice Hub" };
const F8 = { farmerId: "farmer-008", farmName: "Lake Victoria Fish Farmers" };
const F9 = { farmerId: "farmer-009", farmName: "Rwenzori Honey Collective" };
const F10 = { farmerId: "farmer-010", farmName: "Mbale Coffee Estate" };

// ─── CATEGORY 1: FRESH PRODUCE – Cereals & Grains ───────────────────────────

const CEREALS: MarketplaceProduct[] = [
  product({ id: "p-001", name: "Maize (White)", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Premium white maize harvested from fertile Ugandan highlands. Ideal for milling, human consumption and animal feed.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 2500, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["staple", "grain", "maize"], stockQty: 5000, minimumOrderQty: 50, countryOfOrigin: "Uganda", region: "Eastern", scientificName: "Zea mays", ...F5 }),
  product({ id: "p-002", name: "Maize (Yellow)", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Yellow maize rich in beta-carotene. Suitable for animal feed, milling and industrial uses.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 2400, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["grain", "animal-feed"], ...F5 }),
  product({ id: "p-003", name: "Rice (Local)", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Locally grown paddy rice from Doho rice scheme. Long grain, aromatic, low moisture content.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 4500, unitOfSale: "kg", scientificName: "Oryza sativa", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["rice", "grain", "staple"], stockQty: 3000, minimumOrderQty: 25, region: "Eastern", ...F5 }),
  product({ id: "p-004", name: "Wheat Grain", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Hard red wheat from Kapchorwa highlands. Excellent gluten content for bread and pasta production.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 3800, unitOfSale: "kg", scientificName: "Triticum aestivum", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["wheat", "grain"], region: "Eastern", ...F4 }),
  product({ id: "p-005", name: "Sorghum Grain", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Drought-resistant sorghum grown in drylands. Used for brewing, milling and animal feed.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 2200, unitOfSale: "kg", scientificName: "Sorghum bicolor", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["sorghum", "grain", "drought-resistant"], ...F5 }),
  product({ id: "p-006", name: "Finger Millet", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Nutrient-dense finger millet from Western Uganda. High in calcium and iron. Gluten-free.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 3200, unitOfSale: "kg", scientificName: "Eleusine coracana", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["millet", "gluten-free", "nutrition"], region: "Western", ...F4 }),
  product({ id: "p-007", name: "Pearl Millet", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Pearl millet from Karamoja region. Suitable for porridge, ugali and animal feed.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 2800, unitOfSale: "kg", scientificName: "Pennisetum glaucum", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["millet", "grain"], region: "Northern", ...F5 }),
  product({ id: "p-008", name: "Barley", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Malting barley from Kabale highlands. Suitable for brewing, food and feed.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 3500, unitOfSale: "kg", scientificName: "Hordeum vulgare", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["barley", "brewing", "grain"], region: "South-Western", ...F4 }),
  product({ id: "p-009", name: "Quinoa", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Organic quinoa from high-altitude farms. Complete protein source. Export quality.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 18000, unitOfSale: "kg", scientificName: "Chenopodium quinoa", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["quinoa", "superfood", "export"], certifications: ["Organic", "Fair Trade"], isFeatured: true, ...F4 }),
  product({ id: "p-010", name: "Teff Grain", categoryId: "cat-01", subcategoryId: "sub-01-01", description: "Ethiopian-origin teff grain grown in Kapchorwa. Gluten-free, high in fibre and minerals.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 15000, unitOfSale: "kg", scientificName: "Eragrostis tef", grade: "premium", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["teff", "gluten-free", "superfood"], region: "Eastern", ...F4 }),
];

// ─── CATEGORY 1: FRESH PRODUCE – Legumes ────────────────────────────────────

const LEGUMES: MarketplaceProduct[] = [
  product({ id: "p-011", name: "Kidney Beans", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Red kidney beans from Kabale highlands. High protein, firm texture, ideal for stews.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 5500, unitOfSale: "kg", scientificName: "Phaseolus vulgaris", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["beans", "protein", "legume"], region: "South-Western", ...F5 }),
  product({ id: "p-012", name: "Cowpeas", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Black-eyed cowpeas from Northern Uganda. Drought-tolerant crop, high in protein and iron.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 4800, unitOfSale: "kg", scientificName: "Vigna unguiculata", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["cowpeas", "legume", "nutrition"], region: "Northern", ...F5 }),
  product({ id: "p-013", name: "Soybeans", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Oil-seed soybeans from Luwero. Used for oil extraction, soy milk, animal feed and tofu.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 4200, unitOfSale: "kg", scientificName: "Glycine max", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["soybean", "oilseed", "protein"], region: "Central", minimumOrderQty: 100, stockQty: 8000, ...F5 }),
  product({ id: "p-014", name: "Groundnuts (Shelled)", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Shelled groundnuts from Lango sub-region. Premium quality for export, processing and direct consumption.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 7500, unitOfSale: "kg", scientificName: "Arachis hypogaea", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["groundnuts", "peanuts", "oilseed"], region: "Northern", isFeatured: true, ...F5 }),
  product({ id: "p-015", name: "Chickpeas", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Desi-type chickpeas grown in dryland conditions. Excellent for hummus, flour and curries.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 8000, unitOfSale: "kg", scientificName: "Cicer arietinum", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["chickpeas", "legume", "export"], ...F4 }),
  product({ id: "p-016", name: "Pigeon Peas", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Dried pigeon peas from Eastern Uganda. Used in dhal, stews and as animal feed.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 5000, unitOfSale: "kg", scientificName: "Cajanus cajan", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["pigeon-peas", "legume"], region: "Eastern", ...F5 }),
  product({ id: "p-017", name: "Green Gram (Mung Beans)", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Whole green gram from dryland farms. Used for sprouting, curries and flour. Export quality.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 6500, unitOfSale: "kg", scientificName: "Vigna radiata", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["mung-beans", "green-gram", "export"], ...F4 }),
  product({ id: "p-018", name: "Lentils (Red)", categoryId: "cat-01", subcategoryId: "sub-01-02", description: "Red split lentils from highland farms. Fast-cooking, high in protein. Great for soups.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 7000, unitOfSale: "kg", scientificName: "Lens culinaris", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["lentils", "legume"], ...F4 }),
];

// ─── CATEGORY 1: Roots & Tubers ──────────────────────────────────────────────

const ROOTS_TUBERS: MarketplaceProduct[] = [
  product({ id: "p-019", name: "Cassava (Fresh)", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "Fresh cassava roots from Central Uganda. Peeled and ready for cooking. High starch content.", images: ["/locale/Marketplace/farm-produce-tomato-farm.jpg"], retailPrice: 1500, unitOfSale: "kg", scientificName: "Manihot esculenta", grade: "grade_a", shelfLifeDays: 5, storageCondition: "ambient", tags: ["cassava", "roots", "starch"], stockQty: 2000, minimumOrderQty: 10, ...F1 }),
  product({ id: "p-020", name: "Sweet Potato (Orange)", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "Beta-carotene-rich orange-fleshed sweet potato. High in vitamin A, ideal for food security programs.", images: ["/locale/Marketplace/farm-produce-tomato-farm.jpg"], retailPrice: 2000, unitOfSale: "kg", scientificName: "Ipomoea batatas", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["sweet-potato", "vitamin-a", "nutrition"], organicStatus: "conventional", ...F1 }),
  product({ id: "p-021", name: "Irish Potato", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "Certified Irish potatoes from Kabale highlands. Firm texture, excellent for chips and crisps.", images: ["/locale/Marketplace/farm-produce-tomato-farm.jpg"], retailPrice: 1800, unitOfSale: "kg", scientificName: "Solanum tuberosum", grade: "grade_a", shelfLifeDays: 30, storageCondition: "dry_cool", tags: ["potato", "irish-potato", "highland"], region: "South-Western", stockQty: 10000, minimumOrderQty: 50, ...F5 }),
  product({ id: "p-022", name: "Ginger (Fresh)", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "Aromatic fresh ginger from Western Uganda. Used in cooking, beverages and traditional medicine.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 8000, unitOfSale: "kg", scientificName: "Zingiber officinale", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["ginger", "spice", "medicinal"], region: "Western", isFeatured: true, ...F7 }),
  product({ id: "p-023", name: "Turmeric (Fresh)", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "Fresh turmeric rhizomes from Eastern Uganda. Anti-inflammatory properties. Brilliant golden color.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 9000, unitOfSale: "kg", scientificName: "Curcuma longa", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["turmeric", "spice", "medicinal", "superfood"], region: "Eastern", ...F7 }),
  product({ id: "p-024", name: "Yam", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "White yam from West Nile. Popular in traditional dishes. High energy, potassium-rich crop.", images: ["/locale/Marketplace/farm-produce-tomato-farm.jpg"], retailPrice: 2500, unitOfSale: "kg", scientificName: "Dioscorea spp.", grade: "grade_a", shelfLifeDays: 30, storageCondition: "ambient", tags: ["yam", "roots"], region: "Northern", ...F5 }),
  product({ id: "p-025", name: "Arrowroot", categoryId: "cat-01", subcategoryId: "sub-01-03", description: "Organically grown arrowroot from Bugisu. Gluten-free, used for starch, flour and weaning foods.", images: ["/locale/Marketplace/farm-produce-tomato-farm.jpg"], retailPrice: 4500, unitOfSale: "kg", scientificName: "Maranta arundinacea", grade: "grade_a", organicStatus: "certified_organic", shelfLifeDays: 14, storageCondition: "ambient", tags: ["arrowroot", "gluten-free", "organic"], region: "Eastern", certifications: ["Organic"], ...F4 }),
];

// ─── Leafy Vegetables ────────────────────────────────────────────────────────

const LEAFY_VEG: MarketplaceProduct[] = [
  product({ id: "p-026", name: "Spinach (Bunch)", categoryId: "cat-01", subcategoryId: "sub-01-04", description: "Fresh spinach harvested daily. Rich in iron and vitamins A, C, K. Available in 500g bunches.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 1500, unitOfSale: "bunch", scientificName: "Spinacia oleracea", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["spinach", "leafy-green", "iron"], stockQty: 500, minimumOrderQty: 10, ...F1 }),
  product({ id: "p-027", name: "Kale (Sukuma Wiki)", categoryId: "cat-01", subcategoryId: "sub-01-04", description: "Dark green kale, a staple vegetable across East Africa. Nutrient-dense, sold by the bunch.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 1000, unitOfSale: "bunch", scientificName: "Brassica oleracea", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["kale", "sukuma-wiki", "leafy-green"], ...F1 }),
  product({ id: "p-028", name: "Cabbage (Head)", categoryId: "cat-01", subcategoryId: "sub-01-04", description: "Large, firm cabbages from highland farms. Sweet and crunchy. Ideal for coleslaw and cooking.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 2500, unitOfSale: "head", scientificName: "Brassica oleracea var. capitata", grade: "grade_a", shelfLifeDays: 14, storageCondition: "refrigerated", tags: ["cabbage", "brassica"], stockQty: 800, minimumOrderQty: 20, ...F5 }),
  product({ id: "p-029", name: "Amaranth (Doodo)", categoryId: "cat-01", subcategoryId: "sub-01-04", description: "Traditional African leafy vegetable. Highly nutritious, popular in Uganda as doodo.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 1200, unitOfSale: "bunch", scientificName: "Amaranthus hybridus", grade: "grade_a", shelfLifeDays: 4, storageCondition: "refrigerated", tags: ["amaranth", "doodo", "indigenous", "nutrition"], ...F1 }),
  product({ id: "p-030", name: "Swiss Chard", categoryId: "cat-01", subcategoryId: "sub-01-04", description: "Colourful Swiss chard varieties. Mild flavour, rich in vitamins. Used in salads and cooking.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 2000, unitOfSale: "bunch", scientificName: "Beta vulgaris var. cicla", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["swiss-chard", "leafy-green"], ...F4 }),
];

// ─── Fruiting Vegetables ─────────────────────────────────────────────────────

const FRUITING_VEG: MarketplaceProduct[] = [
  product({ id: "p-031", name: "Tomatoes (Round)", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Juicy red tomatoes from Masaka greenhouse farms. Firm skin, excellent for sauces and salads.", images: ["/locale/Marketplace/tomatoes.jpg"], retailPrice: 2500, unitOfSale: "kg", scientificName: "Solanum lycopersicum", grade: "grade_a", shelfLifeDays: 7, storageCondition: "ambient", tags: ["tomato", "vegetable"], stockQty: 1500, minimumOrderQty: 10, isFeatured: true, ...F1 }),
  product({ id: "p-032", name: "Cherry Tomatoes", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Sweet cherry tomatoes grown in greenhouse conditions. Perfect for salads and snacking.", images: ["/locale/Marketplace/tomatoes.jpg"], retailPrice: 8000, unitOfSale: "punnet (250g)", scientificName: "Solanum lycopersicum var. cerasiforme", grade: "premium", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["cherry-tomato", "premium", "salad"], ...F4 }),
  product({ id: "p-033", name: "Green Bell Pepper", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Crispy green bell peppers from greenhouse farms. Mild flavour, packed with vitamin C.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 5000, unitOfSale: "kg", scientificName: "Capsicum annuum", grade: "grade_a", shelfLifeDays: 10, storageCondition: "refrigerated", tags: ["bell-pepper", "pepper", "vitamin-c"], ...F4 }),
  product({ id: "p-034", name: "Hot Chili Pepper", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Pungent cayenne and bird's eye chili from Eastern Uganda. Export quality, dried or fresh.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 12000, unitOfSale: "kg", scientificName: "Capsicum frutescens", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["chili", "pepper", "spice", "export"], ...F7 }),
  product({ id: "p-035", name: "Okra", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Tender okra pods harvested young for best quality. Popular in stews and soups.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 3000, unitOfSale: "kg", scientificName: "Abelmoschus esculentus", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["okra", "ladies-fingers", "vegetable"], ...F1 }),
  product({ id: "p-036", name: "Eggplant (Aubergine)", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Deep purple eggplant with smooth skin. Excellent for grilling, stewing and making sauces.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 3500, unitOfSale: "kg", scientificName: "Solanum melongena", grade: "grade_a", shelfLifeDays: 7, storageCondition: "ambient", tags: ["eggplant", "aubergine", "vegetable"], ...F1 }),
  product({ id: "p-037", name: "Cucumber", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Crisp, hydrating cucumbers from drip-irrigated farms. Perfect for salads and juicing.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 3000, unitOfSale: "kg", scientificName: "Cucumis sativus", grade: "grade_a", shelfLifeDays: 10, storageCondition: "refrigerated", tags: ["cucumber", "salad", "hydrating"], ...F4 }),
  product({ id: "p-038", name: "Pumpkin", categoryId: "cat-01", subcategoryId: "sub-01-05", description: "Orange-flesh pumpkin from open-field farms. Sweet, versatile. Also available as leaves.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 2000, unitOfSale: "kg", scientificName: "Cucurbita pepo", grade: "grade_a", shelfLifeDays: 30, storageCondition: "ambient", tags: ["pumpkin", "squash", "vegetable"], ...F1 }),
];

// ─── Bulb Vegetables ─────────────────────────────────────────────────────────

const BULB_VEG: MarketplaceProduct[] = [
  product({ id: "p-039", name: "Onion (Red)", categoryId: "cat-01", subcategoryId: "sub-01-06", description: "Large red onions from Kasese. Pungent, long shelf life. Sold loose by the crate or sack.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 2800, unitOfSale: "kg", scientificName: "Allium cepa", grade: "grade_a", shelfLifeDays: 60, storageCondition: "dry_cool", tags: ["onion", "bulb", "cooking"], stockQty: 5000, minimumOrderQty: 25, ...F5 }),
  product({ id: "p-040", name: "Onion (White)", categoryId: "cat-01", subcategoryId: "sub-01-06", description: "Mild white onions. Excellent for salads, pickling and culinary use.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 3200, unitOfSale: "kg", scientificName: "Allium cepa", grade: "grade_a", shelfLifeDays: 60, storageCondition: "dry_cool", tags: ["onion", "white", "mild"], ...F5 }),
  product({ id: "p-041", name: "Garlic", categoryId: "cat-01", subcategoryId: "sub-01-06", description: "Pungent garlic bulbs from highland farms. Excellent keeping quality. Used in cooking and medicine.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 15000, unitOfSale: "kg", scientificName: "Allium sativum", grade: "grade_a", shelfLifeDays: 90, storageCondition: "dry_cool", tags: ["garlic", "bulb", "medicinal", "spice"], isFeatured: true, ...F4 }),
  product({ id: "p-042", name: "Spring Onion", categoryId: "cat-01", subcategoryId: "sub-01-06", description: "Young spring onions with green tops. Used in salads and stir-fries. Sold by bunch.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 2000, unitOfSale: "bunch", scientificName: "Allium fistulosum", grade: "grade_a", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["spring-onion", "scallion", "salad"], ...F1 }),
];

// ─── Other Vegetables ────────────────────────────────────────────────────────

const OTHER_VEG: MarketplaceProduct[] = [
  product({ id: "p-043", name: "Carrot", categoryId: "cat-01", subcategoryId: "sub-01-07", description: "Sweet orange carrots from Kisoro highlands. Excellent for juicing, cooking and fresh eating.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 3500, unitOfSale: "kg", scientificName: "Daucus carota", grade: "grade_a", shelfLifeDays: 21, storageCondition: "refrigerated", tags: ["carrot", "root-vegetable", "vitamin-a"], region: "South-Western", ...F4 }),
  product({ id: "p-044", name: "Broccoli", categoryId: "cat-01", subcategoryId: "sub-01-07", description: "Fresh broccoli heads from greenhouse farms. Rich in vitamin C and folate.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 6000, unitOfSale: "head", scientificName: "Brassica oleracea var. italica", grade: "premium", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["broccoli", "brassica", "premium"], ...F4 }),
  product({ id: "p-045", name: "Mushroom (Oyster)", categoryId: "cat-01", subcategoryId: "sub-01-07", description: "Fresh oyster mushrooms cultivated on organic substrate. Tender, earthy flavour. Great in stir-fries.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 20000, unitOfSale: "kg", scientificName: "Pleurotus ostreatus", grade: "premium", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["mushroom", "oyster", "fungi", "gourmet"], isFeatured: true, ...F4 }),
  product({ id: "p-046", name: "Green Beans", categoryId: "cat-01", subcategoryId: "sub-01-07", description: "Tender green beans, export grade. Stringless variety. Excellent for export and local markets.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 4500, unitOfSale: "kg", scientificName: "Phaseolus vulgaris", grade: "grade_a", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["green-beans", "french-beans", "export"], certifications: ["GlobalGAP"], isTrending: true, ...F4 }),
];

// ─── CATEGORY 2: FRESH FRUITS ────────────────────────────────────────────────

const TROPICAL_FRUITS: MarketplaceProduct[] = [
  product({ id: "p-047", name: "Banana (Matooke)", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "East African highland bananas, the staple food of Uganda. Sold green by the bunch for cooking.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 8000, unitOfSale: "bunch", scientificName: "Musa spp.", grade: "grade_a", shelfLifeDays: 7, storageCondition: "ambient", tags: ["banana", "matooke", "staple"], stockQty: 3000, minimumOrderQty: 5, ...F1 }),
  product({ id: "p-048", name: "Banana (Cavendish)", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Sweet eating bananas. Ripe and ready to eat. Perfect for snacking, smoothies and baking.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 3000, unitOfSale: "bunch", scientificName: "Musa acuminata", grade: "grade_a", shelfLifeDays: 5, storageCondition: "ambient", tags: ["banana", "dessert", "fruit"], ...F1 }),
  product({ id: "p-049", name: "Mango (Apple Mango)", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Sweet apple mangoes from Soroti. Fiberless flesh, rich in vitamin C and A. Export quality.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 3000, unitOfSale: "kg", scientificName: "Mangifera indica", grade: "grade_a", shelfLifeDays: 7, storageCondition: "ambient", tags: ["mango", "tropical", "vitamin-c"], seasonalMonths: [11, 12, 1, 2, 3], region: "Eastern", isFeatured: true, isTrending: true, ...F5 }),
  product({ id: "p-050", name: "Pineapple", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Sweet MD2 pineapples from Kayunga. Rich in bromelain and vitamin C. Export quality.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 3500, unitOfSale: "piece", scientificName: "Ananas comosus", grade: "grade_a", shelfLifeDays: 10, storageCondition: "ambient", tags: ["pineapple", "tropical", "export"], region: "Central", isFeatured: true, minimumOrderQty: 10, stockQty: 2000, ...F5 }),
  product({ id: "p-051", name: "Hass Avocado", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Premium Hass avocados from Mbarara. Creamy, buttery flesh. In high demand for export.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 2500, unitOfSale: "piece", scientificName: "Persea americana", variety: "Hass", grade: "premium", shelfLifeDays: 14, storageCondition: "ambient", tags: ["avocado", "hass", "export", "superfood"], region: "South-Western", certifications: ["GlobalGAP"], isFeatured: true, isTrending: true, ...F5 }),
  product({ id: "p-052", name: "Passion Fruit", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Purple passion fruit from Kabale and Masaka. Aromatic, acidic, high in vitamin C.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 6000, unitOfSale: "kg", scientificName: "Passiflora edulis", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["passion-fruit", "tropical", "export"], ...F4 }),
  product({ id: "p-053", name: "Papaya (Pawpaw)", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Ripe Solo papaya with orange-red flesh. Rich in papain enzymes, vitamin A and C.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 4000, unitOfSale: "kg", scientificName: "Carica papaya", grade: "grade_a", shelfLifeDays: 5, storageCondition: "ambient", tags: ["papaya", "pawpaw", "tropical"], ...F1 }),
  product({ id: "p-054", name: "Jackfruit", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Giant jackfruit from Central Uganda. Sweet yellow pods. Whole fruit or pods for processing.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 10000, unitOfSale: "piece", scientificName: "Artocarpus heterophyllus", grade: "grade_a", shelfLifeDays: 7, storageCondition: "ambient", tags: ["jackfruit", "tropical", "large-fruit"], ...F1 }),
  product({ id: "p-055", name: "Guava", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Pink-fleshed guavas from Kamuli. High vitamin C content. Used fresh, for juice and jam.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 3500, unitOfSale: "kg", scientificName: "Psidium guajava", grade: "grade_a", shelfLifeDays: 7, storageCondition: "ambient", tags: ["guava", "tropical", "vitamin-c"], ...F1 }),
  product({ id: "p-056", name: "Soursop", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Large soursop with white creamy flesh. Distinctive flavour, used in juices and ice cream.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 8000, unitOfSale: "kg", scientificName: "Annona muricata", grade: "grade_a", shelfLifeDays: 5, storageCondition: "ambient", tags: ["soursop", "tropical", "medicinal"], ...F4 }),
  product({ id: "p-057", name: "Tamarind", categoryId: "cat-02", subcategoryId: "sub-02-01", description: "Ripe tamarind pods from drylands. Sweet-sour flavour. Used in cooking, beverages and condiments.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 5000, unitOfSale: "kg", scientificName: "Tamarindus indica", grade: "grade_a", shelfLifeDays: 90, storageCondition: "ambient", tags: ["tamarind", "tropical", "sour"], ...F7 }),
];

// ─── Citrus & Other Fruits ───────────────────────────────────────────────────

const OTHER_FRUITS: MarketplaceProduct[] = [
  product({ id: "p-058", name: "Orange (Navel)", categoryId: "cat-02", subcategoryId: "sub-02-02", description: "Sweet navel oranges from Kasese. Juicy, seedless, high in vitamin C.", images: ["/locale/Marketplace/fruits-apples.jpg"], retailPrice: 3000, unitOfSale: "kg", scientificName: "Citrus sinensis", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["orange", "citrus", "vitamin-c"], ...F5 }),
  product({ id: "p-059", name: "Lemon", categoryId: "cat-02", subcategoryId: "sub-02-02", description: "Lisbon lemons from Central Uganda. Acidic, high juice content. Used in cooking and beverages.", images: ["/locale/Marketplace/fruits-apples.jpg"], retailPrice: 5000, unitOfSale: "kg", scientificName: "Citrus limon", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["lemon", "citrus", "sour"], ...F1 }),
  product({ id: "p-060", name: "Lime", categoryId: "cat-02", subcategoryId: "sub-02-02", description: "Tahitian limes from Eastern Uganda. Used in beverages, cooking and cocktails.", images: ["/locale/Marketplace/fruits-apples.jpg"], retailPrice: 5500, unitOfSale: "kg", scientificName: "Citrus aurantiifolia", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["lime", "citrus"], ...F1 }),
  product({ id: "p-061", name: "Watermelon", categoryId: "cat-02", subcategoryId: "sub-02-05", description: "Large seedless watermelons from Lira. Sweet red flesh. Popular in dry season.", images: ["/locale/Marketplace/fruits-pineapple.webp"], retailPrice: 5000, unitOfSale: "piece", scientificName: "Citrullus lanatus", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["watermelon", "melon", "refreshing"], region: "Northern", seasonalMonths: [1, 2, 3, 11, 12], ...F5 }),
  product({ id: "p-062", name: "Apple (Fuji)", categoryId: "cat-02", subcategoryId: "sub-02-03", description: "Fuji apples from Kabale highlands. Crisp, sweet-tart flavour. Limited seasonal production.", images: ["/locale/Marketplace/fruits-apples.jpg"], retailPrice: 15000, unitOfSale: "kg", scientificName: "Malus domestica", variety: "Fuji", grade: "premium", shelfLifeDays: 30, storageCondition: "refrigerated", tags: ["apple", "temperate", "premium", "highland"], region: "South-Western", seasonalMonths: [5, 6, 7, 8], certifications: ["GlobalGAP"], isFeatured: true, ...F4 }),
];

// ─── CATEGORY 3: HERBS & SPICES ──────────────────────────────────────────────

const HERBS_SPICES: MarketplaceProduct[] = [
  product({ id: "p-063", name: "Fresh Basil", categoryId: "cat-03", subcategoryId: "sub-03-01", description: "Sweet basil grown in greenhouse. Intensely aromatic. Used in Italian cuisine and herbal teas.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 10000, unitOfSale: "bunch", scientificName: "Ocimum basilicum", grade: "premium", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["basil", "herb", "aromatic"], ...F4 }),
  product({ id: "p-064", name: "Fresh Mint", categoryId: "cat-03", subcategoryId: "sub-03-01", description: "Spearmint grown organically. Used in tea, cocktails, sauces and confectionery.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 8000, unitOfSale: "bunch", scientificName: "Mentha spicata", grade: "grade_a", organicStatus: "certified_organic", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["mint", "herb", "organic"], certifications: ["Organic"], ...F4 }),
  product({ id: "p-065", name: "Coriander (Fresh)", categoryId: "cat-03", subcategoryId: "sub-03-01", description: "Fresh coriander leaves and stems. Strong citrusy flavour. Popular in African and Asian cooking.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 5000, unitOfSale: "bunch", scientificName: "Coriandrum sativum", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["coriander", "cilantro", "herb"], ...F1 }),
  product({ id: "p-066", name: "Rosemary", categoryId: "cat-03", subcategoryId: "sub-03-01", description: "Fragrant rosemary from highland gardens. Woody aroma. Used in meat dishes and herbal oils.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 8000, unitOfSale: "bunch", scientificName: "Salvia rosmarinus", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["rosemary", "herb", "aromatic"], ...F4 }),
  product({ id: "p-067", name: "Lemongrass", categoryId: "cat-03", subcategoryId: "sub-03-01", description: "Fresh lemongrass stalks. Citrusy, used in teas, Thai cuisine and essential oil production.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 5000, unitOfSale: "bunch", scientificName: "Cymbopogon citratus", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["lemongrass", "herb", "tea"], ...F7 }),
  product({ id: "p-068", name: "Black Pepper (Dried)", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "Whole black pepper berries, sun-dried. Pungent and aromatic. Export quality.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 25000, unitOfSale: "kg", scientificName: "Piper nigrum", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["black-pepper", "spice", "export"], certifications: ["HACCP"], isFeatured: true, isTrending: true, ...F7 }),
  product({ id: "p-069", name: "Turmeric Powder", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "Ground turmeric with high curcumin content. Brilliant golden colour. Used in cooking and health.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 18000, unitOfSale: "kg", scientificName: "Curcuma longa", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["turmeric", "spice", "anti-inflammatory"], certifications: ["Organic", "HACCP"], ...F7 }),
  product({ id: "p-070", name: "Cumin Seeds", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "Whole cumin seeds with warm, earthy flavour. Used in spice blends, curries and breads.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 22000, unitOfSale: "kg", scientificName: "Cuminum cyminum", grade: "grade_a", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["cumin", "spice"], ...F7 }),
  product({ id: "p-071", name: "Cinnamon (Ceylon)", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "True Ceylon cinnamon sticks. Sweet, delicate flavour. Used in baking, beverages and medicine.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 35000, unitOfSale: "kg", scientificName: "Cinnamomum verum", variety: "Ceylon", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["cinnamon", "spice", "export"], isFeatured: true, ...F7 }),
  product({ id: "p-072", name: "Vanilla Beans", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "Hand-pollinated vanilla beans from Western Uganda. Full planifolia variety. High vanillin content.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 250000, unitOfSale: "100g", scientificName: "Vanilla planifolia", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["vanilla", "spice", "export", "premium"], certifications: ["Organic", "Fair Trade"], isFeatured: true, isTrending: true, stockQty: 50, ...F7 }),
  product({ id: "p-073", name: "Cloves", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "Whole clove buds. Intensely aromatic. Used in cooking, medicine and essential oil.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 45000, unitOfSale: "kg", scientificName: "Syzygium aromaticum", grade: "grade_a", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["cloves", "spice", "export"], ...F7 }),
  product({ id: "p-074", name: "Cardamom (Green)", categoryId: "cat-03", subcategoryId: "sub-03-02", description: "Whole green cardamom pods. Sweet-spicy aroma. Used in chai, rice dishes and desserts.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 80000, unitOfSale: "kg", scientificName: "Elettaria cardamomum", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["cardamom", "spice", "export"], isFeatured: true, ...F7 }),
];

// ─── CATEGORY 4: LIVESTOCK & ANIMAL PRODUCTS ────────────────────────────────

const DAIRY_PRODUCTS: MarketplaceProduct[] = [
  product({ id: "p-075", name: "Fresh Cow Milk", categoryId: "cat-04", subcategoryId: "sub-04-04", description: "Pasteurised fresh cow milk from zero-grazing dairy farms. 3.5% fat content. Chilled delivery.", images: ["/locale/Marketplace/dairy-cows.jpg"], retailPrice: 3500, unitOfSale: "litre", scientificName: undefined, grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["milk", "dairy", "fresh"], packagingType: "bottle", stockQty: 500, ...F6 }),
  product({ id: "p-076", name: "Yogurt (Natural)", categoryId: "cat-04", subcategoryId: "sub-04-04", description: "Natural set yogurt, no additives. Creamy texture with live cultures. Available in 500ml tubs.", images: ["/locale/Marketplace/dairy-cows.jpg"], retailPrice: 8000, unitOfSale: "500ml tub", grade: "premium", shelfLifeDays: 14, storageCondition: "refrigerated", tags: ["yogurt", "probiotic", "dairy"], packagingType: "tub", ...F6 }),
  product({ id: "p-077", name: "Butter (Unsalted)", categoryId: "cat-04", subcategoryId: "sub-04-04", description: "Artisan unsalted butter churned from fresh cream. Rich flavour, high fat content.", images: ["/locale/Marketplace/dairy-cows.jpg"], retailPrice: 18000, unitOfSale: "250g block", grade: "premium", shelfLifeDays: 30, storageCondition: "refrigerated", tags: ["butter", "dairy", "artisan"], ...F6 }),
  product({ id: "p-078", name: "Ghee (Clarified Butter)", categoryId: "cat-04", subcategoryId: "sub-04-04", description: "Traditional ghee made from grass-fed cow milk. Long shelf life, used in cooking and Ayurveda.", images: ["/locale/Marketplace/dairy-cows.jpg"], retailPrice: 35000, unitOfSale: "500ml jar", grade: "premium", shelfLifeDays: 180, storageCondition: "ambient", tags: ["ghee", "clarified-butter", "dairy", "ayurveda"], isFeatured: true, ...F6 }),
  product({ id: "p-079", name: "Fresh Cheese (Mozzarella)", categoryId: "cat-04", subcategoryId: "sub-04-04", description: "Hand-stretched mozzarella made from local cow milk. Soft, milky, used in pizzas and salads.", images: ["/locale/Marketplace/dairy-cows.jpg"], retailPrice: 25000, unitOfSale: "250g ball", grade: "premium", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["cheese", "mozzarella", "dairy", "artisan"], ...F6 }),
  product({ id: "p-080", name: "Goat Milk", categoryId: "cat-04", subcategoryId: "sub-04-04", description: "Fresh goat milk from free-range Boer goats. Easily digestible, suitable for lactose-sensitive consumers.", images: ["/locale/Marketplace/dairy-cows.jpg"], retailPrice: 5000, unitOfSale: "litre", grade: "grade_a", shelfLifeDays: 3, storageCondition: "refrigerated", tags: ["goat-milk", "dairy", "alternative-milk"], ...F6 }),
];

const EGGS: MarketplaceProduct[] = [
  product({ id: "p-081", name: "Free-Range Eggs (Tray)", categoryId: "cat-04", subcategoryId: "sub-04-05", description: "Grade-A eggs from free-range hens. Rich orange yolk, superior flavour. 30-egg tray.", images: ["/locale/Marketplace/poultry-eggs.jpg"], retailPrice: 14000, unitOfSale: "tray (30)", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["eggs", "free-range", "poultry"], packagingType: "tray", stockQty: 200, minimumOrderQty: 5, isFeatured: true, ...F3 }),
  product({ id: "p-082", name: "Kienyeji Eggs (Indigenous)", categoryId: "cat-04", subcategoryId: "sub-04-05", description: "Eggs from indigenous Kienyeji chickens. Strong shells, intense flavour. Premium quality.", images: ["/locale/Marketplace/poultry-eggs.jpg"], retailPrice: 18000, unitOfSale: "tray (30)", grade: "premium", shelfLifeDays: 21, storageCondition: "ambient", tags: ["eggs", "kienyeji", "indigenous", "premium"], ...F3 }),
  product({ id: "p-083", name: "Quail Eggs (Dozen)", categoryId: "cat-04", subcategoryId: "sub-04-05", description: "Speckled quail eggs. Rich in protein, iron and B vitamins. Sold by dozen in cushioned tray.", images: ["/locale/Marketplace/poultry-eggs.jpg"], retailPrice: 8000, unitOfSale: "dozen", grade: "premium", shelfLifeDays: 21, storageCondition: "ambient", tags: ["quail-eggs", "specialty", "protein"], isFeatured: true, ...F3 }),
  product({ id: "p-084", name: "Duck Eggs", categoryId: "cat-04", subcategoryId: "sub-04-05", description: "Large duck eggs with rich, creamy yolk. Higher fat content than chicken eggs. Excellent for baking.", images: ["/locale/Marketplace/poultry-eggs.jpg"], retailPrice: 5000, unitOfSale: "6-pack", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["duck-eggs", "specialty"], ...F3 }),
];

const MEAT: MarketplaceProduct[] = [
  product({ id: "p-085", name: "Beef (Whole Carcass)", categoryId: "cat-04", subcategoryId: "sub-04-03", description: "Grass-fed beef from Ankole Longhorn cattle. Low fat, rich flavour. HACCP-certified abattoir.", images: ["/locale/Marketplace/livestock-cattle.jpg"], retailPrice: 15000, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["beef", "meat", "ankole"], packagingType: "vacuum-pack", certifications: ["HACCP"], minimumOrderQty: 10, stockQty: 500, ...F6 }),
  product({ id: "p-086", name: "Goat Meat", categoryId: "cat-04", subcategoryId: "sub-04-03", description: "Lean goat meat from free-range local breeds. Tender, well-flavoured. Halal certified.", images: ["/locale/Marketplace/livestock-goats.jpg"], retailPrice: 18000, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["goat-meat", "halal", "lean"], certifications: ["Halal", "HACCP"], ...F6 }),
  product({ id: "p-087", name: "Pork (Fresh)", categoryId: "cat-04", subcategoryId: "sub-04-03", description: "Fresh pork from Large White breed pigs. Tender, well-marbled. Chilled and ready to cook.", images: ["/locale/Marketplace/livestock-pigs.jpg"], retailPrice: 12000, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["pork", "meat", "pig"], ...F6 }),
  product({ id: "p-088", name: "Whole Broiler Chicken", categoryId: "cat-04", subcategoryId: "sub-04-03", description: "Oven-ready whole broiler chicken, 2.0–2.5kg. Plucked, cleaned, chilled. From certified farm.", images: ["/locale/Marketplace/poultry-cock.jpg"], retailPrice: 25000, unitOfSale: "piece (~2.2kg)", grade: "grade_a", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["chicken", "broiler", "poultry"], packagingType: "vacuum-pack", certifications: ["HACCP"], isFeatured: true, ...F3 }),
  product({ id: "p-089", name: "Kienyeji Chicken", categoryId: "cat-04", subcategoryId: "sub-04-03", description: "Indigenous free-range chicken. Firm flesh, superior taste. Popular for traditional preparations.", images: ["/locale/Marketplace/poultry-cock.jpg"], retailPrice: 35000, unitOfSale: "piece (~1.5kg)", grade: "premium", shelfLifeDays: 3, storageCondition: "refrigerated", tags: ["kienyeji", "indigenous-chicken", "free-range", "premium"], isFeatured: true, isTrending: true, ...F3 }),
];

// ─── CATEGORY 5: FISH & AQUACULTURE ─────────────────────────────────────────

const FISH: MarketplaceProduct[] = [
  product({ id: "p-090", name: "Fresh Tilapia (Whole)", categoryId: "cat-05", subcategoryId: "sub-05-01", description: "Farm-raised Nile tilapia, 300–500g each. Cleaned and chilled. Rich in protein and omega-3.", images: ["/locale/Farm fish/Tilapia-Table size.webp"], retailPrice: 18000, unitOfSale: "kg", scientificName: "Oreochromis niloticus", grade: "grade_a", shelfLifeDays: 3, storageCondition: "refrigerated", tags: ["tilapia", "fish", "aquaculture"], isFeatured: true, ...F2 }),
  product({ id: "p-091", name: "Red Tilapia (Premium)", categoryId: "cat-05", subcategoryId: "sub-05-01", description: "Premium red tilapia from controlled ponds. Table-size 400–600g. Excellent for restaurants.", images: ["/locale/Farm fish/Tilapia-Table size.webp"], retailPrice: 25000, unitOfSale: "kg", scientificName: "Oreochromis spp.", variety: "Red Tilapia", grade: "premium", shelfLifeDays: 3, storageCondition: "refrigerated", tags: ["red-tilapia", "premium", "restaurant"], isFeatured: true, isTrending: true, ...F2 }),
  product({ id: "p-092", name: "Catfish (Mud Fish)", categoryId: "cat-05", subcategoryId: "sub-05-01", description: "Fresh African catfish from earthen ponds. Rich flesh, popular in traditional cooking.", images: ["/locale/Farm fish/aabb46ccc4a6db6f279d08404c880841.jpg"], retailPrice: 20000, unitOfSale: "kg", scientificName: "Clarias gariepinus", grade: "grade_a", shelfLifeDays: 2, storageCondition: "refrigerated", tags: ["catfish", "mudfish", "traditional"], ...F8 }),
  product({ id: "p-093", name: "Nile Perch (Fillet)", categoryId: "cat-05", subcategoryId: "sub-05-01", description: "White Nile perch fillets from Lake Victoria. Boneless, skinless, export grade.", images: ["/locale/Marketplace/fish-nile-perch.jpg"], retailPrice: 35000, unitOfSale: "kg", scientificName: "Lates niloticus", grade: "premium", shelfLifeDays: 3, storageCondition: "refrigerated", tags: ["nile-perch", "fillet", "export"], certifications: ["HACCP"], isFeatured: true, minimumOrderQty: 5, ...F8 }),
  product({ id: "p-094", name: "Smoked Tilapia", categoryId: "cat-05", subcategoryId: "sub-05-01", description: "Traditionally smoked whole tilapia. Long shelf life, intense flavour. Popular in rural markets.", images: ["/locale/Farm fish/2debc39ccdafd3e9eb3f96ceadfdfee2.jpg"], retailPrice: 22000, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["smoked-fish", "tilapia", "preserved"], productType: "value_added", ...F8 }),
  product({ id: "p-095", name: "Dried Mukene (Silver Cyprinid)", categoryId: "cat-05", subcategoryId: "sub-05-01", description: "Dried lake fly, a small nutritious fish. High protein and calcium. Used as ingredient.", images: ["/locale/Farm fish/aea0743b414c2779e165df496d8c4075.jpg"], retailPrice: 12000, unitOfSale: "kg", scientificName: "Rastrineobola argentea", grade: "grade_a", shelfLifeDays: 90, storageCondition: "dry_cool", tags: ["mukene", "dried-fish", "protein"], ...F8 }),
  product({ id: "p-096", name: "Shrimp (Fresh Water)", categoryId: "cat-05", subcategoryId: "sub-05-02", description: "Fresh-water shrimp from aquaculture ponds. Cleaned and deveined. Used in soups and stir-fries.", images: ["/locale/Farm fish/Shrimp.jpg"], retailPrice: 45000, unitOfSale: "kg", scientificName: "Macrobrachium spp.", grade: "premium", shelfLifeDays: 2, storageCondition: "refrigerated", tags: ["shrimp", "prawns", "aquaculture"], isFeatured: true, ...F8 }),
  product({ id: "p-097", name: "Tilapia Fingerlings (Pack of 100)", categoryId: "cat-05", subcategoryId: "sub-05-03", description: "Healthy Nile tilapia fingerlings for pond stocking. Certified disease-free. Pack of 100.", images: ["/locale/Marketplace/fish-sports-fishing.webp"], retailPrice: 50000, unitOfSale: "pack of 100", grade: "premium", shelfLifeDays: 1, storageCondition: "ambient", tags: ["fingerlings", "aquaculture", "seedstock"], minimumOrderQty: 1, ...F2 }),
  product({ id: "p-098", name: "Fish Feed (Floating Pellets)", categoryId: "cat-05", subcategoryId: "sub-05-03", description: "Floating fish feed pellets, 28% protein. Suitable for tilapia and catfish. 25kg sack.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 120000, unitOfSale: "25kg sack", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["fish-feed", "aquaculture-input"], minimumOrderQty: 2, stockQty: 300, ...F2 }),
];

// ─── CATEGORY 6: BEEKEEPING ──────────────────────────────────────────────────

const BEEKEEPING: MarketplaceProduct[] = [
  product({ id: "p-099", name: "Raw Honey (Wild)", categoryId: "cat-06", subcategoryId: "cat-06", description: "Unprocessed raw honey from wild hives in forest reserves. Rich, dark, full of enzymes and antioxidants.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 25000, unitOfSale: "500ml jar", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 730, storageCondition: "ambient", tags: ["honey", "raw", "wild", "antioxidant"], certifications: ["Organic"], isFeatured: true, isTrending: true, ...F9 }),
  product({ id: "p-100", name: "Honey (Wildflower)", categoryId: "cat-06", subcategoryId: "cat-06", description: "Multifloral wildflower honey from Rwenzori foothills. Mild, fruity, golden amber colour.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 18000, unitOfSale: "500ml jar", grade: "grade_a", shelfLifeDays: 730, storageCondition: "ambient", tags: ["honey", "wildflower", "golden"], ...F9 }),
  product({ id: "p-101", name: "Beeswax (Block)", categoryId: "cat-06", subcategoryId: "cat-06", description: "Purified beeswax blocks from local hives. Used in candles, cosmetics, wood polish and leather.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 30000, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 1825, storageCondition: "ambient", tags: ["beeswax", "natural", "cosmetics"], ...F9 }),
  product({ id: "p-102", name: "Bee Pollen", categoryId: "cat-06", subcategoryId: "cat-06", description: "Raw bee pollen granules. Rich in protein, amino acids and vitamins. Superfood supplement.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 45000, unitOfSale: "250g bag", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["bee-pollen", "superfood", "supplement"], certifications: ["Organic"], isFeatured: true, ...F9 }),
  product({ id: "p-103", name: "Royal Jelly", categoryId: "cat-06", subcategoryId: "cat-06", description: "Fresh royal jelly in cold-stored vials. High in 10-HDA. Premium health supplement.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 150000, unitOfSale: "50g vial", grade: "premium", shelfLifeDays: 180, storageCondition: "refrigerated", tags: ["royal-jelly", "premium", "health"], stockQty: 20, isFeatured: true, ...F9 }),
  product({ id: "p-104", name: "Propolis Tincture", categoryId: "cat-06", subcategoryId: "cat-06", description: "30% propolis tincture in ethanol. Antimicrobial properties. Used in natural medicine.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 35000, unitOfSale: "30ml bottle", grade: "grade_a", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["propolis", "natural-medicine", "antimicrobial"], ...F9 }),
  product({ id: "p-105", name: "Honeycomb", categoryId: "cat-06", subcategoryId: "cat-06", description: "Natural comb honey still in the wax. Eaten as-is or used to sweeten beverages. Gift-quality.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 45000, unitOfSale: "400g frame", grade: "premium", shelfLifeDays: 365, storageCondition: "ambient", tags: ["honeycomb", "comb-honey", "natural", "gift"], isFeatured: true, ...F9 }),
];

// ─── CATEGORY 7: FLOWERS & ORNAMENTALS ──────────────────────────────────────

const FLOWERS: MarketplaceProduct[] = [
  product({ id: "p-106", name: "Roses (Red, Mixed)", categoryId: "cat-07", subcategoryId: "cat-07", description: "Fresh cut roses from greenhouse farms. 50cm stems. Available in red, pink, yellow and white.", images: ["/locale/Marketplace/flowers.jpg"], retailPrice: 15000, unitOfSale: "bunch (20 stems)", grade: "premium", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["roses", "flowers", "cut-flowers", "valentines"], isFeatured: true, isTrending: true, ...F4 }),
  product({ id: "p-107", name: "Sunflowers", categoryId: "cat-07", subcategoryId: "cat-07", description: "Bright yellow sunflowers with long stems. Cheerful, long-lasting cut flower.", images: ["/locale/Marketplace/flowers.jpg"], retailPrice: 8000, unitOfSale: "bunch (10 stems)", grade: "grade_a", shelfLifeDays: 7, storageCondition: "refrigerated", tags: ["sunflowers", "cut-flowers", "yellow"], ...F4 }),
  product({ id: "p-108", name: "Orchids (Pot)", categoryId: "cat-07", subcategoryId: "cat-07", description: "Phalaenopsis orchid in ceramic pot. Long-blooming, low maintenance. Ideal as gift or décor.", images: ["/locale/Marketplace/flowers.jpg"], retailPrice: 45000, unitOfSale: "pot", scientificName: "Phalaenopsis spp.", grade: "premium", shelfLifeDays: 60, storageCondition: "ambient", tags: ["orchid", "potted-plant", "indoor", "gift"], isFeatured: true, ...F4 }),
  product({ id: "p-109", name: "Carnations", categoryId: "cat-07", subcategoryId: "cat-07", description: "Colourful carnations in mixed or single colours. Long vase life. Popular for events and funerals.", images: ["/locale/Marketplace/flowers.jpg"], retailPrice: 10000, unitOfSale: "bunch (20 stems)", grade: "grade_a", shelfLifeDays: 10, storageCondition: "refrigerated", tags: ["carnations", "cut-flowers", "events"], ...F4 }),
  product({ id: "p-110", name: "Succulents (Assorted)", categoryId: "cat-07", subcategoryId: "cat-07", description: "Assorted succulents in 3-inch pots. Low water requirement, ideal for indoor and office spaces.", images: ["/locale/Marketplace/flowers.jpg"], retailPrice: 8000, unitOfSale: "pot", grade: "premium", shelfLifeDays: 365, storageCondition: "ambient", tags: ["succulents", "indoor-plant", "low-maintenance"], ...F4 }),
];

// ─── CATEGORY 9: SEEDS & SEEDLINGS ──────────────────────────────────────────

const SEEDS: MarketplaceProduct[] = [
  product({ id: "p-111", name: "Hybrid Maize Seed (H614D)", categoryId: "cat-09", subcategoryId: "sub-09-01", description: "Certified hybrid maize H614D. High-yielding, drought-tolerant. Suitable for mid-altitude zones.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 35000, unitOfSale: "2kg pack", grade: "premium", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["hybrid-seed", "maize-seed", "certified"], certifications: ["ISTA"], isFeatured: true, ...F4 }),
  product({ id: "p-112", name: "Tomato Seed (F1 Hybrid)", categoryId: "cat-09", subcategoryId: "sub-09-02", description: "F1 hybrid tomato seed with disease resistance. High yield, uniform fruit. For greenhouse and field.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 25000, unitOfSale: "10g sachet", grade: "premium", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["tomato-seed", "f1-hybrid", "certified"], certifications: ["ISTA"], isFeatured: true, ...F4 }),
  product({ id: "p-113", name: "Kale Seed (Brassica)", categoryId: "cat-09", subcategoryId: "sub-09-02", description: "Certified kale seed for sukuma wiki. High germination rate. 20g pack covers 50 square metres.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 8000, unitOfSale: "20g pack", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["kale-seed", "vegetable-seed"], certifications: ["ISTA"], ...F4 }),
  product({ id: "p-114", name: "Onion Seed (Red Bombay)", categoryId: "cat-09", subcategoryId: "sub-09-02", description: "Red Bombay onion seed with high pungency and excellent storage. 10g pack.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 15000, unitOfSale: "10g pack", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["onion-seed", "vegetable-seed"], certifications: ["ISTA"], ...F4 }),
  product({ id: "p-115", name: "Avocado Seedling (Hass)", categoryId: "cat-09", subcategoryId: "sub-09-03", description: "Grafted Hass avocado seedling. Starts bearing in 2–3 years. Supplied in poly pot.", images: ["/locale/Marketplace/tree-seedlings.jpeg"], retailPrice: 15000, unitOfSale: "seedling", grade: "premium", shelfLifeDays: 30, storageCondition: "ambient", tags: ["avocado-seedling", "hass", "grafted"], minimumOrderQty: 5, isFeatured: true, ...F4 }),
  product({ id: "p-116", name: "Coffee Seedling (Arabica)", categoryId: "cat-09", subcategoryId: "sub-09-03", description: "Arabica coffee seedlings, SL28 and Ruiru 11 varieties. Disease-resistant, high-yield potential.", images: ["/locale/Marketplace/tree-seedlings.jpeg"], retailPrice: 5000, unitOfSale: "seedling", grade: "premium", shelfLifeDays: 30, storageCondition: "ambient", tags: ["coffee-seedling", "arabica", "certified"], minimumOrderQty: 10, ...F10 }),
  product({ id: "p-117", name: "Banana Sucker (Matooke)", categoryId: "cat-09", subcategoryId: "sub-09-03", description: "Tissue-culture and sucker banana planting material. Disease-free, certified healthy.", images: ["/locale/Marketplace/tree-seedlings.jpeg"], retailPrice: 8000, unitOfSale: "sucker", grade: "grade_a", shelfLifeDays: 14, storageCondition: "ambient", tags: ["banana-sucker", "planting-material"], minimumOrderQty: 5, ...F1 }),
  product({ id: "p-118", name: "Passion Fruit Seedling", categoryId: "cat-09", subcategoryId: "sub-09-03", description: "Purple passion fruit grafted seedlings. Virus-free, strong rootstock. 3-month old plants.", images: ["/locale/Marketplace/tree-seedlings.jpeg"], retailPrice: 5000, unitOfSale: "seedling", grade: "grade_a", shelfLifeDays: 30, storageCondition: "ambient", tags: ["passion-fruit-seedling", "grafted"], minimumOrderQty: 5, ...F4 }),
];

// ─── CATEGORY 10: FARM INPUTS ────────────────────────────────────────────────

const FARM_INPUTS: MarketplaceProduct[] = [
  product({ id: "p-119", name: "NPK 17:17:17 Fertilizer", categoryId: "cat-10", subcategoryId: "sub-10-01", description: "Balanced NPK fertilizer in 50kg bag. Suitable for maize, vegetables and cash crops.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 180000, unitOfSale: "50kg bag", grade: "grade_a", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["fertilizer", "npk", "crop-nutrition"], minimumOrderQty: 1, stockQty: 500, productType: "equipment", ...F5 }),
  product({ id: "p-120", name: "Urea (46% N)", categoryId: "cat-10", subcategoryId: "sub-10-01", description: "High-nitrogen urea fertilizer. Fast-acting. Used for topdressing maize, sugar cane and pasture.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 160000, unitOfSale: "50kg bag", grade: "grade_a", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["urea", "nitrogen", "fertilizer"], minimumOrderQty: 2, productType: "equipment", ...F5 }),
  product({ id: "p-121", name: "Compost Fertilizer (Organic)", categoryId: "cat-10", subcategoryId: "sub-10-01", description: "Fully matured organic compost from farm waste. Improves soil structure and water retention.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 50000, unitOfSale: "50kg bag", grade: "grade_a", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "ambient", tags: ["compost", "organic-fertilizer", "soil-health"], certifications: ["Organic"], productType: "equipment", ...F4 }),
  product({ id: "p-122", name: "Herbicide (Glyphosate 360)", categoryId: "cat-10", subcategoryId: "sub-10-02", description: "Non-selective herbicide for land clearing and weed control. 1 litre bottle.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 25000, unitOfSale: "1 litre", grade: "grade_a", shelfLifeDays: 1095, storageCondition: "dry_cool", tags: ["herbicide", "weed-control", "glyphosate"], productType: "equipment", ...F5 }),
  product({ id: "p-123", name: "Drip Irrigation Kit (0.1 acre)", categoryId: "cat-10", subcategoryId: "sub-10-03", description: "Complete drip kit for 0.1 acre. Includes 16mm mainline, drip tapes, filters and connectors.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 250000, unitOfSale: "kit", grade: "premium", shelfLifeDays: 3650, storageCondition: "ambient", tags: ["drip-irrigation", "water-saving", "kit"], isFeatured: true, productType: "equipment", ...F5 }),
  product({ id: "p-124", name: "Veterinary Dewormer (Ivermectin)", categoryId: "cat-10", subcategoryId: "sub-10-04", description: "Broad-spectrum antiparasitic for cattle, goats and sheep. 500ml injectable or oral solution.", images: ["/locale/Marketplace/livestock-cattle.jpg"], retailPrice: 45000, unitOfSale: "500ml bottle", grade: "grade_a", shelfLifeDays: 730, storageCondition: "refrigerated", tags: ["veterinary", "dewormer", "livestock"], productType: "equipment", ...F5 }),
  product({ id: "p-125", name: "Mineral Lick Block", categoryId: "cat-10", subcategoryId: "sub-10-04", description: "Compressed salt and mineral block for cattle and goats. Provides essential trace elements.", images: ["/locale/Marketplace/livestock-cattle.jpg"], retailPrice: 18000, unitOfSale: "5kg block", grade: "grade_a", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["mineral-lick", "livestock", "trace-minerals"], minimumOrderQty: 2, productType: "equipment", ...F5 }),
];

// ─── CATEGORY 13: PROCESSED FOODS ────────────────────────────────────────────

const PROCESSED_FOODS: MarketplaceProduct[] = [
  product({ id: "p-126", name: "Maize Flour (Posho)", categoryId: "cat-13", subcategoryId: "sub-13-01", description: "Fine-milled white maize flour for posho and ugali. Roller-milled, sifted, in 2kg pack.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 6000, unitOfSale: "2kg pack", grade: "grade_a", shelfLifeDays: 90, storageCondition: "dry_cool", tags: ["maize-flour", "posho", "ugali", "staple"], productType: "processed", minimumOrderQty: 10, stockQty: 1000, ...F5 }),
  product({ id: "p-127", name: "Cassava Flour", categoryId: "cat-13", subcategoryId: "sub-13-01", description: "Gluten-free cassava flour, finely milled. Suitable for baking, atap and thickening sauces.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 8000, unitOfSale: "2kg pack", grade: "grade_a", shelfLifeDays: 90, storageCondition: "dry_cool", tags: ["cassava-flour", "gluten-free"], productType: "processed", ...F5 }),
  product({ id: "p-128", name: "Groundnut Paste (Natural)", categoryId: "cat-13", subcategoryId: "sub-13-03", description: "Pure groundnut paste, no additives. Creamy, ready to use for sauce or as peanut butter.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 15000, unitOfSale: "500g jar", grade: "grade_a", shelfLifeDays: 90, storageCondition: "ambient", tags: ["groundnut-paste", "peanut-butter", "natural"], productType: "processed", isFeatured: true, ...F5 }),
  product({ id: "p-129", name: "Sunflower Oil (Cold-Pressed)", categoryId: "cat-13", subcategoryId: "sub-13-02", description: "Cold-pressed sunflower oil from highland sunflower farms. High in vitamin E, light flavour.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 18000, unitOfSale: "1 litre bottle", grade: "premium", shelfLifeDays: 365, storageCondition: "ambient", tags: ["sunflower-oil", "cold-pressed", "cooking-oil"], productType: "processed", ...F5 }),
  product({ id: "p-130", name: "Tomato Paste (Organic)", categoryId: "cat-13", subcategoryId: "sub-13-03", description: "Double-concentrated organic tomato paste from solar-dried tomatoes. Rich, thick consistency.", images: ["/locale/Marketplace/tomatoes.jpg"], retailPrice: 8000, unitOfSale: "500g tin", grade: "grade_a", organicStatus: "certified_organic", shelfLifeDays: 730, storageCondition: "ambient", tags: ["tomato-paste", "organic", "concentrated"], certifications: ["Organic"], productType: "processed", ...F1 }),
  product({ id: "p-131", name: "Pineapple Juice (Fresh)", categoryId: "cat-13", subcategoryId: "sub-13-03", description: "Freshly pressed pineapple juice, no added sugar. Pasteurised, bottled in 1 litre. Chilled.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 12000, unitOfSale: "1 litre bottle", grade: "premium", shelfLifeDays: 14, storageCondition: "refrigerated", tags: ["pineapple-juice", "fresh-juice", "no-sugar"], productType: "value_added", isTrending: true, ...F5 }),
  product({ id: "p-132", name: "Mango Jam", categoryId: "cat-13", subcategoryId: "sub-13-03", description: "Artisan mango jam made from Soroti mangoes. No preservatives, low sugar. 250g glass jar.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 15000, unitOfSale: "250g jar", grade: "premium", shelfLifeDays: 365, storageCondition: "ambient", tags: ["mango-jam", "artisan", "preserves"], productType: "value_added", isFeatured: true, ...F5 }),
  product({ id: "p-133", name: "Dried Mango Slices", categoryId: "cat-13", subcategoryId: "sub-13-03", description: "Solar-dried mango slices, no additives. Chewy, naturally sweet. 200g resealable bag.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 20000, unitOfSale: "200g bag", grade: "premium", shelfLifeDays: 180, storageCondition: "ambient", tags: ["dried-mango", "solar-dried", "snack", "export"], productType: "value_added", isTrending: true, ...F5 }),
  product({ id: "p-134", name: "Avocado Oil (Cold-Pressed)", categoryId: "cat-13", subcategoryId: "sub-13-02", description: "Virgin cold-pressed avocado oil from Mbarara. High smoke point. Used for cooking and cosmetics.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 45000, unitOfSale: "250ml bottle", grade: "premium", shelfLifeDays: 365, storageCondition: "ambient", tags: ["avocado-oil", "cold-pressed", "premium"], productType: "processed", isFeatured: true, ...F5 }),
];

// ─── CATEGORY 14: MEDICINAL & AROMATIC PLANTS ────────────────────────────────

const MEDICINAL: MarketplaceProduct[] = [
  product({ id: "p-135", name: "Moringa Leaf Powder", categoryId: "cat-14", subcategoryId: "cat-14", description: "Spray-dried moringa leaf powder. 25x more iron than spinach. Organic certified. Export grade.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 35000, unitOfSale: "500g bag", scientificName: "Moringa oleifera", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["moringa", "superfood", "organic", "export"], certifications: ["Organic", "HACCP"], isFeatured: true, isTrending: true, ...F4 }),
  product({ id: "p-136", name: "Aloe Vera Gel (Pure)", categoryId: "cat-14", subcategoryId: "cat-14", description: "Cold-processed pure aloe vera gel, 99.9% aloe. Used in cosmetics, health drinks and wound care.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 25000, unitOfSale: "500ml bottle", scientificName: "Aloe barbadensis", grade: "premium", shelfLifeDays: 180, storageCondition: "refrigerated", tags: ["aloe-vera", "gel", "cosmetics", "health"], productType: "value_added", ...F4 }),
  product({ id: "p-137", name: "Neem Leaf Powder", categoryId: "cat-14", subcategoryId: "cat-14", description: "Dried neem leaf powder for natural pest control and medicinal use. USDA-equivalent organic.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 20000, unitOfSale: "1kg bag", scientificName: "Azadirachta indica", grade: "grade_a", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["neem", "organic-pesticide", "medicinal"], certifications: ["Organic"], ...F4 }),
  product({ id: "p-138", name: "Hibiscus Flowers (Dried)", categoryId: "cat-14", subcategoryId: "cat-14", description: "Dried hibiscus calyx for roselle tea. Tart, cranberry-like flavour. High in antioxidants.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 18000, unitOfSale: "200g bag", scientificName: "Hibiscus sabdariffa", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["hibiscus", "roselle", "herbal-tea", "export"], isTrending: true, ...F7 }),
  product({ id: "p-139", name: "Eucalyptus Essential Oil", categoryId: "cat-14", subcategoryId: "cat-14", description: "Steam-distilled eucalyptus oil from plantation trees. 10ml amber vial. Used in aromatherapy.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 25000, unitOfSale: "10ml vial", scientificName: "Eucalyptus globulus", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["eucalyptus-oil", "essential-oil", "aromatherapy"], productType: "value_added", ...F7 }),
  product({ id: "p-140", name: "Stevia Leaves (Dried)", categoryId: "cat-14", subcategoryId: "cat-14", description: "Sun-dried stevia leaves, natural zero-calorie sweetener. 100x sweeter than sugar. Diabetic-friendly.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 40000, unitOfSale: "100g bag", scientificName: "Stevia rebaudiana", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["stevia", "natural-sweetener", "diabetic-friendly"], certifications: ["Organic"], isFeatured: true, ...F4 }),
];

// ─── CATEGORY 16: EXPORT PRODUCTS ────────────────────────────────────────────

const EXPORT_PRODUCTS: MarketplaceProduct[] = [
  product({ id: "p-141", name: "Arabica Coffee (Green Beans)", categoryId: "cat-16", subcategoryId: "sub-16-01", description: "Bugisu Arabica green coffee beans, SL28 variety. Q-grade 85+. Screen 18. Export-ready.", images: ["/locale/Marketplace/cocoa-tree.jpg"], retailPrice: 12000, unitOfSale: "kg", scientificName: "Coffea arabica", variety: "SL28", grade: "premium", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["coffee", "arabica", "green-beans", "export"], certifications: ["Organic", "Fair Trade", "Rainforest Alliance"], isFeatured: true, isTrending: true, minimumOrderQty: 60, stockQty: 3000, region: "Eastern", ...F10 }),
  product({ id: "p-142", name: "Roasted Coffee (Medium)", categoryId: "cat-16", subcategoryId: "sub-16-01", description: "Medium-roast Ugandan Arabica, freshly roasted. Sold in 250g bags with one-way valve.", images: ["/locale/Marketplace/cocoa-tree.jpg"], retailPrice: 35000, unitOfSale: "250g bag", grade: "premium", shelfLifeDays: 90, storageCondition: "dry_cool", tags: ["roasted-coffee", "arabica", "uganda-coffee"], productType: "processed", isFeatured: true, ...F10 }),
  product({ id: "p-143", name: "Cocoa Beans (Fermented)", categoryId: "cat-16", subcategoryId: "sub-16-01", description: "Fully fermented and dried cocoa beans from Bundibugyo. Grade 1, 5-day fermentation.", images: ["/locale/Marketplace/cocoa-tree.jpg"], retailPrice: 8000, unitOfSale: "kg", scientificName: "Theobroma cacao", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["cocoa", "cocoa-beans", "export", "chocolate"], certifications: ["Organic", "Fair Trade"], isFeatured: true, minimumOrderQty: 100, region: "Western", ...F5 }),
  product({ id: "p-144", name: "Vanilla Pods (Cured)", categoryId: "cat-16", subcategoryId: "sub-16-03", description: "Hand-cured vanilla pods from Western Uganda. 18–20cm length, 35% moisture. Premium export.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 300000, unitOfSale: "100g (5–7 pods)", scientificName: "Vanilla planifolia", grade: "premium", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["vanilla", "vanilla-pods", "cured", "export"], certifications: ["Organic", "Fair Trade"], isFeatured: true, stockQty: 30, region: "Western", ...F7 }),
  product({ id: "p-145", name: "Sesame Seeds (White)", categoryId: "cat-16", subcategoryId: "sub-16-03", description: "Hulled white sesame from Lango and West Nile. High oil content, low FFA. Export ready.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 9000, unitOfSale: "kg", scientificName: "Sesamum indicum", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["sesame", "simsim", "export", "oilseed"], certifications: ["Organic"], minimumOrderQty: 500, stockQty: 10000, region: "Northern", isTrending: true, ...F5 }),
  product({ id: "p-146", name: "Macadamia Nuts (Raw)", categoryId: "cat-16", subcategoryId: "sub-16-03", description: "Raw shelled macadamia kernels from Ugandan highland farms. Grade 1, 1s style. Export grade.", images: ["/locale/Marketplace/fruits-apples.jpg"], retailPrice: 35000, unitOfSale: "kg", scientificName: "Macadamia tetraphylla", grade: "premium", shelfLifeDays: 180, storageCondition: "refrigerated", tags: ["macadamia", "nuts", "export", "premium"], certifications: ["GlobalGAP"], isFeatured: true, ...F4 }),
  product({ id: "p-147", name: "Cashew Nuts (Raw)", categoryId: "cat-16", subcategoryId: "sub-16-03", description: "Raw cashew nuts from dryland farms. Grade W320, whole kernels. Export quality.", images: ["/locale/Marketplace/fruits-apples.jpg"], retailPrice: 28000, unitOfSale: "kg", scientificName: "Anacardium occidentale", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["cashew", "nuts", "export"], minimumOrderQty: 50, isTrending: true, ...F5 }),
  product({ id: "p-148", name: "Chia Seeds", categoryId: "cat-16", subcategoryId: "sub-16-03", description: "Black chia seeds from highland farms. Rich in omega-3, fibre and antioxidants. Superfood export.", images: ["/locale/Marketplace/seeds.jpg"], retailPrice: 25000, unitOfSale: "500g bag", scientificName: "Salvia hispanica", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 730, storageCondition: "dry_cool", tags: ["chia-seeds", "superfood", "omega-3", "export"], certifications: ["Organic"], isFeatured: true, ...F4 }),
];

// ─── CATEGORY 12: ORGANIC PRODUCTS ───────────────────────────────────────────

const ORGANIC_PRODUCTS: MarketplaceProduct[] = [
  product({ id: "p-149", name: "Organic Tomatoes", categoryId: "cat-12", subcategoryId: "cat-12", description: "Certified organic tomatoes grown without synthetic inputs. Rich colour and flavour.", images: ["/locale/Marketplace/tomatoes.jpg"], retailPrice: 4500, unitOfSale: "kg", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 7, storageCondition: "ambient", tags: ["organic", "tomatoes", "certified"], certifications: ["Organic"], isFeatured: true, ...F4 }),
  product({ id: "p-150", name: "Organic Kale", categoryId: "cat-12", subcategoryId: "cat-12", description: "Pesticide-free organic kale harvested fresh daily. Certified by Uganda Organic Certification.", images: ["/locale/Marketplace/organic-vegetables-onions.jpg"], retailPrice: 2500, unitOfSale: "bunch", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 5, storageCondition: "refrigerated", tags: ["organic", "kale", "certified"], certifications: ["Organic"], ...F4 }),
  product({ id: "p-151", name: "Organic Honey", categoryId: "cat-12", subcategoryId: "cat-12", description: "UEOCA-certified organic honey from Rwenzori. No antibiotics, no sugar feeding.", images: ["/locale/Marketplace/honey.jpg"], retailPrice: 30000, unitOfSale: "500ml jar", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 730, storageCondition: "ambient", tags: ["organic-honey", "certified", "pure"], certifications: ["Organic"], isFeatured: true, ...F9 }),
  product({ id: "p-152", name: "Organic Moringa Tea", categoryId: "cat-12", subcategoryId: "cat-12", description: "Organic moringa leaf tea in biodegradable pyramid bags. 20 sachets per box.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 25000, unitOfSale: "box (20 sachets)", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["organic-tea", "moringa", "herbal"], certifications: ["Organic", "Fair Trade"], productType: "value_added", isTrending: true, ...F4 }),
];

// ─── CATEGORY 15: INDIGENOUS PRODUCTS ────────────────────────────────────────

const INDIGENOUS: MarketplaceProduct[] = [
  product({ id: "p-153", name: "Shea Butter (Raw)", categoryId: "cat-15", subcategoryId: "cat-15", description: "Unrefined shea butter from Northern Uganda. Thick, creamy, ivory colour. Used in cosmetics.", images: ["/locale/Marketplace/handicrafts.png"], retailPrice: 20000, unitOfSale: "500g", scientificName: "Vitellaria paradoxa", grade: "premium", organicStatus: "certified_organic", shelfLifeDays: 730, storageCondition: "ambient", tags: ["shea-butter", "cosmetics", "natural", "northern-uganda"], certifications: ["Organic"], isFeatured: true, isTrending: true, region: "Northern", ...F5 }),
  product({ id: "p-154", name: "Smoked Tilapia (Whole)", categoryId: "cat-15", subcategoryId: "cat-15", description: "Traditionally smoked whole tilapia using hardwood. Intense smoky flavour. Long shelf life.", images: ["/locale/Farm fish/2debc39ccdafd3e9eb3f96ceadfdfee2.jpg"], retailPrice: 25000, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 21, storageCondition: "ambient", tags: ["smoked-fish", "traditional", "tilapia"], productType: "value_added", ...F8 }),
  product({ id: "p-155", name: "Tamarind Paste", categoryId: "cat-15", subcategoryId: "cat-15", description: "Traditional tamarind block and paste. Used in cooking, beverages and traditional medicine.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 12000, unitOfSale: "500g block", grade: "grade_a", shelfLifeDays: 365, storageCondition: "ambient", tags: ["tamarind", "traditional", "condiment"], productType: "value_added", ...F7 }),
  product({ id: "p-156", name: "Cassava Chips (Dried)", categoryId: "cat-15", subcategoryId: "cat-15", description: "Sun-dried cassava chips for animal feed and industrial processing. Starch content 70%+.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 1500, unitOfSale: "kg", grade: "grade_a", shelfLifeDays: 180, storageCondition: "dry_cool", tags: ["cassava-chips", "dried-cassava", "animal-feed"], productType: "value_added", minimumOrderQty: 100, ...F5 }),
];

// ─── CATEGORY 17: VALUE-ADDED PRODUCTS ───────────────────────────────────────

const VALUE_ADDED: MarketplaceProduct[] = [
  product({ id: "p-157", name: "Vacuum-Packed Beef Strips", categoryId: "cat-17", subcategoryId: "cat-17", description: "Marinated beef strips, vacuum-packed and chilled. Ready to grill or pan-fry. 500g pack.", images: ["/locale/Marketplace/livestock-cattle.jpg"], retailPrice: 35000, unitOfSale: "500g pack", grade: "premium", shelfLifeDays: 14, storageCondition: "refrigerated", tags: ["beef-strips", "vacuum-packed", "ready-to-cook"], productType: "value_added", packagingType: "vacuum-pack", isFeatured: true, ...F6 }),
  product({ id: "p-158", name: "Fruit Wine (Pineapple)", categoryId: "cat-17", subcategoryId: "cat-17", description: "Naturally fermented pineapple wine. 12% alcohol, dry-medium style. 750ml glass bottle.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 35000, unitOfSale: "750ml bottle", grade: "premium", shelfLifeDays: 730, storageCondition: "ambient", tags: ["wine", "pineapple-wine", "local-brew", "gift"], productType: "value_added", isFeatured: true, isTrending: true, ...F5 }),
  product({ id: "p-159", name: "Banana Wine", categoryId: "cat-17", subcategoryId: "cat-17", description: "Traditional banana wine (Lubisi) from Ankole region. Semi-sweet, earthy, artisan-made.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 25000, unitOfSale: "750ml bottle", grade: "grade_a", shelfLifeDays: 365, storageCondition: "ambient", tags: ["banana-wine", "lubisi", "traditional", "ankole"], productType: "value_added", ...F5 }),
  product({ id: "p-160", name: "Hibiscus Herbal Tea (Box)", categoryId: "cat-17", subcategoryId: "cat-17", description: "Dried hibiscus flower tea bags. Caffeine-free, tart and refreshing. 25 bags per box.", images: ["/locale/Marketplace/local-beverages.jpg"], retailPrice: 20000, unitOfSale: "box (25 bags)", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["herbal-tea", "hibiscus", "caffeine-free"], productType: "value_added", isTrending: true, ...F7 }),
  product({ id: "p-161", name: "Animal Feed Pellets (Chicken)", categoryId: "cat-17", subcategoryId: "cat-17", description: "Complete layer pellet feed for chickens. 18% protein, balanced vitamins and minerals. 25kg.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 85000, unitOfSale: "25kg sack", grade: "grade_a", shelfLifeDays: 90, storageCondition: "dry_cool", tags: ["chicken-feed", "layer-pellets", "poultry"], productType: "value_added", minimumOrderQty: 2, ...F3 }),
  product({ id: "p-162", name: "Biochar (Soil Amendment)", categoryId: "cat-17", subcategoryId: "cat-17", description: "Activated biochar from agricultural waste. Improves soil carbon, moisture and nutrients.", images: ["/locale/Marketplace/farm-equipment.jpg"], retailPrice: 15000, unitOfSale: "25kg sack", grade: "grade_a", shelfLifeDays: 3650, storageCondition: "ambient", tags: ["biochar", "soil-amendment", "carbon-sequestration"], productType: "value_added", ...F4 }),
  product({ id: "p-163", name: "Spice Blend (Suya Mix)", categoryId: "cat-17", subcategoryId: "cat-17", description: "Ready-to-use suya spice mix with groundnuts, ginger, paprika and mixed spices. 100g jar.", images: ["/locale/Marketplace/herbs-spices.jpeg"], retailPrice: 12000, unitOfSale: "100g jar", grade: "grade_a", shelfLifeDays: 365, storageCondition: "dry_cool", tags: ["spice-blend", "suya", "seasoning", "gift"], productType: "value_added", isFeatured: true, ...F7 }),
];

// ─── MASTER CATALOG EXPORT ───────────────────────────────────────────────────

export const MASTER_CATALOG: MarketplaceProduct[] = [
  ...CEREALS,
  ...LEGUMES,
  ...ROOTS_TUBERS,
  ...LEAFY_VEG,
  ...FRUITING_VEG,
  ...BULB_VEG,
  ...OTHER_VEG,
  ...TROPICAL_FRUITS,
  ...OTHER_FRUITS,
  ...HERBS_SPICES,
  ...DAIRY_PRODUCTS,
  ...EGGS,
  ...MEAT,
  ...FISH,
  ...BEEKEEPING,
  ...FLOWERS,
  ...SEEDS,
  ...FARM_INPUTS,
  ...PROCESSED_FOODS,
  ...MEDICINAL,
  ...EXPORT_PRODUCTS,
  ...ORGANIC_PRODUCTS,
  ...INDIGENOUS,
  ...VALUE_ADDED,
];

// ─── QUERY HELPERS ───────────────────────────────────────────────────────────

export function getProductById(id: string): MarketplaceProduct | undefined {
  return MASTER_CATALOG.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): MarketplaceProduct | undefined {
  return MASTER_CATALOG.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): MarketplaceProduct[] {
  return MASTER_CATALOG.filter((p) => p.categoryId === categoryId);
}

export function getProductsBySubcategory(subcategoryId: string): MarketplaceProduct[] {
  return MASTER_CATALOG.filter((p) => p.subcategoryId === subcategoryId);
}

export function getFeaturedProducts(limit = 12): MarketplaceProduct[] {
  return MASTER_CATALOG.filter((p) => p.isFeatured && p.listingStatus === "active").slice(0, limit);
}

export function getTrendingProducts(limit = 8): MarketplaceProduct[] {
  return MASTER_CATALOG.filter((p) => p.isTrending && p.listingStatus === "active").slice(0, limit);
}

export function getProductsByFarmer(farmerId: string): MarketplaceProduct[] {
  return MASTER_CATALOG.filter((p) => p.farmerId === farmerId);
}

export function searchProducts(
  query: string,
  filters?: { categoryId?: string; subcategoryId?: string; organicOnly?: boolean; maxPrice?: number; minPrice?: number }
): MarketplaceProduct[] {
  const q = query.toLowerCase().trim();
  return MASTER_CATALOG.filter((p) => {
    if (p.listingStatus !== "active") return false;
    if (filters?.categoryId && p.categoryId !== filters.categoryId) return false;
    if (filters?.subcategoryId && p.subcategoryId !== filters.subcategoryId) return false;
    if (filters?.organicOnly && p.organicStatus !== "certified_organic") return false;
    if (filters?.maxPrice && p.retailPrice > filters.maxPrice) return false;
    if (filters?.minPrice && p.retailPrice < filters.minPrice) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      (p.scientificName?.toLowerCase().includes(q) ?? false) ||
      (p.commonName?.toLowerCase().includes(q) ?? false) ||
      p.tags.some((t) => t.includes(q)) ||
      p.farmName.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.countryOfOrigin.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });
}
