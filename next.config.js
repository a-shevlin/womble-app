/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const { hostname } = require('os');

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true
  }),
  images: {
    remotePatterns: [
      {  
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        // pathname: '/assets/**',
      }
    ]
  }
}

module.exports = nextConfig