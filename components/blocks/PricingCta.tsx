import { Icon } from "@/components/blocks/icon-map"
import { CtaButton } from "@/components/blocks/cta-button"
import { type CtaRef, type ContactConfig, DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export interface PriceItem {
  label: string
  value: string
}

export interface PricingStep {
  iconName?: string
  text: string
}

export interface PricingCtaContent {
  heading: string
  iconName?: string
  note?: string
  steps?: PricingStep[]
  prices: PriceItem[]
  footnotes?: string[]
  cta: CtaRef
}

export interface PricingCtaDesign {
  variant?: "prices-only" | "how-it-works"
  showSteps?: boolean
}

function Prices({ prices }: { prices: PriceItem[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {prices.map((p, i) => (
        <div key={i}>
          <p className="text-sm text-muted-foreground mb-1">{p.label}</p>
          <p className="font-serif text-3xl font-light">{p.value}</p>
        </div>
      ))}
    </div>
  )
}

export function PricingCta({
  content,
  design = {},
  contact = DEFAULT_CONTACT,
}: {
  content: PricingCtaContent
  design?: PricingCtaDesign
  contact?: ContactConfig
}) {
  const variant = design.variant ?? "prices-only"
  const showSteps = design.showSteps ?? variant === "how-it-works"
  const cta = resolveCta(content.cta, contact)

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-card">
          {variant === "prices-only" ? (
            <>
              <div className="flex items-start gap-4 mb-6">
                {content.iconName ? (
                  <div className="p-3 bg-foreground/5 rounded-xl">
                    <Icon name={content.iconName} className="w-5 h-5" />
                  </div>
                ) : null}
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl font-light text-balance">
                    {content.heading}
                  </h2>
                  {content.note ? (
                    <p className="text-sm text-muted-foreground mt-1">{content.note}</p>
                  ) : null}
                </div>
              </div>
              <div className="border-t border-border pt-6 mb-8">
                <Prices prices={content.prices} />
              </div>
            </>
          ) : (
            <>
              <h2 className="font-serif text-2xl lg:text-3xl font-light mb-6 text-balance">
                {content.heading}
              </h2>
              {showSteps && content.steps && content.steps.length > 0 ? (
                <ul className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  {content.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon name={s.iconName} className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{s.text}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="border-t border-border pt-6 mb-8">
                <Prices prices={content.prices} />
                {(content.footnotes ?? []).map((f, i) => (
                  <p key={i} className={`text-sm text-muted-foreground ${i === 0 ? "mt-4" : "mt-2"}`}>
                    {f}
                  </p>
                ))}
              </div>
            </>
          )}

          <CtaButton cta={cta} variant="whatsapp-block" />
        </div>
      </div>
    </div>
  )
}
