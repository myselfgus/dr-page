"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { StarIcon } from "@/components/blocks/cta-button"
import { type CtaRef, type ContactConfig, DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqContent {
  title: string
  subtitle: string
  items: FaqItem[]
  closer?: { text: string; ctas: CtaRef[] }
}

export interface FaqDesign {
  id?: string
  accordion?: boolean
}

export const DEFAULT_CONTENT: FaqContent = {
  title: "Perguntas Frequentes",
  subtitle: "Tire suas dúvidas sobre consultas, atendimento e abordagem terapêutica",
  items: [
    {
      question: "Você atende pelo convênio ou é particular?",
      answer:
        "O atendimento é particular. Isso permite que eu dedique o tempo necessário para cada consulta e ofereça um cuidado verdadeiramente personalizado, sem as limitações impostas pelos convênios.",
    },
    {
      question: "Você atende em domicílio?",
      answer:
        "Sim. Ofereço atendimento domiciliar especialmente para pacientes autistas, idosos e aqueles com dificuldades de locomoção. O ambiente familiar permite uma avaliação mais completa e confortável em Jundiaí e região.",
    },
    {
      question: "Como posso agendar uma consulta?",
      answer:
        "A forma mais rápida é pelo WhatsApp (11) 91539-8330 — respondo pessoalmente a cada mensagem. Se preferir, atendo também por telefone no mesmo número ou por e-mail em contato@drgustavomendes.com.",
    },
    {
      question: "Quais são as queixas mais comuns que você atende?",
      answer:
        "As queixas que mais acompanho em Jundiaí são burnout e esgotamento, ansiedade, medo e pânico, insônia, desesperança e perda de sentido. Você não precisa ter certeza de um diagnóstico para buscar ajuda — o primeiro passo é conversar.",
    },
    {
      question: "Qual é a sua especialização?",
      answer:
        "Sou especializado em Psiquiatria, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados Paliativos. CRM 218133/SP.",
    },
    {
      question: "Onde fica o consultório?",
      answer:
        "O consultório fica na Clínica Dr. Hegg - Rua Dr. Hegg, 492, Vila Arens, Jundiaí/SP, CEP 13202-544. Também ofereço atendimento domiciliar na região.",
    },
    {
      question: "Qual é o diferencial do seu atendimento?",
      answer:
        "O principal diferencial é o tempo de qualidade: consultas sem pressa, escuta atenta, atendimento domiciliar quando necessário e uma abordagem verdadeiramente humanizada que vai além do diagnóstico. Meu objetivo é que você não precise mais de um psiquiatra após nosso trabalho conjunto.",
    },
  ],
  closer: {
    text: "Ainda tem dúvidas?",
    ctas: [
      { kind: "whatsapp", label: "Fale pelo WhatsApp" },
      { kind: "phone", label: "Ligar: (11) 91539-8330" },
      { kind: "doctoralia", label: "Ver avaliações na Doctoralia" },
    ],
  },
}

export const DEFAULT_DESIGN: FaqDesign = {
  id: "faq",
  accordion: true,
}

function CloserCta({ cta, contact }: { cta: CtaRef; contact: ContactConfig }) {
  const resolved = resolveCta(cta, contact)
  const target = resolved.external ? { target: "_blank", rel: "noopener noreferrer" as const } : {}

  if (resolved.kind === "doctoralia") {
    return (
      <a
        href={resolved.href}
        {...target}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-sm hover:bg-muted/30 transition-colors text-sm font-medium text-[#00c3a5]"
      >
        <StarIcon />
        {resolved.label}
      </a>
    )
  }
  if (resolved.kind === "whatsapp") {
    return (
      <a
        href={resolved.href}
        {...target}
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        {resolved.label}
      </a>
    )
  }
  return (
    <a
      href={resolved.href}
      {...target}
      className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-sm hover:bg-muted/30 transition-colors text-sm font-medium"
    >
      {resolved.label}
    </a>
  )
}

export function FAQSection({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
  contact = DEFAULT_CONTACT,
}: {
  content?: FaqContent
  design?: FaqDesign
  contact?: ContactConfig
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id={design.id ?? "faq"} className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 text-balance">
              {content.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {content.items.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-sm overflow-hidden"
                style={{ boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.08)" }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-serif text-base md:text-lg font-medium pr-4 text-balance">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 mt-0.5 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {content.closer ? (
            <div className="mt-12 text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-4">{content.closer.text}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {content.closer.ctas.map((cta, i) => (
                  <CloserCta key={i} cta={cta} contact={contact} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
