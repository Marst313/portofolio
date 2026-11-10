export const links = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Profile',
    path: '/profile',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: 'Project',
    path: '/project',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
];

export const sosialLinks = [
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/i-nyoman-karma-dharma-nalendra-wardana/',
    image: '/sosial/linkedin.svg',
  },
  {
    name: 'github',
    url: 'https://github.com/Marst313',
    image: '/sosial/github.svg',
  },
  {
    name: 'facebook',
    url: 'https://web.facebook.com/dharmarst',
    image: '/sosial/facebook.svg',
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/inyoman_dharma/',
    image: '/sosial/instagram.svg',
  },
];

export const typeWeb = [
  {
    name: 'All',
  },
  {
    name: 'Landing Page',
  },
  {
    name: 'Web App',
  },
  {
    name: 'Online Store',
  },
];

// Skill groups shown on /profile. `icon` maps to /public/assets/skills/<icon>.svg
const item = (name, icon) => ({ name, images: `/assets/skills/${icon}.svg` });

export const skillGroups = [
  {
    title: 'Languages',
    items: [item('HTML', 'html'), item('CSS', 'css'), item('JavaScript', 'javascript'), item('Node.js', 'nodejs'), item('Golang', 'golang'), item('PHP', 'php')],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      item('React', 'react'),
      item('Next.js', 'nextjs'),
      item('Vue', 'vue'),
      item('Angular', 'angular'),
      item('Express', 'express'),
      item('Laravel', 'laravel'),
      item('Gin', 'gin'),
      item('Redux', 'redux'),
      item('Tailwind CSS', 'tailwindcss'),
      item('Bootstrap', 'bootstrap'),
    ],
  },
  {
    title: 'Databases',
    items: [item('MySQL', 'mysql'), item('PostgreSQL', 'postgresql'), item('MongoDB', 'mongodb')],
  },
  {
    title: 'Tools',
    items: [item('Docker', 'docker'), item('Linux', 'linux'), item('Nginx', 'nginx'), item('Postman', 'postman')],
  },
];

export const contactEmail = 'dlegoinyoman1@gmail.com';

// Production URL, used for canonical links, Open Graph and the sitemap.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portofolio-marst313.vercel.app';
