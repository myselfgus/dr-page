const approaches = [
  {
    title: "Medicina Baseada em Evidências",
    description: "Utilizando as pesquisas mais recentes e protocolos de tratamento comprovados",
    image: "/modern-consultation-room-1.jpg",
  },
  {
    title: "Cuidado Holístico",
    description: "Abordando fatores da mente, corpo e estilo de vida no tratamento",
    image: "/peaceful-therapy-room-1.jpg",
  },
  {
    title: "Tratamento Personalizado",
    description: "Planos de cuidado adaptados para sua situação única",
    image: "/modern-consultation-room-2.jpg",
  },
  {
    title: "Abordagem Colaborativa",
    description: "Trabalhando juntos para alcançar seus objetivos de saúde mental",
    image: "/peaceful-therapy-room-2.jpg",
  },
  {
    title: "Expertise em Medicação",
    description: "Gestão cuidadosa de medicação com monitoramento contínuo",
    image: "/modern-consultation-room-3.jpg",
  },
  {
    title: "Suporte Terapêutico",
    description: "Integrando psicoterapia com cuidado psiquiátrico",
    image: "/peaceful-therapy-room-3.jpg",
  },
]

export function TreatmentApproach() {
  return (
    <section id="approach" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">Filosofia de Tratamento</h2>
          <p className="text-muted-foreground text-lg">Uma abordagem abrangente para o bem-estar mental</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {approaches.map((approach, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden bg-card shadow-[4px_2px_2px_rgba(0,0,0,0.08)] hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={approach.image || "/placeholder.svg"}
                  alt={approach.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl md:text-3xl font-light mb-1">{approach.title}</h3>
                <p className="text-sm text-muted-foreground">{approach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TreatmentApproach as ArtworkGrid }
