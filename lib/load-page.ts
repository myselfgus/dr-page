import seed from "@/db/seed-data.json"
import { getPage, getPageBlocks, getPageMeta, getSiteConfig, type Page, type PageBlock, type PageMeta } from "@/lib/pages"
import {
  type ContactConfig,
  type NavConfig,
  type BrandConfig,
  DEFAULT_CONTACT,
  DEFAULT_NAV,
  DEFAULT_BRAND,
} from "@/lib/site-config"

// ---------------------------------------------------------------------------
// Orquestra a leitura do D1 com fallback total nos dados semeados (db/seed-data.json).
// Qualquer falha do D1 (ex.: build sem binding) cai nos defaults — o build nunca quebra.
// ---------------------------------------------------------------------------

interface SeedBlock {
  id: string
  page_id: string
  sort: number
  type: string
  content: Record<string, unknown>
  design: Record<string, unknown>
  status: string
}

interface SeedPage {
  id: string
  path: string
  status: string
  renders_header: number
  renders_footer: number
  back_button: number
  sort: number
}

interface SeedMeta {
  page_id: string
  title: string
  description: string
  canonical: string
  keywords: string[]
  og_json: Record<string, unknown>
  jsonld_types: string[]
}

const SEED = seed as unknown as {
  site_config: { contact: ContactConfig; nav: NavConfig; brand: BrandConfig }
  pages: SeedPage[]
  page_meta: SeedMeta[]
  blocks: SeedBlock[]
}

function seedToPage(p: SeedPage): Page {
  return {
    id: p.id,
    path: p.path,
    status: p.status,
    rendersHeader: p.renders_header === 1,
    rendersFooter: p.renders_footer === 1,
    backButton: p.back_button === 1,
    sort: p.sort,
  }
}

function seedToBlock(b: SeedBlock): PageBlock {
  return {
    id: b.id,
    pageId: b.page_id,
    parentId: null,
    sort: b.sort,
    type: b.type,
    content: b.content,
    design: b.design,
    status: b.status,
  }
}

function seedToMeta(m: SeedMeta): PageMeta {
  return {
    pageId: m.page_id,
    title: m.title,
    description: m.description,
    canonical: m.canonical,
    keywords: m.keywords,
    og: m.og_json,
    twitter: {},
    robots: {},
    jsonldTypes: m.jsonld_types,
  }
}

export function fallbackPage(id: string): Page | undefined {
  const p = SEED.pages.find((x) => x.id === id)
  return p ? seedToPage(p) : undefined
}

export function fallbackBlocks(id: string): PageBlock[] {
  return SEED.blocks
    .filter((b) => b.page_id === id)
    .sort((a, b) => a.sort - b.sort)
    .map(seedToBlock)
}

export function fallbackMeta(id: string): PageMeta | undefined {
  const m = SEED.page_meta.find((x) => x.page_id === id)
  return m ? seedToMeta(m) : undefined
}

export interface LoadedPage {
  page: Page | undefined
  blocks: PageBlock[]
  contact: ContactConfig
  nav: NavConfig
  brand: BrandConfig
  meta: PageMeta | undefined
}

export async function loadPage(
  id: string,
  opts: { draft?: boolean } = {},
): Promise<LoadedPage> {
  let page = fallbackPage(id)
  let blocks = fallbackBlocks(id)
  let contact: ContactConfig = SEED.site_config.contact ?? DEFAULT_CONTACT
  let nav: NavConfig = SEED.site_config.nav ?? DEFAULT_NAV
  let brand: BrandConfig = SEED.site_config.brand ?? DEFAULT_BRAND
  let meta = fallbackMeta(id)

  try {
    const [dbPage, dbBlocks, dbMeta, dbContact, dbNav, dbBrand] = await Promise.all([
      getPage(id).catch(() => undefined),
      getPageBlocks(id, { draft: opts.draft }).catch(() => [] as PageBlock[]),
      getPageMeta(id).catch(() => undefined),
      getSiteConfig<ContactConfig>("contact").catch(() => undefined),
      getSiteConfig<NavConfig>("nav").catch(() => undefined),
      getSiteConfig<BrandConfig>("brand").catch(() => undefined),
    ])

    // Prefer D1, but keep seed flags when D1 page row is older (e.g. missing global chrome).
    if (dbPage) {
      const seedPage = fallbackPage(id)
      page = {
        ...dbPage,
        // Seed is source of truth for chrome flags after design-system rollout.
        rendersHeader: seedPage?.rendersHeader ?? dbPage.rendersHeader,
        rendersFooter: seedPage?.rendersFooter ?? dbPage.rendersFooter,
        backButton: seedPage?.backButton ?? dbPage.backButton,
      }
    }
    if (dbBlocks && dbBlocks.length > 0) {
      // Merge seed-only blocks (e.g. new testimonials) without wiping D1 edits.
      const seedBlocks = fallbackBlocks(id)
      const dbIds = new Set(dbBlocks.map((b) => b.id))
      const missing = seedBlocks.filter((b) => !dbIds.has(b.id))
      blocks = [...dbBlocks, ...missing].sort((a, b) => a.sort - b.sort)
    }
    if (dbMeta) meta = dbMeta
    if (dbContact) contact = dbContact
    if (dbNav) nav = dbNav
    if (dbBrand) brand = dbBrand
  } catch {
    // Mantém os fallbacks semeados — build sem D1 nunca quebra.
  }

  return { page, blocks, contact, nav, brand, meta }
}

export async function loadPageMeta(id: string): Promise<{ meta: PageMeta | undefined }> {
  let meta = fallbackMeta(id)
  try {
    const dbMeta = await getPageMeta(id)
    if (dbMeta) meta = dbMeta
  } catch {
    // fallback
  }
  return { meta }
}
