"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export type RevealVariant = "section" | "item" | "left" | "right" | "scale" | "blur"

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "section",
}: {
  children: ReactNode
  delay?: number
  className?: string
  /**
   * section = opacity only (parent wrappers)
   * item = lift up
   * left / right = slide from side
   * scale = soft zoom-in
   * blur = fade + slight blur clear
   */
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
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const variantClass =
    variant === "item"
      ? "reveal reveal-lift"
      : variant === "left"
        ? "reveal reveal-left"
        : variant === "right"
          ? "reveal reveal-right"
          : variant === "scale"
            ? "reveal reveal-scale"
            : variant === "blur"
              ? "reveal reveal-blur"
              : "reveal"

  return (
    <div
      ref={ref}
      className={`${variantClass} ${visible ? "reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
