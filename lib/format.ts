/** Exibe só iniciais (privacidade). Aceita nome completo ou já em siglas. */
export function toAuthorInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return ""
  // Já parece sigla (M.B.M. / C.G. / R.)
  if (/^[A-Za-zÀ-ÿ](\.[A-Za-zÀ-ÿ])+\.?$/.test(trimmed.replace(/\s/g, ""))) {
    return trimmed.endsWith(".") ? trimmed : `${trimmed}.`
  }
  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return `${parts[0]![0]!.toUpperCase()}.`
  }
  return `${parts.map((p) => p[0]!.toUpperCase()).join(".")}.`
}
