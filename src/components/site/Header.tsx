import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { waLink } from "@/lib/products";
import { isAuthenticated, logout, onAuthChange } from "@/lib/auth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/custom-orders", label: "Custom Orders" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(isAuthenticated());
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => onAuthChange(() => setAuthed(isAuthenticated())), []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="J.D & CO BW logo" className="h-12 w-12 object-contain" />
          <div className="hidden sm:block leading-tight">
            <div className="display text-xl text-secondary">J.D &amp; CO BW</div>
            <div className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Custom Apparel for Every Sector
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors ${
                pathname === n.to ? "text-primary" : "text-secondary/80"
              }`}
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
          {authed ? (
            <>
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-secondary hover:bg-muted transition"
              >
                <LayoutDashboard className="h-4 w-4" /> Admin
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-secondary hover:bg-muted transition"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-secondary hover:bg-muted transition"
            >
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
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
              to={authed ? "/admin" : "/login"}
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-md text-base font-medium uppercase tracking-wider text-secondary hover:bg-muted flex items-center gap-2"
            >
              {authed ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              {authed ? "Admin Dashboard" : "Admin Login"}
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
