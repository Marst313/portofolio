'use client';
import { getRotationClass } from '@/utils/function';
import { skills } from '@/utils/static';
import Image from 'next/image';
import { MdFileDownload } from 'react-icons/md';

const Profile = () => {
  const handleClick = () => {
    window.location.href = '/assets/KTM.pdf';
  };

  return (
    <section className="flex justify-between lg:mt-5 ">
      <div className="absolute top-56 left-0  flex-col hidden lg:flex">
        <h1 className="self-end">Skill</h1>

        <ul className="skills">
          {skills.map((skill, index) => {
            const variants = {
              0: 'rotate-[36deg]',
              1: 'rotate-[72deg]',
              2: 'rotate-[108deg]',
              3: 'rotate-[144deg]',
              4: 'rotate-[180deg]',
              5: 'rotate-[216deg]',
              6: 'rotate-[252deg]',
              7: 'rotate-[288deg]',
              8: 'rotate-[324deg]',
              9: 'rotate-[360deg]',
            };

            return (
              <li key={skill.name} className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom ${variants[index]}`}>
                <Image src={skill.images} width={50} height={50} alt={skill.name} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hidden 2xl:block">
        <Image src="/heroProfile.png" height={650} width={650} alt="hero images" className=" absolute bottom-0 left-0 ml-64  " />
      </div>

      <div className="max-w-lg  flex flex-col gap-5">
        <h1 className="text-lg lg:text-5xl font-semibold leading-relaxed mb-5">I Nyoman Karma Dharma Nalendra Wardana</h1>
        <p className="text-sm leading-relaxed">
          I am a 20-year-old undergraduate student pursuing a Bachelor's degree in Computer Science at Amikom University Yogyakarta. With a passion for web development, I am enthusiastic about exploring the intricacies of creating
          innovative and user-friendly websites. My academic journey at Amikom has equipped me with a strong foundation in computer science, providing me with the skills and knowledge necessary to excel in the dynamic field of web
          development.
        </p>
        <a href="/assets/CV.pdf" download="CV.pdf" className="z-50 flex flex-col items-center mt-5 gap-2 text-4xl font-semibold">
          <button type="button">Download CV</button>
          <MdFileDownload className="w-6 h-6 " />
        </a>
      </div>
    </section>
  );
};

export default Profile;
