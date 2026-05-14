---
title: "i used claude cowork to build this blog. here's what actually happened."
description: "a static astro blog deployed to cloudflare pages, drafted by cowork. the real wall-clock time, the friction cowork couldn't smooth over, and the parts where it earned its keep."
publishDate: 2026-05-14
tags: ["cowork", "tutorial", "first-saas"]
draft: false
---

i used claude cowork to build this blog. i told it what i wanted. it wrote the code.

most "i built x with ai in y minutes" posts are scripted. this one isn't.

## the actual time

start to live url was about two hours. forty minutes of that was me at the keyboard. the other eighty was waiting on cowork to do things, fixing things that broke, or watching the cloudflare dashboard fail to load. twice.

if someone tells you they deployed a real blog in twenty minutes with an ai, they had everything pre-configured or they're not telling you about the parts that broke. probably both. don't believe the twenty-minute pitches.

## what cowork did well

the css i'm sitting in right now is better than what i'd have written by hand, and it was finished before i would have picked a font. the astro scaffold, the content schema, the rss feed, the about page — generated and reasonable in a couple of minutes, no back-and-forth prompting. i never wanted to rewrite any of it.

cowork also drove my chrome. it navigated cloudflare for me. filled the pexels api form. picked the right scope for an elevenlabs token. i watched a cursor move around in a browser tab while i sat there. felt weird at first. wears off in like ten minutes.

## what cowork wouldn't do

it refused to create accounts. not "would if i asked nicely" — flat refused. the reason it gave was platform bot-detection plus tos, the practical reason was email verification codes it can't read from my inbox. fine. when i needed to sign up for cloudflare, elevenlabs, and pexels, i clicked the buttons.

once, github triggered its "sudo mode" verification mid-flow and emailed me a six-digit code i had to grab and type. cowork warned me it was coming. that part was nice.

i thought the rule was silly at first. clicking "create repository" on github is mechanical. cowork running that click on my own browser with my own credentials should be no different from me running it. the actual counter is that bot-detection looks at mouse-movement patterns and timing, and accounts that look automated get flagged later. so even if a single click is fine, the long-term cost of looking like a bot is real. i'm still kind of split on it. mostly i just wanted to keep moving.

## the four things that broke

**the cloudflare dashboard hung. twice.** empty react mount point, no error message, just an orange cloud spinning forever. cmd+r fixed it both times. cowork burned a few minutes trying to dom-inspect what was happening before suggesting the refresh, which felt slow at the time.

**sharp wasn't installed.** astro tries to import `sharp` for image optimization at build time. my node version (18.16) was just below what npm wants for sharp's prebuilts. npm silently skipped sharp during install, then the build crashed importing it. the fix was one config line telling astro to use a no-op image service instead. sharp avoided entirely.

**the sitemap integration crashed in a post-build hook.** `cannot read properties of undefined (reading 'reduce')` from inside `@astrojs/sitemap`. known incompatibility with some astro 4.x versions. i removed the integration. the site builds without a sitemap. i'll hand-roll one later when i'm not chasing a deploy.

**wrangler v4 refused to run on node 18.** cloudflare's cli bumped its minimum to node 22 recently. fix: pin to v3 with `npx wrangler@3`. three characters of typing. cowork knew that one immediately.

oh also — cowork's sandbox kept running git commands in the same `.git` directory my mac was using. left behind `.git/index.lock` and `.git/HEAD.lock` files that my local git refused to step over. `find .git -name "*.lock" -delete` cleared it. annoying but harmless.

## the bigger detour: cloudflare's dashboard

worth saying separately because it ate the most time. the cloudflare pages "connect to git" flow exists in the dashboard, but for me it would consistently get stuck on the loading screen and i'd have to hard-refresh. eventually i tried to do it via the cloudflare api instead. cloudflare's api responded with error 8000069: *"you cannot update the source object in a direct uploads project."* it refuses to convert. so we deleted the pages project entirely and recreated it via api as a git-source project from the start. the `mohinbuilds.pages.dev` url survived the delete because subdomains are reserved by project name, not project id. now every `git push origin main` auto-deploys in fifteen seconds.

i didn't know any of that going in. that whole detour was about thirty minutes of poking at the dashboard, hitting the api wall, and figuring out the workaround.

## what i'd tell someone starting tomorrow

expect more friction than the demo videos show. the build itself is fast. cowork writes real files faster than i can read them. the slow part is integration moments where cowork hands off to platforms it can't fully control — cloudflare's dashboard, github oauth, npm and node version constraints. that's where the time goes.

have a github account already. don't try to set up five accounts in the same session. the cognitive load adds up.

if you have a choice between the cloudflare dashboard and wrangler cli, use wrangler. the dashboard's spa bundle was the single most reliable failure point of the whole afternoon.

don't believe the twenty-minute pitches. cowork is a good model. but it operates in a messy world that you can't prompt your way out of.

## the stack

- [astro](https://astro.build) 4.16 — static site generator. zero js shipped unless you ask for it.
- [cloudflare pages](https://pages.cloudflare.com) — free hosting. the free tier is generous to the point of suspicious.
- [cloudflare wrangler cli](https://developers.cloudflare.com/workers/wrangler/) — `npx wrangler@3`. what actually deployed the site.
- [claude cowork](https://www.anthropic.com) — anthropic's desktop agent. the reason this exists.

repo: [github.com/mohinpatell/mohinbuilds-blog](https://github.com/mohinpatell/mohinbuilds-blog). most of the interesting bits are in `src/layouts/Layout.astro` and `astro.config.mjs`.

## what's next

i'm vibe-coding a saas in parallel with this blog. the build log of that is what i want to write next. probably starting with the prompt that got the first feature working, and the part where it didn't.

[rss](/rss.xml). no email capture yet. i'll add one when i have something worth gating behind it.
