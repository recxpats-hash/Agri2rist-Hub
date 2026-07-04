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
  // Beekeeping subcategories
  { id: "sub-06-01", slug: "honey-varietals", name: "Honey Varietals", description: "Wildflower, forest, acacia, manuka and raw unfiltered honey", icon: "Hexagon", image: "/locale/Marketplace/honey.jpg", parentId: "cat-06", sortOrder: 1, isActive: true },
  { id: "sub-06-02", slug: "beeswax-products", name: "Beeswax Products", description: "Raw beeswax, candles, wraps, balms and cosmetics", icon: "Hexagon", image: "/locale/Marketplace/honey.jpg", parentId: "cat-06", sortOrder: 2, isActive: true },
  { id: "sub-06-03", slug: "royal-jelly", name: "Royal Jelly", description: "Fresh and freeze-dried royal jelly for health and nutrition", icon: "Hexagon", image: "/locale/Marketplace/honey.jpg", parentId: "cat-06", sortOrder: 3, isActive: true },
  { id: "sub-06-04", slug: "bee-pollen", name: "Bee Pollen", description: "Raw and dried bee pollen granules and capsules", icon: "Hexagon", image: "/locale/Marketplace/honey.jpg", parentId: "cat-06", sortOrder: 4, isActive: true },
  { id: "sub-06-05", slug: "propolis", name: "Propolis", description: "Raw propolis, tinctures, sprays and throat lozenges", icon: "Hexagon", image: "/locale/Marketplace/honey.jpg", parentId: "cat-06", sortOrder: 5, isActive: true },
  { id: "sub-06-06", slug: "beekeeping-equipment", name: "Beekeeping Equipment", description: "Hives, frames, smokers, veils, extractors and protective gear", icon: "Settings2", image: "/locale/Marketplace/honey.jpg", parentId: "cat-06", sortOrder: 6, isActive: true },
  // Flowers & Ornamentals subcategories
  { id: "sub-07-01", slug: "cut-flowers", name: "Cut Flowers", description: "Roses, lilies, carnations, chrysanthemums and seasonal blooms", icon: "Flower2", image: "/locale/Marketplace/flowers.jpg", parentId: "cat-07", sortOrder: 1, isActive: true },
  { id: "sub-07-02", slug: "potted-plants", name: "Potted Plants", description: "Indoor and outdoor potted ornamental plants", icon: "Flower2", image: "/locale/Marketplace/flowers.jpg", parentId: "cat-07", sortOrder: 2, isActive: true },
  { id: "sub-07-03", slug: "flower-seedlings", name: "Flower Seedlings", description: "Bedding, border and container flower seedlings", icon: "Sprout", image: "/locale/Marketplace/flowers.jpg", parentId: "cat-07", sortOrder: 3, isActive: true },
  { id: "sub-07-04", slug: "lawn-grass", name: "Lawn Grass", description: "Bermuda, Kikuyu, carpet grass and artificial turf", icon: "Leaf", image: "/locale/Marketplace/flowers.jpg", parentId: "cat-07", sortOrder: 4, isActive: true },
  { id: "sub-07-05", slug: "dried-flowers", name: "Dried Flowers", description: "Dried bouquets, preserved roses and decorative stems", icon: "Flower2", image: "/locale/Marketplace/flowers.jpg", parentId: "cat-07", sortOrder: 5, isActive: true },
  { id: "sub-07-06", slug: "floral-arrangements", name: "Floral Arrangements", description: "Wedding, event and gift floral arrangements", icon: "Flower2", image: "/locale/Marketplace/flowers.jpg", parentId: "cat-07", sortOrder: 6, isActive: true },
  // Forestry subcategories
  { id: "sub-08-01", slug: "timber-lumber", name: "Timber & Lumber", description: "Hardwood, softwood, planks, beams and treated timber", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-08", sortOrder: 1, isActive: true },
  { id: "sub-08-02", slug: "bamboo-products", name: "Bamboo Products", description: "Bamboo poles, stakes, fencing, furniture and crafts", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-08", sortOrder: 2, isActive: true },
  { id: "sub-08-03", slug: "firewood-charcoal", name: "Firewood & Charcoal", description: "Firewood logs, briquettes, charcoal and biomass fuel", icon: "Flame", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-08", sortOrder: 3, isActive: true },
  { id: "sub-08-04", slug: "wood-products", name: "Wood Products", description: "Furniture, doors, window frames, pallets and wood carvings", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-08", sortOrder: 4, isActive: true },
  { id: "sub-08-05", slug: "pole-timber", name: "Pole Timber", description: "Utility poles, fence posts, transmission poles and stakes", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-08", sortOrder: 5, isActive: true },
  { id: "sub-08-06", slug: "agroforestry", name: "Agroforestry Products", description: "Shade tree products, mulch, leaf litter and intercrop materials", icon: "Leaf", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-08", sortOrder: 6, isActive: true },
  // Seeds & Seedlings additional subcategories
  { id: "sub-09-04", slug: "flower-seeds-cat9", name: "Flower Seeds", description: "Ornamental and cut-flower seeds for gardens and commercial use", icon: "Flower2", image: "/locale/Marketplace/seeds.jpg", parentId: "cat-09", sortOrder: 4, isActive: true },
  { id: "sub-09-05", slug: "forestry-seedlings", name: "Forestry Seedlings", description: "Eucalyptus, pine, mahogany and indigenous tree seedlings", icon: "TreePine", image: "/locale/Marketplace/tree-seedlings.jpeg", parentId: "cat-09", sortOrder: 5, isActive: true },
  // Farm Machinery subcategories
  { id: "sub-11-01", slug: "tractors", name: "Tractors", description: "New and used tractors, power units and implement carriers", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-11", sortOrder: 1, isActive: true },
  { id: "sub-11-02", slug: "tillers-cultivators", name: "Tillers & Cultivators", description: "Power tillers, hand cultivators and rotary hoes", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-11", sortOrder: 2, isActive: true },
  { id: "sub-11-03", slug: "harvesters", name: "Harvesters", description: "Combine harvesters, reapers, pickers and threshers", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-11", sortOrder: 3, isActive: true },
  { id: "sub-11-04", slug: "millers-processors", name: "Millers & Processors", description: "Grain mills, oil presses, coffee pulpers and dryers", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-11", sortOrder: 4, isActive: true },
  { id: "sub-11-05", slug: "sprayers", name: "Sprayers & Drones", description: "Knapsack sprayers, boom sprayers and agricultural drones", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-11", sortOrder: 5, isActive: true },
  { id: "sub-11-06", slug: "spare-parts", name: "Spare Parts & Accessories", description: "Blades, filters, belts, tyres and implement attachments", icon: "Settings2", image: "/locale/Marketplace/farm-equipment.jpg", parentId: "cat-11", sortOrder: 6, isActive: true },
  // Organic Products subcategories
  { id: "sub-12-01", slug: "organic-vegetables", name: "Organic Vegetables", description: "Certified organic fresh vegetables direct from farms", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-12", sortOrder: 1, isActive: true },
  { id: "sub-12-02", slug: "organic-fruits", name: "Organic Fruits", description: "Certified organic tropical, citrus and temperate fruits", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-12", sortOrder: 2, isActive: true },
  { id: "sub-12-03", slug: "organic-dairy", name: "Organic Dairy", description: "Organic milk, yogurt, cheese and butter", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-12", sortOrder: 3, isActive: true },
  { id: "sub-12-04", slug: "organic-eggs", name: "Organic Eggs", description: "Free-range certified organic eggs", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-12", sortOrder: 4, isActive: true },
  { id: "sub-12-05", slug: "organic-herbs", name: "Organic Herbs & Spices", description: "Certified organic culinary herbs and spice blends", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-12", sortOrder: 5, isActive: true },
  { id: "sub-12-06", slug: "organic-honey", name: "Organic Honey", description: "Raw, unfiltered certified organic honey", icon: "ShieldCheck", image: "/locale/Marketplace/organic-vegetables-onions.jpg", parentId: "cat-12", sortOrder: 6, isActive: true },
  // Medicinal & Aromatic Plants subcategories
  { id: "sub-14-01", slug: "medicinal-herbs", name: "Medicinal Herbs", description: "Aloe vera, moringa, neem, chamomile and herbal teas", icon: "HeartPulse", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-14", sortOrder: 1, isActive: true },
  { id: "sub-14-02", slug: "aromatic-plants", name: "Aromatic Plants", description: "Lavender, jasmine, rosemary, lemongrass and scented geranium", icon: "HeartPulse", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-14", sortOrder: 2, isActive: true },
  { id: "sub-14-03", slug: "essential-oils", name: "Essential Oils", description: "Steam-distilled and cold-pressed therapeutic-grade essential oils", icon: "Droplets", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-14", sortOrder: 3, isActive: true },
  { id: "sub-14-04", slug: "herbal-remedies", name: "Herbal Remedies", description: "Tinctures, capsules, balms and traditional herbal preparations", icon: "HeartPulse", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-14", sortOrder: 4, isActive: true },
  { id: "sub-14-05", slug: "medicinal-roots", name: "Medicinal Roots & Bark", description: "Turmeric, ginger, ginseng root, neem bark and herbal powders", icon: "HeartPulse", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-14", sortOrder: 5, isActive: true },
  { id: "sub-14-06", slug: "plant-extracts", name: "Plant Extracts", description: "Concentrated plant extracts for pharmaceutical and cosmetic use", icon: "HeartPulse", image: "/locale/Marketplace/herbs-spices.jpeg", parentId: "cat-14", sortOrder: 6, isActive: true },
  // Local Indigenous Products subcategories
  { id: "sub-15-01", slug: "traditional-foods", name: "Traditional Foods", description: "Matoke, posho, millet bread, cassava bread and traditional dishes", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: "cat-15", sortOrder: 1, isActive: true },
  { id: "sub-15-02", slug: "indigenous-vegetables", name: "Indigenous Vegetables", description: "Dodo, nakati, bitter leaf, spider plant and jute mallow", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: "cat-15", sortOrder: 2, isActive: true },
  { id: "sub-15-03", slug: "smoked-fish", name: "Smoked & Dried Fish", description: "Traditional smoked tilapia, catfish, mukene and dried silverfish", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: "cat-15", sortOrder: 3, isActive: true },
  { id: "sub-15-04", slug: "shea-butter", name: "Shea Butter & Oils", description: "Raw shea butter, refined shea oil and body care products", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: "cat-15", sortOrder: 4, isActive: true },
  { id: "sub-15-05", slug: "handicrafts", name: "Handicrafts & Basketry", description: "Woven baskets, mats, pottery, beadwork and wood carvings", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: "cat-15", sortOrder: 5, isActive: true },
  { id: "sub-15-06", slug: "indigenous-fruits", name: "Indigenous Fruits", description: "Jackfruit, tamarind, soursop, bush plum and wild fig", icon: "Globe", image: "/locale/Marketplace/handicrafts.png", parentId: "cat-15", sortOrder: 6, isActive: true },
  // Value-Added Products subcategories
  { id: "sub-17-01", slug: "packaged-produce", name: "Packaged Produce", description: "Vacuum-sealed, pre-washed and portioned fresh produce", icon: "Package", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: "cat-17", sortOrder: 1, isActive: true },
  { id: "sub-17-02", slug: "vacuum-packed-meat", name: "Vacuum-Packed Meat", description: "Vacuum-sealed beef, goat, chicken and fish portions", icon: "Package", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: "cat-17", sortOrder: 2, isActive: true },
  { id: "sub-17-03", slug: "fruit-wines", name: "Fruit Wines & Beverages", description: "Pineapple wine, banana wine, passion fruit juice and craft drinks", icon: "Wine", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: "cat-17", sortOrder: 3, isActive: true },
  { id: "sub-17-04", slug: "essential-oils-va", name: "Essential Oils (Value Added)", description: "Branded essential oils, aromatherapy blends and diffuser kits", icon: "Droplets", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: "cat-17", sortOrder: 4, isActive: true },
  { id: "sub-17-05", slug: "biochar", name: "Biochar & Soil Amendments", description: "Biochar briquettes, activated carbon and soil conditioners", icon: "Flame", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: "cat-17", sortOrder: 5, isActive: true },
  { id: "sub-17-06", slug: "craft-products", name: "Craft & Artisan Products", description: "Artisan soaps, beeswax wraps, natural dyes and eco products", icon: "Star", image: "/locale/Marketplace/cocoa-value-added.jpg", parentId: "cat-17", sortOrder: 6, isActive: true },
];

// ─── SUBCATEGORY → PRODUCT NAMES MAP ────────────────────────────────────────
// Canonical product names per subcategory, used by the CategoryNavPanel accordion.

export const SUBCATEGORY_PRODUCTS: Record<string, string[]> = {
  // Fresh Produce
  "sub-01-01": [
    "Maize","Rice","Wheat","Sorghum","Millet","Finger Millet","Pearl Millet",
    "Barley","Oats","Rye","Triticale","Buckwheat","Quinoa","Fonio","Teff","Wild Rice",
  ],
  "sub-01-02": [
    "Beans","Kidney Beans","Navy Beans","Black Beans","Pinto Beans","Lima Beans",
    "Cowpeas","Soybeans","Chickpeas","Green Gram","Black Gram","Pigeon Peas",
    "Lentils","Bambara Nuts","Groundnuts","Field Peas","Snow Peas","Sugar Snap Peas",
  ],
  "sub-01-03": [
    "Cassava","Sweet Potato","Irish Potato","Yam","Cocoyam","Arrowroot",
    "Beetroot","Ginger","Turmeric","Jerusalem Artichoke","Taro",
  ],
  "sub-01-04": [
    "Spinach","Kale","Cabbage","Chinese Cabbage","Lettuce","Amaranth",
    "Swiss Chard","Pumpkin Leaves","Cowpea Leaves","Mustard Greens",
    "Collard Greens","Spider Plant","Jute Mallow","Purslane",
  ],
  "sub-01-05": [
    "Tomato","Cherry Tomato","Eggplant","Green Pepper","Bell Pepper","Chili Pepper",
    "Okra","Cucumber","Zucchini","Pumpkin","Squash","Bottle Gourd",
    "Bitter Gourd","Ridge Gourd",
  ],
  "sub-01-06": ["Onion","Garlic","Shallots","Leeks","Spring Onion","Chives"],
  "sub-01-07": [
    "Carrot","Cauliflower","Broccoli","Celery","Green Beans","Radish",
    "Turnip","Asparagus","Mushroom","Brussels Sprouts","Artichoke",
  ],
  // Fresh Fruits
  "sub-02-01": [
    "Banana","Mango","Pineapple","Papaya","Avocado","Passion Fruit","Jackfruit",
    "Guava","Tamarind","Breadfruit","Soursop","Custard Apple","Star Fruit",
    "Dragon Fruit","Breadnut",
  ],
  "sub-02-02": ["Orange","Lemon","Lime","Tangerine","Grapefruit","Mandarin","Clementine"],
  "sub-02-03": ["Apple","Pear","Peach","Plum","Cherry","Apricot","Nectarine"],
  "sub-02-04": ["Strawberry","Blueberry","Raspberry","Blackberry","Cranberry","Gooseberry"],
  "sub-02-05": ["Watermelon","Rock Melon","Honeydew","Cantaloupe"],
  // Herbs & Spices
  "sub-03-01": [
    "Basil","Mint","Rosemary","Thyme","Parsley","Coriander","Dill",
    "Sage","Tarragon","Oregano","Chives","Lemongrass",
  ],
  "sub-03-02": [
    "Black Pepper","White Pepper","Cinnamon","Cardamom","Cloves","Nutmeg",
    "Vanilla","Saffron","Star Anise","Turmeric","Ginger","Fenugreek",
    "Cumin","Fennel","Mustard Seed",
  ],
  // Livestock & Animal Products
  "sub-04-01": ["Dairy Cattle","Beef Cattle","Goats","Sheep","Pigs","Rabbits","Camels","Donkeys"],
  "sub-04-02": ["Chicken","Turkey","Duck","Goose","Guinea Fowl","Quail","Pigeon","Ostrich"],
  "sub-04-03": [
    "Beef","Goat Meat","Lamb","Pork","Rabbit Meat","Camel Meat",
    "Chicken Meat","Turkey Meat","Duck Meat",
  ],
  "sub-04-04": ["Fresh Milk","Pasteurized Milk","Yogurt","Cheese","Butter","Ghee","Cream","Ice Cream"],
  "sub-04-05": ["Chicken Eggs","Duck Eggs","Quail Eggs","Turkey Eggs","Goose Eggs"],
  // Fish & Aquaculture
  "sub-05-01": ["Tilapia","Catfish","Nile Perch","Carp","Trout","Salmon","Tuna","Sardines"],
  "sub-05-02": ["Shrimp","Prawns","Lobster","Crayfish","Crab","Mussels","Oysters"],
  "sub-05-03": ["Fish Fingerlings","Fish Feed","Pond Lime","Pond Fertilizer"],
  // Seeds & Seedlings
  "sub-09-01": ["Certified Seeds","Hybrid Seeds","Vegetable Seeds"],
  "sub-09-02": [
    "Fruit Seedlings","Coffee Seedlings","Tea Seedlings","Banana Suckers",
    "Cassava Cuttings","Sweet Potato Vines","Sugarcane Cuttings","Tissue Culture Plants",
  ],
  // Farm Inputs
  "sub-10-01": ["Organic Fertilizer","Compost","NPK","Urea","CAN","DAP","TSP"],
  "sub-10-02": ["Herbicides","Fungicides","Insecticides","Bio-pesticides"],
  "sub-10-03": ["Drip Kits","Sprinklers","Water Pumps","Pipes"],
  "sub-10-04": ["Mineral Licks","Veterinary Drugs","Vaccines","Feed Supplements"],
  // Processed Foods
  "sub-13-01": ["Maize Flour","Wheat Flour","Rice Flour","Cassava Flour","Millet Flour","Sorghum Flour"],
  "sub-13-02": ["Sunflower Oil","Sesame Oil","Groundnut Oil","Palm Oil","Avocado Oil","Coconut Oil"],
  "sub-13-03": [
    "Peanut Butter","Tomato Paste","Fruit Juice","Jam","Marmalade",
    "Dried Fruits","Dried Vegetables","Roasted Coffee","Tea Packs","Cheese","Yogurt","Wine",
  ],
  // Export Products
  "sub-16-01": ["Coffee","Tea","Cocoa","Vanilla","Cotton","Cashew","Sesame","Chia"],
  "sub-16-02": ["Avocado (Hass)","Pineapple","Mango","Macadamia","Flowers"],
  "sub-16-03": ["Honey","Spices"],
  // Beekeeping Products
  "sub-06-01": ["Wildflower Honey","Forest Honey","Acacia Honey","Manuka Honey","Raw Unfiltered Honey","Creamed Honey","Comb Honey"],
  "sub-06-02": ["Raw Beeswax","Beeswax Candles","Beeswax Wraps","Beeswax Balms","Beeswax Cosmetics","Honeycomb"],
  "sub-06-03": ["Fresh Royal Jelly","Freeze-Dried Royal Jelly","Royal Jelly Capsules","Royal Jelly with Honey"],
  "sub-06-04": ["Raw Bee Pollen","Dried Bee Pollen","Bee Pollen Granules","Bee Pollen Capsules"],
  "sub-06-05": ["Raw Propolis","Propolis Tincture","Propolis Spray","Propolis Lozenges","Propolis Throat Drops"],
  "sub-06-06": ["Beehive Boxes","Beehive Frames","Bee Smoker","Bee Veil","Honey Extractor","Bee Brush","Queen Excluder","Bee Feeder"],
  // Flowers & Ornamentals
  "sub-07-01": ["Roses","Lilies","Carnations","Chrysanthemums","Sunflowers","Orchids","Gladioli","Tulips","Gerbera Daisies","Statice"],
  "sub-07-02": ["Indoor Potted Plants","Outdoor Potted Plants","Succulents","Cacti","Ferns","Palms","Bonsai Trees"],
  "sub-07-03": ["Bedding Seedlings","Border Seedlings","Container Seedlings","Hanging Basket Seedlings"],
  "sub-07-04": ["Bermuda Grass","Kikuyu Grass","Carpet Grass","Artificial Turf","Rye Grass"],
  "sub-07-05": ["Dried Bouquets","Preserved Roses","Dried Lavender","Dried Eucalyptus","Decorative Stems"],
  "sub-07-06": ["Wedding Bouquets","Event Centerpieces","Gift Bouquets","Sympathy Arrangements","Corporate Flowers"],
  // Forestry Products
  "sub-08-01": ["Hardwood Planks","Softwood Planks","Treated Timber","Beams","Plywood","MDF Boards"],
  "sub-08-02": ["Bamboo Poles","Bamboo Stakes","Bamboo Fencing","Bamboo Furniture","Bamboo Crafts"],
  "sub-08-03": ["Firewood Logs","Charcoal Briquettes","Wood Charcoal","Biomass Pellets","Coconut Charcoal"],
  "sub-08-04": ["Wooden Doors","Window Frames","Wooden Pallets","Wood Carvings","Wooden Furniture"],
  "sub-08-05": ["Utility Poles","Fence Posts","Transmission Poles","Garden Stakes"],
  "sub-08-06": ["Shade Tree Products","Organic Mulch","Leaf Litter","Intercrop Materials","Agroforestry Seedlings"],
  // Seeds & Seedlings additional
  "sub-09-04": ["Rose Seeds","Sunflower Seeds","Marigold Seeds","Zinnia Seeds","Petunia Seeds","Cosmos Seeds"],
  "sub-09-05": ["Eucalyptus Seedlings","Pine Seedlings","Mahogany Seedlings","Mukwa Seedlings","Indigenous Tree Seedlings"],
  // Farm Machinery
  "sub-11-01": ["Compact Tractors","Utility Tractors","Row-Crop Tractors","Mini Tractors","Tractor Implements"],
  "sub-11-02": ["Power Tillers","Hand Cultivators","Rotary Hoes","Walk-Behind Tractors"],
  "sub-11-03": ["Combine Harvesters","Crop Reapers","Fruit Pickers","Grain Threshers","Maize Shellers"],
  "sub-11-04": ["Grain Mills","Oil Presses","Coffee Pulpers","Grain Dryers","Hammer Mills"],
  "sub-11-05": ["Knapsack Sprayers","Boom Sprayers","Mist Blowers","Agricultural Drones","Motorized Sprayers"],
  "sub-11-06": ["Tractor Blades","Oil Filters","Drive Belts","Implement Tyres","Plough Shares"],
  // Organic Products
  "sub-12-01": ["Organic Tomatoes","Organic Spinach","Organic Kale","Organic Lettuce","Organic Peppers","Organic Onions","Organic Carrots"],
  "sub-12-02": ["Organic Bananas","Organic Mangoes","Organic Apples","Organic Pineapples","Organic Avocados","Organic Oranges"],
  "sub-12-03": ["Organic Fresh Milk","Organic Yogurt","Organic Cheese","Organic Butter","Organic Ghee"],
  "sub-12-04": ["Organic Chicken Eggs","Organic Duck Eggs","Organic Quail Eggs"],
  "sub-12-05": ["Organic Basil","Organic Mint","Organic Rosemary","Organic Thyme","Organic Parsley","Organic Coriander"],
  "sub-12-06": ["Raw Organic Honey","Organic Creamed Honey","Organic Comb Honey","Organic Forest Honey"],
  // Medicinal & Aromatic Plants
  "sub-14-01": ["Aloe Vera","Moringa","Neem","Chamomile","Echinacea","Valerian Root","Lemon Balm","Holy Basil"],
  "sub-14-02": ["Lavender","Jasmine","Rosemary","Lemongrass","Scented Geranium","Ylang Ylang","Patchouli"],
  "sub-14-03": ["Lavender Oil","Tea Tree Oil","Eucalyptus Oil","Peppermint Oil","Lemongrass Oil","Rose Oil","Neem Oil","Coconut Oil (Therapeutic)"],
  "sub-14-04": ["Herbal Tinctures","Herbal Capsules","Herbal Balms","Traditional Herbal Preparations","Herbal Teas"],
  "sub-14-05": ["Turmeric Root","Ginger Root","Ginseng Root","Neem Bark","Moringa Bark","Herbal Powders"],
  "sub-14-06": ["Concentrated Plant Extracts","Pharmaceutical Extracts","Cosmetic Extracts","Fluid Extracts","Dry Extracts"],
  // Local Indigenous Products
  "sub-15-01": ["Matoke","Posho","Millet Bread","Cassava Bread","Sweet Potato Bread","Traditional Porridge"],
  "sub-15-02": ["Dodo (Amaranth)","Nakati","Bitter Leaf","Spider Plant","Jute Mallow","Cowpea Leaves","Pumpkin Leaves"],
  "sub-15-03": ["Smoked Tilapia","Smoked Catfish","Mukene","Dried Silverfish","Smoked Nile Perch","Dried Dagaa"],
  "sub-15-04": ["Raw Shea Butter","Refined Shea Oil","Shea Butter Body Balm","Shea Butter Soap","Unrefined Shea Butter"],
  "sub-15-05": ["Woven Baskets","Floor Mats","Pottery","Beadwork","Wood Carvings","Bark Cloth"],
  "sub-15-06": ["Jackfruit","Tamarind","Soursop","Bush Plum","Wild Fig","African Custard Apple","Monkey Fruit"],
  // Value-Added Products
  "sub-17-01": ["Vacuum-Sealed Vegetables","Pre-Washed Salad Mix","Portioned Fruit Packs","Dried Fruit Packs","Frozen Vegetables"],
  "sub-17-02": ["Vacuum-Sealed Beef","Vacuum-Sealed Goat","Vacuum-Sealed Chicken","Vacuum-Sealed Fish","Marinated Meat Packs"],
  "sub-17-03": ["Pineapple Wine","Banana Wine","Passion Fruit Juice","Craft Ginger Beer","Hibiscus Drink","Tamarind Juice"],
  "sub-17-04": ["Branded Essential Oils","Aromatherapy Blends","Diffuser Kits","Roll-On Oils","Massage Oil Blends"],
  "sub-17-05": ["Biochar Briquettes","Activated Carbon","Soil Conditioner","Biochar Pellets","Carbon-Rich Compost"],
  "sub-17-06": ["Artisan Soaps","Beeswax Wraps","Natural Dyes","Eco Sponges","Handmade Candles","Organic Body Care"],
};

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
