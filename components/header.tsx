"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CtaButton, WhatsAppIcon } from "@/components/blocks/cta-button"
import {
  type NavConfig,
  type BrandConfig,
  type ContactConfig,
  DEFAULT_NAV,
  DEFAULT_BRAND,
  DEFAULT_CONTACT,
  resolveCta,
} from "@/lib/site-config"

export function Header({
  nav = DEFAULT_NAV,
  brand = DEFAULT_BRAND,
  contact = DEFAULT_CONTACT,
}: {
  nav?: NavConfig
  brand?: BrandConfig
  contact?: ContactConfig
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const wa = resolveCta({ kind: "whatsapp", label: "WhatsApp" }, contact)

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
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-balance leading-tight min-w-0"
          >
            {brand.name}
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base tracking-wide hover:text-muted-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <CtaButton cta={wa} className="!px-4 !py-2 !text-sm" />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={wa.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white p-2.5 hover:bg-[#20BA5A] transition-colors"
              aria-label="Falar no WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base tracking-wide hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <CtaButton cta={wa} className="w-full" />
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
