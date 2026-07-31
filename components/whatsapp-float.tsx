"use client"

import { WhatsAppIcon } from "@/components/blocks/cta-button"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"
import { FLOAT, FLOAT_INDEX, FLOAT_Z, floatBottom } from "@/lib/float-stack"

export function WhatsAppFloat() {
  const wa = resolveCta(
    { kind: "whatsapp", label: "Fale conosco no WhatsApp" },
    DEFAULT_CONTACT,
  )

  const bottom = floatBottom(FLOAT_INDEX.whatsapp)
  const size = FLOAT.fabPx

  return (
    <a
      href={wa.href}
      target="_blank"
      rel="noopener noreferrer"
      className="float-fab-glass float-fab-whatsapp fixed z-50 flex items-center justify-center rounded-full group"
      style={{
        bottom: `max(${bottom}px, calc(env(safe-area-inset-bottom, 0px) + ${bottom}px))`,
        right: FLOAT.edgePx,
        width: size,
        height: size,
        zIndex: FLOAT_Z.whatsapp,
      }}
      aria-label="Falar no WhatsApp"
    >
      <span className="float-fab-glass__shine" aria-hidden />
      <WhatsAppIcon className="w-[22px] h-[22px] relative z-[1] drop-shadow-sm" />

      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground/90 backdrop-blur-md text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block shadow-md">
        Fale conosco no WhatsApp
      </span>
    </a>
  )
}
