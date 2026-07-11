# Dr. Gustavo Mendes — Site

Site do Dr. Gustavo Mendes e Silva (Psiquiatra, CRM 218133/SP), em Next.js 16, deployado como Cloudflare Worker (`page-drgustavomendes`) via [OpenNext](https://opennext.js.org/cloudflare).

**Produção:** [https://drgustavomendes.com](https://drgustavomendes.com)

## Desenvolvimento

```bash
pnpm install
pnpm dev          # dev server local (next dev)
```

## Build e deploy

O deploy é automático via Cloudflare Workers Builds a cada push na `main`:

1. `pnpm run build` — roda `opennextjs-cloudflare build`, gerando `.open-next/worker.js`
2. `npx wrangler deploy` — publica o worker

Deploy manual: `pnpm run deploy`.
