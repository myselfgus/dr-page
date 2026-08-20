# drgustavomendes.com — building with this design system

The UI layer of a Brazilian psychiatrist's marketing site (Next.js + Tailwind v4).
Two tiers ship here: **primitives** (`Button`, `Card`, `Input`, `Textarea` —
shadcn-derived) and **content blocks** (`FeatureCards`, `PricingCta`,
`RichTextBlock`, `CtaButton`, `Icon`, `Reveal`) that take a `content` object and
render a whole section. Copy is Brazilian Portuguese.

## Setup

**No provider is required.** Components are plain React and read their design
language from CSS custom properties defined in `styles.css` — load that
stylesheet and everything is styled. Fonts (DM Serif Display, Playfair Display,
Lato, Nunito, Roboto Mono) load from the font host through the same closure.

```jsx
<Button>Agendar consulta</Button>
```

`Reveal` animates on scroll via IntersectionObserver: its children start at
`opacity: 0` and settle when scrolled into view. In a static screenshot that
reads as blank — force the end state with
`.reveal { opacity: 1 !important; transform: none !important; }` when nothing
will scroll. `FeatureCards` and `PricingCta` wrap their items in `Reveal`
internally, so the same applies to them.

## Styling idiom

Tailwind utility classes over semantic tokens — **never raw hex, never
`gray-500`**. The token families, all real utilities in `styles.css`:

| Family | Utilities |
|---|---|
| Surface | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-secondary`, `bg-accent` |
| Text | `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary`, `text-primary-foreground`, `text-secondary-foreground`, `text-accent-foreground` |
| Line | `border-border`, `border-input`, `ring-ring` |
| Feedback | `bg-destructive`, `text-destructive` |
| Radius | `rounded-md` (0.75rem base), `rounded-2xl` for cards, `rounded-full` for pills and CTAs |
| Elevation | `shadow-card` (the house card shadow), `shadow-card-hover`, plus `shadow-xs/sm/md/lg` |
| Type | `font-display` (DM Serif Display — brand name only), `font-serif` (Playfair — headings), `font-emphasis` (Lato — `<strong>`), `font-sans` (Nunito — body), `font-mono` (Roboto Mono — eyebrows, CRM, step numbers) |
| Reveal | `reveal` + `reveal-lift` / `reveal-left` / `reveal-right` / `reveal-scale` / `reveal-blur`, revealed by `reveal-visible` |

Headings are **light-weight serif** (`font-serif font-light` or `font-normal`),
never bold sans. Micro-labels are `font-mono text-xs uppercase tracking-widest
text-muted-foreground`. Sections breathe: `container mx-auto px-4 lg:px-8 py-8
lg:py-12`, content capped at `max-w-3xl`/`max-w-4xl`.

## Non-negotiable CTA policy

This is a regulated medical site (CFM), and the rules are encoded in `CtaButton`
rather than left to styling:

- **WhatsApp is the only primary CTA** — green `#25D366`, pill or full-width
  block. Use `<CtaButton cta={{kind:"whatsapp", …}} />`.
- **Doctoralia is social proof, never a booking button** — `kind:"doctoralia"`
  always renders a teal `#00c3a5` text link with a star, whatever `variant` says.
- **No prices anywhere.** `PricingCta` accepts `content.prices` and deliberately
  never renders it. Don't add monetary values in your own layout either.
- **No forms that collect health data** (LGPD art. 11). `Input`/`Textarea` are
  for newsletter/search-style fields only — contact happens over WhatsApp.
- No before/after imagery, no promised outcomes, no urgency copy.

## Where the truth lives

- `_ds/<folder>/styles.css` — every token, utility and `reveal` keyframe, in the
  form designs actually receive.
- `components/<group>/<Name>/<Name>.d.ts` — the real props, including the full
  `content` object shape for the block components.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage.

## Idiomatic snippet

```jsx
<section className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
  <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-card p-8">
    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
      Jundiaí / SP
    </p>
    <h2 className="font-serif text-3xl font-light text-balance mb-4">
      Uma primeira consulta com tempo para a história inteira
    </h2>
    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
      Atendimento presencial, teleconsulta e domiciliar.
    </p>
    <CtaButton cta={{ kind: "whatsapp", label: "Falar pelo WhatsApp", href: "https://wa.me/…", external: true }} />
  </div>
</section>
```
