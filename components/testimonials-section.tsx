"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"
import { CtaButton, StarIcon } from "@/components/blocks/cta-button"
import {
  type CtaRef,
  type ContactConfig,
  DEFAULT_CONTACT,
  resolveCta,
} from "@/lib/site-config"
import { toAuthorInitials } from "@/lib/format"

export interface TestimonialItem {
  author: string
  rating?: number
  body: string
  date?: string
  source?: string
}

export interface TestimonialsContent {
  eyebrow?: string
  title: string
  subtitle?: string
  items: TestimonialItem[]
  sourceCta?: CtaRef
}

export interface TestimonialsDesign {
  id?: string
  layout?: "grid" | "snap-row"
  columns?: 3
  showAggregate?: boolean
}

export const DEFAULT_CONTENT: TestimonialsContent = {
  eyebrow: "Avaliações de pacientes",
  title: "O que dizem sobre o atendimento",
  subtitle:
    "Depoimentos públicos de pacientes na Doctoralia. Textos reproduzidos com fidelidade, sem edição de sentido.",
  items: [
    {
      author: "S.",
      rating: 5,
      body: "Consulta excelente, foi profissional, muito atencioso e o tratamento está dando efeito",
      date: "2026-08-07",
      source: "Doctoralia",
    },
    {
      author: "J.G.L.",
      rating: 5,
      body: "Profissional muito atencioso, a consulta vai muito além de somente prescrever medicação, mas sim entender de fato as causas e o impacto real no dia a dia.",
      date: "2026-08-07",
      source: "Doctoralia",
    },
    {
      author: "J.S.",
      rating: 5,
      body: "Dr. Gustavo, com seu excelente atendimento sendo humanizado, cuidadoso e atencioso. Procura a melhor abordagem para meu diagnóstico, TPB o que para mim foi sempre muito difícil encontrar profissional que saiba conduzir uma boa abordagem. Parabéns pelo profissionalismo e cuidado.",
      date: "2026-08-04",
      source: "Doctoralia",
    },
    {
      author: "M.B.M.",
      rating: 5,
      body: "Pela primeira vez me sinto a vontade com um psiquiatra. Ele é atencioso demais, além de deixar a consulta leve, sei que posso levar meus medos até ele e que juntos ele vai me ajudar a achar o melhor caminho.",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "R.",
      rating: 5,
      body: "Excelente profissional. Demonstrou muita atenção, empatia e respeito durante todo o atendimento. Ouviu minhas preocupações com atenção e explicou cada ponto do tratamento de forma clara e compreensível. Super recomendo!!!",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "C.G.",
      rating: 5,
      body: "Muito atencioso, nos atende sem pressa!\nBem humorado.",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "S.",
      rating: 5,
      body: "Muito atencioso, procura entender o que você está sentindo, para depois receitar o medicamento",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "J.",
      rating: 5,
      body: "Foi bastante empático. Deu bastante atenção e mostrou-se atencioso.",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "E.M.",
      rating: 5,
      body: "muito bom! Atencioso e didático, Recomendo a todos.",
      date: "2026-06",
      source: "Doctoralia",
    },
  ],
  sourceCta: {
    kind: "doctoralia",
    label: "Ver todas as avaliações na Doctoralia",
  },
}

export const DEFAULT_DESIGN: TestimonialsDesign = {
  id: "avaliacoes",
  layout: "snap-row", // mobile carousel + grid from md up
  columns: 3,
  showAggregate: true,
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#00c3a5]" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} className="w-3.5 h-3.5" />
      ))}
    </span>
  )
}

export function TestimonialsSection({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
  contact = DEFAULT_CONTACT,
}: {
  content?: TestimonialsContent
  design?: TestimonialsDesign
  contact?: ContactConfig
}) {
  const items = Array.isArray(content?.items) ? content.items : DEFAULT_CONTENT.items
  const title = content?.title || DEFAULT_CONTENT.title
  const eyebrow = content?.eyebrow ?? DEFAULT_CONTENT.eyebrow
  const subtitle = content?.subtitle ?? DEFAULT_CONTENT.subtitle
  const showAggregate = design?.showAggregate !== false
  const layout = design?.layout ?? "grid"
  const sourceCta = content?.sourceCta
    ? resolveCta(content.sourceCta, contact)
    : resolveCta({ kind: "doctoralia", label: "Ver todas as avaliações na Doctoralia" }, contact)

  // Nota/contagem só da D1 — sem fallback no código.
  const ratingValue = contact?.ratingValue
  const reviewCount = contact?.reviewCount
  const ratingLabel = ratingValue ? ratingValue.replace(".", ",") : null
  const isSnap = layout === "snap-row"

  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const syncActive = useCallback(() => {
    const el = scrollerRef.current
    if (!el || el.children.length === 0) return
    const first = el.children[0] as HTMLElement
    const gap = 16
    const step = first.offsetWidth + gap
    if (step <= 0) return
    const idx = Math.round(el.scrollLeft / step)
    setActive(Math.max(0, Math.min(items.length - 1, idx)))
  }, [items.length])

  useEffect(() => {
    if (!isSnap) return
    const el = scrollerRef.current
    if (!el) return
    syncActive()
    el.addEventListener("scroll", syncActive, { passive: true })
    window.addEventListener("resize", syncActive)
    return () => {
      el.removeEventListener("scroll", syncActive)
      window.removeEventListener("resize", syncActive)
    }
  }, [isSnap, syncActive])

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current
    if (!el || el.children.length === 0) return
    const card = el.children[index] as HTMLElement | undefined
    if (!card) return
    const left = card.offsetLeft - (el.firstElementChild as HTMLElement).offsetLeft
    el.scrollTo({ left, behavior: "smooth" })
  }

  return (
    <section
      id={design.id ?? "avaliacoes"}
      className="py-16 lg:py-24 bg-muted/30 border-t border-border"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-14">
          <Reveal variant="blur">
            {eyebrow ? (
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
                {eyebrow}
              </p>
            ) : null}
            <h2
              id="testimonials-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                {subtitle}
              </p>
            ) : null}
          </Reveal>

          {showAggregate ? (
            <Reveal variant="item" delay={100}>
              <a
                href={sourceCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <Stars count={5} />
                {ratingLabel ? (
                  <span className="font-serif text-2xl sm:text-3xl font-light text-foreground">
                    {ratingLabel}
                  </span>
                ) : null}
                <span className="text-sm text-muted-foreground">
                  {reviewCount
                    ? `· ${reviewCount} avaliações na Doctoralia`
                    : "· avaliações na Doctoralia"}
                </span>
              </a>
            </Reveal>
          ) : null}
        </div>

        {/* Mobile: horizontal carousel with peek of next card + dots.
            md+: static grid so all reviews stay visible. */}
        <div
          ref={scrollerRef}
          className={
            isSnap
              ? "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scroll-px-4 md:mx-0 md:px-0 md:scroll-px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:pb-0 max-w-7xl md:mx-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          }
          role={isSnap ? "region" : undefined}
          aria-label={isSnap ? "Carrossel de depoimentos" : undefined}
          tabIndex={isSnap ? 0 : undefined}
        >
          {items.map((item, index) => (
            <Reveal
              key={`${item.author}-${index}`}
              variant={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "scale"}
              delay={(index % 3) * 90}
              className={
                isSnap
                  ? "snap-start shrink-0 w-[min(78vw,19.5rem)] sm:w-[min(70vw,22rem)] md:w-auto md:max-w-none md:shrink"
                  : undefined
              }
            >
              <article
                className={`h-full bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col ${
                  isSnap ? "min-h-[220px]" : ""
                }`}
              >
                <TestimonialCard item={item} />
              </article>
            </Reveal>
          ))}
        </div>

        {isSnap && items.length > 1 ? (
          <div
            className="mt-5 flex items-center justify-center gap-2 md:hidden"
            role="tablist"
            aria-label="Navegar depoimentos"
          >
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Depoimento ${i + 1} de ${items.length}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-6 bg-foreground/70"
                    : "w-1.5 bg-foreground/25"
                }`}
              />
            ))}
          </div>
        ) : null}

        <Reveal variant="item" delay={200}>
          <div className="mt-10 lg:mt-12 text-center">
            <CtaButton cta={sourceCta} className="text-sm sm:text-base" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const rating = item.rating ?? 5
  const initials = toAuthorInitials(item.author ?? "")
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <Stars count={rating} />
        {item.source ? (
          <span className="text-xs text-muted-foreground tracking-wide font-emphasis">{item.source}</span>
        ) : null}
      </div>
      <blockquote className="flex-1">
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
          “{item.body}”
        </p>
      </blockquote>
      <footer className="mt-5 pt-4 border-t border-border flex items-baseline justify-between gap-2">
        <cite className="not-italic font-emphasis font-medium text-sm text-foreground tracking-wide">
          {initials}
        </cite>
        {item.date ? <time className="text-xs text-muted-foreground">{item.date}</time> : null}
      </footer>
    </>
  )
}
