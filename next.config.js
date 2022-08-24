module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    disableStaticImages: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /(svg).*\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
