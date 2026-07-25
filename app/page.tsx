import type { Metadata } from "next"
import { loadPage, loadPageMeta } from "@/lib/load-page"
import { metadataFromMeta } from "@/lib/structured-data"
import { PageView } from "@/components/blocks/PageView"

// ISR: cache na edge ~10 min. Edições no CMS aparecem sem rebuild completo.
// Preview (/_preview) continua force-dynamic.
export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPageMeta("home")
  return metadataFromMeta("home", meta)
}

export default async function Home() {
  const loaded = await loadPage("home")
  return <PageView pageId="home" loaded={loaded} />
}
