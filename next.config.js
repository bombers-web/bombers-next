// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  compiler: {
    styledComponents: true,
  },
  // largePageDataBytes: 135,
  env: {
    strapi: process.env.NEXT_PUBLIC_STRAPI_URL,
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
  },
  images: {
    domains: [
      "s3-stlbombers-web.s3.us-east-2.amazonaws.com",
      "s3-stlbombers-webF.s3.amazonaws.com",
    ],
  },
};
