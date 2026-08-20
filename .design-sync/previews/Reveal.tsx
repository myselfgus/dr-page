import type { ReactNode } from "react"
import { Reveal } from "drgustavomendes-ui"

// Previews são estáticos: força-se o estado final do reveal para que o card
// mostre o conteúdo já revelado (no app, a transição dispara no scroll).
const Settled = () => (
  <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
)

const Box = ({ children }: { children: ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl shadow-card p-5 text-sm">{children}</div>
)

export const Variantes = () => (
  <>
    <Settled />
    <div className="grid sm:grid-cols-3 gap-4">
      <Reveal variant="section">
        <Box>section — apenas opacidade</Box>
      </Reveal>
      <Reveal variant="item" delay={80}>
        <Box>item — sobe ao aparecer</Box>
      </Reveal>
      <Reveal variant="scale" delay={160}>
        <Box>scale — zoom suave</Box>
      </Reveal>
    </div>
  </>
)

export const Direcionais = () => (
  <>
    <Settled />
    <div className="grid sm:grid-cols-3 gap-4">
      <Reveal variant="left">
        <Box>left — entra pela esquerda</Box>
      </Reveal>
      <Reveal variant="right" delay={80}>
        <Box>right — entra pela direita</Box>
      </Reveal>
      <Reveal variant="blur" delay={160}>
        <Box>blur — desfoque que limpa</Box>
      </Reveal>
    </div>
  </>
)
