import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Wind, Droplets, Layers, Feather, Compass, Shield, Star, Building2, HardHat, Quote } from "lucide-react";
import heroImg from "@/assets/hero-safari-model.jpg";
import customImg from "@/assets/custom-corporate.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { waLink, type Product, type Category } from "@/lib/products";
import { listProducts, listCategories } from "@/lib/store.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, categories] = await Promise.all([listProducts(), listCategories()]);
    return { products, categories };
  },
  head: () => ({
    meta: [
      { title: "J.D & CO BW — Premium Jackets & Custom Apparel" },
      { name: "description", content: "Designed for the wild. Made for the journey. Shop premium jackets and order corporate uniforms on WhatsApp." },
      { property: "og:title", content: "J.D & CO BW — Designed for the Wild" },
      { property: "og:description", content: "Softshell, puffer, leather, hoodies and corporate workwear. Direct WhatsApp ordering." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Wind, title: "Windproof & Durable", desc: "Shield from harsh winds and rugged conditions." },
  { icon: Droplets, title: "Water Repellent", desc: "Stay dry and comfortable in light rain and mist." },
  { icon: Layers, title: "Insulated Comfort", desc: "Traps warmth without the bulk." },
  { icon: Feather, title: "Lightweight & Flexible", desc: "Move freely and explore without limits." },
  { icon: Compass, title: "Made for Explorers", desc: "Perfect for game drives, treks and expeditions." },
  { icon: Shield, title: "Built to Last", desc: "Quality construction designed to inspire." },
];

const testimonials = [
  { name: "Tumelo K.", role: "Safari Lodge Manager", text: "We kitted out the entire guide team — the softshells held up through a full season of game drives. Exceptional quality." },
  { name: "Refilwe M.", role: "HR Director", text: "Our corporate jackets arrived perfectly branded and on time. The team looks sharp." },
  { name: "Bonolo S.", role: "Site Foreman", text: "Reflective workwear that actually fits and lasts. Best hi-vis we've ordered in years." },
];

function Home() {
  const { products, categories } = Route.useLoaderData() as { products: Product[]; categories: Category[] };
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Model wearing a J.D & CO BW safari jacket in the Botswana bush at golden hour" className="h-full w-full object-cover opacity-70" width={1600} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent" />
          </div>
          <div className="container-x relative grid lg:grid-cols-2 gap-12 py-24 sm:py-32 lg:py-40">
            <div className="max-w-xl">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">Live the adventure · Wear the wild</p>
              <h1 className="display text-5xl sm:text-7xl lg:text-8xl text-balance">
                Designed for <br /> the wild. <br />
                <span className="text-primary">Made for</span> the journey.
              </h1>
              <p className="mt-6 text-lg text-secondary-foreground/80 max-w-md">
                Softshell, puffer and leather jackets — crafted for comfort, built for the wild and made for every adventure.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={waLink("Hello J.D & CO BW, I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90 transition">
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Collections</p>
              <h2 className="display text-3xl sm:text-4xl text-secondary mt-2">Shop by category</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex text-sm font-medium text-secondary hover:text-primary">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.slice(0, 8).map((c) => (
              <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group relative aspect-square rounded-lg overflow-hidden bg-secondary text-secondary-foreground flex items-end p-4 hover:bg-primary transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.55_0.09_60/0.4),transparent_60%)]" />
                <h3 className="relative display text-xl sm:text-2xl">{c.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="container-x py-16 sm:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Hand-picked</p>
                <h2 className="display text-3xl sm:text-4xl text-secondary mt-2">Featured products</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        )}

        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="container-x">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Why choose us</p>
              <h2 className="display text-3xl sm:text-5xl mt-2">Built for every condition</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 p-6 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-12 w-12 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="display text-xl">{f.title}</h3>
                    <p className="mt-1 text-sm text-secondary-foreground/70">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-x py-20">
          <div className="relative overflow-hidden rounded-2xl bg-secondary text-secondary-foreground">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 sm:p-14 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Custom & Bulk</p>
                <h2 className="display text-3xl sm:text-5xl mt-3 text-balance">
                  Need custom jackets or staff uniforms for your company?
                </h2>
                <p className="mt-4 text-secondary-foreground/75 max-w-md">
                  We produce branded apparel for corporates, construction crews, firefighters, security teams, restaurants, schools and event staff across Botswana.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/custom-orders" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90">
                    Request a quote <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={waLink("Hello, I would like custom uniforms for my company.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90">
                    <MessageCircle className="h-4 w-4" /> Chat now
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-wider text-secondary-foreground/60">
                  <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-primary" /> Corporate</span>
                  <span className="flex items-center gap-1.5"><HardHat className="h-4 w-4 text-primary" /> Construction</span>
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Security</span>
                </div>
              </div>
              <div className="relative min-h-[300px]">
                <img src={customImg} alt="Workers in branded jackets" loading="lazy" className="absolute inset-0 h-full w-full object-cover" width={1400} height={900} />
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">What clients say</p>
            <h2 className="display text-3xl sm:text-5xl text-secondary mt-2">Trusted by teams that demand quality</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-lg bg-card border border-border">
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-3 text-secondary leading-relaxed">{t.text}</p>
                <div className="mt-5 flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-secondary">{t.name}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16">
          <div className="container-x flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="display text-3xl sm:text-4xl">See something you like?</h2>
              <p className="mt-2 text-primary-foreground/80">Order instantly on WhatsApp — fast, simple, personal.</p>
            </div>
            <a href={waLink("Hello J.D & CO BW, I'd like to place an order.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-secondary-foreground hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Chat with us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
