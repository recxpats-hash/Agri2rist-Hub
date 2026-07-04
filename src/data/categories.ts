/**
 * Agri2rist Hub – Master Category Taxonomy
 * 17 top-level categories + 150+ subcategories
 */
import type { MarketplaceCategory } from "@/types/marketplace";

// ─── TOP-LEVEL CATEGORIES ───────────────────────────────────────────────────

export const TOP_CATEGORIES: MarketplaceCategory[] = [
  { id: "cat-01", slug: "fresh-produce", name: "Fresh Produce", description: "Cereals, grains, legumes, roots, tubers and vegetables direct from farms", icon: "Sprout", image: "/locale/Marketplace/farm-produce-tomato-farm.jpg", parentId: null, sortOrder: 1, isActive: true },
  { id: "cat-02", slug: "fresh-fruits", name: "Fresh Fruits", description: "Tropical, citrus, temperate, berries and melons", icon: "Apple", image: "/locale/Marketplace/fruits-pineapple.webp", parentId: null, sortOrder: 2, isActive: true },
  { id: "cat-03", slug: "herbs-spices", name: "Herbs & Spices", description: "Culinary herbs, medicinal plants and aromatic spices", icon: "Leaf", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: null, sortOrder: 3, isActive: true },
  { id: "cat-04", slug: "livestock-animal", name: "Livestock & Animal Products", description: "Live animals, meat, dairy and eggs", icon: "Beef", image: "/locale/Marketplace/livestock-cattle.jpg", parentId: null, sortOrder: 4, isActive: true },
  { id: "cat-05", slug: "fish-aquaculture", name: "Fish & Aquaculture", description: "Fresh fish, shellfish and aquaculture inputs", icon: "Fish", image: "/locale/Marketplace/fish-nile-perch.jpg", parentId: null, sortOrder: 5, isActive: true },
  { id: "cat-06", slug: "beekeeping", name: "Beekeeping Products", description: "Honey, beeswax, royal jelly, pollen and propolis", icon: "Hexagon", image: "/locale/Marketplace/honey.jpg", parentId: null, sortOrder: 6, isActive: true },
  { id: "cat-07", slug: "flowers-ornamentals", name: "Flowers & Ornamentals", description: "Cut flowers, potted plants, seedlings and lawn grass", icon: "Flower2", image: "/locale/Marketplace/flowers.jpg", parentId: null, sortOrder: 7, isActive: true },
  { id: "cat-08", slug: "forestry", name: "Forestry Products", description: "Timber, bamboo, firewood, charcoal and wood products", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: null, sortOrder: 8, isActive: true },
  { id: "cat-09", slug: "seeds-seedlings", name: "Seeds & Seedlings", description: "Certified seeds, hybrid seeds, vegetable seeds and fruit seedlings", icon: "Seed", image: "/locale/Marketplace/seeds.jpg", parentId: null, sortOrder: 9, isActive: true },
  { id: "cat-10", slug: "farm-inputs", name: "Farm Inputs", description: "Fertilizers, crop protection, irrigation and livestock inputs", icon: "FlaskConical", image: "/locale/Marketplace/farm-equipment.jpg", parentId: null, sortOrder: 10, isActive: true },
  { id: "cat-11", slug: "farm-machinery", name: "Farm Machinery", description: "Tractors, tillers, harvesters, millers and processing equipment", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: null, sortOrder: 11, isActive: true },
  { id: "cat-12", slug: "organic-products", name: "Organic Products", description: "Certified organic fruits, vegetables, herbs, eggs and dairy", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: null, sortOrder: 12, isActive: true },
  { id: "cat-13", slug: "processed-foods", name: "Processed Foods", description: "Flours, oils, juices, jams, dried produce and packaged foods", icon: "Package", image: "/locale/Marketplace/local-beverages.jpg", parentId: null, sortOrder: 13, isActive: true },
  { id: "cat-14", slug: "medicinal-aromatic", name: "Medicinal & Aromatic Plants", description: "Aloe vera, moringa, neem, chamomile and herbal remedies", icon: "HeartPulse", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: null, sortOrder: 14, isActive: true },
  { id: "cat-15", slug: "indigenous-products", name: "Local Indigenous Products", description: "Traditional foods, indigenous vegetables, smoked fish and shea butter", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: null, sortOrder: 15, isActive: true },
  { id: "cat-16", slug: "export-products", name: "Export Products", description: "Coffee, tea, cocoa, vanilla, macadamia, avocado, sesame and cashew", icon: "TrendingUp", image: "/locale/Marketplace/cocoa-tree.jpg", parentId: null, sortOrder: 16, isActive: true },
  { id: "cat-17", slug: "value-added", name: "Value-Added Products", description: "Packaged produce, vacuum-packed meat, fruit wines, essential oils and biochar", icon: "Star", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: null, sortOrder: 17, isActive: true },
];

// ─── SUBCATEGORIES ──────────────────────────────────────────────────────────

export const SUBCATEGORIES: MarketplaceCategory[] = [
  // Fresh Produce subcategories
  { id: "sub-01-01", slug: "cereals-grains", name: "Cereals & Grains", description: "Maize, rice, wheat, sorghum, millet and more", icon: "Wheat", image: "/locale/Marketplace/seeds.jpg", parentId: "cat-01", sortOrder: 1, isActive: true },
  { id: "sub-01-02", slug: "legumes-pulses", name: "Legumes & Pulses", description: "Beans, cowpeas, soybeans, chickpeas, lentils and groundnuts", icon: "Leaf", image: "/locale/Marketplace/seeds.jpg", parentId: "cat-01", sortOrder: 2, isActive: true },
  { id: "sub-01-03", slug: "roots-tubers", name: "Roots & Tubers", description: "Cassava, sweet potato, yam, ginger, turmeric and arrowroot", icon: "Carrot", image: "/locale/Marketplace/farm-produce-tomato-farm.jpg", parentId: "cat-01", sortOrder: 3, isActive: true },
  { id: "sub-01-04", slug: "leafy-vegetables", name: "Leafy Vegetables", description: "Spinach, kale, cabbage, lettuce, amaranth and cowpea leaves", icon: "Leaf", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-01", sortOrder: 4, isActive: true },
  { id: "sub-01-05", slug: "fruiting-vegetables", name: "Fruiting Vegetables", description: "Tomato, eggplant, pepper, okra, cucumber, pumpkin and squash", icon: "Salad", image: "/locale/Marketplace/tomatoes.jpg", parentId: "cat-01", sortOrder: 5, isActive: true },
  { id: "sub-01-06", slug: "bulb-vegetables", name: "Bulb Vegetables", description: "Onion, garlic, shallots, leeks, spring onion and chives", icon: "CircleDot", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-01", sortOrder: 6, isActive: true },
  { id: "sub-01-07", slug: "other-vegetables", name: "Other Vegetables", description: "Carrot, cauliflower, broccoli, celery, mushroom and asparagus", icon: "Salad", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-01", sortOrder: 7, isActive: true },
  // Fresh Fruits subcategories
  { id: "sub-02-01", slug: "tropical-fruits", name: "Tropical Fruits", description: "Banana, mango, pineapple, papaya, avocado, passion fruit and jackfruit", icon: "Banana", image: "/locale/Marketplace/fruits-pineapple.webp", parentId: "cat-02", sortOrder: 1, isActive: true },
  { id: "sub-02-02", slug: "citrus-fruits", name: "Citrus Fruits", description: "Orange, lemon, lime, tangerine, grapefruit and mandarin", icon: "CircleDot", image: "/locale/Marketplace/fruits-apples.jpg", parentId: "cat-02", sortOrder: 2, isActive: true },
  { id: "sub-02-03", slug: "temperate-fruits", name: "Temperate Fruits", description: "Apple, pear, peach, plum, cherry and apricot", icon: "Apple", image: "/locale/Marketplace/fruits-apples.jpg", parentId: "cat-02", sortOrder: 3, isActive: true },
  { id: "sub-02-04", slug: "berries", name: "Berries", description: "Strawberry, blueberry, raspberry, blackberry and cranberry", icon: "Grape", image: "/locale/Marketplace/fruits-apples.jpg", parentId: "cat-02", sortOrder: 4, isActive: true },
  { id: "sub-02-05", slug: "melons", name: "Melons", description: "Watermelon, rock melon, honeydew and cantaloupe", icon: "Apple", image: "/locale/Marketplace/fruits-pineapple.webp", parentId: "cat-02", sortOrder: 5, isActive: true },
  // Herbs & Spices subcategories
  { id: "sub-03-01", slug: "culinary-herbs", name: "Culinary Herbs", description: "Basil, mint, rosemary, thyme, parsley, coriander and dill", icon: "Leaf", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-03", sortOrder: 1, isActive: true },
  { id: "sub-03-02", slug: "spices", name: "Spices", description: "Black pepper, cinnamon, cardamom, cloves, nutmeg, vanilla and saffron", icon: "Flame", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-03", sortOrder: 2, isActive: true },
  // Livestock subcategories
  { id: "sub-04-01", slug: "live-animals", name: "Live Animals", description: "Dairy cattle, beef cattle, goats, sheep, pigs, rabbits and camels", icon: "Beef", image: "/locale/Marketplace/livestock-cattle.jpg", parentId: "cat-04", sortOrder: 1, isActive: true },
  { id: "sub-04-02", slug: "poultry-live", name: "Poultry", description: "Chicken, turkey, duck, goose, guinea fowl, quail and ostrich", icon: "Bird", image: "/locale/Marketplace/poultry-cock.jpg", parentId: "cat-04", sortOrder: 2, isActive: true },
  { id: "sub-04-03", slug: "meat", name: "Meat", description: "Beef, goat meat, lamb, pork, rabbit, camel, chicken and turkey meat", icon: "UtensilsCrossed", image: "/locale/Marketplace/livestock-cattle.jpg", parentId: "cat-04", sortOrder: 3, isActive: true },
  { id: "sub-04-04", slug: "dairy", name: "Dairy", description: "Fresh milk, pasteurized milk, yogurt, cheese, butter and ghee", icon: "Milk", image: "/locale/Marketplace/dairy-cows.jpg", parentId: "cat-04", sortOrder: 4, isActive: true },
  { id: "sub-04-05", slug: "eggs", name: "Eggs", description: "Chicken, duck, quail, turkey and goose eggs", icon: "Egg", image: "/locale/Marketplace/poultry-eggs.jpg", parentId: "cat-04", sortOrder: 5, isActive: true },
  // Fish subcategories
  { id: "sub-05-01", slug: "fresh-fish", name: "Fresh Fish", description: "Tilapia, catfish, nile perch, carp, trout, salmon and sardines", icon: "Fish", image: "/locale/Marketplace/fish-nile-perch.jpg", parentId: "cat-05", sortOrder: 1, isActive: true },
  { id: "sub-05-02", slug: "shellfish", name: "Shellfish", description: "Shrimp, prawns, lobster, crayfish, crab, mussels and oysters", icon: "Fish", image: "/locale/Marketplace/fish-sports-fishing.webp", parentId: "cat-05", sortOrder: 2, isActive: true },
  { id: "sub-05-03", slug: "aquaculture-inputs", name: "Aquaculture Inputs", description: "Fish fingerlings, fish feed, pond lime and pond fertilizer", icon: "Droplets", image: "/locale/Marketplace/fish-sports-fishing.webp", parentId: "cat-05", sortOrder: 3, isActive: true },
  // Seeds subcategories
  { id: "sub-09-01", slug: "certified-seeds", name: "Certified Seeds", description: "Certified and hybrid seeds for all major crops", icon: "Seed", image: "/locale/Marketplace/seeds.jpg", parentId: "cat-09", sortOrder: 1, isActive: true },
  { id: "sub-09-02", slug: "vegetable-seeds", name: "Vegetable Seeds", description: "Vegetable and herb seeds for home and commercial growing", icon: "Sprout", image: "/locale/Marketplace/seeds.jpg", parentId: "cat-09", sortOrder: 2, isActive: true },
  { id: "sub-09-03", slug: "fruit-seedlings", name: "Fruit Seedlings", description: "Coffee, tea, banana, cassava and fruit tree seedlings", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-09", sortOrder: 3, isActive: true },
  // Farm Inputs subcategories
  { id: "sub-10-01", slug: "fertilizers", name: "Fertilizers", description: "Organic fertilizer, compost, NPK, urea, CAN, DAP and TSP", icon: "FlaskConical", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-10", sortOrder: 1, isActive: true },
  { id: "sub-10-02", slug: "crop-protection", name: "Crop Protection", description: "Herbicides, fungicides, insecticides and bio-pesticides", icon: "Shield", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-10", sortOrder: 2, isActive: true },
  { id: "sub-10-03", slug: "irrigation", name: "Irrigation", description: "Drip kits, sprinklers, water pumps and pipes", icon: "Droplets", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-10", sortOrder: 3, isActive: true },
  { id: "sub-10-04", slug: "livestock-inputs", name: "Livestock Inputs", description: "Mineral licks, veterinary drugs, vaccines and feed supplements", icon: "Syringe", image: "/locale/Marketplace/livestock-cattle.jpg", parentId: "cat-10", sortOrder: 4, isActive: true },
  // Processed Foods subcategories
  { id: "sub-13-01", slug: "milling", name: "Milling Products", description: "Maize, wheat, rice, cassava, millet and sorghum flour", icon: "Package", image: "/locale/Marketplace/local-beverages.jpg", parentId: "cat-13", sortOrder: 1, isActive: true },
  { id: "sub-13-02", slug: "edible-oils", name: "Edible Oils", description: "Sunflower, sesame, groundnut, palm, avocado and coconut oil", icon: "Droplets", image: "/locale/Marketplace/local-beverages.jpg", parentId: "cat-13", sortOrder: 2, isActive: true },
  { id: "sub-13-03", slug: "packaged-foods", name: "Packaged Foods", description: "Peanut butter, tomato paste, juice, jam, dried fruits and vegetables", icon: "ShoppingBag", image: "/locale/Marketplace/local-beverages.jpg", parentId: "cat-13", sortOrder: 3, isActive: true },
  // Export subcategories
  { id: "sub-16-01", slug: "coffee-tea-cocoa", name: "Coffee, Tea & Cocoa", description: "Green and roasted coffee beans, tea leaves and cocoa beans", icon: "Coffee", image: "/locale/Marketplace/cocoa-tree.jpg", parentId: "cat-16", sortOrder: 1, isActive: true },
  { id: "sub-16-02", slug: "export-fruits", name: "Export Fruits", description: "Hass avocado, pineapple, mango and passion fruit for export", icon: "Apple", image: "/locale/Marketplace/fruits-pineapple.webp", parentId: "cat-16", sortOrder: 2, isActive: true },
  { id: "sub-16-03", slug: "export-spices", name: "Export Spices & Nuts", description: "Vanilla, macadamia, sesame, chia, cashew and spices for export", icon: "Leaf", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-16", sortOrder: 3, isActive: true },
];

// ─── COMBINED ────────────────────────────────────────────────────────────────

export const ALL_CATEGORIES: MarketplaceCategory[] = [
  ...TOP_CATEGORIES,
  ...SUBCATEGORIES,
];

export function getCategoryById(id: string): MarketplaceCategory | undefined {
  return ALL_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): MarketplaceCategory | undefined {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

export function getSubcategories(parentId: string): MarketplaceCategory[] {
  return SUBCATEGORIES.filter((c) => c.parentId === parentId);
}

export function getTopCategories(): MarketplaceCategory[] {
  return TOP_CATEGORIES;
}
