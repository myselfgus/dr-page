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
        </div>
        <ContactSection />
      </div>
    </main>
  )
}
