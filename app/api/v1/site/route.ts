import { NextResponse } from "next/server"
import { getPublicPracticeInfo } from "@/lib/agent-discovery"

export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(getPublicPracticeInfo(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
