"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-balance leading-tight"
          >
            Dr. Gustavo Mendes e Silva
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/teleconsulta" className="text-base tracking-wide hover:text-muted-foreground transition-colors">
              Teleconsulta
            </Link>
            <Link href="/domiciliar" className="text-base tracking-wide hover:text-muted-foreground transition-colors">
              Domiciliar
            </Link>
            <Link href="/blog" className="text-base tracking-wide hover:text-muted-foreground transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-base tracking-wide hover:text-muted-foreground transition-colors">
              Sobre
            </Link>
            <Link href="/contact" className="text-base tracking-wide hover:text-muted-foreground transition-colors">
              Contato
            </Link>
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
              <Link
                href="/teleconsulta"
                className="text-base tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Teleconsulta
              </Link>
              <Link
                href="/domiciliar"
                className="text-base tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Domiciliar
              </Link>
              <Link
                href="/blog"
                className="text-base tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-base tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/contact"
                className="text-base tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
