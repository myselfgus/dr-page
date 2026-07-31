import { NextResponse } from "next/server"
import { SITE_ORIGIN } from "@/lib/agent-discovery"

/**
 * RFC 9728 OAuth Protected Resource Metadata.
 *
 * This site exposes only public, read-only discovery APIs. There is no
 * authorization server and no bearer-token requirement. We still publish
 * PRM so agents can discover that fact programmatically.
 */
export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(
    {
      resource: `${SITE_ORIGIN}/api/v1/`,
      resource_name: "Dr. Gustavo Mendes — Public Discovery API",
      resource_documentation: `${SITE_ORIGIN}/auth.md`,
      // Empty: no OAuth AS issues tokens for this resource (public read-only).
      authorization_servers: [],
      scopes_supported: [],
      bearer_methods_supported: ["header"],
      // Explicit signal for agents: unauthenticated access is intentional.
      // (Non-standard extension; safe to ignore.)
      unauthenticated_access: true,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  )
}
