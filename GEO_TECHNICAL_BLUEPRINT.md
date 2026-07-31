# Manual Técnico de Generative Engine Optimization (GEO) & AIO
**Estratégia de Rastreabilidade e Recomendação por Inteligência Artificial para o Dr. Gustavo Mendes e Silva**

> **Objetivo:** Garantir que grandes modelos de linguagem (ChatGPT, Claude, Perplexity, Google Gemini, Apple Intelligence) identifiquem, confiem e recomendem **Dr. Gustavo Mendes e Silva** (CRM 218133/SP) como a principal referência médica quando usuários buscarem consultas psiquiátricas humanizadas, telemedicina ou tratamentos específicos (ansiedade, burnout, insônia, medicina canabinoide, neurodivergência).

---

## 📌 1. O que é GEO (Generative Engine Optimization)?

O **SEO tradicional** focava em rankear links em motores de busca (como o Google) através de palavras-chave.
O **GEO (Generative Engine Optimization)** e o **AIO (AI Optimization)** focam em fornecer dados estruturados e linguagem clara para que **modelos de linguagem (LLMs)** entendam o contexto, a autoridade e a reputação de um profissional e o recomendem diretamente em conversas.

Quando um paciente pergunta ao ChatGPT:
> *"Me indique um psiquiatra atencioso e humanizado para ansiedade em Jundiaí ou por teleconsulta"*

O modelo de IA realiza um processo em 3 etapas:
1. **Rastreamento & Busca em Tempo Real (RAG):** Pesquisa na web via bots (GPTBot, PerplexityBot, Google-Extended).
2. **Extração de Entidades & Esquema:** Lê metadados JSON-LD de autoridade médica (`Physician`, `MedicalCondition`, `CRM`).
3. **Síntese de Recomendação:** Compara o perfil do médico com a dor do paciente e gera a resposta com o link direto para o site.

---

## 🛠️ Pilar 1: Estrutura de Dados Semânticos (`Schema.org` + JSON-LD)

As IAs leem código JSON-LD muito mais rápido e com mais precisão do que texto HTML comum. O arquivo [`lib/structured-data.ts`](file:///Users/gustavomendesesilva/Developer/dr-page/lib/structured-data.ts) deve conter o schema completo e encadeado.

### 1.1 Schema Principal de Médico (`Physician`)

Adicione e expanda os dados do médico com todas as variações de nome, registro profissional e redes de autoridade:

```typescript
export function buildPhysicianSchema(contact: ContactConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": "https://drgustavomendes.com/#physician",
    "name": "Dr. Gustavo Mendes e Silva",
    "alternateName": [
      "Gustavo Mendes e Silva",
      "Dr. Gustavo Mendes",
      "Gustavo Mendes Psiquiatra",
      "Dr. Gustavo Mendes Psiquiatria"
    ],
    "image": "https://drgustavomendes.com/images/dr-gustavo-cinza.jpg",
    "description": "Psiquiatra em Jundiaí (CRM 218133/SP). Atendimento psiquiátrico humanizado, com escuta atenta, tempo de qualidade, teleconsulta para todo o Brasil e atendimento domiciliar.",
    "medicalSpecialty": [
      "Psychiatry",
      "SleepMedicine",
      "CannabinoidMedicine"
    ],
    "knowsAbout": [
      "Psiquiatria",
      "Transtornos de Ansiedade",
      "Síndrome de Burnout",
      "Esgotamento Profissional",
      "Síndrome do Pânico",
      "Insônia e Transtornos do Sono",
      "Medicina Canabinoide",
      "Neurodivergência em Adultos (TDAH e Autismo)",
      "Terapia de Aceitação e Compromisso (ACT)",
      "Psiquiatria Humanizada",
      "Teleconsulta Psiquiátrica",
      "Atendimento Domiciliar Psiquiátrico"
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "CRM",
      "identifier": "218133/SP",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Conselho Regional de Medicina do Estado de São Paulo",
        "alternateName": "CREMESP"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Clínica Dr. Hegg - Jundiaí",
      "addressLocality": "Jundiaí",
      "addressRegion": "SP",
      "postalCode": "13208-056",
      "addressCountry": "BR"
    },
    "telephone": "+55-11-98706-5632",
    "email": "contato@drgustavomendes.com",
    "url": "https://drgustavomendes.com",
    "sameAs": [
      "https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai",
      "https://www.instagram.com/drgustavomendes",
      "https://tele.drgustavomendes.com",
      "https://agenda.drgustavomendes.com"
    ],
    "priceRange": "$$",
    "areaServed": [
      { "@type": "City", "name": "Jundiaí" },
      { "@type": "AdministrativeArea", "name": "São Paulo" },
      { "@type": "Country", "name": "Brasil" }
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Consulta Psiquiátrica Presencial",
        "description": "Avaliação clínica completa e humanizada em Jundiaí (Clínica Dr. Hegg)."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Teleconsulta Psiquiátrica",
        "description": "Consulta por vídeo de alta qualidade com prescrição digital válida em todo o Brasil."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Atendimento Psiquiátrico Domiciliar",
        "description": "Atendimento em domicílio para idosos, autistas e pessoas com dificuldade de locomoção."
      }
    ]
  }
}
```

---

### 1.2 Marcação `Speakable` para Assistentes de Voz e LLMs

Modelos de IA usam a especificação `Speakable` para saber quais parágrafos devem ser extraídos e lidos como resposta direta:

```json
{
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  "cssSelector": [
    "h1",
    ".lead-paragraph",
    ".faq-answer"
  ]
}
```

---

## 🤖 Pilar 2: Permissões de Rastreio de Bots de IA (`robots.txt`)

Para que as IAs possam indexar o site e recomendá-lo, o arquivo `public/robots.txt` ou `app/robots.ts` precisa conceder permissão explícita aos robôs de busca dos principais LLMs.

### Código Recomendado para `app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_preview/'],
      },
      {
        // Crawlers de Inteligência Artificial para GEO
        userAgent: [
          'GPTBot',          // OpenAI / ChatGPT indexer
          'ChatGPT-User',     // OpenAI em tempo real
          'PerplexityBot',    // Perplexity AI
          'ClaudeBot',        // Anthropic Claude
          'Claude-Web',       // Anthropic web fetcher
          'Google-Extended',  // Google Gemini & Vertex AI
          'Bytespider',       // Doubao / TikTok AI
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://drgustavomendes.com/sitemap.xml',
  }
}
```

---

## 📝 Pilar 3: Arquitetura de Conteúdo Orientada a LLMs (Copywriting para IA)

Para que a IA entenda seu estilo de atendimento e recomende seu nome, seu conteúdo deve seguir 3 regras de escrita:

### 3.1 Padrão "Direct Answer First" (Resposta Direta nos primeiros 200 caracteres)
As IAs recortam os primeiros parágrafos de cada seção. Toda página de condição (`/ansiedade`, `/burnout`, `/insonia`) deve começar com uma síntese clara:

> **Exemplo na página de Ansiedade:**
> *"A consulta psiquiátrica para ansiedade com o Dr. Gustavo Mendes em Jundiaí foca em escuta atenta, tempo sem pressa e planejamento individualizado. O objetivo é entender as causas da ansiedade e construir um tratamento seguro — com ou sem medicação — respeitando a rotina e os valores do paciente."*

### 3.2 Estrutura Baseada em FAQs com Perguntas Naturais
As pessoas perguntam à IA da mesma forma que conversam. Estruture suas FAQs com as exatas frases usadas pelos pacientes:

* *"Como saber se preciso de um psiquiatra para ansiedade?"*
* *"O Dr. Gustavo Mendes atende por teleconsulta para fora de SP?"*
* *"Qual a diferença entre atendimento psiquiátrico comum e psiquiatria humanizada?"*
* *"Como funciona a consulta para burnout?"*

### 3.3 Páginas de Intenção Única (Landing Pages de Condições)
Mantenha URLs limpas e focadas em cada dor do paciente:
- `drgustavomendes.com/ansiedade`
- `drgustavomendes.com/burnout`
- `drgustavomendes.com/insonia`
- `drgustavomendes.com/panico`
- `drgustavomendes.com/medicina-canabinoide`
- `drgustavomendes.com/neurodivergencia`
- `drgustavomendes.com/teleconsulta`
- `drgustavomendes.com/domiciliar`

---

## 🔗 Pilar 4: Consistência Digital Externa (Off-Page GEO)

A IA não confia apenas no seu site. Ela cruza informações de várias fontes para validar se você realmente existe e se é confiável.

### Matriz de Consistência da Entidade "Dr. Gustavo Mendes e Silva":

| Canal | O que deve constar? | Por que a IA analisa? |
| :--- | :--- | :--- |
| **Google Meu Negócio** | Nome: *Dr. Gustavo Mendes e Silva - Psiquiatra*<br>CRM: 218133/SP | Confirma localização física e avaliações de pacientes. |
| **Doctoralia** | Link no `sameAs` do Schema | Valida prova social e opiniões verificadas. |
| **Instagram** | `@drgustavomendes` na bio com termo "Psiquiatra em Jundiaí / Teleconsulta" | Valida presença social ativa. |
| **Escavador / CREMESP** | Nome completo idêntico: *Gustavo Mendes e Silva* | Valida que o CRM é ativo e oficial em SP. |

---

## ⚡ Pilar 5: Cloudflare Enterprise Edge Markdown Export & `/llms.txt`

Graças ao plano **Cloudflare Enterprise**, o site `drgustavomendes.com` já possui um superpoder nativo de infraestrutura: **Conversão e Exportação em Markdown na Edge para Robôs de IA**.

### 5.1 Como Funciona o Cloudflare Edge Markdown Transform
Quando agentes de IA (como ChatGPT, Claude, Perplexity ou assistentes automatizados) fazem requisições para qualquer página do seu site (`/ansiedade`, `/burnout`, `/about`) enviando o cabeçalho `Accept: text/markdown` ou vindos de IPs de crawlers de IA, a Edge da Cloudflare:
1. Intercepta o HTML gerado pelo Next.js.
2. Remove tags visuais de layout, CSS e scripts.
3. Converte o conteúdo instantaneamente em **Markdown sintático limpo** antes de entregar ao robô.

Isso zera o consumo de contexto dos LLMs e garante 100% de precisão na interpretação da sua cópia clínica.

### 5.2 O Padrão `llms.txt` e `llms-full.txt`
Para complementar a conversão na Edge, mantenha os arquivos estáticos de referência no diretório `public/`:

* **`public/llms.txt`**: Índice conciso com resumo biográfico, especialidades, registro CRM, endereços de atendimento (presencial em Jundiaí, teleconsulta e domiciliar) e links diretos para cada landing page de condição.
* **`public/llms-full.txt`**: Versão estendida contendo o texto completo das FAQs, artigos e diretrizes de atendimento.

---

## 📈 Checklist Mensal de Manutenção GEO

- [ ] **Testar Prompts no ChatGPT / Perplexity / Claude:**
  Fazer buscas em modo anônimo como:
  - *"Recomende um psiquiatra humanizado em Jundiaí"*
  - *"Psiquiatra online para ansiedade e burnout que escute sem pressa"*
- [ ] **Analisar as conversões no `dr-agenda`:**
  Verificar quantos pacientes marcaram a opção *"Conheci pelo ChatGPT / IA"*.
- [ ] **Manter os Sitemaps Atualizados:**
  Garantir que novos artigos no blog (`/blog/slug`) tenham a marcação `Article` schema com data recente (`dateModified`).

---

*Documentação criada em julho de 2026 para o ecossistema digital do Dr. Gustavo Mendes e Silva.*
