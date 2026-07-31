"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { FLOAT, FLOAT_Z, floatBottom } from "@/lib/float-stack"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    })
  }

  // Index 2: above WhatsApp (0) + AI bubble (1)
  const bottom = floatBottom(2)
  // Center the smaller control on the FAB column
  const right = FLOAT.edgePx + (FLOAT.fabPx - FLOAT.backPx) / 2

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed rounded-full bg-foreground/85 backdrop-blur-xl text-background border border-border/20 shadow-lg transition-all duration-300 hover:bg-foreground hover:scale-105 flex items-center justify-center ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        bottom: `max(${bottom}px, calc(env(safe-area-inset-bottom, 0px) + ${bottom}px))`,
        right,
        width: FLOAT.backPx,
        height: FLOAT.backPx,
        zIndex: FLOAT_Z.back,
      }}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
