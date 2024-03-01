'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosClose } from 'react-icons/io';

import { links } from '@/utils/static';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <nav
      className={`${
        sidebarOpen ? 'flex' : 'hidden md:flex'
      }  gap-6 flex-col text-center absolute left-0 top-0 bg-black/30 backdrop-blur-sm h-screen w-screen pt-[25%] md:h-auto md:bg-transparent md:backdrop-blur-none md:relative md:pt-0 md:flex-row md:w-auto  z-10`}
    >
      {links.map((link) => {
        return (
          <Link className={`${pathname === link.path ? 'border-b-2 ' : 'text-white/60 md:hover:scale-105 hover:text-white'} p-3 `} href={link.path} key={link.title}>
            {link.title}
          </Link>
        );
      })}

      <button className="md:hidden" type="button" onClick={() => setSidebarOpen(false)}>
        <IoIosClose className="w-14 h-14 absolute top-2 right-2" />
      </button>
    </nav>
  );
};

export default Navbar;
