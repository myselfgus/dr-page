"use client"

import { useEffect } from "react"

function isChunkError(error: Error): boolean {
  const msg = `${error?.name ?? ""} ${error?.message ?? ""}`
  return /Loading chunk|ChunkLoadError|Failed to fetch dynamically imported module|Loading CSS chunk/i.test(
    msg,
  )
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (!isChunkError(error)) return
    try {
      if (sessionStorage.getItem("drg-chunk-reload") === "1") return
      sessionStorage.setItem("drg-chunk-reload", "1")
      window.location.reload()
    } catch {
      window.location.reload()
    }
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
        Algo deu errado
      </p>
      <h1 className="font-serif text-2xl sm:text-3xl font-light mb-3 text-balance">
        Não foi possível carregar esta página
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
        Pode ser um cache antigo após uma atualização do site. Tente recarregar;
        se continuar, limpe o cache do navegador ou abra em aba anônima.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.removeItem("drg-chunk-reload")
            } catch {
              /* ignore */
            }
            window.location.reload()
          }}
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium"
        >
          Recarregar
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-full text-sm font-medium"
        >
          Tentar de novo
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Ir ao início
        </a>
      </div>
    </div>
  )
}
