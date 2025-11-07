import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-4">Artigo não encontrado</h1>
        <p className="text-lg text-muted-foreground mb-8">
          O artigo que você está procurando não existe ou foi removido.
        </p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Blog
          </Link>
        </Button>
      </div>
    </main>
  )
}
