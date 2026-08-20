---
category: Primitives
---
# Card

The house container: white surface, `border-border`, `rounded-2xl`, `shadow-card`.
Compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
`CardContent`, `CardFooter` — all on the same global.

Titles inside cards are light serif (`font-serif font-light`), not bold sans.

```jsx
<Card>
  <CardHeader>
    <CardTitle className="font-serif text-2xl font-light">Teleconsulta</CardTitle>
    <CardDescription>Atendimento por vídeo.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>
```
