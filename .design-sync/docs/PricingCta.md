---
category: Blocks
---
# PricingCta

Closing section of a page: heading, optional numbered steps, footnotes, and a
full-width WhatsApp block CTA.

**It never renders prices.** `content.prices` is accepted for legacy CMS blocks
and hard-disabled in the component (a product/CFM decision) — don't reintroduce
monetary values in surrounding layout either.

`design.variant`: `"how-it-works"` shows `content.steps`; `"prices-only"`
(default) is heading + footnotes + CTA.
