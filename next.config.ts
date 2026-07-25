import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Leftover art-template routes from the v0 gallery — never reintroduce content.
  async redirects() {
    return [
      { source: "/artists", destination: "/", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/curriculum", destination: "/about", permanent: true },
    ]
  },
}

export default nextConfig

// Initialize OpenNext for local development
// This enables Cloudflare context during 'next dev'
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()
