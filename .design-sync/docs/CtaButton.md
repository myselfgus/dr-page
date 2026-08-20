---
category: Blocks
---
# CtaButton

The one component that renders conversion actions, because the regulatory policy
lives inside it rather than in styling:

- `kind: "whatsapp"` → green `#25D366`. `variant="primary"` is a pill;
  `variant="whatsapp-block"` is the full-width block used at the end of sections.
- `kind: "doctoralia"` → teal `#00c3a5` text link with a star, **always**. It is
  social proof ("Ver avaliações na Doctoralia"), never a booking button, and
  `variant` is ignored for it.
- `kind: "phone" | "email" | "internal"` → black pill, or `variant="outline"`.

`cta` is an already-resolved object (`{kind, label, href, external}`); in the app
it comes from `resolveCta` so numbers and URLs are never hardcoded in a block.

`WhatsAppIcon` and `StarIcon` ship on the same global if you need the glyphs.
