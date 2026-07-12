import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-light mb-4">Dr. Gustavo Mendes e Silva</h3>
            <p className="text-sm text-muted-foreground mb-2">CRM 218133/SP</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Psiquiatria humanizada com consultas de 2 horas, atendimento domiciliar e narrativas fenomenológicas
              personalizadas.
            </p>
            <a
              href="https://www.doctoralia.com.br/gustavo-mendes-e-silva/psiquiatra/jundiai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#00c3a5] hover:text-[#00ab91] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-11l7 5.5-7 5.5z" />
              </svg>
              Perfil e avaliações na Doctoralia
            </a>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Navegar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-foreground transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+5511915398330" className="hover:text-foreground transition-colors">
                    (11) 91539-8330
                  </a>
                  <a
                    href="https://wa.me/5511915398330?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta"
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
                  Clínica Dr. Hegg
                  <br />
                  Rua Dr. Hegg, 492 - Vila Arens
                  <br />
                  Jundiaí, SP - CEP 13202-544
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:contato@drgustavomendes.com" className="hover:text-foreground transition-colors">
                  contato@drgustavomendes.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="mb-1">Dr. Gustavo Mendes e Silva - CRM 218133/SP</p>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
