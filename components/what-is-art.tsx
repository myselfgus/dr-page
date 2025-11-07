"use client"

import { useEffect, useState } from "react"

export function WhatIsMentalHealth() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      src: "/mental-health-time-presence.jpg",
      alt: "Tempo de qualidade e presença terapêutica",
    },
    {
      src: "/mental-health-narratives.jpg",
      alt: "Narrativas e histórias que importam",
    },
    {
      src: "/mental-health-connection.jpg",
      alt: "Conexão humana e escuta atenta",
    },
    {
      src: "/mental-health-depth.jpg",
      alt: "Profundidade e compreensão integral",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-balance mb-6 md:mb-8 lg:mb-12">
            Uma Abordagem Diferenciada
          </h2>

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start">
            <div className="h-[200px] md:h-[280px] lg:h-[400px] w-full overflow-hidden rounded-sm relative order-1 lg:order-1">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                  }}
                />
              ))}
            </div>

            <div className="space-y-6 md:space-y-6 lg:space-y-8 order-2 lg:order-2">
              <div className="text-sm sm:text-base md:text-lg">
                <h3 className="font-serif font-light text-foreground mb-2 text-xl sm:text-2xl md:text-3xl text-balance">
                  Você Por Completo, Não Diagnósticos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Você não é um conjunto de sintomas ou um código diagnóstico. É uma pessoa com história, contexto e
                  singularidade. Compreender isso é o primeiro passo para um tratamento que realmente funciona.
                </p>
              </div>

              <div className="text-sm sm:text-base md:text-lg">
                <h3 className="font-serif font-light text-foreground mb-2 text-xl sm:text-2xl md:text-3xl text-balance">
                  Compromisso com Sua Alta Médica
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Meu objetivo não é gerenciar sintomas indefinidamente, mas devolver sua autonomia. Trabalho para que
                  você não precise mais de mim—para que esta seja sua última experiência com psiquiatria.
                </p>
              </div>

              <div className="text-sm sm:text-base md:text-lg hidden md:block">
                <h3 className="font-serif font-light text-foreground mb-2 text-xl sm:text-2xl md:text-3xl text-balance">
                  O Que Isso Exige
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Eu poderia dizer que são as 2 horas de consulta, que é meu currículo, que são minhas
                  especializações... mas nada disso faria sentido se a forma com a qual eu vejo o outro não fosse tão
                  diferente.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  Como disse Carl Gustav Jung (também médico psiquiatra): "Conheça todas as teorias, domine todas as
                  técnicas, mas ao tocar uma alma humana seja apenas outra alma humana."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
