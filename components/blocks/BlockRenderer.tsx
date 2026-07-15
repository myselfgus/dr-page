import { Reveal } from "@/components/reveal"
import type { PageBlock } from "@/lib/pages"
import { type ContactConfig, DEFAULT_CONTACT } from "@/lib/site-config"

import { Hero, type HeroContent, type HeroDesign } from "@/components/hero"
import {
  SymptomsSection,
  type SymptomsContent,
  type SymptomsDesign,
} from "@/components/symptoms-section"
import {
  WhatIsMentalHealth,
  type CareStepsContent,
  type CareStepsDesign,
} from "@/components/what-is-art"
import { AboutSection, type AboutContent, type AboutDesign } from "@/components/about-section"
import {
  ConditionsTreated,
  type PrinciplesContent,
  type PrinciplesDesign,
} from "@/components/art-types"
import { FAQSection, type FaqContent, type FaqDesign } from "@/components/faq-section"
import { ContactSection, type ContactContent, type ContactDesign } from "@/components/contact-section"
import {
  RichTextBlock,
  type RichTextContent,
  type RichTextDesign,
} from "@/components/blocks/RichTextBlock"
import {
  FeatureCards,
  type FeatureCardsContent,
  type FeatureCardsDesign,
} from "@/components/blocks/FeatureCards"
import { PricingCta, type PricingCtaContent, type PricingCtaDesign } from "@/components/blocks/PricingCta"
import { PriceBadge, type PriceBadgeContent, type PriceBadgeDesign } from "@/components/blocks/PriceBadge"

function renderBlock(block: PageBlock, contact: ContactConfig) {
  const content = block.content as unknown
  const design = block.design as unknown

  switch (block.type) {
    case "hero":
      return <Hero content={content as HeroContent} design={design as HeroDesign} />
    case "symptoms":
      return (
        <SymptomsSection
          content={content as SymptomsContent}
          design={design as SymptomsDesign}
          contact={contact}
        />
      )
    case "care-steps":
      return (
        <WhatIsMentalHealth
          content={content as CareStepsContent}
          design={design as CareStepsDesign}
        />
      )
    case "about":
      return (
        <AboutSection
          content={content as AboutContent}
          design={design as AboutDesign}
          contact={contact}
        />
      )
    case "principles":
      return (
        <ConditionsTreated
          content={content as PrinciplesContent}
          design={design as PrinciplesDesign}
        />
      )
    case "faq":
      return (
        <FAQSection content={content as FaqContent} design={design as FaqDesign} contact={contact} />
      )
    case "contact":
      return (
        <ContactSection
          content={content as ContactContent}
          design={design as ContactDesign}
          contact={contact}
        />
      )
    case "richtext":
      return (
        <RichTextBlock content={content as RichTextContent} design={design as RichTextDesign} />
      )
    case "feature-cards":
      return (
        <FeatureCards
          content={content as FeatureCardsContent}
          design={design as FeatureCardsDesign}
        />
      )
    case "pricing-cta":
      return (
        <PricingCta
          content={content as PricingCtaContent}
          design={design as PricingCtaDesign}
          contact={contact}
        />
      )
    case "price-badge":
      return (
        <PriceBadge content={content as PriceBadgeContent} design={design as PriceBadgeDesign} />
      )
    default:
      return null
  }
}

export function BlockRenderer({
  block,
  contact = DEFAULT_CONTACT,
}: {
  block: PageBlock
  contact?: ContactConfig
}) {
  const rendered = renderBlock(block, contact)
  if (!rendered) return null
  return <Reveal>{rendered}</Reveal>
}

export function BlockList({
  blocks,
  contact = DEFAULT_CONTACT,
}: {
  blocks: PageBlock[]
  contact?: ContactConfig
}) {
  return (
    <>
      {blocks
        // `toggleVisibility` (admin) grava design.hidden === true → não renderiza no site.
        .filter((block) => !(block.design as { hidden?: boolean } | undefined)?.hidden)
        .map((block) => (
          <BlockRenderer key={block.id} block={block} contact={contact} />
        ))}
    </>
  )
}
