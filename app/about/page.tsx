import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Briefcase, GraduationCap, Award, Globe, Users, Brain, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Button variant="ghost" asChild className="fixed top-24 left-4 z-50 bg-background/80 backdrop-blur-sm">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Início
        </Link>
      </Button>

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Photo side with animation */}
            <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/dr-gustavo.png"
                    alt="Dr. Gustavo Mendes e Silva"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="font-serif text-4xl lg:text-6xl font-light mb-4 text-balance">
                Dr. Gustavo Mendes e Silva
              </h1>
              <p className="text-lg text-muted-foreground mb-6">CRM: 218133/SP</p>
              <p className="text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-8 text-pretty">
                Médico Psiquiatra com expertise em Gestão em Saúde, Tecnologia e Dados aplicados à Medicina
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Psiquiatria Clínica
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Gestão em Saúde
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Health Tech
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Medicina Canabinoide
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        {/* Professional Summary */}
        <section className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-3xl font-light flex items-center gap-2 justify-center">
                <Heart className="h-6 w-6" />
                Sobre Mim
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
              <p>
                Sou médico psiquiatra com uma trajetória que une a prática clínica à gestão estratégica em saúde. Minha
                atuação é pautada pela medicina baseada em evidências, com foco em oferecer cuidado integral e
                humanizado aos meus pacientes.
              </p>
              <p>
                Tenho experiência diversificada em múltiplos contextos de saúde mental, incluindo CAPS (adulto,
                infantojuvenil e álcool/drogas), hospital psiquiátrico e atendimento de emergências psiquiátricas. Minha
                formação inclui especializações em psicofarmacologia avançada, medicina canabinoide e transtornos do
                sono, permitindo uma abordagem integrativa e atualizada no tratamento.
              </p>
              <p>
                Paralelamente à prática clínica, desenvolvi expertise em gestão de programas de saúde, análise de
                indicadores assistenciais e implementação de protocolos baseados em evidências. Minha formação em Health
                Tech e análise de dados me permite combinar conhecimento clínico com tecnologias emergentes para
                aprimorar processos decisórios e promover melhores resultados em saúde.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Areas of Expertise */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-8 text-center flex items-center gap-2 justify-center">
            <Brain className="h-8 w-8" />
            Áreas de Atuação
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Psiquiatria Clínica</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2 leading-relaxed">
                  <li>• Psiquiatria do adulto e infantojuvenil</li>
                  <li>• Tratamento de dependência química</li>
                  <li>• Emergências psiquiátricas e manejo de crises</li>
                  <li>• Transtornos do sono</li>
                  <li>• Medicina canabinoide aplicada à psiquiatria</li>
                  <li>• Terapia Cognitivo-Comportamental (TCC)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Gestão e Tecnologia em Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2 leading-relaxed">
                  <li>• Análise de indicadores assistenciais</li>
                  <li>• Controle de sinistralidade e custo-efetividade</li>
                  <li>• Implementação de protocolos clínicos</li>
                  <li>• Inteligência artificial aplicada à saúde</li>
                  <li>• Análise preditiva e preventiva em saúde</li>
                  <li>• Auditoria e avaliação de qualidade</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Highlights */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-8 text-center flex items-center gap-2 justify-center">
            <Briefcase className="h-8 w-8" />
            Experiência Profissional
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Atuação em Saúde Mental</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Atuo em diversos contextos de atenção à saúde mental, com experiência em CAPS (Centro de Atenção
                  Psicossocial) para diferentes públicos: adultos, crianças e adolescentes, e pessoas com dependência
                  química. Essa vivência me permite compreender as necessidades específicas de cada população e oferecer
                  tratamento personalizado.
                </p>
                <p>
                  Tenho experiência em atendimento de emergências psiquiátricas, manejo de crises e internação
                  hospitalar, sempre priorizando a estabilização do quadro agudo e a articulação com a rede de cuidados
                  para continuidade do tratamento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Gestão e Interlocução de Rede</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Atuei como Médico Interlocutor de Rede, desenvolvendo e monitorando indicadores assistenciais para
                  análise de resultados e impacto na sinistralidade. Essa experiência me proporcionou visão estratégica
                  sobre otimização de processos, implementação de protocolos baseados em evidências e coordenação de
                  programas de educação continuada.
                </p>
                <p>
                  Trabalho com análise técnica de dados em saúde, identificando oportunidades de melhoria e
                  desenvolvendo estratégias preventivas que promovam melhores resultados assistenciais e maior
                  eficiência na utilização de recursos.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Education */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-8 text-center flex items-center gap-2 justify-center">
            <GraduationCap className="h-8 w-8" />
            Formação Acadêmica
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Graduação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Medicina</strong> - Faculdade Estadual de Medicina de Marília (FAMEMA)
                </p>
                <p className="text-sm text-muted-foreground mt-1">Nota 5 no ENADE</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pós-Graduação e MBAs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>
                  <p>
                    <strong>MBA em Health Tech</strong> - FIAP (cursando)
                  </p>
                  <p className="text-sm">Tecnologias emergentes aplicadas à saúde e inteligência artificial</p>
                </div>
                <div>
                  <p>
                    <strong>MBA em Gestão, Inovação e Serviços em Saúde</strong> - PUC-RS
                  </p>
                  <p className="text-sm">Gestão estratégica e inovação em serviços de saúde</p>
                </div>
                <div>
                  <p>
                    <strong>Especialização em Tecnologia e Dados em Saúde</strong> - PUC-PR
                  </p>
                  <p className="text-sm">Data science e aplicação de tecnologias para decisões clínicas</p>
                </div>
                <div>
                  <p>
                    <strong>Programa Avançado em Cuidados Paliativos</strong>
                  </p>
                  <p className="text-sm">MJHS Institute for Innovation in Palliative Care</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Especializações em Psiquiatria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>
                  <p>
                    <strong>Especialização em Psiquiatria</strong> - FGMED (492 horas)
                  </p>
                  <p className="text-sm">Psicofarmacologia avançada e tratamento de transtornos mentais</p>
                </div>
                <div>
                  <p>
                    <strong>Especialização em Psiquiatria</strong> - Sanar/Cetrus (432 horas)
                  </p>
                  <p className="text-sm">Semiologia psiquiátrica e raciocínio clínico em saúde mental</p>
                </div>
                <div>
                  <p>
                    <strong>Clinical Cannabinoid Medicine Specialist</strong> - Society of Cannabis Clinicians (SCC)
                  </p>
                  <p className="text-sm">Certificação internacional em cannabis medicinal</p>
                </div>
                <div>
                  <p>
                    <strong>Medicina Canabinoide</strong> - EEPHCFMUSP
                  </p>
                  <p className="text-sm">Sistema endocanabinoide e aplicações clínicas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Complementary Training */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-8 text-center flex items-center gap-2 justify-center">
            <Award className="h-8 w-8" />
            Formação Complementar
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">AI in Healthcare - Stanford University</p>
                    <p>Inteligência artificial no diagnóstico e apoio à decisão clínica</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Medical Neuroscience - Duke University</p>
                    <p>Neuroanatomia funcional e correlatos neurobiológicos</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dependência Química - Artmed360 (180h)</p>
                    <p>Mecanismos neurobiológicos e estratégias de tratamento</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Transtornos do Sono - CENBRAP</p>
                    <p>Diagnóstico e tratamento de distúrbios do sono</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">Terapia de Aceitação e Compromisso (ACT) - IBAC</p>
                    <p>Técnicas de terapia cognitivo-comportamental de terceira geração</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Autismo, Psicanálise e Conexões - PUC Minas</p>
                    <p>Abordagens contemporâneas no tratamento do TEA</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Aplicações Psiquiátricas dos Canabinoides - TMCI Global
                    </p>
                    <p>Uso terapêutico em transtornos psiquiátricos</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Transtorno do Espectro Autista - Instituto Neuroconexão
                    </p>
                    <p>Aperfeiçoamento em TEA</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-8 text-center">Competências</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gestão em Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Indicadores assistenciais</li>
                  <li>• Controle de sinistralidade</li>
                  <li>• Auditoria em saúde</li>
                  <li>• Protocolos clínicos</li>
                  <li>• Medicina baseada em evidências</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tecnologia em Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Análise preditiva</li>
                  <li>• Inteligência artificial</li>
                  <li>• Data science</li>
                  <li>• Apoio à decisão clínica</li>
                  <li>• Projetos estratégicos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prática Clínica</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Psicofarmacologia</li>
                  <li>• Manejo de crises</li>
                  <li>• Cannabis medicinal</li>
                  <li>• Medicina do sono</li>
                  <li>• Equipe multidisciplinar</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Languages & International */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Idiomas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <strong>Inglês:</strong> Fluente (TOEFL iBT 108/120)
                  </li>
                  <li>
                    <strong>Espanhol:</strong> Intermediário
                  </li>
                  <li>
                    <strong>Francês:</strong> Básico
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Afiliações e Experiência Internacional
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>• Representante Brasileiro na 56ª Assembleia Geral da OMS/OPAS</p>
                <p>• Membro da International AIDS Society (2020-2023)</p>
                <p>• Membro da Society of Cannabis Clinicians (SCC)</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
