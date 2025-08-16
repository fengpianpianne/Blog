import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const posts: CollectionEntry<'posts'>[] = await getCollection(
    'posts',
    (entry: CollectionEntry<'posts'>) => !entry.data.draft,
  );
  posts.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime(),
  );

  return rss({
    title: '我的博客',
    description: '个人博客 RSS 订阅',
    site: context.site?.toString() || 'http://localhost:4321',
    items: posts.map((post: CollectionEntry<'posts'>) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      pubDate: new Date(post.data.publishDate),
    })),
  });
};
