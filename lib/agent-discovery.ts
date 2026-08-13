/**
 * Agent discovery constants and public practice payload.
 * Used by Link headers, API catalog, OpenAPI, MCP, skills, and WebMCP.
 */

export const SITE_ORIGIN = "https://drgustavomendes.com"

export const HOMEPAGE_LINK_HEADERS = [
  { href: "/.well-known/api-catalog", rel: "api-catalog" },
  {
    href: "/.well-known/agent-skills/index.json",
    rel: "describedby",
    type: "application/json",
    title: "Agent Skills Discovery Index",
  },
  {
    href: "/.well-known/mcp/server-card.json",
    rel: "service-desc",
    type: "application/json",
    title: "MCP Server Card",
  },
  {
    href: "/llms.txt",
    rel: "describedby",
    type: "text/plain",
    title: "llms.txt",
  },
  {
    href: "/auth.md",
    rel: "service-doc",
    type: "text/markdown",
    title: "Agent authentication",
  },
  {
    href: "/api/v1/openapi.json",
    rel: "service-desc",
    type: "application/openapi+json",
    title: "OpenAPI 3.1",
  },
] as const

export function formatLinkHeader(
  entries: ReadonlyArray<{
    href: string
    rel: string
    type?: string
    title?: string
  }>,
): string {
  return entries
    .map((entry) => {
      const params = [`rel="${entry.rel}"`]
      if (entry.type) params.push(`type="${entry.type}"`)
      if (entry.title) params.push(`title="${entry.title}"`)
      return `<${entry.href}>; ${params.join("; ")}`
    })
    .join(", ")
}

/** Public, non-clinical practice facts safe for agents (no PHI). */
export function getPublicPracticeInfo() {
  return {
    name: "Dr. Gustavo Mendes e Silva",
    crm: "CRM 218133/SP",
    specialty: "Psiquiatria",
    tagline:
      "Psiquiatria humanizada, com escuta atenta e atendimento domiciliar quando necessário.",
    website: SITE_ORIGIN,
    clinic: {
      name: "Clínica Dr. Hegg",
      street: "Rua Dr. Hegg, 492 - Vila Arens",
      city: "Jundiaí",
      region: "SP",
      postalCode: "13202-544",
      country: "BR",
      geo: { lat: -23.1996, lng: -46.8764 },
    },
    contact: {
      phoneDisplay: "(11) 98706-5632",
      phoneE164: "+5511987065632",
      whatsappE164: "5511987065632",
      whatsappUrl:
        "https://wa.me/5511987065632?text=" +
        encodeURIComponent("Olá, gostaria de agendar uma consulta"),
      email: "contato@drgustavomendes.com",
      doctoralia:
        "https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai",
    },
    socialProof: {
      source: "Doctoralia",
      ratingValue: 5,
      bestRating: 5,
      reviewCount: 27,
      verifiedAt: "2026-08-13",
      profileUrl:
        "https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai",
      featuredReviews: [
        {
          authorInitials: "I.S.",
          ratingValue: 5,
          reviewBody:
            "Dr. Gustavo é um ótimo profissional, super atencioso e sempre atento na escuta e necessidades dos pacientes, busca sempre entender o que está acontecendo, se o tratamento está sendo eficaz e realiza os ajustes nas medicações conforme necessário, o atendimento é sempre muito humano e atencioso. Um profissional incrível.",
          datePublished: "2026-08-07",
        },
        {
          authorInitials: "S.",
          ratingValue: 5,
          reviewBody:
            "Consulta excelente, foi profissional, muito atencioso e o tratamento está dando efeito",
          datePublished: "2026-08-07",
        },
        {
          authorInitials: "J.G.L.",
          ratingValue: 5,
          reviewBody:
            "Profissional muito atencioso, a consulta vai muito além de somente prescrever medicação, mas sim entender de fato as causas e o impacto real no dia a dia.",
          datePublished: "2026-08-07",
        },
      ],
    },
    modalities: [
      {
        id: "presencial",
        name: "Consulta presencial",
        description: "Atendimento na Clínica Dr. Hegg, Jundiaí/SP.",
      },
      {
        id: "teleconsulta",
        name: "Teleconsulta",
        description:
          "Consulta por vídeo para todo o Brasil, com receita digital quando indicada.",
        path: "/teleconsulta",
      },
      {
        id: "domiciliar",
        name: "Atendimento domiciliar",
        description:
          "Visita em domicílio em Jundiaí e região (idosos, autistas e limitação de mobilidade).",
        path: "/domiciliar",
      },
    ],
    conditionPages: [
      { path: "/ansiedade", title: "Ansiedade" },
      { path: "/burnout", title: "Burnout e esgotamento" },
      { path: "/insonia", title: "Insônia e sono" },
      { path: "/panico", title: "Pânico" },
      { path: "/medicina-canabinoide", title: "Medicina canabinoide" },
      { path: "/neurodivergencia", title: "Neurodivergência (TDAH/Autismo)" },
    ],
    booking: {
      primaryCta: "whatsapp",
      note:
        "Agendamento é feito por WhatsApp. Não há formulário de dados clínicos no site (LGPD art. 11). Doctoralia é apenas prova social (avaliações), não o CTA de agendamento.",
      agendaUrl: "https://agenda.drgustavomendes.com",
      teleUrl: "https://tele.drgustavomendes.com",
    },
    discovery: {
      llmsTxt: `${SITE_ORIGIN}/llms.txt`,
      llmsFullTxt: `${SITE_ORIGIN}/llms-full.txt`,
      apiCatalog: `${SITE_ORIGIN}/.well-known/api-catalog`,
      openapi: `${SITE_ORIGIN}/api/v1/openapi.json`,
      mcpServerCard: `${SITE_ORIGIN}/.well-known/mcp/server-card.json`,
      mcpEndpoint: `${SITE_ORIGIN}/mcp`,
      agentSkills: `${SITE_ORIGIN}/.well-known/agent-skills/index.json`,
      authMd: `${SITE_ORIGIN}/auth.md`,
      health: `${SITE_ORIGIN}/api/v1/health`,
    },
    compliance: {
      noClinicalForms: true,
      noPublicPrices: true,
      noResultPromises: true,
      cfmRes: "1.974/2011",
    },
  } as const
}

export function getOpenApiDocument() {
  const info = getPublicPracticeInfo()
  return {
    openapi: "3.1.0",
    info: {
      title: "Dr. Gustavo Mendes — Public Discovery API",
      version: "1.0.0",
      description:
        "Read-only public endpoints for AI agents and integrators. No clinical data, no authentication required. Booking remains via WhatsApp.",
      contact: {
        name: info.name,
        email: info.contact.email,
        url: SITE_ORIGIN,
      },
    },
    servers: [{ url: SITE_ORIGIN }],
    paths: {
      "/api/v1/health": {
        get: {
          operationId: "getHealth",
          summary: "Liveness / readiness",
          tags: ["status"],
          responses: {
            "200": {
              description: "Service is up",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", enum: ["ok"] },
                      service: { type: "string" },
                      time: { type: "string", format: "date-time" },
                    },
                    required: ["status", "service", "time"],
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/site": {
        get: {
          operationId: "getSiteInfo",
          summary: "Public practice and contact facts",
          description:
            "Non-clinical directory data: CRM, clinic address, modalities, condition landings, WhatsApp CTA. Safe for agent grounding.",
          tags: ["discovery"],
          responses: {
            "200": {
              description: "Practice info",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
      "/api/v1/openapi.json": {
        get: {
          operationId: "getOpenApi",
          summary: "This OpenAPI document",
          tags: ["discovery"],
          responses: {
            "200": {
              description: "OpenAPI 3.1 JSON",
              content: {
                "application/openapi+json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      { name: "status", description: "Health checks" },
      { name: "discovery", description: "Public agent discovery" },
    ],
  }
}

export function getApiCatalogLinkset() {
  return {
    linkset: [
      {
        anchor: `${SITE_ORIGIN}/api/v1/`,
        "service-desc": [
          {
            href: `${SITE_ORIGIN}/api/v1/openapi.json`,
            type: "application/openapi+json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_ORIGIN}/auth.md`,
            type: "text/markdown",
          },
          {
            href: `${SITE_ORIGIN}/llms.txt`,
            type: "text/plain",
          },
        ],
        status: [
          {
            href: `${SITE_ORIGIN}/api/v1/health`,
            type: "application/json",
          },
        ],
      },
      {
        anchor: `${SITE_ORIGIN}/mcp`,
        "service-desc": [
          {
            href: `${SITE_ORIGIN}/.well-known/mcp/server-card.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_ORIGIN}/.well-known/agent-skills/index.json`,
            type: "application/json",
          },
        ],
        status: [
          {
            href: `${SITE_ORIGIN}/api/v1/health`,
            type: "application/json",
          },
        ],
      },
    ],
  }
}

export function getMcpServerCard() {
  return {
    serverInfo: {
      name: "dr-gustavo-mendes",
      version: "1.0.0",
      description:
        "Public discovery tools for Dr. Gustavo Mendes e Silva (psiquiatra, CRM 218133/SP): practice info, condition pages, and WhatsApp booking link. No clinical data.",
    },
    transport: {
      type: "streamable-http",
      endpoint: `${SITE_ORIGIN}/mcp`,
    },
    // Flat endpoint alias used by some scanners (SEP-1649 drafts vary)
    endpoint: `${SITE_ORIGIN}/mcp`,
    capabilities: {
      tools: { listChanged: false },
      resources: {},
      prompts: {},
    },
    authentication: {
      required: false,
      schemes: [],
    },
  }
}

export const MCP_TOOLS = [
  {
    name: "get_practice_info",
    description:
      "Return public facts about Dr. Gustavo Mendes e Silva: CRM, clinic address in Jundiaí, contact channels, and care modalities. No clinical data.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "list_condition_pages",
    description:
      "List intention landing pages (ansiedade, burnout, insonia, panico, medicina-canabinoide, neurodivergencia) with absolute URLs.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "get_whatsapp_booking_link",
    description:
      "Build the preferred WhatsApp deep link to start a consultation request. Optional custom message (non-clinical).",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description:
            "Optional prefilled WhatsApp text. Do not include clinical history or sensitive health data.",
        },
      },
      additionalProperties: false,
    },
  },
] as const

export function executeMcpTool(
  name: string,
  args: Record<string, unknown> = {},
): unknown {
  const info = getPublicPracticeInfo()

  switch (name) {
    case "get_practice_info":
      return info
    case "list_condition_pages":
      return info.conditionPages.map((p) => ({
        ...p,
        url: `${SITE_ORIGIN}${p.path}`,
      }))
    case "get_whatsapp_booking_link": {
      const message =
        typeof args.message === "string" && args.message.trim()
          ? args.message.trim().slice(0, 500)
          : "Olá, gostaria de agendar uma consulta"
      return {
        url: `https://wa.me/${info.contact.whatsappE164}?text=${encodeURIComponent(message)}`,
        phoneE164: info.contact.whatsappE164,
        note: info.booking.note,
      }
    }
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}
