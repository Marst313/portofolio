/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // 480 fills the gap between 384 and 640 so ~272px-wide mobile images get a close match.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480],
    // Medium article cover images (blog page)
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
      { protocol: 'https', hostname: 'miro.medium.com' },
    ],
  },
};

export default nextConfig;
