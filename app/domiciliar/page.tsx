import type { Metadata } from "next"
import { loadPage, loadPageMeta } from "@/lib/load-page"
import { metadataFromMeta } from "@/lib/structured-data"
import { PageView } from "@/components/blocks/PageView"

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPageMeta("domiciliar")
  return metadataFromMeta("domiciliar", meta)
}

export default async function DomiciliarPage() {
  const loaded = await loadPage("domiciliar")
  return <PageView pageId="domiciliar" loaded={loaded} />
}
