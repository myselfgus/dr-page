import { getCloudflareContext } from "@opennextjs/cloudflare"

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  author: string
  date: string
  readTime: string
  excerpt: string
  content: string
  keywords: string[]
  scrollStyle: "scroll-reveal" | "section-overlay"
  headerImage?: string
}

// Shape of a row in the D1 `posts` table.
interface PostRow {
  slug: string
  title: string
  subtitle: string | null
  author: string
  date: string
  read_time: string
  excerpt: string
  keywords: string | null
  body_md: string
  header_image: string | null
  scroll_style: string | null
  status: string
}

function mapRow(row: PostRow): BlogPost {
  let keywords: string[] = []
  if (row.keywords) {
    try {
      const parsed = JSON.parse(row.keywords)
      if (Array.isArray(parsed)) keywords = parsed
    } catch {
      keywords = []
    }
  }

  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? "",
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    excerpt: row.excerpt,
    content: row.body_md,
    keywords,
    scrollStyle: row.scroll_style === "scroll-reveal" ? "scroll-reveal" : "section-overlay",
    headerImage: row.header_image ?? undefined,
  }
}

// Access the D1 binding (`dr_blog`) through the OpenNext Cloudflare context.
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

export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb()
  const { results } = await db
    .prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY date DESC")
    .all<PostRow>()
  return (results ?? []).map(mapRow)
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb()
  const row = await db
    .prepare("SELECT * FROM posts WHERE slug = ?1 AND status = 'published' LIMIT 1")
    .bind(slug)
    .first<PostRow>()
  return row ? mapRow(row) : undefined
}
