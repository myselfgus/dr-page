"use client"

import type { CSSProperties } from "react"
import Script from "next/script"
import { FLOAT, FLOAT_INDEX, FLOAT_Z, floatBottom } from "@/lib/float-stack"

/**
 * Cloudflare AI Search chat bubble (RAG).
 * Lowest in the float column (below WhatsApp).
 * Toggle = light glass FAB; conversation panel = solid frosted glass (not see-through).
 */

const AI_SEARCH_ORIGIN =
  "https://cba878db-5dd7-451c-9683-efe56df1f139.search.ai.cloudflare.com"
const SNIPPET_SRC = `${AI_SEARCH_ORIGIN}/assets/v0.0.40/search-snippet.es.js`

const TRANSLATIONS = JSON.stringify({
  chatTitle: "Pergunte sobre o consultório",
  chatPlaceholder: "Ex.: atende teleconsulta? burnout?",
  chatInputAriaLabel: "Mensagem para o assistente",
  sendButtonLabel: "Enviar",
  sendButtonAriaLabel: "Enviar mensagem",
  chatEmptyTitle: "Como posso ajudar?",
  chatEmptyDescription:
    "Pergunte sobre modalidades, especialidades ou como agendar. Não envie dados clínicos sensíveis.",
  openChatAriaLabel: "Abrir assistente do site",
  clearHistoryAriaLabel: "Limpar conversa",
  minimizeAriaLabel: "Minimizar",
  closeAriaLabel: "Fechar",
  loadingAriaLabel: "Carregando",
  errorPrefix: "Erro:",
  userAvatar: "Você",
  assistantAvatar: "Dr. G",
  unknownError: "Algo deu errado. Tente de novo ou fale no WhatsApp.",
  poweredBy: "Busca com",
  poweredByLinkLabel: "Cloudflare AI Search",
})

const bubbleBottom = floatBottom(FLOAT_INDEX.ai)

const BUBBLE_STYLE = {
  // Toggle FAB — soft glass (semi-transparent dark)
  "--search-snippet-primary-color": "rgba(26, 26, 26, 0.58)",
  "--search-snippet-primary-hover": "rgba(26, 26, 26, 0.78)",
  "--search-snippet-focus-ring": "rgba(26, 26, 26, 0.12)",
  // Conversation panel — solid frosted glass (readable, not transparent)
  "--search-snippet-background": "#ffffff",
  "--search-snippet-surface": "#f6f5f2",
  "--search-snippet-hover-background": "#efeeea",
  "--search-snippet-text-color": "#1a1a1a",
  "--search-snippet-text-secondary": "#5a5a5a",
  "--search-snippet-text-description": "#3d3d3d",
  "--search-snippet-border-color": "rgba(0, 0, 0, 0.08)",
  "--search-snippet-border-radius": "1.1rem",
  "--search-snippet-shadow-lg":
    "0 18px 50px rgba(0,0,0,0.14), 0 4px 14px rgba(0,0,0,0.06)",
  "--search-snippet-font-family":
    "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  "--chat-bubble-button-size": `${FLOAT.fabPx}px`,
  "--chat-bubble-button-icon-size": "20px",
  "--chat-bubble-button-icon-color": "rgba(255, 255, 255, 0.96)",
  "--chat-bubble-button-radius": "50%",
  "--chat-bubble-button-shadow":
    "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -4px 10px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.14)",
  "--chat-bubble-window-shadow":
    "0 20px 56px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.06)",
  "--chat-bubble-button-bottom": `calc(${bubbleBottom}px + env(safe-area-inset-bottom, 0px))`,
  "--chat-bubble-button-right": `calc(${FLOAT.edgePx}px + env(safe-area-inset-right, 0px))`,
  // Keep under WhatsApp (10050)
  "--chat-bubble-button-z-index": String(FLOAT_Z.ai),
  "--search-snippet-z-popover": "10040",
  "--search-snippet-z-modal": "10040",
  "--search-snippet-z-dropdown": "10040",
} as CSSProperties

export function AiSearchBubble() {
  return (
    <>
      <Script src={SNIPPET_SRC} type="module" strategy="lazyOnload" />
      {/* @ts-expect-error custom element from AI Search snippet */}
      <chat-bubble-snippet
        api-url={`${AI_SEARCH_ORIGIN}/`}
        theme="light"
        translations={TRANSLATIONS}
        style={BUBBLE_STYLE}
      />
    </>
  )
}
