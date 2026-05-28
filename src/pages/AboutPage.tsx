import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/custom-corporate.jpg";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function AboutPage() {
  usePageMeta(
    "About — J.D & CO BW",
    "J.D & CO BW manufactures premium jackets and custom apparel in Botswana. Our story, mission and values.",
  );
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Our Story</p>
              <h1 className="display text-5xl sm:text-7xl mt-3">Jacket manufacturers for every sector.</h1>
              <p className="mt-6 text-secondary-foreground/80 leading-relaxed">
                J.D &amp; CO BW is a Botswana-based apparel manufacturer crafting premium jackets and uniforms for corporate teams, sport clubs, safari lodges, mining crews and logistics operators. From a single concept to thousands of branded garments, we build apparel that performs.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={heroImg} alt="Custom corporate apparel concept" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="container-x py-20 grid md:grid-cols-3 gap-8">
          {[
            { title: "Mission", body: "Equip teams and partners with apparel that feels personal and performs without compromise." },
            { title: "Vision", body: "Become the most trusted jacket and uniform manufacturer in Southern Africa, known for craft, service and consistency." },
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
            <h2 className="display text-3xl sm:text-5xl text-secondary">Built for teams, the field and the worksite.</h2>
            <p className="mt-4 text-muted-foreground">
              Every J.D &amp; CO BW garment is engineered to last through real conditions — boardrooms, club grounds, lodge decks, work sites and long road days.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
