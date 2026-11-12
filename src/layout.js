const { site, nav, services } = require("./data");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ico = (id, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const tick = `<i class="tick"><svg viewBox="0 0 12 12"><path d="m2.500 6.500 2.300 2.300 4.700-5.300"/></svg></i>`;

// Link helpers. Production uses clean absolute URLs; preview uses relative .html files.
function helpers(ctx) {
  const pre = ctx.preview ? "../".repeat(ctx.depth) : "/";
  const link = (path = "") => {
    const [p, hash] = path.split("#");
    const h = hash ? "#" + hash : "";
    if (ctx.preview) return pre + (p || "index") + ".html" + h;
    return "/" + p + h;
  };
  const asset = (f) => pre + "assets/" + f;
  return { link, asset };
}

const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12b76a" stop-opacity=".28"/><stop offset="1" stop-color="#12b76a" stop-opacity="0"/></linearGradient>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.600-3.600"/></symbol>
<symbol id="i-link" viewBox="0 0 24 24"><path d="M10 14a4.500 4.500 0 0 0 6.400 0l3-3a4.500 4.500 0 0 0-6.400-6.400l-1.200 1.200"/><path d="M14 10a4.500 4.500 0 0 0-6.400 0l-3 3a4.500 4.500 0 0 0 6.400 6.400l1.200-1.200"/></symbol>
<symbol id="i-doc" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h3"/></symbol>
<symbol id="i-file" viewBox="0 0 24 24"><path d="M7 3h7l5 5v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/><path d="M14 3v5h5M8.500 14.500l2 2 4-4"/></symbol>
<symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13 7 4 4"/></symbol>
<symbol id="i-pen" viewBox="0 0 24 24"><path d="M4 20l1.500-5L16 4.500a2.100 2.100 0 0 1 3 3L8.500 18 4 20Z"/><path d="M13 20h7"/></symbol>
<symbol id="i-mega" viewBox="0 0 24 24"><path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Z"/><path d="M16 9a4 4 0 0 1 0 6M19 6.500a8 8 0 0 1 0 11"/></symbol>
<symbol id="i-bars" viewBox="0 0 24 24"><path d="M5 20v-6M12 20V9M19 20V4"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.200 3 14.800 0 18M12 3c-3 3.200-3 14.800 0 18"/></symbol>
<symbol id="i-cal" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4"/></symbol>
<symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.500"/><path d="M2.500 20a6.500 6.500 0 0 1 13 0M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.500a6.500 6.500 0 0 1 3.500 5.500"/></symbol>
<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.500 20.500a7.500 7.500 0 0 1 15 0"/></symbol>
<symbol id="i-trend" viewBox="0 0 24 24"><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-send" viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></symbol>
<symbol id="i-route" viewBox="0 0 24 24"><circle cx="6" cy="18" r="2.500"/><circle cx="18" cy="6" r="2.500"/><path d="M8.500 18H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.500"/></symbol>
<symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.300-1 .9-1 1.700M12 17v.2"/></symbol>
<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3Z"/><path d="M19 16l.7 1.800 1.800.7-1.800.7L19 21l-.7-1.800-1.800-.7 1.800-.7L19 16Z"/></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M8 10h8M8 13h5"/></symbol>
<symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l3 3M14 9l2 2"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.500-3 8.500-7 10-4-1.500-7-5.500-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.200 7-11.500a7 7 0 0 0-14 0C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.500" r="2.500"/></symbol>
<symbol id="i-code" viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14"/></symbol>
<symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2.500l2.200 11h10.600L20.500 7H7"/><circle cx="9" cy="19" r="1.500"/><circle cx="17" cy="19" r="1.500"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/></symbol>
<symbol id="i-home" viewBox="0 0 24 24"><path d="M4 11.500 12 4l8 7.500V19a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-7.500Z"/></symbol>
<symbol id="i-mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/></symbol>
<symbol id="i-scan" viewBox="0 0 24 24"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3.500"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
</defs></svg>`;

function searchItems(link, posts) {
  const items = [];
  services.forEach((g) => g.items.forEach((s) => items.push([s.long ? `${s.name} (${s.long})` : s.name, "Service", link("services#" + g.id), s.icon])));
  items.push(["Case studies and results", "Portfolio", link("case-studies"), "i-trend"]);
  items.push(["About Bilal Rasheed", "About", link("about"), "i-user"]);
  items.push(["How a campaign runs", "Process", link("services#process"), "i-route"]);
  posts.forEach((p) => items.push([p.title, "Blog", link("blog/" + p.slug), "i-pen"]));
  items.push(["Pricing and quotes", "Contact", link("contact"), "i-mail"]);
  items.push(["Hire Bilal / get in touch", "Contact", link("contact"), "i-mail"]);
  return items;
}

function page(ctx, { title, description, path, active, body, type = "website", extraHead = "" }) {
  const { link, asset } = helpers(ctx);
  const full = title ? `${title} | ${site.name}` : `${site.name}, ${site.tagline}`;
  const canonical = site.domain + "/" + path;
  const robots = site.indexable ? "" : `<meta name="robots" content="noindex, nofollow">\n`;
  const items = searchItems(link, ctx.posts);
  const navHtml = nav.map((n) => `<a href="${link(n.href)}" class="t-${n.tone}${active === n.href ? " on" : ""}"${active === n.href ? ' aria-current="page"' : ""}><i>${ico(n.icon)}</i>${n.label}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
${robots}<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.domain}/assets/bilal.webp">
<link rel="icon" href="${asset("favicon.png")}" type="image/png">
<script>if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.className="js";addEventListener("load",function(){setTimeout(function(){if(!window.__rv)document.documentElement.className=""},2000)})}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset("site.css")}">
${extraHead}</head>
<body>
${sprite}
<div class="field" aria-hidden="true"><i></i><i></i><i></i></div>
<header class="top" id="top-bar">
  <div class="wrap">
    <div class="bar">
      <a class="logo" href="${link("")}" aria-label="${site.name} home"><img src="${asset("logo.webp")}" alt="${site.name}" width="720" height="136"></a>
      <div class="search" role="search">
        <div class="search-box">
          ${ico("i-search")}
          <input id="site-search" type="text" autocomplete="off" spellcheck="false" aria-label="Search this site" placeholder="Bilal Rasheed, SEO Specialist" aria-controls="sugg" aria-expanded="false">
          <button class="s-btn s-clear" id="search-clear" type="button" aria-label="Clear search" hidden>${ico("i-x")}</button>
          <span class="s-div" aria-hidden="true"></span>
          <button class="s-btn" id="search-mic" type="button" aria-label="Search by voice" title="Search by voice">${ico("i-mic")}</button>
          <a class="s-btn" id="search-scan" href="${link("#audit")}" aria-label="Scan my website" title="Scan my website">${ico("i-scan")}</a>
        </div>
        <div class="sugg" id="sugg" role="listbox"></div>
      </div>
      <a class="btn btn-p bar-cta" href="${link("contact")}">${ico("i-send")}<span>Get in touch</span></a>
    </div>
    <div class="nav-wrap"><nav class="nav" id="nav" aria-label="Main"><b class="nav-glow" id="nav-glow"></b>${navHtml}</nav></div>
  </div>
  <i class="progress" id="progress"></i>
</header>
<main>
${body}
</main>
<footer>
  <div class="wrap foot">
    <div class="foot-brand">
      <a class="logo logo-chip" href="${link("")}"><img src="${asset("logo.webp")}" alt="${site.name}" width="720" height="136" loading="lazy"></a>
      <p>SEO, link building and authority growth for brands that want to be found.</p>
    </div>
    <nav aria-label="Footer">${nav.map((n) => `<a href="${link(n.href)}">${n.label}</a>`).join("")}</nav>
    <a class="foot-mail" href="${link("contact")}">${ico("i-mail")}${site.email}</a>
  </div>
  <div class="wrap foot-base"><small>© ${new Date().getFullYear()} BilalRasheed.com. All rights reserved.</small><small>SEO · GEO · AEO · Link Building · Digital PR</small></div>
</footer>
<script>window.SITE=${JSON.stringify({ items, formKey: site.formKey, email: site.email }).replace(/</g, "\\u003c")};</script>
<script src="${asset("site.js")}" defer></script>
</body>
</html>
`;
}

module.exports = { page, helpers, esc, ico, tick };
