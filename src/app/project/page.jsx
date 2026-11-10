import Content from './Content';
import VolcanoLazy from '@/components/volcano/VolcanoLazy';
import { projects } from '@/data/projects';

export const metadata = {
  title: 'Projects',
  description: 'Landing pages, web apps and online stores designed and built by I Nyoman Dharma.',
};

const Project = () => {
  return (
    <>
      <VolcanoLazy />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-40 pt-28 md:px-8 md:pt-36">
        <div>
          <h1 className="animate-rise text-5xl font-bold leading-[0.95] tracking-tight [animation-delay:80ms] md:text-7xl xl:text-8xl">Projects</h1>

          <p className="mt-6 max-w-xl animate-rise text-sm font-extralight leading-relaxed text-white/60 [animation-delay:160ms] md:text-base">
            Landing pages, web apps and online stores I&apos;ve designed and built, from the first sketch to production.
          </p>
        </div>

        <Content projects={projects} />
      </div>
    </>
  );
};

export default Project;
