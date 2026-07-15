import type { Metadata } from "next"
import { loadPage, loadPageMeta } from "@/lib/load-page"
import { metadataFromMeta } from "@/lib/structured-data"
import { PageView } from "@/components/blocks/PageView"

// Conteúdo vem do D1 (blocks published) com fallback total nos dados semeados.
// force-dynamic para refletir edições do CMS sem rebuild; o build (sem D1) usa o fallback.
export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPageMeta("home")
  return metadataFromMeta("home", meta)
}

export default async function Home() {
  const loaded = await loadPage("home")
  return <PageView pageId="home" loaded={loaded} />
}
