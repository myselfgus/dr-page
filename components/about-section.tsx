import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { sanitizeInline } from "@/lib/sanitize"
import { type CtaRef, type ContactConfig, DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export interface AboutContent {
  title: string
  subtitle: string
  image: string
  imageAlt: string
  ctaPrimary: CtaRef
  formacaoTitle: string
  formacaoParas: string[]
  diferenciaisTitle: string
  diferenciaisParas: string[]
}

export interface AboutDesign {
  variant?: "home"
  collapsibleOnMobile?: boolean
}

export const DEFAULT_CONTENT: AboutContent = {
  title: "Sobre o Dr. Gustavo",
  subtitle: "CRM 218133/SP",
  image: "/images/dr-gustavo-studio.jpg",
  imageAlt: "Dr. Gustavo Mendes e Silva",
  ctaPrimary: { kind: "internal", label: "Ver currículo completo", href: "/about" },
  formacaoTitle: "Formação e Experiência",
  formacaoParas: [
    "Acredito que o cuidado psiquiátrico exige <strong>tempo, escuta atenta</strong> e uma compreensão profunda das circunstâncias únicas de cada paciente. Cada pessoa traz consigo uma <strong>história complexa</strong> que merece ser ouvida integralmente.",
    "Dedico a cada consulta <strong>o tempo necessário</strong> para conhecer verdadeiramente cada pessoa, compreender sua história e construir um plano terapêutico adequado.",
    "Minha prática inclui <strong>Psiquiatria, TDAH em adultos, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados Paliativos</strong>, em uma abordagem integrada ao cuidado em saúde mental.",
  ],
  diferenciaisTitle: "Diferenciais",
  diferenciaisParas: [
    "Meu compromisso é olhar para você por inteiro — não apenas o sintoma, mas o contexto que o cerca: <strong>trabalho, sono, relações, história</strong>. E com um objetivo claro desde o começo: <strong>devolver sua autonomia</strong>. Não quero te manter em tratamento para sempre.",
    "Quando indicado, o plano pode integrar <strong>manejo medicamentoso e acompanhamento psicoterapêutico</strong>, com objetivos claros, reavaliação e decisões compartilhadas.",
  ],
}

export const DEFAULT_DESIGN: AboutDesign = {
  variant: "home",
  collapsibleOnMobile: false,
}

export function AboutSection({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
  contact = DEFAULT_CONTACT,
}: {
  content?: AboutContent
  design?: AboutDesign
  contact?: ContactConfig
}) {
  const cta = resolveCta(content.ctaPrimary, contact)
  const external = content.ctaPrimary.kind === "internal" ? false : cta.external

  return (
    <section id="about" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 text-balance">
            {content.title}
          </h2>
          <p className="font-mono text-xs sm:text-sm md:text-base tracking-wide text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light mb-6 text-balance">
              {content.formacaoTitle}
            </h3>
            {content.formacaoParas.map((p, i) => (
              <p
                key={i}
                className="text-sm sm:text-base md:text-lg leading-relaxed [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: sanitizeInline(p) }}
              />
            ))}

            <div className="pt-4">
              <Link
                href={cta.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="glass-pill inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-emphasis"
              >
                {cta.label}
                <ExternalLink className="h-4 w-4 opacity-70" />
              </Link>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[400px] lg:h-[500px] order-1 lg:order-2 overflow-hidden rounded-2xl border border-border shadow-card bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.image}
              alt={content.imageAlt}
              className="w-full h-full object-cover object-[center_18%]"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-card">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light mb-6 text-center text-balance">
            {content.diferenciaisTitle}
          </h3>
          <div className="max-w-3xl mx-auto space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">
            {content.diferenciaisParas.map((p, i) => (
              <p
                key={i}
                className={`[&_strong]:font-semibold [&_strong]:text-foreground ${
                  i === 0 ? "" : "text-muted-foreground"
                }`}
                dangerouslySetInnerHTML={{ __html: sanitizeInline(p) }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
