/**
 * Laço de conscientização do autismo — forma clássica de awareness ribbon,
 * com faixas coloridas suaves. Intuitivo: associa a TEA/autismo no primeiro olhar.
 */
export function AutismRibbon({
  className = "w-6 h-6",
  title = "Autismo e neurodivergência",
}: {
  className?: string
  title?: string
}) {
  const uid = "ar"
  return (
    <svg
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        {/* Gradiente vertical suave — espectro reconhecível, sem gritar */}
        <linearGradient id={`${uid}-fill`} x1="16" y1="2" x2="16" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E85D4C" />
          <stop offset="22%" stopColor="#F0A202" />
          <stop offset="42%" stopColor="#F5D76E" />
          <stop offset="58%" stopColor="#3DDC97" />
          <stop offset="78%" stopColor="#4A90E2" />
          <stop offset="100%" stopColor="#7B68EE" />
        </linearGradient>
      </defs>
      {/* Laço clássico (awareness ribbon) */}
      <path
        d="M16 6.2
           C11.2 6.2 8 9.6 8 14.2
           C8 17.8 10.2 20.6 13.4 23.2
           L8.2 34.8
           C7.85 35.55 8.4 36.4 9.25 36.4
           H11.1
           C11.55 36.4 11.95 36.15 12.15 35.75
           L16 27.2
           L19.85 35.75
           C20.05 36.15 20.45 36.4 20.9 36.4
           H22.75
           C23.6 36.4 24.15 35.55 23.8 34.8
           L18.6 23.2
           C21.8 20.6 24 17.8 24 14.2
           C24 9.6 20.8 6.2 16 6.2Z
           M16 9.4
           C18.7 9.4 20.6 11.5 20.6 14.2
           C20.6 16.6 18.85 18.7 16.35 20.85
           L16 21.15
           L15.65 20.85
           C13.15 18.7 11.4 16.6 11.4 14.2
           C11.4 11.5 13.3 9.4 16 9.4Z"
        fill={`url(#${uid}-fill)`}
      />
    </svg>
  )
}
