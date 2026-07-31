import { NextRequest, NextResponse } from "next/server"
import {
  executeMcpTool,
  getMcpServerCard,
  MCP_TOOLS,
  SITE_ORIGIN,
} from "@/lib/agent-discovery"

/**
 * Minimal Streamable HTTP MCP endpoint (JSON-RPC 2.0).
 * Public discovery tools only — no clinical data, no auth.
 */
export const dynamic = "force-dynamic"

type JsonRpcId = string | number | null

interface JsonRpcRequest {
  jsonrpc?: string
  id?: JsonRpcId
  method?: string
  params?: Record<string, unknown>
}

function ok(id: JsonRpcId | undefined, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id: id ?? null, result })
}

function err(
  id: JsonRpcId | undefined,
  code: number,
  message: string,
  data?: unknown,
) {
  return NextResponse.json({
    jsonrpc: "2.0",
    id: id ?? null,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  })
}

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
    "Access-Control-Expose-Headers": "MCP-Protocol-Version",
    "MCP-Protocol-Version": "2024-11-05",
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

/** GET returns the server card for simple discovery probes. */
export function GET() {
  return NextResponse.json(getMcpServerCard(), {
    headers: {
      ...corsHeaders(),
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}

export async function POST(request: NextRequest) {
  let body: JsonRpcRequest
  try {
    body = (await request.json()) as JsonRpcRequest
  } catch {
    return err(null, -32700, "Parse error", undefined)
  }

  const id = body.id
  const method = body.method
  const params = body.params ?? {}

  if (!method) {
    return withCors(err(id, -32600, "Invalid Request: method required"))
  }

  try {
    switch (method) {
      case "initialize":
        return withCors(
          ok(id, {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: { listChanged: false },
            },
            serverInfo: {
              name: "dr-gustavo-mendes",
              version: "1.0.0",
            },
            instructions:
              "Public discovery MCP for Dr. Gustavo Mendes e Silva (CRM 218133/SP). Use tools to fetch practice info and WhatsApp booking links. Do not collect clinical data. Prefer WhatsApp for scheduling.",
          }),
        )

      case "notifications/initialized":
      case "ping":
        return withCors(ok(id, {}))

      case "tools/list":
        return withCors(
          ok(id, {
            tools: MCP_TOOLS.map((t) => ({
              name: t.name,
              description: t.description,
              inputSchema: t.inputSchema,
            })),
          }),
        )

      case "tools/call": {
        const name = typeof params.name === "string" ? params.name : ""
        const args =
          params.arguments && typeof params.arguments === "object"
            ? (params.arguments as Record<string, unknown>)
            : {}
        if (!name) {
          return withCors(err(id, -32602, "Invalid params: name required"))
        }
        try {
          const result = executeMcpTool(name, args)
          return withCors(
            ok(id, {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(result, null, 2),
                },
              ],
              structuredContent: result,
              isError: false,
            }),
          )
        } catch (e) {
          const message = e instanceof Error ? e.message : "Tool error"
          return withCors(
            ok(id, {
              content: [{ type: "text", text: message }],
              isError: true,
            }),
          )
        }
      }

      case "resources/list":
        return withCors(ok(id, { resources: [] }))

      case "prompts/list":
        return withCors(ok(id, { prompts: [] }))

      default:
        return withCors(err(id, -32601, `Method not found: ${method}`))
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal error"
    return withCors(err(id, -32603, message))
  }
}

function withCors(response: NextResponse) {
  const headers = corsHeaders()
  for (const [k, v] of Object.entries(headers)) {
    response.headers.set(k, v)
  }
  // Advertise resource for agents that look at Link on MCP too
  response.headers.set(
    "Link",
    `<${SITE_ORIGIN}/.well-known/mcp/server-card.json>; rel="service-desc"`,
  )
  return response
}
