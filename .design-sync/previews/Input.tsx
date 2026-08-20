import { Input } from "drgustavomendes-ui"

export const Padrao = () => (
  <div className="max-w-sm space-y-2">
    <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
      Nome
    </label>
    <Input placeholder="Como podemos te chamar" />
  </div>
)

export const Tipos = () => (
  <div className="max-w-sm space-y-3">
    <Input type="email" placeholder="voce@email.com" />
    <Input type="tel" placeholder="(11) 90000-0000" />
    <Input type="search" placeholder="Buscar no blog" />
  </div>
)

export const Estados = () => (
  <div className="max-w-sm space-y-3">
    <Input defaultValue="Preenchido" />
    <Input placeholder="Desabilitado" disabled />
    <Input placeholder="Com erro" aria-invalid="true" />
  </div>
)
