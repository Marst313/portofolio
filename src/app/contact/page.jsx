import { PiArrowUpRightLight, PiEnvelopeSimpleLight, PiFacebookLogoLight, PiGithubLogoLight, PiInstagramLogoLight, PiLinkedinLogoLight } from 'react-icons/pi';

import ContactForm from '@/components/contact/ContactForm';
import CopyEmail from '@/components/contact/CopyEmail';
import { contactEmail, sosialLinks } from '@/utils/static';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with I Nyoman Dharma about a website, web app or collaboration.',
};

const channelMeta = {
  linkedin: { label: 'LinkedIn', handle: 'I Nyoman Karma Dharma', Icon: PiLinkedinLogoLight },
  github: { label: 'GitHub', handle: '@Marst313', Icon: PiGithubLogoLight },
  instagram: { label: 'Instagram', handle: '@inyoman_dharma', Icon: PiInstagramLogoLight },
  facebook: { label: 'Facebook', handle: 'dharmarst', Icon: PiFacebookLogoLight },
};

const Contact = () => {
  return (
    <>
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-4 pb-40 pt-28 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-12">
        {/* Left: editorial copy + channels */}
        <div className="flex flex-col lg:col-span-5">
          <h1 className="animate-rise text-5xl font-bold leading-[0.95] tracking-tight [animation-delay:80ms] md:text-7xl">
            Let&apos;s build
            <br />
            something
            <span className="text-ember"> good</span>
          </h1>

          <p className="mt-6 max-w-md animate-rise text-sm font-extralight leading-relaxed text-white/60 [animation-delay:160ms] md:text-base">
            Have a project, a role, or just an idea you want to talk through? Send a message and I&apos;ll get back to you by email.
          </p>

          {/* Primary channel */}
          <div className="mt-10 animate-rise rounded-[1.75rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.08] [animation-delay:240ms]">
            <div className="group relative flex items-center gap-4 rounded-[calc(1.75rem-0.375rem)] bg-[#120909] p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ember/15 text-ember-soft ring-1 ring-ember/30">
                <PiEnvelopeSimpleLight className="h-5 w-5" />
              </span>

              <a href={`mailto:${contactEmail}`} className="min-w-0 flex-1 after:absolute after:inset-0 after:rounded-[inherit] after:content-['']">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">Email</span>
                <span className="block truncate text-sm transition-colors duration-500 ease-spring group-hover:text-ember-soft md:text-base">{contactEmail}</span>
              </a>

              <CopyEmail email={contactEmail} />
            </div>
          </div>

          {/* Social channels */}
          <ul className="mt-3 grid animate-rise grid-cols-1 gap-2 [animation-delay:320ms] sm:grid-cols-2">
            {sosialLinks.map(({ name, url }) => {
              const meta = channelMeta[name];
              if (!meta) return null;
              const { Icon, label, handle } = meta;

              return (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl bg-white/[0.02] p-3 ring-1 ring-white/[0.06] transition-all duration-500 ease-spring hover:bg-white/[0.05] hover:ring-white/[0.14] active:scale-[0.98]"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-white/60 transition-colors duration-500 ease-spring group-hover:text-white" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs">{label}</span>
                      <span className="block truncate text-[11px] font-extralight text-white/60">{handle}</span>
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                      <PiArrowUpRightLight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: form in double-bezel */}
        <div className="animate-rise [animation-delay:200ms] lg:col-span-7 lg:pt-4">
          <div className="rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/[0.08]">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#120909] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] md:p-10">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Send a message</h2>
                  <p className="mt-2 text-sm font-extralight text-white/60">All three fields are needed so I can reply properly.</p>
                </div>
              </div>

              <ContactForm to={contactEmail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
