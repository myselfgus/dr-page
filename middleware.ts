import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { formatLinkHeader, HOMEPAGE_LINK_HEADERS } from "@/lib/agent-discovery"

const APEX = "drgustavomendes.com"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? ""

  // Canonical host: apex only (evita conteúdo duplicado www / apex).
  if (host === `www.${APEX}`) {
    const url = request.nextUrl.clone()
    url.host = APEX
    url.protocol = "https"
    return NextResponse.redirect(url, 308)
  }

  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // HTML de páginas: evita stale-while-revalidate de ~1 ano do ISR do Next.
  // Em deploy no Cloudflare Assets os chunks antigos somem; HTML stale
  // apontando para hashes mortos vira "Application error" no client.
  const accept = request.headers.get("accept") ?? ""
  const path = request.nextUrl.pathname
  const isDocument =
    accept.includes("text/html") ||
    (!path.includes(".") && !path.startsWith("/_next"))
  if (isDocument) {
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300, must-revalidate",
    )
  }

  // RFC 8288 Link headers for agent discovery (homepage + top-level docs).
  if (path === "/" || path === "") {
    response.headers.set("Link", formatLinkHeader(HOMEPAGE_LINK_HEADERS))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
