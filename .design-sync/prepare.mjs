#!/usr/bin/env node
// Reproducible pre-step for /design-sync on this repo (an app, not a published
// package). Builds everything the converter needs into .design-sync/.cache/dts:
//   1. compiled Tailwind stylesheet (the app's CSS is source-form @import
//      "tailwindcss" — the bundle needs the emitted utilities)
//   2. a synthetic type package: index.ts (bundled by the converter) +
//      index.d.ts + the declaration tree emitted from .design-sync/entry.ts,
//      so <Name>.d.ts carries the real props instead of an `unknown` stub.
// Run from the repo root:  node .design-sync/prepare.mjs
import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const walkDts = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n)
    return statSync(p).isDirectory() ? walkDts(p) : p.endsWith('.d.ts') ? [p] : []
  })

const DS = dirname(fileURLToPath(import.meta.url))
const REPO = dirname(DS)
const PKG = join(DS, '.cache', 'dts')

rmSync(PKG, { recursive: true, force: true })
mkdirSync(PKG, { recursive: true })

// 1. Tailwind → one emitted stylesheet, bounded inside the synthetic package
//    (the converter requires cssEntry to live under PKG_DIR).
execFileSync(
  process.execPath,
  [
    join(REPO, '.ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs'),
    '-i', join(DS, 'css/entry.css'),
    '-o', join(PKG, 'styles.css'),
  ],
  { cwd: REPO, stdio: 'inherit' },
)

// 2. Declarations for the entry's transitive surface.
const emitCfg = join(DS, '.cache', 'tsconfig.emit.json')
writeFileSync(
  emitCfg,
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: REPO,
        paths: { '@/*': ['./*'], 'next/image': ['./.design-sync/shims/next-image.tsx'] },
        jsx: 'react-jsx',
        target: 'ES2020',
        module: 'esnext',
        moduleResolution: 'bundler',
        lib: ['dom', 'dom.iterable', 'esnext'],
        esModuleInterop: true,
        skipLibCheck: true,
        strict: false,
        declaration: true,
        emitDeclarationOnly: true,
        noEmit: false,
        rootDir: REPO,
        outDir: PKG,
      },
      files: [join(DS, 'entry.ts')],
    },
    null,
    2,
  ),
)
try {
  execFileSync(process.execPath, [join(REPO, 'node_modules/typescript/bin/tsc'), '-p', emitCfg], {
    cwd: REPO,
    stdio: 'inherit',
  })
} catch {
  // tsc exits non-zero on type errors it still emitted declarations for.
  console.error('  (tsc reported diagnostics — declarations were still emitted)')
}

// 3. Package facade: index.ts is what the converter bundles; index.d.ts is the
//    types root it parses (a flat root so the whole tree is in scope).
cpSync(join(DS, 'entry.ts'), join(PKG, 'index.ts'))

// ts-morph parses the emitted tree with no path-alias config, so every "@/…"
// specifier would dangle (props collapse to `unknown`). Rewrite them to paths
// relative to the synthetic package root, which mirrors the repo layout.
for (const f of walkDts(PKG)) {
  const src = readFileSync(f, 'utf8')
  const fixed = src.replace(/(['"])@\/([^'"]+)\1/g, (_m, q, rest) => {
    let rel = relative(dirname(f), join(PKG, rest)).split(sep).join('/')
    if (!rel.startsWith('.')) rel = './' + rel
    return q + rel + q
  })
  if (fixed !== src) writeFileSync(f, fixed)
}

// A flat index.d.ts re-exporting each component module by relative path — the
// converter's types root. Derived from entry.ts so the two never drift.
const modules = [...new Set(
  [...readFileSync(join(DS, 'entry.ts'), 'utf8').matchAll(/from\s+"@\/([^"]+)"/g)].map((m) => m[1]),
)]
writeFileSync(join(PKG, 'index.d.ts'), modules.map((m) => `export * from "./${m}";`).join('\n') + '\n')
writeFileSync(
  join(PKG, 'package.json'),
  JSON.stringify(
    { name: 'drgustavomendes-ui', version: '0.1.0', types: 'index.d.ts', private: true },
    null,
    2,
  ) + '\n',
)
console.error(`✓ prepared ${PKG}`)
