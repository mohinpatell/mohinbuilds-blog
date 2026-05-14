import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to your real domain once it's attached.
// Free Cloudflare Pages URL is `mohinbuilds.pages.dev` until then.
export default defineConfig({
  site: 'https://mohinbuilds.pages.dev',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
