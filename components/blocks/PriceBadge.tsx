export interface PriceBadgeContent {
  label: string
  value: string
  note?: string
}

export interface PriceBadgeDesign {
  variant?: "inline-card"
}

// Cartão de preço compacto usado na /contact.
export function PriceBadge({ content }: { content: PriceBadgeContent; design?: PriceBadgeDesign }) {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl">
        <div className="inline-flex flex-col bg-card border border-border rounded-2xl px-6 py-4 shadow-card">
          <span className="text-sm text-muted-foreground">{content.label}</span>
          <span className="font-serif text-2xl font-light">{content.value}</span>
          {content.note ? (
            <span className="text-xs text-muted-foreground mt-1">{content.note}</span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
