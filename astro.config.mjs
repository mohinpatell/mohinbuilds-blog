import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to your real domain once it's attached.
// Free Cloudflare Pages URL is `mohinbuilds.pages.dev` until then.
export default defineConfig({
  site: 'https://mohinbuilds.pages.dev',
  integrations: [sitemap()],
  // Disable image optimization (which needs `sharp`). We don't use Astro's <Image />
  // component yet; this avoids pulling a heavy native dep + Node-version constraints.
  image: {
    service: passthroughImageService(),
  },
  build: {
    format: 'directory',
  },
});
