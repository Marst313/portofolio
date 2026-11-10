import Link from 'next/link';
import { PiArrowLeftLight } from 'react-icons/pi';

const NotFound = () => {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-center px-4 pb-32 pt-28 md:px-8">
      <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">Page not found</h1>
      <p className="mt-5 max-w-md text-sm font-extralight leading-relaxed text-white/60 md:text-base">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-pill btn-pill-ember mt-8 self-start">
        Back to home
        <span className="btn-pill-icon">
          <PiArrowLeftLight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
