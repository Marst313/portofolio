import './style/globals.css';
import './style/component.css';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Background from '@/components/background/Background';
import Particle from '@/components/particle/Particle';
import localFont from 'next/font/local';

const cascadia = localFont({
  src: [
    {
      path: './style/fonts/CascadiaCode-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './style/fonts/CascadiaCode-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './style/fonts/CascadiaCode-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata = {
  title: 'I Nyoman Dharma',
  description: 'Portofolio Created With Next Js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cascadia.className}>
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
