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

/** 5 linhas no mobile (dramático); desktop reagrupa em 3. */
const MOBILE_TITLE = ["E se for", "possível", "viver", "de outro", "modo?"] as const
const DESKTOP_TITLE = ["E se for", "possível viver", "de outro modo?"] as const

export const DEFAULT_CONTENT: HeroContent = {
  titleLines: [...MOBILE_TITLE],
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

const DELAYS = [
  "",
  "animation-delay-150",
  "animation-delay-300",
  "animation-delay-450",
  "animation-delay-600",
]

function isDefaultSplit(lines: string[]) {
  return (
    lines.length === 5 &&
    lines[0] === "E se for" &&
    lines[1] === "possível" &&
    lines[2] === "viver" &&
    lines[3] === "de outro" &&
    lines[4] === "modo?"
  )
}

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
    const raw = content.titleLines?.length ? content.titleLines : [...MOBILE_TITLE]
    const mobileLines = isDefaultSplit(raw) || raw.length >= 5 ? raw : raw
    const desktopLines = isDefaultSplit(raw) ? [...DESKTOP_TITLE] : raw

    return (
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden">
        {design.showAnimatedBackground !== false ? (
          <div className="hidden lg:block absolute inset-0 opacity-30">
            <AnimatedBackground />
          </div>
        ) : null}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl flex flex-col">
            <h1 className="order-1 font-serif font-medium leading-[1.06] tracking-tight text-balance mb-10 sm:mb-8 lg:mb-6">
              {/* Mobile: título grande em 5 linhas */}
              <span className="block md:hidden">
                {mobileLines.map((line, i) => (
                  <span
                    key={`m-${line}-${i}`}
                    className={`block text-[5rem] leading-[1.14] animate-fade-up ${DELAYS[i] ?? "animation-delay-600"}`}
                  >
                    {line}
                  </span>
                ))}
              </span>
              {/* Desktop: 3 linhas ainda maiores */}
              <span className="hidden md:block">
                {desktopLines.map((line, i) => (
                  <span
                    key={`d-${line}-${i}`}
                    className={`block text-7xl lg:text-8xl leading-tight animate-fade-up ${DELAYS[i] ?? ""}`}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </h1>

            {/* Badge Doctoralia — subtexto principal */}
            {showRating ? (
              <div className="order-2 mb-12 sm:mb-9 animate-fade-up animation-delay-450">
                <Link
                  href="#avaliacoes"
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5 max-w-full"
                >
                  <span className="inline-flex shrink-0 text-[#00c3a5]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="w-3.5 h-3.5" />
                    ))}
                  </span>
                  <span className="font-mono font-medium text-sm tabular-nums">
                    {ratingLabel}
                  </span>
                  <span className="text-sm font-emphasis whitespace-nowrap opacity-80">
                    · {DEFAULT_CONTACT.reviewCount} avaliações na Doctoralia
                  </span>
                </Link>
              </div>
            ) : null}

            {/* Lead de apoio */}
            <div className="order-3 text-lg sm:text-lg md:text-xl leading-relaxed max-w-2xl space-y-6 sm:space-y-5 text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold">
              {(content.leadHtml ?? []).map((html, i) => (
                <span
                  key={i}
                  className="block animate-fade-up animation-delay-600"
                  style={i === 1 ? { animationDelay: "750ms" } : undefined}
                  dangerouslySetInnerHTML={{ __html: sanitizeInline(html) }}
                />
              ))}
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
              <div className="order-1 lg:order-2">
                <div className="relative aspect-[4/5] sm:aspect-square max-w-md mx-auto lg:max-w-none overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-card">
                  <Image
                    src={content.image as string}
                    alt={content.imageAlt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
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
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">
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
