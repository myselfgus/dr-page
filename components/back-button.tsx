import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Botão fixo "Voltar para Início" das subpáginas (pages.back_button = 1).
export function BackButton() {
  return (
    <Button variant="ghost" asChild className="fixed top-24 left-4 z-50 bg-background/80 backdrop-blur-sm">
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Início
      </Link>
    </Button>
  )
}
