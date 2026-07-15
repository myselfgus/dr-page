import { Reveal } from "@/components/reveal"
import { sanitizeInline } from "@/lib/sanitize"
import { type CtaRef, type ContactConfig, DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export interface SymptomsContent {
  eyebrow: string
  chips: string[]
  paras: string[]
  cta: CtaRef
}

export interface SymptomsDesign {
  id?: string
  align?: "center"
  showCta?: boolean
}

export const DEFAULT_CONTENT: SymptomsContent = {
  eyebrow: "Talvez você chegue até aqui sentindo",
  chips: [
    "Burnout",
    "Esgotamento",
    "Ansiedade",
    "Medo",
    "Pânico",
    "Insônia",
    "Desesperança",
    "Perda de sentido",
  ],
  paras: [
    "São as queixas que mais acompanho no consultório em Jundiaí. Cada uma delas tem contexto, história — e caminho de cuidado.",
    "<strong>Você não precisa ter certeza de um diagnóstico</strong> — nem esperar piorar — para conversar.",
  ],
  cta: { kind: "whatsapp", label: "Conversar pelo WhatsApp" },
}

export const DEFAULT_DESIGN: SymptomsDesign = {
  id: "queixas",
  align: "center",
  showCta: true,
}

export function SymptomsSection({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
  contact = DEFAULT_CONTACT,
}: {
  content?: SymptomsContent
  design?: SymptomsDesign
  contact?: ContactConfig
}) {
  const cta = resolveCta(content.cta, contact)
  return (
    <section id={design.id ?? "queixas"} className="py-16 lg:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">
              {content.eyebrow}
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {content.chips.map((symptom, index) => (
              <Reveal key={symptom} delay={index * 80}>
                <span className="inline-block font-serif text-lg sm:text-xl md:text-2xl font-light px-5 py-2.5 border border-border rounded-full text-foreground/80 hover:text-background hover:bg-foreground hover:border-foreground transition-colors duration-300 cursor-default">
                  {symptom}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            {content.paras.map((p, i) => (
              <p
                key={i}
                className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground [&_strong]:text-foreground [&_strong]:font-medium ${
                  i === content.paras.length - 1 ? "mb-8" : "mb-4"
                }`}
                dangerouslySetInnerHTML={{ __html: sanitizeInline(p) }}
              />
            ))}
          </Reveal>

          {design.showCta !== false ? (
            <Reveal delay={300}>
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all hover:scale-[1.02] text-sm sm:text-base font-medium"
              >
                {cta.label}
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
