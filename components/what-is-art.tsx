"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"

const steps = [
  {
    title: "Você chega",
    body: "Sem pressa e sem julgamento. A primeira conversa é para entender o que te trouxe até aqui — não para te encaixar num diagnóstico pronto.",
  },
  {
    title: "A gente entende junto",
    body: "Olho para além dos sintomas: sua história, seu trabalho, suas relações, seu sono, seu corpo. O que você sente faz sentido dentro do seu contexto.",
  },
  {
    title: "Um plano claro",
    body: "Definimos objetivos concretos e o papel de cada passo — inclusive quando a medicação ajuda, como e por quanto tempo. Sem caixa-preta.",
  },
  {
    title: "Você caminha sozinho",
    body: "O objetivo nunca é te manter em tratamento para sempre. É devolver sua autonomia — para que você não precise mais de mim.",
  },
]

export function WhatIsMentalHealth() {
  const lineRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 text-center">
              Como é o cuidado
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-balance mb-6 text-center">
              Do primeiro contato à sua alta
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-center mb-16 md:mb-24 max-w-2xl mx-auto text-pretty">
              Não trato sintomas indefinidamente. Cada etapa tem um propósito — e o destino é sempre o mesmo: um momento
              em que você não precise mais de mim.
            </p>
          </Reveal>

          <div ref={lineRef} className="relative">
            {/* Linha vertical que se desenha ao entrar em tela */}
            <div
              className="absolute top-4 bottom-4 left-4 sm:left-5 w-px bg-foreground/25 origin-top transition-transform duration-[1400ms] ease-out"
              style={{ transform: drawn ? "scaleY(1)" : "scaleY(0)" }}
              aria-hidden="true"
            />

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 160}>
                  <div className="flex gap-5 sm:gap-8 group">
                    <div className="relative shrink-0 w-8 sm:w-10 flex justify-center">
                      <span className="relative z-10 mt-0.5 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-foreground/30 bg-background text-xs sm:text-sm font-mono text-foreground/70 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <div className="pt-0.5 sm:pt-1">
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light mb-2 text-balance">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={200}>
            <blockquote className="mt-16 md:mt-24 border-l border-foreground/30 pl-6 max-w-2xl mx-auto">
              <p className="font-serif text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-balance">
                "Conheça todas as teorias, domine todas as técnicas, mas ao tocar uma alma humana seja apenas outra alma
                humana."
              </p>
              <footer className="text-xs sm:text-sm text-muted-foreground mt-3">
                Carl Gustav Jung — também médico psiquiatra
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
