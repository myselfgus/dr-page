import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WhatIsMentalHealth } from "@/components/what-is-art"
import { AboutSection } from "@/components/about-section"
import { ConditionsTreated } from "@/components/art-types"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhatIsMentalHealth />
      <AboutSection />
      <ConditionsTreated />
      <ContactSection />
      <Footer />
    </main>
  )
}
