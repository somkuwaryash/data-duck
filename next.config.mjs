/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js

// module.exports = {
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.resolve.fallback = {
//           ...config.resolve.fallback,
//           fs: false,
//           stream: require.resolve('stream-browserify'),
//           zlib: require.resolve('browserify-zlib'),
//         };
//       }
//       return config;
//     },
//   };

export default nextConfig;
