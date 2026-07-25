import { ConditionLandingView } from "@/components/condition-landing"
import { getConditionLanding } from "@/lib/condition-landings"
import { StructuredData } from "@/components/blocks/StructuredData"
import { buildConditionJsonLd, metadataForCondition } from "@/lib/structured-data"

const landing = getConditionLanding("medicina-canabinoide")!

export const metadata = metadataForCondition(landing)

export default function MedicinaCanabinoidePage() {
  return (
    <>
      <StructuredData items={buildConditionJsonLd(landing)} />
      <ConditionLandingView landing={landing} />
    </>
  )
}
