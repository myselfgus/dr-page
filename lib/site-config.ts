// ---------------------------------------------------------------------------
// Fonte única de contato / nav / brand (espelha site_config na D1).
// Os DEFAULT_* são o fallback quando a D1 está indisponível (build) ou vazia.
// Os valores são EXATOS aos renderizados hoje no site.
// ---------------------------------------------------------------------------

export interface ContactConfig {
  phoneDisplay: string
  phoneTel: string
  whatsappNumber: string
  whatsappDefaultText: string
  email: string
  doctoralia: string
  instagram?: string
  facebook?: string
  crm: string
  address: {
    clinic: string
    street: string
    cityLine: string
    locality: string
    region: string
    postalCode: string
    country: string
    lat: string
    lng: string
  }
  mapEmbed: string
  /** Só na D1 (`site_config.contact`) — não versionar no código; muda com frequência. */
  reviewCount?: string
  ratingValue?: string
}

export interface NavConfig {
  items: { label: string; href: string }[]
}

export interface BrandConfig {
  name: string
  crm: string
  tagline: string
}

export const DEFAULT_CONTACT: ContactConfig = {
  phoneDisplay: "(11) 98706-5632",
  phoneTel: "+5511987065632",
  whatsappNumber: "5511987065632",
  whatsappDefaultText: "Olá, gostaria de agendar uma consulta",
  email: "contato@drgustavomendes.com",
  doctoralia: "https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai",
  instagram: "https://www.instagram.com/drgustavomendesesilva",
  facebook: "https://www.facebook.com/drgustavomendesesilva",
  crm: "CRM 218133/SP",
  address: {
    clinic: "Clínica Dr. Hegg",
    street: "Rua Dr. Hegg, 492 - Vila Arens",
    cityLine: "Jundiaí, SP - CEP 13202-544",
    locality: "Jundiaí",
    region: "SP",
    postalCode: "13202-544",
    country: "BR",
    lat: "-23.1996",
    lng: "-46.8764",
  },
  mapEmbed:
    "https://www.google.com/maps?q=Cl%C3%ADnica%20Doutor%20Hegg%2C%20Rua%20Dr.%20Hegg%2C%20492%20-%20Vila%20Arens%2C%20Jundia%C3%AD%20-%20SP%2C%2013202-544&hl=pt-BR&z=16&output=embed",
}

export const DEFAULT_NAV: NavConfig = {
  items: [
    { label: "Teleconsulta", href: "/teleconsulta" },
    { label: "Domiciliar", href: "/domiciliar" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: "/about" },
  ],
}

export const DEFAULT_BRAND: BrandConfig = {
  name: "Dr. Gustavo Mendes e Silva",
  crm: "CRM 218133/SP",
  tagline:
    "Psiquiatria humanizada, com escuta atenta e atendimento domiciliar quando necessário.",
}

// ---------------------------------------------------------------------------
// CtaRef — referência de CTA reutilizável dentro de content_json.
// Nunca hardcode número/URL no bloco: resolve-se via site_config.contact.
// ---------------------------------------------------------------------------
export interface CtaRef {
  kind: "whatsapp" | "phone" | "email" | "doctoralia" | "internal"
  label: string
  text?: string
  href?: string
}

export interface ResolvedCta {
  kind: CtaRef["kind"]
  label: string
  href: string
  external: boolean
}

export function resolveCta(cta: CtaRef, contact: ContactConfig = DEFAULT_CONTACT): ResolvedCta {
  switch (cta.kind) {
    case "whatsapp": {
      const text = cta.text ?? contact.whatsappDefaultText
      return {
        kind: "whatsapp",
        label: cta.label,
        href: `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
        external: true,
      }
    }
    case "phone":
      return { kind: "phone", label: cta.label, href: `tel:${contact.phoneTel}`, external: false }
    case "email":
      return { kind: "email", label: cta.label, href: `mailto:${contact.email}`, external: false }
    case "doctoralia":
      return { kind: "doctoralia", label: cta.label, href: contact.doctoralia, external: true }
    case "internal":
    default:
      return { kind: "internal", label: cta.label, href: cta.href ?? "#", external: false }
  }
}
