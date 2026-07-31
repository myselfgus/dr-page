import { NextResponse } from "next/server"
import { getApiCatalogLinkset } from "@/lib/agent-discovery"

/** RFC 9727 API catalog (application/linkset+json). */
export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return new NextResponse(JSON.stringify(getApiCatalogLinkset()), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
