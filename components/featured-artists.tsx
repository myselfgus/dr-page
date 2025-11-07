"use client"

import { Card } from "@/components/ui/card"
import { User, Pill, AlertCircle, ClipboardList, FileText, RefreshCw, MessageCircle, Handshake } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfairDisplay = Playfair_Display({ subsets: ["latin"] })

const services = [
  {
    name: "Terapia Individual",
    description: "Sessões individualizadas adaptadas às suas necessidades e objetivos únicos",
    icon: User,
  },
  {
    name: "Gestão de Medicação",
    description: "Avaliação e monitoramento especializado de medicação psiquiátrica",
    icon: Pill,
  },
  {
    name: "Intervenção em Crise",
    description: "Suporte imediato durante crises agudas de saúde mental",
    icon: AlertCircle,
  },
  {
    name: "Avaliação Diagnóstica",
    description: "Avaliação e diagnóstico psiquiátrico abrangente",
    icon: ClipboardList,
  },
  {
    name: "Planejamento de Tratamento",
    description: "Planos de cuidado personalizados para sua jornada de recuperação",
    icon: FileText,
  },
  {
    name: "Acompanhamento",
    description: "Suporte e monitoramento contínuos para garantir a eficácia do tratamento",
    icon: RefreshCw,
  },
  {
    name: "Psicoterapia",
    description: "Abordagens terapêuticas baseadas em evidências incluindo TCC, TCD e terapia psicodinâmica",
    icon: MessageCircle,
  },
  {
    name: "Serviços de Consultoria",
    description: "Consultoria psiquiátrica especializada para casos complexos",
    icon: Handshake,
  },
]

export function ServicesOffered() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12">
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold mb-4">Serviços Oferecidos</h2>
          <p className="text-muted-foreground text-xl">Cuidado psiquiátrico abrangente adaptado às suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.name}
                className="group overflow-hidden border-0 bg-card hover:shadow-lg transition-all p-6 shadow-[4px_2px_2px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-4 text-foreground">
                  <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className={`${playfairDisplay.className} text-2xl md:text-3xl font-light mb-2`}>{service.name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { ServicesOffered as FeaturedArtists }
