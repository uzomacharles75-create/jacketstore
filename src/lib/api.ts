/**
 * Front-end API client.
 *
 * Every page and the admin dashboard call functions on `api` below.
 * Right now they read/write to the in-memory mock data in src/mocks/data.ts
 * so the UI works with zero backend.
 *
 * --------------------------------------------------------------------
 * WIRING UP MONGODB
 * --------------------------------------------------------------------
 * Replace each function body with a `fetch()` call to your Express/Mongo
 * server. Suggested base URL: import.meta.env.VITE_API_URL (set in .env).
 *
 * Example:
 *   const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
 *   listProducts: async () => {
 *     const r = await fetch(`${BASE}/api/products`);
 *     if (!r.ok) throw new Error("Failed to load products");
 *     return r.json();
 *   }
 *
 * For admin writes, include a bearer token from src/lib/auth.ts:
 *   headers: { Authorization: `Bearer ${getToken()}` }
 *
 * Keep the function SIGNATURES the same and the UI will keep working.
 * --------------------------------------------------------------------
 */
import { mockCategories, mockProducts, mockCustomOrders } from "@/mocks/data";
import { resolveProductImage, type Product, type Category, type CustomOrder } from "@/lib/products";

// Mutable runtime copies so the admin dashboard can create/edit/delete
// without a backend. Replace with real API calls when you're ready.
let productStore: Product[] = [...mockProducts];
let categoryStore: Category[] = [...mockCategories];
const orderStore: CustomOrder[] = [...mockCustomOrders];

// Simulate small network latency so loading states are visible in dev.
const wait = <T,>(value: T, ms = 120): Promise<T> =>
  new Promise((res) => setTimeout(() => res(value), ms));

function uid(prefix: string) {
  return prefix + "-" + Math.random().toString(36).slice(2, 10);
}

// ───── Public storefront ────────────────────────────────────────────
export const api = {
  // PRODUCTS / CATEGORIES (public)
  listProducts: () => wait(productStore.slice()),
  listCategories: () =>
    wait(categoryStore.slice().sort((a, b) => a.sortOrder - b.sortOrder)),
  getProductBySlug: (slug: string) =>
    wait(productStore.find((p) => p.slug === slug) ?? null),
  productsByCategory: (categorySlug: string) =>
    wait(productStore.filter((p) => p.categorySlug === categorySlug)),

  // ADMIN — PRODUCTS
  adminCreateProduct: (input: ProductInput) => {
    const cat = categoryStore.find((c) => c.slug === input.categorySlug);
    const next: Product = {
      ...input,
      id: uid("p"),
      image: resolveProductImage(input.slug, input.imageUrl),
      category: cat?.name ?? "Uncategorized",
    };
    productStore = [next, ...productStore];
    return wait(next);
  },
  adminUpdateProduct: (id: string, patch: Partial<ProductInput>) => {
    productStore = productStore.map((p) => {
      if (p.id !== id) return p;
      const merged = { ...p, ...patch };
      const cat = categoryStore.find((c) => c.slug === merged.categorySlug);
      return {
        ...merged,
        image: resolveProductImage(merged.slug, merged.imageUrl ?? null),
        category: cat?.name ?? p.category,
      };
    });
    return wait(productStore.find((p) => p.id === id) ?? null);
  },
  adminDeleteProduct: (id: string) => {
    productStore = productStore.filter((p) => p.id !== id);
    return wait({ ok: true });
  },

  // ADMIN — CATEGORIES
  adminUpsertCategory: (cat: Partial<Category> & { name: string; slug: string }) => {
    if (cat.id && categoryStore.some((c) => c.id === cat.id)) {
      categoryStore = categoryStore.map((c) => (c.id === cat.id ? { ...c, ...cat } as Category : c));
    } else {
      categoryStore = [
        ...categoryStore,
        { id: uid("c"), sortOrder: 99, ...cat } as Category,
      ];
    }
    return wait({ ok: true });
  },
  adminDeleteCategory: (id: string) => {
    categoryStore = categoryStore.filter((c) => c.id !== id);
    return wait({ ok: true });
  },

  // ADMIN — CUSTOM ORDERS
  listCustomOrders: () => wait(orderStore.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
  adminUpdateOrderStatus: (id: string, status: CustomOrder["status"]) => {
    const o = orderStore.find((x) => x.id === id);
    if (o) o.status = status;
    return wait({ ok: true });
  },

  // ADMIN — DASHBOARD STATS
  adminStats: () =>
    wait({
      products: productStore.length,
      categories: categoryStore.length,
      orders: orderStore.length,
      newOrders: orderStore.filter((o) => o.status === "new").length,
    }),
};

export type ProductInput = Omit<Product, "id" | "image" | "category">;
