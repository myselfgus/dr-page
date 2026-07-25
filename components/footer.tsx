import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { StarIcon } from "@/components/blocks/cta-button"
import { CONDITION_LANDINGS } from "@/lib/condition-landings"
import {
  type ContactConfig,
  type NavConfig,
  type BrandConfig,
  DEFAULT_CONTACT,
  DEFAULT_NAV,
  DEFAULT_BRAND,
  resolveCta,
} from "@/lib/site-config"

// Rótulos do rodapé: "Domiciliar" vira "Atendimento domiciliar".
function footerNav(nav: NavConfig) {
  return nav.items.map((i) =>
    i.href === "/domiciliar" ? { ...i, label: "Atendimento domiciliar" } : i,
  )
}

export function Footer({
  contact = DEFAULT_CONTACT,
  nav = DEFAULT_NAV,
  brand = DEFAULT_BRAND,
}: {
  contact?: ContactConfig
  nav?: NavConfig
  brand?: BrandConfig
}) {
  const wa = resolveCta({ kind: "whatsapp", label: "WhatsApp" }, contact)
  const items = footerNav(nav)
  const addr = contact.address

  return (
    <footer className="border-t border-border py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-light mb-4">{brand.name}</h3>
            <p className="font-mono text-xs tracking-wide text-muted-foreground mb-2">{brand.crm}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{brand.tagline}</p>
            <p className="text-sm text-muted-foreground mt-3">
              Psiquiatra em Jundiaí — Clínica Dr. Hegg
            </p>
            <a
              href={contact.doctoralia}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#00c3a5] hover:text-[#00ab91] transition-colors"
            >
              <StarIcon />
              Perfil e avaliações na Doctoralia
            </a>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              {contact.instagram ? (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @drgustavomendesesilva
                </a>
              ) : null}
              {contact.facebook ? (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center hover:text-foreground transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Navegar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Cuidados</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CONDITION_LANDINGS.map((c) => (
                <li key={c.path}>
                  <Link href={c.path} className="hover:text-foreground transition-colors">
                    {c.eyebrow}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${contact.phoneTel}`} className="hover:text-foreground transition-colors">
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={wa.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:text-[#20BA5A] transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  {addr.clinic}
                  <br />
                  {addr.street}
                  <br />
                  {addr.cityLine}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="mb-1">
            {brand.name} - {brand.crm}
          </p>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
