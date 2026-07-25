import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackButton } from "@/components/back-button"
import { BlockList } from "@/components/blocks/BlockRenderer"
import { StructuredData } from "@/components/blocks/StructuredData"
import { buildStructuredData } from "@/lib/structured-data"
import type { LoadedPage } from "@/lib/load-page"

// Renderiza uma página inteira a partir dos dados carregados (D1 + fallback):
// header/footer/back-button conforme flags de `pages`, blocos via BlockRenderer,
// JSON-LD via lib/structured-data.
export function PageView({ pageId, loaded }: { pageId: string; loaded: LoadedPage }) {
  const { page, blocks, contact, nav, brand, meta } = loaded
  const showHeader = page?.rendersHeader ?? false
  const showFooter = page?.rendersFooter ?? false
  const showBack = page?.backButton ?? false

  const jsonld = buildStructuredData({
    pageId,
    types: meta?.jsonldTypes ?? [],
    contact,
    blocks,
  })

  return (
    <main className={showBack ? "min-h-screen bg-background" : "min-h-screen"}>
      <StructuredData items={jsonld} />
      {showHeader ? <Header nav={nav} brand={brand} contact={contact} /> : null}
      {showBack ? <BackButton /> : null}
      <BlockList blocks={blocks} contact={contact} />
      {showFooter ? <Footer contact={contact} nav={nav} brand={brand} /> : null}
    </main>
  )
}
