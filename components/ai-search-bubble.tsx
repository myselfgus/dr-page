"use client"

import type { CSSProperties } from "react"
import Script from "next/script"
import { FLOAT, FLOAT_INDEX, FLOAT_Z, floatBottom } from "@/lib/float-stack"

/**
 * Cloudflare AI Search chat bubble (RAG).
 * Lowest in the float column (below WhatsApp). Glass-tinted FAB.
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
  "--search-snippet-primary-color": "rgba(26, 26, 26, 0.52)",
  "--search-snippet-primary-hover": "rgba(26, 26, 26, 0.72)",
  "--search-snippet-focus-ring": "rgba(255, 255, 255, 0.55)",
  "--search-snippet-background": "rgba(250, 250, 249, 0.92)",
  "--search-snippet-surface": "rgba(255, 255, 255, 0.94)",
  "--search-snippet-text-color": "#1a1a1a",
  "--search-snippet-text-secondary": "#5c5c5c",
  "--search-snippet-border-radius": "1rem",
  "--search-snippet-font-family":
    "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  "--chat-bubble-button-size": `${FLOAT.fabPx}px`,
  "--chat-bubble-button-icon-size": "20px",
  "--chat-bubble-button-icon-color": "rgba(255, 255, 255, 0.95)",
  "--chat-bubble-button-radius": "50%",
  "--chat-bubble-button-shadow":
    "inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -4px 10px rgba(255,255,255,0.06), 0 4px 18px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)",
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
      {/* Glass sheen overlay for the host — button itself is styled via CSS vars */}
      <div className="float-ai-glass-host" aria-hidden={false}>
        {/* @ts-expect-error custom element from AI Search snippet */}
        <chat-bubble-snippet
          api-url={`${AI_SEARCH_ORIGIN}/`}
          theme="light"
          translations={TRANSLATIONS}
          style={BUBBLE_STYLE}
        />
      </div>
    </>
  )
}
