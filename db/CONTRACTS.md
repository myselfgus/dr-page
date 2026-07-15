# CONTRATO — CMS de blocos do site drgustavomendes.com (Fase 1)

Fonte única de verdade para os dois lados: **dr-page** (leitura, site público Next.js) e **dr-admin**
(escrita, painel Hono+React em adm.drgustavomendes.com). D1 `dr-blog` compartilhada
(id `3435a1ad-b8f4-4652-bc7c-729071bd2cd4`; binding `dr_blog` no dr-page, `DB` no dr-admin).
Schema já aplicado: `migrations/001_pages_blocks_tokens.sql`.

## Princípio
UI fixa, conteúdo vira dado. Cada `blocks.type` mapeia 1:1 para um componente React existente.
`content_json` = texto/CTA (o cliente edita). `design_json` = **enums fechados** (variante, colunas,
background, show/hide) que o componente traduz para classes Tailwind já existentes — **nunca CSS livre**.

## IDs
Determinísticos: `blocks.id = "{page_id}-{type}"` (ex.: `home-hero`, `home-faq`). `pages.id` ∈
{`home`,`about`,`teleconsulta`,`domiciliar`,`contact`}. `updated_at` = epoch ms.

## Páginas
| id | path | header | footer | back_button |
|---|---|---|---|---|
| home | / | 1 | 1 | 0 |
| about | /about | 0 | 0 | 1 |
| teleconsulta | /teleconsulta | 0 | 0 | 1 |
| domiciliar | /domiciliar | 0 | 0 | 1 |
| contact | /contact | 0 | 0 | 1 |

## CtaRef (objeto reutilizável dentro de content_json — nunca hardcode número/URL no bloco)
```
{ kind: "whatsapp"|"phone"|"email"|"doctoralia"|"internal",
  label: string,
  text?: string,     // só whatsapp → vira ?text=encodeURIComponent(text)
  href?: string }    // só internal
```
Resolução (helper `resolveCta(cta, siteConfig.contact)`):
- whatsapp → `https://wa.me/{whatsappNumber}?text={encode(text || whatsappDefaultText)}`
- phone → `tel:{phoneTel}` · email → `mailto:{email}` · doctoralia → `{doctoralia}` · internal → `{href}`

**Política CTA (inegociável):** WhatsApp = botão primário verde `#25D366`. Doctoralia = SEMPRE link de
avaliações `text-[#00c3a5]` com ícone estrela, "Ver avaliações na Doctoralia", NUNCA botão preenchido.
`design_json` não deve ter opção que transforme doctoralia em botão de agendamento.

## site_config (singletons — fonte única de contato/nav/brand)
- `contact`: `{ phoneDisplay:"(11) 91539-8330", phoneTel:"+5511915398330", whatsappNumber:"5511915398330",
  whatsappDefaultText:"Olá, gostaria de agendar uma consulta", email:"contato@drgustavomendes.com",
  doctoralia:"https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai", crm:"CRM 218133/SP",
  address:{clinic,street,cityLine,locality:"Jundiaí",region:"SP",postalCode:"13202-544",country:"BR",lat:"-23.1996",lng:"-46.8764"},
  mapEmbed:"<iframe src do Google Maps atual>", reviewCount:"17", ratingValue:"5.0" }`
- `nav`: `{ items:[{label,href}] }` (Teleconsulta, Domiciliar, Blog, Sobre, Contato). Footer usa label "Atendimento domiciliar" e não tem Blog.
- `brand`: `{ name:"Dr. Gustavo Mendes e Silva", crm:"CRM 218133/SP", tagline:"Psiquiatria humanizada, com escuta atenta e atendimento domiciliar quando necessário." }`

Valores EXATOS (textos, preços, URLs) devem ser extraídos dos componentes/páginas atuais do dr-page —
o conteúdo renderizado hoje é a fonte. Não inventar nem parafrasear.

## Catálogo de blocks.type  (content_json → design_json)
- **hero** → `hero.tsx`. content `{ titleLines:string[], leadHtml?:string[], eyebrow?, subtitle?, lead?, image?, imageAlt?, badges?:string[] }`; design `{ variant:"home"|"subpage"|"subpage-split"|"subpage-plain", showAnimatedBackground?, showImage?, minHeight? }`.
- **symptoms** → `symptoms-section.tsx`. content `{ eyebrow, chips:string[], paras:string[], cta:CtaRef }`; design `{ id:"queixas", align:"center", showCta:bool }`.
- **care-steps** → `what-is-art.tsx` (export `WhatIsMentalHealth`). content `{ eyebrow, title, intro, steps:[{title,body}], quote:{text,author} }`; design `{ background, showConnectorLine, showQuote }`.
- **about** → `about-section.tsx`. content `{ title, subtitle, image, imageAlt, ctaPrimary:CtaRef, formacaoTitle, formacaoParas:string[], diferenciaisTitle, diferenciaisParas:string[] }`; design `{ variant:"home", collapsibleOnMobile:bool }`. Eliminar duplicação mobile/desktop lendo do mesmo content.
- **principles** → `art-types.tsx` (export `ConditionsTreated`). content `{ title, subtitle, items:[{name,description,focus}] }`; design `{ columns:3, numbered, showFocus, background }`.
- **faq** → `faq-section.tsx`. content `{ title, subtitle, items:[{question,answer}], closer:{text,ctas:CtaRef[]} }`; design `{ id:"faq", accordion:true }`. **FONTE ÚNICA da FAQ — alimenta UI E JSON-LD.**
- **contact** → `contact-section.tsx`. content `{ title, subtitle }` (resto vem de site_config.contact); design `{ id:"contact", variant:"home"|"page", showForm, showMap }`. Form só `console.log` (LGPD, não transmite).
- **richtext** → novo `RichTextBlock`. content flexível `{ heading?, iconName?, paras?:string[], lists?:[{heading?,items:string[]}], columns?:[...], cards?:[...] }`; design `{ variant:"card"|"card-grid"|"card-stack"|"plain", columns:1|2|3, iconName? }`. Usado nas seções da /about.
- **feature-cards** → novo `FeatureCards`. content `{ items:[{iconName,title,text}] }`; design `{ columns:3 }`. (teleconsulta/domiciliar)
- **pricing-cta** → novo `PricingCta`. content `{ heading, iconName?, note?, steps?:[{iconName,text}], prices:[{label,value}], footnotes?:string[], cta:CtaRef }`; design `{ variant:"prices-only"|"how-it-works", showSteps }`.
- **price-badge** → novo `PriceBadge`. content `{ label, value, note }`; design `{ variant:"inline-card" }`. (/contact)

Ícones (`iconName`) resolvidos via `lucide-react`: MapPin, Clock, ShieldCheck, Video, Heart, Users, Home, Brain, Briefcase, GraduationCap, Award, Globe, Sparkles. `richtext` de texto puro em `<strong>` é permitido (marcação leve inline), sanitizado.

## Ordem dos blocos por página (sort)
- home: hero, symptoms, care-steps, about, principles, faq, contact
- about: hero(subpage-split, badges), + 7 blocos richtext (Sobre Mim, Áreas de Atuação, Experiência, Formação Acadêmica, Formação Complementar, Competências, Idiomas/Afiliações)
- teleconsulta: hero(subpage), feature-cards, pricing-cta(prices-only)
- domiciliar: hero(subpage), feature-cards, pricing-cta(how-it-works)
- contact: hero(subpage-plain), price-badge, contact(page)
(Conteúdo exato = extrair dos arquivos atuais.)

## page_meta (SEO por página)
`{ title, description, canonical, keywords(JSON[]), og_json, jsonld_types(JSON[]) }`.
- home: title "Psiquiatra em Jundiaí | Dr. Gustavo Mendes CRM 218133/SP" (default, sem template), keywords[21] e description = os de `app/layout.tsx` hoje; canonical `https://drgustavomendes.com`; jsonld_types `["Physician","MedicalBusiness","WebSite","BreadcrumbList","FAQPage"]`.
- teleconsulta/domiciliar: title/description já existem nos arquivos; canonical `/teleconsulta` e `/domiciliar`.
- about/contact: hoje herdam default → seed com title/description derivados.

## JSON-LD (lib/structured-data.ts no dr-page) — GERADO DE DADO
Monta os 5 @types a partir de site_config + page_meta + blocks. **FAQPage deriva do bloco `faq`**
(`items.map(f => ({"@type":"Question", name:f.question, acceptedAnswer:{"@type":"Answer", text:f.answer}}))`)
— acaba a dupla fonte de verdade. Physician/MedicalBusiness de site_config.contact (address, geo, phone,
sameAs=doctoralia, areaServed=Jundiaí, aggregateRating {ratingValue, reviewCount}); manter VirtualLocation
para teleconsulta (não sobre-acoplar PostalAddress). Cada página injeta só seus `jsonld_types`.
Geo meta/pixels globais continuam em layout.tsx (ou site_config.seo_globals) — são singletons.

## Camada de dados dr-page (espelhar lib/blog-posts.ts EXATAMENTE)
`lib/pages.ts`: `getDb()` via `getCloudflareContext()` + binding `dr_blog` + guard; `getPage(id)`,
`getPageBlocks(pageId)` (ORDER BY sort, status filtrável), `getPageMeta(id)`, `getSiteConfig(key)`.
`mapRow` faz `JSON.parse` defensivo (try/catch → `{}`/`[]`) de content_json/design_json.
**Fallback obrigatório:** cada componente tem `const DEFAULT_CONTENT` = conteúdo atual; se o D1 falhar
ou vier vazio, renderiza o default (mesma filosofia do fallback de `sitemap.ts`). Rotas de página:
`export const dynamic = "force-dynamic"` OU revalidate curto + try/catch com fallback. O build (sem D1)
nunca pode quebrar. `<BlockRenderer block={row}/>` faz `switch(type)`; cada bloco envolto em `<Reveal>`.

## Design tokens (dr-page)
`lib/design-tokens.ts` (espelha blog-posts.ts): lê `design_tokens`, monta string CSS
`:root{--k:v;...}\n.dark{--k:v;...}`. `app/layout.tsx` injeta um `<style id="design-tokens">` no `<head>`
**depois** do import de `globals.css` (vence por cascata → restiliza sem rebuild). globals.css continua
como fallback. **Sanitizar** valor (rejeitar `<`, `}`, `@import`, `url(`, `</style`); whitelist por category).
Gap a corrigir p/ tokens "funcionarem de verdade": trocar `shadow-[4px_2px_2px_rgba(0,0,0,0.05)]` por token
`--shadow-card` (registrar no @theme) e decidir `--radius` vs `rounded-2xl` hardcoded nos cards.
Cache: revalidação **on-demand** disparada pelo publish (`revalidatePath`), não `force-dynamic` global.

## Preview (dr-page)
Rota `/_preview/[page]` (ou `?preview=<token>`) que lê blocks com `status='draft'` em vez de 'published',
protegida por token simples. O canvas do admin faz `<iframe>` nela → preview pixel-perfect do componente real.
Publicar = promover draft→published + revalidatePath.

## dr-admin — rotas Hono (em src/index.ts, no bloco /api/*, ANTES do catch-all app.all("*"); já cobertas por requireAuth)
`GET /api/pages` · `GET /api/pages/:slug/blocks` · `PUT /api/pages/:slug/blocks` · `PATCH /api/blocks/:id`
· `GET /api/design-tokens` · `PUT /api/design-tokens` · `POST /api/publish-page` · chat SSE (POST inicia + GET streama).
Helpers D1 novos em `src/db.ts` (estilo `db.prepare().bind().all<Row>()` + mapRow). Schema já existe.

## dr-admin — chat terra (baseado em src/luna.ts)
`env.AI.run("openai/gpt-5.6-terra", { instructions:EDITOR_SYSTEM, input:messages, tools:[...], tool_choice:"auto",
max_output_tokens, reasoning:{effort:"medium"} }, { gateway:{ id: env.AI_GATEWAY } })`. Responses API.
Tools: patchBlock(id,patch), setDesignToken(token,value), reorderBlocks(slug,order[]), toggleVisibility(id,visible).
`function_call` volta em `res.output` (itens `type:"function_call"` com `name`+`arguments` string-JSON); reusar
`outText()` de luna.ts p/ texto. Laço: ler function_calls → executar helper D1 → reenviar `function_call_output`.
**SPIKE obrigatório antes de fechar o laço:** validar o shape real de function_call/arguments via AI Gateway
(o repo nunca usou `tools`). SSE: EventSource só faz GET → usar POST-inicia + GET-streama (padrão do publish),
ou fetch+ReadableStream no client. Frames `data: ${JSON.stringify(x)}\n\n`, headers text/event-stream.

## dr-admin — UI (client/, React+Vite+Tailwind, SEM router)
`App.tsx`: adicionar `view:"blog"|"editor"` + nav de pílulas (reusar idioma de abas de `UploadPanel.tsx:80-113`).
`EditorView` = grid `lg:grid-cols-[380px_1fr]`: esquerda `<ChatPanel>` (terra), direita `<CanvasPanel>` com abas
**Preview** (iframe → /_preview do site) e **Código** (JSON dos blocos / diff). Hooks novos espelham
`usePosts.ts`/`usePublishRun.ts`; funções de API em `api.ts` (padrão fetch+ApiError). Ícones novos em `components/icons.tsx`.

## Gotchas
- dr-admin: deploy MANUAL (`pnpm deploy` = vite build && wrangler deploy); erro derruba o painel. TS não bloqueia build (rode typecheck manual). DO novo exige migração v2 + export em index.ts. Não renomear bindings existentes (PIPELINE). run_worker_first:true → todo request passa pelo Hono.
- dr-page: build DEVE usar webpack (`next build --webpack`), não turbopack. typescript.ignoreBuildErrors:true → erro de tipo aparece em runtime. images.unoptimized:true. Trabalhar em branch; produção sobe de `main` via Workers Builds.
- D1 compartilhada: tabela nova tem que ser consumida nos dois lados.
