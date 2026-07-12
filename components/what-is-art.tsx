import { Reveal } from "@/components/reveal"

export function WhatIsMentalHealth() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-balance mb-6 md:mb-8 lg:mb-12">
              Uma Abordagem Diferenciada
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-10 lg:mb-12 max-w-4xl">
              <span className="md:hidden">
                Meu compromisso é olhar para você por completo: sua história, contexto, valores e relações. Quero ser o
                último psiquiatra que você precisará conhecer.
              </span>
              <span className="hidden md:inline">
                Seja esta sua primeira vez buscando ajuda ou você já tenha passado por diversos profissionais sem
                encontrar resolução, meu compromisso é o mesmo: olhar para você por completo. Não apenas seus sintomas,
                mas sua história, seu contexto, seus valores, suas relações. Quero ser o único—ou o último—psiquiatra que
                você precisará conhecer. Isso não é possível sem compreensão profunda de quem você realmente é.
              </span>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start">
            <Reveal className="order-1 lg:order-1" delay={150}>
              <div className="h-[200px] md:h-[280px] lg:h-[400px] w-full rounded-sm border border-border bg-background flex flex-col items-center justify-center gap-6">
                <svg
                  viewBox="0 0 200 200"
                  className="w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 text-foreground/60"
                  aria-hidden="true"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="animate-breathe"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="animate-breathe"
                    style={{ animationDelay: "1.2s" }}
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="animate-breathe"
                    style={{ animationDelay: "2.4s" }}
                  />
                  <circle cx="100" cy="100" r="2.5" fill="currentColor" />
                </svg>
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground">
                  tempo · escuta · presença
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 md:space-y-6 lg:space-y-8 order-2 lg:order-2">
              <Reveal delay={200}>
                <div className="text-sm sm:text-base md:text-lg">
                  <h3 className="font-serif font-light text-foreground mb-2 text-xl sm:text-2xl md:text-3xl text-balance">
                    Você Por Completo, Não Diagnósticos
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Você não é um conjunto de sintomas ou um código diagnóstico. É uma pessoa com história, contexto e
                    singularidade. Compreender isso é o primeiro passo para um tratamento que realmente funciona.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="text-sm sm:text-base md:text-lg">
                  <h3 className="font-serif font-light text-foreground mb-2 text-xl sm:text-2xl md:text-3xl text-balance">
                    Compromisso com Sua Alta Médica
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Meu objetivo não é gerenciar sintomas indefinidamente, mas devolver sua autonomia. Trabalho para que
                    você não precise mais de mim—para que esta seja sua última experiência com psiquiatria.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="text-sm sm:text-base md:text-lg hidden md:block">
                  <h3 className="font-serif font-light text-foreground mb-2 text-xl sm:text-2xl md:text-3xl text-balance">
                    O Que Isso Exige
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Eu poderia dizer que é o tempo dedicado a cada consulta, que é meu currículo, que são minhas
                    especializações... mas nada disso faria sentido se a forma com a qual eu vejo o outro não fosse tão
                    diferente.
                  </p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    Como disse Carl Gustav Jung (também médico psiquiatra): "Conheça todas as teorias, domine todas as
                    técnicas, mas ao tocar uma alma humana seja apenas outra alma humana."
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
