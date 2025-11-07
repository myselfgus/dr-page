"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const philosophyPrinciples = [
  {
    name: "Abordagem Centrada na Pessoa",
    description:
      "Cada indivíduo é único, com sua própria história, contexto e necessidades. O tratamento é construído em torno de você, não de um protocolo rígido.",
    image: "/philosophy-person-centered.jpg",
    focus: "Escuta ativa, respeito à autonomia, colaboração no tratamento",
  },
  {
    name: "Tempo de Qualidade",
    description:
      "Consultas sem anotações, com atenção plena à sua presença. Estar verdadeiramente presente, sem distrações, permite uma conexão genuína e compreensão profunda.",
    image: "/philosophy-time-quality.jpg",
    focus: "Presença total, escuta sem interrupções, atenção plena ao paciente",
  },
  {
    name: "Valorização da História do Paciente",
    description:
      "Sua história merece ser contada e compreendida em sua totalidade. Criamos documentos que refletem sua experiência vivida de forma profunda e empática.",
    image: "/philosophy-narratives.jpg",
    focus: "Compreensão existencial, validação da experiência, reflexão narrativa",
  },
  {
    name: "Cuidado Orientado aos Valores Pessoais do Paciente",
    description:
      "O tratamento respeita e se alinha aos seus valores, crenças e objetivos de vida. Não há uma única forma certa de viver ou de se cuidar.",
    image: "/philosophy-values.jpg",
    focus: "Respeito aos valores individuais, alinhamento com objetivos pessoais, cuidado personalizado",
  },
  {
    name: "Contexto, Relações e Subjetividade",
    description:
      "Ninguém pode ser visto isoladamente nem tratado assim. Olhamos para toda a rede ao redor: família, trabalho, comunidade, cultura. O contexto molda quem somos.",
    image: "/philosophy-context-relations.jpg",
    focus: "Visão sistêmica, compreensão relacional, cuidado contextualizado",
  },
  {
    name: "Medicamentos como Auxiliares, com Prazo de Retirada",
    description:
      "Medicamentos são ferramentas temporárias para estabilização, não soluções permanentes. O objetivo é sempre a redução gradual e segura quando apropriado.",
    image: "/philosophy-medications.jpg",
    focus: "Uso criterioso de medicamentos, plano de retirada, busca por autonomia",
  },
  {
    name: "Autonomia e Empoderamento",
    description:
      "O objetivo é fortalecer sua capacidade de compreender e lidar com seus desafios, não criar dependência do tratamento.",
    image: "/philosophy-empowerment.jpg",
    focus: "Desenvolvimento de recursos internos, autodeterminação, crescimento pessoal",
  },
  {
    name: "Tratamento com Prazos e Metas Claros",
    description:
      "Estabelecemos objetivos concretos e prazos realistas. Você sabe onde está, para onde vai e o que esperar em cada etapa do tratamento.",
    image: "/philosophy-goals.jpg",
    focus: "Objetivos definidos, cronograma claro, expectativas realistas",
  },
  {
    name: "Ética, Transparência e Educação em Saúde",
    description:
      "Comunicação clara sobre diagnósticos, opções de tratamento, benefícios e limitações. Você tem o direito de compreender plenamente seu cuidado e aprender sobre sua saúde.",
    image: "/philosophy-ethics-education.jpg",
    focus: "Consentimento informado, honestidade, educação do paciente, respeito à dignidade",
  },
]

export function ConditionsTreated() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Filosofia do Tratamento
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Princípios que guiam minha prática clínica e o cuidado oferecido a cada paciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {philosophyPrinciples.map((principle) => (
            <Card
              key={principle.name}
              className="overflow-hidden hover:shadow-lg transition-shadow shadow-[4px_2px_2px_rgba(0,0,0,0.08)]"
            >
              <div className="relative h-48 md:h-56 lg:h-64 w-full">
                <Image src={principle.image || "/placeholder.svg"} alt={principle.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-3 text-balance">
                  {principle.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                  {principle.description}
                </p>
                <div className="pt-4 border-t hidden md:block">
                  <p className="text-xs md:text-sm font-medium mb-1">Foco:</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{principle.focus}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
