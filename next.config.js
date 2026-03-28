/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // required for static export
  },
  // Cloudflare Pages: deploy the `out/` directory (not `.next`).
  // See wrangler.toml and README deployment notes.
  output: "export",
};

module.exports = nextConfig;
