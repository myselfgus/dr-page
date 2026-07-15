import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog-posts"

const BASE_URL = "https://drgustavomendes.com"

// Dinâmico: os posts vivem no D1 (indisponível no build). Renderizado a cada
// request, então conseguimos consultar o D1 e incluir cada artigo no sitemap.
// Se o D1 não estiver disponível (ex.: build), caímos nas rotas estáticas.
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/teleconsulta`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/domiciliar`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ]

  try {
    const posts = await getBlogPosts()
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }))
    return [...staticPages, ...postPages]
  } catch (error) {
    console.error("Falha ao gerar o sitemap dinâmico do blog:", error)
    return staticPages
  }
}
