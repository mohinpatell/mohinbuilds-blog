import { defineConfig, passthroughImageService } from 'astro/config';

// Change `site` to your real domain once it's attached.
// Free Cloudflare Pages URL is `mohinbuilds.pages.dev` until then.
export default defineConfig({
  site: 'https://mohinbuilds.pages.dev',
  // Sitemap integration removed for now — @astrojs/sitemap was crashing on a
  // post-build hook with Astro 4.16. We can hand-roll a /sitemap.xml later or
  // pin a working sitemap version once we know which one.
  integrations: [],
  // Disable image optimization (which needs `sharp`). We don't use Astro's <Image />
  // component yet; this avoids pulling a heavy native dep + Node-version constraints.
  image: {
    service: passthroughImageService(),
  },
  build: {
    format: 'directory',
  },
});
