# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## What this is

Marketing/lead-capture site for **Dr. Gustavo Mendes e Silva** (psychiatrist, CRM 218133/SP), based at **Clínica Dr. Hegg, Jundiaí/SP**. Next.js 16 (App Router, React 19), deployed as a **Cloudflare Worker** (`page-drgustavomendes`) via **OpenNext**. Production: https://drgustavomendes.com.

Conversion is outbound only: **WhatsApp is the primary CTA**; phone and e-mail are secondary; **Doctoralia is social-proof only** ("Ver avaliações"), never the booking CTA.

Content is **CMS-block driven** via D1 `dr_blog` with full fallback in `db/seed-data.json`. There is no form backend for clinical data.

## Commands

```bash
pnpm install
pnpm dev            # local Next.js (preferred for day-to-day)
pnpm lint
pnpm run build      # opennextjs-cloudflare build → .open-next/worker.js
pnpm exec next build --webpack   # faster compile check
pnpm run deploy     # build + deploy (manual)
pnpm cf-typegen
```

**No tests.** `pnpm exec next build --webpack` is the correctness gate.

### Build / local worker gotchas
- OpenNext **must** use webpack (`next build --webpack`), not Turbopack.
- `wrangler dev` serves **`.open-next/`**, not live source. Stale `.open-next` can show old Rio Preto content. Always `rm -rf .open-next && pnpm run build` before wrangler.
- Prefer `pnpm dev` for UI/content work.
- `typescript.ignoreBuildErrors: true` and `images.unoptimized: true` — typecheck yourself.

## Deploy

- Git-connected **Cloudflare Workers Builds**; config in `wrangler.jsonc`; worker `page-drgustavomendes`; domains `drgustavomendes.com` + `www`.
- **`main` is production.** Never merge the stale `feat/domain-sitemap` Rio Preto lineage (Amadeu Segundo Cherubini / (17) 2110-1228).

## Architecture

### CMS blocks (source of truth for marketing pages)
- Loader: `lib/load-page.ts` (D1 + seed merge for missing block ids; chrome flags from seed).
- Shell: `components/blocks/PageView.tsx` (Header/Footer per page flags).
- Switch: `components/blocks/BlockRenderer.tsx`.
- Contract: `db/CONTRACTS.md`. Seed: `db/seed-data.json`.
- Design tokens: `lib/design-tokens.ts` → `<style id="design-tokens">` after `app/globals.css`. Fallback palette is **Cloud Dancer** (`#F0EEE9`) in globals.

### Homepage block order
`hero` → `symptoms` → `care-steps` → `about` → `testimonials` → `principles` → `faq` → `contact`

### Component map (filenames = role)
| type | file |
|---|---|
| hero | `components/hero.tsx` |
| symptoms | `components/symptoms-section.tsx` |
| care-steps | `components/care-steps-section.tsx` |
| about | `components/about-section.tsx` |
| testimonials | `components/testimonials-section.tsx` |
| principles | `components/principles-section.tsx` |
| faq | `components/faq-section.tsx` |
| contact | `components/contact-section.tsx` |
| feature-cards / pricing-cta / price-badge / richtext | `components/blocks/*` |

### Chrome
Header + Footer on marketing pages (home, about, teleconsulta, domiciliar, contact) and blog. WhatsApp float + BackToTop in `app/layout.tsx`.

### Intention landings (SEO)
Static routes from `lib/condition-landings.ts` + `components/condition-landing.tsx`:
`/ansiedade`, `/burnout`, `/insonia`, `/panico`, `/medicina-canabinoide`.
In sitemap. Symptoms chips link to the matching landing when applicable.

### Blog
D1 posts via `lib/blog-posts.ts`. Article JSON-LD in `app/blog/[slug]/page.tsx`. No CMS blocks for posts.

### CTA policy (non-negotiable)
- WhatsApp = green `#25D366` primary button (`CtaButton` / `resolveCta`).
- Doctoralia = teal `#00c3a5` text link + star, label like "Ver avaliações na Doctoralia". Never booking button.
- Contact/nav/brand: `lib/site-config.ts` (+ D1 `site_config`).

### SEO / JSON-LD
Built in `lib/structured-data.ts` from site_config + blocks (not hardcoded in layout):
- Home: Physician (incl. curated `review[]` from testimonials + aggregateRating), MedicalBusiness, WebSite, BreadcrumbList, FAQPage (from faq block).
- FAQ on a page = faq block items only (single source).
- Landings: MedicalWebPage + FAQPage + BreadcrumbList.
- Geo: Jundiaí; teleconsulta via VirtualLocation / availableChannel.
- Analytics: only add real Pixel/Ads/GSC IDs — **no placeholder scripts**.

### Design system quick reference
- Cool monochrome background (`oklch(0.99 0 0)`); cards white; soft multi-layer `shadow-card`.
- Fonts: **DM Serif Display** (`font-display` — só o nome no header) · **Playfair Display** (`font-serif` headings) · **Sora** (`font-emphasis` / `<strong>`) · **Manrope** (`font-sans` body) · **Roboto Mono** (`font-mono` — micro-labels, eyebrows, CRM, números/etapas).
- Radius base `0.75rem`; cards `rounded-2xl`; pills/CTAs `rounded-full`.
- Reveal: `section` | `item` | `left` | `right` | `scale` | `blur`.
- Home hero phrase stays editorial multiline: "E se for / possível viver / de outro modo?" — mobile prioritizes the H1.
- **WhatsApp only via floating button** (not in header) to avoid double CTAs.
- **No public prices** — PricingCta/PriceBadge never show monetary values; combine via WhatsApp.
- Testimonials authors shown as **initials only**.

## Constraints
- No forms collecting clinical/health data (LGPD art. 11). Contact via WhatsApp/phone/e-mail.
- CFM Res. 1.974/2011: no sensationalism, no promise of results, no before/after.
- Do not change the `PAGE_DRGUSTAVOMENDES` binding used by other internal services.
