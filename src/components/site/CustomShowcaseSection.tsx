import { Card } from "@/components/ui/card";

interface ShowcaseItemProps {
  title: string;
  description: string;
  bgColor: string;
  icon: string;
}

const ShowcaseItem = ({ title, description, bgColor, icon }: ShowcaseItemProps) => (
  <Card className={`${bgColor} p-8 flex flex-col items-center justify-center text-center min-h-[280px] hover:shadow-lg transition-shadow`}>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/90 text-sm max-w-xs">{description}</p>
  </Card>
);

export function CustomShowcaseSection() {
  const showcases = [
    {
      title: "Solid Colors",
      description: "Premium solid color options for clean, professional looks",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
      icon: "🎨"
    },
    {
      title: "Custom Trims",
      description: "Precision trim work with your choice of materials and colors",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
      icon: "✂️"
    },
    {
      title: "Custom Prints",
      description: "Vibrant, durable prints and branding on any surface",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      icon: "🖨️"
    },
  ];

  return (
    <section className="container-x py-16 sm:py-24 bg-background">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Showcase</p>
        <h2 className="display text-4xl sm:text-5xl text-secondary mb-4">
          Custom Forms & Finishes
        </h2>
        <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
          Explore the range of customization options available for your outerwear projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {showcases.map((item, idx) => (
          <ShowcaseItem key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
