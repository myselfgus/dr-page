import { CtaButton, WhatsAppIcon, StarIcon } from "drgustavomendes-ui"

// CTAs são resolvidos por `resolveCta` no app; aqui os objetos já resolvidos
// mostram exatamente o que a política de CTA permite renderizar.
const whats = {
  kind: "whatsapp" as const,
  label: "Falar pelo WhatsApp",
  href: "https://wa.me/5511999999999",
  external: true,
}
const doctoralia = {
  kind: "doctoralia" as const,
  label: "Ver avaliações na Doctoralia",
  href: "https://www.doctoralia.com.br/",
  external: true,
}
const phone = { kind: "phone" as const, label: "Ligar para o consultório", href: "tel:+5511999999999", external: false }

export const WhatsAppPrimario = () => <CtaButton cta={whats} />

export const WhatsAppBloco = () => (
  <div className="max-w-md">
    <CtaButton cta={whats} variant="whatsapp-block" />
  </div>
)

export const DoctoraliaAvaliacoes = () => <CtaButton cta={doctoralia} />

export const TelefoneEOutline = () => (
  <div className="flex flex-wrap items-center gap-3">
    <CtaButton cta={phone} />
    <CtaButton cta={phone} variant="outline" />
  </div>
)

export const Icones = () => (
  <div className="flex items-center gap-6">
    <span className="inline-flex items-center gap-2 text-[#25D366]">
      <WhatsAppIcon className="w-6 h-6" />
      <span className="font-mono text-xs uppercase tracking-widest">WhatsAppIcon</span>
    </span>
    <span className="inline-flex items-center gap-2 text-[#00c3a5]">
      <StarIcon className="w-5 h-5" />
      <span className="font-mono text-xs uppercase tracking-widest">StarIcon</span>
    </span>
  </div>
)
