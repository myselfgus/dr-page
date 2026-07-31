import { NextResponse } from "next/server"

/**
 * Security Event Token push endpoint (RFC 8417 / RFC 8935).
 * Accepts notifications; no-op store for this public discovery AS.
 */
export const dynamic = "force-dynamic"

export function POST() {
  return new NextResponse(null, { status: 202 })
}

export function GET() {
  return NextResponse.json({
    description:
      "SET push endpoint for agent identity revocation events. Providers POST here; agents do not call this.",
  })
}
