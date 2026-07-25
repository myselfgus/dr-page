import { getBlogPost } from "@/lib/blog-posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostClient from "./_client"
import { StructuredData } from "@/components/blocks/StructuredData"
import { buildArticleJsonLd } from "@/lib/structured-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DEFAULT_BRAND, DEFAULT_CONTACT, DEFAULT_NAV } from "@/lib/site-config"

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

  const url = `https://drgustavomendes.com/blog/${post.slug}`
  const title = `${post.title} | Dr. Gustavo Mendes`
  return {
    title: { absolute: title },
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url,
      siteName: "Dr. Gustavo Mendes - Psiquiatra",
      locale: "pt_BR",
      images: [
        {
          url: "https://drgustavomendes.com/og-image.jpg",
          width: 1024,
          height: 1024,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://drgustavomendes.com/og-image.jpg"],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const article = buildArticleJsonLd(post)

  return (
    <>
      <StructuredData items={[article]} />
      <Header nav={DEFAULT_NAV} brand={DEFAULT_BRAND} contact={DEFAULT_CONTACT} />
      <BlogPostClient post={post} />
      <Footer contact={DEFAULT_CONTACT} nav={DEFAULT_NAV} brand={DEFAULT_BRAND} />
    </>
  )
}
