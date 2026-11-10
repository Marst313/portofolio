import Image from 'next/image';
import { PiArrowUpRightLight, PiMediumLogoLight } from 'react-icons/pi';

import { getPosts, MEDIUM_PROFILE } from '@/utils/medium';

export const revalidate = 21600; // re-check Medium every 6 hours

export const metadata = {
  title: 'Blog',
  description: 'Articles by I Nyoman Dharma on self-hosting, Docker and web development, published on Medium.',
  alternates: { canonical: '/blog' },
};

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const PostMeta = ({ post }) => (
  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
    <time dateTime={post.date}>{formatDate(post.date)}</time>
    <span aria-hidden="true"> · </span>
    {post.readingTime} min read
  </p>
);

const Tags = ({ tags }) =>
  tags.length > 0 && (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70 ring-1 ring-white/[0.08]">
          {tag}
        </li>
      ))}
    </ul>
  );

const ReadLink = ({ post }) => (
  <a href={post.url} target="_blank" rel="noreferrer" className="btn-pill btn-pill-ember self-start">
    Read on Medium
    <span className="btn-pill-icon">
      <PiArrowUpRightLight className="h-4 w-4" />
    </span>
    <span className="sr-only">: {post.title}</span>
  </a>
);

const Blog = async () => {
  const posts = await getPosts();
  const [latest, ...rest] = posts;

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-40 pt-28 md:px-8 md:pt-36">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="animate-rise text-5xl font-bold leading-[0.95] tracking-tight [animation-delay:80ms] md:text-7xl xl:text-8xl">Blog</h1>
          <p className="mt-6 max-w-xl animate-rise text-sm font-extralight leading-relaxed text-white/60 [animation-delay:160ms] md:text-base">Notes on self-hosting, Docker and web development, written while building things.</p>
        </div>

        <a
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 animate-rise items-center gap-2 self-start rounded-full px-5 text-sm text-white/80 ring-1 ring-white/15 transition-all duration-500 ease-spring [animation-delay:200ms] hover:bg-white/[0.06] hover:text-white active:scale-[0.98] md:self-auto"
        >
          <PiMediumLogoLight className="h-5 w-5" />
          Follow on Medium
        </a>
      </div>

      <p className="mt-14 text-xs uppercase tracking-[0.2em] text-white/60 md:mt-20">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Latest post */}
        {latest && (
          <article className={`animate-rise rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.08] [animation-delay:240ms] ${rest.length ? 'lg:col-span-12' : 'lg:col-span-9'}`}>
            <div className="group grid h-full overflow-clip rounded-[calc(2rem-0.375rem)] bg-[#120909] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] md:grid-cols-2">
              {latest.image && (
                <a href={latest.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-clip md:aspect-auto md:min-h-[22rem]">
                  <Image src={latest.image} alt="" fill priority sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-spring group-hover:scale-[1.04]" />
                </a>
              )}
              <div className="flex flex-col gap-5 p-6 md:p-9">
                <PostMeta post={latest} />
                <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl">
                  <a href={latest.url} target="_blank" rel="noreferrer" className="transition-colors duration-500 ease-spring hover:text-ember-soft">
                    {latest.title}
                  </a>
                </h2>
                <p className="text-sm font-extralight leading-relaxed text-white/70 md:text-base">{latest.excerpt}</p>
                <Tags tags={latest.tags} />
                <div className="mt-auto pt-2">
                  <ReadLink post={latest} />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* With a single post, a follow card fills the row */}
        {rest.length === 0 && (
          <aside className="animate-rise rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.08] [animation-delay:300ms] lg:col-span-3">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[calc(2rem-0.375rem)] bg-[#120909] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <PiMediumLogoLight className="h-8 w-8 text-white/70" />
              <div>
                <h2 className="text-lg font-bold leading-snug">More posts are on the way</h2>
                <p className="mt-2 text-sm font-extralight leading-relaxed text-white/70">Follow on Medium to get the next article as soon as it&apos;s published.</p>
              </div>
              <a href={MEDIUM_PROFILE} target="_blank" rel="noreferrer" className="text-sm text-ember-soft underline underline-offset-4 hover:text-white">
                @dlegoinyoman1
              </a>
            </div>
          </aside>
        )}

        {/* Older posts */}
        {rest.map((post) => (
          <article key={post.id} className="reveal rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.08] lg:col-span-6">
            <div className="group flex h-full flex-col overflow-clip rounded-[calc(2rem-0.375rem)] bg-[#120909] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              {post.image && (
                <a href={post.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] overflow-clip">
                  <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition-transform duration-[1400ms] ease-spring group-hover:scale-[1.04]" />
                </a>
              )}
              <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                <PostMeta post={post} />
                <h2 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                  <a href={post.url} target="_blank" rel="noreferrer" className="transition-colors duration-500 ease-spring hover:text-ember-soft">
                    {post.title}
                  </a>
                </h2>
                <p className="line-clamp-3 text-sm font-extralight leading-relaxed text-white/70">{post.excerpt}</p>
                <Tags tags={post.tags} />
                <div className="mt-auto pt-2">
                  <ReadLink post={post} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
