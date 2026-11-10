import { links, siteUrl } from '@/utils/static';

export default function sitemap() {
  return links.map((link) => ({
    url: `${siteUrl}${link.path === '/' ? '' : link.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: link.path === '/' ? 1 : 0.8,
  }));
}
