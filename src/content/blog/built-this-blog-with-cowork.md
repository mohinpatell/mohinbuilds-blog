---
title: "I built this blog from scratch with Claude Cowork in 20 minutes (the exact prompt sequence)"
description: "A static Astro blog deployed to Cloudflare Pages, end-to-end, with Cowork driving everything. The full prompt log plus the part that broke."
publishDate: 2026-05-14
tags: ["cowork", "tutorial", "first-saas"]
draft: true
---

You're reading the result. This whole site — the layout, the RSS feed, the post page, the about page — got built in a single Cowork session before I made dinner. I want to walk through exactly what I asked Cowork to do, because the prompts are more interesting than the output.

A note on the 20-minute claim: it's the time from the first Cowork message to the live URL working. It doesn't include the parts I had set up already, which I'll cover below. It also doesn't include the part where I stared at an error message for [MOHIN: X minutes] and almost gave up.

## What I had ready before the timer started

Three things, none of which cost money:

1. A GitHub account (I've had `mohinpatell` since [MOHIN: year you signed up]).
2. A Cloudflare account, free tier. About 5 minutes to set up.
3. Claude Cowork installed. The Anthropic desktop app, signed in to my account.

That's it. No domain — this site lives at `mohinbuilds.pages.dev` for now, which is free forever, and the custom domain is something I'll attach later when I'm sure the content is working.

## The first prompt that almost worked

My opening prompt to Cowork was basically: *"build me a minimal blog using Astro, deploy it to Cloudflare Pages, the URL should be mohinbuilds.pages.dev."*

What Cowork actually did was:
- Scaffolded an Astro project in a new folder.
- Wrote the layout and homepage and an about page.
- Added an RSS feed (I didn't ask for one but I'm glad it included it).
- [MOHIN: describe what specifically happened that wasn't quite right — did it pick a template you didn't want? did the styles look weird? did it skip something? specific concrete thing here].

The fix was a follow-up message: [MOHIN: paste the actual follow-up prompt you used, or describe what you asked it to change].

## The prompt sequence that worked

I'm going to list these verbatim because the order matters more than the content of any single one.

> **Prompt 1:** Build a minimal Astro blog with a homepage, about page, and post pages. Use Astro's content collections for the posts. Add an RSS feed. Make the styling clean and readable — system fonts, max 680px width, nothing fancy. The site name is "mohinbuilds."

> **Prompt 2:** [MOHIN: the second prompt — what did you ask it to change or add after seeing what it generated]

> **Prompt 3:** [MOHIN: the third prompt — usually this is the deploy step, but yours might have been a styling tweak or a structural change]

The thing Cowork is unreasonably good at: turning my vague design instincts into actual CSS that doesn't look terrible. I'd previously written CSS by hand for [MOHIN: a previous project, if any — what was it?]. Cowork's version was better than what I'd produced manually, in maybe one-tenth the time.

## What broke

Skipping this section would feel dishonest, because something always breaks and pretending otherwise is the thing that makes "I built X in Y minutes" posts so annoying to read.

For me, the break was [MOHIN: pick one specific failure — was it the build failing on a missing dependency? a Cloudflare Pages config issue? Astro complaining about a content collection schema? a deploy that succeeded but showed a blank page? — name the specific error message if you can remember it].

The fix was [MOHIN: how you got past it — was it a Cowork follow-up, a Google search, reading the Astro docs, asking a friend?].

Time lost: [MOHIN: estimate in minutes].

This is the part I want to keep being honest about for the rest of this blog. The actual ratio of "Cowork did the thing" to "I sat there confused" is closer to 70:30 than 100:0, and pretending otherwise sets people up to feel stupid when their version has the messy 30%.

## Deploy: three steps, ten minutes

Cowork can't deploy for me — it doesn't have keys to my Cloudflare account, and that's fine, because deploy is the one moment where I want to be sure of what I'm shipping. Here's the actual sequence:

1. Pushed the project to a new GitHub repo: `git init && git add . && git commit -m "init" && git remote add origin https://github.com/mohinpatell/mohinbuilds-blog.git && git push -u origin main`.
2. In Cloudflare's dashboard: Workers & Pages → Create application → Pages → Connect to Git → picked the `mohinbuilds-blog` repo.
3. Cloudflare auto-detected Astro and set the build command and output directory correctly. Hit Save and Deploy.

The first deploy took [MOHIN: actual time in seconds — Cloudflare tells you this in the build log]. The URL `mohinbuilds.pages.dev` was live within [MOHIN: actual time].

## The total time, honestly accounted for

- Cowork session: ~20 minutes of actual prompting and code review.
- The thing that broke: [MOHIN: minutes].
- Deploy: ~10 minutes including poking around the Cloudflare UI.

Total wall-clock: [MOHIN: rough total — be honest, it's probably 40-50 minutes if you include the broken-thing-debugging].

The "20 minutes" claim in the title is real but selective. I had everything set up. I knew what I was building. If I'd been figuring out what Astro was at the same time, this would have been a 3-hour post titled "I tried to build a blog and it took all afternoon."

## Try this yourself — the four steps in order

If you want the same setup:

1. **Make a GitHub account** if you don't have one. Free, 5 min.
2. **Make a Cloudflare account.** Free, 5 min.
3. **Install Claude Cowork** (Anthropic's desktop app). Free tier exists; paid tier unlocks more conversations per day.
4. **Open Cowork in your project folder and use my Prompt 1 above.** Iterate from there.

The exact prompts I used are in the section above. You can copy them, change "mohinbuilds" to your name, and you'll get a different-but-similar site.

## What I'm planning to do here

This blog is the build log for my first SaaS. I'm a CS student. I've never shipped a real product. I'm using Cowork to do it as a non-developer-adjacent person — meaning I can read code well enough to know when Cowork is wrong, but I'm not writing production-grade systems by hand. That gap is the niche I'm planting flag in.

Next post: I'm comparing Cowork against Claude Code and Cursor on the same task, because I keep getting asked which one to use and the honest answer is "they're different tools and one of them probably fits your situation."

If that sounds useful, the RSS is at [/rss.xml](/rss.xml). No email capture yet — I'll add one when I have something worth gating it behind.
