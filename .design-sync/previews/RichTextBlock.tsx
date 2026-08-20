import { RichTextBlock } from "drgustavomendes-ui"

export const CardUnico = () => (
  <RichTextBlock
    content={{
      heading: "Sobre mim",
      iconName: "GraduationCap",
      paras: [
        "Psiquiatra, com prática orientada pela escuta cuidadosa e por decisões compartilhadas.",
        "Atendo em Jundiaí e por teleconsulta, com acompanhamento contínuo — não consultas isoladas.",
      ],
    }}
  />
)

export const GradeDeCards = () => (
  <RichTextBlock
    design={{ variant: "card-grid", columns: 2 }}
    content={{
      heading: "Princípios do cuidado",
      cards: [
        {
          title: "Tempo de consulta",
          titleIcon: "Clock",
          paras: ["Consulta longa o suficiente para entender a história, não apenas o sintoma."],
        },
        {
          title: "Decisão compartilhada",
          titleIcon: "Users",
          items: ["Explicar alternativas", "Considerar efeitos e rotina", "Revisar o plano periodicamente"],
        },
      ],
    }}
  />
)

export const PilhaComGrupos = () => (
  <RichTextBlock
    design={{ variant: "card-stack" }}
    content={{
      cards: [
        {
          title: "O que costuma motivar a busca",
          titleIcon: "Brain",
          titleSize: "xl",
          groups: [
            { text: "Ansiedade persistente", sub: "preocupação que não desliga", emphasize: true },
            { text: "Insônia", sub: "sono que não restaura" },
            { text: "Burnout", sub: "exaustão ligada ao trabalho" },
            { text: "Crises de pânico", sub: "episódios súbitos de medo intenso" },
          ],
          groupColumns: 2,
        },
      ],
    }}
  />
)

export const TextoSimples = () => (
  <RichTextBlock
    design={{ variant: "plain" }}
    content={{
      heading: "Aviso",
      intro: "Este site não substitui atendimento de urgência.",
      paras: ["Em situação de risco, procure o serviço de emergência mais próximo ou ligue para o CVV (188)."],
    }}
  />
)
