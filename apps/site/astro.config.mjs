import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

// TODO: replace with the real domain once the owner registers it (see docs/open-questions.md).
const SITE = 'https://bhagwaticaterers.in';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    preact(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      i18n: {
        defaultLocale: 'mr',
        locales: { mr: 'mr-IN', en: 'en-IN', hi: 'hi-IN' },
      },
    }),
  ],
});
