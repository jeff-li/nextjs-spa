/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    // released in Next.js 9.5: allows you to  map an incoming request path to a different 
    // destination path, including external URLs.
    // Rewrites are applied after checking the filesystem (pages and /public files) and 
    // before dynamic routes by default. To change this behavior, return an object instead.
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
}
