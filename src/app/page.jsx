'use client';
import { sosialLinks } from '@/utils/static';
import Image from 'next/image';
import Link from 'next/link';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TypeAnimation } from 'react-type-animation';
const Home = () => {
  console.log('test');
  return (
    <section className="flex items-center justify-between flex-col lg:flex-row">
      <div className="flex flex-col gap-5 lg:gap-10 mt-0 lg:mt-52">
        <h1 className="font-semibold">Hi ! I'm</h1>
        <TypeAnimation
          sequence={[
            'Website Developer', // Types 'One'
            2000,
            '',
            500,
            'Website Designer',
            2000,
            '',
          ]}
          speed={30}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="text-xl lg:text-6xl"
        />
        <h2 className="font-bold text-6xl"></h2>
        <p className="max-w-lg font-extralight leading-6">
          I am a Junior Web Developer who is used to developing innovative and responsive web applications using the latest technology. <br /> My main expertise lies in using React as a frontend framework and Node.js Express as a backend
          framework.
        </p>

        <div className="lg:absolute flex lg:flex-col gap-5  lg:left-20 left-5 bottom-52 self-start ">
          {sosialLinks.map((social) => {
            return (
              <a href={social.url} key={social.name} target="_blank" className="hover:scale-110">
                <Image src={social.image} height={30} width={30} alt={`${social.name} logo`} />
              </a>
            );
          })}
        </div>

        <Link href="/profile" className="font-bold text-white/100 text-3xl self-start flex flex-col items-center gap-2 z-20 " type="button">
          Explore
          <TiArrowSortedDown className="w-14 h-14 text-white animate-bounce " />
        </Link>
      </div>

      <div className="hidden 2xl:block">
        <Image src="/hero.png" height={500} width={500} alt="hero images" className=" absolute bottom-0 right-0 mr-24 -mb-20 " />
      </div>
    </section>
  );
};

export default Home;
