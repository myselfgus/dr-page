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
  series?: string
  audioUrl?: string
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
  series?: string | null
  audio_url?: string | null
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
    series: row.series ?? undefined,
    audioUrl: row.audio_url || undefined,
  }
}

// Access the D1 binding (`dr_blog`) through the OpenNext Cloudflare context.
// async: true é obrigatório em rotas com ISR/revalidate.
async function getDb(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext({ async: true })
    return (env as unknown as { dr_blog?: D1Database }).dr_blog ?? null
  } catch {
    // Build / prerender sem binding Cloudflare — caller usa fallback vazio.
    return null
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = await getDb()
    if (!db) return []
    const { results } = await db
      .prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY date DESC")
      .all<PostRow>()
    return (results ?? []).map(mapRow)
  } catch {
    // Build local / schema incompleto — lista vazia em vez de quebrar o prerender.
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const db = await getDb()
    if (!db) return undefined
    const row = await db
      .prepare("SELECT * FROM posts WHERE slug = ?1 AND status = 'published' LIMIT 1")
      .bind(slug)
      .first<PostRow>()
    return row ? mapRow(row) : undefined
  } catch {
    return undefined
  }
}

/** Group published posts by series (for index UI). */
export function groupPostsBySeries(posts: BlogPost[]): { series: string; posts: BlogPost[] }[] {
  const map = new Map<string, BlogPost[]>()
  for (const p of posts) {
    const key = p.series?.trim() || "Outros escritos"
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }
  // Keep series order by earliest post date ascending within, but display series by first post
  const groups = Array.from(map.entries()).map(([series, items]) => ({
    series,
    posts: [...items].sort((a, b) => a.date.localeCompare(b.date)),
  }))
  groups.sort((a, b) => a.posts[0]!.date.localeCompare(b.posts[0]!.date))
  return groups
}
