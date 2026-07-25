/**
 * Laço de conscientização do autismo (quebra-cabeça colorido).
 * Asset em /public/images/autism-ribbon.png.
 *
 * Usa <img> nativo (site já tem images.unoptimized) — evita edge cases do
 * next/image com `fill` em ícones pequenos no header client.
 */
export function AutismRibbon({
  className = "w-6 h-7",
  title = "Autismo e neurodivergência",
}: {
  className?: string
  title?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- ícone estático local; unoptimized
    <img
      src="/images/autism-ribbon.png"
      alt={title}
      title={title}
      width={28}
      height={32}
      decoding="async"
      className={`inline-block shrink-0 object-contain object-center ${className}`}
    />
  )
}
