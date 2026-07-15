import type { MetadataRoute } from "next"

const BASE_URL = "https://drgustavomendes.com"

// NOTE: Blog posts now live in Cloudflare D1, which is NOT available during
// `next build`. To keep the build green and avoid querying D1 at build time,
// the sitemap only emits static routes (including the /blog index). Individual
// post URLs are discoverable via the /blog listing and are indexed from there.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/teleconsulta`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/domiciliar`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ]

  return staticPages
}
