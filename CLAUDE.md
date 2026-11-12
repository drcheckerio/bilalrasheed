# bilalrasheed.com

Portfolio and blog for Bilal Rasheed (SEO specialist). Static site, built by `build.js`, hosted on Vercel from the `main` branch. Every push to `main` goes live.

## Layout
- `src/data.js`: all content (services, stats, case studies, FAQs, nav) and site settings.
- `src/layout.js`: shared head, header, menu, footer, icon sprite.
- `src/pages.js`: page bodies (home, services, case-studies, about, blog, contact, post, 404).
- `assets/`: `site.css`, `site.js`, `logo.webp`, `bilal.webp`, `favicon.svg`.
- `posts/*.md`: blog posts. File name is the URL slug.
- `dist/`: build output, not committed.

Commands: `npm run build` (production, clean URLs), `npm run preview` (relative `.html` links for local viewing).

## Publishing a blog post
Add `posts/<slug>.md`:

```
---
title: Post title
description: One or two sentences, under 160 characters, used as the meta description.
date: YYYY-MM-DD
category: Link Building
icon: i-link
---
Markdown body. Start at ## for headings (the title is the H1).
```

- Slug: lowercase words joined by hyphens, no dates.
- `icon` is any symbol id from the sprite in `src/layout.js`. `draft: true` hides a post.
- Run `npm run build` before committing to confirm it builds. Commit, push to `main`.
- Link to relevant service pages and older posts with absolute paths (`/services`, `/blog/<slug>`).
- Do not invent statistics, client names or results.

## Rules
- Case studies in `src/data.js` are sample data and show a "Sample" tag. Remove the tag only when replaced with real client results.
- No fabricated testimonials.
- Noindex is ON until the owner says the site is finished. To launch: set `indexable: true` in `src/data.js` AND delete the `X-Robots-Tag` header block in `vercel.json`. Never block crawling in robots.txt as a substitute.
- Contact form delivery needs a Web3Forms key in `site.formKey` (`src/data.js`).
