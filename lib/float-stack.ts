/**
 * Shared geometry for bottom-right floating actions.
 * Column (bottom → top): WhatsApp → AI Search → Back to top
 *
 * Sizes match the WhatsApp FAB (48px). Gaps keep touch targets clear on mobile.
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

/** bottom offset for item index 0 = lowest (WhatsApp) */
export function floatBottom(index: number, sizePx: number = FLOAT.fabPx): number {
  // Each step: previous size + gap. Index 0 uses fab size for spacing above it.
  let bottom = FLOAT.edgePx
  for (let i = 0; i < index; i++) {
    bottom += FLOAT.fabPx + FLOAT.gapPx
  }
  // When this item is smaller than fab (back-to-top), keep column optically aligned
  // by not adding extra — size only affects the control itself.
  void sizePx
  return bottom
}

export const FLOAT_Z = {
  back: 40,
  whatsapp: 50,
  ai: 45,
} as const
