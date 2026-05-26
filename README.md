# J.D & CO BW — Storefront UI

Plain **Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui** SPA.
Frontend only — wire your own MongoDB / Express backend in `src/lib/api.ts`.

## Run locally (VS Code)

```bash
npm install
npm run dev
```

Opens at <http://localhost:5173>. Hot reload works out of the box.

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # serve dist/ locally
```

## Project layout

```
src/
  pages/          ← one file per route (HomePage, ShopPage, AdminPage, …)
  components/
    site/         ← Header, Footer, ProductCard, RequireAdmin
    ui/           ← shadcn/ui primitives (button, dialog, table, …)
  lib/
    api.ts        ← ★ REPLACE WITH YOUR MONGO/EXPRESS CALLS
    auth.ts      ← ★ Mock localStorage auth — replace with real JWT
    products.ts   ← Brand info, types, image fallbacks
    format.ts     ← Pula price formatter
  mocks/
    data.ts       ← Seed products / categories / orders (dev only)
  hooks/
    use-page-meta.ts  ← document.title / meta description helper
  assets/         ← Product images, logo, hero
```

## Routes

| Path                | Page                | Notes |
| ------------------- | ------------------- | ----- |
| `/`                 | Home                | Hero, featured products, categories |
| `/shop`             | Shop                | Search + filter + sort |
| `/product/:slug`    | Product detail      | WhatsApp order CTA |
| `/category/:slug`   | Category            | Filtered product grid |
| `/about`            | About               | |
| `/contact`          | Contact             | WhatsApp message form |
| `/custom-orders`    | Custom orders quote | WhatsApp submit |
| `/login`            | Admin login         | **Mock — any email/password works** |
| `/admin`            | Admin dashboard     | Products, categories, homepage, custom orders |

## Wiring your backend

1. **Data layer** — open `src/lib/api.ts` and replace each function body
   with a `fetch()` call to your Express API. Keep the function signatures
   the same and every page keeps working.

   ```ts
   const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
   listProducts: async () => {
     const r = await fetch(`${BASE}/api/products`);
     if (!r.ok) throw new Error("Failed to load products");
     return r.json();
   }
   ```

2. **Auth** — open `src/lib/auth.ts`. Replace `login()` with a real POST
   to `/auth/login` that returns a JWT, then store it the same way. Admin
   routes check `isAuthenticated()` via `src/components/site/RequireAdmin.tsx`.

3. **Env vars** — create `.env.local`:

   ```
   VITE_API_URL=http://localhost:4000
   ```

4. **Image uploads** — currently the admin form takes an image URL only.
   For file uploads, POST a `FormData` to your backend (S3/GridFS) and
   write the returned URL into the product.

## Tech stack

- Vite 7 + React 19
- React Router v7 (SPA mode)
- TanStack Query (data fetching cache)
- Tailwind CSS v4 + shadcn/ui
- Lucide icons, Sonner toasts

No SSR, no edge runtime, no vendor lock-in.
