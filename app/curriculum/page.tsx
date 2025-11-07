import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CurriculumPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Início
            </Link>
          </Button>

          <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6">Curriculum Vitae</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Dr. Gustavo Mendes e Silva, M.D. - Board Certified Psychiatrist
          </p>

          {/* Education */}
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6 pb-3 border-b border-border">Education</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Doctor of Medicine (M.D.)</h3>
                <p className="text-muted-foreground">University of São Paulo Medical School, São Paulo, Brazil</p>
                <p className="text-sm text-muted-foreground">2003 - 2009</p>
              </div>
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Psychiatry Residency</h3>
                <p className="text-muted-foreground">Hospital das Clínicas, University of São Paulo</p>
                <p className="text-sm text-muted-foreground">2009 - 2012</p>
              </div>
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Fellowship in Mood Disorders</h3>
                <p className="text-muted-foreground">Institute of Psychiatry, University of São Paulo</p>
                <p className="text-sm text-muted-foreground">2012 - 2013</p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6 pb-3 border-b border-border">
              Board Certifications
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Brazilian Board of Psychiatry (ABP)</h3>
                <p className="text-sm text-muted-foreground">Certified 2012 - Present</p>
              </div>
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Certificate in Cognitive Behavioral Therapy</h3>
                <p className="text-sm text-muted-foreground">Brazilian Federation of CBT, 2014</p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6 pb-3 border-b border-border">
              Professional Experience
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Private Practice</h3>
                <p className="text-muted-foreground">Dr. Gustavo Mendes e Silva Psychiatric Practice</p>
                <p className="text-sm text-muted-foreground mb-2">2013 - Present</p>
                <p className="text-muted-foreground text-sm">
                  Providing comprehensive psychiatric care including evaluation, medication management, and
                  psychotherapy for adults with various mental health conditions.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Attending Psychiatrist</h3>
                <p className="text-muted-foreground">Hospital São Camilo, São Paulo</p>
                <p className="text-sm text-muted-foreground mb-2">2012 - 2018</p>
                <p className="text-muted-foreground text-sm">
                  Provided inpatient and outpatient psychiatric services, supervised residents, and participated in
                  multidisciplinary treatment teams.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl lg:text-2xl mb-2">Clinical Instructor</h3>
                <p className="text-muted-foreground">University of São Paulo Medical School</p>
                <p className="text-sm text-muted-foreground mb-2">2013 - 2016</p>
                <p className="text-muted-foreground text-sm">
                  Taught medical students and residents in clinical psychiatry, supervised patient care, and contributed
                  to curriculum development.
                </p>
              </div>
            </div>
          </section>

          {/* Publications */}
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6 pb-3 border-b border-border">
              Selected Publications
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">
                  Silva, G.M., et al. (2020). "Efficacy of Cognitive Behavioral Therapy in Treatment-Resistant
                  Depression." <em>Brazilian Journal of Psychiatry</em>, 42(3), 245-252.
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Silva, G.M., Costa, R.T. (2018). "Pharmacological Management of Bipolar Disorder: A Comprehensive
                  Review." <em>Journal of Affective Disorders</em>, 235, 89-98.
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  Silva, G.M., et al. (2016). "Long-term Outcomes in Anxiety Disorders: A 5-Year Follow-up Study."{" "}
                  <em>Psychiatry Research</em>, 241, 156-163.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Memberships */}
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6 pb-3 border-b border-border">
              Professional Memberships
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Brazilian Psychiatric Association (ABP)</li>
              <li>• International Society for Bipolar Disorders (ISBD)</li>
              <li>• Brazilian Federation of Cognitive Behavioral Therapy</li>
              <li>• World Psychiatric Association (WPA)</li>
              <li>• São Paulo Regional Council of Medicine (CREMESP)</li>
            </ul>
          </section>

          {/* Languages */}
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6 pb-3 border-b border-border">Languages</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Portuguese (Native)</li>
              <li>• English (Fluent)</li>
              <li>• Spanish (Conversational)</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
