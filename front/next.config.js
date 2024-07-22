import withPWAInit from "next-pwa"

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/], // Exclude files that shouldn't be precached
  // If needed, you can specify workbox options directly here:
  // workboxOpts: {
  //   // Your workbox options
  // }
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Other Next.js config options
}

export default withPWA(nextConfig)
