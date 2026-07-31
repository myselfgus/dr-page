import { NextRequest, NextResponse } from "next/server"
import {
  clientCredentialsToken,
  exchangeAssertionForAccessToken,
} from "@/lib/agent-auth"

export const dynamic = "force-dynamic"

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  )
  res.headers.set("Cache-Control", "no-store")
  return res
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? ""
  let grantType = ""
  let assertion = ""
  let clientName = ""

  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>
      grantType = String(body.grant_type ?? "")
      assertion = String(body.assertion ?? body.client_assertion ?? "")
      clientName = String(body.client_name ?? body.client_id ?? "")
    } else {
      const form = await request.formData()
      grantType = String(form.get("grant_type") ?? "")
      assertion = String(form.get("assertion") ?? form.get("client_assertion") ?? "")
      clientName = String(form.get("client_name") ?? form.get("client_id") ?? "")
    }
  } catch {
    return cors(
      NextResponse.json(
        { error: "invalid_request", error_description: "Could not parse body" },
        { status: 400 },
      ),
    )
  }

  if (
    grantType === "urn:ietf:params:oauth:grant-type:jwt-bearer" ||
    grantType === "urn:ietf:params:oauth:grant-type:token-exchange"
  ) {
    if (!assertion) {
      return cors(
        NextResponse.json(
          {
            error: "invalid_request",
            error_description: "assertion is required",
          },
          { status: 400 },
        ),
      )
    }
    const result = await exchangeAssertionForAccessToken(assertion)
    if ("error" in result && result.error) {
      return cors(NextResponse.json(result, { status: 400 }))
    }
    return cors(NextResponse.json(result))
  }

  if (grantType === "client_credentials") {
    const result = await clientCredentialsToken(clientName || undefined)
    return cors(NextResponse.json(result))
  }

  return cors(
    NextResponse.json(
      {
        error: "unsupported_grant_type",
        error_description:
          "Supported: urn:ietf:params:oauth:grant-type:jwt-bearer, client_credentials. Register first via POST /agent/identity (type=anonymous).",
      },
      { status: 400 },
    ),
  )
}
