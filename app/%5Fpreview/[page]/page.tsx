import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { loadPage } from "@/lib/load-page"
import { PageView } from "@/components/blocks/PageView"

// Preview pixel-perfect do admin: renderiza a página lendo blocks com status='draft'.
// Protegida por token simples: exige ?token= igual a process.env.PREVIEW_TOKEN.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const VALID_PAGES = new Set(["home", "about", "teleconsulta", "domiciliar", "contact"])

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>
  searchParams: Promise<{ token?: string }>
}) {
  const { page } = await params
  const { token } = await searchParams

  const expected = process.env.PREVIEW_TOKEN
  // Sem token configurado, ou token divergente → 404 (não vaza a existência da rota).
  if (!expected || token !== expected) {
    notFound()
  }
  if (!VALID_PAGES.has(page)) {
    notFound()
  }

  const loaded = await loadPage(page, { draft: true })
  return <PageView pageId={page} loaded={loaded} />
}
