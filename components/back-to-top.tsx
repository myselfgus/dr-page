"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 z-40 rounded-full bg-neutral-900/80 backdrop-blur-xl p-2.5 text-white border border-white/10 transition-all duration-300 hover:bg-neutral-800/90 hover:scale-110 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)" }}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
