import { NextResponse } from "next/server"
import { SITE_ORIGIN } from "@/lib/agent-discovery"

/** Anchor document for the public discovery API (RFC 9727 catalog). */
export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(
    {
      name: "Dr. Gustavo Mendes — Public Discovery API",
      version: "1.0.0",
      documentation: `${SITE_ORIGIN}/auth.md`,
      openapi: `${SITE_ORIGIN}/api/v1/openapi.json`,
      endpoints: {
        health: `${SITE_ORIGIN}/api/v1/health`,
        site: `${SITE_ORIGIN}/api/v1/site`,
        openapi: `${SITE_ORIGIN}/api/v1/openapi.json`,
      },
      authentication: "none",
      note: "Read-only public endpoints. Booking via WhatsApp only. No clinical data APIs.",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  )
}
