import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
