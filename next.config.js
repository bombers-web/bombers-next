// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  compiler: {
    styledComponents: true,
  },
  env: {
    strapi: process.env.NEXT_PUBLIC_STRAPI_URL,
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-stlbombers-web.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3-stlbombers-webF.s3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
