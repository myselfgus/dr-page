import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPosts, groupPostsBySeries } from "@/lib/blog-posts"
import { DEFAULT_BRAND, DEFAULT_CONTACT, DEFAULT_NAV } from "@/lib/site-config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Blog de Psiquiatria | Dr. Gustavo Mendes e Silva" },
  description:
    "Artigos e reflexões do Dr. Gustavo Mendes e Silva (CRM 218133/SP) sobre psiquiatria, fenomenologia, psicopatologia e saúde mental — com opção de ouvir em áudio.",
  keywords: [
    "blog psiquiatria",
    "artigos psiquiatria",
    "saúde mental",
    "fenomenologia",
    "psicopatologia",
    "dr gustavo mendes",
    "podcast psiquiatria",
  ],
  alternates: { canonical: "https://drgustavomendes.com/blog" },
  openGraph: {
    title: "Blog de Psiquiatria | Dr. Gustavo Mendes e Silva",
    description: "Artigos e reflexões sobre psiquiatria e saúde mental — também em áudio.",
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

export const revalidate = 600

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const groups = groupPostsBySeries(posts)

  return (
    <main className="min-h-screen bg-background">
      <Header nav={DEFAULT_NAV} brand={DEFAULT_BRAND} contact={DEFAULT_CONTACT} />

      <div className="container mx-auto px-4 lg:px-8 pt-28 lg:pt-32 pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto mb-14 lg:mb-20">
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-emphasis">
            Escritos
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-[0.95] text-balance">
            Artigos e reflexões
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Textos do Dr. Gustavo Mendes e Silva sobre psiquiatria, fenomenologia e a complexidade da
            experiência humana — sem pressa de simplificar o que é complexo. Muitos também podem ser{" "}
            <span className="text-foreground/80">ouvidos em áudio</span>.
          </p>
          {posts.length > 0 ? (
            <p className="mt-4 font-mono text-xs text-muted-foreground tracking-wide">
              {posts.length} artigos publicados
            </p>
          ) : null}
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground max-w-xl">Em breve, novos artigos por aqui.</p>
        ) : (
          <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20 mb-20 lg:mb-32">
            {groups.map((group) => (
              <section key={group.series} aria-labelledby={`series-${group.series}`}>
                <div className="mb-6 lg:mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-emphasis mb-1">
                      Série
                    </p>
                    <h2
                      id={`series-${group.series}`}
                      className="font-serif text-2xl sm:text-3xl font-light text-balance"
                    >
                      {group.series}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {group.posts.length} {group.posts.length === 1 ? "texto" : "textos"}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                  {group.posts.map((post, idx) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col h-full rounded-2xl border border-border/80 bg-card/80 p-6 shadow-card hover:shadow-card-hover transition-shadow"
                    >
                      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full space-y-4">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono tracking-wide">
                          <span className="glass-pill inline-flex items-center rounded-full px-2.5 py-0.5 tabular-nums">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span aria-hidden="true">·</span>
                          <span>{post.readTime}</span>
                        </div>

                        <div className="flex-1 space-y-3">
                          <h3 className="font-serif text-xl lg:text-[1.45rem] font-light leading-snug text-balance group-hover:opacity-90 transition-opacity">
                            {post.title}
                          </h3>
                          {post.subtitle ? (
                            <p className="text-sm text-muted-foreground font-light line-clamp-2">
                              {post.subtitle}
                            </p>
                          ) : null}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        {post.keywords.length > 0 ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {post.keywords.slice(0, 3).map((keyword) => (
                              <span
                                key={keyword}
                                className="text-[11px] px-2.5 py-1 rounded-full border border-border/70 text-muted-foreground"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <span className="text-sm font-emphasis text-foreground/80 inline-flex items-center gap-2 pt-3 border-t border-border/60 mt-auto">
                          Ler ou ouvir
                          <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <Footer contact={DEFAULT_CONTACT} nav={DEFAULT_NAV} brand={DEFAULT_BRAND} />
    </main>
  )
}
