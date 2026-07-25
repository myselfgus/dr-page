"use client"

import { useEffect } from "react"

const RELOAD_KEY = "drg-chunk-reload"

function isChunkError(message: string): boolean {
  return /Loading chunk|ChunkLoadError|Failed to fetch dynamically imported module|Loading CSS chunk|error loading dynamically imported module/i.test(
    message,
  )
}

/**
 * Após deploy no Cloudflare Assets, HTML em ISR stale pode referenciar chunks
 * antigos que já não existem → Application error. Um hard reload costuma
 * buscar o HTML novo. Limita a 1 reload por aba (sessionStorage).
 */
export function ChunkErrorRecovery() {
  useEffect(() => {
    const tryReload = (reason: string) => {
      if (typeof window === "undefined") return
      try {
        if (sessionStorage.getItem(RELOAD_KEY) === "1") return
        sessionStorage.setItem(RELOAD_KEY, "1")
        console.warn("[chunk-recovery] reloading once:", reason)
        window.location.reload()
      } catch {
        // sessionStorage bloqueado — tenta reload mesmo assim
        window.location.reload()
      }
    }

    const onError = (event: ErrorEvent) => {
      const msg = event.message || String(event.error ?? "")
      if (isChunkError(msg)) {
        event.preventDefault()
        tryReload(msg)
      }
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const msg =
        typeof reason === "string"
          ? reason
          : reason instanceof Error
            ? reason.message
            : String(reason ?? "")
      if (isChunkError(msg)) {
        event.preventDefault()
        tryReload(msg)
      }
    }

    window.addEventListener("error", onError)
    window.addEventListener("unhandledrejection", onRejection)

    // Limpa a flag depois que a página estabilizou (chunks ok nesta carga)
    const t = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_KEY)
      } catch {
        /* ignore */
      }
    }, 8000)

    return () => {
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onRejection)
      window.clearTimeout(t)
    }
  }, [])

  return null
}
