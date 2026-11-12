// Builds the site into /dist. Run: npm run build   (preview with relative links: npm run preview)
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const { site } = require("./src/data");
const { page } = require("./src/layout");
const pages = require("./src/pages");

const preview = process.env.PREVIEW === "1";
const out = path.join(__dirname, "dist");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "blog"), { recursive: true });
fs.cpSync(path.join(__dirname, "assets"), path.join(out, "assets"), { recursive: true });

// Blog posts: posts/<slug>.md with a small front-matter block.
const postsDir = path.join(__dirname, "posts");
const posts = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md")).map((f) => {
  const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`posts/${f} is missing its front matter block`);
  const meta = {};
  m[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  });
  for (const k of ["title", "description", "date"]) if (!meta[k]) throw new Error(`posts/${f} needs "${k}" in its front matter`);
  if (meta.draft === "true") return null;
  const words = m[2].split(/\s+/).filter(Boolean).length;
  return { ...meta, slug: f.replace(/\.md$/, ""), html: marked.parse(m[2]), minutes: Math.max(1, Math.round(words / 220)) };
}).filter(Boolean).sort((a, b) => (a.date < b.date ? 1 : -1));

const write = (depth, def) => {
  const ctx = { preview, depth, posts };
  const p = typeof def === "function" ? def(ctx) : def;
  fs.writeFileSync(path.join(out, p.file), page(ctx, p));
  return p;
};

const built = [pages.home, pages.services, pages.cases, pages.about, pages.blog, pages.contact].map((fn) => write(0, fn));
write(0, pages.notFound);
posts.forEach((post) => built.push(write(1, (ctx) => pages.post(ctx, post))));

// robots.txt must NOT block crawling while noindex is on: Google has to fetch a page to see the tag.
fs.writeFileSync(path.join(out, "robots.txt"), site.indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n` : "User-agent: *\nAllow: /\n");
if (site.indexable) {
  const urls = built.map((p) => `  <url><loc>${site.domain}/${p.path}</loc></url>`).join("\n");
  fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
console.log(`Built ${built.length + 1} pages (${posts.length} posts)${preview ? " in preview mode" : ""}. Indexable: ${site.indexable}`);
