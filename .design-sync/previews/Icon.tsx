import { Icon } from "drgustavomendes-ui"

const NAMES = [
  "MapPin", "Clock", "ShieldCheck", "Video", "Heart", "Users",
  "Home", "Brain", "Briefcase", "GraduationCap", "Award", "Globe", "Sparkles",
]

export const MapaFechado = () => (
  <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
    {NAMES.map((n) => (
      <div key={n} className="flex flex-col items-center gap-2 text-center">
        <div className="p-3 bg-foreground/5 rounded-xl">
          <Icon name={n} className="w-5 h-5" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground break-all">{n}</span>
      </div>
    ))}
  </div>
)

export const Tamanhos = () => (
  <div className="flex items-end gap-6">
    <Icon name="Brain" className="w-4 h-4" />
    <Icon name="Brain" className="w-6 h-6" />
    <Icon name="Brain" className="w-10 h-10" />
  </div>
)

export const NomeDesconhecido = () => (
  <div className="flex items-center gap-3 text-sm text-muted-foreground">
    <div className="p-3 bg-foreground/5 rounded-xl">
      <Icon name="NaoExiste" className="w-5 h-5" />
    </div>
    <span>Nome fora do mapa fechado renderiza nada (fallback silencioso).</span>
  </div>
)
