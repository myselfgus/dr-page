---
name: schedule-consultation
description: Build the correct WhatsApp booking link for Dr. Gustavo Mendes e Silva. Use when the user wants to agendar consulta, teleconsulta, or atendimento domiciliar.
---

# Schedule a consultation

## Primary path (required)

WhatsApp is the **only** primary booking CTA.

- Number (E.164 digits): `5511987065632`
- Display: `(11) 98706-5632`
- URL template: `https://wa.me/5511987065632?text={urlencoded_message}`

### Default message

```
Olá, gostaria de agendar uma consulta
```

### Suggested message variants (non-clinical)

- Teleconsulta: `Olá, gostaria de agendar uma teleconsulta`
- Domiciliar: `Olá, gostaria de informações sobre atendimento domiciliar em Jundiaí`
- Condition-aware (still non-clinical): `Olá, gostaria de agendar uma consulta sobre ansiedade`

Do **not** put diagnoses, medication lists, or sensitive history in the prefilled text.

## Secondary contacts

- Phone: `+55 11 98706-5632` (`tel:+5511987065632`)
- E-mail: `contato@drgustavomendes.com`
- Agenda (optional): https://agenda.drgustavomendes.com
- Tele platform: https://tele.drgustavomendes.com

## What not to do

- Do **not** send users to Doctoralia to book. Doctoralia is “Ver avaliações” only:  
  https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai
- Do **not** invent public prices or payment plans.
- Do **not** open clinical intake forms on drgustavomendes.com.

## Machine helpers

- REST: `GET https://drgustavomendes.com/api/v1/site` → `contact.whatsappUrl`
- MCP tool: `get_whatsapp_booking_link` on `https://drgustavomendes.com/mcp`
