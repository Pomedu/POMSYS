/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/lectures",
        permanent: false
      },
      {
        source: "/",
        destination: "/client",
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
