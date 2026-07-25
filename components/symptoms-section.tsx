import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { CtaButton } from "@/components/blocks/cta-button"
import { sanitizeInline } from "@/lib/sanitize"
import { type CtaRef, type ContactConfig, DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export interface SymptomChip {
  label: string
  href?: string
}

export interface SymptomsContent {
  eyebrow: string
  chips: (string | SymptomChip)[]
  paras: string[]
  cta: CtaRef
  image?: string
  imageAlt?: string
}

export interface SymptomsDesign {
  id?: string
  align?: "center"
  showCta?: boolean
}

const CHIP_HREFS: Record<string, string> = {
  Burnout: "/burnout",
  Esgotamento: "/burnout",
  Ansiedade: "/ansiedade",
  Medo: "/panico",
  Pânico: "/panico",
  Insônia: "/insonia",
}

export const DEFAULT_CONTENT: SymptomsContent = {
  eyebrow: "Talvez você chegue até aqui sentindo",
  chips: [
    "Burnout",
    "Esgotamento",
    "Ansiedade",
    "Medo",
    "Pânico",
    "Insônia",
    "Desesperança",
    "Perda de sentido",
  ],
  paras: [
    "São as queixas que mais acompanho no consultório em Jundiaí. Cada uma delas tem contexto, história — e caminho de cuidado.",
    "<strong>Você não precisa ter certeza de um diagnóstico</strong> — nem esperar piorar — para conversar.",
  ],
  cta: { kind: "whatsapp", label: "Conversar pelo WhatsApp" },
  image: "/images/sections/symptoms-clouds.jpg",
  imageAlt: "Ilustração abstrata de estados emocionais",
}

export const DEFAULT_DESIGN: SymptomsDesign = {
  id: "queixas",
  align: "center",
  showCta: true,
}

function normalizeChip(chip: string | SymptomChip): SymptomChip {
  if (typeof chip === "string") {
    return { label: chip, href: CHIP_HREFS[chip] }
  }
  return { label: chip.label, href: chip.href ?? CHIP_HREFS[chip.label] }
}

const chipClass =
  "inline-block font-serif text-lg sm:text-xl md:text-2xl font-normal px-5 py-2.5 border border-border rounded-full text-foreground/80 hover:text-background hover:bg-foreground hover:border-foreground transition-colors duration-300"

export function SymptomsSection({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
  contact = DEFAULT_CONTACT,
}: {
  content?: SymptomsContent
  design?: SymptomsDesign
  contact?: ContactConfig
}) {
  const cta = resolveCta(content.cta, contact)
  const image = content.image ?? DEFAULT_CONTENT.image

  return (
    <section id={design.id ?? "queixas"} className="py-16 lg:py-24 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {image ? (
            <Reveal variant="scale" className="mb-10 lg:mb-14">
              <div className="relative mx-auto aspect-[16/9] max-w-2xl overflow-hidden rounded-2xl border border-border shadow-card bg-muted/30">
                <Image
                  src={image}
                  alt={content.imageAlt ?? DEFAULT_CONTENT.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal variant="item">
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6 font-emphasis">
              {content.eyebrow}
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {content.chips.map((raw, index) => {
              const chip = normalizeChip(raw)
              return (
                <Reveal key={chip.label} variant="item" delay={index * 70}>
                  {chip.href ? (
                    <Link href={chip.href} className={chipClass}>
                      {chip.label}
                    </Link>
                  ) : (
                    <span className={`${chipClass} cursor-default`}>{chip.label}</span>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal variant="item" delay={200}>
            {content.paras.map((p, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground [&_strong]:text-foreground ${
                  i === content.paras.length - 1 ? "mb-8" : "mb-4"
                }`}
                dangerouslySetInnerHTML={{ __html: sanitizeInline(p) }}
              />
            ))}
          </Reveal>

          {design.showCta !== false ? (
            <Reveal variant="item" delay={300}>
              <CtaButton cta={cta} className="px-8" />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
