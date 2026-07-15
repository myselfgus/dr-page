import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { BackToTop } from "@/components/back-to-top"
import { WhatsAppFloat } from "@/components/whatsapp-float"
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
    creator: "@drgustavomendes",
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
    "og:phone_number": "+55-11-91539-8330",
    "og:email": "contato@drgustavomendes.com",
    "og:locality": "Jundiaí",
    "og:region": "SP",
    "og:country-name": "Brasil",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

        <Script id="structured-data-physician" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "@id": "https://drgustavomendes.com/#physician",
            name: "Dr. Gustavo Mendes e Silva",
            image: "https://drgustavomendes.com/og-image.jpg",
            description:
              "Psiquiatra CRM 218133/SP. Psiquiatria humanizada, com escuta atenta e atendimento domiciliar para autistas e idosos.",
            medicalSpecialty: ["Psychiatry", "Sleep Medicine", "Cannabinoid Medicine"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Dr. Hegg, 492 - Vila Arens",
              addressLocality: "Jundiaí",
              addressRegion: "SP",
              postalCode: "13202-544",
              addressCountry: "BR",
            },
            telephone: "+55-11-91539-8330",
            url: "https://drgustavomendes.com",
            sameAs: ["https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai"],
            priceRange: "$$",
            areaServed: {
              "@type": "City",
              name: "Jundiaí",
            },
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
                serviceUrl: "https://drgustavomendes.com/teleconsulta",
                availableLanguage: { "@type": "Language", name: "Português" },
                serviceLocation: {
                  "@type": "VirtualLocation",
                  url: "https://drgustavomendes.com/teleconsulta",
                },
              },
            ],
          })}
        </Script>

        <Script id="structured-data-local-business" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "@id": "https://drgustavomendes.com/#business",
            name: "Dr. Gustavo Mendes e Silva - Psiquiatra em Jundiaí",
            image: "https://drgustavomendes.com/og-image.jpg",
            description:
              "Psiquiatria humanizada em Jundiaí, com escuta atenta. Consultas presenciais, teleconsulta e atendimento domiciliar.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Dr. Hegg, 492 - Vila Arens",
              addressLocality: "Jundiaí",
              addressRegion: "SP",
              postalCode: "13202-544",
              addressCountry: "BR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "-23.1996",
              longitude: "-46.8764",
            },
            telephone: "+55-11-91539-8330",
            url: "https://drgustavomendes.com",
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
              ratingValue: "5.0",
              reviewCount: "50",
            },
          })}
        </Script>

        <Script id="structured-data-website" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://drgustavomendes.com/#website",
            url: "https://drgustavomendes.com",
            name: "Dr. Gustavo Mendes e Silva - Psiquiatra",
            description: "Psiquiatria humanizada em Jundiaí",
            publisher: {
              "@type": "Person",
              name: "Dr. Gustavo Mendes e Silva",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://drgustavomendes.com/?s={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

        <Script id="structured-data-breadcrumb" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://drgustavomendes.com",
              },
            ],
          })}
        </Script>

        <Script id="structured-data-faq" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Você atende pelo convênio ou é particular?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O atendimento é particular. Isso permite que eu dedique o tempo necessário para cada consulta e ofereça um cuidado verdadeiramente personalizado, sem as limitações impostas pelos convênios.",
                },
              },
              {
                "@type": "Question",
                name: "Você atende em domicílio?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. Ofereço atendimento domiciliar especialmente para pacientes autistas, idosos e aqueles com dificuldades de locomoção. O ambiente familiar permite uma avaliação mais completa e confortável em Jundiaí e região.",
                },
              },
              {
                "@type": "Question",
                name: "Como posso agendar uma consulta?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A forma mais rápida é pelo WhatsApp (11) 91539-8330 — respondo pessoalmente a cada mensagem. Se preferir, atendo também por telefone no mesmo número ou por e-mail em contato@drgustavomendes.com.",
                },
              },
              {
                "@type": "Question",
                name: "Quais são as queixas mais comuns que você atende?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As queixas que mais acompanho em Jundiaí são burnout e esgotamento, ansiedade, medo e pânico, insônia, desesperança e perda de sentido. Você não precisa ter certeza de um diagnóstico para buscar ajuda — o primeiro passo é conversar.",
                },
              },
              {
                "@type": "Question",
                name: "Qual é a sua especialização?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sou especializado em Psiquiatria, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados Paliativos. CRM 218133/SP.",
                },
              },
              {
                "@type": "Question",
                name: "Onde fica o consultório?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O consultório fica na Clínica Dr. Hegg - Rua Dr. Hegg, 492, Vila Arens, Jundiaí/SP, CEP 13202-544. Também ofereço atendimento domiciliar na região.",
                },
              },
              {
                "@type": "Question",
                name: "Qual é o diferencial do seu atendimento?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O principal diferencial é o tempo de qualidade: consultas sem pressa, escuta atenta, atendimento domiciliar quando necessário e uma abordagem verdadeiramente humanizada que vai além do diagnóstico. Meu objetivo é que você não precise mais de um psiquiatra após nosso trabalho conjunto.",
                },
              },
            ],
          })}
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
