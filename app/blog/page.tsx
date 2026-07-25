import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPosts } from "@/lib/blog-posts"
import { DEFAULT_BRAND, DEFAULT_CONTACT, DEFAULT_NAV } from "@/lib/site-config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Blog de Psiquiatria | Dr. Gustavo Mendes e Silva" },
  description:
    "Artigos e reflexões do Dr. Gustavo Mendes e Silva (CRM 218133/SP) sobre psiquiatria, fenomenologia, psicopatologia e saúde mental.",
  keywords: [
    "blog psiquiatria",
    "artigos psiquiatria",
    "saúde mental",
    "fenomenologia",
    "psicopatologia",
    "dr gustavo mendes",
  ],
  alternates: { canonical: "https://drgustavomendes.com/blog" },
  openGraph: {
    title: "Blog de Psiquiatria | Dr. Gustavo Mendes e Silva",
    description: "Artigos e reflexões sobre psiquiatria e saúde mental.",
    url: "https://drgustavomendes.com/blog",
    siteName: "Dr. Gustavo Mendes - Psiquiatra",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://drgustavomendes.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog — Dr. Gustavo Mendes e Silva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Psiquiatria | Dr. Gustavo Mendes",
    description: "Artigos e reflexões sobre psiquiatria e saúde mental.",
    images: ["https://drgustavomendes.com/og-image.jpg"],
  },
}

// ISR — lista de posts muda com pouca frequência
export const revalidate = 600

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-background">
      <Header nav={DEFAULT_NAV} brand={DEFAULT_BRAND} contact={DEFAULT_CONTACT} />

      <div className="container mx-auto px-4 lg:px-8 pt-28 lg:pt-32 pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto mb-16 lg:mb-24">
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-emphasis">
            Escritos
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-[0.95] text-balance">
            Artigos e reflexões
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Textos do Dr. Gustavo Mendes e Silva sobre psiquiatria, fenomenologia e a complexidade da
            experiência humana — sem pressa de simplificar o que é complexo.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground max-w-xl">Em breve, novos artigos por aqui.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20 lg:mb-32">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col h-full rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full space-y-4">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground font-mono tracking-wide">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="font-serif text-2xl lg:text-[1.65rem] font-light leading-snug text-balance">
                      {post.title}
                    </h2>
                    {post.subtitle ? (
                      <p className="text-base text-muted-foreground font-light line-clamp-2">
                        {post.subtitle}
                      </p>
                    ) : null}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {post.keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <span className="text-sm font-emphasis text-foreground/80 inline-flex items-center gap-2 pt-2 border-t border-border/80 mt-auto">
                    Ler artigo
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer contact={DEFAULT_CONTACT} nav={DEFAULT_NAV} brand={DEFAULT_BRAND} />
    </main>
  )
}
