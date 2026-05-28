import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Building2, Compass, Factory, Leaf, MessageCircle, Palette, Quote, Shield, Star, Trophy, Truck } from "lucide-react";
import customImg from "@/assets/custom-corporate.jpg";
import heroSport from "@/assets/industry/sport-club-blue.jpg";
import heroLogistics from "@/assets/industry/logistics-red.jpg";
import heroMining from "@/assets/industry/mining-orange.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { IndustryShowcaseSection } from "@/components/site/IndustryShowcaseSection";
import { OpportunitiesSection } from "@/components/site/OpportunitiesSection";
import { MaterialsAndFeaturesSection } from "@/components/site/MaterialsAndFeaturesSection";
import { waLink } from "@/lib/products";
import { api } from "@/lib/api";
import { usePageMeta } from "@/hooks/use-page-meta";

const focusTags = [
  "Custom",
  "Manufacturers",
  "Corporate",
  "Sport",
  "Safari",
  "Mining",
  "Logistic",
  "Sustainable Fabrics",
];

const pillars = [
  {
    icon: Palette,
    title: "Custom",
    description: "Solid, trim and print concepts tailored to the brief before pricing is finalised.",
  },
  {
    icon: Factory,
    title: "Manufacturers",
    description: "Sampling, repeat production and larger runs handled with a practical manufacturing mindset.",
  },
  {
    icon: Building2,
    title: "Corporate",
    description: "Uniforms and branded apparel that keep staff, leaders and support teams looking aligned.",
  },
  {
    icon: Trophy,
    title: "Sport",
    description: "Club apparel and outerwear that feels energetic on the field and polished off it.",
  },
  {
    icon: Compass,
    title: "Safari",
    description: "Field-ready looks for lodges, guides and outdoor teams that still want a premium finish.",
  },
  {
    icon: Shield,
    title: "Mining",
    description: "Durable concepts for rugged environments, long shifts and safety-first branding.",
  },
  {
    icon: Truck,
    title: "Logistic",
    description: "Reliable layers for delivery, warehouse and transport teams that are always on the move.",
  },
  {
    icon: Leaf,
    title: "Sustainable Fabrics",
    description: "Fabric choices and material direction for clients who want a more responsible option.",
  },
];

const testimonials = [
  { name: "Tumelo K.", role: "Safari Lodge Manager", text: "We kitted out the entire guide team — the softshells held up through a full season of game drives. Exceptional quality." },
  { name: "Refilwe M.", role: "HR Director", text: "Our corporate jackets arrived perfectly branded and on time. The team looks sharp." },
  { name: "Bonolo S.", role: "Site Foreman", text: "Reflective workwear that actually fits and lasts. Best hi-vis we've ordered in years." },
];

function HeroTile({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.5rem] border border-border bg-secondary/5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" width={900} height={900} />
    </div>
  );
}

export default function HomePage() {
  usePageMeta(
    "J.D & CO BW — Premium Jackets & Custom Apparel",
    "Custom apparel for corporate, sport, safari, mining and logistics teams. Solid, trim and print concepts for every sector.",
  );

  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: api.listProducts });
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#f5f1ea] text-secondary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,8,23,0.08),transparent_35%),linear-gradient(135deg,#faf7f1_0%,#eee7da_48%,#fbfbfb_100%)]" />
          <div className="container-x relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-32">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-primary font-semibold mb-4">Custom apparel across industries</p>
              <h1 className="display text-5xl sm:text-7xl lg:text-8xl text-balance text-secondary">
                Built for teams,
                <br />
                <span className="text-primary">not one</span> sector.
              </h1>
              <p className="mt-6 text-lg text-secondary/80 max-w-xl">
                We design jackets, uniforms and branded layers for corporate teams, sport clubs, safari guides, mining sites, logistics crews and sustainable fabric projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/custom-orders"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition"
                >
                  Request a concept <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={waLink("Hello J.D & CO BW, I'd like to discuss a custom apparel concept for my team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90 transition"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
              <p className="mt-5 text-sm text-secondary/65">
                Concepts first. Pricing can be finalised when the design is close.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {focusTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-secondary/70 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[2.5rem] bg-primary/10 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border border-border bg-background/80 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                <HeroTile src={customImg} alt="Custom corporate apparel concept" className="translate-y-0 md:-translate-y-6" />
                <HeroTile src={heroSport} alt="Sport apparel concept" className="translate-y-6 md:translate-y-10" />
                <HeroTile src={heroLogistics} alt="Logistics apparel concept" className="translate-y-0 md:-translate-y-2" />
                <HeroTile src={heroMining} alt="Mining apparel concept" className="translate-y-6 md:translate-y-12" />
                <div className="col-span-2 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-border bg-secondary px-4 py-3 text-secondary-foreground">
                  <span className="text-xs uppercase tracking-[0.28em] text-primary font-semibold">Solid / Trim / Print</span>
                  <span className="text-sm text-secondary-foreground/75">Visual concepts for every sector we serve</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IndustryShowcaseSection />

        <section className="container-x py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">What we build for</p>
              <h2 className="display text-3xl sm:text-4xl text-secondary mt-2">The words visitors need to see first</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.5rem] border border-border bg-card p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                <div className="h-12 w-12 grid place-items-center rounded-full bg-primary/10 text-primary">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-secondary">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary/70">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="container-x py-16 sm:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Ready to order</p>
                <h2 className="display text-3xl sm:text-4xl text-secondary mt-2">Featured products</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        )}

        <OpportunitiesSection />

        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="container-x">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Why teams choose us</p>
              <h2 className="display text-3xl sm:text-5xl mt-2">Built around quality, speed and consistency</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "We keep the design process visual, so clients can see the direction before we close pricing.",
                "We move between corporate, sport, safari, mining and logistics briefs without losing consistency.",
                "We can shape each concept around solid, trim and print samples to make the idea easy to approve.",
              ].map((text) => (
                <div key={text} className="flex gap-4 p-6 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-12 w-12 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed text-secondary-foreground/80">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MaterialsAndFeaturesSection />

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
              <h2 className="display text-3xl sm:text-4xl">Have a concept in mind?</h2>
              <p className="mt-2 text-primary-foreground/80">Send us the idea, the sector and the look you want. We&apos;ll help shape it.</p>
            </div>
            <a
              href={waLink("Hello J.D & CO BW, I'd like to place an order for custom apparel.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-secondary-foreground hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Chat with us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
