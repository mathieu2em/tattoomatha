/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "scontent.cdninstagram.com",
      "p16-sign.tiktokcdn-us.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
