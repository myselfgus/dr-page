import type { Metadata } from "next"
import { loadPage, loadPageMeta } from "@/lib/load-page"
import { metadataFromMeta } from "@/lib/structured-data"
import { PageView } from "@/components/blocks/PageView"

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPageMeta("about")
  return metadataFromMeta("about", meta)
}

export default async function AboutPage() {
  const loaded = await loadPage("about")
  return <PageView pageId="about" loaded={loaded} />
}
