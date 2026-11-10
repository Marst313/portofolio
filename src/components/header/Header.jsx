'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PiArrowUpRightLight } from 'react-icons/pi';

import { contactEmail, links, sosialLinks } from '@/utils/static';

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-6">
        <div className="flex w-full max-w-6xl items-center justify-between gap-6 rounded-full bg-[#0f0808]/70 p-1.5 pl-5 ring-1 ring-white/10 backdrop-blur-xl md:w-max md:max-w-none md:pl-6">
          <Link href="/" className="flex items-baseline gap-2 whitespace-nowrap text-sm font-bold tracking-tight">
            I Nyoman Dharma
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-500 ease-spring ${active ? 'bg-white text-[#140808]' : 'text-white/60 hover:bg-white/[0.06] hover:text-white'}`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle: lines morph into an X */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-transform duration-500 ease-spring active:scale-95 md:hidden"
          >
            <span className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-spring ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
            <span className={`absolute h-px w-5 bg-white transition-transform duration-500 ease-spring ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-30 flex flex-col bg-[#0a0606]/85 px-6 pb-10 pt-28 backdrop-blur-2xl transition-opacity duration-500 ease-spring md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((link, i) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                tabIndex={open ? 0 : -1}
                aria-current={active ? 'page' : undefined}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                className={`flex items-baseline gap-4 border-b border-white/[0.06] py-5 transition-all duration-700 ease-spring ${open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                <span className="text-xs tabular-nums text-white/60">0{i + 1}</span>
                <span className={`text-4xl font-bold tracking-tight ${active ? 'text-ember' : 'text-white'}`}>{link.title}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ transitionDelay: open ? '380ms' : '0ms' }} className={`mt-auto flex flex-col gap-4 transition-all duration-700 ease-spring ${open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <a href={`mailto:${contactEmail}`} tabIndex={open ? 0 : -1} className="truncate text-sm text-white/70">
            {contactEmail}
          </a>
          <div className="flex flex-wrap gap-2">
            {sosialLinks.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-2 text-xs capitalize text-white/70 ring-1 ring-white/10">
                {s.name}
                <PiArrowUpRightLight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
