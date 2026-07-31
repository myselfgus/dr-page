"use client"

import { WhatsAppIcon } from "@/components/blocks/cta-button"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"
import { FLOAT, FLOAT_Z, floatBottom } from "@/lib/float-stack"

export function WhatsAppFloat() {
  const wa = resolveCta(
    { kind: "whatsapp", label: "Fale conosco no WhatsApp" },
    DEFAULT_CONTACT,
  )

  const bottom = floatBottom(0)
  const size = FLOAT.fabPx

  return (
    <a
      href={wa.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#20BA5A] hover:scale-105 group"
      style={{
        bottom: `max(${bottom}px, calc(env(safe-area-inset-bottom, 0px) + ${bottom}px))`,
        right: FLOAT.edgePx,
        width: size,
        height: size,
        zIndex: FLOAT_Z.whatsapp,
      }}
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />

      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
        Fale conosco no WhatsApp
      </span>
    </a>
  )
}
