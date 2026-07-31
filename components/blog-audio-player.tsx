"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play, Headphones } from "lucide-react"

/**
 * Podcast-style player for pre-generated xAI TTS audio.
 */
export function BlogAudioPlayer({
  src,
  title,
}: {
  src: string
  title: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onTime = () => setProgress(el.currentTime)
    const onMeta = () => {
      setDuration(el.duration || 0)
      setReady(true)
    }
    const onEnded = () => setPlaying(false)
    const onErr = () => setError(true)

    el.addEventListener("timeupdate", onTime)
    el.addEventListener("loadedmetadata", onMeta)
    el.addEventListener("ended", onEnded)
    el.addEventListener("error", onErr)
    return () => {
      el.removeEventListener("timeupdate", onTime)
      el.removeEventListener("loadedmetadata", onMeta)
      el.removeEventListener("ended", onEnded)
      el.removeEventListener("error", onErr)
    }
  }, [src])

  const toggle = async () => {
    const el = audioRef.current
    if (!el || error) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      try {
        await el.play()
        setPlaying(true)
      } catch {
        setError(true)
      }
    }
  }

  const seek = (value: number) => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = value
    setProgress(value)
  }

  const fmt = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return "0:00"
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  if (error) return null

  return (
    <div className="glass-pill rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 mb-10">
      <audio ref={audioRef} src={src} preload="metadata" playsInline />
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={toggle}
          className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background shadow-md hover:scale-105 transition-transform"
          aria-label={playing ? "Pausar áudio" : "Ouvir como podcast"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-emphasis text-foreground/80">
            <Headphones className="h-3.5 w-3.5 shrink-0 opacity-70" />
            <span className="truncate">Ouvir este artigo · voz narrada</span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            disabled={!ready}
            className="w-full h-1.5 accent-foreground cursor-pointer disabled:opacity-40"
            aria-label={`Progresso do áudio: ${title}`}
          />
          <div className="flex justify-between font-mono text-[11px] text-muted-foreground tabular-nums">
            <span>{fmt(progress)}</span>
            <span>{ready ? fmt(duration) : "…"}</span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground/80 leading-snug">
        Áudio gerado com voz sintética (xAI). Conteúdo informativo — não substitui consulta.
      </p>
    </div>
  )
}
