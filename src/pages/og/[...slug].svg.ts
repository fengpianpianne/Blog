import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((p) => ({ params: { slug: p.slug.split('/') }, props: { post: p } }));
}

export async function GET({ props }) {
  const post = props.post;
  const title = post.data.title ?? 'Post';
  const site = '我的博客';
  const width = 1200;
  const height = 630;
  // Simple SVG template; safe for most crawlers (some platforms prefer PNG/JPG)
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="100%" stop-color="#2563eb"/>
      </linearGradient>
      <style>
        .title { font: 700 64px system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial; fill: #fff; }
        .site { font: 600 28px system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial; fill: #e5e7eb; }
      </style>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" rx="24"/>
    <text x="60" y="120" class="site">${site}</text>
    <foreignObject x="60" y="160" width="1080" height="410">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color:#fff; font:700 64px/1.15 system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial;">
        ${escapeHtml(title)}
      </div>
    </foreignObject>
  </svg>`;
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
