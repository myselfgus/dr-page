import Image from "next/image"
import Link from "next/link"
import { AnimatedBackground } from "./animated-background"
import { StarIcon } from "@/components/blocks/cta-button"
import { sanitizeInline } from "@/lib/sanitize"
import { DEFAULT_CONTACT } from "@/lib/site-config"

export interface HeroContent {
  titleLines: string[]
  leadHtml?: string[]
  eyebrow?: string
  subtitle?: string
  lead?: string
  image?: string
  imageAlt?: string
  badges?: string[]
  showRatingBadge?: boolean
}

export interface HeroDesign {
  variant?: "home" | "subpage" | "subpage-split" | "subpage-plain"
  showAnimatedBackground?: boolean
  showImage?: boolean
  minHeight?: string
  showRatingBadge?: boolean
}

export const DEFAULT_CONTENT: HeroContent = {
  titleLines: ["E se for", "possível viver", "de outro modo?"],
  leadHtml: [
    "<strong>Psiquiatria verdadeiramente humanizada</strong> que vai além do diagnóstico.",
    "Afinal, você não precisa de mais diagnósticos prontos, <strong>você precisa se entender de verdade.</strong>",
  ],
  showRatingBadge: true,
}

export const DEFAULT_DESIGN: HeroDesign = {
  variant: "home",
  showAnimatedBackground: true,
  showRatingBadge: true,
}

const DELAYS = ["", "animation-delay-150", "animation-delay-300", "animation-delay-450"]

export function Hero({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
}: {
  content?: HeroContent
  design?: HeroDesign
}) {
  const variant = design.variant ?? "home"
  const showRating =
    (design.showRatingBadge ?? content.showRatingBadge) !== false && variant === "home"
  const ratingLabel = `${DEFAULT_CONTACT.ratingValue}`.replace(".", ",")

  if (variant === "home") {
    return (
      <section className="relative flex min-h-[100svh] sm:min-h-[85vh] lg:min-h-[70vh] items-center overflow-hidden pt-[4.5rem] sm:pt-32 lg:pt-40 pb-10 sm:pb-24 lg:pb-32">
        {design.showAnimatedBackground !== false ? (
          <div className="hidden lg:block absolute inset-0 opacity-30">
            <AnimatedBackground />
          </div>
        ) : null}

        <div className="container mx-auto px-5 sm:px-4 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto sm:mx-0 flex flex-col justify-center min-h-[calc(100svh-5.5rem)] sm:min-h-0">
            {/* Frase-assinatura — ocupa a tela no mobile */}
            <h1 className="font-serif font-medium text-balance leading-[1.05] tracking-tight text-[clamp(2.65rem,11.5vw,3.75rem)] sm:text-6xl sm:leading-tight md:text-7xl lg:text-8xl mb-0 sm:mb-8 lg:mb-6">
              {content.titleLines.map((line, i) => (
                <span key={i} className={`block animate-fade-up ${DELAYS[i] ?? ""}`}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Lead + rating: só a partir de sm — no mobile a frase é o foco total */}
            <div className="hidden sm:block">
              <div className="text-base md:text-xl leading-relaxed max-w-2xl space-y-4 sm:space-y-6 text-muted-foreground [&_strong]:text-foreground mt-2">
                {(content.leadHtml ?? []).map((html, i) => (
                  <span
                    key={i}
                    className={`block animate-fade-up ${i === 0 ? "animation-delay-450" : "animation-delay-600"}`}
                    dangerouslySetInnerHTML={{ __html: sanitizeInline(html) }}
                  />
                ))}
              </div>

              {showRating ? (
                <div className="mt-8 sm:mt-10 animate-fade-up animation-delay-600">
                  <Link
                    href="#avaliacoes"
                    className="inline-flex flex-wrap items-center gap-2 sm:gap-3 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-2 text-sm shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <span className="inline-flex text-[#00c3a5]" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="w-3.5 h-3.5" />
                      ))}
                    </span>
                    <span className="font-emphasis font-medium text-foreground">{ratingLabel}</span>
                    <span className="text-muted-foreground">
                      · {DEFAULT_CONTACT.reviewCount} na Doctoralia
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>

            {/* Mobile: indicador discreto de scroll no rodapé da hero */}
            <div className="sm:hidden mt-auto pt-12 flex flex-col items-center gap-2 text-muted-foreground/70 animate-fade-up animation-delay-600">
              <span className="text-[10px] tracking-[0.25em] uppercase font-emphasis">rolar</span>
              <span className="block w-px h-8 bg-foreground/25 animate-scroll-hint" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === "subpage-split") {
    const showImage = design.showImage !== false && content.image
    return (
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            {showImage ? (
              <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
                <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src={content.image as string}
                      alt={content.imageAlt ?? ""}
                      width={600}
                      height={600}
                      className="object-cover w-full h-full img-drift"
                      priority
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="font-serif text-4xl lg:text-6xl font-medium mb-4 text-balance">
                {content.titleLines.join(" ")}
              </h1>
              {content.subtitle ? (
                <p className="text-lg text-muted-foreground mb-6 font-emphasis">{content.subtitle}</p>
              ) : null}
              {content.lead ? (
                <p className="text-lg lg:text-2xl text-foreground/90 leading-relaxed mb-8 text-pretty">
                  {content.lead}
                </p>
              ) : null}
              {content.badges && content.badges.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {content.badges.map((b, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-emphasis font-medium border border-primary/20"
                    >
                      {b}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === "subpage-plain") {
    return (
      <section className="pt-28 lg:pt-32 pb-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <h1 className="font-serif text-4xl lg:text-6xl font-medium mb-6">
              {content.titleLines.join(" ")}
            </h1>
            {content.lead ? (
              <p className="text-lg text-muted-foreground leading-relaxed">{content.lead}</p>
            ) : null}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {content.eyebrow ? (
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-emphasis">
              {content.eyebrow}
            </p>
          ) : null}
          <h1 className="font-serif text-4xl lg:text-6xl font-medium mb-6 text-balance">
            {content.titleLines.join(" ")}
          </h1>
          {content.lead ? (
            <p className="text-lg text-muted-foreground leading-relaxed">{content.lead}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
