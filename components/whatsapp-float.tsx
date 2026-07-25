"use client"

import { WhatsAppIcon } from "@/components/blocks/cta-button"
import { DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export function WhatsAppFloat() {
  const wa = resolveCta(
    { kind: "whatsapp", label: "Fale conosco no WhatsApp" },
    DEFAULT_CONTACT,
  )

  return (
    <a
      href={wa.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110 group"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />

      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco no WhatsApp
      </span>
    </a>
  )
}
