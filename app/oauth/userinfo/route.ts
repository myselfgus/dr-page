import { NextRequest, NextResponse } from "next/server"
import { verifyJwt } from "@/lib/agent-auth"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization") ?? ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : ""
  if (!token) {
    return NextResponse.json(
      { error: "invalid_token", error_description: "Bearer token required" },
      {
        status: 401,
        headers: {
          "WWW-Authenticate":
            'Bearer realm="drgustavomendes", resource_metadata="https://drgustavomendes.com/.well-known/oauth-protected-resource"',
        },
      },
    )
  }
  const payload = await verifyJwt(token)
  if (!payload) {
    return NextResponse.json(
      { error: "invalid_token" },
      { status: 401 },
    )
  }
  return NextResponse.json({
    sub: payload.sub,
    agent_id: payload.agent_id ?? payload.sub,
    scope: payload.scope,
    registration_id: payload.registration_id,
  })
}
