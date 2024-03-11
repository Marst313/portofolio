'use client';

import { links } from '@/utils/static';
import next from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { GoArrowRight, GoArrowLeft } from 'react-icons/go';

const Footer = () => {
  const path = usePathname();
  const router = useRouter();

  const handleNextPage = () => {
    let currentPathIndex = links.findIndex((item) => item.path === path) + 1;

    if (currentPathIndex === links.length) currentPathIndex = 0;
    const newPath = links[currentPathIndex].path;

    // GO TO NEXT PATH
    router.push(newPath);
  };

  const handlePreviousPage = () => {
    let currentPathIndex = links.findIndex((item) => item.path === path) - 1;

    if (currentPathIndex < 0) currentPathIndex = links.length - 1;
    const newPath = links[currentPathIndex].path;

    console.log(currentPathIndex);
    // GO TO PREVIOUS PATH
    router.push(newPath);
  };

  return (
    <footer>
      <section className="fixed bottom-5 lg:bottom-10 p-0 flex w-full justify-start scroll-pt-52">
        {/* Arrow Button */}
        <div className="flex gap-7 w-[45%]">
          <button type="button" onClick={handlePreviousPage}>
            <GoArrowLeft className="h-8 w-8 hover:scale-105 transition-all bg-black/50 " />
          </button>

          <button type="button" onClick={handleNextPage}>
            <GoArrowRight className="h-8 w-8 hover:scale-105 bg-black/50 " />
          </button>
        </div>

        {/* Dots */}
        <div className="gap-5 hidden md:flex ">
          {links.map((link) => {
            return <Link key={link.title} href={link.path} className={`${path === link.path ? 'w-14 bg-white' : 'bg-white/70 hover:scale-110 hover:bg-white w-3.5 '} h-3.5 rounded-full transition-all duration-500`}></Link>;
          })}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
