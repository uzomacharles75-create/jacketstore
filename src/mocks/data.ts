// Mock data used by src/lib/api.ts while you wire up MongoDB.
// Edit freely — these arrays drive every page when there's no backend.
import { resolveProductImage, type Product, type Category, type CustomOrder } from "@/lib/products";

export const mockCategories: Category[] = [
  { id: "c1", slug: "safari", name: "Safari", sortOrder: 1 },
  { id: "c2", slug: "leather-jackets", name: "Leather Jackets", sortOrder: 2 },
  { id: "c3", slug: "puffers", name: "Puffers", sortOrder: 3 },
  { id: "c4", slug: "hoodies", name: "Hoodies", sortOrder: 4 },
  { id: "c5", slug: "workwear", name: "Workwear", sortOrder: 5 },
  { id: "c6", slug: "womens", name: "Women's", sortOrder: 6 },
  { id: "c7", slug: "best-sellers", name: "Best Sellers", sortOrder: 7 },
  { id: "c8", slug: "bombers", name: "Bombers", sortOrder: 8 },
];

type Seed = Omit<Product, "image" | "category"> & { categorySlug: string };

const seed: Seed[] = [
  {
    id: "p1", slug: "okavango-safari-softshell", name: "Okavango Safari Softshell",
    description: "Lightweight, water-repellent softshell built for game drives and bush walks.",
    price: 1299, imageUrl: null, categorySlug: "safari",
    sizes: ["S","M","L","XL","XXL"], colors: ["Khaki","Olive","Sand"],
    featured: true, bestSeller: true, newArrival: false, inStock: true,
  },
  {
    id: "p2", slug: "kalahari-leather-biker", name: "Kalahari Leather Biker",
    description: "Full-grain leather, asymmetric zip, quilted shoulder panels.",
    price: 3499, imageUrl: null, categorySlug: "leather-jackets",
    sizes: ["S","M","L","XL"], colors: ["Black","Tan"],
    featured: true, bestSeller: false, newArrival: true, inStock: true,
  },
  {
    id: "p3", slug: "chobe-black-puffer", name: "Chobe Black Puffer",
    description: "Insulated puffer for cold mornings on the river.",
    price: 1599, imageUrl: null, categorySlug: "puffers",
    sizes: ["S","M","L","XL"], colors: ["Black","Navy"],
    featured: true, bestSeller: true, newArrival: false, inStock: true,
  },
  {
    id: "p4", slug: "core-pullover-hoodie", name: "Core Pullover Hoodie",
    description: "Heavy fleece hoodie with brushed interior.",
    price: 549, imageUrl: null, categorySlug: "hoodies",
    sizes: ["S","M","L","XL","XXL"], colors: ["Charcoal","Stone","Black"],
    featured: false, bestSeller: true, newArrival: false, inStock: true,
  },
  {
    id: "p5", slug: "hi-vis-pro-jacket", name: "Hi-Vis Pro Workwear Jacket",
    description: "EN-rated reflective workwear for construction & security.",
    price: 899, imageUrl: null, categorySlug: "workwear",
    sizes: ["M","L","XL","XXL","3XL"], colors: ["Hi-Vis Yellow","Hi-Vis Orange"],
    featured: false, bestSeller: false, newArrival: true, inStock: true,
  },
  {
    id: "p6", slug: "atelier-wool-coat", name: "Atelier Wool Coat",
    description: "Tailored wool blend coat with satin lining. Women's cut.",
    price: 2199, imageUrl: null, categorySlug: "womens",
    sizes: ["XS","S","M","L"], colors: ["Camel","Black"],
    featured: true, bestSeller: false, newArrival: true, inStock: true,
  },
  {
    id: "p7", slug: "gaborone-olive-bomber", name: "Gaborone Olive Bomber",
    description: "Classic bomber silhouette in olive technical nylon.",
    price: 1099, imageUrl: null, categorySlug: "bombers",
    sizes: ["S","M","L","XL"], colors: ["Olive","Black"],
    featured: false, bestSeller: false, newArrival: true, inStock: true,
  },
  {
    id: "p8", slug: "tuli-beige-trench", name: "Tuli Beige Trench",
    description: "Mid-length trench with storm flap and waist tie.",
    price: 1899, imageUrl: null, categorySlug: "womens",
    sizes: ["XS","S","M","L"], colors: ["Beige"],
    featured: false, bestSeller: false, newArrival: false, inStock: true,
  },
  {
    id: "p9", slug: "maun-navy-denim", name: "Maun Navy Denim Jacket",
    description: "Rigid raw-denim trucker jacket, copper rivets.",
    price: 899, imageUrl: null, categorySlug: "leather-jackets",
    sizes: ["S","M","L","XL"], colors: ["Navy"],
    featured: false, bestSeller: false, newArrival: false, inStock: false,
  },
  {
    id: "p10", slug: "savanna-puffer", name: "Savanna Puffer",
    description: "Cropped puffer in sand colourway with adjustable hem.",
    price: 1499, imageUrl: null, categorySlug: "puffers",
    sizes: ["S","M","L"], colors: ["Sand","Olive"],
    featured: false, bestSeller: false, newArrival: false, inStock: true,
  },
  {
    id: "p11", slug: "wild-explorer-softshell", name: "Wild Explorer Softshell",
    description: "Heavier-weight softshell for cooler bush mornings.",
    price: 1399, imageUrl: null, categorySlug: "safari",
    sizes: ["M","L","XL"], colors: ["Olive","Charcoal"],
    featured: true, bestSeller: false, newArrival: false, inStock: true,
  },
  {
    id: "p12", slug: "midnight-biker", name: "Midnight Biker",
    description: "Black-on-black leather biker with twin chest zips.",
    price: 3299, imageUrl: null, categorySlug: "leather-jackets",
    sizes: ["S","M","L","XL"], colors: ["Black"],
    featured: false, bestSeller: true, newArrival: false, inStock: true,
  },
];

export const mockProducts: Product[] = seed.map((s) => ({
  ...s,
  image: resolveProductImage(s.slug, s.imageUrl),
  category: mockCategories.find((c) => c.slug === s.categorySlug)?.name ?? "Uncategorized",
}));

export const mockCustomOrders: CustomOrder[] = [
  {
    id: "o1",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    company: "Chobe Game Lodge",
    contactName: "Lesedi M.",
    phone: "+26771112233",
    email: "lesedi@chobegamelodge.example",
    productType: "Company Jackets",
    quantity: "45",
    colors: "Khaki + Navy trim",
    notes: "Embroidered logo on left chest. Need by end of month.",
    fileUrl: null,
    status: "new",
  },
  {
    id: "o2",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    company: "Botswana Build Co.",
    contactName: "Kago D.",
    phone: "+26772223344",
    email: null,
    productType: "Reflective Safety Jackets",
    quantity: "120",
    colors: "Hi-Vis Orange",
    notes: "EN 20471 compliant. Sized M–3XL.",
    fileUrl: null,
    status: "quoted",
  },
];
