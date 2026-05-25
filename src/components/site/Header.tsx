import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, LogIn, LayoutDashboard } from "lucide-react";
import logo from "@/assets/logo.png";
import { waLink } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/custom-orders", label: "Custom Orders" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="J.D & CO BW logo" className="h-12 w-12 object-contain" />
          <div className="hidden sm:block leading-tight">
            <div className="display text-xl text-secondary">J.D &amp; CO BW</div>
            <div className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Jacket Manufacturers of Distinction
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium uppercase tracking-wider text-secondary/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink("Hello J.D & CO BW, I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground hover:opacity-90 transition"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <Link
            to={session ? "/admin" : "/login"}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-secondary hover:bg-muted transition"
          >
            {session ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            {session ? "Dashboard" : "Login"}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider text-secondary hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to={session ? "/admin" : "/login"}
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider text-secondary hover:bg-muted flex items-center gap-2"
            >
              {session ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              {session ? "Dashboard" : "Admin Login"}
            </Link>
            <a
              href={waLink("Hello J.D & CO BW, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
