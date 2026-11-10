'use client';

import { useEffect, useState } from 'react';
import { PiCheckLight, PiCopyLight } from 'react-icons/pi';

const CopyEmail = ({ email }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      title={copied ? 'Copied' : 'Copy email'}
      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/70 ring-1 ring-white/10 transition-all duration-500 ease-spring hover:bg-white/10 hover:text-white active:scale-95"
    >
      <span className={`absolute transition-all duration-500 ease-spring ${copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
        <PiCopyLight className="h-4 w-4" />
      </span>
      <span className={`absolute text-ember-soft transition-all duration-500 ease-spring ${copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <PiCheckLight className="h-4 w-4" />
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
};

export default CopyEmail;
