import type { Metadata } from "next"
import type { ContactConfig } from "@/lib/site-config"
import { DEFAULT_CONTACT } from "@/lib/site-config"
import type { PageBlock, PageMeta } from "@/lib/pages"
import type { ConditionLanding } from "@/lib/condition-landings"
import { toAuthorInitials } from "@/lib/format"

export const BASE_URL = "https://drgustavomendes.com"
const PHYSICIAN_IMAGE = `${BASE_URL}/images/dr-gustavo-studio.jpg`
const DEFAULT_OG = `${BASE_URL}/og-image.jpg`

/** Open Graph wide (Facebook/LinkedIn/WhatsApp ideal). Arquivos em /public/og-*.jpg. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const

/**
 * ISR: páginas CMS revalidam a cada 10 min.
 * Substitui force-dynamic (no-store) — melhor TTFB para crawlers e usuários,
 * sem precisar rebuild a cada edição no admin.
 */
export const CMS_REVALIDATE_SECONDS = 600

const PAGE_LABELS: Record<string, string> = {
  home: "Início",
  about: "Sobre",
  teleconsulta: "Teleconsulta",
  contact: "Contato",
}

const PAGE_PATHS: Record<string, string> = {
  home: "",
  about: "/about",
  teleconsulta: "/teleconsulta",
  contact: "/#contact",
}

function postalAddress(contact: ContactConfig) {
  return {
    "@type": "PostalAddress",
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    addressCountry: contact.address.country,
  }
}

interface ReviewLike {
  author: string
  rating?: number
  body: string
  date?: string
  source?: string
}

function extractReviews(blocks: PageBlock[]): ReviewLike[] {
  const t = blocks.find((b) => b.type === "testimonials")
  if (!t) return []
  const items = (t.content as { items?: ReviewLike[] }).items
  return Array.isArray(items) ? items : []
}

function buildPhysician(contact: ContactConfig, blocks: PageBlock[] = []) {
  const reviews = extractReviews(blocks).slice(0, 6)
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${BASE_URL}/#physician`,
    name: "Dr. Gustavo Mendes e Silva",
    alternateName: ["Gustavo Mendes e Silva", "Dr. Gustavo Mendes", "Gustavo Mendes"],
    image: PHYSICIAN_IMAGE,
    description:
      "Psiquiatra em Jundiaí (CRM 218133/SP). Atendimento particular com escuta atenta, acompanhamento psicoterapêutico e teleconsulta.",
    medicalSpecialty: ["Psychiatry", "Sleep Medicine", "Cannabinoid Medicine"],
    knowsAbout: [
      "Psiquiatria",
      "Ansiedade",
      "Burnout",
      "Síndrome do pânico",
      "Insônia",
      "Transtornos do sono",
      "TDAH em adultos",
      "Medicina canabinoide",
      "Acompanhamento psicoterapêutico",
      "Terapia ACT",
      "Cuidados paliativos",
      "Teleconsulta psiquiátrica",
    ],
    address: postalAddress(contact),
    telephone: contact.phoneTel,
    email: contact.email,
    url: BASE_URL,
    sameAs: [contact.doctoralia, contact.instagram, contact.facebook].filter(Boolean),
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: contact.address.locality },
      { "@type": "AdministrativeArea", name: "São Paulo" },
    ],
    worksFor: { "@id": `${BASE_URL}/#business` },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "CRM",
      identifier: contact.crm,
      recognizedBy: {
        "@type": "Organization",
        name: "Conselho Regional de Medicina do Estado de São Paulo",
      },
    },
    ...(contact.ratingValue && contact.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: contact.ratingValue,
            reviewCount: contact.reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
    ...(reviews.length > 0
      ? {
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: toAuthorInitials(r.author) },
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(r.rating ?? 5),
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody: r.body,
            ...(r.date ? { datePublished: r.date.length === 7 ? `${r.date}-01` : r.date } : {}),
            ...(r.source
              ? {
                  publisher: { "@type": "Organization", name: r.source },
                  url: contact.doctoralia,
                }
              : {}),
          })),
        }
      : {}),
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Consulta Psiquiátrica",
        description: "Atendimento particular, presencial em Jundiaí ou por teleconsulta",
      },
      {
        "@type": "MedicalProcedure",
        name: "Teleconsulta Psiquiátrica",
        description: "Consulta por vídeo, com o mesmo cuidado do atendimento presencial",
      },
      {
        "@type": "MedicalProcedure",
        name: "Avaliação de TDAH em adultos",
        description: "História clínica, diagnóstico diferencial e plano individualizado",
      },
      {
        "@type": "MedicalProcedure",
        name: "Avaliação em medicina canabinoide",
        description: "Discussão de evidências, riscos, alternativas e acompanhamento clínico",
      },
      {
        "@type": "MedicalProcedure",
        name: "Acompanhamento psicoterapêutico",
        description: "Acompanhamento integrado ao plano de cuidado psiquiátrico quando indicado",
      },
    ],
    availableChannel: [
      {
        "@type": "ServiceChannel",
        name: "Teleconsulta",
        serviceUrl: `${BASE_URL}/teleconsulta`,
        availableLanguage: { "@type": "Language", name: "Portuguese", alternateName: "pt-BR" },
        serviceLocation: {
          "@type": "VirtualLocation",
          url: `${BASE_URL}/teleconsulta`,
        },
      },
    ],
  }
}

function buildMedicalBusiness(contact: ContactConfig) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${contact.address.locality} - ${contact.address.region}`,
  )}`
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Dr. Gustavo Mendes e Silva - Psiquiatra em Jundiaí",
    alternateName: "Consultório Dr. Gustavo Mendes",
    image: PHYSICIAN_IMAGE,
    description:
      "Atendimento psiquiátrico particular em Jundiaí, presencial e por teleconsulta, com documentação para solicitação de reembolso conforme o plano.",
    address: postalAddress(contact),
    hasMap: mapsUrl,
    telephone: contact.phoneTel,
    email: contact.email,
    url: BASE_URL,
    sameAs: [contact.doctoralia, contact.instagram, contact.facebook].filter(Boolean),
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Cash, Credit Card, Debit Card, PIX",
    founder: { "@id": `${BASE_URL}/#physician` },
    employee: { "@id": `${BASE_URL}/#physician` },
    medicalSpecialty: "Psychiatry",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    ...(contact.ratingValue && contact.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: contact.ratingValue,
            reviewCount: contact.reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  }
}

function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Dr. Gustavo Mendes e Silva - Psiquiatra em Jundiaí",
    alternateName: "Dr. Gustavo Mendes",
    description: "Psiquiatria particular em Jundiaí — presencial e por teleconsulta",
    inLanguage: "pt-BR",
    publisher: { "@id": `${BASE_URL}/#physician` },
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
        out.push(buildPhysician(contact, blocks))
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

/** JSON-LD for intention landings (/ansiedade, /burnout, …). */
export function buildConditionJsonLd(
  landing: ConditionLanding,
  contact: ContactConfig = DEFAULT_CONTACT,
): Record<string, unknown>[] {
  const url = `${BASE_URL}${landing.path}`
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${url}#webpage`,
      name: landing.title,
      headline: landing.h1,
      description: landing.description,
      url,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: {
        "@type": "MedicalCondition",
        name: landing.eyebrow,
      },
      audience: { "@type": "PeopleAudience", audienceType: "Patient" },
      specialty: "Psychiatry",
      lastReviewed: "2026-09-03",
      dateModified: "2026-09-03",
      author: { "@id": `${BASE_URL}/#physician` },
      reviewedBy: { "@id": `${BASE_URL}/#physician` },
      mainEntity: {
        "@type": "Physician",
        "@id": `${BASE_URL}/#physician`,
        name: "Dr. Gustavo Mendes e Silva",
        telephone: contact.phoneTel,
        url: BASE_URL,
        address: postalAddress(contact),
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2"],
      },
    },
    buildFaqPage(landing.faqs),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: landing.eyebrow, item: url },
      ],
    },
  ]
}

/** Metadata for condition landings — absolute title, OG image, twitter. */
export function metadataForCondition(landing: ConditionLanding): Metadata {
  const url = `${BASE_URL}${landing.path}`
  const ogImage = DEFAULT_OG
  return {
    title: { absolute: landing.title },
    description: landing.description,
    keywords: landing.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url,
      siteName: "Dr. Gustavo Mendes - Psiquiatra",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: ogImage,
          ...OG_IMAGE_SIZE,
          alt: `${landing.eyebrow} — Dr. Gustavo Mendes, psiquiatra em Jundiaí`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: landing.title,
      description: landing.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  }
}

export function buildArticleJsonLd(post: {
  title: string
  excerpt: string
  author: string
  date: string
  slug: string
  keywords?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author, url: BASE_URL },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
    publisher: {
      "@type": "Person",
      name: "Dr. Gustavo Mendes e Silva",
      url: BASE_URL,
      image: PHYSICIAN_IMAGE,
    },
    keywords: post.keywords?.join(", "),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
  }
}

// generateMetadata por página, lendo page_meta (com fallback já resolvido em loadPageMeta).
export function metadataFromMeta(pageId: string, meta: PageMeta | undefined): Metadata {
  if (!meta) return {}
  const og = meta.og as { title?: string; description?: string; image?: string; type?: string }
  const canonical = meta.canonical || undefined
  const ogImage = og.image ?? DEFAULT_OG
  const title =
    pageId === "home"
      ? { absolute: meta.title }
      : // absolute evita sufixo duplicado do template do layout em títulos já completos
        { absolute: meta.title.includes("|") ? meta.title : `${meta.title} | Dr. Gustavo Mendes - Psiquiatra em Jundiaí` }

  return {
    title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: og.title ?? meta.title,
      description: og.description ?? meta.description,
      url: canonical,
      siteName: "Dr. Gustavo Mendes - Psiquiatra",
      locale: "pt_BR",
      images: [{ url: ogImage, ...OG_IMAGE_SIZE, alt: meta.title }],
      type: (og.type as "website" | "profile" | undefined) ?? "website",
    },
    twitter: {
      card: "summary_large_image",
      title: og.title ?? meta.title,
      description: og.description ?? meta.description,
      images: [ogImage],
    },
  }
}
