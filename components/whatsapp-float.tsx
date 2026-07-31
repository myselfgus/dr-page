"use client"

import { WhatsAppIcon } from "@/components/blocks/cta-button"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"
import { FLOAT, FLOAT_INDEX, FLOAT_Z, floatBottom } from "@/lib/float-stack"

/**
 * Primary CTA — solid WhatsApp green (original look).
 * Stacked above the AI Search bubble; high z-index so it never hides under it.
 */
export function WhatsAppFloat() {
  const wa = resolveCta(
    { kind: "whatsapp", label: "Fale conosco no WhatsApp" },
    DEFAULT_CONTACT,
  )

  const bottom = floatBottom(FLOAT_INDEX.whatsapp)

  return (
    <a
      href={wa.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110 group"
      style={{
        bottom: `calc(${bottom}px + env(safe-area-inset-bottom, 0px))`,
        right: `calc(${FLOAT.edgePx}px + env(safe-area-inset-right, 0px))`,
        width: FLOAT.fabPx,
        height: FLOAT.fabPx,
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
