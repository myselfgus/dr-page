import { defineCloudflareConfig } from "@opennextjs/cloudflare"

// Optional: Use R2 for incremental cache (uncomment if you have R2 bucket configured)
// import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

export default defineCloudflareConfig({
  // Uncomment to enable R2 incremental cache
  // incrementalCache: r2IncrementalCache,

  // Default configuration uses in-memory cache
  // This is suitable for most applications
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
})
