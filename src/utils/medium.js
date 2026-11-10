import { fallbackPosts } from '@/data/posts';

export const MEDIUM_PROFILE = 'https://medium.com/@dlegoinyoman1';
const FEED_URL = 'https://medium.com/feed/@dlegoinyoman1';

const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');

const stripTags = (html = '') =>
  decode(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : '';
};

// cdn-images-1.medium.com/max/N/... 301-redirects to miro.medium.com; link there directly.
const normalizeImage = (url) => url?.replace(/^https:\/\/cdn-images-1\.medium\.com\/max\/(\d+)\//, 'https://miro.medium.com/v2/resize:fit:$1/') ?? null;

// Medium subtitles often lack a full stop; add one so joined paragraphs read correctly.
const sentence = (text) => (/[.!?…:]$/.test(text) ? text : `${text}.`);

const truncate = (text, max) => (text.length > max ? `${text.slice(0, text.lastIndexOf(' ', max))}…` : text);

const parseFeed = (xml) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const content = pick(item, 'content:encoded');
    const url = pick(item, 'link').split('?')[0];
    const paragraphs = [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1])).filter(Boolean);
    const words = stripTags(content).split(' ').length;

    return {
      id: url.split('-').pop(),
      title: decode(pick(item, 'title')),
      url,
      date: new Date(pick(item, 'pubDate')).toISOString(),
      readingTime: Math.max(1, Math.round(words / 230)),
      excerpt: truncate(paragraphs.slice(0, 3).map(sentence).join(' '), 220),
      tags: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) => m[1]),
      image: normalizeImage(content.match(/<img[^>]+src="([^"]+)"/)?.[1]),
    };
  });

/** Latest Medium posts (server-only). Cached by Next for 6h; falls back to local copy. */
export const getPosts = async () => {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 60 * 60 * 6 }, headers: { 'User-Agent': 'Mozilla/5.0 (portfolio feed reader)' } });
    if (!res.ok) throw new Error(`Medium feed ${res.status}`);
    const posts = parseFeed(await res.text());
    return posts.length ? posts : fallbackPosts;
  } catch (error) {
    console.error('[getPosts]', error.message);
    return fallbackPosts;
  }
};
