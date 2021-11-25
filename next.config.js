/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
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
  webpack: (config, { isServer }) => {
    if(!isServer) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        }
      }))
    }
    // Important: return the modified config
    return config
  },
}
