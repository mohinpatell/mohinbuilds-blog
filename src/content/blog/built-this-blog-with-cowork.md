---
title: "I used Claude Cowork to build this blog — here's what actually happened"
description: "A static Astro blog deployed to Cloudflare Pages, drafted by Cowork. The real wall-clock time, the friction Cowork couldn't smooth over, and the parts where it genuinely earned its keep."
publishDate: 2026-05-14
tags: ["cowork", "tutorial", "first-saas"]
draft: false
---

You're reading the result. The blog itself, every line of CSS, every Astro template, the GitHub repo it lives in, the Cloudflare Pages deploy — all of it was driven by Claude Cowork on the other side of a chat window. I told it I wanted a blog. It produced files, drove my Chrome to set up accounts where it could, and told me which buttons I had to click myself.

I want to be honest about the actual experience because most "I built X in Y minutes with AI" posts are scripted. This one wasn't.

## The wall-clock truth

The total time from "let's start" to the URL going live was roughly two hours. Of that, maybe forty minutes was me actively engaged. The other eighty was waiting on Cowork to do things, fixing things that broke, and watching the Cloudflare dashboard fail to load. Twice.

If anyone tells you they built a real, deployed blog start-to-finish in twenty minutes with an AI, they either had everything pre-configured or they're skipping the parts that broke. Both are common. Both are misleading.

## What Cowork did well

The CSS layout I'm sitting in right now is better than what I'd have written by hand, and it was finished before I would have decided on a font. The Astro project scaffold, the content collections schema, the RSS feed, the about page — all of that materialized in a couple of minutes with no prompting back-and-forth. The scaffolded code was clean enough that I didn't want to rewrite any of it.

Cowork also drove my Chrome to navigate Cloudflare, fill out the Pexels API key form, and pick the right scope for an ElevenLabs token. I was watching the cursor move around in a browser tab while I sat there. It felt weird and useful in roughly equal measure. The weirdness wears off faster than I expected.

## What Cowork couldn't do

It refused to make accounts on my behalf. Not "wouldn't if I asked nicely" — flat refused. The official reason is platform bot-detection and terms of service, the practical reason is that account creation involves email verification codes that an AI can't read from my inbox. Either way: when it came time to sign up for Cloudflare, ElevenLabs, and Pexels, I clicked the buttons.

Once, GitHub triggered its "sudo mode" verification mid-flow and emailed me a six-digit code that I had to grab and type in. Cowork warned me that was coming. I appreciated the warning.

I had a couple of moments where I thought the rule was overcautious. Clicking "Create repository" on GitHub is mechanical. Cowork running that click on my own browser with my own credentials should be no different from me running it. The honest counter-argument is that bot-detection systems look at mouse-movement patterns and timing, and accounts that look automated get flagged later. So even if a specific click is fine, the long-term cost of looking like a bot is real. I ended up split on it. Mostly I just wanted to keep moving.

## The four things that broke

**The Cloudflare dashboard hung twice.** Empty React mount point, no error message, just a loading cloud forever. The fix was hitting cmd+R. Cowork ate a couple of minutes both times trying to diagnose it via DOM inspection before suggesting the refresh, which felt slow in the moment. Both times the refresh worked instantly.

**Sharp wasn't installed.** Astro tries to import `sharp` for image optimization at build time. My Node version (18.16) was just below the threshold that npm wants before it'll install sharp cleanly, so npm silently skipped it, and then the build crashed trying to import it. The fix was to tell Astro to use the no-op image service instead. One config line. Sharp avoided entirely.

**The sitemap integration crashed in a post-build hook.** `Cannot read properties of undefined (reading 'reduce')` from inside `@astrojs/sitemap`. Known incompatibility with some Astro 4.x versions. I removed the integration. The site builds without a sitemap. I'll hand-roll one later when I'm not chasing a deploy.

**Wrangler v4 refused to run on Node 18.** Cloudflare's CLI bumped its minimum Node version to 22 recently. The fix was pinning to v3 with `npx wrangler@3`. Three characters of typing. Cowork knew that one immediately.

I also hit a git lock-file collision because Cowork's sandbox had been running git commands inside the same `.git` directory my Mac was using. Sandbox writes left behind `.git/index.lock` and `.git/HEAD.lock` files that my local git refused to touch. A `find .git -name "*.lock" -delete` cleared it. Annoying but harmless.

## What I'd tell someone starting tomorrow

Go in expecting more friction than the demo videos show. The build itself is genuinely fast — Cowork wrote real files faster than I could read them — but the integration steps where Cowork hands off to platforms it can't fully control (Cloudflare dashboard, GitHub OAuth, npm/Node version constraints) are where the time gets eaten.

Have a GitHub account already. Don't try to set up everything from scratch in one session; the cognitive load of approving five accounts is more than I expected, even when each one was thirty seconds.

If you have a choice between Cloudflare's dashboard and Wrangler CLI for deploying Pages, the CLI is more reliable. The dashboard's SPA bundle is fragile and a stuck loading screen is the most common Cowork hang point.

Don't believe the twenty-minute pitches. The model is good but the world it operates in is messy. Plan for two hours. If it's faster, great. If it's not, you didn't break anything.

## The stack

- **[Astro](https://astro.build) 4.16** — static site generator. Zero JavaScript shipped to the browser unless you ask for it.
- **[Cloudflare Pages](https://pages.cloudflare.com)** — free hosting. The free tier is generous to the point of being suspicious.
- **[Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)** (`npx wrangler@3`) — what actually deployed the site.
- **[Claude Cowork](https://www.anthropic.com)** — Anthropic's desktop agent. The reason this exists.

The repo is at [github.com/mohinpatell/mohinbuilds-blog](https://github.com/mohinpatell/mohinbuilds-blog) if you want to see what we ended up with. Most of the interesting parts are in `src/layouts/Layout.astro` and `astro.config.mjs`.

## What's next

I'm vibe-coding a SaaS in parallel with this blog. The build log of that is what I'm planning to write next. Probably starting with the prompt I used to get the first feature working, and the part where it didn't.

If that sounds useful, [the RSS feed is here](/rss.xml). No email capture yet. I'll add one when I have something worth gating behind it.
