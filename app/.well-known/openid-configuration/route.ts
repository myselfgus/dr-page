import { NextResponse } from "next/server"
import { getOpenIdConfiguration } from "@/lib/agent-auth"

/** OpenID Connect Discovery 1.0 */
export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(getOpenIdConfiguration(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
