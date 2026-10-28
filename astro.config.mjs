// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical production domain (used by <link rel="canonical"> and the sitemap)
  site: 'https://otodriveafrica.com',

  // Emit /about.html instead of /about/index.html.
  // This keeps every existing URL identical, so no search ranking is lost.
  build: { format: 'file' },

  integrations: [sitemap()],

  devToolbar: { enabled: false },
});
