/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 's.gravatar.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
