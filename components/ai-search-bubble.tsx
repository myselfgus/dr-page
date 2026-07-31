"use client"

import type { CSSProperties } from "react"
import Script from "next/script"
import { FLOAT, FLOAT_Z, floatBottom } from "@/lib/float-stack"

/**
 * Cloudflare AI Search chat bubble (RAG).
 * Same size as WhatsApp FAB; stacked directly above it in the float column.
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

// Index 1 in the float stack (above WhatsApp)
const bubbleBottom = floatBottom(1)

const BUBBLE_STYLE = {
  "--search-snippet-primary-color": "#1a1a1a",
  "--search-snippet-primary-hover": "#333333",
  "--search-snippet-focus-ring": "#e8e6e1",
  "--search-snippet-background": "#fafaf9",
  "--search-snippet-surface": "#ffffff",
  "--search-snippet-text-color": "#1a1a1a",
  "--search-snippet-text-secondary": "#5c5c5c",
  "--search-snippet-border-radius": "1rem",
  "--search-snippet-font-family":
    "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  // Match WhatsApp FAB size (48px) — default snippet is 60px
  "--chat-bubble-button-size": `${FLOAT.fabPx}px`,
  "--chat-bubble-button-icon-size": "22px",
  "--chat-bubble-button-shadow":
    "0 4px 14px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)",
  "--chat-bubble-button-bottom": `max(${bubbleBottom}px, calc(env(safe-area-inset-bottom, 0px) + ${bubbleBottom}px))`,
  "--chat-bubble-button-right": `${FLOAT.edgePx}px`,
  "--chat-bubble-button-z-index": String(FLOAT_Z.ai),
  "--search-snippet-z-popover": "60",
  "--search-snippet-z-modal": "60",
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
