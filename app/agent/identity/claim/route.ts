import { NextRequest, NextResponse } from "next/server"
import { SITE_ORIGIN } from "@/lib/agent-discovery"

/**
 * Optional claim ceremony for anonymous agents that later bind to a human.
 * Discovery:read tokens do not require completing claim.
 */
export const dynamic = "force-dynamic"

export function GET(request: NextRequest) {
  const claimToken = request.nextUrl.searchParams.get("claim_token")
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Agent claim — Dr. Gustavo Mendes</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.5;color:#1a1a1a}
    code{background:#f4f4f4;padding:.1rem .35rem;border-radius:4px}
    .note{background:#f8f8f6;border:1px solid #e5e5e0;border-radius:12px;padding:1rem 1.25rem}
  </style>
</head>
<body>
  <h1>Agent claim</h1>
  <p>This page is the optional <strong>claim ceremony</strong> for anonymous agent registrations on <code>drgustavomendes.com</code>.</p>
  <div class="note">
    <p><strong>Discovery APIs do not require claim.</strong> Anonymous agents already receive a <code>discovery:read</code> identity assertion from <code>POST /agent/identity</code>.</p>
    <p>Claim is only if a human later wants to take ownership of an agent registration. No clinical data is collected here.</p>
    ${claimToken ? `<p>Claim token received: <code>${claimToken.slice(0, 24)}…</code></p>` : ""}
    <p>Docs: <a href="${SITE_ORIGIN}/auth.md">${SITE_ORIGIN}/auth.md</a></p>
  </div>
</body>
</html>`
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    body = {}
  }
  // Acknowledge claim completion without binding PII (public marketing site).
  return NextResponse.json({
    status: "claimed",
    registration_id: body.registration_id ?? null,
    claim_token: body.claim_token ?? null,
    note: "Claim acknowledged. discovery:read access continues via access_token from /oauth/token.",
  })
}
