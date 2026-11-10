import Image from 'next/image';
import { PiDownloadSimpleLight, PiGraduationCapLight, PiCodeLight } from 'react-icons/pi';

import { skillGroups } from '@/utils/static';

export const metadata = {
  title: 'Profile',
  description: 'About I Nyoman Karma Dharma Nalendra Wardana, a Computer Science student and web developer.',
};

const facts = [
  { Icon: PiGraduationCapLight, label: 'Studying', value: 'Computer Science, Amikom University Yogyakarta' },
  { Icon: PiCodeLight, label: 'Focus', value: 'React frontends, Node.js + Express backends' },
];

const Profile = () => {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-40 pt-28 md:px-8 md:pt-36">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Portrait */}
        <div className="mx-auto w-full max-w-[17rem] animate-rise sm:max-w-[22rem] lg:sticky lg:top-32 lg:col-span-5 lg:max-w-none">
          <div className="rounded-[2.5rem] bg-white/[0.03] p-2 ring-1 ring-white/[0.08]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-gradient-to-b from-[#1c0a09] to-[#120909] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <Image src="/heroProfile.webp" alt="I Nyoman Dharma at the summit of Mt. Sumbing" fill priority sizes="(min-width: 1024px) 440px, (min-width: 640px) 352px, 272px" className="object-cover" />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col lg:col-span-7">
          <h1 className="animate-rise text-4xl font-bold leading-[1.02] tracking-tight [animation-delay:80ms] md:text-6xl">
            I Nyoman Karma Dharma <span className="text-white/60">Nalendra Wardana</span>
          </h1>

          <div className="mt-6 flex max-w-xl animate-rise flex-col gap-4 text-sm font-extralight leading-relaxed text-white/65 [animation-delay:160ms] md:text-base">
            <p>I&apos;m a 20-year-old undergraduate pursuing a Bachelor&apos;s degree in Computer Science at Amikom University Yogyakarta, with a passion for creating innovative and user-friendly websites.</p>
            <p>My time at Amikom has given me a strong foundation in computer science and the skills to keep growing in the fast-moving field of web development.</p>
          </div>

          <ul className="mt-8 grid animate-rise grid-cols-1 gap-2 [animation-delay:220ms] sm:grid-cols-2">
            {facts.map(({ Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.08]">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ember-soft" />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">{label}</span>
                  <span className="mt-1 block text-sm leading-snug">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 animate-rise [animation-delay:280ms]">
            <a href="/assets/CV.pdf" download="CV-I-Nyoman-Dharma.pdf" className="btn-pill btn-pill-ember">
              Download CV
              <span className="btn-pill-icon">
                <PiDownloadSimpleLight className="h-4 w-4" />
              </span>
            </a>
          </div>

          {/* Skills + Tools */}
          {skillGroups.map((group) => (
            <div key={group.title} className="mt-14 first:mt-16">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{group.title}</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">{group.items.length}</span>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
                {group.items.map((skill) => (
                  <li key={skill.name} className="reveal">
                    <div className="group flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/[0.08] transition-all duration-500 ease-spring hover:bg-white/[0.06] hover:ring-white/[0.16] md:p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] transition-transform duration-500 ease-spring group-hover:scale-105">
                        <Image src={skill.images} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                      </span>
                      <span className="truncate text-sm">{skill.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
