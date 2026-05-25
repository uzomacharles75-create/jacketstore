import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product, Category } from "@/lib/products";
import { listProducts, listCategories } from "@/lib/store.functions";

export const Route = createFileRoute("/shop")({
  loader: async () => {
    const [products, categories] = await Promise.all([listProducts(), listCategories()]);
    return { products, categories };
  },
  head: () => ({
    meta: [
      { title: "Shop All Jackets — J.D & CO BW" },
      { name: "description", content: "Browse premium jackets, hoodies, leather and safari apparel. Order on WhatsApp." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { products, categories } = Route.useLoaderData() as { products: Product[]; categories: Category[] };
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()),
    );
    if (cat !== "all") list = list.filter((p) => p.categorySlug === cat);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [q, cat, sort, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary text-secondary-foreground py-16">
          <div className="container-x">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">The collection</p>
            <h1 className="display text-4xl sm:text-6xl mt-3">Shop all products</h1>
            <p className="mt-3 text-secondary-foreground/70 max-w-xl">From safari softshells to leather classics — built with intent, made to last.</p>
          </div>
        </section>

        <section className="container-x py-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-10 pr-3 py-2.5 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="px-3 py-2.5 rounded-md border border-border bg-card text-sm">
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="px-3 py-2.5 rounded-md border border-border bg-card text-sm">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No products match your search. <Link to="/shop" className="text-primary underline">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
