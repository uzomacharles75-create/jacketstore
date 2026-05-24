import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, getProductsByCategory, type Product } from "@/lib/products";

type Cat = { slug: string; name: string };

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }): { cat: Cat; items: Product[] } => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, items: getProductsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.name} — J.D & CO BW` },
      { name: "description", content: `Shop ${loaderData.cat.name} at J.D & CO BW. Premium quality, WhatsApp ordering.` },
      { property: "og:title", content: `${loaderData.cat.name} — J.D & CO BW` },
      { property: "og:description", content: `Shop ${loaderData.cat.name}.` },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container-x py-32 text-center">
        <h1 className="display text-4xl text-secondary">Category not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container-x py-32 text-center"><h1 className="display text-4xl">Something went wrong</h1></div>
      <Footer />
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData() as { cat: Cat; items: Product[] };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary text-secondary-foreground py-16">
          <div className="container-x">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Category</p>
            <h1 className="display text-4xl sm:text-6xl mt-3">{cat.name}</h1>
            <p className="mt-2 text-secondary-foreground/70">{items.length} product{items.length === 1 ? "" : "s"}</p>
          </div>
        </section>
        <section className="container-x py-12">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No products in this category yet. <Link to="/shop" className="text-primary underline">Browse all</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {items.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
