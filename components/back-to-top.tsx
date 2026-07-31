"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"
import { FLOAT, FLOAT_Z, floatBottom } from "@/lib/float-stack"

type Phase = "hidden" | "fresh" | "settle"

/** How long the droplet stays “present” after scroll before fading to ghost. */
const SETTLE_MS = 2200
const SHOW_AFTER_Y = 300

export function BackToTop() {
  const [phase, setPhase] = useState<Phase>("hidden")
  const [shimmer, setShimmer] = useState(false)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shimmerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wasHidden = useRef(true)

  useEffect(() => {
    const clearTimers = () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
      if (shimmerTimer.current) clearTimeout(shimmerTimer.current)
    }

    const onScroll = () => {
      const past = window.scrollY > SHOW_AFTER_Y

      if (!past) {
        wasHidden.current = true
        setPhase("hidden")
        setShimmer(false)
        clearTimers()
        return
      }

      // Just became visible → liquid entrance + one-shot shimmer
      if (wasHidden.current) {
        wasHidden.current = false
        setPhase("fresh")
        setShimmer(true)
        shimmerTimer.current = setTimeout(() => setShimmer(false), 1400)
      } else {
        setPhase("fresh")
      }

      // After idle, settle into a quieter droplet
      if (settleTimer.current) clearTimeout(settleTimer.current)
      settleTimer.current = setTimeout(() => {
        setPhase((p) => (p === "hidden" ? "hidden" : "settle"))
      }, SETTLE_MS)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimers()
    }
  }, [])

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    })
  }

  const bottom = floatBottom(2)
  const right = FLOAT.edgePx + (FLOAT.fabPx - FLOAT.backPx) / 2
  const visible = phase !== "hidden"

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="back-to-top-drop fixed flex items-center justify-center rounded-full"
      data-visible={visible ? "true" : "false"}
      data-phase={phase === "hidden" ? "settle" : phase}
      data-shimmer={shimmer ? "true" : "false"}
      style={{
        bottom: `max(${bottom}px, calc(env(safe-area-inset-bottom, 0px) + ${bottom}px))`,
        right,
        width: FLOAT.backPx,
        height: FLOAT.backPx,
        zIndex: FLOAT_Z.back,
      }}
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="h-3.5 w-3.5 relative z-[1]" strokeWidth={1.75} />
    </button>
  )
}
