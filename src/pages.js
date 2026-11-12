const d = require("./data");
const { helpers, esc, ico, tick } = require("./layout");

const head = (h2, p = "", more = "") => `<div class="sec-head rv"><div><h2>${h2}</h2>${p ? `<p>${p}</p>` : ""}</div>${more}</div>`;
const more = (href, label) => `<a class="more" href="${href}">${label}${ico("i-arrow")}</a>`;

const crumb = (trail) => `<p class="crumb rv"><span>bilalrasheed.com</span>${trail.map((t) => `<b>›</b><span>${t}</span>`).join("")}</p>`;
const pageHero = (trail, h1, lede) => `<section class="page-hero"><div class="wrap">${crumb(trail)}<h1 class="rv" style="--i:1">${h1}</h1><p class="lede rv" style="--i:2">${lede}</p></div></section>`;

const serviceCard = (s, tone, i, href) => `<article class="card service tilt rv t-${tone}" style="--i:${i % 3}"><span class="tile3d">${ico(s.icon)}</span><h3>${s.name}${s.long ? `<small>${s.long}</small>` : ""}</h3><p>${s.text}</p>${href ? `<a href="${href}">Learn more${ico("i-arrow")}</a>` : ""}</article>`;

const caseCard = (c, i) => `<article class="card case tilt rv" style="--i:${i % 3}">
  <div class="case-top"><div><span class="tag">${c.tag}</span><h3>${c.name}</h3><p>${c.text}</p></div><span class="tag sample">Sample</span></div>
  <svg class="spark" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><path class="a" d="${c.path} V64 H0Z"/><path class="l" d="${c.path}"/></svg>
  <div class="kpis">${c.kpis.map((k) => `<div><strong${k[2] ? ' class="up"' : ""}>${k[0]}</strong><span>${k[1]}</span></div>`).join("")}</div>
</article>`;

const fmtDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const postCard = (p, i, link) => `<a class="card post tilt rv" style="--i:${i % 3}" href="${link("blog/" + p.slug)}">
  <div class="post-art t-${["blue", "violet", "green", "red"][i % 4]}"><span class="tile3d">${ico(p.icon || "i-pen")}</span><em>${esc(p.category || "SEO")}</em></div>
  <div class="post-body"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><small>${fmtDate(p.date)} · ${p.minutes} min read</small></div>
</a>`;

const faq = (list) => `<div class="faq">${list.map((f, i) => `<details class="rv"${i === 0 ? " open" : ""}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}</div>`;
const faqSchema = (list) => `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: list.map((f) => ({ "@type": "Question", name: f[0], acceptedAnswer: { "@type": "Answer", text: f[1] } })) })}</script>\n`;

const cta = (link) => `<section class="sec"><div class="wrap"><div class="band rv">
  <span class="band-ico">${ico("i-mail")}</span>
  <div><h2>Let's grow your website <span class="hl">together</span></h2><p>Need a reliable SEO expert for link building, digital PR or authority growth? Tell me about your site.</p></div>
  <div class="band-act"><span class="mail-pill">${ico("i-mail")}${d.site.email}</span><a class="btn btn-p" href="${link("contact")}">Get in touch${ico("i-arrow")}</a></div>
</div></div></section>`;

const form = () => `<form class="form" id="form" novalidate>
  <label>Your name<input id="f-name" name="name" type="text" autocomplete="name" required></label>
  <label>Email<input id="f-email" name="email" type="email" autocomplete="email" required></label>
  <label>Website<input id="f-site" name="website" type="text" inputmode="url" placeholder="example.com"></label>
  <label>Service<select id="f-service" name="service">${["SEO", "GEO / AEO", "Link Building", "Guest Posts", "Digital PR", "On-Page SEO", "Technical SEO", "E-Commerce SEO", "Local SEO", "Monthly SEO", "Not sure yet"].map((o) => `<option>${o}</option>`).join("")}</select></label>
  <label class="full">Message<textarea id="f-msg" name="message" required placeholder="Your goals, target keywords and budget"></textarea></label>
  <input class="hp" id="f-hp" name="botcheck" type="checkbox" tabindex="-1" autocomplete="off" aria-hidden="true">
  <button class="btn btn-p full" type="submit" id="send">${ico("i-send")}<span>Send message</span></button>
  <p class="note" id="note" role="status"></p>
</form>`;

const steps = () => `<div class="steps">${d.process.map((s, i) => `<div class="step rv" style="--i:${i}"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("")}</div>`;

/* ---------------- pages ---------------- */

exports.home = (ctx) => {
  const { link, asset } = helpers(ctx);
  const featured = [];
  d.services.forEach((g) => g.items.forEach((s) => s.home && featured.push([s, g])));
  const body = `
<section class="hero"><div class="wrap hero-grid">
  <div>
    <p class="pill rv"><i></i>Available for new SEO projects</p>
    <h1 class="rv" style="--i:1">SEO Specialist &amp; Link Building <span class="hl">Expert<svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9C50 2 120 1 197 7"/></svg></span></h1>
    <p class="lede rv" style="--i:2">I'm Bilal Rasheed. For 7+ years I've helped websites earn the rankings, links and authority that bring in customers from Google and AI search.</p>
    <div class="cta rv" style="--i:3">
      <a class="btn btn-p" href="${link("case-studies")}">${ico("i-trend")}View case studies</a>
      <a class="btn btn-s" href="${link("services")}"><span class="play"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 0l8 5-8 5z"/></svg></span>My services</a>
    </div>
  </div>
  <div class="scene rv" id="scene" style="--i:2">
    <div class="stage" id="stage">
      <div class="plate"></div>
      <div class="ring"></div>
      <div class="cut"><img src="${asset("bilal.webp")}" alt="Bilal Rasheed, SEO specialist" width="847" height="1200" fetchpriority="high"></div>
      <div class="orb"></div>
      <div class="chip chip-a" aria-hidden="true"><span class="tile">${ico("i-search")}</span><div>SEO Growth<span class="mini"><u></u><u></u><u></u><u></u><u></u></span></div></div>
      <div class="chip chip-b" aria-hidden="true"><span class="tile">${ico("i-link")}</span>Link<br>Building</div>
      <div class="chip chip-c" aria-hidden="true"><p>${tick}Higher rankings</p><p>${tick}More traffic</p><p>${tick}Authority growth</p></div>
      <div class="chip chip-d" aria-hidden="true"><b>1</b><div><small>bilalrasheed.com</small><strong>Link Building Expert</strong><s></s></div></div>
    </div>
  </div>
</div>
<div class="wrap stats">${d.stats.map((s, i) => `<div class="card stat tilt rv" style="--i:${i}"><span class="tile3d">${ico(s.icon)}</span><div><strong data-count="${s.n}" data-suffix="${s.suffix}">${s.n}${s.suffix}</strong><span>${s.label}</span></div></div>`).join("")}</div>
</section>

<section class="sec"><div class="wrap">
  ${head(`My <span class="hl">SEO</span> services`, "From classic SEO to AI search and every kind of backlink.", more(link("services"), "View all services"))}
  <div class="grid3">${featured.map(([s, g], i) => serviceCard(s, g.tone, i, link("services#" + g.id))).join("")}</div>
</div></section>

<section class="sec"><div class="wrap">
  ${head(`Case studies &amp; <span class="hl">portfolio</span>`, "Example layouts with sample numbers. Real client results will replace these.", more(link("case-studies"), "View all case studies"))}
  <div class="grid3">${d.cases.slice(0, 3).map(caseCard).join("")}</div>
</div></section>

<section class="sec"><div class="wrap about-teaser">
  <div class="card me rv tilt"><img src="${asset("bilal.webp")}" alt="" width="847" height="1200" loading="lazy"></div>
  <div class="rv" style="--i:1">
    <h2>About <span class="hl">me</span></h2>
    <p class="lede">I help businesses grow their online presence through strategic link building, off-page SEO, digital PR and authority growth. You talk to me directly from the first audit to the final report.</p>
    <div class="skills">${d.skills.slice(0, 6).map((s) => `<span>${tick}${s}</span>`).join("")}</div>
    ${more(link("about"), "More about me")}
  </div>
</div></section>

${ctx.posts.length ? `<section class="sec"><div class="wrap">
  ${head(`From the <span class="hl">blog</span>`, "Notes on SEO, links and AI search.", more(link("blog"), "View all posts"))}
  <div class="grid3">${ctx.posts.slice(0, 3).map((p, i) => postCard(p, i, link)).join("")}</div>
</div></section>` : ""}

<section class="sec"><div class="wrap">
  ${head(`People also <span class="hl">ask</span>`)}
  ${faq(d.faqs.slice(0, 4))}
</div></section>
${cta(link)}`;
  const schema = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: d.site.name, jobTitle: d.site.tagline, url: d.site.domain + "/", image: d.site.domain + "/assets/bilal.webp", knowsAbout: d.skills })}</script>\n`;
  return { path: "", file: "index.html", title: "", description: "Bilal Rasheed is an SEO specialist and link building expert with 7+ years of experience in SEO, GEO, AEO, digital PR and authority growth.", active: "", body, extraHead: schema + faqSchema(d.faqs.slice(0, 4)) };
};

exports.services = (ctx) => {
  const { link } = helpers(ctx);
  const total = d.services.reduce((n, g) => n + g.items.length, 0);
  const body = `
${pageHero(["services"], `Every SEO service, <span class="hl">one expert</span>`, `${total} services across search, AI answers, backlinks, on-page work and SEO for specific business types.`)}
<div class="wrap"><nav class="jump rv" aria-label="Service groups">${d.services.map((g) => `<a class="t-${g.tone}" href="#${g.id}"><i></i>${g.title}<small>${g.items.length}</small></a>`).join("")}</nav></div>
${d.services.map((g) => `<section class="sec" id="${g.id}"><div class="wrap">
  ${head(g.title, g.blurb)}
  <div class="grid3">${g.items.map((s, i) => serviceCard(s, g.tone, i)).join("")}</div>
</div></section>`).join("")}
<section class="sec" id="process"><div class="wrap">
  ${head(`How a campaign <span class="hl">runs</span>`, "The same four steps every time, so you always know what happens next.")}
  ${steps()}
</div></section>
${cta(link)}`;
  return { path: "services", file: "services.html", title: "SEO Services: SEO, GEO, AEO, Link Building & More", description: "All SEO services from Bilal Rasheed: SEO, GEO, AEO, guest posts, niche edits, digital PR, on-page, technical, e-commerce and local SEO.", active: "services", body };
};

exports.cases = (ctx) => {
  const { link } = helpers(ctx);
  const body = `
${pageHero(["case-studies"], `Case studies &amp; <span class="hl">portfolio</span>`, "How campaigns are measured: traffic, authority and rankings before and after. These cards use sample numbers until real client results are added.")}
<section class="sec sec-tight"><div class="wrap"><div class="grid3">${d.cases.map(caseCard).join("")}</div></div></section>
${cta(link)}`;
  return { path: "case-studies", file: "case-studies.html", title: "SEO Case Studies & Portfolio", description: "SEO and link building case studies from Bilal Rasheed: organic traffic, domain rating and ranking growth.", active: "case-studies", body };
};

exports.about = (ctx) => {
  const { link, asset } = helpers(ctx);
  const body = `
${pageHero(["about"], `Hi, I'm <span class="hl">Bilal Rasheed</span>`, "An SEO specialist and link building expert with 7+ years of experience helping websites earn authority.")}
<section class="sec sec-tight"><div class="wrap about">
  <aside class="card panel rv">
    <div class="me me-lg"><img src="${asset("bilal.webp")}" alt="Bilal Rasheed" width="847" height="1200"></div>
    <dl class="facts">
      <div><dt>Role</dt><dd>${d.site.tagline}</dd></div>
      <div><dt>Experience</dt><dd>7+ years in SEO</dd></div>
      <div><dt>Focus</dt><dd>Link building, off-page SEO, digital PR</dd></div>
      <div><dt>Works on</dt><dd>One-off projects and monthly campaigns</dd></div>
      <div><dt>Email</dt><dd>${d.site.email}</dd></div>
    </dl>
  </aside>
  <div class="about-main">
    <div class="card bio rv" style="--i:1">
      <h2>What I <span class="hl">do</span></h2>
      <p>I help businesses grow their online presence through strategic link building, off-page SEO, digital PR and authority growth. I care about results that hold their value: relevant sites, real audiences and anchors that read naturally.</p>
      <p>Search is changing, so my work now covers AI answers as well as classic rankings. The goal stays the same: when someone looks for what you offer, they find you.</p>
      <div class="skills" aria-label="Core skills">${d.skills.map((s) => `<span>${tick}${s}</span>`).join("")}</div>
    </div>
    <div class="grid3 principles">${d.principles.map((p, i) => `<div class="card service rv" style="--i:${i}"><span class="tile3d">${ico(p[2])}</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div>
  </div>
</div>
<div class="wrap stats">${d.stats.map((s, i) => `<div class="card stat tilt rv" style="--i:${i}"><span class="tile3d">${ico(s.icon)}</span><div><strong data-count="${s.n}" data-suffix="${s.suffix}">${s.n}${s.suffix}</strong><span>${s.label}</span></div></div>`).join("")}</div>
</section>
${cta(link)}`;
  return { path: "about", file: "about.html", title: "About Bilal Rasheed", description: "About Bilal Rasheed, an SEO specialist and link building expert with 7+ years of experience.", active: "about", body, type: "profile" };
};

exports.contact = (ctx) => {
  const body = `
${pageHero(["contact"], `Let's grow your website <span class="hl">together</span>`, "Tell me about your site and what you want to rank for. I usually reply within one business day.")}
<section class="sec sec-tight"><div class="wrap"><div class="contact rv">
  <div>
    <h2>Send a message</h2>
    <p class="lead">The more you share about your site, goals and budget, the more useful my first reply will be.</p>
    <div class="mail">${ico("i-mail")}<span id="email">${d.site.email}</span><button type="button" id="copy">Copy</button></div>
    <ul class="c-list"><li>${tick}Free first look at your site</li><li>${tick}A clear plan before any work starts</li><li>${tick}No long contracts</li></ul>
  </div>
  ${form()}
</div></div></section>
<section class="sec"><div class="wrap">${head(`Before you <span class="hl">write</span>`)}${faq(d.faqs.slice(3).concat(d.faqs.slice(0, 2)))}</div></section>`;
  return { path: "contact", file: "contact.html", title: "Contact", description: "Contact Bilal Rasheed about SEO, link building, digital PR and authority growth.", active: "contact", body };
};

exports.blog = (ctx) => {
  const { link } = helpers(ctx);
  const body = `
${pageHero(["blog"], `The <span class="hl">blog</span>`, "Practical notes on SEO, link building and getting found in AI search.")}
<section class="sec sec-tight"><div class="wrap">${ctx.posts.length ? `<div class="grid3">${ctx.posts.map((p, i) => postCard(p, i, link)).join("")}</div>` : `<p class="lede">The first posts are on their way.</p>`}</div></section>
${cta(link)}`;
  return { path: "blog", file: "blog.html", title: "SEO Blog", description: "Articles on SEO, GEO, AEO, link building and digital PR by Bilal Rasheed.", active: "blog", body };
};

exports.post = (ctx, p) => {
  const { link, asset } = helpers(ctx);
  const others = ctx.posts.filter((o) => o.slug !== p.slug).slice(0, 3);
  const body = `
<article class="article"><div class="wrap wrap-narrow">
  <p class="crumb rv"><a href="${link("")}">bilalrasheed.com</a><b>›</b><a href="${link("blog")}">blog</a><b>›</b><span>${esc(p.slug)}</span></p>
  <h1 class="rv" style="--i:1">${esc(p.title)}</h1>
  <div class="byline rv" style="--i:2"><img src="${asset("bilal.webp")}" alt="" width="847" height="1200"><div><strong>${d.site.name}</strong><small>${fmtDate(p.date)} · ${p.minutes} min read · ${esc(p.category || "SEO")}</small></div></div>
  <div class="prose card rv" style="--i:3">${p.html}</div>
</div></article>
${others.length ? `<section class="sec"><div class="wrap">${head(`Keep <span class="hl">reading</span>`)}<div class="grid3">${others.map((o, i) => postCard(o, i, link)).join("")}</div></div></section>` : ""}
${cta(link)}`;
  const schema = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, datePublished: p.date, author: { "@type": "Person", name: d.site.name, url: d.site.domain + "/about" }, mainEntityOfPage: d.site.domain + "/blog/" + p.slug })}</script>\n`;
  return { path: "blog/" + p.slug, file: "blog/" + p.slug + ".html", title: p.title, description: p.description, active: "blog", body, type: "article", extraHead: schema };
};

exports.notFound = (ctx) => {
  const { link } = helpers(ctx);
  const body = `${pageHero(["404"], `No results for this <span class="hl">page</span>`, "The page you searched for isn't here. Try the search bar above, or head back home.")}<div class="wrap" style="padding-bottom:80px"><a class="btn btn-p" href="${link("")}">Back to home${ico("i-arrow")}</a></div>`;
  return { path: "404", file: "404.html", title: "Page not found", description: "Page not found.", active: "", body };
};
