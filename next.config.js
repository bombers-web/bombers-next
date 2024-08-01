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
    strapi: "https://bombers-backend.herokuapp.com/api",
    HOST_URL: "https://www.stlouisbombers.com",
  },
  images: {
    domains: ["bombers.s3.us-east-1.amazonaws.com", "bombers.s3.amazonaws.com"],
  },
};
