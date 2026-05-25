import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { type Product, waLink } from "@/lib/products";
import { formatPula } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col bg-card rounded-lg overflow-hidden border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.bestSeller && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">Best Seller</span>
        )}
        {product.newArrival && !product.bestSeller && (
          <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">New</span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-muted-foreground text-background text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">Sold out</span>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <Link to="/product/$slug" params={{ slug: product.slug }} className="block mt-1">
            <h3 className="text-base font-semibold text-secondary hover:text-primary transition-colors leading-tight">{product.name}</h3>
          </Link>
          <p className="mt-2 text-lg font-bold text-secondary">{formatPula(product.price)}</p>
        </div>
        {product.inStock ? (
          <a
            href={waLink(`Hello, I want to order: ${product.name} (${formatPula(product.price)}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-3 py-2.5 text-sm font-semibold text-whatsapp-foreground hover:opacity-90 transition"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
        ) : (
          <button disabled className="inline-flex items-center justify-center gap-2 rounded-md bg-muted px-3 py-2.5 text-sm font-semibold text-muted-foreground cursor-not-allowed">
            Currently unavailable
          </button>
        )}
      </div>
    </div>
  );
}
