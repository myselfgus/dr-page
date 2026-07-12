"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="about" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 text-balance">
            Sobre o Dr. Gustavo
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">CRM 218133/SP</p>
        </div>

        <div className="md:hidden space-y-6 mb-12">
          <div className="relative h-[350px]">
            <img
              src="/images/dr-gustavo-perfil.jpg"
              alt="Dr. Gustavo Mendes e Silva"
              className="w-full h-full object-cover rounded-sm"
              style={{ boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.15)" }}
            />
          </div>

          <Button asChild className="w-full">
            <Link href="/about">
              Saiba mais quem sou
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="w-full">
            {isExpanded ? "Ver menos" : "Ver mais"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>

          {isExpanded && (
            <div className="space-y-8 pt-4">
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-light text-balance">Formação e Experiência</h3>
                <p className="text-sm leading-relaxed">
                  Acredito que o cuidado psiquiátrico exige{" "}
                  <strong className="font-semibold">tempo, escuta atenta</strong> e uma compreensão profunda das
                  circunstâncias únicas de cada paciente. Cada pessoa traz consigo uma{" "}
                  <strong className="font-semibold">narrativa complexa</strong> que merece ser ouvida integralmente.
                </p>
                <p className="text-sm leading-relaxed">
                  Dedico a cada consulta <strong className="font-semibold">o tempo necessário</strong> para conhecer
                  verdadeiramente cada pessoa, compreender sua história e construir um plano terapêutico adequado.
                </p>
                <p className="text-sm leading-relaxed">
                  Especializado em{" "}
                  <strong className="font-semibold">
                    Psiquiatria, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados
                    Paliativos
                  </strong>
                  , ofereço uma abordagem abrangente e integrada ao cuidado em saúde mental.
                </p>
              </div>

              <div className="bg-muted/30 rounded-sm p-6" style={{ boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.08)" }}>
                <h3 className="font-serif text-xl font-light mb-4 text-balance">Diferenciais</h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Um dos diferenciais do meu trabalho é a criação de{" "}
                    <strong className="font-semibold">narrativas fenomenológicas personalizadas</strong> para cada
                    paciente. Após nossas consultas, elaboro um{" "}
                    <strong className="font-semibold">documento literário</strong> que conta sua história de forma
                    profunda e empática—espelhos que refletem a experiência vivida, lutas, forças e potencial de
                    transformação.
                  </p>
                  <p className="text-muted-foreground">
                    Para <strong className="font-semibold text-foreground">pacientes autistas, idosos</strong> e aqueles
                    com dificuldades de locomoção, ofereço{" "}
                    <strong className="font-semibold text-foreground">atendimento domiciliar</strong>. O ambiente
                    familiar permite uma avaliação mais completa e confortável, garantindo que o cuidado chegue a quem
                    realmente precisa.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
          <div className="space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light mb-6 text-balance">
              Formação e Experiência
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Acredito que o cuidado psiquiátrico exige <strong className="font-semibold">tempo, escuta atenta</strong>{" "}
              e uma compreensão profunda das circunstâncias únicas de cada paciente. Cada pessoa traz consigo uma{" "}
              <strong className="font-semibold">narrativa complexa</strong> que merece ser ouvida integralmente.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Dedico a cada consulta <strong className="font-semibold">o tempo necessário</strong> para conhecer
              verdadeiramente cada pessoa, compreender sua história e construir um plano terapêutico adequado.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Especializado em{" "}
              <strong className="font-semibold">
                Psiquiatria, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados
                Paliativos
              </strong>
              , ofereço uma abordagem abrangente e integrada ao cuidado em saúde mental.
            </p>

            <div className="pt-4">
              <Button asChild variant="outline" className="w-full md:w-auto bg-transparent">
                <Link href="/about">
                  Ver currículo completo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[400px] lg:h-[500px]">
            <img
              src="/images/dr-gustavo-perfil.jpg"
              alt="Dr. Gustavo Mendes e Silva"
              className="w-full h-full object-cover rounded-sm"
              style={{ boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.15)" }}
            />
          </div>
        </div>

        <div
          className="hidden md:block bg-muted/30 rounded-sm p-8 lg:p-12"
          style={{ boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.08)" }}
        >
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light mb-6 text-center text-balance">
            Diferenciais
          </h3>
          <div className="max-w-3xl mx-auto space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              Um dos diferenciais do meu trabalho é a criação de{" "}
              <strong className="font-semibold">narrativas fenomenológicas personalizadas</strong> para cada paciente.
              Após nossas consultas, elaboro um <strong className="font-semibold">documento literário</strong> que conta
              sua história de forma profunda e empática—espelhos que refletem a experiência vivida, lutas, forças e
              potencial de transformação.
            </p>
            <p className="text-muted-foreground">
              Para <strong className="font-semibold text-foreground">pacientes autistas, idosos</strong> e aqueles com
              dificuldades de locomoção, ofereço{" "}
              <strong className="font-semibold text-foreground">atendimento domiciliar</strong>. O ambiente familiar
              permite uma avaliação mais completa e confortável, garantindo que o cuidado chegue a quem realmente
              precisa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
