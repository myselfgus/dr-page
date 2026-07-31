import { NextResponse } from "next/server"
import { SITE_ORIGIN } from "@/lib/agent-discovery"

/**
 * Custom robots.txt so we can emit Content-Signal (not supported by
 * Next.js MetadataRoute.Robots). Preferences per contentsignals.org:
 * - search=yes — indexing / citation OK (GEO)
 * - ai-input=yes — RAG / grounding in assistant answers OK
 * - ai-train=no — no bulk model training on site content
 */
export const dynamic = "force-static"
export const revalidate = 3600

const BODY = `# robots.txt — https://drgustavomendes.com
# Content Signals: https://contentsignals.org/

# As a condition of accessing this website, you agree to abide by the following Content Signals:
# (a) If a content-signal = yes, you may collect content for the corresponding use.
# (b) If a content-signal = no, you may not collect content for the corresponding use.
# search: building a search index and providing search results with attribution
# ai-input: inputting content into AI models for user-facing answers (RAG / grounding)
# ai-train: training or fine-tuning foundation models

User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /
Disallow: /_preview
Disallow: /artists
Disallow: /gallery
Disallow: /curriculum

# Explicit allow for major AI retrieval crawlers (GEO)
User-agent: GPTBot
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: ChatGPT-User
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: OAI-SearchBot
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: ClaudeBot
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: Claude-Web
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: anthropic-ai
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: PerplexityBot
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: Google-Extended
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: Applebot-Extended
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

User-agent: Bytespider
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`

export function GET() {
  return new NextResponse(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
