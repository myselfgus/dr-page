// Portal Neurodivergência / TEA — conteúdo e navegação próprios.
// Tom: clínico + vivência, sem sensacionalismo (CFM). WhatsApp = CTA.

export const NEURO_BASE = "/neurodivergencia"

export interface NeuroNavItem {
  href: string
  label: string
  short: string
  code: string
}

export const NEURO_NAV: NeuroNavItem[] = [
  { href: NEURO_BASE, label: "Início do portal", short: "Início", code: "00" },
  { href: `${NEURO_BASE}/adultos`, label: "Adultos autistas", short: "Adultos", code: "01" },
  { href: `${NEURO_BASE}/familias`, label: "Famílias e cuidadores", short: "Famílias", code: "02" },
  { href: `${NEURO_BASE}/cuidado`, label: "Como cuido", short: "Cuidado", code: "03" },
]

export interface NeuroSection {
  kicker?: string
  heading: string
  paras: string[]
}

export interface NeuroPage {
  slug: string
  path: string
  title: string
  description: string
  eyebrow: string
  h1: string
  lead: string
  sections: NeuroSection[]
  waText: string
  waLabel: string
}

export const NEURO_PAGES: Record<string, NeuroPage> = {
  home: {
    slug: "home",
    path: NEURO_BASE,
    title: "Neurodivergência e TEA | Dr. Gustavo Mendes",
    description:
      "Espaço do Dr. Gustavo Mendes e Silva — psiquiatra e autista — sobre TEA, neurodivergência e cuidado sem pressa. Jundiaí, teleconsulta e domiciliar.",
    eyebrow: "Portal · Neurodivergência",
    h1: "Um espaço para quem pensa, sente e processa o mundo de outro modo",
    lead:
      "Sou psiquiatra e sou autista. Este portal não é campanha nem slogan: é um canto do consultório aberto — com linguagem clara, tempo de qualidade e respeito à forma como cada cérebro se organiza.",
    sections: [
      {
        kicker: "Por que existe",
        heading: "Porque o consultório clássico nem sempre cabe",
        paras: [
          "Muita gente chega cansada de se explicar. De consultas rápidas, de rótulos jogados sem contexto, de planos que ignoram sensorialidade, rotina, máscara social e o custo de “passar por normal”.",
          "Aqui o ponto de partida é outro: o que você sente faz sentido dentro da sua história e do seu sistema nervoso — não o contrário.",
        ],
      },
      {
        kicker: "Para quem",
        heading: "Adultos, famílias e quem cuida",
        paras: [
          "Adultos que suspeitam de TEA ou já têm diagnóstico e querem um acompanhamento que entenda máscara, burnout autista, ansiedade e sono.",
          "Famílias e cuidadores que precisam de escuta real — inclusive em domicílio, quando sair de casa não é o melhor caminho.",
          "Não prometo atalhos. Ofereço presença, clareza e um plano alinhado aos seus valores.",
        ],
      },
      {
        kicker: "Como entrar",
        heading: "Escolha o caminho que mais se parece com você",
        paras: [
          "Nas páginas deste portal você encontra o que costumo discutir no consultório: adultos autistas, o lugar da família, e como o cuidado acontece na prática — presencial, por vídeo ou em casa.",
          "Quando fizer sentido conversar, o WhatsApp continua sendo a porta. Sem formulário clínico, sem pressa de rotular.",
        ],
      },
    ],
    waText: "Olá, gostaria de conversar sobre neurodivergência / TEA",
    waLabel: "Conversar no WhatsApp",
  },
  adultos: {
    slug: "adultos",
    path: `${NEURO_BASE}/adultos`,
    title: "Adultos autistas | Portal Neurodivergência",
    description:
      "Acompanhamento psiquiátrico para adultos autistas e suspeita de TEA: máscara, burnout, ansiedade, sono. Dr. Gustavo Mendes — psiquiatra e autista.",
    eyebrow: "01 · Adultos",
    h1: "Autismo em adultos não é atraso de diagnóstico — é uma história inteira",
    lead:
      "Muitos adultos chegam depois de anos “funcionando no automático”: excelentes em alguns contextos, exaustos em outros. O cuidado começa por validar o que o corpo e a mente já sabem.",
    sections: [
      {
        kicker: "O que costuma aparecer",
        heading: "Máscara, sobrecarga e o preço de se adaptar",
        paras: [
          "Camuflagem social, hiperfocos, esgotamento após interações, dificuldade com mudanças, hipersensibilidade (ou hipossensibilidade), sono irregular, ansiedade e, às vezes, depressão que não responde ao “protocolo genérico”.",
          "Nada disso define você sozinho. São pistas de um sistema nervoso que pede outro ritmo e outra escuta.",
        ],
      },
      {
        kicker: "Na consulta",
        heading: "Sem pressa de fechar um laudo e sumir",
        paras: [
          "Avalio contexto, história de vida, trabalho, relações e o que já foi tentado. Quando o diagnóstico de TEA faz sentido, ele entra como ferramenta de compreensão — não como destino nem como rótulo para encaixar você num protocolo rígido.",
          "Medicamento, se entrar, é com critério e horizonte. O objetivo é autonomia: menos sofrimento, mais legibilidade da própria vida.",
        ],
      },
      {
        kicker: "Modalidades",
        heading: "Presencial, teleconsulta ou domiciliar",
        paras: [
          "Quem prefere o ambiente controlado de casa pode se beneficiar da teleconsulta ou do atendimento domiciliar — especialmente quando deslocamento, salas de espera ou luz/ruído pesam demais.",
          "Combinamos o formato pelo WhatsApp, com transparência sobre o que cabe em cada modalidade.",
        ],
      },
    ],
    waText: "Olá, gostaria de conversar sobre acompanhamento para adultos / TEA",
    waLabel: "Conversar sobre adultos e TEA",
  },
  familias: {
    slug: "familias",
    path: `${NEURO_BASE}/familias`,
    title: "Famílias e cuidadores | Portal Neurodivergência",
    description:
      "Cuidado psiquiátrico que inclui a família e o cuidador: crianças, adolescentes e adultos com TEA. Atendimento em binômio e domiciliar quando fizer sentido.",
    eyebrow: "02 · Famílias",
    h1: "Cuidar de quem cuida também é parte do tratamento",
    lead:
      "Neurodivergência raramente é história de uma pessoa só. Família, escola, rotina e o cansaço de quem está ao lado entram na conversa — com respeito e sem culpar ninguém.",
    sections: [
      {
        kicker: "Crianças e adolescentes",
        heading: "Atendimento em binômio",
        paras: [
          "Com crianças e adolescentes, o cuidado é feito em binômio: cuidador e jovem acompanhados juntos. Assim entendemos o sistema inteiro — e cuidamos de quem cuida, não só de quem “é o paciente”.",
          "O ambiente familiar, quando possível, permite ver o contexto real: sensores, rotinas, o que acalma e o que sobrecarrega.",
        ],
      },
      {
        kicker: "Adultos na família",
        heading: "Quando o diagnóstico reorganiza a casa",
        paras: [
          "Um diagnóstico (ou a suspeita) em adulto muda dinâmicas antigas. Famílias pedem linguagem clara: o que é TEA, o que não é, o que ajuda de verdade e o que é ruído de internet.",
          "Trabalho com honestidade e sem dramatizar. Vocês merecem informação utilizável, não terror nem romantização.",
        ],
      },
      {
        kicker: "Domiciliar",
        heading: "Quando ir até vocês faz mais sentido",
        paras: [
          "Para autistas, idosos ou pessoas com dificuldade de locomoção, o atendimento domiciliar em Jundiaí e região pode ser o caminho mais humano.",
          "Combinamos endereço, dia e o que esperar da visita — sempre pelo WhatsApp, com tempo para dúvidas antes.",
        ],
      },
    ],
    waText: "Olá, gostaria de conversar sobre cuidado em família / TEA",
    waLabel: "Conversar sobre famílias e TEA",
  },
  cuidado: {
    slug: "cuidado",
    path: `${NEURO_BASE}/cuidado`,
    title: "Como cuido | Portal Neurodivergência",
    description:
      "Como o Dr. Gustavo Mendes conduz o cuidado em neurodivergência e TEA: presença, clareza, metas e autonomia. Presencial, teleconsulta e domiciliar.",
    eyebrow: "03 · Cuidado",
    h1: "Presença, clareza e um plano que você entende",
    lead:
      "O método é o mesmo que sustenta o restante da minha prática: tempo de qualidade, entender antes de medicar, metas explícitas e alta como horizonte — não dependência eterna do consultório.",
    sections: [
      {
        kicker: "Princípios",
        heading: "O que não abro mão",
        paras: [
          "Escuta sem pressa. Validação da experiência sensorial e social. Linguagem direta sobre opções, limites e incertezas. Respeito à autonomia — inclusive a de discordar e perguntar de novo.",
          "Sou médico e sou autista: isso informa a escuta, não substitui avaliação individual. Cada pessoa é o centro do próprio cuidado.",
        ],
      },
      {
        kicker: "Formatos",
        heading: "Três portas, o mesmo compromisso",
        paras: [
          "Presencial na Clínica Dr. Hegg, em Jundiaí. Teleconsulta por vídeo, com o mesmo tempo de escuta. Domiciliar quando o deslocamento ou o ambiente clínico pesam demais.",
          "Valores e modalidade combinamos pelo WhatsApp — sem preço público genérico, porque o arranjo precisa caber no seu contexto.",
        ],
      },
      {
        kicker: "Primeiro passo",
        heading: "Não precisa ter o laudo pronto para conversar",
        paras: [
          "Se algo neste portal descreveu sua vida ou a de alguém que você ama, o próximo passo pode ser uma mensagem. Eu respondo pessoalmente.",
          "Você pode voltar ao site principal a qualquer momento — o portal é um cômodo a mais da mesma casa, com outra luz e outra porta de entrada.",
        ],
      },
    ],
    waText: "Olá, li o portal de neurodivergência e gostaria de conversar",
    waLabel: "Começar pelo WhatsApp",
  },
}

export function getNeuroPage(slug: keyof typeof NEURO_PAGES): NeuroPage {
  return NEURO_PAGES[slug]
}
