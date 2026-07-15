import {
  MapPin,
  Clock,
  ShieldCheck,
  Video,
  Heart,
  Users,
  Home,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

// Mapa fechado de ícones lucide-react resolvidos por `iconName` no content_json.
const ICONS: Record<string, LucideIcon> = {
  MapPin,
  Clock,
  ShieldCheck,
  Video,
  Heart,
  Users,
  Home,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Sparkles,
}

export function getIcon(name?: string): LucideIcon | undefined {
  if (!name) return undefined
  return ICONS[name]
}

export function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = getIcon(name)
  if (!Cmp) return null
  return <Cmp className={className} />
}
