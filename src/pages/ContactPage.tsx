import { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BRAND, waLink } from "@/lib/products";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function ContactPage() {
  usePageMeta("Contact — J.D & CO BW", "Get in touch with J.D & CO BW. WhatsApp, email or visit us in Gaborone, Botswana.");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello J.D & CO BW,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="container-x">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Get in touch</p>
            <h1 className="display text-5xl sm:text-7xl mt-3">Let's talk.</h1>
            <p className="mt-4 max-w-xl text-secondary-foreground/80">Questions, orders or custom uniforms — we usually reply within an hour on WhatsApp.</p>
          </div>
        </section>

        <section className="container-x py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="space-y-5">
              <Info icon={Phone} label="Phone" value={BRAND.phone} />
              <Info icon={Mail} label="Email" value={BRAND.email} />
              <Info icon={MapPin} label="Location" value={BRAND.location} />
            </div>
            <a href={waLink("Hello J.D & CO BW!")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-whatsapp-foreground hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
            </a>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary"><Instagram className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 sm:p-8 bg-card rounded-lg border border-border space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Message *</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-sm" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition">
              Send message
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-secondary font-medium">{value}</div>
      </div>
    </div>
  );
}
