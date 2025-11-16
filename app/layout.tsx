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
    default: "Psiquiatra em São José do Rio Preto | Dr. Gustavo Mendes CRM 218133/SP",
    template: "%s | Dr. Gustavo Mendes - Psiquiatra em São José do Rio Preto",
  },
  description:
    "Psiquiatra em São José do Rio Preto. Consultas de 2 horas e atendimento domiciliar para autistas e idosos. Psiquiatria humanizada. Agende pelo WhatsApp.",
  keywords: [
    "psiquiatra são josé do rio preto",
    "psiquiatra rio preto",
    "consulta psiquiatra 2 horas",
    "atendimento domiciliar psiquiatra",
    "narrativas fenomenológicas",
    "psiquiatria humanizada",
    "autismo são josé rio preto",
    "medicina canabinoide",
    "transtornos do sono",
    "dr gustavo mendes",
    "CRM 218133",
    "psiquiatra particular rio preto",
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
    title: "Psiquiatra em São José do Rio Preto | Dr. Gustavo Mendes CRM 218133/SP",
    description:
      "Consultas de 2 horas e atendimento domiciliar para autistas e idosos. Psiquiatria humanizada em São José do Rio Preto. Agende pelo WhatsApp.",
    url: "https://drgustavomendes.com",
    siteName: "Dr. Gustavo Mendes - Psiquiatra",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7315E396-0A53-4FF1-B286-47B174A193BD-8vnsJqfUjIj2p0FCkFmncEujiGGn9v.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Gustavo Mendes e Silva - Psiquiatra CRM 218133/SP em São José do Rio Preto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psiquiatra em São José do Rio Preto | Dr. Gustavo Mendes",
    description:
      "Consultas de 2 horas e atendimento domiciliar. Psiquiatria humanizada em São José do Rio Preto.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7315E396-0A53-4FF1-B286-47B174A193BD-8vnsJqfUjIj2p0FCkFmncEujiGGn9v.jpeg",
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
    "og:phone_number": "+55-17-2110-1228",
    "og:email": "contato@drgustavomendes.com",
    "og:locality": "São José do Rio Preto",
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
        <meta name="geo.placename" content="São José do Rio Preto" />
        <meta name="geo.position" content="-20.8197;-49.3794" />
        <meta name="ICBM" content="-20.8197, -49.3794" />
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
              "Psiquiatra CRM 218133/SP. Consultas de 2 horas, atendimento domiciliar para autistas e idosos, narrativas fenomenológicas personalizadas.",
            medicalSpecialty: ["Psychiatry", "Sleep Medicine", "Cannabinoid Medicine"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Amadeu Segundo Cherubini, 504",
              addressLocality: "São José do Rio Preto",
              addressRegion: "SP",
              postalCode: "15091-240",
              addressCountry: "BR",
            },
            telephone: "+55-17-2110-1228",
            url: "https://drgustavomendes.com",
            priceRange: "$$",
            areaServed: {
              "@type": "City",
              name: "São José do Rio Preto",
            },
            availableService: [
              {
                "@type": "MedicalProcedure",
                name: "Consulta Psiquiátrica Estendida",
                description: "Consultas de 2 horas para avaliação completa",
              },
              {
                "@type": "MedicalProcedure",
                name: "Atendimento Domiciliar",
                description: "Atendimento em domicílio para autistas e idosos",
              },
              {
                "@type": "MedicalProcedure",
                name: "Narrativas Fenomenológicas",
                description: "Abordagem personalizada e humanizada",
              },
            ],
          })}
        </Script>

        <Script id="structured-data-local-business" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "@id": "https://drgustavomendes.com/#business",
            name: "Dr. Gustavo Mendes e Silva - Consultório de Psiquiatria",
            image: "https://drgustavomendes.com/og-image.jpg",
            description:
              "Consultório de psiquiatria humanizada em São José do Rio Preto. Atendimento diferenciado com consultas de 2 horas.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Amadeu Segundo Cherubini, 504",
              addressLocality: "São José do Rio Preto",
              addressRegion: "SP",
              postalCode: "15091-240",
              addressCountry: "BR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "-20.8197",
              longitude: "-49.3794",
            },
            telephone: "+55-17-2110-1228",
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
            description: "Psiquiatria humanizada em São José do Rio Preto",
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
                name: "Quanto tempo dura a consulta inicial?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Todas as minhas consultas iniciais têm 2 horas de duração. Esse tempo é essencial para conhecer verdadeiramente cada paciente, compreender sua história completa e construir um plano terapêutico adequado e personalizado.",
                },
              },
              {
                "@type": "Question",
                name: "Você atende pelo convênio ou é particular?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O atendimento é particular. Isso permite que eu dedique o tempo necessário para cada consulta (2 horas) e ofereça um cuidado verdadeiramente personalizado, sem as limitações impostas pelos convênios.",
                },
              },
              {
                "@type": "Question",
                name: "O que são narrativas fenomenológicas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "São documentos literários personalizados que elaboro após nossas consultas, contando sua história de forma profunda e empática. Funcionam como espelhos que refletem sua experiência vivida, suas lutas, forças e potencial de transformação.",
                },
              },
              {
                "@type": "Question",
                name: "Você atende em domicílio?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. Ofereço atendimento domiciliar especialmente para pacientes autistas, idosos e aqueles com dificuldades de locomoção. O ambiente familiar permite uma avaliação mais completa e confortável em São José do Rio Preto e região.",
                },
              },
              {
                "@type": "Question",
                name: "Como posso agendar uma consulta?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Você pode agendar pelo WhatsApp (17) 2110-1228, por telefone no mesmo número, ou pelo e-mail contato@drgustavomendes.com. Respondo pessoalmente todas as mensagens.",
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
                  text: "O consultório fica na Rua Amadeu Segundo Cherubini, 504 - São José do Rio Preto/SP, CEP 15091-240. Também ofereço atendimento domiciliar na região.",
                },
              },
              {
                "@type": "Question",
                name: "Qual é o diferencial do seu atendimento?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O principal diferencial é o tempo de qualidade: consultas de 2 horas, narrativas fenomenológicas personalizadas, atendimento domiciliar quando necessário e uma abordagem verdadeiramente humanizada que vai além do diagnóstico. Meu objetivo é que você não precise mais de um psiquiatra após nosso trabalho conjunto.",
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
