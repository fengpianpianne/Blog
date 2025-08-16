import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// SITE must be a fully qualified URL (e.g., https://your-domain). If invalid/missing, we omit it.
const raw = process.env.SITE?.trim();
let site; try { if (raw) { site = new URL(raw).toString(); } } catch {}

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
