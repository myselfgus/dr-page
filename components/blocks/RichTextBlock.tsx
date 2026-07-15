import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/blocks/icon-map"
import { sanitizeInline } from "@/lib/sanitize"

export interface RichCardGroup {
  text: string
  sub?: string
  emphasize?: boolean
}

export interface RichCard {
  title?: string
  titleIcon?: string
  titleSize?: "sm" | "base" | "xl"
  paras?: string[]
  items?: string[]
  groups?: RichCardGroup[]
  groupColumns?: 1 | 2
}

export interface RichTextContent {
  heading?: string
  iconName?: string
  intro?: string
  paras?: string[]
  cards?: RichCard[]
}

export interface RichTextDesign {
  variant?: "card" | "card-grid" | "card-stack" | "plain"
  columns?: 1 | 2 | 3
}

function inline(html: string) {
  return <span dangerouslySetInnerHTML={{ __html: sanitizeInline(html) }} />
}

const TITLE_SIZE: Record<NonNullable<RichCard["titleSize"]>, string> = {
  sm: "text-lg",
  base: "text-lg",
  xl: "text-xl",
}

function Groups({ groups, columns }: { groups: RichCardGroup[]; columns: 1 | 2 }) {
  if (columns === 2) {
    const mid = Math.ceil(groups.length / 2)
    const cols = [groups.slice(0, mid), groups.slice(mid)]
    return (
      <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
        {cols.map((col, ci) => (
          <div key={ci} className="space-y-3">
            {col.map((g, gi) => (
              <div key={gi}>
                <p className={g.emphasize ? "font-medium text-foreground" : undefined}>
                  {inline(g.text)}
                </p>
                {g.sub ? <p>{g.sub}</p> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-3 text-muted-foreground">
      {groups.map((g, gi) => (
        <div key={gi}>
          <p className={g.emphasize ? "font-medium text-foreground" : undefined}>{inline(g.text)}</p>
          {g.sub ? <p className="text-sm">{g.sub}</p> : null}
        </div>
      ))}
    </div>
  )
}

function CardBody({ card }: { card: RichCard }) {
  return (
    <>
      {card.items && card.items.length > 0 ? (
        <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
          {card.items.map((it, i) => (
            <li key={i}>• {it}</li>
          ))}
        </ul>
      ) : null}
      {card.paras && card.paras.length > 0 ? (
        <div className="space-y-3 text-muted-foreground leading-relaxed text-pretty">
          {card.paras.map((p, i) => (
            <p key={i}>{inline(p)}</p>
          ))}
        </div>
      ) : null}
      {card.groups && card.groups.length > 0 ? (
        <Groups groups={card.groups} columns={card.groupColumns ?? 1} />
      ) : null}
    </>
  )
}

function RichCardView({ card }: { card: RichCard }) {
  return (
    <Card>
      {card.title ? (
        <CardHeader>
          <CardTitle
            className={`${TITLE_SIZE[card.titleSize ?? "xl"]} ${card.titleIcon ? "flex items-center gap-2" : ""}`}
          >
            {card.titleIcon ? <Icon name={card.titleIcon} className="h-5 w-5" /> : null}
            {card.title}
          </CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className={card.title ? undefined : "pt-6"}>
        <CardBody card={card} />
      </CardContent>
    </Card>
  )
}

export function RichTextBlock({
  content,
  design = {},
}: {
  content: RichTextContent
  design?: RichTextDesign
}) {
  const variant = design.variant ?? "card"
  const columns = design.columns ?? 2
  const cards = content.cards ?? []

  // variant "card": card único com o heading no título do card (padrão "Sobre Mim").
  if (variant === "card") {
    const single: RichCard =
      cards[0] ?? { paras: content.paras ?? [] }
    return (
      <section className="max-w-4xl mx-auto mb-16">
        <Card>
          {content.heading ? (
            <CardHeader>
              <CardTitle className="font-serif text-3xl font-light flex items-center gap-2 justify-center">
                {content.iconName ? <Icon name={content.iconName} className="h-6 w-6" /> : null}
                {content.heading}
              </CardTitle>
            </CardHeader>
          ) : null}
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
            <CardBody card={single} />
          </CardContent>
        </Card>
      </section>
    )
  }

  const gridClass =
    variant === "card-stack"
      ? "space-y-6"
      : `grid gap-6 ${columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : ""}`

  return (
    <section className="max-w-4xl mx-auto mb-16">
      {content.heading ? (
        <h2
          className={`font-serif text-3xl lg:text-4xl font-light mb-8 text-center ${
            content.iconName ? "flex items-center gap-2 justify-center" : ""
          }`}
        >
          {content.iconName ? <Icon name={content.iconName} className="h-8 w-8" /> : null}
          {content.heading}
        </h2>
      ) : null}
      {variant === "plain" ? (
        <div className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
          {(content.paras ?? []).map((p, i) => (
            <p key={i}>{inline(p)}</p>
          ))}
        </div>
      ) : (
        <div className={gridClass}>
          {cards.map((card, i) => (
            <RichCardView key={i} card={card} />
          ))}
        </div>
      )}
    </section>
  )
}
