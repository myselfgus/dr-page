import type { Metadata } from "next"
import { ConditionLandingView } from "@/components/condition-landing"
import { getConditionLanding } from "@/lib/condition-landings"
import { StructuredData } from "@/components/blocks/StructuredData"
import { DEFAULT_CONTACT } from "@/lib/site-config"

const landing = getConditionLanding("ansiedade")!

export const metadata: Metadata = {
  title: landing.title,
  description: landing.description,
  keywords: landing.keywords,
  alternates: { canonical: `https://drgustavomendes.com${landing.path}` },
  openGraph: {
    title: landing.title,
    description: landing.description,
    url: `https://drgustavomendes.com${landing.path}`,
    type: "website",
  },
}

export default function AnsiedadePage() {
  const jsonld = buildConditionJsonLd(landing)
  return (
    <>
      <StructuredData items={jsonld} />
      <ConditionLandingView landing={landing} />
    </>
  )
}

function buildConditionJsonLd(l: typeof landing) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: l.title,
      description: l.description,
      url: `https://drgustavomendes.com${l.path}`,
      about: { "@type": "MedicalCondition", name: l.eyebrow },
      audience: { "@type": "Patient" },
      specialty: "Psychiatry",
      lastReviewed: "2026-07-01",
      physician: {
        "@type": "Physician",
        name: "Dr. Gustavo Mendes e Silva",
        telephone: DEFAULT_CONTACT.phoneTel,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: l.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://drgustavomendes.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: l.eyebrow,
          item: `https://drgustavomendes.com${l.path}`,
        },
      ],
    },
  ]
}
