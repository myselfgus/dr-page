import { NextResponse } from "next/server"
import { PUBLIC_JWK } from "@/lib/agent-auth"

export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(
    { keys: [PUBLIC_JWK] },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  )
}
