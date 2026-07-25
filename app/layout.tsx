import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { BackToTop } from "@/components/back-to-top"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { buildDesignTokensCss } from "@/lib/design-tokens"
import { DM_Serif_Display, Urbanist, Nunito_Sans, Roboto_Mono } from "next/font/google"

// Display · headings (serif)
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
})

// Emphasis · nav, labels, strong
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-emphasis",
})

// Body
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://drgustavomendes.com"),
  title: {
    default: "Psiquiatra em Jundiaí | Dr. Gustavo Mendes CRM 218133/SP",
    template: "%s | Dr. Gustavo Mendes - Psiquiatra em Jundiaí",
  },
  description:
    "Psiquiatra em Jundiaí. Cuidado humanizado para burnout, ansiedade, pânico e insônia. Consultas presenciais, teleconsulta e atendimento domiciliar para autistas e idosos. Agende pelo WhatsApp.",
  keywords: [
    "psiquiatra jundiaí",
    "teleconsulta psiquiátrica",
    "psiquiatra online",
    "consulta psiquiátrica humanizada",
    "burnout jundiaí",
    "esgotamento profissional",
    "tratamento síndrome do pânico",
    "tratamento insônia jundiaí",
    "atendimento domiciliar psiquiatra",
    "escuta atenta",
    "psiquiatria humanizada",
    "autismo jundiaí",
    "medicina canabinoide",
    "transtornos do sono",
    "dr gustavo mendes",
    "CRM 218133",
    "psiquiatra particular jundiaí",
    "tratamento depressão",
    "tratamento ansiedade",
    "psiquiatra autismo",
    "psiquiatra idosos",
  ],
  authors: [{ name: "Dr. Gustavo Mendes e Silva" }],
  creator: "Dr. Gustavo Mendes e Silva",
  publisher: "Dr. Gustavo Mendes e Silva",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Psiquiatra em Jundiaí | Dr. Gustavo Mendes CRM 218133/SP",
    description:
      "Psiquiatria humanizada em Jundiaí — consultas presenciais, teleconsulta e atendimento domiciliar para autistas e idosos. Agende pelo WhatsApp.",
    url: "https://drgustavomendes.com",
    siteName: "Dr. Gustavo Mendes - Psiquiatra",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://drgustavomendes.com/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "Dr. Gustavo Mendes e Silva - Psiquiatra CRM 218133/SP em Jundiaí",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psiquiatra em Jundiaí | Dr. Gustavo Mendes",
    description: "Psiquiatria humanizada em Jundiaí — teleconsulta e atendimento domiciliar.",
    images: ["https://drgustavomendes.com/og-image.jpg"],
    creator: "@drgustavomendesesilva",
  },
  alternates: {
    canonical: "https://drgustavomendes.com",
  },
  category: "Healthcare",
  classification: "Medical Services - Psychiatry",
  other: {
    "og:phone_number": "+55-11-98706-5632",
    "og:email": "contato@drgustavomendes.com",
    "og:locality": "Jundiaí",
    "og:region": "SP",
    "og:country-name": "Brasil",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const designTokensCss = await buildDesignTokensCss()

  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="Jundiaí" />
        <meta name="geo.position" content="-23.1996;-46.8764" />
        <meta name="ICBM" content="-23.1996, -46.8764" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta httpEquiv="content-language" content="pt-BR" />

        {designTokensCss ? (
          <style id="design-tokens" dangerouslySetInnerHTML={{ __html: designTokensCss }} />
        ) : null}
      </head>
      <body
        className={`${nunitoSans.variable} ${dmSerif.variable} ${urbanist.variable} ${robotoMono.variable} font-sans font-normal antialiased`}
      >
        {children}
        <BackToTop />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
