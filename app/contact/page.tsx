import type { Metadata } from "next"
import { loadPage, loadPageMeta } from "@/lib/load-page"
import { metadataFromMeta } from "@/lib/structured-data"
import { PageView } from "@/components/blocks/PageView"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadPageMeta("contact")
  return metadataFromMeta("contact", meta)
}

export default async function ContactPage() {
  const loaded = await loadPage("contact")
  return <PageView pageId="contact" loaded={loaded} />
}
