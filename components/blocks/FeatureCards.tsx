import Image from "next/image"
import { Icon } from "@/components/blocks/icon-map"
import { Reveal } from "@/components/reveal"

export interface FeatureCardItem {
  iconName?: string
  title: string
  text: string
  image?: string
  imageAlt?: string
}

export interface FeatureCardsContent {
  items: FeatureCardItem[]
  /** Optional section banner above the grid */
  bannerImage?: string
  bannerAlt?: string
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
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {content.bannerImage ? (
        <Reveal variant="scale" className="mb-10 lg:mb-14 max-w-4xl mx-auto">
          <div className="media-drift relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl border border-border shadow-card bg-muted/30">
            <Image
              src={content.bannerImage}
              alt={content.bannerAlt ?? ""}
              fill
              className="object-cover img-drift"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </Reveal>
      ) : null}

      <div className={`max-w-4xl mx-auto grid ${colClass} gap-6`}>
        {(content.items ?? []).map((item, i) => (
          <Reveal key={i} variant={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "item"} delay={(i % 3) * 80}>
            <div className="group h-full overflow-hidden bg-card border border-border rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
              {item.image ? (
                <div className="media-drift relative aspect-[16/10] overflow-hidden bg-muted/40">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    className="object-cover img-drift"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <div className="p-3 bg-foreground/5 rounded-xl w-fit mb-4">
                  <Icon name={item.iconName} className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-xl font-normal mb-2 text-balance">{item.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
