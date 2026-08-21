import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog-posts"
import { CONDITION_LANDINGS } from "@/lib/condition-landings"
import { NEURO_NAV } from "@/lib/neuro-portal"

const BASE_URL = "https://drgustavomendes.com"

export const revalidate = 600

// Keep <lastmod> truthful: Google uses it only when it reflects a real,
// significant update. The homepage changed with the latest public reviews.
const HOME_LAST_MODIFIED = new Date("2026-08-21")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/teleconsulta`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/domiciliar`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...NEURO_NAV.map((n) => ({
      url: `${BASE_URL}${n.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    ...CONDITION_LANDINGS.map((c) => ({
      url: `${BASE_URL}${c.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ]

  try {
    const posts = await getBlogPosts()
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    }))
    return [...staticPages, ...postPages]
  } catch (error) {
    console.error("Falha ao gerar o sitemap dinâmico do blog:", error)
    return staticPages
  }
}
