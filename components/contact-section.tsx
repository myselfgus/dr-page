"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"
import { WhatsAppIcon, StarIcon } from "@/components/blocks/cta-button"
import { type ContactConfig, DEFAULT_CONTACT, resolveCta } from "@/lib/site-config"

export interface ContactContent {
  title: string
  subtitle: string
}

export interface ContactDesign {
  id?: string
  variant?: "home" | "page"
  showForm?: boolean
  showMap?: boolean
}

export const DEFAULT_CONTENT: ContactContent = {
  title: "Agende Sua Consulta",
  subtitle:
    "Dar o primeiro passo em direção a uma melhor saúde mental começa aqui. Entre em contato para agendar uma consulta ou saber mais sobre nossos serviços.",
}

export const DEFAULT_DESIGN: ContactDesign = {
  id: "contact",
  variant: "home",
  showForm: true,
  showMap: true,
}

export function ContactSection({
  content = DEFAULT_CONTENT,
  design = DEFAULT_DESIGN,
  contact = DEFAULT_CONTACT,
}: {
  content?: ContactContent
  design?: ContactDesign
  contact?: ContactConfig
}) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  // Form nunca transmite dados de saúde (LGPD): só console.log. Prefira WhatsApp.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const wa = resolveCta({ kind: "whatsapp", label: "Chamar no WhatsApp" }, contact)
  const showForm = design.showForm !== false
  const showMap = design.showMap !== false
  const addr = contact.address

  return (
    <section id={design.id ?? "contact"} className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
              {content.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{content.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-foreground/5 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-light mb-2 text-balance">
                    Telefone / WhatsApp
                  </h3>
                  <a
                    href={`tel:${contact.phoneTel}`}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors block mb-3"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={wa.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm bg-[#25D366] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#20BA5A] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Chamar no WhatsApp
                  </a>
                  <a
                    href={contact.doctoralia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#00c3a5] hover:text-[#00ab91] transition-colors ml-0 sm:ml-3 mt-2 sm:mt-0"
                  >
                    <StarIcon />
                    Ver avaliações na Doctoralia
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-foreground/5 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-light mb-2 text-balance">
                    E-mail
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-foreground/5 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-light mb-2 text-balance">
                    {addr.locality}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {addr.clinic}
                    <br />
                    {addr.street}
                    <br />
                    {addr.cityLine}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showMap ? (
            <div className="mb-12 rounded-2xl overflow-hidden border border-border shadow-card">
              <iframe
                src={contact.mapEmbed}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Clínica"
              />
            </div>
          ) : null}

          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full resize-none"
                  placeholder="Por favor, compartilhe quaisquer dúvidas ou preocupações que gostaria de discutir..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Solicitar Consulta
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  )
}
