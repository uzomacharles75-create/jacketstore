// Brand info + product/category type definitions.
// Mock data lives in src/mocks/data.ts. Replace src/lib/api.ts with your
// MongoDB-backed implementation when you're ready.
import softshell from "@/assets/product-softshell.jpg";
import puffer from "@/assets/product-puffer.jpg";
import leather from "@/assets/product-leather.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import safety from "@/assets/product-safety.jpg";
import womens from "@/assets/product-womens.jpg";
import jLeatherBiker from "@/assets/jackets/leather-biker.jpg";
import jSafariSoftshell from "@/assets/jackets/safari-softshell.jpg";
import jOliveBomber from "@/assets/jackets/olive-bomber.jpg";
import jBlackPuffer from "@/assets/jackets/black-puffer.jpg";
import jBeigeTrench from "@/assets/jackets/beige-trench.jpg";
import jNavyDenim from "@/assets/jackets/navy-denim.jpg";

export const WHATSAPP_NUMBER = "26771234567";
export const BRAND = {
  name: "J.D & CO BW",
  tagline: "Jacket Manufacturers of Distinction",
  sub: "Custom · Corporate · Sport · Safari · Mining · Logistics",
  email: "info@jdcobw.com",
  phone: "+267 71 234 567",
  location: "Gaborone, Botswana",
};

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Image fallbacks keyed by product slug (used until your backend supplies one).
const FALLBACK_IMAGES: Record<string, string> = {
  "wild-explorer-softshell": softshell,
  "savanna-puffer": puffer,
  "midnight-biker": leather,
  "core-pullover-hoodie": hoodie,
  "hi-vis-pro-jacket": safety,
  "atelier-wool-coat": womens,
  "kalahari-leather-biker": jLeatherBiker,
  "okavango-safari-softshell": jSafariSoftshell,
  "gaborone-olive-bomber": jOliveBomber,
  "chobe-black-puffer": jBlackPuffer,
  "tuli-beige-trench": jBeigeTrench,
  "maun-navy-denim": jNavyDenim,
};

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23e8e4dd'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23999'>No image</text></svg>`,
  );

export function resolveProductImage(slug: string, imageUrl: string | null | undefined): string {
  if (imageUrl && /^https?:\/\//.test(imageUrl)) return imageUrl;
  return FALLBACK_IMAGES[slug] ?? PLACEHOLDER;
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl: string | null;
  category: string;
  categorySlug: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  inStock: boolean;
};

export type Category = { id: string; slug: string; name: string; sortOrder: number };

export type CustomOrder = {
  id: string;
  createdAt: string;
  company: string;
  contactName: string;
  phone: string;
  email: string | null;
  productType: string;
  quantity: string;
  colors: string | null;
  notes: string | null;
  fileUrl: string | null;
  status: "new" | "in-progress" | "quoted" | "completed" | "archived";
};
