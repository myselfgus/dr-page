import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/blog-posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Dr. Gustavo Mendes e Silva | Artigos sobre Psiquiatria",
  description:
    "Artigos acadêmicos e insights sobre psiquiatria, fenomenologia, psicopatologia e saúde mental pelo Dr. Gustavo Mendes e Silva.",
  keywords: ["blog psiquiatria", "artigos psiquiatria", "saúde mental", "fenomenologia", "psicopatologia"],
  openGraph: {
    title: "Blog - Dr. Gustavo Mendes e Silva",
    description: "Artigos acadêmicos e insights sobre psiquiatria e saúde mental",
    type: "website",
  },
}

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen pt-20">
      <Button variant="ghost" asChild className="fixed top-24 left-4 z-50 bg-background/80 backdrop-blur-sm">
        <Link href="/">← Voltar</Link>
      </Button>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto mb-16 lg:mb-24">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-[0.95]">
            Artigos e Reflexões
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Explorações acadêmicas sobre psiquiatria, fenomenologia e a complexidade da experiência humana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto mb-20 lg:mb-32">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex-1 space-y-3">
                  <h2 className="font-serif text-2xl lg:text-3xl font-light group-hover:text-muted-foreground transition-colors leading-tight">
                    {post.title}
                  </h2>
                  {post.subtitle && (
                    <p className="font-serif text-lg lg:text-xl text-muted-foreground font-light line-clamp-2">
                      {post.subtitle}
                    </p>
                  )}
                  <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {post.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 pt-2">
                  Ler artigo
                  <span>→</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="border-t border-border pt-16 lg:pt-20 max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-4">Receba Novos Artigos</h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Inscreva-se para receber notificações sobre novos artigos.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
              required
            />
            <Button type="submit" size="lg">
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
