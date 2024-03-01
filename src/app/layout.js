import './css/globals.css';
import './css/component.css';

import Cascadia_Code from 'next/font/local';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Background from '@/components/background/Background';
import Particle from '@/components/particle/Particle';

const inter = Cascadia_Code({ src: './font/Cascadia_code.ttf' });

export const metadata = {
  title: 'I Nyoman Dharma',
  description: 'Portofolio Created With Next Js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Particle />

        <Background />

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
