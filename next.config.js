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
    strapi: "https://strapi.stlouisbombers.com/api",
    HOST_URL: "https://www.stlouisbombers.com",
  },
  images: {
    domains: [
      "s3-stlbombers-web.s3.us-east-2.amazonaws.com",
      "s3-stlbombers-web.s3.amazonaws.com",
    ],
  },
};
