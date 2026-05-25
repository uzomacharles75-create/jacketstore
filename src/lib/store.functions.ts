// Public storefront data (no auth required).
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { resolveProductImage, type Product, type Category } from "@/lib/products";

type Row = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string | number;
  image_url: string | null;
  sizes: string[];
  colors: string[];
  featured: boolean;
  best_seller: boolean;
  new_arrival: boolean;
  in_stock: boolean;
  categories: { name: string; slug: string } | null;
};

function mapProduct(r: Row): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    price: Number(r.price),
    imageUrl: r.image_url,
    image: resolveProductImage(r.slug, r.image_url),
    category: r.categories?.name ?? "Uncategorized",
    categorySlug: r.categories?.slug ?? "",
    sizes: r.sizes ?? [],
    colors: r.colors ?? [],
    featured: r.featured,
    bestSeller: r.best_seller,
    newArrival: r.new_arrival,
    inStock: r.in_stock,
  };
}

export const listCategories = createServerFn({ method: "GET" }).handler(
  async (): Promise<Category[]> => {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select("id, slug, name")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  },
);

export const listProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as Row[] ?? []).map(mapProduct);
  },
);

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }): Promise<Product | null> => {
    const { data: row, error } = await supabaseAdmin
      .from("products")
      .select("*, categories(name, slug)")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row ? mapProduct(row as Row) : null;
  });
