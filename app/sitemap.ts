import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog-posts"
import { CONDITION_LANDINGS } from "@/lib/condition-landings"

const BASE_URL = "https://drgustavomendes.com"

export const revalidate = 600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/teleconsulta`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/domiciliar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...CONDITION_LANDINGS.map((c) => ({
      url: `${BASE_URL}${c.path}`,
      lastModified: now,
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
