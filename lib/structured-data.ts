import type { Metadata } from "next"
import type { ContactConfig } from "@/lib/site-config"
import type { PageBlock, PageMeta } from "@/lib/pages"

const BASE_URL = "https://drgustavomendes.com"

const PAGE_LABELS: Record<string, string> = {
  home: "Início",
  about: "Sobre",
  teleconsulta: "Teleconsulta",
  domiciliar: "Atendimento Domiciliar",
  contact: "Contato",
}

const PAGE_PATHS: Record<string, string> = {
  home: "",
  about: "/about",
  teleconsulta: "/teleconsulta",
  domiciliar: "/domiciliar",
  contact: "/contact",
}

function postalAddress(contact: ContactConfig) {
  return {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  }
}

function buildPhysician(contact: ContactConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${BASE_URL}/#physician`,
    name: "Dr. Gustavo Mendes e Silva",
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Psiquiatra CRM 218133/SP. Psiquiatria humanizada, com escuta atenta e atendimento domiciliar para autistas e idosos.",
    medicalSpecialty: ["Psychiatry", "Sleep Medicine", "Cannabinoid Medicine"],
    address: postalAddress(contact),
    telephone: contact.phoneTel,
    url: BASE_URL,
    sameAs: [contact.doctoralia, contact.instagram, contact.facebook].filter(Boolean),
    priceRange: "$$",
    areaServed: { "@type": "City", name: contact.address.locality },
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Consulta Psiquiátrica",
        description: "Avaliação completa e humanizada",
      },
      {
        "@type": "MedicalProcedure",
        name: "Teleconsulta Psiquiátrica",
        description: "Consulta por vídeo, com o mesmo cuidado do atendimento presencial",
      },
      {
        "@type": "MedicalProcedure",
        name: "Atendimento Domiciliar",
        description: "Atendimento em domicílio para autistas e idosos",
      },
    ],
    availableChannel: [
      {
        "@type": "ServiceChannel",
        name: "Teleconsulta",
        serviceUrl: `${BASE_URL}/teleconsulta`,
        availableLanguage: { "@type": "Language", name: "Português" },
        serviceLocation: {
          "@type": "VirtualLocation",
          url: `${BASE_URL}/teleconsulta`,
        },
      },
    ],
  }
}

function buildMedicalBusiness(contact: ContactConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Dr. Gustavo Mendes e Silva - Psiquiatra em Jundiaí",
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Psiquiatria humanizada em Jundiaí, com escuta atenta. Consultas presenciais, teleconsulta e atendimento domiciliar.",
    address: postalAddress(contact),
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.address.lat,
      longitude: contact.address.lng,
    },
    telephone: contact.phoneTel,
    url: BASE_URL,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: contact.ratingValue,
      reviewCount: contact.reviewCount,
    },
  }
}

function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Dr. Gustavo Mendes e Silva - Psiquiatra",
    description: "Psiquiatria humanizada em Jundiaí",
    publisher: { "@type": "Person", name: "Dr. Gustavo Mendes e Silva" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

function buildBreadcrumb(pageId: string) {
  const items: unknown[] = [
    { "@type": "ListItem", position: 1, name: "Início", item: BASE_URL },
  ]
  if (pageId !== "home") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: PAGE_LABELS[pageId] ?? pageId,
      item: `${BASE_URL}${PAGE_PATHS[pageId] ?? ""}`,
    })
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  }
}

interface FaqItemLike {
  question: string
  answer: string
}

// FAQPage DERIVA do bloco `faq` — fonte única (acaba a dupla fonte de verdade).
function buildFaqPage(faqItems: FaqItemLike[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

function extractFaqItems(blocks: PageBlock[]): FaqItemLike[] {
  const faq = blocks.find((b) => b.type === "faq")
  if (!faq) return []
  const items = (faq.content as { items?: FaqItemLike[] }).items
  return Array.isArray(items) ? items : []
}

// Monta o array de blocos JSON-LD para a página, a partir de dados já resolvidos
// (funciona no caminho D1 e no fallback semeado).
export function buildStructuredData({
  pageId,
  types,
  contact,
  blocks,
}: {
  pageId: string
  types: string[]
  contact: ContactConfig
  blocks: PageBlock[]
}): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = []
  for (const t of types) {
    switch (t) {
      case "Physician":
        out.push(buildPhysician(contact))
        break
      case "MedicalBusiness":
        out.push(buildMedicalBusiness(contact))
        break
      case "WebSite":
        out.push(buildWebSite())
        break
      case "BreadcrumbList":
        out.push(buildBreadcrumb(pageId))
        break
      case "FAQPage": {
        const items = extractFaqItems(blocks)
        if (items.length > 0) out.push(buildFaqPage(items))
        break
      }
      default:
        break
    }
  }
  return out
}

// generateMetadata por página, lendo page_meta (com fallback já resolvido em loadPageMeta).
export function metadataFromMeta(pageId: string, meta: PageMeta | undefined): Metadata {
  if (!meta) return {}
  const og = meta.og as { title?: string; description?: string; image?: string; type?: string }
  const title =
    pageId === "home" ? { absolute: meta.title } : meta.title
  return {
    title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: meta.canonical ? { canonical: meta.canonical } : undefined,
    openGraph: {
      title: og.title ?? meta.title,
      description: og.description ?? meta.description,
      url: meta.canonical || undefined,
      images: og.image ? [{ url: og.image }] : undefined,
      type: (og.type as "website" | "profile" | undefined) ?? "website",
    },
  }
}
