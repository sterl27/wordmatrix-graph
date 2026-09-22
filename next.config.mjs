/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // react-force-graph-3d pulls in three.js ESM that breaks SSR
  transpilePackages: ["react-force-graph-3d", "3d-force-graph", "three"],
};

export default nextConfig;
