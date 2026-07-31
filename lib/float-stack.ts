/**
 * Shared geometry for bottom-right floating actions.
 * Column (bottom → top): AI Search → WhatsApp → Back to top
 *
 * Sizes match the FAB diameter (48px). Gaps keep touch targets clear on mobile.
 */

export const FLOAT = {
  /** Distance from viewport edges */
  edgePx: 24,
  /** FAB diameter (WhatsApp + AI bubble) */
  fabPx: 48,
  /** Space between FABs */
  gapPx: 12,
  /** Back-to-top is slightly smaller */
  backPx: 40,
} as const

/** Stack indices (0 = lowest / closest to bottom edge) */
export const FLOAT_INDEX = {
  ai: 0,
  whatsapp: 1,
  back: 2,
} as const

/** bottom offset for item index 0 = lowest */
export function floatBottom(index: number): number {
  let bottom = FLOAT.edgePx
  for (let i = 0; i < index; i++) {
    bottom += FLOAT.fabPx + FLOAT.gapPx
  }
  return bottom
}

export const FLOAT_Z = {
  back: 40,
  ai: 45,
  whatsapp: 50,
} as const
