// Landing pages de intenção (SEO) — copy educacional, sem promessa de resultado (CFM).
// WhatsApp com prefill por contexto; Doctoralia só prova social.

export interface ConditionLanding {
  slug: string
  path: string
  title: string
  description: string
  keywords: string[]
  eyebrow: string
  h1: string
  lead: string
  sections: { heading: string; paras: string[] }[]
  faqs: { question: string; answer: string }[]
  waText: string
  waLabel: string
}

export const CONDITION_LANDINGS: ConditionLanding[] = [
  {
    slug: "ansiedade",
    path: "/ansiedade",
    title: "Psiquiatra para Ansiedade em Jundiaí",
    description:
      "Acompanhamento psiquiátrico humanizado para ansiedade em Jundiaí. Escuta atenta, tempo de qualidade e plano de cuidado individual. Agende pelo WhatsApp.",
    keywords: [
      "psiquiatra ansiedade jundiaí",
      "tratamento ansiedade",
      "ansiedade generalizada",
      "psiquiatra particular jundiaí",
    ],
    eyebrow: "Ansiedade",
    h1: "Ansiedade merece escuta — não só um diagnóstico",
    lead:
      "A ansiedade pode aparecer como preocupação constante, tensão no corpo, medo ou sensação de urgência. O cuidado começa por compreender o seu contexto — e construir um caminho realista, no seu tempo.",
    sections: [
      {
        heading: "Quando procurar ajuda",
        paras: [
          "Vale conversar quando a ansiedade passa a limitar o sono, o trabalho, as relações ou o prazer do dia a dia — ou quando você sente que está “funcionando no automático” há tempo demais.",
          "Não é preciso ter certeza do nome do quadro para dar o primeiro passo. O objetivo da consulta é entender o que está acontecendo e o que pode ajudar agora.",
        ],
      },
      {
        heading: "Como costuma ser o acompanhamento",
        paras: [
          "Nas consultas, priorizo tempo de qualidade e escuta atenta. Avaliamos sintomas, história de vida, sono, rotina e o que já foi tentado — para montar um plano alinhado aos seus valores.",
          "Medicamentos, quando indicados, entram como ferramentas com critério e horizonte — não como solução única ou permanente.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ansiedade e “estresse” são a mesma coisa?",
        answer:
          "Não necessariamente. O estresse pode ser reativo a uma situação; a ansiedade costuma se manter mesmo quando o gatilho diminui. Na consulta avaliamos o quadro com cuidado, sem rotular às pressas.",
      },
      {
        question: "Atende ansiedade por teleconsulta?",
        answer:
          "Sim. A teleconsulta permite o mesmo cuidado por vídeo, de onde você estiver. Também atendo presencialmente na Clínica Dr. Hegg, em Jundiaí.",
      },
    ],
    waText: "Olá, gostaria de conversar sobre ansiedade",
    waLabel: "Conversar sobre ansiedade no WhatsApp",
  },
  {
    slug: "burnout",
    path: "/burnout",
    title: "Psiquiatra para Burnout em Jundiaí",
    description:
      "Cuidado psiquiátrico para burnout e esgotamento profissional em Jundiaí. Escuta sem pressa e plano individual. Agende pelo WhatsApp.",
    keywords: [
      "psiquiatra burnout jundiaí",
      "esgotamento profissional",
      "burnout tratamento",
      "psiquiatra trabalho",
    ],
    eyebrow: "Burnout e esgotamento",
    h1: "Esgotamento não é fraqueza — é um sinal",
    lead:
      "Burnout e esgotamento costumam misturar cansaço profundo, distanciamento do trabalho e queda de realização. O cuidado passa por olhar o contexto inteiro: rotina, limites, sono e o que sustenta (ou drena) a sua vida.",
    sections: [
      {
        heading: "O que costuma aparecer",
        paras: [
          "Exaustão que não melhora com um fim de semana, irritabilidade, dificuldade de concentração, sensação de “estar no limite” e, em muitos casos, ansiedade ou humor baixo associados.",
          "Cada história é diferente. Por isso o tratamento não é um protocolo genérico — é construído com você.",
        ],
      },
      {
        heading: "Abordagem no consultório",
        paras: [
          "Trabalhamos com clareza de metas e prazos realistas, respeitando seus valores. Quando há indicação de medicação, ela entra com plano e reavaliação — sempre com o objetivo de devolver autonomia.",
        ],
      },
    ],
    faqs: [
      {
        question: "Burnout é o mesmo que depressão?",
        answer:
          "Podem se sobrepor, mas não são sinônimos. Na avaliação diferenciamos o quadro e o contexto — inclusive fatores de trabalho e recuperação — para orientar o cuidado com precisão.",
      },
      {
        question: "Preciso me afastar do trabalho para tratar?",
        answer:
          "Depende do caso. Em alguns momentos o afastamento faz sentido; em outros, ajustes de rotina e tratamento ambulatorial bastam. Isso se decide juntos, com base na sua realidade.",
      },
    ],
    waText: "Olá, gostaria de conversar sobre burnout / esgotamento",
    waLabel: "Conversar sobre burnout no WhatsApp",
  },
  {
    slug: "insonia",
    path: "/insonia",
    title: "Psiquiatra para Insônia em Jundiaí",
    description:
      "Avaliação e acompanhamento de insônia e transtornos do sono em Jundiaí. Psiquiatria humanizada. Agende pelo WhatsApp.",
    keywords: [
      "psiquiatra insônia jundiaí",
      "tratamento insônia",
      "transtornos do sono",
      "dificuldade para dormir",
    ],
    eyebrow: "Insônia e sono",
    h1: "Dormir mal muda o dia inteiro",
    lead:
      "A insônia pode ser dificuldade para iniciar o sono, despertares noturnos ou sono que não restaura. Avaliar o quadro com calma ajuda a escolher caminhos seguros — sem atalhos que pioram o problema a longo prazo.",
    sections: [
      {
        heading: "O que investigamos",
        paras: [
          "Rotina de sono, ansiedade, humor, uso de substâncias, medicamentos e o ambiente noturno. O sono raramente é “só sono” — ele conversa com o restante da vida psíquica e corporal.",
        ],
      },
      {
        heading: "Cuidado responsável",
        paras: [
          "Quando há indicação de medicação para o sono, o uso é criterioso, com plano de acompanhamento. Também discutimos hábitos e estratégias que sustentam o sono no dia a dia.",
        ],
      },
    ],
    faqs: [
      {
        question: "Todo mundo que dorme mal precisa de remédio?",
        answer:
          "Não. Muitos casos se beneficiam de mudanças de rotina e do tratamento da causa (ansiedade, por exemplo). A medicação, quando entra, é com indicação clara e reavaliação.",
      },
      {
        question: "Você atende transtornos do sono?",
        answer:
          "Sim. Transtornos do sono fazem parte da minha prática clínica, sempre com escuta atenta ao contexto de cada pessoa.",
      },
    ],
    waText: "Olá, gostaria de conversar sobre insônia / sono",
    waLabel: "Conversar sobre sono no WhatsApp",
  },
  {
    slug: "panico",
    path: "/panico",
    title: "Psiquiatra para Pânico em Jundiaí",
    description:
      "Acompanhamento para crises de pânico e medo intenso em Jundiaí. Escuta atenta e plano individual. Agende pelo WhatsApp.",
    keywords: [
      "psiquiatra pânico jundiaí",
      "síndrome do pânico",
      "crise de pânico tratamento",
      "medo e pânico",
    ],
    eyebrow: "Medo e pânico",
    h1: "Crises de pânico pedem acolhimento e clareza",
    lead:
      "O pânico pode vir com taquicardia, falta de ar, tontura e medo de “perder o controle”. Compreender o que acontece no corpo e na mente — sem pressa — é o primeiro passo para recuperar segurança.",
    sections: [
      {
        heading: "Como a consulta ajuda",
        paras: [
          "Explicamos o que está acontecendo de forma clara, avaliamos se há outros quadros associados e montamos um plano que pode incluir estratégias práticas e, quando indicado, medicação com critério.",
        ],
      },
      {
        heading: "Presencial, teleconsulta ou domiciliar",
        paras: [
          "Você pode ser atendido na Clínica Dr. Hegg (Jundiaí), por vídeo ou, em situações específicas, em domicílio na região.",
        ],
      },
    ],
    faqs: [
      {
        question: "Crise de pânico pode parecer infarto?",
        answer:
          "Os sintomas físicos podem ser intensos e assustadores. Sempre que houver dúvida clínica, a avaliação médica é essencial. No acompanhamento psiquiátrico trabalhamos o quadro com segurança e clareza.",
      },
      {
        question: "Dá para melhorar?",
        answer:
          "Muitas pessoas encontram alívio e mais controle com acompanhamento adequado. Cada caso é individual — não há promessa de resultado único, e sim um plano construído com você.",
      },
    ],
    waText: "Olá, gostaria de conversar sobre pânico / medo",
    waLabel: "Conversar sobre pânico no WhatsApp",
  },
  {
    slug: "medicina-canabinoide",
    path: "/medicina-canabinoide",
    title: "Medicina Canabinoide em Jundiaí | Dr. Gustavo Mendes",
    description:
      "Avaliação criteriosa em medicina canabinoide em Jundiaí. Informação clara, indicação responsável. Agende pelo WhatsApp.",
    keywords: [
      "medicina canabinoide jundiaí",
      "cannabis medicinal psiquiatra",
      "psiquiatra canabinoide",
      "óleo canabidiol jundiaí",
    ],
    eyebrow: "Medicina canabinoide",
    h1: "Medicina canabinoide com critério e transparência",
    lead:
      "A medicina canabinoide pode ser uma ferramenta em contextos específicos. O ponto de partida é sempre uma avaliação clínica completa — benefícios, limites, riscos e alternativas — com linguagem clara e sem sensacionalismo.",
    sections: [
      {
        heading: "Para quem faz sentido discutir",
        paras: [
          "Pessoas que já investigaram outras opções, têm quadro crônico ou buscam compreender se há indicação real. Não é “solução mágica” nem substituto automático de outros tratamentos.",
        ],
      },
      {
        heading: "Como conduzo a conversa",
        paras: [
          "Explico evidências e incertezas com honestidade, alinhamos expectativas e, se houver indicação, seguimos com acompanhamento e reavaliação. Autonomia e consentimento informado são centrais.",
        ],
      },
    ],
    faqs: [
      {
        question: "Todo mundo pode usar cannabis medicinal?",
        answer:
          "Não. A indicação depende do diagnóstico, histórico, interações e objetivos do tratamento. A consulta existe justamente para avaliar se faz sentido no seu caso.",
      },
      {
        question: "Isso substitui o acompanhamento psiquiátrico?",
        answer:
          "Não. Quando indicada, a abordagem canabinoide integra o plano de cuidado — não o substitui. O foco continua sendo a sua saúde mental e autonomia.",
      },
    ],
    waText: "Olá, gostaria de conversar sobre medicina canabinoide",
    waLabel: "Conversar no WhatsApp",
  },
]

export function getConditionLanding(slug: string): ConditionLanding | undefined {
  return CONDITION_LANDINGS.find((c) => c.slug === slug)
}

export const CONDITION_SLUGS = CONDITION_LANDINGS.map((c) => c.slug)
