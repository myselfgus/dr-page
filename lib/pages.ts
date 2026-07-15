import { getCloudflareContext } from "@opennextjs/cloudflare"

// ---------------------------------------------------------------------------
// Camada de dados do CMS de blocos (espelha lib/blog-posts.ts).
// Lê as tabelas pages / blocks / page_meta / site_config da D1 `dr_blog`.
// Tudo defensivo: JSON.parse com try/catch, guard do binding. As rotas de
// página SEMPRE têm fallback nos DEFAULT_CONTENT dos componentes, então o
// build (sem D1) nunca quebra.
// ---------------------------------------------------------------------------

export interface Page {
  id: string
  path: string
  status: string
  rendersHeader: boolean
  rendersFooter: boolean
  backButton: boolean
  sort: number
}

export interface PageBlock {
  id: string
  pageId: string
  parentId: string | null
  sort: number
  type: string
  content: Record<string, unknown>
  design: Record<string, unknown>
  status: string
}

export interface PageMeta {
  pageId: string
  title: string
  description: string
  canonical: string
  keywords: string[]
  og: Record<string, unknown>
  twitter: Record<string, unknown>
  robots: Record<string, unknown>
  jsonldTypes: string[]
}

interface PageRow {
  id: string
  path: string
  status: string
  renders_header: number
  renders_footer: number
  back_button: number
  sort: number
  updated_at: number
}

interface BlockRow {
  id: string
  page_id: string
  parent_id: string | null
  sort: number
  type: string
  content_json: string | null
  design_json: string | null
  status: string
  updated_at: number
}

interface PageMetaRow {
  page_id: string
  title: string | null
  description: string | null
  canonical: string | null
  keywords: string | null
  og_json: string | null
  twitter_json: string | null
  robots_json: string | null
  jsonld_types: string | null
  updated_at: number
}

interface SiteConfigRow {
  key: string
  value: string
  updated_at: number
}

// Parse defensivo de JSON: falha vira o fallback informado.
function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    if (parsed === null || parsed === undefined) return fallback
    return parsed as T
  } catch {
    return fallback
  }
}

function mapPage(row: PageRow): Page {
  return {
    id: row.id,
    path: row.path,
    status: row.status,
    rendersHeader: row.renders_header === 1,
    rendersFooter: row.renders_footer === 1,
    backButton: row.back_button === 1,
    sort: row.sort,
  }
}

function mapBlock(row: BlockRow): PageBlock {
  return {
    id: row.id,
    pageId: row.page_id,
    parentId: row.parent_id ?? null,
    sort: row.sort,
    type: row.type,
    content: parseJson<Record<string, unknown>>(row.content_json, {}),
    design: parseJson<Record<string, unknown>>(row.design_json, {}),
    status: row.status,
  }
}

function mapPageMeta(row: PageMetaRow): PageMeta {
  return {
    pageId: row.page_id,
    title: row.title ?? "",
    description: row.description ?? "",
    canonical: row.canonical ?? "",
    keywords: parseJson<string[]>(row.keywords, []),
    og: parseJson<Record<string, unknown>>(row.og_json, {}),
    twitter: parseJson<Record<string, unknown>>(row.twitter_json, {}),
    robots: parseJson<Record<string, unknown>>(row.robots_json, {}),
    jsonldTypes: parseJson<string[]>(row.jsonld_types, []),
  }
}

// Acessa o binding D1 (`dr_blog`) via contexto OpenNext do Cloudflare.
async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext()
  const db = (env as unknown as { dr_blog?: D1Database }).dr_blog
  if (!db) {
    throw new Error(
      "Binding do D1 'dr_blog' não está definido. Verifique a configuração em wrangler.jsonc e no ambiente.",
    )
  }
  return db
}

export async function getPage(id: string): Promise<Page | undefined> {
  const db = await getDb()
  const row = await db.prepare("SELECT * FROM pages WHERE id = ?1 LIMIT 1").bind(id).first<PageRow>()
  return row ? mapPage(row) : undefined
}

export async function getPageBlocks(
  pageId: string,
  opts: { draft?: boolean } = {},
): Promise<PageBlock[]> {
  const db = await getDb()
  const status = opts.draft ? "draft" : "published"
  const { results } = await db
    .prepare("SELECT * FROM blocks WHERE page_id = ?1 AND status = ?2 ORDER BY sort ASC")
    .bind(pageId, status)
    .all<BlockRow>()
  return (results ?? []).map(mapBlock)
}

export async function getPageMeta(id: string): Promise<PageMeta | undefined> {
  const db = await getDb()
  const row = await db
    .prepare("SELECT * FROM page_meta WHERE page_id = ?1 LIMIT 1")
    .bind(id)
    .first<PageMetaRow>()
  return row ? mapPageMeta(row) : undefined
}

export async function getSiteConfig<T = Record<string, unknown>>(
  key: string,
): Promise<T | undefined> {
  const db = await getDb()
  const row = await db
    .prepare("SELECT * FROM site_config WHERE key = ?1 LIMIT 1")
    .bind(key)
    .first<SiteConfigRow>()
  if (!row) return undefined
  return parseJson<T>(row.value, undefined as unknown as T)
}
