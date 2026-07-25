"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { AutismRibbon } from "@/components/neuro/autism-ribbon"
import { NEURO_BASE, NEURO_NAV } from "@/lib/neuro-portal"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export function NeuroPortalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const wa = resolveCta(
    {
      kind: "whatsapp",
      label: "WhatsApp",
      text: "Olá, vim pelo portal de neurodivergência",
    },
    DEFAULT_CONTACT,
  )

  const isActive = (href: string) =>
    href === NEURO_BASE ? pathname === NEURO_BASE : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="neuro-portal min-h-screen text-[var(--np-fg)] bg-[var(--np-bg)]">
      {/* Top bar — identidade do portal, não o header do site */}
      <header className="sticky top-0 z-50 border-b border-[var(--np-border)] bg-[var(--np-bg)]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href={NEURO_BASE}
            className="flex items-center gap-2.5 min-w-0 text-[var(--np-fg)]"
            onClick={() => setOpen(false)}
          >
            <AutismRibbon className="w-7 h-8" title="Autismo e neurodivergência" />
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--np-muted)]">
                Portal · TEA
              </span>
              <span className="block truncate text-sm sm:text-base font-medium tracking-tight">
                Autismo e neurodivergência
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={wa.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center rounded-full bg-[var(--np-accent)] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[var(--np-accent-hover)] transition-colors"
            >
              WhatsApp
            </a>
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.16em] text-[var(--np-muted)] hover:text-[var(--np-fg)] transition-colors"
            >
              Site principal
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--np-border)] text-[var(--np-fg)]"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="lg:hidden border-t border-[var(--np-border)] px-4 py-4 sm:px-6">
            <ul className="space-y-1">
              {NEURO_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      isActive(item.href)
                        ? "bg-[var(--np-panel)] text-[var(--np-accent)]"
                        : "text-[var(--np-muted)] hover:text-[var(--np-fg)]"
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-widest opacity-70">{item.code}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-[var(--np-border)] mt-2">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-[var(--np-muted)]"
                >
                  Voltar ao site principal
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>

      <div className="mx-auto grid max-w-6xl lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
        {/* Side rail — só desktop: navegação de portal, não marketing */}
        <aside className="hidden lg:block border-r border-[var(--np-border)] min-h-[calc(100vh-4rem)] sticky top-16 self-start">
          <nav className="p-6 xl:p-8" aria-label="Navegação do portal">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--np-muted)] mb-5">
              Índice
            </p>
            <ul className="space-y-1">
              {NEURO_NAV.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-baseline gap-3 rounded-md px-2 py-2.5 transition-colors ${
                        active
                          ? "text-[var(--np-accent)]"
                          : "text-[var(--np-muted)] hover:text-[var(--np-fg)]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] tracking-[0.18em] ${
                          active ? "text-[var(--np-accent)]" : "text-[var(--np-muted)]/70"
                        }`}
                      >
                        {item.code}
                      </span>
                      <span className={`text-sm leading-snug ${active ? "font-medium" : ""}`}>
                        {item.short}
                      </span>
                      {active ? (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--np-accent)]" aria-hidden />
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-10 pt-6 border-t border-[var(--np-border)] space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--np-muted)]">
                Contato
              </p>
              <a
                href={wa.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--np-accent)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--np-accent-hover)] transition-colors"
              >
                WhatsApp
              </a>
              <p className="text-[11px] leading-relaxed text-[var(--np-muted)]">
                Dr. Gustavo Mendes e Silva
                <br />
                CRM 218133/SP · Jundiaí
              </p>
            </div>
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>

      <footer className="border-t border-[var(--np-border)] mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AutismRibbon className="w-4 h-5" title="Autismo" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--np-muted)]">
                Portal TEA · site principal
              </span>
            </div>
            <p className="text-sm text-[var(--np-muted)] max-w-md leading-relaxed">
              Este espaço faz parte do consultório do Dr. Gustavo Mendes e Silva. Atendimento particular
              em Jundiaí — presencial, teleconsulta ou domiciliar.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/" className="text-[var(--np-muted)] hover:text-[var(--np-fg)] transition-colors">
              Site principal
            </Link>
            <Link
              href="/domiciliar"
              className="text-[var(--np-muted)] hover:text-[var(--np-fg)] transition-colors"
            >
              Domiciliar
            </Link>
            <Link
              href="/teleconsulta"
              className="text-[var(--np-muted)] hover:text-[var(--np-fg)] transition-colors"
            >
              Teleconsulta
            </Link>
            <a
              href={wa.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--np-accent)] hover:text-[var(--np-accent-hover)] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
