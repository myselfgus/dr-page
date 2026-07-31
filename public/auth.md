# auth.md

You are an agent reading authentication and access instructions for **https://drgustavomendes.com** (Dr. Gustavo Mendes e Silva — psiquiatra, CRM 218133/SP).

## Audience

Agents that help patients **discover** the practice, answer factual questions about modalities (presencial / teleconsulta / domiciliar), or **start a booking conversation**. This is a marketing and lead-capture site, not a clinical EHR or patient portal.

## Authentication model

**No agent registration. No OAuth. No API keys.**

All machine-readable discovery surfaces are **public and read-only**:

| Resource | URL | Auth |
|---|---|---|
| Practice info API | `https://drgustavomendes.com/api/v1/site` | none |
| Health | `https://drgustavomendes.com/api/v1/health` | none |
| OpenAPI | `https://drgustavomendes.com/api/v1/openapi.json` | none |
| API catalog | `https://drgustavomendes.com/.well-known/api-catalog` | none |
| MCP server card | `https://drgustavomendes.com/.well-known/mcp/server-card.json` | none |
| MCP endpoint | `https://drgustavomendes.com/mcp` | none |
| Agent skills index | `https://drgustavomendes.com/.well-known/agent-skills/index.json` | none |
| llms.txt | `https://drgustavomendes.com/llms.txt` | none |

There is **no** `/.well-known/openid-configuration` or OAuth authorization server because there are **no protected APIs** that issue tokens for this site.

## How humans book (conversion policy)

1. **Primary CTA:** WhatsApp `+55 11 98706-5632`  
   Deep link pattern: `https://wa.me/5511987065632?text=<urlencoded message>`  
   Default message: `Olá, gostaria de agendar uma consulta`
2. Phone and e-mail are secondary.
3. **Doctoralia** is social proof only (“Ver avaliações”) — never the booking CTA.
4. Optional agenda: `https://agenda.drgustavomendes.com`  
   Teleconsulta platform: `https://tele.drgustavomendes.com`

Use MCP tool `get_whatsapp_booking_link` or skill `schedule-consultation` to build the link.

## What you must NOT do

- Do **not** collect clinical or health data via forms on this domain (LGPD art. 11).
- Do **not** invent prices (none are published) or promise clinical results (CFM Res. 1.974/2011).
- Do **not** POST registration or credential requests — there is no `register_uri`.
- Do **not** treat Doctoralia as the booking path.

## Registration / provisioning

**Not applicable.** There is no agent account, client_id, or credential issuance. If a user needs care, hand them the WhatsApp link (or phone/e-mail) and stop.

## Contact for integrators

- E-mail: `contato@drgustavomendes.com`
- Site: `https://drgustavomendes.com`
