"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      time += 0.001

      // Simple subtle gradient that shifts very slowly
      const gradient = ctx.createLinearGradient(0, 0, width, height)

      const brightness1 = Math.sin(time) * 0.01 + 0.97
      const brightness2 = Math.sin(time + Math.PI / 2) * 0.01 + 0.98

      // Cloud Dancer family (warm off-white)
      gradient.addColorStop(0, `rgba(240, 238, 233, ${brightness1})`)
      gradient.addColorStop(1, `rgba(245, 243, 238, ${brightness2})`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
