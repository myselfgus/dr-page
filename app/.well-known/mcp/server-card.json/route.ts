import { NextResponse } from "next/server"
import { getMcpServerCard } from "@/lib/agent-discovery"

/** MCP Server Card (SEP-1649). */
export const dynamic = "force-static"
export const revalidate = 3600

export function GET() {
  return NextResponse.json(getMcpServerCard(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
