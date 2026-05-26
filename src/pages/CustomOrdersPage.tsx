import { useState } from "react";
import { MessageCircle, Upload, Building2, HardHat, Shield, Utensils, GraduationCap, Heart, Truck, Calendar, Trophy, Flame } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import customImg from "@/assets/custom-corporate.jpg";
import { waLink } from "@/lib/products";
import { usePageMeta } from "@/hooks/use-page-meta";

const clients = [
  { icon: Building2, label: "Corporate" },
  { icon: HardHat, label: "Construction" },
  { icon: Flame, label: "Firefighters" },
  { icon: Shield, label: "Security" },
  { icon: Utensils, label: "Restaurants & Hotels" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Heart, label: "NGOs" },
  { icon: Truck, label: "Delivery Companies" },
  { icon: Calendar, label: "Event Staff" },
  { icon: Trophy, label: "Sports Teams" },
];

export default function CustomOrdersPage() {
  usePageMeta(
    "Custom Orders & Corporate Uniforms — J.D & CO BW",
    "Branded jackets, uniforms and workwear for companies, construction crews, security, schools and event teams across Botswana.",
  );
  const [form, setForm] = useState({
    company: "", contact: "", phone: "", email: "",
    product: "Company Jackets", quantity: "", colors: "", notes: "",
    fileName: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
`Custom Order Request – J.D & CO BW

Company: ${form.company}
Contact: ${form.contact}
Phone: ${form.phone}
Email: ${form.email}

Product: ${form.product}
Quantity: ${form.quantity}
Preferred colors: ${form.colors}
${form.fileName ? `Attached file: ${form.fileName}` : ""}

Notes: ${form.notes}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img src={customImg} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
          </div>
          <div className="container-x relative py-24 sm:py-32">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Custom · Bulk · Branded</p>
            <h1 className="display text-5xl sm:text-7xl mt-3 max-w-3xl text-balance">
              Custom uniforms & branded apparel
            </h1>
            <p className="mt-5 max-w-xl text-secondary-foreground/80 text-lg">
              We produce jackets, hoodies, workwear and event uniforms with your logo, your colors, your brand — at scale.
            </p>
          </div>
        </section>

        <section className="container-x py-16">
          <h2 className="display text-3xl sm:text-4xl text-secondary mb-8 text-center">Who we serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {clients.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2 p-5 rounded-lg bg-card border border-border hover:border-primary transition">
                <div className="h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-center font-medium text-secondary">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="container-x py-16">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Request a quote</p>
              <h2 className="display text-3xl sm:text-4xl text-secondary mt-3">Tell us what you need</h2>
              <p className="mt-4 text-muted-foreground">
                Fill in the form and we'll send a quote within 24 hours. Prefer to chat?
              </p>
              <a href={waLink("Hello, I would like custom uniforms for my company.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <form onSubmit={onSubmit} className="lg:col-span-3 p-6 sm:p-8 bg-card rounded-lg border border-border grid sm:grid-cols-2 gap-4">
              <Field label="Company name" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
              <Field label="Contact person" required value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} />
              <Field label="Phone number" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <div className="sm:col-span-1">
                <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Product type</label>
                <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-sm">
                  {["Company Jackets","Reflective Safety Jackets","Construction Uniforms","Corporate Uniforms","Hoodies","Branded T-Shirts","Staff Uniforms","Event Clothing","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <Field label="Quantity" required value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} placeholder="e.g. 50" />
              <Field className="sm:col-span-2" label="Preferred colors" value={form.colors} onChange={(v) => setForm({ ...form, colors: v })} placeholder="e.g. Navy + Red trim" />
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Additional instructions</label>
                <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-sm" placeholder="Logo placement, deadlines, size breakdown…" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Upload logo or design reference</label>
                <label className="flex items-center justify-center gap-2 px-3 py-6 rounded-md border-2 border-dashed border-border bg-background text-sm cursor-pointer hover:border-primary">
                  <Upload className="h-4 w-4" />
                  <span>{form.fileName || "Click to upload (PNG, JPG, PDF)"}</span>
                  <input type="file" className="hidden" onChange={(e) => setForm({ ...form, fileName: e.target.files?.[0]?.name || "" })} />
                </label>
              </div>
              <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition">
                <MessageCircle className="h-4 w-4" /> Send request via WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label, value, onChange, required, type = "text", placeholder, className = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; type?: string; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">
        {label}{required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
