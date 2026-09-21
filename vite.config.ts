import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { rsvpApiPlugin } from "./server/rsvpPlugin.ts";

function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    closeBundle() {
      const index = resolve("dist/index.html");
      if (existsSync(index)) copyFileSync(index, resolve("dist/404.html"));
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/casakate2027/" : "/",
  plugins: [react(), rsvpApiPlugin(process.cwd()), githubPagesSpaFallback()],
  server: {
    watch: { usePolling: true, interval: 300 },
  },
});
