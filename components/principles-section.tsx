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
  subtitle:
    "O que os pacientes mais reconhecem no consultório — presença, clareza e respeito — é o que sustenta cada escolha clínica.",
  items: [
    {
      name: "Presença de verdade, sem pressa",
      description:
        "A consulta é um espaço para você se sentir à vontade. Atenção plena à sua presença — sem anotações correndo na tela — para que medo, dúvida e história caibam na conversa.",
      focus: "Escuta ativa · tempo de qualidade · consulta leve",
      image: DEFAULT_IMAGES[0],
      imageAlt: "Ilustração: escuta centrada na pessoa",
    },
    {
      name: "História, contexto e relações",
      description:
        "O que você sente ganha sentido dentro da sua vida inteira. Olhamos para família, trabalho, sono e rede ao redor — ninguém é tratado como um sintoma isolado.",
      focus: "Validação · visão sistêmica · cuidado contextualizado",
      image: DEFAULT_IMAGES[2],
      imageAlt: "Ilustração: história de vida, contexto e relações",
    },
    {
      name: "Alinhado aos seus valores",
      description:
        "O cuidado se molda ao que importa para você — crenças, prioridades e o modo de vida que faz sentido. Não existe uma única forma certa de se cuidar.",
      focus: "Respeito individual · objetivos pessoais · personalização",
      image: DEFAULT_IMAGES[3],
      imageAlt: "Ilustração: valores pessoais",
    },
    {
      name: "Entender antes de medicar",
      description:
        "Medicamento, quando entra, é ferramenta com critério e horizonte — não o primeiro nem o único passo. O objetivo é estabilizar com clareza e, quando apropriado, reduzir com segurança.",
      focus: "Uso criterioso · plano de retirada · autonomia",
      image: DEFAULT_IMAGES[5],
      imageAlt: "Ilustração: medicamentos como apoio temporário",
    },
    {
      name: "Autonomia, não dependência",
      description:
        "O destino do tratamento é você caminhar sozinho. Fortalecemos recursos internos e compreensão — para que, no tempo certo, você não precise mais de mim.",
      focus: "Empoderamento · autodeterminação · alta como meta",
      image: DEFAULT_IMAGES[6],
      imageAlt: "Ilustração: autonomia",
    },
    {
      name: "Metas claras, sem caixa-preta",
      description:
        "Você sabe onde está, para onde vamos e o que esperar em cada etapa. Objetivos concretos, prazos realistas e explicação didática de cada escolha.",
      focus: "Transparência · cronograma · expectativas honestas",
      image: DEFAULT_IMAGES[7],
      imageAlt: "Ilustração: metas e etapas",
    },
    {
      name: "Ética e educação em saúde",
      description:
        "Diagnósticos, opções e limites são ditos com clareza. Você tem o direito de compreender o próprio cuidado — e de decidir junto, com informação de verdade.",
      focus: "Consentimento · honestidade · dignidade",
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
  const rest = content.items.slice(1)

  return (
    <section className="py-16 lg:py-28 bg-muted/30 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="blur">
            <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
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

          {/* Featured first principle — calm full-width band, no hover motion */}
          {content.items[0] ? (
            <Reveal variant="scale" className="mb-6 lg:mb-8">
              <article className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div className="principle-media relative aspect-[5/4] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[300px] overflow-hidden bg-muted/40">
                  <Image
                    src={content.items[0].image ?? DEFAULT_IMAGES[0]}
                    alt={content.items[0].imageAlt ?? content.items[0].name}
                    fill
                    className="object-cover img-drift"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/25" />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
                  {numbered ? (
                    <p className="font-mono text-xs text-muted-foreground mb-3 tracking-[0.25em]">
                      01 — PRINCÍPIO GUIA
                    </p>
                  ) : null}
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-[2.15rem] font-light mb-4 text-balance leading-snug">
                    {content.items[0].name}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
                    {content.items[0].description}
                  </p>
                  {showFocus ? (
                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed tracking-wide">
                      {content.items[0].focus}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ) : null}

          {/* Remaining — even grid, static cards (no lift / border flash on hover) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {rest.map((principle, i) => {
              const index = i + 1
              const image = principle.image ?? DEFAULT_IMAGES[index] ?? DEFAULT_IMAGES[0]
              const variant = revealForIndex(index)
              return (
                <Reveal key={principle.name} variant={variant} delay={(i % 3) * 80}>
                  <article className="h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    <div className="principle-media relative aspect-[16/10] overflow-hidden bg-muted/50">
                      <Image
                        src={image}
                        alt={principle.imageAlt ?? principle.name}
                        fill
                        className={`object-cover ${index % 2 === 0 ? "img-drift" : "img-drift-alt"}`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/15 to-transparent" />
                      {numbered ? (
                        <span className="absolute top-3.5 left-3.5 font-mono text-[11px] tracking-[0.2em] text-foreground/70 bg-background/85 backdrop-blur-sm border border-border/60 rounded-full px-3 py-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col flex-1 p-5 sm:p-6 -mt-1 relative">
                      <h3 className="font-serif text-xl sm:text-[1.35rem] font-light mb-2.5 text-balance leading-snug">
                        {principle.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {principle.description}
                      </p>
                      {showFocus ? (
                        <p className="mt-auto pt-3 border-t border-border/70 text-[11px] sm:text-xs text-foreground/65 leading-relaxed tracking-wide">
                          {principle.focus}
                        </p>
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
