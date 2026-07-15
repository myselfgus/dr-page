import { getBlogPost } from "@/lib/blog-posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostClient from "./_client"

// Blog content lives in D1, which is unavailable during `next build`.
// Render on demand so posts are fetched at request time.
export const dynamic = "force-dynamic"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Artigo não encontrado",
    }
  }

  return {
    title: `${post.title} - Dr. Gustavo Mendes e Silva`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
