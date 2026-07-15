import { Reveal } from "@/components/reveal"

export interface PrincipleItem {
  name: string
  description: string
  focus: string
}

export interface PrinciplesContent {
  title: string
  subtitle: string
  items: PrincipleItem[]
}

export interface PrinciplesDesign {
  columns?: 3
  numbered?: boolean
  showFocus?: boolean
  background?: string
}

export const DEFAULT_CONTENT: PrinciplesContent = {
  title: "Filosofia do Tratamento",
  subtitle: "Princípios que guiam minha prática clínica e o cuidado oferecido a cada paciente",
  items: [
    {
      name: "Abordagem Centrada na Pessoa",
      description:
        "Cada indivíduo é único, com sua própria história, contexto e necessidades. O tratamento é construído em torno de você, não de um protocolo rígido.",
      focus: "Escuta ativa, respeito à autonomia, colaboração no tratamento",
    },
    {
      name: "Tempo de Qualidade",
      description:
        "Consultas sem anotações, com atenção plena à sua presença. Estar verdadeiramente presente, sem distrações, permite uma conexão genuína e compreensão profunda.",
      focus: "Presença total, escuta sem interrupções, atenção plena ao paciente",
    },
    {
      name: "Valorização da História do Paciente",
      description:
        "Sua história merece ser ouvida e compreendida em sua totalidade. O que você sente ganha sentido quando entendido dentro do seu contexto de vida.",
      focus: "Compreensão do contexto, validação da experiência, escuta atenta",
    },
    {
      name: "Cuidado Orientado aos Valores Pessoais do Paciente",
      description:
        "O tratamento respeita e se alinha aos seus valores, crenças e objetivos de vida. Não há uma única forma certa de viver ou de se cuidar.",
      focus: "Respeito aos valores individuais, alinhamento com objetivos pessoais, cuidado personalizado",
    },
    {
      name: "Contexto, Relações e Subjetividade",
      description:
        "Ninguém pode ser visto isoladamente nem tratado assim. Olhamos para toda a rede ao redor: família, trabalho, comunidade, cultura. O contexto molda quem somos.",
      focus: "Visão sistêmica, compreensão relacional, cuidado contextualizado",
    },
    {
      name: "Medicamentos como Auxiliares, com Prazo de Retirada",
      description:
        "Medicamentos são ferramentas temporárias para estabilização, não soluções permanentes. O objetivo é sempre a redução gradual e segura quando apropriado.",
      focus: "Uso criterioso de medicamentos, plano de retirada, busca por autonomia",
    },
    {
      name: "Autonomia e Empoderamento",
      description:
        "O objetivo é fortalecer sua capacidade de compreender e lidar com seus desafios, não criar dependência do tratamento.",
      focus: "Desenvolvimento de recursos internos, autodeterminação, crescimento pessoal",
    },
    {
      name: "Tratamento com Prazos e Metas Claros",
      description:
        "Estabelecemos objetivos concretos e prazos realistas. Você sabe onde está, para onde vai e o que esperar em cada etapa do tratamento.",
      focus: "Objetivos definidos, cronograma claro, expectativas realistas",
    },
    {
      name: "Ética, Transparência e Educação em Saúde",
      description:
        "Comunicação clara sobre diagnósticos, opções de tratamento, benefícios e limitações. Você tem o direito de compreender plenamente seu cuidado e aprender sobre sua saúde.",
      focus: "Consentimento informado, honestidade, educação do paciente, respeito à dignidade",
    },
  ],
}

export const DEFAULT_DESIGN: PrinciplesDesign = {
  columns: 3,
  numbered: true,
  showFocus: true,
  background: "muted",
}

export function ConditionsTreated({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
}: {
  content?: PrinciplesContent
  design?: PrinciplesDesign
}) {
  const numbered = design.numbered !== false
  const showFocus = design.showFocus !== false

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
              {content.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {content.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {content.items.map((principle, index) => (
            <Reveal key={principle.name} delay={(index % 3) * 100}>
              <div className="group h-full bg-card border border-border p-6 md:p-8 transition-all duration-300 hover:border-foreground/40 hover:-translate-y-1">
                {numbered ? (
                  <p className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                ) : null}
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-light mb-3 text-balance">
                  {principle.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                  {principle.description}
                </p>
                {showFocus ? (
                  <div className="pt-4 border-t border-border hidden md:block transition-colors group-hover:border-foreground/20">
                    <p className="text-xs md:text-sm font-medium mb-1">Foco:</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{principle.focus}</p>
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
