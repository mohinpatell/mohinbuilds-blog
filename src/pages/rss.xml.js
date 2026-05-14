import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: 'mohinbuilds',
    description: "I'm Mohin and I'm building things.",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.publishDate,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
      })),
  });
}
