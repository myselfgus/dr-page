// Sanitização de marcação inline permitida no conteúdo do CMS.
// Só <strong>/</strong> passam (marcação leve); qualquer outra tag é removida.
export function sanitizeInline(input: string): string {
  if (typeof input !== "string") return ""
  return input.replace(/<(?!\/?strong\s*>)[^>]*>/gi, "")
}
