import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = "https://jrsimog.github.io";
const SITE_NAME = "José Ramón Simó";

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const collectRoutes = () => {
  const postsSrc = readFileSync("src/data/posts.js", "utf8");
  const projectsSrc = readFileSync("src/data/projects.js", "utf8");

  const posts = [
    ...postsSrc.matchAll(
      /slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?description:\s*\n?\s*"([^"]+)",/g,
    ),
  ].map(([, slug, title, description]) => ({
    path: slug,
    title: `${title} — ${SITE_NAME}`,
    description,
  }));

  const projects = [
    ...projectsSrc.matchAll(
      /id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?description_es:\s*\n?\s*"([^"]+)",/g,
    ),
  ].map(([, id, name, description]) => ({
    path: `/projects/${id}`,
    title: `${name} — ${SITE_NAME}`,
    description,
  }));

  return [
    { path: "/" },
    {
      path: "/blog",
      title: `Blog — ${SITE_NAME}`,
      description:
        "Píldoras rápidas y playgrounds interactivos sobre desarrollo de software.",
    },
    ...posts,
    ...projects,
  ];
};

const applyMeta = (html, route) => {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const url = `${SITE_URL}${route.path}`;

  return html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      (_, pre, post) => `${pre}${description}${post}`,
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      (_, pre, post) => `${pre}${url}${post}`,
    )
    .replace(
      /(<meta property="(?:og|twitter):title" content=")[^"]*(")/g,
      (_, pre, post) => `${pre}${title}${post}`,
    )
    .replace(
      /(<meta property="(?:og|twitter):description" content=")[^"]*(")/g,
      (_, pre, post) => `${pre}${description}${post}`,
    )
    .replace(
      /(<meta property="(?:og|twitter):url" content=")[^"]*(")/g,
      (_, pre, post) => `${pre}${url}${post}`,
    );
};

const seoPages = () => {
  let routes = [];
  return {
    name: "seo-pages",
    apply: "build",
    generateBundle() {
      routes = collectRoutes();
      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = routes
        .map(
          (route) =>
            `  <url>\n    <loc>${SITE_URL}${route.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
        )
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
    writeBundle() {
      const template = readFileSync("dist/index.html", "utf8");
      routes
        .filter((route) => route.path !== "/")
        .forEach((route) => {
          const dir = resolve("dist", `.${route.path}`);
          mkdirSync(dir, { recursive: true });
          writeFileSync(resolve(dir, "index.html"), applyMeta(template, route));
        });
    },
  };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
});
