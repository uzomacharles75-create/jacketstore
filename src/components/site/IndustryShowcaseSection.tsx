import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/products";
import productSoftshell from "@/assets/product-softshell.jpg";
import productPuffer from "@/assets/product-puffer.jpg";
import corporate from "@/assets/custom-corporate.jpg";
import sportWhite from "@/assets/industry/sport-club-white.jpg";
import sportBlue from "@/assets/industry/sport-club-blue.jpg";
import sportBlack from "@/assets/industry/sport-club-black.jpg";
import logisticsRed from "@/assets/industry/logistics-red.jpg";
import logisticsYellow from "@/assets/industry/logistics-yellow.jpg";
import logisticsOrange from "@/assets/industry/logistics-orange.jpg";
import miningOrange from "@/assets/industry/mining-orange.jpg";
import miningBlack from "@/assets/industry/mining-black.jpg";
import miningDark from "@/assets/industry/mining-dark.jpg";
import safariOliveOne from "@/assets/industry/safari-olive-1.jpg";
import safariOliveTwo from "@/assets/industry/safari-olive-2.jpg";
import safariSand from "@/assets/industry/safari-sand.jpg";

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

const sectorBoards = [
  {
    title: "Corporate",
    subtitle: "Solid, trim and print ideas for office and field teams.",
    summary:
      "Professional uniform concepts for companies that want a consistent brand across leadership, frontline and support staff.",
    images: [corporate, productSoftshell, productPuffer],
    badge: "Custom / Manufacturers / Corporate",
    bullets: ["Polished uniforms with brand consistency", "Good for sampling before pricing", "Designed to scale from small to bulk runs"],
    cta: "Request a corporate concept",
    message: "Hello, I need a corporate custom apparel concept.",
  },
  {
    title: "Sport",
    subtitle: "Club kits that feel dynamic on and off the field.",
    summary:
      "High-impact sport outerwear for clubs, academies and community teams that want identity, movement and durability.",
    images: [sportWhite, sportBlue, sportBlack],
    badge: "Sport / Solid / Print",
    bullets: ["Great for club logos and sponsor branding", "Flexible fits for active wear", "Built for training, travel and match day"],
    cta: "Request a sport concept",
    message: "Hello, I need a sport custom apparel concept.",
  },
  {
    title: "Logistic",
    subtitle: "Visibility, warmth and hard-working layers.",
    summary:
      "Outerwear for delivery crews, drivers and warehouse teams that need comfort, visibility and strong brand presence.",
    images: [logisticsRed, logisticsYellow, logisticsOrange],
    badge: "Logistic / Trim / Print",
    bullets: ["Made for movement and long shifts", "High-visibility looks for the road and yard", "Works well for seasonal and repeat orders"],
    cta: "Request a logistics concept",
    message: "Hello, I need a logistics custom apparel concept.",
  },
  {
    title: "Mining",
    subtitle: "Heavy-duty visual concepts for harsh environments.",
    summary:
      "Durable jackets and insulation ideas for mining teams, technical crews and industrial sites where performance matters most.",
    images: [miningOrange, miningBlack, miningDark],
    badge: "Mining / Solid / Trim",
    bullets: ["Built for rugged conditions and long shifts", "Reflective and safety-led options", "Strong enough for worksite branding"],
    cta: "Request a mining concept",
    message: "Hello, I need a mining custom apparel concept.",
  },
  {
    title: "Safari",
    subtitle: "Field-ready looks with a premium outdoor feel.",
    summary:
      "Safari concepts for lodges, guides and outdoor teams that still want a clean, modern branded finish.",
    images: [safariOliveOne, safariOliveTwo, safariSand],
    badge: "Safari / Print / Sustainable Fabrics",
    bullets: ["Perfect for lodge and guide uniforms", "Balanced colours with brand-led finishes", "Easy to adapt for solid, trim or print samples"],
    cta: "Request a safari concept",
    message: "Hello, I need a safari custom apparel concept.",
  },
];

function SampleChip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-secondary/70">
      {children}
    </span>
  );
}

function SectorBoard({
  title,
  subtitle,
  summary,
  images,
  badge,
  bullets,
  cta,
  message,
  reverse = false,
}: (typeof sectorBoards)[number] & { reverse?: boolean }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="grid lg:grid-cols-[0.98fr_1.02fr]">
        <div className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${reverse ? "lg:order-2" : ""}`}>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{badge}</p>
            <h3 className="display text-3xl sm:text-4xl text-secondary mt-2">{title}</h3>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">{subtitle}</p>
            <p className="mt-5 text-secondary/75 leading-relaxed">{summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <SampleChip>Solid</SampleChip>
              <SampleChip>Trim</SampleChip>
              <SampleChip>Print</SampleChip>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-secondary/75">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/custom-orders"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
            >
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className={`relative bg-secondary/5 ${reverse ? "lg:order-1" : ""}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
          <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-4 lg:p-5">
            <div className="row-span-2 overflow-hidden rounded-[1.5rem] min-h-[320px]">
              <img src={images[0]} alt={`${title} custom apparel concept`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] min-h-[154px]">
              <img src={images[1]} alt={`${title} trim sample`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] min-h-[154px]">
              <img src={images[2]} alt={`${title} print sample`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
          <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/90 backdrop-blur">
            Sample board
          </div>
        </div>
      </div>
    </article>
  );
}

export function IndustryShowcaseSection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Visual proof</p>
          <h2 className="display text-4xl sm:text-5xl text-secondary mt-2 text-balance">
            Custom apparel ideas for every sector we serve
          </h2>
          <p className="mt-4 text-lg text-secondary/75 max-w-2xl">
            Solid, trim and print sample boards help clients picture the end result before we close pricing and production.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {focusTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-secondary/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        {sectorBoards.map((board, index) => (
          <SectorBoard key={board.title} {...board} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
