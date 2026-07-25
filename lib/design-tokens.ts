import { getCloudflareContext } from "@opennextjs/cloudflare"

// ---------------------------------------------------------------------------
// Design como dado. Lê a tabela `design_tokens` da D1 `dr_blog` e monta uma
// string CSS `:root{...}` + `.dark{...}` que app/layout.tsx injeta num
// <style id="design-tokens"> DEPOIS do globals.css (vence por cascata).
// globals.css continua como fallback: se a D1 falhar, buildTokensCss() volta
// string vazia e nada é injetado.
// Sanitização estrita: rejeita valores/keys com caracteres que permitiriam
// escapar do contexto de propriedade CSS.
// ---------------------------------------------------------------------------

interface DesignTokenRow {
  key: string
  value: string
  category: string
  scope: string
}

const KEY_RE = /^[a-zA-Z0-9-]+$/
// Padrões proibidos dentro de um valor de custom property.
const FORBIDDEN = ["<", "}", "@import", "url(", "</style", "expression(", ";", "{"]

function isSafeValue(value: string): boolean {
  if (typeof value !== "string") return false
  if (value.length > 200) return false
  const lower = value.toLowerCase()
  return !FORBIDDEN.some((bad) => lower.includes(bad))
}

function isSafeKey(key: string): boolean {
  return typeof key === "string" && key.length > 0 && key.length <= 60 && KEY_RE.test(key)
}

async function getDb(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext({ async: true })
    return (env as unknown as { dr_blog?: D1Database }).dr_blog ?? null
  } catch {
    return null
  }
}

export async function getDesignTokens(): Promise<DesignTokenRow[]> {
  const db = await getDb()
  if (!db) return []
  const { results } = await db
    .prepare("SELECT key, value, category, scope FROM design_tokens ORDER BY sort_order ASC")
    .all<DesignTokenRow>()
  return results ?? []
}

function renderScope(selector: string, rows: DesignTokenRow[]): string {
  const decls = rows
    .filter((r) => isSafeKey(r.key) && isSafeValue(r.value))
    .map((r) => `  --${r.key}: ${r.value};`)
    .join("\n")
  if (!decls) return ""
  return `${selector} {\n${decls}\n}`
}

// Monta a string CSS a partir das linhas. Nunca lança: se algo falhar,
// retorna "" e o site mantém o globals.css como fallback.
export function tokensToCss(rows: DesignTokenRow[]): string {
  try {
    const root = rows.filter((r) => r.scope !== "dark")
    const dark = rows.filter((r) => r.scope === "dark")
    return [renderScope(":root", root), renderScope(".dark", dark)].filter(Boolean).join("\n")
  } catch {
    return ""
  }
}

// Helper de conveniência usado no layout: lê o D1 e devolve o CSS pronto.
// Nunca quebra o build — em erro (sem D1) retorna string vazia.
export async function buildDesignTokensCss(): Promise<string> {
  try {
    const rows = await getDesignTokens()
    return tokensToCss(rows)
  } catch {
    return ""
  }
}
