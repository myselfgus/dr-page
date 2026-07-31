"use client"

import { useEffect } from "react"
import {
  executeMcpTool,
  getPublicPracticeInfo,
  SITE_ORIGIN,
} from "@/lib/agent-discovery"

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/)
 * Registers browser-side tools for in-page AI agents.
 * Supports both document.modelContext and navigator.modelContext shapes.
 */

type ToolDef = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown
}

type ModelContextLike = {
  registerTool: (
    tool: ToolDef,
    options?: { signal?: AbortSignal },
  ) => Promise<void> | void
  provideContext?: (ctx: { tools: ToolDef[] }) => Promise<void> | void
}

function getModelContext(): ModelContextLike | null {
  if (typeof window === "undefined") return null
  const doc = document as Document & { modelContext?: ModelContextLike }
  const nav = navigator as Navigator & { modelContext?: ModelContextLike }
  return doc.modelContext ?? nav.modelContext ?? null
}

const TOOLS: ToolDef[] = [
  {
    name: "get_practice_info",
    description:
      "Public facts about Dr. Gustavo Mendes e Silva (CRM, clinic, contact, modalities). No clinical data.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () => executeMcpTool("get_practice_info"),
  },
  {
    name: "list_condition_pages",
    description:
      "List condition landing pages with absolute URLs (ansiedade, burnout, etc.).",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () => executeMcpTool("list_condition_pages"),
  },
  {
    name: "get_whatsapp_booking_link",
    description:
      "Return the WhatsApp deep link to start booking. Optional non-clinical message.",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Optional prefilled WhatsApp text (non-clinical).",
        },
      },
      additionalProperties: false,
    },
    execute: async (args) => executeMcpTool("get_whatsapp_booking_link", args),
  },
  {
    name: "navigate_site",
    description:
      "Navigate this tab to a same-origin path (e.g. /teleconsulta, /ansiedade, /blog).",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Site path starting with /",
        },
      },
      required: ["path"],
      additionalProperties: false,
    },
    execute: async (args) => {
      const raw = typeof args.path === "string" ? args.path : "/"
      const path = raw.startsWith("/") ? raw : `/${raw}`
      // Block open redirects
      if (path.startsWith("//") || path.includes("://")) {
        throw new Error("Only same-origin paths are allowed")
      }
      const url = new URL(path, SITE_ORIGIN)
      window.location.assign(url.pathname + url.search + url.hash)
      return { navigatedTo: url.pathname }
    },
  },
  {
    name: "open_whatsapp_booking",
    description:
      "Open WhatsApp booking in a new tab (primary CTA for this site).",
    inputSchema: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      additionalProperties: false,
    },
    execute: async (args) => {
      const result = executeMcpTool(
        "get_whatsapp_booking_link",
        args,
      ) as { url: string }
      window.open(result.url, "_blank", "noopener,noreferrer")
      return result
    },
  },
]

export function WebMcpProvider() {
  useEffect(() => {
    const ac = new AbortController()
    let cancelled = false

    async function register() {
      const mc = getModelContext()
      if (!mc || cancelled) return

      // Prefer registerTool (current WebMCP draft); fall back to provideContext.
      if (typeof mc.registerTool === "function") {
        for (const tool of TOOLS) {
          if (cancelled) return
          try {
            await mc.registerTool(tool, { signal: ac.signal })
          } catch {
            // Browser may reject unknown tools; continue with others.
          }
        }
        return
      }

      if (typeof mc.provideContext === "function") {
        try {
          await mc.provideContext({ tools: TOOLS })
        } catch {
          // ignore
        }
      }
    }

    // Expose a tiny debug hook for scanners that probe window globals.
    ;(window as unknown as { __drWebMcpTools?: string[] }).__drWebMcpTools =
      TOOLS.map((t) => t.name)

    // Practice info also available without MCP for simple page agents.
    ;(window as unknown as { __drPracticeInfo?: unknown }).__drPracticeInfo =
      getPublicPracticeInfo()

    void register()

    // Re-try shortly in case the UA injects modelContext after load.
    const t = window.setTimeout(() => void register(), 500)

    return () => {
      cancelled = true
      ac.abort()
      window.clearTimeout(t)
    }
  }, [])

  return null
}
