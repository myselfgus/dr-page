import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove 'output: export' - OpenNext handles the build
  // Remove experimental.runtime - OpenNext supports Node.js runtime
}

export default nextConfig

// Initialize OpenNext for local development
// This enables Cloudflare context during 'next dev'
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()
