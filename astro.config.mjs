import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO: 将下面的站点地址改为你的实际域名，例如 https://blog.example.com
export default defineConfig({
  site: 'fengpianpian.dpdns.org',
  integrations: [mdx(), tailwind({ applyBaseStyles: true }), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
