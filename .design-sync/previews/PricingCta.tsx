import { PricingCta } from "drgustavomendes-ui"

// O bloco nunca exibe valores (decisão de produto / CFM): mesmo com `prices`
// preenchido, o componente força showPrices = false.
const Settled = () => (
  <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
)

const cta = { kind: "whatsapp" as const, label: "Combinar pelo WhatsApp" }

export const ComoFunciona = () => (
  <>
    <Settled />
    <PricingCta
      design={{ variant: "how-it-works" }}
      content={{
        heading: "Como funciona o agendamento",
        iconName: "Clock",
        note: "Sem formulário: a combinação é direta, por mensagem.",
        steps: [
          { iconName: "Users", text: "Você manda uma mensagem contando o que procura." },
          { iconName: "Video", text: "Combinamos formato — presencial, teleconsulta ou domiciliar." },
          { iconName: "ShieldCheck", text: "A agenda é confirmada e você recebe as orientações da consulta." },
        ],
        footnotes: ["Valores são informados diretamente na conversa."],
        cta,
      }}
    />
  </>
)

export const SomenteChamada = () => (
  <>
    <Settled />
    <PricingCta
      content={{
        heading: "Agende sua consulta",
        iconName: "Heart",
        footnotes: [
          "Atendimento em Jundiaí/SP e por teleconsulta.",
          "Retornos combinados caso a caso.",
        ],
        cta,
      }}
    />
  </>
)
