import { Button } from "drgustavomendes-ui"

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Agendar consulta</Button>
    <Button variant="secondary">Saiba mais</Button>
    <Button variant="outline">Ver avaliações</Button>
    <Button variant="ghost">Cancelar</Button>
    <Button variant="link">Política de privacidade</Button>
    <Button variant="destructive">Remover</Button>
  </div>
)

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">Pequeno</Button>
    <Button size="default">Padrão</Button>
    <Button size="lg">Grande</Button>
    <Button size="icon" aria-label="Fechar">
      ✕
    </Button>
  </div>
)

export const States = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Ativo</Button>
    <Button disabled>Desabilitado</Button>
    <Button variant="outline" disabled>
      Outline desabilitado
    </Button>
  </div>
)
