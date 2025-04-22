import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  css: {
    postcss: true,
  },
  optimizeDeps: {
    exclude: [
      // Add the problematic dependencies here
    ],
  },
});
