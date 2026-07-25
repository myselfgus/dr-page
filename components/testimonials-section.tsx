import { Reveal } from "@/components/reveal"
import { CtaButton, StarIcon } from "@/components/blocks/cta-button"
import {
  type CtaRef,
  type ContactConfig,
  DEFAULT_CONTACT,
  resolveCta,
} from "@/lib/site-config"

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
      author: "Monique Beatriz Mina",
      rating: 5,
      body: "Pela primeira vez me sinto a vontade com um psiquiatra. Ele é atencioso demais, além de deixar a consulta leve, sei que posso levar meus medos até ele e que juntos ele vai me ajudar a achar o melhor caminho.",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "Renato",
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
      author: "Sonia",
      rating: 5,
      body: "Muito atencioso, procura entender o que você está sentindo, para depois receitar o medicamento",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "Julio",
      rating: 5,
      body: "Foi bastante empático. Deu bastante atenção e mostrou-se atencioso.",
      date: "2026-06",
      source: "Doctoralia",
    },
    {
      author: "Ector Martins",
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
  layout: "grid",
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
  const showAggregate = design.showAggregate !== false
  const layout = design.layout ?? "grid"
  const sourceCta = content.sourceCta
    ? resolveCta(content.sourceCta, contact)
    : resolveCta({ kind: "doctoralia", label: "Ver todas as avaliações na Doctoralia" }, contact)

  const ratingLabel = `${contact.ratingValue}`.replace(".", ",")

  return (
    <section
      id={design.id ?? "avaliacoes"}
      className="py-16 lg:py-24 bg-muted/30 border-t border-border"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-14">
          <Reveal variant="item">
            {content.eyebrow ? (
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
                {content.eyebrow}
              </p>
            ) : null}
            <h2
              id="testimonials-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance"
            >
              {content.title}
            </h2>
            {content.subtitle ? (
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                {content.subtitle}
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
                <span className="font-serif text-2xl sm:text-3xl font-light text-foreground">
                  {ratingLabel}
                </span>
                <span className="text-sm text-muted-foreground">
                  · {contact.reviewCount} avaliações na Doctoralia
                </span>
              </a>
            </Reveal>
          ) : null}
        </div>

        {layout === "snap-row" ? (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {content.items.map((item, index) => (
              <Reveal key={`${item.author}-${index}`} variant="item" delay={(index % 3) * 80}>
                <article className="snap-center shrink-0 w-[85vw] max-w-sm md:w-auto md:max-w-none h-full bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col">
                  <TestimonialCard item={item} />
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {content.items.map((item, index) => (
              <Reveal key={`${item.author}-${index}`} variant="item" delay={(index % 3) * 80}>
                <article className="h-full bg-card border border-border rounded-2xl p-6 shadow-card transition-shadow hover:shadow-card-hover flex flex-col">
                  <TestimonialCard item={item} />
                </article>
              </Reveal>
            ))}
          </div>
        )}

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
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <Stars count={rating} />
        {item.source ? (
          <span className="text-xs text-muted-foreground tracking-wide">{item.source}</span>
        ) : null}
      </div>
      <blockquote className="flex-1">
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
          “{item.body}”
        </p>
      </blockquote>
      <footer className="mt-5 pt-4 border-t border-border flex items-baseline justify-between gap-2">
        <cite className="not-italic font-medium text-sm text-foreground">{item.author}</cite>
        {item.date ? <time className="text-xs text-muted-foreground">{item.date}</time> : null}
      </footer>
    </>
  )
}
