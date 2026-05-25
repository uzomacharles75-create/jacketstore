import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/hero-safari-model.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — J.D & CO BW" },
      { name: "description", content: "J.D & CO BW manufactures premium jackets and corporate apparel in Botswana. Our story, mission and values." },
      { property: "og:title", content: "About J.D & CO BW" },
      { property: "og:description", content: "Jacket manufacturers of distinction — corporate, sport and safari." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Our Story</p>
              <h1 className="display text-5xl sm:text-7xl mt-3">Jacket manufacturers of distinction.</h1>
              <p className="mt-6 text-secondary-foreground/80 leading-relaxed">
                J.D &amp; CO BW is a Botswana-based apparel manufacturer crafting premium jackets for the corporate world, sport and the wild safari. From a single softshell to thousands of branded uniforms, we build garments that perform.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={heroImg} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="container-x py-20 grid md:grid-cols-3 gap-8">
          {[
            { title: "Mission", body: "Equip explorers, professionals and teams with apparel that feels personal and performs without compromise." },
            { title: "Vision", body: "Become the most trusted jacket and uniform manufacturer in Southern Africa — known for craft, service and consistency." },
            { title: "Values", body: "Quality. Reliability. Local craftsmanship. Honest pricing. Real relationships with every client we work with." },
          ].map((v) => (
            <div key={v.title} className="p-8 rounded-lg bg-card border border-border">
              <h2 className="display text-2xl text-primary">{v.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </section>

        <section className="bg-muted py-20">
          <div className="container-x text-center max-w-3xl">
            <h2 className="display text-3xl sm:text-5xl text-secondary">Designed for the wild. Made for the journey.</h2>
            <p className="mt-4 text-muted-foreground">
              Every J.D &amp; CO BW garment is engineered to last through real conditions — game drives at dawn, construction sites at noon, board rooms in the evening.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
