import { NextRequest, NextResponse } from "next/server"
import { SITE_ORIGIN } from "@/lib/agent-discovery"

/**
 * Authorization endpoint (RFC 6749).
 * Interactive browser login is not used — agents register anonymously
 * via POST /agent/identity (see /auth.md). This endpoint documents that.
 */
export const dynamic = "force-dynamic"

export function GET(request: NextRequest) {
  const redirectUri = request.nextUrl.searchParams.get("redirect_uri")
  const state = request.nextUrl.searchParams.get("state")
  const responseType = request.nextUrl.searchParams.get("response_type")

  // If a client insists on the authorize redirect, bounce with an error
  // that points agents to auth.md / anonymous registration.
  if (redirectUri && responseType) {
    try {
      const u = new URL(redirectUri)
      u.searchParams.set("error", "unsupported_response_type")
      u.searchParams.set(
        "error_description",
        "Use anonymous agent registration at /agent/identity — see /auth.md",
      )
      if (state) u.searchParams.set("state", state)
      return NextResponse.redirect(u.toString(), 302)
    } catch {
      // fall through
    }
  }

  return NextResponse.json(
    {
      error: "interaction_not_supported",
      error_description:
        "This authorization server uses agentic anonymous registration, not browser login. POST /agent/identity with type=anonymous, then exchange at /oauth/token. See https://drgustavomendes.com/auth.md",
      registration_endpoint: `${SITE_ORIGIN}/agent/identity`,
      token_endpoint: `${SITE_ORIGIN}/oauth/token`,
      documentation: `${SITE_ORIGIN}/auth.md`,
    },
    { status: 400 },
  )
}
