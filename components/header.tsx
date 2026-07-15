"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type NavConfig, type BrandConfig, DEFAULT_NAV, DEFAULT_BRAND } from "@/lib/site-config"

export function Header({
  nav = DEFAULT_NAV,
  brand = DEFAULT_BRAND,
}: {
  nav?: NavConfig
  brand?: BrandConfig
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-balance leading-tight"
          >
            {brand.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base tracking-wide hover:text-muted-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
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
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
