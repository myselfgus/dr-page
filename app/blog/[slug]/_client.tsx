"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

interface BlogPostClientProps {
  post: any
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

function parseContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === "") {
      continue
    }

    // Horizontal rule - Adicionando pattern divider para dar respiro visual
    if (line.trim() === "---") {
      elements.push(
        <div key={key++} className="my-16 relative">
          <div
            className="h-24 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
        </div>,
      )
      continue
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="font-serif text-3xl sm:text-4xl font-light mt-16 mb-6 pt-8 border-t border-border text-balance leading-tight"
        >
          {line.replace("## ", "")}
        </h2>,
      )
      continue
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="font-serif text-2xl sm:text-3xl font-medium mt-12 mb-5 text-balance leading-snug">
          {line.replace("### ", "")}
        </h3>,
      )
      continue
    }

    // H4
    if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={key++} className="font-serif text-xl sm:text-2xl font-medium mt-10 mb-4 text-balance leading-snug">
          {line.replace("#### ", "")}
        </h4>,
      )
      continue
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-muted-foreground/40 pl-6 py-4 my-8 italic text-muted-foreground bg-muted/20 rounded-r text-base sm:text-lg leading-relaxed"
        >
          {line.replace("> ", "")}
        </blockquote>,
      )
      continue
    }

    // List items
    if (line.startsWith("- ")) {
      const listItems = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        const text = lines[i].replace("- ", "")
        // Parse bold text within list items
        const parts = text.split("**")
        const content = parts.map((part, idx) => (idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part))
        listItems.push(
          <li key={key++} className="mb-3 leading-relaxed">
            {content}
          </li>,
        )
        i++
      }
      i-- // Adjust for the outer loop increment
      elements.push(
        <ul key={key++} className="my-6 space-y-2 list-disc pl-6">
          {listItems}
        </ul>,
      )
      continue
    }

    // Regular paragraph with bold and italic support
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g)
    const content = parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={idx} className="italic">
            {part.slice(1, -1)}
          </em>
        )
      }
      return part
    })

    elements.push(
      <p key={key++} className="mb-6 leading-relaxed text-base sm:text-lg text-foreground/90">
        {content}
      </p>,
    )
  }

  return elements
}

function parseContentWithOverlay(content: string) {
  const sections = content.split("---")
  const elements: React.ReactNode[] = []
  let key = 0

  sections.forEach((section, index) => {
    // Every other major section gets pattern overlay
    const hasOverlay = index % 2 === 1 && index > 0

    if (hasOverlay) {
      elements.push(
        <div key={`section-${key++}`} className="relative my-16 -mx-4 lg:-mx-8 px-4 lg:px-8 py-12">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
          <div className="relative z-10">{parseContent(section)}</div>
        </div>,
      )
    } else {
      elements.push(<div key={`section-${key++}`}>{parseContent(section)}</div>)
    }
  })

  return elements
}

function BlogPostContent({ post }: { post: any }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const patternOpacity = post.scrollStyle === "scroll-reveal" ? Math.min(scrollY / 1000, 0.08) : 0

  return (
    <>
      <Button variant="ghost" asChild className="fixed top-24 left-4 z-50 bg-background/80 backdrop-blur-sm">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>
      </Button>

      <main className="min-h-screen pt-20">
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden bg-background">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 pb-8 lg:pb-12">
              <div className="max-w-4xl">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-foreground text-balance leading-tight">
                  {post.title}
                </h1>
                {post.subtitle && (
                  <p className="font-serif text-lg sm:text-xl md:text-2xl text-muted-foreground font-light text-balance leading-relaxed">
                    {post.subtitle}
                  </p>
                )}
              </div>
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

        <article className="container mx-auto px-4 lg:px-8 py-8 lg:py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12 lg:mb-16">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                <span>Por {post.author}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword) => (
                  <span key={keyword} className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
            </header>

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
                </div>
                <Button asChild>
                  <Link href="/contact">Agendar Consulta</Link>
                </Button>
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
