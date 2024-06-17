module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /(svg).*\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    PORT: process.env.PORT || 3000,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    PORT: process.env.PORT || 3000,
  },
};
