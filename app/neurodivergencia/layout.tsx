import type { Metadata } from "next"
import type { ReactNode } from "react"
import { NeuroPortalShell } from "@/components/neuro/portal-shell"

export const metadata: Metadata = {
  title: {
    default: "Neurodivergência e TEA | Dr. Gustavo Mendes",
    template: "%s · Portal Neurodivergência",
  },
  description:
    "Portal do Dr. Gustavo Mendes e Silva — psiquiatra e autista — sobre TEA, neurodivergência e cuidado sem pressa.",
  robots: { index: true, follow: true },
}

export default function NeurodivergenciaLayout({ children }: { children: ReactNode }) {
  return <NeuroPortalShell>{children}</NeuroPortalShell>
}
