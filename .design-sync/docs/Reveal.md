---
category: Foundations
---
# Reveal

Scroll-triggered entrance wrapper (IntersectionObserver). Children start hidden
and settle when scrolled into view; `prefers-reduced-motion` shows them at once.

`variant`: `section` (opacity) · `item` (lift) · `left` / `right` (slide) ·
`scale` · `blur`. Stagger a row with `delay={i * 80}`.

In a static render nothing scrolls, so force the end state:
`.reveal { opacity: 1 !important; transform: none !important; }`.
