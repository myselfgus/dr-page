/** Símbolo do infinito — marca do portal de neurodivergência (não o puzzle). */
export function InfinityMark({
  className = "w-7 h-7",
  title = "Neurodivergência",
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        d="M12.5 12c0-3.6 2.7-6.5 6-6.5 2.4 0 4.4 1.3 6.5 3.7 2.1-2.4 4.1-3.7 6.5-3.7 3.3 0 6 2.9 6 6.5s-2.7 6.5-6 6.5c-2.4 0-4.4-1.3-6.5-3.7-2.1 2.4-4.1 3.7-6.5 3.7-3.3 0-6-2.9-6-6.5Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
