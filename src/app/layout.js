import './style/globals.css';
import './style/component.css';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Background from '@/components/background/Background';
import Particle from '@/components/particle/Particle';
import { siteUrl } from '@/utils/static';
import localFont from 'next/font/local';

// Latin-subset WOFF2 (~28KB each, was ~190KB TTF). The metric-matched
// "Cascadia Fallback" (globals.css) keeps line breaks identical while the
// font loads, so text doesn't reflow (no layout shift).
const cascadia = localFont({
  src: [
    { path: './style/fonts/CascadiaCode-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: './style/fonts/CascadiaCode-Regular.woff2', weight: '400', style: 'normal' },
    { path: './style/fonts/CascadiaCode-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Cascadia Fallback', 'ui-monospace', 'monospace'],
});

const description = 'I Nyoman Dharma is a web developer from Yogyakarta building responsive web apps with React, Node.js, Express and Go. See projects, skills and how to get in touch.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'I Nyoman Dharma | Web Developer',
    template: '%s | I Nyoman Dharma',
  },
  description,
  applicationName: 'I Nyoman Dharma Portfolio',
  authors: [{ name: 'I Nyoman Dharma', url: siteUrl }],
  creator: 'I Nyoman Dharma',
  keywords: ['I Nyoman Dharma', 'web developer', 'React developer', 'Next.js', 'Node.js', 'Golang', 'Yogyakarta', 'portfolio'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'I Nyoman Dharma',
    title: 'I Nyoman Dharma | Web Developer',
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'I Nyoman Dharma, web developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I Nyoman Dharma | Web Developer',
    description,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#0a0606',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cascadia.className}>
      <body>
        <div className="page-glow" aria-hidden="true" />

        <Particle />

        <Background />

        <Header />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
