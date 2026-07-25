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
      name: "Metas claras, tudo explicado",
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

/** Desktop bento areas a–f (see .principles-bento in globals.css). */
const BENTO_AREAS = ["a", "b", "c", "d", "e", "f"] as const

type CardLayout = "wide-left" | "wide-right" | "portrait" | "split"

const BENTO_LAYOUT: CardLayout[] = [
  "wide-left",
  "portrait",
  "portrait",
  "wide-right",
  "split",
  "split",
]

function NumberBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex font-mono text-[11px] tracking-[0.2em] text-foreground/70 bg-background/85 backdrop-blur-sm border border-border/60 rounded-full px-3 py-1">
      {String(n).padStart(2, "0")}
    </span>
  )
}

function PrincipleMedia({
  src,
  alt,
  driftAlt,
  className,
  sizes,
  badge,
}: {
  src: string
  alt: string
  driftAlt?: boolean
  className?: string
  sizes: string
  badge?: number
}) {
  return (
    <div className={`principle-media relative overflow-hidden bg-muted/40 ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${driftAlt ? "img-drift-alt" : "img-drift"}`}
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/55 via-transparent to-transparent" />
      {badge != null ? (
        <span className="absolute top-3.5 left-3.5 z-[1]">
          <NumberBadge n={badge} />
        </span>
      ) : null}
    </div>
  )
}

function FocusLine({ text, show }: { text: string; show: boolean }) {
  if (!show) return null
  return (
    <p className="mt-auto pt-3 border-t border-border/70 text-[11px] sm:text-xs text-foreground/65 leading-relaxed tracking-wide">
      {text}
    </p>
  )
}

function PrincipleCard({
  principle,
  number,
  image,
  layout,
  showFocus,
  numbered,
}: {
  principle: PrincipleItem
  number: number
  image: string
  layout: CardLayout
  showFocus: boolean
  numbered: boolean
}) {
  const title = (
    <h3 className="font-serif text-xl sm:text-2xl font-light mb-2.5 text-balance leading-snug">
      {principle.name}
    </h3>
  )
  const body = (
    <p className="text-sm sm:text-[0.95rem] text-muted-foreground leading-relaxed mb-4 flex-1">
      {principle.description}
    </p>
  )
  const focus = <FocusLine text={principle.focus} show={showFocus} />

  if (layout === "wide-left" || layout === "wide-right") {
    const imageEnd = layout === "wide-right"
    return (
      <article className="h-full min-h-[260px] lg:min-h-[300px] overflow-hidden rounded-2xl border border-border bg-card shadow-card grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <PrincipleMedia
          src={image}
          alt={principle.imageAlt ?? principle.name}
          driftAlt={number % 2 === 0}
          className={`aspect-[16/11] md:aspect-auto md:min-h-full ${imageEnd ? "md:order-2" : ""}`}
          sizes="(max-width: 768px) 100vw, 42vw"
          badge={numbered ? number : undefined}
        />
        <div
          className={`flex flex-col justify-center p-6 sm:p-7 lg:p-8 ${imageEnd ? "md:order-1" : ""}`}
        >
          {title}
          {body}
          {focus}
        </div>
      </article>
    )
  }

  if (layout === "portrait") {
    return (
      <article className="h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card min-h-[300px] lg:min-h-full">
        <PrincipleMedia
          src={image}
          alt={principle.imageAlt ?? principle.name}
          driftAlt={number % 2 === 1}
          className="aspect-[5/4] lg:flex-[1.05] lg:aspect-auto lg:min-h-[180px] shrink-0"
          sizes="(max-width: 1024px) 100vw, 28vw"
          badge={numbered ? number : undefined}
        />
        <div className="flex flex-col flex-1 p-5 sm:p-6 lg:flex-none">
          {title}
          {body}
          {focus}
        </div>
      </article>
    )
  }

  return (
    <article className="h-full flex flex-col sm:flex-row lg:flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card min-h-[240px]">
      <PrincipleMedia
        src={image}
        alt={principle.imageAlt ?? principle.name}
        driftAlt={number % 2 === 0}
        className="aspect-[16/10] sm:w-[40%] sm:aspect-auto sm:min-h-[200px] lg:w-auto lg:aspect-[16/10] lg:min-h-0 shrink-0"
        sizes="(max-width: 640px) 100vw, 40vw"
        badge={numbered ? number : undefined}
      />
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {title}
        {body}
        {focus}
      </div>
    </article>
  )
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
  const [featured, ...rest] = content.items

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

          {featured ? (
            <Reveal variant="scale" className="mb-5 md:mb-6 lg:mb-7">
              <article className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div className="lg:col-span-5 principle-media relative aspect-[5/4] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-muted/40">
                  <Image
                    src={featured.image ?? DEFAULT_IMAGES[0]}
                    alt={featured.imageAlt ?? featured.name}
                    fill
                    className="object-cover img-drift"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/30" />
                </div>
                <div className="lg:col-span-7 flex flex-col justify-center p-7 sm:p-9 lg:p-12 xl:p-14">
                  {numbered ? (
                    <p className="font-mono text-xs text-muted-foreground mb-3 tracking-[0.25em]">
                      01 — PRINCÍPIO GUIA
                    </p>
                  ) : null}
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] font-light mb-4 text-balance leading-snug max-w-xl">
                    {featured.name}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-xl">
                    {featured.description}
                  </p>
                  {showFocus ? (
                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed tracking-wide">
                      {featured.focus}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ) : null}

          {/*
            Bento assimétrico:
            mobile  → 1 coluna
            md      → 2 colunas
            lg+     → áreas nomeadas (a wide + b portrait, etc.) via globals.css
          */}
          <div className="principles-bento">
            {rest.map((principle, i) => {
              const area = BENTO_AREAS[i] ?? "a"
              const layout = BENTO_LAYOUT[i] ?? "split"
              const number = i + 2
              const image = principle.image ?? DEFAULT_IMAGES[number - 1] ?? DEFAULT_IMAGES[0]
              const reveal: "left" | "right" | "scale" | "item" =
                i % 3 === 0 ? "left" : i % 3 === 1 ? "right" : "scale"

              return (
                <Reveal
                  key={principle.name}
                  variant={reveal}
                  delay={(i % 3) * 70}
                  className={`principles-bento__${area} h-full min-h-0`}
                >
                  <PrincipleCard
                    principle={principle}
                    number={number}
                    image={image}
                    layout={layout}
                    showFocus={showFocus}
                    numbered={numbered}
                  />
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
