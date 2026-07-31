/**
 * Shared geometry for bottom-right floating actions.
 * Column (bottom → top): AI Search → WhatsApp → Back to top
 *
 * WhatsApp must sit above the AI Search snippet button (which defaults
 * to z-index 9999 inside shadow DOM if CSS vars fail to apply).
 */

export const FLOAT = {
  edgePx: 24,
  fabPx: 48,
  gapPx: 12,
  backPx: 40,
} as const

export const FLOAT_INDEX = {
  ai: 0,
  whatsapp: 1,
  back: 2,
} as const

export function floatBottom(index: number): number {
  let bottom = FLOAT.edgePx
  for (let i = 0; i < index; i++) {
    bottom += FLOAT.fabPx + FLOAT.gapPx
  }
  return bottom
}

export const FLOAT_Z = {
  back: 40,
  /** Below WhatsApp; snippet default is 9999 — we override via CSS var */
  ai: 40,
  /** Must beat AI Search bubble default z-index (9999) */
  whatsapp: 10050,
} as const
