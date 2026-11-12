import Image from 'next/image';
import { PiArrowUpRightLight, PiGithubLogoLight } from 'react-icons/pi';

const SIZES = {
  featured: '(min-width: 1024px) 1600px, 100vw',
  wide: '(min-width: 1152px) 640px, (min-width: 1024px) 58vw, 100vw',
  default: '(min-width: 1152px) 560px, (min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw',
};

const ProjectCard = ({ project, featured = false, priority = false, delay = 0, className = '' }) => {
  const { name, type, description, stack, demo, code, image, imagePosition } = project;

  const wide = className.includes('lg:col-span-12');
  const variant = featured ? 'featured' : wide ? 'wide' : 'default';

  const mediaClass = {
    featured: 'aspect-[16/10] grow lg:aspect-auto lg:min-h-[22rem]',
    wide: 'aspect-[16/10] lg:aspect-auto lg:min-h-[20rem] lg:w-7/12 lg:flex-none',
    // grow (basis auto) keeps the 16:10 minimum but absorbs extra row height, so text + buttons stay together.
    default: 'aspect-[16/10] grow',
  }[variant];

  return (
    // Above-the-fold cards animate on load; the rest fade up on scroll (pure CSS, no JS needed).
    <li style={priority ? { animationDelay: `${delay}ms` } : undefined} className={`${priority ? 'animate-rise' : 'reveal'} ${className}`}>
      {/* Outer shell */}
      <article className="group h-full rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.08] transition-[transform,box-shadow] duration-700 ease-spring hover:-translate-y-1 hover:ring-white/[0.16]">
        {/* Inner core */}
        <div className={`flex h-full flex-col overflow-clip rounded-[calc(2rem-0.375rem)] bg-[#120909] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] ${wide ? 'lg:flex-row' : ''}`}>
          <div className={`relative overflow-clip bg-white/[0.02] ${mediaClass}`}>
            {image ? (
              // Parallax layer: taller than the frame, drifts against the scroll (pure CSS).
              <div className="parallax-media absolute inset-x-0 -bottom-[8%] -top-[8%]">
                <Image
                  src={image.src}
                  alt={`${name} screenshot`}
                  fill
                  sizes={SIZES[variant]}
                  priority={priority}
                  className={`object-cover ${featured ? (imagePosition ?? 'object-center') : 'object-top'} transition-transform duration-[1400ms] ease-spring group-hover:scale-[1.04]`}
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/60">No preview</div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#120909] to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/85 ring-1 ring-white/15">{type}</span>
          </div>

          <div className={`flex flex-col gap-4 p-6 md:p-7 ${wide ? 'flex-1' : 'flex-none'} ${featured ? 'lg:p-9' : ''}`}>
            <h2 className={`font-bold leading-tight tracking-tight ${featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{name}</h2>

            <p className={`text-sm font-extralight leading-relaxed text-white/60 ${featured ? 'line-clamp-3 md:text-base' : 'line-clamp-2'}`}>{description}</p>

            {stack.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                {stack.map((item) => (
                  <li key={item} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65 ring-1 ring-white/[0.08]">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {(demo || code) && (
              <div className="mt-auto flex items-center gap-2 pt-3">
                {demo && (
                  <a href={demo} target="_blank" rel="noreferrer" className="btn-pill group/btn">
                    View live
                    <span className="btn-pill-icon">
                      <PiArrowUpRightLight className="h-4 w-4" />
                    </span>
                  </a>
                )}

                {code && (
                  <a
                    href={code}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} source code on GitHub`}
                    title="Source code"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] text-white/70 ring-1 ring-white/10 transition-all duration-500 ease-spring hover:bg-white/[0.08] hover:text-white active:scale-95"
                  >
                    <PiGithubLogoLight className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProjectCard;
