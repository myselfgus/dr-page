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
  /** Prices intentionally omitted from public UI (CFM / product decision). */
  prices?: PriceItem[]
  footnotes?: string[]
  cta: CtaRef
}

export interface PricingCtaDesign {
  variant?: "prices-only" | "how-it-works"
  showSteps?: boolean
  /** Never show monetary values on the public site. */
  showPrices?: boolean
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
  // Product decision: valores de consulta não são exibidos no site.
  const showPrices = false

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-card">
          <div className="flex items-start gap-4 mb-6">
            {content.iconName ? (
              <div className="p-3 bg-foreground/5 rounded-xl">
                <Icon name={content.iconName} className="w-5 h-5" />
              </div>
            ) : null}
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-normal text-balance">
                {content.heading}
              </h2>
              {content.note ? (
                <p className="text-sm text-muted-foreground mt-1">{content.note}</p>
              ) : null}
            </div>
          </div>

          {showSteps && content.steps && content.steps.length > 0 ? (
            <ul className="space-y-4 text-muted-foreground leading-relaxed mb-8 border-t border-border pt-6">
              {content.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon name={s.iconName} className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {!showPrices && (content.footnotes ?? []).length > 0 ? (
            <div className="mb-8 border-t border-border pt-6 space-y-2">
              {(content.footnotes ?? []).map((f, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {f}
                </p>
              ))}
            </div>
          ) : null}

          {showPrices && content.prices && content.prices.length > 0 ? (
            <div className="border-t border-border pt-6 mb-8 grid sm:grid-cols-2 gap-6">
              {content.prices.map((p, i) => (
                <div key={i}>
                  <p className="text-sm text-muted-foreground mb-1">{p.label}</p>
                  <p className="font-serif text-3xl font-normal">{p.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          <CtaButton cta={cta} variant="whatsapp-block" />
        </div>
      </div>
    </div>
  )
}
