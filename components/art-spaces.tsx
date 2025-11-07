export function SpecialtyAreas() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">Áreas de Especialização</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cuidado psiquiátrico especializado em diversos domínios da saúde mental
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="group overflow-hidden rounded-lg shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/peaceful-therapy-office-with-natural-light.jpg"
                alt="Tratamento de transtornos de humor"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 p-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2">Transtornos de Humor</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tratamento especializado para depressão, transtorno bipolar e condições relacionadas
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/modern-medical-office-consultation-room.jpg"
                alt="Tratamento de ansiedade"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 p-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2">Transtornos de Ansiedade</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cuidado abrangente para ansiedade generalizada, transtorno do pânico e fobias
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/peaceful-therapy-office-with-natural-light.jpg"
                alt="Terapia de trauma"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 p-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2">Trauma e TEPT</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cuidado especializado informado por trauma para cura e recuperação
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/modern-medical-office-consultation-room.jpg"
                alt="Tratamento de TDAH em adultos"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 p-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2">TDAH em Adultos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Diagnóstico e gestão de desafios de atenção e foco em adultos
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/peaceful-therapy-office-with-natural-light.jpg"
                alt="Tratamento de uso de substâncias"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 p-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2">Uso de Substâncias</h3>
              <p className="text-muted-foreground leading-relaxed">Suporte compassivo para dependência e recuperação</p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/modern-medical-office-consultation-room.jpg"
                alt="Aconselhamento para transições de vida"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 p-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2">Transições de Vida</h3>
              <p className="text-muted-foreground leading-relaxed">
                Suporte durante grandes mudanças de vida, estresse e desafios de adaptação
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { SpecialtyAreas as ArtSpaces }
