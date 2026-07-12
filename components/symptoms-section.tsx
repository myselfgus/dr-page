import { Reveal } from "@/components/reveal"

const symptoms = [
  "Burnout",
  "Esgotamento",
  "Ansiedade",
  "Medo",
  "Pânico",
  "Insônia",
  "Desesperança",
  "Perda de sentido",
]

export function SymptomsSection() {
  return (
    <section id="queixas" className="py-16 lg:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Talvez você chegue até aqui sentindo
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {symptoms.map((symptom, index) => (
              <Reveal key={symptom} delay={index * 80}>
                <span className="inline-block font-serif text-lg sm:text-xl md:text-2xl font-light px-5 py-2.5 border border-border rounded-full text-foreground/80 hover:text-background hover:bg-foreground hover:border-foreground transition-colors duration-300 cursor-default">
                  {symptom}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
              São as queixas que mais acompanho no consultório em Jundiaí. Cada uma delas tem
              contexto, história — e caminho de cuidado.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              <span className="text-foreground font-medium">
                Você não precisa ter certeza de um diagnóstico
              </span>{" "}
              <span className="text-muted-foreground">
                — nem esperar piorar — para conversar.
              </span>
            </p>
          </Reveal>

          <Reveal delay={300}>
            <a
              href="https://wa.me/5511915398330?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all hover:scale-[1.02] text-sm sm:text-base font-medium"
            >
              Conversar pelo WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
