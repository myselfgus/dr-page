import Link from "next/link"
import { InfinityMark } from "@/components/neuro/infinity-mark"
import { NEURO_NAV, type NeuroPage } from "@/lib/neuro-portal"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export function NeuroPortalPageView({ page }: { page: NeuroPage }) {
  const wa = resolveCta(
    { kind: "whatsapp", label: page.waLabel, text: page.waText },
    DEFAULT_CONTACT,
  )
  const others = NEURO_NAV.filter((n) => n.href !== page.path)

  return (
    <article className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-14 lg:py-16">
      {/* Hero do portal — tipografia densa, grid, sem serif de marketing */}
      <header className="max-w-2xl mb-14 lg:mb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--np-accent)] mb-5">
          {page.eyebrow}
        </p>
        <h1 className="text-[1.85rem] sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-balance mb-6">
          {page.h1}
        </h1>
        <p className="text-base sm:text-lg text-[var(--np-muted)] leading-relaxed">{page.lead}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href={wa.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--np-accent)] px-6 py-3 text-sm font-medium text-[var(--np-bg)] hover:bg-[var(--np-accent-hover)] transition-colors"
          >
            {page.waLabel}
          </a>
          <span className="font-mono text-[11px] text-[var(--np-muted)] tracking-wide">
            Resposta pessoal · CRM 218133/SP
          </span>
        </div>
      </header>

      {/* Corpo: seções numeradas, linha vertical de índice */}
      <div className="relative max-w-2xl space-y-14 lg:space-y-16">
        <div
          className="pointer-events-none absolute left-0 top-2 bottom-2 hidden sm:block w-px bg-[var(--np-border)]"
          aria-hidden
        />
        {page.sections.map((section, i) => (
          <section key={section.heading} className="sm:pl-10 relative">
            <span
              className="hidden sm:flex absolute left-0 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-[var(--np-accent)] bg-[var(--np-bg)]"
              aria-hidden
            />
            {section.kicker ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--np-muted)] mb-2">
                {String(i + 1).padStart(2, "0")} · {section.kicker}
              </p>
            ) : null}
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-balance mb-4">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.paras.map((p) => (
                <p key={p.slice(0, 48)} className="text-sm sm:text-base text-[var(--np-muted)] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Mapa do portal */}
      <nav
        className="mt-16 lg:mt-24 max-w-2xl border-t border-[var(--np-border)] pt-10"
        aria-label="Outras páginas do portal"
      >
        <div className="flex items-center gap-2 mb-5 text-[var(--np-accent)]">
          <InfinityMark className="w-4 h-4" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]">Continuar no portal</p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {others.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-xl border border-[var(--np-border)] bg-[var(--np-panel)] px-4 py-3.5 hover:border-[var(--np-accent)]/50 transition-colors"
              >
                <span className="font-mono text-[11px] text-[var(--np-accent)] tracking-widest">
                  {item.code}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA final */}
      <div className="mt-14 max-w-2xl rounded-2xl border border-[var(--np-border)] bg-[var(--np-panel)] p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight">Pronto para conversar?</h2>
        <p className="text-sm text-[var(--np-muted)] leading-relaxed mb-5">
          Sem formulário clínico. Uma mensagem basta — eu leio e respondo.
        </p>
        <a
          href={wa.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[var(--np-accent)] px-6 py-3 text-sm font-medium text-[var(--np-bg)] hover:bg-[var(--np-accent-hover)] transition-colors"
        >
          {page.waLabel}
        </a>
      </div>
    </article>
  )
}
