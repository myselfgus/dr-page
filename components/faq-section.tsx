"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { CtaButton } from "@/components/blocks/cta-button"
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
      question: "Como funciona o atendimento particular e o reembolso?",
      answer:
        "O atendimento é particular. Forneço recibo e, quando necessário, a documentação do atendimento para que você possa solicitar reembolso ao seu convênio, conforme as regras do seu plano.",
    },
    {
      question: "Você também faz acompanhamento psicoterapêutico?",
      answer:
        "Sim. Quando faz sentido para o caso, o acompanhamento pode integrar avaliação psiquiátrica, manejo medicamentoso e acompanhamento psicoterapêutico ao longo das consultas.",
    },
    {
      question: "Como posso agendar uma consulta?",
      answer:
        "A forma mais rápida é pelo WhatsApp (11) 98706-5632 — respondo pessoalmente a cada mensagem. Se preferir, atendo também por telefone no mesmo número ou por e-mail em contato@drgustavomendes.com.",
    },
    {
      question: "Quais são as queixas mais comuns que você atende?",
      answer:
        "Costumo acompanhar TDAH em adultos, ansiedade, burnout e esgotamento, medo e pânico, insônia, neurodivergência e casos em que vale avaliar medicina canabinoide — sempre considerando o contexto de cada pessoa.",
    },
    {
      question: "Qual é a sua especialização?",
      answer:
        "Minha prática reúne Psiquiatria, TDAH em adultos, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados Paliativos. CRM 218133/SP.",
    },
    {
      question: "Onde fica o consultório?",
      answer:
        "O atendimento presencial acontece em Jundiaí/SP. A localização completa é informada diretamente durante o agendamento pelo WhatsApp.",
    },
    {
      question: "Qual é o diferencial do seu atendimento?",
      answer:
        "Tempo de qualidade, escuta atenta e um plano que pode integrar psiquiatria e acompanhamento psicoterapêutico. As escolhas são explicadas com clareza e o objetivo é fortalecer sua autonomia.",
    },
  ],
  closer: {
    text: "Ainda tem dúvidas?",
    ctas: [
      { kind: "whatsapp", label: "Fale pelo WhatsApp" },
      { kind: "phone", label: "Ligar: (11) 98706-5632" },
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
  if (resolved.kind === "whatsapp" || resolved.kind === "doctoralia") {
    return <CtaButton cta={resolved} />
  }
  return <CtaButton cta={resolved} variant="outline" />
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

  const items = Array.isArray(content?.items) ? content.items : DEFAULT_CONTENT.items
  const title = content?.title || DEFAULT_CONTENT.title
  const subtitle = content?.subtitle || DEFAULT_CONTENT.subtitle

  return (
    <section id={design?.id ?? "faq"} className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 text-balance">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {items.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-card shadow-card"
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

          {content?.closer ? (
            <div className="mt-12 text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-4">{content.closer.text}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(content.closer.ctas ?? []).map((cta, i) => (
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
