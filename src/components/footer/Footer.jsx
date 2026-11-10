'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiArrowLeftLight, PiArrowRightLight } from 'react-icons/pi';

import { links } from '@/utils/static';

const Footer = () => {
  const path = usePathname();
  const index = Math.max(
    0,
    links.findIndex((item) => item.path === path),
  );
  const prev = links[(index - 1 + links.length) % links.length];
  const next = links[(index + 1) % links.length];

  const arrow = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/70 transition-all duration-500 ease-spring hover:bg-white/[0.08] hover:text-white active:scale-95';

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4 md:pb-6">
      <nav aria-label="Page navigation" className="pointer-events-auto flex items-center gap-1 rounded-full bg-[#0f0808]/70 p-1 ring-1 ring-white/10 backdrop-blur-xl">
        <Link href={prev.path} aria-label={`Previous page: ${prev.title}`} className={arrow}>
          <PiArrowLeftLight className="h-4 w-4" />
        </Link>

        {/* Mobile: compact label */}
        <span className="min-w-[7.5rem] px-2 text-center text-xs md:hidden">
          <span className="tabular-nums text-white/60">
            0{index + 1} / 0{links.length}
          </span>{' '}
          <span className="text-white">{links[index].title}</span>
        </span>

        {/* Desktop: dots */}
        <div className="hidden items-center px-1 md:flex">
          {links.map((link) => {
            const active = path === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                aria-label={link.title}
                aria-current={active ? 'page' : undefined}
                title={link.title}
                className="group flex h-10 min-w-[1.5rem] items-center justify-center px-1"
              >
                {/* 24px+ tap target; the visible dot stays small */}
                <span className={`block h-2 rounded-full transition-all duration-500 ease-spring ${active ? 'w-8 bg-ember' : 'w-2 bg-white/30 group-hover:bg-white/70'}`} />
              </Link>
            );
          })}
        </div>

        <Link href={next.path} aria-label={`Next page: ${next.title}`} className={arrow}>
          <PiArrowRightLight className="h-4 w-4" />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
