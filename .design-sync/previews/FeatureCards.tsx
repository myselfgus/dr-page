import { FeatureCards } from "drgustavomendes-ui"

// Reveal só revela no scroll; em preview estático fixa-se o estado final.
const Settled = () => (
  <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
)

export const TresColunas = () => (
  <>
    <Settled />
    <FeatureCards
      content={{
        items: [
          {
            iconName: "Video",
            title: "Teleconsulta",
            text: "Atendimento por vídeo para quem mora longe ou tem rotina apertada, com a mesma escuta do consultório.",
          },
          {
            iconName: "Home",
            title: "Consulta domiciliar",
            text: "Avaliação no próprio ambiente, indicada quando o deslocamento é um obstáculo.",
          },
          {
            iconName: "MapPin",
            title: "Consultório em Jundiaí",
            text: "Atendimento presencial na Clínica Dr. Hegg, com agenda combinada pelo WhatsApp.",
          },
        ],
      }}
    />
  </>
)

export const DuasColunas = () => (
  <>
    <Settled />
    <FeatureCards
      design={{ columns: 2 }}
      content={{
        items: [
          {
            iconName: "Brain",
            title: "Medicina canabinoide",
            text: "Indicação criteriosa, dentro das resoluções do CFM e sempre com acompanhamento próximo.",
          },
          {
            iconName: "ShieldCheck",
            title: "Sigilo e continuidade",
            text: "Registro clínico protegido e retorno com o mesmo médico ao longo do tratamento.",
          },
        ],
      }}
    />
  </>
)

export const ColunaUnica = () => (
  <>
    <Settled />
    <FeatureCards
      design={{ columns: 1 }}
      content={{
        items: [
          {
            iconName: "Clock",
            title: "Primeira consulta com tempo estendido",
            text: "História, contexto e o que motivou a busca — sem a pressa de um encaixe.",
          },
        ],
      }}
    />
  </>
)
