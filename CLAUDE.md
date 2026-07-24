# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/lead-capture site for **Dr. Gustavo Mendes e Silva** (psychiatrist, CRM 218133/SP), based at **Clínica Dr. Hegg, Jundiaí/SP**. Next.js 16 (App Router, React 19), deployed as a **Cloudflare Worker** (`page-drgustavomendes`) via **OpenNext**. Production: https://drgustavomendes.com. It is a static-content marketing site — there is no backend or database. Conversion happens through outbound links: **WhatsApp is the primary CTA**; phone and e-mail are secondary; **Doctoralia is social-proof only ("Ver avaliações"), never the booking CTA** (see the CTA policy below).

## Commands

```bash
pnpm install
pnpm dev            # local dev (next dev); OpenNext Cloudflare context is initialized in next.config.ts
pnpm lint           # eslint
pnpm run build      # opennextjs-cloudflare build → produces .open-next/worker.js
pnpm exec next build --webpack   # faster inner build to sanity-check compilation
pnpm run deploy     # build + opennextjs-cloudflare deploy (manual deploy)
pnpm cf-typegen     # regenerate cloudflare-env.d.ts from wrangler bindings
```

There are **no tests**. `pnpm exec next build --webpack` is the real correctness gate — run it after changes.

### Build gotchas (do not "fix" these without cause)
- The build **must** use webpack, not Turbopack: `open-next.config.ts` overrides `buildCommand` to `next build --webpack` because OpenNext cannot consume Turbopack chunks.
- `next.config.ts` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`. Type errors will **not** fail the build — lint/typecheck yourself.

## Deploy — read before pushing

- Deploy is **Git-connected via Cloudflare Workers Builds**. Config in `wrangler.jsonc` (not `.toml`); worker `page-drgustavomendes`; custom domains `drgustavomendes.com` + `www`; assets bind as `ASSETS`.
- **`main` is the live production branch and the source of truth.** The live site is built from `main`.
- ⚠️ **`main`'s history diverged from an older lineage.** There was a stale `feat/domain-sitemap` branch carrying pre-Jundiaí "Rio Preto" content that must **never** be merged into `main` — it would regress the live site. If you see Rio Preto / address "Rua Amadeu Segundo Cherubini" / phone (17) 2110-1228 anywhere, that's the stale lineage, not current.
- `CLOUDFLARE_DEPLOYMENT.md` is older and partly stale — trust `package.json`, `wrangler.jsonc`, and `README.md` over it.

## Architecture

- **Repurposed v0 template.** This began as a v0.app art-gallery template converted into a psychiatry site. **Component filenames still carry art-template names** while their content is medical: `what-is-art.tsx` exports `WhatIsMentalHealth`, `art-types.tsx` exports `ConditionsTreated`, plus unused `featured-artists.tsx`, `artwork-grid.tsx`, `art-spaces.tsx`. **Don't trust filenames — read the export.** Leftover routes `/artists`, `/gallery`, `/curriculum` still exist but are intentionally excluded from `app/sitemap.ts`.
- **Homepage is composed in `app/page.tsx`** from section components (Header → Hero → SymptomsSection → WhatIsMentalHealth → AboutSection → ConditionsTreated → FAQSection → ContactSection → Footer). Editing homepage content = editing those section files, not `page.tsx`.
- **Subpage convention:** service/content pages (`/about`, `/contact`, `/teleconsulta`, `/domiciliar`) render `<main>` + a fixed "Voltar para Início" button and their own sections. They do **not** render the global `Header`/`Footer` (those are homepage-only). New subpages should export a `metadata` object for SEO (the title `template` in `layout.tsx` appends the site suffix).
- **Blog is file-based, no CMS.** All posts are a typed `BlogPost[]` array in `lib/blog-posts.ts`. `app/blog/[slug]/page.tsx` and `app/sitemap.ts` both read from it. Adding a post = adding an object to that array.
- **UI:** shadcn/ui ("new-york", see `components.json`) in `components/ui/` — only button/card/input/textarea are vendored. Tailwind v4 (CSS config in `app/globals.css`). `Reveal` (`components/reveal.tsx`) is the scroll-in animation wrapper used across sections. Card idiom: `bg-card border border-border rounded-2xl` + the `shadow-[4px_2px_2px_rgba(0,0,0,0.05)]` shadow. Import aliases: `@/components`, `@/lib`, `@/components/ui`.
- **`middleware.ts`** sets security headers on all non-asset routes. Global floating UI (`WhatsAppFloat`, `BackToTop`) is mounted once in `app/layout.tsx`.

### CTA policy (important — the business hinges on this)
- **WhatsApp is the primary booking CTA everywhere** (`wa.me/5511987065632`, green `#25D366`), with a `?text=` prefilled per page/context for attribution.
- **Doctoralia is social proof only** — link labeled "Ver avaliações na Doctoralia" (star icon, `text-[#00c3a5]`, never a filled button). The one legitimate spot is the footer profile link. Do not reintroduce "Agendar pela Doctoralia" booking buttons.

### SEO / structured data — the most delicate part
`app/layout.tsx` `<head>` carries all SEO surface: `metadata` (title/description/keywords/OG/Twitter), geo `<meta>` tags, analytics scripts (Meta Pixel + Google Ads — **still placeholders**: `SEU_PIXEL_ID_AQUI`, `AW-XXXXXXXXXX`, `seu-codigo-google-search-console`), and **five JSON-LD blocks** (`Physician`, `MedicalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`).

- **The FAQ has two sources of truth that must be edited together:** the `faqs` array in `components/faq-section.tsx` (rendered UI) and the `FAQPage` JSON-LD `mainEntity` in `app/layout.tsx`. Change one → change the other or they desync.
- This site ranks and converts in production. Metadata/JSON-LD changes are **surgical, not rewrites.** Geographic anchoring should keep `areaServed: Jundiaí` and use `availableChannel`/`VirtualLocation` for teleconsulta rather than over-coupling the brand to the clinic's `PostalAddress`.

## Constraints (business/legal — respect these)
- **No forms collecting clinical/health data.** Health data is LGPD-sensitive (art. 11). Contact is via WhatsApp/phone/e-mail links. (Note: `ContactSection` has a legacy desktop `<form>` that only `console.log`s and never transmits — do not wire it to send health data; prefer WhatsApp.)
- **Medical advertising is regulated in Brazil** (CFM Res. 1.974/2011): prices may be stated, but no sensationalism, no promise of results, no before/after, no price-competition framing. Review any new copy under this lens.
- Do not change the `PAGE_DRGUSTAVOMENDES` binding referenced by another internal service that consumes this Worker.
