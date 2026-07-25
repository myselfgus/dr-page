// Price badge intentionally renders nothing — valores de consulta
// não são publicados no site. Mantido para não quebrar blocos legados no CMS.
export interface PriceBadgeContent {
  label: string
  value: string
  note?: string
}

export interface PriceBadgeDesign {
  variant?: "inline-card"
}

export function PriceBadge(_props: {
  content: PriceBadgeContent
  design?: PriceBadgeDesign
}) {
  return null
}
