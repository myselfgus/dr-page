import Image from "next/image"

/**
 * Laço de conscientização do autismo (quebra-cabeça colorido).
 * Asset em /public/images/autism-ribbon.png — reconhecível no primeiro olhar.
 */
export function AutismRibbon({
  className = "w-6 h-7",
  title = "Autismo e neurodivergência",
}: {
  className?: string
  title?: string
}) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`} title={title}>
      <Image
        src="/images/autism-ribbon.png"
        alt={title}
        fill
        className="object-contain object-center"
        sizes="48px"
        priority={false}
      />
    </span>
  )
}
