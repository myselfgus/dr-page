"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  type NavConfig,
  type BrandConfig,
  DEFAULT_NAV,
  DEFAULT_BRAND,
} from "@/lib/site-config"
import { AutismRibbon } from "@/components/neuro/autism-ribbon"
import { NEURO_BASE } from "@/lib/neuro-portal"

// WhatsApp vive só no float global (canto) — evita duplicidade com a top-bar.
export function Header({
  nav = DEFAULT_NAV,
  brand = DEFAULT_BRAND,
}: {
  nav?: NavConfig
  brand?: BrandConfig
  contact?: unknown
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const items = Array.isArray(nav?.items) ? nav.items : DEFAULT_NAV.items
  const brandName = brand?.name?.trim() || DEFAULT_BRAND.name

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm border-border/60"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          <Link
            href="/"
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide text-balance leading-tight min-w-0"
          >
            {brandName}
          </Link>

          <nav className="hidden xl:flex items-center gap-5">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base font-emphasis tracking-wide hover:text-muted-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={NEURO_BASE}
              className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity"
              aria-label="Portal Autismo e neurodivergência (TEA)"
              title="Autismo e neurodivergência"
            >
              <AutismRibbon className="w-6 h-7" title="Autismo e neurodivergência" />
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 xl:hidden">
            <Link
              href={NEURO_BASE}
              className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity p-0.5"
              aria-label="Portal Autismo e neurodivergência (TEA)"
              title="Autismo e neurodivergência"
            >
              <AutismRibbon className="w-6 h-7" title="Autismo e neurodivergência" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav className="xl:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-emphasis tracking-wide hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={NEURO_BASE}
                className="inline-flex items-center gap-2.5 text-base font-emphasis tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <AutismRibbon className="w-5 h-6" title="Autismo" />
                Autismo · neurodivergência
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
