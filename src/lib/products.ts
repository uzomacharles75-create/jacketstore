import softshell from "@/assets/product-softshell.jpg";
import puffer from "@/assets/product-puffer.jpg";
import leather from "@/assets/product-leather.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import safety from "@/assets/product-safety.jpg";
import womens from "@/assets/product-womens.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categorySlug: string;
  description: string;
  sizes: string[];
  colors: string[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};

export const WHATSAPP_NUMBER = "26771234567"; // Botswana format — replace with real number
export const BRAND = {
  name: "J.D & CO BW",
  tagline: "Jacket Manufacturers of Distinction",
  sub: "Corporate · Sport · Safari",
  email: "info@jdcobw.com",
  phone: "+267 71 234 567",
  location: "Gaborone, Botswana",
};

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const categories = [
  { slug: "mens-jackets", name: "Men's Jackets" },
  { slug: "womens-jackets", name: "Women's Jackets" },
  { slug: "leather-jackets", name: "Leather Jackets" },
  { slug: "hoodies", name: "Hoodies" },
  { slug: "safari", name: "Safari Collection" },
  { slug: "workwear", name: "Workwear & Safety" },
  { slug: "new-arrivals", name: "New Arrivals" },
  { slug: "best-sellers", name: "Best Sellers" },
];

export const products: Product[] = [
  {
    slug: "wild-explorer-softshell",
    name: "Wild Explorer Softshell",
    price: 1299,
    image: softshell,
    category: "Safari Collection",
    categorySlug: "safari",
    description:
      "Windproof, water-repellent softshell with detachable hood. Built for game drives, treks and rugged conditions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Olive", "Khaki", "Black"],
    featured: true,
    bestSeller: true,
  },
  {
    slug: "savanna-puffer",
    name: "Savanna Puffer Hoodie",
    price: 1499,
    image: puffer,
    category: "Safari Collection",
    categorySlug: "safari",
    description:
      "Lightweight insulated puffer that traps warmth without the bulk. Perfect for early morning safaris.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sand", "Olive", "Charcoal"],
    featured: true,
    newArrival: true,
  },
  {
    slug: "midnight-biker",
    name: "Midnight Leather Biker",
    price: 2499,
    image: leather,
    category: "Leather Jackets",
    categorySlug: "leather-jackets",
    description:
      "Premium full-grain leather biker jacket with asymmetric zip and quilted lining. Timeless attitude.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    featured: true,
    bestSeller: true,
  },
  {
    slug: "core-pullover-hoodie",
    name: "Core Pullover Hoodie",
    price: 599,
    image: hoodie,
    category: "Hoodies",
    categorySlug: "hoodies",
    description:
      "Heavyweight cotton fleece hoodie with kangaroo pocket. Custom branding available for teams and crews.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Black", "Sand"],
    newArrival: true,
  },
  {
    slug: "hi-vis-pro-jacket",
    name: "Hi-Vis Pro Work Jacket",
    price: 899,
    image: safety,
    category: "Workwear & Safety",
    categorySlug: "workwear",
    description:
      "Reflective, waterproof safety jacket built for construction crews, road workers and industrial sites.",
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    colors: ["Hi-Vis Orange", "Hi-Vis Yellow"],
    featured: true,
  },
  {
    slug: "atelier-wool-coat",
    name: "Atelier Wool Coat",
    price: 2199,
    image: womens,
    category: "Women's Jackets",
    categorySlug: "womens-jackets",
    description:
      "Tailored long wool coat with notch lapel. Elegant silhouette for the modern wardrobe.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Camel"],
    featured: true,
    bestSeller: true,
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug: string) => {
  if (slug === "new-arrivals") return products.filter((p) => p.newArrival);
  if (slug === "best-sellers") return products.filter((p) => p.bestSeller);
  if (slug === "mens-jackets")
    return products.filter((p) =>
      ["safari", "leather-jackets", "workwear"].includes(p.categorySlug),
    );
  return products.filter((p) => p.categorySlug === slug);
};
