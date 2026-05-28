import { Leaf, Sparkles, Palette, Settings } from "lucide-react";

interface MaterialOptionProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const MaterialOption = ({ icon: Icon, title, description }: MaterialOptionProps) => (
  <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/50 transition-colors">
    <Icon className="h-10 w-10 text-primary mb-3" />
    <h4 className="font-semibold text-secondary mb-2">{title}</h4>
    <p className="text-sm text-secondary/75">{description}</p>
  </div>
);

export function MaterialsAndFeaturesSection() {
  const materials = [
    {
      icon: Leaf,
      title: "Sustainable Fabrics",
      description: "Eco-friendly material options that still hold up in real-world use."
    },
    {
      icon: Sparkles,
      title: "Custom Fabrics",
      description: "Source your own premium materials or choose from our curated fabric selection."
    },
    {
      icon: Palette,
      title: "Custom Design & Styles",
      description: "Collaborate with our design team to create unique silhouettes and profiles."
    },
    {
      icon: Settings,
      title: "Custom Features & Extras",
      description: "Technical enhancements including reflective elements, waterproofing, and specialized pockets."
    },
  ];

  return (
    <section className="container-x py-16 sm:py-24">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Quality First</p>
        <h2 className="display text-4xl sm:text-5xl text-secondary mb-4">Premium materials & finishing</h2>
        <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
          We source sustainable and performance fabrics, then shape them into materials, trims and features that fit the brief.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((item, idx) => (
          <MaterialOption key={idx} {...item} />
        ))}
      </div>

      <div className="mt-12 p-8 rounded-lg bg-secondary/5 border border-secondary/20">
        <h3 className="text-2xl font-bold text-secondary mb-4">Why clients work with us</h3>
        <ul className="space-y-3 text-secondary/80">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-1">✓</span>
            <span>Complete customization from concept to final product</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-1">✓</span>
            <span>Access to premium sustainable and performance fabrics</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-1">✓</span>
            <span>Expert design consultation and technical support</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-1">✓</span>
            <span>Quality craftsmanship built to last</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
