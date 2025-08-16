import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Configure site URL via env: set SITE=https://your-domain in Cloudflare Pages (Preview/Production)
const site = process.env.SITE;

export default defineConfig({
  ...(site ? { site } : {}),
  integrations: [mdx(), tailwind({ applyBaseStyles: true }), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
