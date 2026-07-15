import { Icon } from "@/components/blocks/icon-map"

export interface FeatureCardItem {
  iconName?: string
  title: string
  text: string
}

export interface FeatureCardsContent {
  items: FeatureCardItem[]
}

export interface FeatureCardsDesign {
  columns?: 1 | 2 | 3
}

export function FeatureCards({
  content,
  design = {},
}: {
  content: FeatureCardsContent
  design?: FeatureCardsDesign
}) {
  const columns = design.columns ?? 3
  const colClass = columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : ""
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className={`max-w-4xl mx-auto grid ${colClass} gap-6`}>
        {(content.items ?? []).map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 h-full shadow-card"
          >
            <div className="p-3 bg-foreground/5 rounded-xl w-fit mb-4">
              <Icon name={item.iconName} className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-light mb-2 text-balance">{item.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
