import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { ArrowLeft, Video, Clock, MapPin, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Teleconsulta Psiquiátrica",
  description:
    "Teleconsulta psiquiátrica por vídeo com Dr. Gustavo Mendes e Silva (CRM 218133/SP). O mesmo cuidado humanizado do atendimento presencial, de onde você estiver. Agende pelo WhatsApp.",
  alternates: { canonical: "https://drgustavomendes.com/teleconsulta" },
}

const WHATSAPP_URL =
  "https://wa.me/5511915398330?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20teleconsulta"

const benefits = [
  {
    icon: MapPin,
    title: "De onde você estiver",
    text: "Atendimento por vídeo para quem mora longe, viaja ou prefere a comodidade de casa.",
  },
  {
    icon: Clock,
    title: "Sem deslocamento",
    text: "Sem trânsito e sem sala de espera — mais tempo para o que importa, o cuidado.",
  },
  {
    icon: ShieldCheck,
    title: "Sigilo e segurança",
    text: "A consulta segue o mesmo sigilo médico do atendimento presencial, em ambiente reservado.",
  },
]

export default function TeleconsultaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Button variant="ghost" asChild className="fixed top-24 left-4 z-50 bg-background/80 backdrop-blur-sm">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Início
        </Link>
      </Button>

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Teleconsulta</p>
              <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6 text-balance">
                Atendimento psiquiátrico por vídeo
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A distância não precisa ser um obstáculo para cuidar da saúde mental. Na teleconsulta você tem a mesma
                escuta atenta e sem pressa do atendimento no consultório, por vídeo, de onde estiver.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full shadow-[4px_2px_2px_rgba(0,0,0,0.05)]">
                  <div className="p-3 bg-foreground/5 rounded-xl w-fit mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-xl font-light mb-2 text-balance">{item.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-[4px_2px_2px_rgba(0,0,0,0.05)]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-foreground/5 rounded-xl">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl lg:text-3xl font-light text-balance">Valores</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Após o agendamento, você recebe o link da videochamada pelo WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-8 grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Primeira consulta</p>
                    <p className="font-serif text-3xl font-light">R$ 350</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Retorno</p>
                    <p className="font-serif text-3xl font-light">R$ 290</p>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#20BA5A] transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="font-medium text-lg">Agendar pelo WhatsApp</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
