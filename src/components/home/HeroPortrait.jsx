'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Portrait with pointer parallax: glow, photo and name chip sit at different
 * depths and follow the mouse. Desktop (fine pointer) only; CSS disables it
 * for reduced-motion users.
 */
const HeroPortrait = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[22rem] animate-rise [animation-delay:200ms] lg:col-span-5 lg:max-w-none">
      <div className="depth rounded-[2.5rem] bg-white/[0.03] p-2 ring-1 ring-white/[0.08]" style={{ '--depth': -6 }}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-gradient-to-b from-[#2a0c0a] to-[#120909] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <div className="depth absolute inset-0" style={{ '--depth': 34 }} aria-hidden="true">
            <div className="absolute left-1/2 top-[38%] h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/25 blur-3xl" />
          </div>

          {/* Oversized so edges never show while it moves */}
          <div className="depth absolute -bottom-[5%] -left-[5%] -right-[5%] top-[2%]" style={{ '--depth': 14 }}>
            <Image src="/hero.png" alt="Portrait of I Nyoman Dharma" fill priority sizes="(min-width: 1024px) 480px, 384px" className="object-contain object-bottom" />
          </div>

          <div className="depth absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-black/55 px-4 py-2.5 text-xs ring-1 ring-white/10" style={{ '--depth': -12 }}>
            <span className="font-bold">I Nyoman Dharma</span>
            <span className="text-white/60">Web Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPortrait;
