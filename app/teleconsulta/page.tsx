import type { Metadata } from "next"
import { loadPage, loadPageMeta } from "@/lib/load-page"
import { metadataFromMeta } from "@/lib/structured-data"
import { PageView } from "@/components/blocks/PageView"

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPageMeta("teleconsulta")
  return metadataFromMeta("teleconsulta", meta)
}

export default async function TeleconsultaPage() {
  const loaded = await loadPage("teleconsulta")
  return <PageView pageId="teleconsulta" loaded={loaded} />
}
