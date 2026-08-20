import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  Button,
} from "drgustavomendes-ui"

export const Basico = () => (
  <div className="max-w-md">
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl font-light">Teleconsulta</CardTitle>
        <CardDescription>Atendimento por vídeo, com a mesma escuta do consultório.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Primeira consulta com tempo estendido para entender história, contexto e
          o que motivou a busca por acompanhamento.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Ver detalhes</Button>
      </CardFooter>
    </Card>
  </div>
)

export const ComAcao = () => (
  <div className="max-w-md">
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl font-light">Consulta domiciliar</CardTitle>
        <CardDescription>Jundiaí e região</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Detalhes
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Indicada quando o deslocamento é um obstáculo — idosos, pós-alta ou
          quadros que exigem avaliação no próprio ambiente.
        </p>
      </CardContent>
    </Card>
  </div>
)

export const SomenteConteudo = () => (
  <div className="max-w-md">
    <Card>
      <CardContent>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          CRM 218133/SP
        </p>
        <p className="text-sm leading-relaxed">
          Card sem cabeçalho — usado para blocos de texto corrido e notas de rodapé.
        </p>
      </CardContent>
    </Card>
  </div>
)
