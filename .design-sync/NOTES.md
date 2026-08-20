# design-sync notes — dr-page

## Shape
- This repo is a **Next.js app, not a published package**. There is no `dist/`
  and no library entry, so the sync is built on a synthetic package assembled by
  `.design-sync/prepare.mjs` into `.design-sync/.cache/dts/` (gitignored).
  **Always run `node .design-sync/prepare.mjs` before `package-build.mjs`** — the
  converter's `pkg`/`entry`/`cssEntry`/`srcDir` all point inside that directory.
- Scope: primitives (`components/ui/*`) + CMS blocks (`components/blocks/*`) +
  `Reveal`. Page sections (hero, header, footer, about, faq, …) are deliberately
  **out of scope** — they are content-coupled and page-level.
- `.design-sync/entry.ts` is the public surface. Adding a component = add an
  export there, add its `componentSrcMap` pin, author a preview, re-run prepare.

## Repo-specific gotchas
- **Tailwind v4 source CSS.** `app/globals.css` is `@import "tailwindcss"`, so it
  is useless to the bundle as-is. `prepare.mjs` compiles it with the Tailwind CLI
  (installed in `.ds-sync/`, v4.3.3 — the repo pins 4.1.9; the drift has been
  harmless so far). `.design-sync/css/entry.css` adds the font `@import`, the
  `@source` globs, and an `@source inline(...)` safelist for the token utilities
  the design agent composes with (they are not all used by repo files, so without
  the safelist they simply would not exist in the emitted CSS).
- **Fonts** come from `next/font/google` in the app (no font files in the repo),
  so the bundle loads them from the font host via `@import` in
  `.design-sync/css/fonts.css` → validate reports `[FONT_REMOTE]`, which is
  expected. Real families: DM Serif Display, Playfair Display, **Lato**,
  **Nunito**, Roboto Mono (CLAUDE.md still says Sora/Manrope — the code wins).
- **`next/image`** is aliased to `.design-sync/shims/next-image.tsx` (a plain
  `<img>`) via `.design-sync/tsconfig.sync.json`. `FeatureCards` is the only
  in-scope consumer.
- **`@/…` path aliases in emitted `.d.ts`** are rewritten to relative paths by
  `prepare.mjs`; without that ts-morph cannot resolve them and every props body
  collapses to `[key: string]: unknown`.
- **`dtsPropsFor`** carries hand-written props for `CtaButton`, `FeatureCards`,
  `PricingCta`, `RichTextBlock` — their `content` shapes are cross-module types
  the extractor emits as bare names.
- **`Reveal` hides its children until scrolled into view.** Every authored preview
  that renders `Reveal` (directly, or via `FeatureCards`/`PricingCta`) injects
  `.reveal { opacity: 1 !important; … }` so the static card is not blank.
- **`PriceBadge` is excluded** (`componentSrcMap: null`) — it renders `null` by
  design (prices are never published).
- Component groups come from the source directory (`blocks`, `primitives`,
  `foundations` via `.design-sync/docs/*.md` frontmatter). A doc `category` only
  wins for components that do not sit in a group-named directory — that is why
  `Icon` and `CtaButton` land in `blocks` regardless of their frontmatter.

## Browser for the render check
- No chromium was downloaded. Validate/capture run against the system Chrome:
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
  The playwright npm package was installed into `.ds-sync/` for the run and
  **uninstalled afterwards at the user's request** — reinstall it (`npm i
  playwright` inside `.ds-sync/`) before the next validate, and keep using
  `DS_CHROMIUM_PATH` instead of `playwright install chromium` (the download
  stalled repeatedly on this machine).

## Known render warns
- `[FONT_REMOTE]` for all five families — by design (see Fonts above).
- `[GRID_OVERFLOW]` on `RichTextBlock`, `FeatureCards`, `PricingCta` was resolved
  with `overrides.<Name>.cardMode = "column"`; these are full-width section
  blocks, so column cards are the correct presentation.

## Re-sync risks
- `.design-sync/.cache/` is gitignored, so a fresh clone has **no** synthetic
  package: `prepare.mjs` must run first or the build fails with `[NO_DIST]`.
- `prepare.mjs` depends on `.ds-sync/node_modules/@tailwindcss/cli` — staged, not
  committed. Re-install it with the converter deps.
- The `@source inline(...)` safelist in `css/entry.css` is hand-maintained. New
  token families added to `@theme` in `globals.css` will not reach the design
  agent until they are added there too.
- `.design-sync/conventions.md` enumerates real class and component names; every
  name was verified against the built `styles.css` and the emitted component
  tree on 2026-08-20. Re-verify on any future sync rather than rewriting it.
- `RichTextBlock`'s `plain` variant drops `content.intro` — observed during
  grading, not fixed (app-side behaviour, out of scope for the sync).
