/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['source.unsplash.com'],
  },
  experimental: {
    middlewarePrefetch: true,
  },
  async redirects() {
    return [
      {
        source: '/resume',
        has: [{ type: 'host', value: 'ffzanini.dev' }],
        destination: 'https://resume.ffzanini.dev',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
