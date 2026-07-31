"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, ArrowLeft } from "lucide-react"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"
import { BlogAudioPlayer } from "@/components/blog-audio-player"
import type { BlogPost } from "@/lib/blog-posts"

interface BlogPostClientProps {
  post: BlogPost
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Maps every markdown element to the exact same Tailwind classes the site used
// when articles were rendered from the old hand-rolled parser. This keeps the
// typography, spacing and colors byte-for-byte identical while now supporting
// full, real markdown (links, ordered lists, nested emphasis, citations, etc.).
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="font-serif text-3xl sm:text-4xl font-light mt-16 mb-6 pt-8 border-t border-border text-balance leading-tight">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-3xl sm:text-4xl font-light mt-16 mb-6 pt-8 border-t border-border text-balance leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-12 mb-5 text-balance leading-snug">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-serif text-xl sm:text-2xl font-medium mt-10 mb-4 text-balance leading-snug">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-6 leading-relaxed text-base sm:text-lg text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => <ul className="my-6 space-y-2 list-disc pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-6 space-y-2 list-decimal pl-6">{children}</ol>,
  li: ({ children }) => <li className="mb-3 leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-muted-foreground/40 pl-6 py-4 my-8 italic text-muted-foreground bg-muted/20 rounded-r text-base sm:text-lg leading-relaxed">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="underline underline-offset-2 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  // Horizontal rule: semantic <hr> keeping the same pattern divider look.
  hr: () => (
    <hr
      className="my-16 h-24 opacity-5 border-none"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
      }}
    />
  ),
}

function Markdown({ children }: { children: string }) {
  return <ReactMarkdown components={markdownComponents}>{children}</ReactMarkdown>
}

// Split a markdown body into sections on standalone `---` separators, matching
// the old `content.split("---")` behavior for `section-overlay` posts.
function splitSections(content: string): string[] {
  return content.split(/\n[ \t]*-{3,}[ \t]*\n/)
}

function parseContent(content: string) {
  return <Markdown>{content}</Markdown>
}

function parseContentWithOverlay(content: string) {
  const sections = splitSections(content)

  return sections.map((section, index) => {
    // Every other major section gets the pattern overlay.
    const hasOverlay = index % 2 === 1 && index > 0

    if (hasOverlay) {
      return (
        <div key={`section-${index}`} className="relative my-16 -mx-4 lg:-mx-8 px-4 lg:px-8 py-12">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
          <div className="relative z-10">
            <Markdown>{section}</Markdown>
          </div>
        </div>
      )
    }

    return (
      <div key={`section-${index}`}>
        <Markdown>{section}</Markdown>
      </div>
    )
  })
}

function BlogPostContent({ post }: { post: BlogPost }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const patternOpacity = post.scrollStyle === "scroll-reveal" ? Math.min(scrollY / 1000, 0.08) : 0

  return (
    <>
      <main className="min-h-screen pt-24 lg:pt-28">
        <div className="relative min-h-[260px] md:min-h-[340px] lg:min-h-[400px] w-full overflow-hidden bg-background flex items-end">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
          <div className="container mx-auto px-4 lg:px-8 pb-8 lg:pb-12 relative z-10 w-full">
            <div className="max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 font-emphasis"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Blog
              </Link>
              {post.series ? (
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-emphasis mb-3">
                  {post.series}
                </p>
              ) : null}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light mb-4 text-foreground text-balance leading-[1.08]">
                {post.title}
              </h1>
              {post.subtitle ? (
                <p className="font-serif text-lg sm:text-xl md:text-2xl text-muted-foreground font-light text-balance leading-relaxed">
                  {post.subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {post.scrollStyle === "scroll-reveal" && (
          <div
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
            style={{
              opacity: patternOpacity,
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
        )}

        <article className="container mx-auto px-4 lg:px-8 py-8 lg:py-14 relative z-10">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8 lg:mb-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date + "T12:00:00").toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-5">Por {post.author}</p>

              {post.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="glass-pill text-xs px-3 py-1.5 rounded-full text-muted-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            {post.audioUrl ? (
              <BlogAudioPlayer src={post.audioUrl} title={post.title} />
            ) : null}

            <div className="article-content">
              {post.scrollStyle === "section-overlay"
                ? parseContentWithOverlay(post.content)
                : parseContent(post.content)}
            </div>

            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Escrito por</p>
                  <p className="font-serif text-xl font-light">{post.author}</p>
                  <p className="text-xs text-muted-foreground mt-1">CRM 218133/SP</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    href="/blog"
                    className="glass-pill inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-emphasis"
                  >
                    Mais artigos
                  </Link>
                  <Button asChild className="rounded-full">
                    <a
                      href={
                        resolveCta(
                          {
                            kind: "whatsapp",
                            label: "Agendar consulta",
                            text: `Olá, li o artigo "${post.title}" e gostaria de conversar`,
                          },
                          DEFAULT_CONTACT,
                        ).href
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Conversar no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </>
  )
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return <BlogPostContent post={post} />
}
