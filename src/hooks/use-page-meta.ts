import { useEffect } from "react";

// Lightweight client-side document title/meta setter. Replace with
// react-helmet-async if you need SSR-friendly metadata later.
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
    return () => { document.title = prev; };
  }, [title, description]);
}
