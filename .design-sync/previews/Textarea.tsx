import { Textarea } from "drgustavomendes-ui"

export const Padrao = () => (
  <div className="max-w-md space-y-2">
    <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
      Mensagem
    </label>
    <Textarea placeholder="Conte brevemente o que você procura. Não inclua dados de saúde." />
  </div>
)

export const Preenchido = () => (
  <div className="max-w-md">
    <Textarea defaultValue={"Gostaria de entender como funciona a teleconsulta e a disponibilidade de horários."} />
  </div>
)

export const Estados = () => (
  <div className="max-w-md space-y-3">
    <Textarea placeholder="Desabilitado" disabled />
    <Textarea placeholder="Com erro" aria-invalid="true" />
  </div>
)
