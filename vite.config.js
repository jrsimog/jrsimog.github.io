import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = "https://jrsimog.github.io";

// Genera sitemap.xml en cada build leyendo los slugs de posts y proyectos,
// así nunca queda desactualizado al publicar contenido nuevo (#7)
const sitemap = () => ({
  name: "generate-sitemap",
  apply: "build",
  generateBundle() {
    const postsSrc = readFileSync("src/data/posts.js", "utf8");
    const projectsSrc = readFileSync("src/data/projects.js", "utf8");
    const postSlugs = [...postsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map(
      (m) => m[1],
    );
    const projectSlugs = [...projectsSrc.matchAll(/id:\s*"([^"]+)"/g)].map(
      (m) => `/projects/${m[1]}`,
    );
    const routes = ["/", "/blog", ...postSlugs, ...projectSlugs];
    const lastmod = new Date().toISOString().slice(0, 10);
    const urls = routes
      .map(
        (route) =>
          `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
      )
      .join("\n");
    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
});
