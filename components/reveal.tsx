"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export type RevealVariant = "section" | "item"

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "section",
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** section = opacity only (avoids double-lift with nested item reveals); item = opacity + translateY */
  variant?: RevealVariant
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const base = variant === "item" ? "reveal reveal-lift" : "reveal"

  return (
    <div
      ref={ref}
      className={`${base} ${visible ? "reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
