import { NextResponse } from "next/server"
import { getOpenApiDocument } from "@/lib/agent-discovery"

export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(getOpenApiDocument(), {
    headers: {
      "Content-Type": "application/openapi+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
