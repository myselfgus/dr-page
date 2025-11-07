export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await fetch(
      "https://gateway.ai.cloudflare.com/v1/1a481f7cdb7027c30174a692c89cbda1/voither/grok/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer xai-qaLbigB2AGh8f36LJmzCvhcHLvBI3Tr1TKwnf7wLEFabGHNszsnuZw9wVoLf2jWUQZ9zyXVU9VaAzUrf`,
          "cf-aig-authorization": `Bearer ${process.env.CLOUDFLARE_GATEWAY_TOKEN}`,
        },
        body: JSON.stringify({
          model: "grok-4-fast-reasoning",
          messages: [
            {
              role: "system",
              content: `Você é um assistente do consultório do Dr. Gustavo Mendes e Silva, psiquiatra.
Seja educado, empático e CONCISO. Responda em 2-3 frases curtas sempre que possível.

Informações do Consultório:
- Telefone/WhatsApp: (17) 2110-1228
- Endereço: Rua Amadeu Segundo Cherubini, 504, São José do Rio Preto, SP
- Local: C&W Offices - Unidade Amadeu
- Serviços: Depressão, Ansiedade, Transtorno Bipolar, TEPT, TOC
- Horário: Segunda a Sexta, 9h às 18h
- Aceita principais convênios

Seja breve e direto. Não escreva parágrafos longos.`,
            },
            ...messages,
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: 150,
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error:", errorText)
      throw new Error(`API request failed: ${response.status} ${errorText}`)
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("API route error:", error)
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
