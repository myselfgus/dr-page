import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackButton } from "@/components/back-button"
import { CtaButton, StarIcon } from "@/components/blocks/cta-button"
import { Reveal } from "@/components/reveal"
import {
  CONDITION_LANDINGS,
  type ConditionLanding,
} from "@/lib/condition-landings"
import {
  DEFAULT_BRAND,
  DEFAULT_CONTACT,
  DEFAULT_NAV,
  resolveCta,
} from "@/lib/site-config"

const LANDING_IMAGES: Record<string, string> = {
  ansiedade: "/images/principles/01-pessoa.jpg",
  burnout: "/images/principles/02-tempo.jpg",
  insonia: "/images/principles/08-metas.jpg",
  panico: "/images/principles/05-contexto.jpg",
  "tdah-adultos": "/images/principles/03-historia.jpg",
  "medicina-canabinoide": "/images/principles/06-medicamentos.jpg",
}

export function ConditionLandingView({ landing }: { landing: ConditionLanding }) {
  const wa = resolveCta(
    { kind: "whatsapp", label: landing.waLabel, text: landing.waText },
    DEFAULT_CONTACT,
  )
  const doctoralia = resolveCta(
    { kind: "doctoralia", label: "Ver avaliações na Doctoralia" },
    DEFAULT_CONTACT,
  )
  const tele = resolveCta(
    { kind: "internal", label: "Saiba mais sobre teleconsulta", href: "/teleconsulta" },
    DEFAULT_CONTACT,
  )
  const heroImage = LANDING_IMAGES[landing.slug] ?? "/images/principles/01-pessoa.jpg"

  return (
    <main className="min-h-screen bg-background">
      <Header nav={DEFAULT_NAV} brand={DEFAULT_BRAND} />
      <BackButton />

      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Reveal variant="left">
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-emphasis">
                {landing.eyebrow}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 text-balance">
                {landing.h1}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {landing.lead}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start">
                <CtaButton cta={wa} />
                <CtaButton cta={doctoralia} />
              </div>
              <p className="mt-6 text-sm text-muted-foreground inline-flex items-center gap-2">
                <StarIcon className="w-4 h-4 text-[#00c3a5]" />
                Avaliações na Doctoralia
              </p>
            </Reveal>
            <Reveal variant="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-card bg-muted/30">
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {landing.sections.map((section, i) => (
        <section
          key={section.heading}
          className={`py-12 lg:py-16 border-t border-border ${i % 2 === 1 ? "bg-muted/30" : ""}`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Reveal variant={i % 2 === 0 ? "left" : "right"}>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-6 text-balance">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paras.map((p, j) => (
                    <p key={j} className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="py-12 lg:py-16 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Reveal variant="item">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-8 text-balance">
                Perguntas frequentes
              </h2>
              <div className="space-y-4">
                {landing.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-card border border-border rounded-2xl p-6 shadow-card"
                  >
                    <h3 className="font-serif text-lg font-medium mb-2 text-balance">{faq.question}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Internal links — fortalece cluster de intenções no Google */}
      <section className="py-12 lg:py-14 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Reveal variant="item">
              <h2 className="font-serif text-xl sm:text-2xl font-medium mb-5 text-balance">
                Outros caminhos de cuidado
              </h2>
              <ul className="flex flex-wrap gap-2.5">
                {CONDITION_LANDINGS.filter((c) => c.slug !== landing.slug).map((c) => (
                  <li key={c.path}>
                    <Link
                      href={c.path}
                      className="inline-block text-sm px-4 py-2 rounded-full border border-border bg-card text-foreground/80 hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
                    >
                      {c.eyebrow}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/teleconsulta"
                    className="inline-block text-sm px-4 py-2 rounded-full border border-border bg-card text-foreground/80 hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
                  >
                    Teleconsulta
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal variant="item">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-balance">
                Pronto para conversar?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Atendimento particular em Jundiaí, presencial ou por teleconsulta. Forneço a
                documentação necessária para você solicitar reembolso ao seu convênio, conforme
                as regras do seu plano.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CtaButton cta={wa} />
                <CtaButton cta={tele} variant="outline" />
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                <Link href="/" className="underline-offset-4 hover:underline">
                  Voltar ao início
                </Link>
                {" · "}
                <Link href="/about" className="underline-offset-4 hover:underline">
                  Sobre
                </Link>
                {" · "}
                <Link href="/#contact" className="underline-offset-4 hover:underline">
                  Contato
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer contact={DEFAULT_CONTACT} nav={DEFAULT_NAV} brand={DEFAULT_BRAND} />
    </main>
  )
}
