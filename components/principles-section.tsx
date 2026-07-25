import Image from "next/image"
import { Reveal } from "@/components/reveal"

export interface PrincipleItem {
  name: string
  description: string
  focus: string
  image?: string
  imageAlt?: string
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

const DEFAULT_IMAGES = [
  "/images/principles/01-pessoa.jpg",
  "/images/principles/02-tempo.jpg",
  "/images/principles/03-historia.jpg",
  "/images/principles/04-valores.jpg",
  "/images/principles/05-contexto.jpg",
  "/images/principles/06-medicamentos.jpg",
  "/images/principles/07-autonomia.jpg",
  "/images/principles/08-metas.jpg",
  "/images/principles/09-etica.jpg",
]

export const DEFAULT_CONTENT: PrinciplesContent = {
  title: "Filosofia do Tratamento",
  subtitle: "Princípios que guiam minha prática clínica e o cuidado oferecido a cada paciente",
  items: [
    {
      name: "Abordagem Centrada na Pessoa",
      description:
        "Cada indivíduo é único, com sua própria história, contexto e necessidades. O tratamento é construído em torno de você, não de um protocolo rígido.",
      focus: "Escuta ativa, respeito à autonomia, colaboração no tratamento",
      image: DEFAULT_IMAGES[0],
      imageAlt: "Ilustração: escuta centrada na pessoa",
    },
    {
      name: "Tempo de Qualidade",
      description:
        "Consultas sem anotações, com atenção plena à sua presença. Estar verdadeiramente presente, sem distrações, permite uma conexão genuína e compreensão profunda.",
      focus: "Presença total, escuta sem interrupções, atenção plena ao paciente",
      image: DEFAULT_IMAGES[1],
      imageAlt: "Ilustração: tempo de qualidade na consulta",
    },
    {
      name: "Valorização da História do Paciente",
      description:
        "Sua história merece ser ouvida e compreendida em sua totalidade. O que você sente ganha sentido quando entendido dentro do seu contexto de vida.",
      focus: "Compreensão do contexto, validação da experiência, escuta atenta",
      image: DEFAULT_IMAGES[2],
      imageAlt: "Ilustração: história de vida",
    },
    {
      name: "Cuidado Orientado aos Valores Pessoais do Paciente",
      description:
        "O tratamento respeita e se alinha aos seus valores, crenças e objetivos de vida. Não há uma única forma certa de viver ou de se cuidar.",
      focus: "Respeito aos valores individuais, alinhamento com objetivos pessoais, cuidado personalizado",
      image: DEFAULT_IMAGES[3],
      imageAlt: "Ilustração: valores pessoais",
    },
    {
      name: "Contexto, Relações e Subjetividade",
      description:
        "Ninguém pode ser visto isoladamente nem tratado assim. Olhamos para toda a rede ao redor: família, trabalho, comunidade, cultura. O contexto molda quem somos.",
      focus: "Visão sistêmica, compreensão relacional, cuidado contextualizado",
      image: DEFAULT_IMAGES[4],
      imageAlt: "Ilustração: rede de relações e contexto",
    },
    {
      name: "Medicamentos como Auxiliares, com Prazo de Retirada",
      description:
        "Medicamentos são ferramentas temporárias para estabilização, não soluções permanentes. O objetivo é sempre a redução gradual e segura quando apropriado.",
      focus: "Uso criterioso de medicamentos, plano de retirada, busca por autonomia",
      image: DEFAULT_IMAGES[5],
      imageAlt: "Ilustração: medicamentos como apoio temporário",
    },
    {
      name: "Autonomia e Empoderamento",
      description:
        "O objetivo é fortalecer sua capacidade de compreender e lidar com seus desafios, não criar dependência do tratamento.",
      focus: "Desenvolvimento de recursos internos, autodeterminação, crescimento pessoal",
      image: DEFAULT_IMAGES[6],
      imageAlt: "Ilustração: autonomia",
    },
    {
      name: "Tratamento com Prazos e Metas Claros",
      description:
        "Estabelecemos objetivos concretos e prazos realistas. Você sabe onde está, para onde vai e o que esperar em cada etapa do tratamento.",
      focus: "Objetivos definidos, cronograma claro, expectativas realistas",
      image: DEFAULT_IMAGES[7],
      imageAlt: "Ilustração: metas e etapas",
    },
    {
      name: "Ética, Transparência e Educação em Saúde",
      description:
        "Comunicação clara sobre diagnósticos, opções de tratamento, benefícios e limitações. Você tem o direito de compreender plenamente seu cuidado e aprender sobre sua saúde.",
      focus: "Consentimento informado, honestidade, educação do paciente, respeito à dignidade",
      image: DEFAULT_IMAGES[8],
      imageAlt: "Ilustração: ética e transparência",
    },
  ],
}

export const DEFAULT_DESIGN: PrinciplesDesign = {
  columns: 3,
  numbered: true,
  showFocus: true,
  background: "muted",
}

function revealForIndex(index: number): "left" | "right" | "scale" | "item" {
  const col = index % 3
  if (col === 0) return "left"
  if (col === 2) return "right"
  return index % 2 === 0 ? "scale" : "item"
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
    <section className="py-16 lg:py-28 bg-muted/30 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="blur">
            <div className="text-center mb-12 lg:mb-20 max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-muted-foreground mb-4">
                Como eu cuido
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 text-balance">
                {content.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
                {content.subtitle}
              </p>
            </div>
          </Reveal>

          {/* Featured first principle — full width band */}
          {content.items[0] ? (
            <Reveal variant="scale" className="mb-8 lg:mb-10">
              <article className="group grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-shadow duration-500">
                <div className="principle-media relative aspect-[4/3] lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-muted/40">
                  <Image
                    src={content.items[0].image ?? DEFAULT_IMAGES[0]}
                    alt={content.items[0].imageAlt ?? content.items[0].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/30" />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                  {numbered ? (
                    <p className="font-mono text-xs text-muted-foreground mb-4 tracking-[0.25em]">
                      01 — PRINCÍPIO GUIA
                    </p>
                  ) : null}
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mb-4 text-balance">
                    {content.items[0].name}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {content.items[0].description}
                  </p>
                  {showFocus ? (
                    <div className="pt-5 border-t border-border">
                      <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2">
                        Foco
                      </p>
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                        {content.items[0].focus}
                      </p>
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ) : null}

          {/* Remaining principles — rich visual grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {content.items.slice(1).map((principle, i) => {
              const index = i + 1
              const image = principle.image ?? DEFAULT_IMAGES[index] ?? DEFAULT_IMAGES[0]
              const variant = revealForIndex(index)
              return (
                <Reveal key={principle.name} variant={variant} delay={(i % 3) * 90}>
                  <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-foreground/25">
                    <div className="principle-media relative aspect-[16/10] overflow-hidden bg-muted/50">
                      <Image
                        src={image}
                        alt={principle.imageAlt ?? principle.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90" />
                      {numbered ? (
                        <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] text-foreground/70 bg-background/80 backdrop-blur-sm border border-border/60 rounded-full px-3 py-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col flex-1 p-6 md:p-7 -mt-2 relative">
                      <h3 className="font-serif text-xl sm:text-2xl font-light mb-3 text-balance leading-snug">
                        {principle.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {principle.description}
                      </p>
                      {showFocus ? (
                        <div className="mt-auto pt-4 border-t border-border/80">
                          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground mb-1.5">
                            Foco
                          </p>
                          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                            {principle.focus}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
