'use client';
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';
import { useState } from 'react';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header>
      <button className="hover:scale-105 md:hidden" onClick={() => setSidebarOpen(true)}>
        <Image src="/Hamburger.png" className="w-5 h-5" height={20} width={20} alt="Your Name" />
      </button>
      <div>
        <h1 className="header-title">I Nyoman Dharma</h1>
        <p>Portofolio</p>
      </div>

      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </header>
  );
};

export default Header;
