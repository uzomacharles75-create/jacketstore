import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain Vite + React SPA. Optimized for local development in VS Code.
// Run with: npm install && npm run dev  →  http://localhost:5173
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
});
