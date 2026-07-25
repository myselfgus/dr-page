import type { Metadata } from "next"
import { NeuroPortalPageView } from "@/components/neuro/portal-page-view"
import { StructuredData } from "@/components/blocks/StructuredData"
import { getNeuroPage, NEURO_BASE } from "@/lib/neuro-portal"
import { BASE_URL } from "@/lib/structured-data"

const page = getNeuroPage("familias")

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: `${BASE_URL}${page.path}` },
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${BASE_URL}${page.path}`,
    locale: "pt_BR",
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
}

export default function NeuroFamiliasPage() {
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: page.title,
      description: page.description,
      url: `${BASE_URL}${page.path}`,
      about: { "@type": "MedicalCondition", name: "Transtorno do Espectro Autista" },
      specialty: "Psychiatry",
      inLanguage: "pt-BR",
      author: { "@type": "Physician", name: "Dr. Gustavo Mendes e Silva", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Neurodivergência",
          item: `${BASE_URL}${NEURO_BASE}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Famílias",
          item: `${BASE_URL}${page.path}`,
        },
      ],
    },
  ]

  return (
    <>
      <StructuredData items={jsonld} />
      <NeuroPortalPageView page={page} />
    </>
  )
}
