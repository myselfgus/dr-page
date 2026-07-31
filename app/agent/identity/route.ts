import { NextRequest, NextResponse } from "next/server"
import { registerAnonymousAgent, type RegisterBody } from "@/lib/agent-auth"

/**
 * Agent registration (Auth.md / WorkOS agentic registration).
 * Supports type=anonymous for public discovery API access.
 * Passive scanners must not POST here; documents are the source of truth.
 */
export const dynamic = "force-dynamic"

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  )
  return res
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

export function GET() {
  return cors(
    NextResponse.json({
      description:
        "Agent registration endpoint. POST JSON { type: \"anonymous\" } to register. See /auth.md",
      methods: ["anonymous"],
      documentation: "https://drgustavomendes.com/auth.md",
    }),
  )
}

export async function POST(request: NextRequest) {
  let body: RegisterBody = {}
  try {
    body = (await request.json()) as RegisterBody
  } catch {
    body = {}
  }

  const type = (body.type ?? "anonymous").toLowerCase()

  if (type !== "anonymous") {
    return cors(
      NextResponse.json(
        {
          error: "identity_type_not_enabled",
          error_description:
            "Only anonymous registration is supported. Set type to \"anonymous\". See /auth.md",
          identity_types_supported: ["anonymous"],
        },
        { status: 400 },
      ),
    )
  }

  const result = await registerAnonymousAgent(body)
  return cors(NextResponse.json(result, { status: 201 }))
}
