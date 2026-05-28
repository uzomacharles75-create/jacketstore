import { GraduationCap, Handshake, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { waLink } from "@/lib/products";

const opportunities = [
  {
    icon: Handshake,
    title: "Sales partnerships and collaborations",
    description:
      "We are open to retail partners, resellers, distributors and co-branded projects that help us reach more teams.",
  },
  {
    icon: GraduationCap,
    title: "Training and skills development",
    description:
      "From product knowledge to garment sampling, we welcome training relationships that build people and process.",
  },
  {
    icon: TrendingUp,
    title: "Investment",
    description:
      "Strategic investment can help us scale production, refine the range and unlock more opportunities across the region.",
  },
];

export function OpportunitiesSection() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Opportunities with us</p>
          <h2 className="display text-4xl sm:text-5xl text-secondary mt-2 text-balance">
            Let&apos;s build beyond a single order
          </h2>
          <p className="mt-4 text-lg text-secondary/75 max-w-xl">
            If you are looking for a sales relationship, skills transfer or long-term growth, we are open to the right conversation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
            >
              Start a conversation
            </Link>
            <a
              href={waLink("Hello J.D & CO BW, I would like to discuss an opportunity with you.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {opportunities.map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary grid place-items-center">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-secondary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary/70">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
