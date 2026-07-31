import { NextResponse } from "next/server"
import { getAuthorizationServerMetadata } from "@/lib/agent-auth"

/** RFC 8414 OAuth 2.0 Authorization Server Metadata (+ agent_auth). */
export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(getAuthorizationServerMetadata(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
