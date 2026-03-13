/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // for Cloudflare Pages static export if needed
  },
  // Cloudflare Pages: use static export or @cloudflare/next-on-pages for full SSR
  // output: 'export', // uncomment for static-only deployment
};

module.exports = nextConfig;
