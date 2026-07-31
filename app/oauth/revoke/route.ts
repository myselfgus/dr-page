import { NextResponse } from "next/server"

/**
 * RFC 7009 token revocation. Tokens are short-lived and stateless;
 * revocation is acknowledged (best-effort) without server-side storage.
 */
export const dynamic = "force-dynamic"

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  )
  return res
}

export function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

export async function POST() {
  // Stateless JWTs: accept revocation and return 200 per RFC 7009.
  return cors(new NextResponse(null, { status: 200 }))
}
