---
category: Primitives
---
# Button

shadcn-derived button. `variant="default"` is near-black on the light ground —
the site's neutral action. It is **not** the conversion CTA: anything that books
or contacts goes through `CtaButton` so the WhatsApp/Doctoralia policy holds.

- `variant`: `default` · `secondary` · `outline` · `ghost` · `link` · `destructive`
- `size`: `default` · `sm` · `lg` · `icon` (`icon-sm`, `icon-lg`)
- `asChild` renders the child element (a link, typically) with button styling.

```jsx
<Button variant="outline" size="lg">Saiba mais</Button>
```
