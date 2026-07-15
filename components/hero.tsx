import Image from "next/image"
import { AnimatedBackground } from "./animated-background"
import { sanitizeInline } from "@/lib/sanitize"

export interface HeroContent {
  titleLines: string[]
  leadHtml?: string[]
  eyebrow?: string
  subtitle?: string
  lead?: string
  image?: string
  imageAlt?: string
  badges?: string[]
}

export interface HeroDesign {
  variant?: "home" | "subpage" | "subpage-split" | "subpage-plain"
  showAnimatedBackground?: boolean
  showImage?: boolean
  minHeight?: string
}

export const DEFAULT_CONTENT: HeroContent = {
  titleLines: ["E se for", "possível viver", "de outro modo?"],
  leadHtml: [
    "<strong>Psiquiatria verdadeiramente humanizada</strong> que vai além do diagnóstico.",
    "Afinal, você não precisa de mais diagnósticos prontos, <strong>você precisa se entender de verdade.</strong>",
  ],
}

export const DEFAULT_DESIGN: HeroDesign = {
  variant: "home",
  showAnimatedBackground: true,
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

  if (variant === "home") {
    return (
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
        {design.showAnimatedBackground !== false ? (
          <div className="hidden lg:block absolute inset-0 opacity-30">
            <AnimatedBackground />
          </div>
        ) : null}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-medium leading-tight mb-8 lg:mb-6 text-balance">
              {content.titleLines.map((line, i) => (
                <span key={i} className={`block animate-fade-up ${DELAYS[i] ?? ""}`}>
                  {line}
                </span>
              ))}
            </h1>
            <div className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl space-y-4 sm:space-y-6 text-muted-foreground [&_strong]:text-foreground [&_strong]:font-medium [&_strong]:font-semibold">
              {(content.leadHtml ?? []).map((html, i) => (
                <span
                  key={i}
                  className={`block animate-fade-up ${i === 0 ? "animation-delay-450" : "animation-delay-600"}`}
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
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
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
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="font-serif text-4xl lg:text-6xl font-light mb-4 text-balance">
                {content.titleLines.join(" ")}
              </h1>
              {content.subtitle ? (
                <p className="text-lg text-muted-foreground mb-6">{content.subtitle}</p>
              ) : null}
              {content.lead ? (
                <p className="text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-8 text-pretty">
                  {content.lead}
                </p>
              ) : null}
              {content.badges && content.badges.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {content.badges.map((b, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
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
            <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6">
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

  // variant "subpage"
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {content.eyebrow ? (
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              {content.eyebrow}
            </p>
          ) : null}
          <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6 text-balance">
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
