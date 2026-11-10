import Link from 'next/link';
import { PiArrowUpRightLight, PiFacebookLogoLight, PiGithubLogoLight, PiInstagramLogoLight, PiLinkedinLogoLight } from 'react-icons/pi';

import HeroPortrait from '@/components/home/HeroPortrait';
import TypeRole from '@/components/home/TypeRole';
import { sosialLinks } from '@/utils/static';

const socialIcons = {
  linkedin: PiLinkedinLogoLight,
  github: PiGithubLogoLight,
  facebook: PiFacebookLogoLight,
  instagram: PiInstagramLogoLight,
};

const Home = () => {
  return (
    <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-32 pt-28 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-10">
      {/* Copy */}
      <div className="flex flex-col lg:col-span-7">
        <h1 className="animate-rise text-[2.75rem] font-bold leading-[0.98] tracking-tight [animation-delay:80ms] sm:text-6xl xl:text-7xl">
          Hi, I&apos;m
          <br />I Nyoman Dharma
        </h1>

        <p className="mt-5 h-8 animate-rise text-lg text-ember-soft [animation-delay:140ms] md:h-10 md:text-2xl">
          <TypeRole />
        </p>

        <p className="mt-4 max-w-lg animate-rise text-sm font-extralight leading-relaxed text-white/60 [animation-delay:200ms] md:text-base">
          A junior web developer building innovative, responsive web apps. I work mainly with React on the frontend and Node.js with Express on the backend.
        </p>

        <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:260ms]">
          <Link href="/project" className="btn-pill btn-pill-ember">
            View projects
            <span className="btn-pill-icon">
              <PiArrowUpRightLight className="h-4 w-4" />
            </span>
          </Link>
          <Link href="/contact" className="inline-flex h-11 items-center rounded-full px-5 text-sm text-white/80 ring-1 ring-white/15 transition-all duration-500 ease-spring hover:bg-white/[0.06] hover:text-white active:scale-[0.98]">
            Get in touch
          </Link>
        </div>

        <ul className="mt-10 flex animate-rise items-center gap-2 [animation-delay:320ms]" aria-label="Social links">
          {sosialLinks.map(({ name, url }) => {
            const Icon = socialIcons[name];
            return (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] text-white/65 ring-1 ring-white/10 transition-all duration-500 ease-spring hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-white"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <HeroPortrait />
    </div>
  );
};

export default Home;
