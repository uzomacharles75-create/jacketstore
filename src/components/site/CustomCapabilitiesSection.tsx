import { Palette, Scissors, Printer, Sparkles, Leaf, Settings } from "lucide-react";

interface CustomCapabilityProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const CustomCapability = ({ icon: Icon, title, description }: CustomCapabilityProps) => (
  <div className="flex flex-col items-center text-center p-6 bg-secondary/50 rounded-lg hover:bg-secondary/80 transition-colors">
    <Icon className="h-12 w-12 text-primary mb-4" />
    <h3 className="text-lg font-semibold text-secondary mb-2">{title}</h3>
    <p className="text-sm text-secondary/80">{description}</p>
  </div>
);

export function CustomCapabilitiesSection() {
  const capabilities = [
    {
      icon: Palette,
      title: "Custom Colors",
      description: "Choose from our extensive palette or bring your own unique color vision to life."
    },
    {
      icon: Scissors,
      title: "Custom Trims",
      description: "Select from premium trimmings or specify your own to match your brand perfectly."
    },
    {
      icon: Printer,
      title: "Custom Prints",
      description: "Full-color branding, logos, and designs printed with precision and durability."
    },
    {
      icon: Settings,
      title: "Custom Design & Styles",
      description: "Work with us to create unique silhouettes and features tailored to your needs."
    },
    {
      icon: Sparkles,
      title: "Custom Features & Extras",
      description: "Add specialized pockets, zippers, vents, or technical features for your specific use."
    },
    {
      icon: Leaf,
      title: "Custom Fabrics & Materials",
      description: "Premium sustainable and performance fabrics sourced to your exact specifications."
    },
  ];

  return (
    <section className="container-x py-16 sm:py-24">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Our Expertise</p>
        <h2 className="display text-4xl sm:text-5xl text-secondary mb-4">
          Specialized Custom Outerwear
        </h2>
        <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
          At JD & Co. BW, we specialize in creating bespoke outerwear that's tailored to your exact specifications. 
          From concept to completion, every detail is customizable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => (
          <CustomCapability key={idx} {...cap} />
        ))}
      </div>
    </section>
  );
}
