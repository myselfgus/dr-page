"use client"

import { useEffect } from "react"

/**
 * Captura erros no root layout. Precisa de html/body próprios.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    const msg = `${error?.name ?? ""} ${error?.message ?? ""}`
    if (
      /Loading chunk|ChunkLoadError|Failed to fetch dynamically imported module|Loading CSS chunk/i.test(
        msg,
      )
    ) {
      try {
        if (sessionStorage.getItem("drg-chunk-reload") !== "1") {
          sessionStorage.setItem("drg-chunk-reload", "1")
          window.location.reload()
        }
      } catch {
        window.location.reload()
      }
    }
  }, [error])

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          background: "#F0EEE9",
          color: "#1a1a1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
            Dr. Gustavo Mendes
          </p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 400, margin: "1rem 0" }}>
            Erro ao carregar o site
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, marginBottom: "1.5rem" }}>
            Atualize a página. Se o problema continuar, abra em aba anônima ou limpe o cache.
          </p>
          <button
            type="button"
            onClick={() => {
              try {
                sessionStorage.removeItem("drg-chunk-reload")
              } catch {
                /* ignore */
              }
              window.location.href = "/"
            }}
            style={{
              appearance: "none",
              border: "none",
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: 999,
              padding: "0.75rem 1.5rem",
              fontSize: 14,
              cursor: "pointer",
              marginRight: 8,
            }}
          >
            Recarregar início
          </button>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              appearance: "none",
              border: "1px solid #ccc",
              background: "transparent",
              color: "#1a1a1a",
              borderRadius: 999,
              padding: "0.75rem 1.5rem",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  )
}
