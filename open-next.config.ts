import { defineCloudflareConfig } from "@opennextjs/cloudflare"

export default {
  ...defineCloudflareConfig(),
  buildCommand: "pnpm exec next build --webpack",
}
