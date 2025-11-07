# Deploying to Cloudflare Workers

This project is configured to deploy to Cloudflare Workers using the OpenNext Cloudflare adapter.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Already installed as a dev dependency
3. **Node.js**: Version 18 or later

## Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Authenticate with Cloudflare

\`\`\`bash
npx wrangler login
\`\`\`

This will open a browser window to authenticate with your Cloudflare account.

### 3. Configure Your Worker Name (Optional)

Edit `wrangler.jsonc` and change the `name` field to your desired worker name:

\`\`\`jsonc
{
  "name": "your-worker-name"
}
\`\`\`

## Development

### Local Development with Next.js

\`\`\`bash
npm run dev
\`\`\`

This runs the standard Next.js development server with Cloudflare context enabled.

### Preview with Cloudflare Workers Runtime

\`\`\`bash
npm run preview
\`\`\`

This builds your app and runs it locally using the actual Cloudflare Workers runtime.

## Deployment

### Deploy to Cloudflare Workers

\`\`\`bash
npm run deploy
\`\`\`

This command will:
1. Build your Next.js application
2. Transform it for Cloudflare Workers using OpenNext
3. Deploy to Cloudflare Workers

### Upload Only (No Deployment)

\`\`\`bash
npm run upload
\`\`\`

Uploads the worker code without deploying (useful for CI/CD pipelines).

## Environment Variables

### Local Development

Add environment variables to `.dev.vars` (already created):

\`\`\`bash
NEXTJS_ENV=development
YOUR_API_KEY=your-dev-key
\`\`\`

### Production

Set production secrets using Wrangler:

\`\`\`bash
npx wrangler secret put YOUR_API_KEY
\`\`\`

Or use the Cloudflare dashboard: Workers & Pages → Your Worker → Settings → Variables

## Optional: Advanced Configuration

### Enable R2 Incremental Cache

1. Create an R2 bucket:
\`\`\`bash
npx wrangler r2 bucket create artiste-next-cache
\`\`\`

2. Uncomment the R2 configuration in `wrangler.jsonc`:
\`\`\`jsonc
"r2_buckets": [
  {
    "binding": "NEXT_INC_CACHE_R2_BUCKET",
    "bucket_name": "artiste-next-cache"
  }
]
\`\`\`

3. Uncomment the R2 cache in `open-next.config.ts`:
\`\`\`typescript
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
})
\`\`\`

### Add KV, D1, or AI Bindings

Uncomment the relevant sections in `wrangler.jsonc` and configure with your resource IDs.

### Generate TypeScript Types for Bindings

\`\`\`bash
npm run cf-typegen
\`\`\`

This generates `cloudflare-env.d.ts` with types for your Cloudflare bindings.

## Accessing Cloudflare Resources in Your Code

Use the `getCloudflareContext` API:

\`\`\`typescript
import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request: Request) {
  const { env, cf, ctx } = await getCloudflareContext()
  
  // Access bindings
  // const value = await env.KV.get('key')
  // const result = await env.DB.prepare('SELECT * FROM users').all()
  
  return Response.json({ success: true })
}
\`\`\`

## Troubleshooting

### Build Errors

- Ensure `compatibility_date` in `wrangler.jsonc` is set to 2024-09-23 or later
- Verify `nodejs_compat` flag is enabled
- Check that `@opennextjs/cloudflare` is installed

### Runtime Errors

- Check Wrangler logs: `npx wrangler tail`
- Verify environment variables are set correctly
- Ensure all Node.js APIs you're using are supported by Cloudflare Workers

## Resources

- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js Documentation](https://nextjs.org/docs)

## Migration Notes

This project has been migrated from the deprecated `@cloudflare/next-on-pages` to `@opennextjs/cloudflare`, which is the recommended approach as of November 2025.

Key changes:
- Full Node.js runtime support (not just Edge runtime)
- Better support for Next.js 15+ features
- Improved caching and performance
- Active maintenance and updates
