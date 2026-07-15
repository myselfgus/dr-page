import type { ResolvedCta } from "@/lib/site-config"

// Ícone WhatsApp (glifo oficial) reutilizado nos CTAs verdes.
export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// Ícone estrela usado exclusivamente no link de avaliações da Doctoralia.
export function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

// Política CTA (inegociável):
// - whatsapp   → botão primário verde #25D366
// - doctoralia → SEMPRE link de avaliações text-[#00c3a5] com estrela, nunca botão
// - phone/email/internal → botão preto ou outline
export function CtaButton({
  cta,
  variant = "primary",
  className = "",
}: {
  cta: ResolvedCta
  variant?: "primary" | "outline" | "whatsapp-block"
  className?: string
}) {
  const targetProps = cta.external
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {}

  // Doctoralia é sempre o link de avaliações (social proof), nunca botão preenchido.
  if (cta.kind === "doctoralia") {
    return (
      <a
        href={cta.href}
        {...targetProps}
        className={`inline-flex items-center justify-center gap-2 text-sm font-medium text-[#00c3a5] hover:text-[#00ab91] transition-colors ${className}`}
      >
        <StarIcon />
        {cta.label}
      </a>
    )
  }

  if (cta.kind === "whatsapp") {
    if (variant === "whatsapp-block") {
      return (
        <a
          href={cta.href}
          {...targetProps}
          className={`flex items-center justify-center gap-3 w-full bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#20BA5A] transition-colors shadow-lg ${className}`}
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span className="font-medium text-lg">{cta.label}</span>
        </a>
      )
    }
    return (
      <a
        href={cta.href}
        {...targetProps}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#20BA5A] transition-colors text-sm sm:text-base font-medium ${className}`}
      >
        <WhatsAppIcon className="w-4 h-4" />
        {cta.label}
      </a>
    )
  }

  // phone / email / internal
  if (variant === "outline") {
    return (
      <a
        href={cta.href}
        {...targetProps}
        className={`inline-flex items-center justify-center px-6 py-3 border border-border rounded-full hover:bg-muted/30 transition-colors text-sm font-medium ${className}`}
      >
        {cta.label}
      </a>
    )
  }
  return (
    <a
      href={cta.href}
      {...targetProps}
      className={`inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all hover:scale-[1.02] text-sm sm:text-base font-medium ${className}`}
    >
      {cta.label}
    </a>
  )
}
