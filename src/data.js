// All site content lives here. Edit text, numbers and lists in this file.

exports.site = {
  name: "Bilal Rasheed",
  domain: "https://bilalrasheed.com",
  email: "bilal@bilalrasheed.com",
  tagline: "SEO Specialist & Link Building Expert",
  // Set to true when the site is ready for Google. Also remove the
  // X-Robots-Tag header from vercel.json at the same time.
  indexable: false,
  // Web3Forms access key for the contact form. Empty = delivery off.
  formKey: "",
};

// Official accounts. `mark` is the short text shown on the icon tile.
exports.socials = [
  { name: "LinkedIn", handle: "in/mbilalrasheed", url: "https://www.linkedin.com/in/mbilalrasheed/", mark: "in", tone: "blue" },
  { name: "Fiverr", handle: "theseoguru1", url: "https://www.fiverr.com/theseoguru1", mark: "fi", tone: "green" },
  { name: "X", handle: "@mbilal_rasheed", url: "https://x.com/mbilal_rasheed", mark: "X", tone: "ink" },
  { name: "Facebook", handle: "mrbilalrasheed", url: "https://www.facebook.com/mrbilalrasheed/", mark: "f", tone: "sky" },
  { name: "Instagram", handle: "@mbilal_rasheed", url: "https://www.instagram.com/mbilal_rasheed/", mark: "ig", tone: "pink" },
];

exports.nav = [
  { label: "Home", href: "", icon: "i-home", tone: "blue" },
  { label: "Services", href: "services", icon: "i-layers", tone: "violet" },
  { label: "Case Studies", href: "case-studies", icon: "i-bars", tone: "green" },
  { label: "About", href: "about", icon: "i-user", tone: "yellow" },
  { label: "Blog", href: "blog", icon: "i-pen", tone: "red" },
  { label: "Contact", href: "contact", icon: "i-mail", tone: "blue" },
];

exports.stats = [
  { n: 7, suffix: "+", label: "Years experience", icon: "i-cal" },
  { n: 1422, suffix: "+", label: "Projects completed", icon: "i-layers" },
  { n: 100, suffix: "K+", label: "Backlinks built", icon: "i-link" },
  { n: 673, suffix: "+", label: "Clients worked with", icon: "i-users" },
];

// Service groups shown on the Services page. `home: true` puts a card on the homepage.
exports.services = [
  {
    id: "search",
    title: "Search, AI and answer engines",
    blurb: "Be the result people find, whether they ask Google, an AI assistant or a voice search.",
    tone: "blue",
    items: [
      { name: "SEO", icon: "i-search", home: true, text: "Full search engine optimization: strategy, on-page, technical and off-page work run as one plan." },
      { name: "GEO", long: "Generative Engine Optimization", icon: "i-spark", home: true, text: "Get your brand cited in AI answers from ChatGPT, Gemini, Perplexity and Google's AI Overviews." },
      { name: "AEO", long: "Answer Engine Optimization", icon: "i-chat", home: true, text: "Structure content to win featured snippets, People Also Ask boxes and voice answers." },
      { name: "Keyword Research", icon: "i-key", text: "Find the terms your buyers search, grouped by intent and mapped to the right pages." },
      { name: "SEO Audit", icon: "i-shield", text: "A full review of your site, content and links with a prioritized list of fixes." },
      { name: "Content SEO", icon: "i-doc", text: "Topic clusters, briefs and content refreshes that build topical authority." },
    ],
  },
  {
    id: "links",
    title: "Backlinks and authority",
    blurb: "Every kind of link a healthy profile needs, earned from relevant sites with real traffic.",
    tone: "violet",
    items: [
      { name: "Link Building", icon: "i-link", home: true, text: "White-hat outreach campaigns that earn editorial links from sites in your niche." },
      { name: "Guest Posts", icon: "i-doc", text: "Niche-relevant articles published on trusted sites, written for each site's audience." },
      { name: "Niche Edits", long: "Link insertions", icon: "i-edit", text: "Contextual links placed in existing, already-indexed articles that match your topic." },
      { name: "Digital PR", icon: "i-mega", text: "Stories and data pitched to journalists for mentions on high-authority media sites." },
      { name: "Expert Quote Links", long: "HARO-style", icon: "i-chat", text: "Your expert comments placed in journalist requests, earning links from news and industry sites." },
      { name: "Local Citations", icon: "i-pin", text: "Consistent business listings on the directories that matter for local rankings." },
      { name: "Foundation Links", icon: "i-layers", text: "Brand profiles, social properties and directory links that give a new site a natural base." },
      { name: "Broken Link Building", icon: "i-route", text: "Find dead links on relevant pages and offer your content as the replacement." },
      { name: "Authority Growth", long: "DA, DR, TF", icon: "i-bars", text: "A safe, steady plan to raise authority metrics without risky footprints." },
      { name: "Link Audit & Cleanup", icon: "i-shield", text: "Review your backlink profile, flag toxic links and fix anchor text balance." },
    ],
  },
  {
    id: "onsite",
    title: "On-page and technical",
    blurb: "Make every page easy for search engines to crawl, understand and rank.",
    tone: "green",
    items: [
      { name: "On-Page SEO", icon: "i-file", home: true, text: "Titles, headings, internal links, schema and content tuned for each target keyword." },
      { name: "Technical SEO", icon: "i-code", text: "Crawling, indexing, site speed, Core Web Vitals and structured data fixed at the source." },
      { name: "Schema Markup", icon: "i-code", text: "Structured data that earns rich results and helps AI systems understand your pages." },
      { name: "Site Migration SEO", icon: "i-route", text: "Redirect plans and checks that protect rankings through a redesign or domain change." },
      { name: "Penalty Recovery", icon: "i-shield", text: "Diagnose traffic drops from updates or manual actions and build the plan to recover." },
    ],
  },
  {
    id: "business",
    title: "SEO by business type",
    blurb: "The same principles, shaped around how your kind of business wins customers.",
    tone: "red",
    items: [
      { name: "E-Commerce SEO", icon: "i-cart", home: true, text: "Category, product and collection pages optimized for Shopify, WooCommerce and custom stores." },
      { name: "Local SEO", icon: "i-pin", text: "Google Business Profile, local pages, reviews and citations to win the map pack." },
      { name: "SaaS SEO", icon: "i-spark", text: "Feature, comparison and integration pages plus links that drive sign-ups." },
      { name: "International SEO", icon: "i-globe", text: "Hreflang, market research and localized content for multi-country sites." },
      { name: "YouTube SEO", icon: "i-play", text: "Titles, descriptions, chapters and tags that help videos rank in YouTube and Google." },
      { name: "Monthly SEO", icon: "i-cal", text: "An ongoing campaign with a clear report at the end of every month." },
    ],
  },
];

exports.process = [
  ["Audit the site and links", "I review your pages, backlinks, anchors and competitors to find the gaps worth closing."],
  ["Agree the plan", "You get a clear plan with target pages, keywords and a shortlist of sites before anything goes live."],
  ["Do the work", "On-page fixes, content, outreach and placements, with natural anchors pointing at the right pages."],
  ["Report the results", "Every change and every live link goes into a report you can check yourself."],
];

// Sample data. Replace with real client results.
exports.cases = [
  { name: "SaaS company", tag: "Link building", text: "Link building campaign to grow organic visibility.", kpis: [["+214%", "Organic traffic", 1], ["DR 62", "Up 18"], ["TF 40", "Up 12"]], path: "M0 56 C40 52 60 46 100 44 S160 30 200 24 260 10 300 4" },
  { name: "Business directory", tag: "Digital PR", text: "Authority growth and digital PR for competitive keywords.", kpis: [["+183%", "Organic traffic", 1], ["DR 58", "Up 20"], ["DA 54", "Up 17"]], path: "M0 58 C50 56 70 40 110 40 S170 34 210 20 270 14 300 6" },
  { name: "Startup newsletter", tag: "Guest posts", text: "Off-page SEO and guest posting to lift rankings.", kpis: [["+167%", "Organic traffic", 1], ["DR 60", "Up 16"], ["TF 38", "Up 11"]], path: "M0 54 C30 54 70 50 100 42 S150 38 200 28 260 18 300 8" },
  { name: "Online store", tag: "E-commerce SEO", text: "Category page optimization and product schema.", kpis: [["+142%", "Organic revenue", 1], ["320", "Keywords in top 10"], ["DR 47", "Up 14"]], path: "M0 52 C40 54 70 44 110 46 S170 28 210 26 260 12 300 6" },
  { name: "Local service brand", tag: "Local SEO", text: "Map pack visibility across twelve service areas.", kpis: [["+96%", "Calls from search", 1], ["Top 3", "Map pack"], ["85", "Citations built"]], path: "M0 58 C60 50 80 50 120 38 S180 36 220 22 270 16 300 10" },
  { name: "B2B software", tag: "GEO", text: "Content restructured to earn citations in AI answers.", kpis: [["+58", "AI answer citations", 1], ["+121%", "Organic traffic"], ["DR 55", "Up 9"]], path: "M0 56 C50 54 90 52 130 40 S190 30 230 18 280 8 300 4" },
];

exports.faqs = [
  ["How long does SEO take to show results?", "Most sites see movement in rankings and authority metrics within two to three months of consistent work. Competitive niches take longer, which is why monthly campaigns work better than one-off bursts."],
  ["Are the links white-hat and safe?", "Yes. Links are placed on relevant sites with real traffic, inside useful content, with natural anchor text. No link farms, no automated tools and no hacked placements."],
  ["What is the difference between SEO, GEO and AEO?", "SEO earns rankings in search results. AEO shapes content so search engines can lift a direct answer from it. GEO helps AI assistants cite your brand when they write an answer. The three overlap, and a good plan covers all of them."],
  ["What do you need from me to start?", "Your website URL, the pages or keywords you want to grow and your monthly budget. I'll come back with an audit and a plan for your approval."],
  ["How will I know what was done?", "You get a report listing every change and every live link with its URL, anchor text and metrics, so you can check each one yourself."],
];

exports.skills = ["Link Building", "Off-Page SEO", "Digital PR", "Guest Posting", "On-Page SEO", "Technical SEO", "GEO & AEO", "E-Commerce SEO", "Authority Growth", "SEO Strategy"];

exports.principles = [
  ["Relevance first", "A link from a site in your niche beats a bigger number from an unrelated one.", "i-link"],
  ["Nothing hidden", "You approve the plan and the sites up front, and every result is in the report.", "i-search"],
  ["Built to last", "No shortcuts that work this month and cost you rankings in the next update.", "i-shield"],
];
