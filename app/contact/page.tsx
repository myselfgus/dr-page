import { ContactSection } from "@/components/contact-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Início
          </Link>
        </Button>

        <div className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6">Agende uma Consulta</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dê o primeiro passo em direção a uma melhor saúde mental. Entre em contato com o Dr. Gustavo Mendes e Silva
            para agendar uma consulta ou saber mais sobre os serviços psiquiátricos oferecidos.
          </p>
          <div className="mt-8 inline-flex flex-col bg-card border border-border rounded-2xl px-6 py-4 shadow-[4px_2px_2px_rgba(0,0,0,0.05)]">
            <span className="text-sm text-muted-foreground">Consulta particular</span>
            <span className="font-serif text-2xl font-light">R$ 350 a R$ 500</span>
            <span className="text-xs text-muted-foreground mt-1">
              Teleconsulta e atendimento domiciliar também disponíveis.
            </span>
          </div>
        </div>
        <ContactSection />
      </div>
    </main>
  )
}
