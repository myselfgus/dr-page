import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { BackToTop } from "@/components/back-to-top"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { buildDesignTokensCss } from "@/lib/design-tokens"
import Script from "next/script"
import { Playfair_Display, Manrope, Roboto_Mono, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const _sourceSerif_4 = V0_Font_Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-sans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
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
    description:
      "Psiquiatria humanizada em Jundiaí — teleconsulta e atendimento domiciliar.",
    images: [
      "https://drgustavomendes.com/og-image.jpg",
    ],
    creator: "@drgustavomendesesilva",
  },
  verification: {
    google: "seu-codigo-google-search-console",
  },
  alternates: {
    canonical: "https://drgustavomendes.com",
  },
  category: "Healthcare",
  classification: "Medical Services - Psychiatry",
  other: {
    "fb:app_id": "SEU_FACEBOOK_APP_ID",
    "og:phone_number": "+55-11-98706-5632",
    "og:email": "contato@drgustavomendes.com",
    "og:locality": "Jundiaí",
    "og:region": "SP",
    "og:country-name": "Brasil",
  },
  generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Design como dado: CSS montado do D1 (design_tokens). Vazio em build/sem D1 →
  // globals.css continua como fallback. Injetado no <head> DEPOIS do globals.css.
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

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'SEU_PIXEL_ID_AQUI');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent', {
              content_name: 'Homepage',
              content_category: 'Psiquiatria'
            });
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Script
          id="google-ads"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} ${robotoMono.variable} font-sans font-light antialiased`}
      >
        {children}
        <BackToTop />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
