import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { BRAND, waLink } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 object-contain bg-white rounded" />
            <div>
              <div className="display text-xl">{BRAND.name}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-secondary-foreground/60">
                {BRAND.tagline}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-secondary-foreground/70 max-w-xs">
            Premium jackets and custom apparel — designed for the wild, made for the journey.
          </p>
        </div>

        <div>
          <h4 className="display text-lg mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "safari" }} className="hover:text-primary">Safari Collection</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "leather-jackets" }} className="hover:text-primary">Leather Jackets</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "hoodies" }} className="hover:text-primary">Hoodies</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "best-sellers" }} className="hover:text-primary">Best Sellers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="display text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/custom-orders" className="hover:text-primary">Custom Orders</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="display text-lg mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {BRAND.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {BRAND.email}</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {BRAND.location}</li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <a href={waLink("Hello J.D & CO BW!")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-9 w-9 grid place-items-center rounded-full bg-whatsapp text-whatsapp-foreground hover:opacity-90"><MessageCircle className="h-4 w-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-primary"><Instagram className="h-4 w-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-primary"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-secondary-foreground/60 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>
            Corporate · Sport · Safari ·{" "}
            <Link to="/admin" className="hover:text-primary">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
