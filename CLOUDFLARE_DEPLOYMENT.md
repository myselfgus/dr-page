# Deploy para Cloudflare Workers

Este projeto está configurado para fazer deploy como um Cloudflare Worker usando o adaptador `@opennextjs/cloudflare` e Next.js 16.

## Pré-requisitos

- Node.js 18+ instalado
- Conta Cloudflare (gratuita ou paga)
- Wrangler CLI (já incluído como devDependency)

## Configuração Inicial

### 1. Autenticação

Faça login na sua conta Cloudflare:

\`\`\`bash
npx wrangler login
\`\`\`

### 2. Configuração do Worker

O arquivo `wrangler.jsonc` já está configurado com:

- **name**: "dr-gustavo-site" (nome do seu Worker)
- **compatibility_date**: "2025-11-06" (versão do runtime)
- **nodejs_compat**: Suporte completo ao Node.js runtime
- **ASSETS**: Configuração automática de assets estáticos

## Deploy

### Build e Deploy

\`\`\`bash
# Build do Next.js e deploy em um comando
npm run deploy
\`\`\`

Ou em etapas separadas:

\`\`\`bash
# 1. Build do Next.js
npm run build

# 2. Build do OpenNext
npx opennextjs-cloudflare build

# 3. Deploy
npx wrangler deploy
\`\`\`

### Preview Local

Para testar localmente antes do deploy:

\`\`\`bash
npm run preview
\`\`\`

Isso irá:
1. Fazer build do Next.js
2. Fazer build do OpenNext
3. Iniciar um servidor local simulando o ambiente Cloudflare Workers

## Estrutura do Projeto

Após o build, a estrutura gerada é:

\`\`\`
.open-next/
├── worker.js          # Entrypoint do Worker
├── assets/            # Assets estáticos (imagens, CSS, JS)
└── ...                # Outros arquivos internos
\`\`\`

## Scripts Disponíveis

\`\`\`json
{
  "build": "next build",
  "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
  "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
}
\`\`\`

## Domínio Customizado

Após o primeiro deploy, você pode configurar um domínio customizado:

1. Acesse o Cloudflare Dashboard
2. Vá para Workers & Pages → seu worker
3. Settings → Triggers → Custom Domains
4. Adicione seu domínio

## Monitoramento

O projeto tem observability habilitada no `wrangler.jsonc`:

\`\`\`jsonc
"observability": {
  "enabled": true
}
\`\`\`

Acesse logs e métricas em:
- Cloudflare Dashboard → Workers & Pages → seu worker → Logs

## Troubleshooting

### Build falha

\`\`\`bash
# Limpe o cache e tente novamente
rm -rf .next .open-next
npm run build
npm run deploy
\`\`\`

### Worker não inicia

Verifique os logs:

\`\`\`bash
npx wrangler tail dr-gustavo-site
\`\`\`

### Assets não carregam

Certifique-se de que:
- O build foi concluído com sucesso
- A pasta `.open-next/assets` existe
- O binding ASSETS está configurado no `wrangler.jsonc`

## Recursos

- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js Documentation](https://nextjs.org/docs)
