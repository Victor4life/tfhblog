import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/tfhblog/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  css: {
    postcss: true,
  },
});
