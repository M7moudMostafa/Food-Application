/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
    outputFileTracingIncludes: {
      // Ensure sqlite database file is uploaded with the server output
      '/lib/meals.js': ['meals.db'],
      '/app/meals/**': ['meals.db'],
    },
  },
  webpack: (config) => {
    // Ensure native addon for better-sqlite3 is bundled for server runtime
    config.externals = config.externals || [];
    return config;
  },
}

export default nextConfig;
