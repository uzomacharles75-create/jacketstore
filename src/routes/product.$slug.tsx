import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Check, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { waLink, type Product } from "@/lib/products";
import { formatPula } from "@/lib/format";
import { getProductBySlug, listProducts } from "@/lib/store.functions";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    const product = await getProductBySlug({ data: { slug: params.slug } });
    if (!product) throw notFound();
    const all = await listProducts();
    const related = all.filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug).slice(0, 4);
    return { product, related: related.length ? related : all.filter((p) => p.slug !== product.slug).slice(0, 4) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — J.D & CO BW` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: `${loaderData.product.name} — J.D & CO BW` },
      { property: "og:description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container-x py-32 text-center">
        <h1 className="display text-4xl text-secondary">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container-x py-32 text-center">
        <h1 className="display text-4xl text-secondary">Something went wrong</h1>
      </div>
      <Footer />
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData() as { product: Product; related: Product[] };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-x py-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>
        </div>
        <section className="container-x grid lg:grid-cols-2 gap-10 pb-16">
          <div className="bg-muted rounded-lg overflow-hidden aspect-[4/5]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={900} height={1100} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{product.category}</p>
            <h1 className="display text-4xl sm:text-5xl text-secondary mt-3">{product.name}</h1>
            <p className="mt-4 text-3xl font-bold text-secondary">{formatPula(product.price)}</p>
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            {product.sizes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <span key={s} className="min-w-12 text-center px-3 py-2 border border-border rounded-md text-sm font-medium hover:border-primary cursor-pointer">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span key={c} className="px-3 py-2 border border-border rounded-md text-sm">{c}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 text-sm">
              {product.inStock ? (
                <><Check className="h-4 w-4 text-primary" /> In stock — ready to ship</>
              ) : (
                <span className="text-muted-foreground">Currently unavailable</span>
              )}
            </div>

            {product.inStock && (
              <a
                href={waLink(`Hello, I want to order: ${product.name} (${formatPula(product.price)}). My size: ___, color: ___.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90 transition"
              >
                <MessageCircle className="h-5 w-5" /> Order on WhatsApp
              </a>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="container-x py-16 border-t border-border">
            <h2 className="display text-3xl text-secondary mb-8">You may also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
