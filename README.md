# mohinbuilds-blog

Astro blog. Free hosting on Cloudflare Pages. Custom domain attaches whenever.

## Deploy in 4 steps (Mohin does this; I scaffolded the code)

1. **Push to GitHub.** From this folder: `git init && git add . && git commit -m "init" && git remote add origin https://github.com/<your-username>/mohinbuilds-blog.git && git push -u origin main`
2. **Connect to Cloudflare Pages.** dash.cloudflare.com → Workers & Pages → Create application → Pages → Connect to Git → pick the `mohinbuilds-blog` repo.
3. **Set build settings.** Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`. Hit Save and Deploy.
4. **Done.** Your live URL will be `mohinbuilds.pages.dev` in ~90 seconds.

## When you want the custom domain ($9/yr, defer to month 2)

1. Buy `mohinbuilds.com` on Namecheap.
2. In Cloudflare Pages → your project → Custom domains → Set up custom domain → enter `mohinbuilds.com`.
3. Cloudflare will give you nameservers. Paste those into Namecheap → Domain List → Manage → Nameservers → Custom DNS.
4. Wait ~10 min for propagation. Update `site` in `astro.config.mjs` to `https://mohinbuilds.com` and re-deploy.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Adding a post

Drop a markdown file in `src/content/blog/`. Frontmatter:

```yaml
---
title: "Post title"
description: "One-sentence description for SEO."
publishDate: 2026-05-20
tags: ["cowork", "tutorial"]
draft: false
---
```

Body in markdown below.

## Stack

- Astro 4.16 (static site generator)
- Cloudflare Pages (hosting, free)
- Built with Claude Cowork
