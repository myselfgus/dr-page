import { ConditionLandingView } from "@/components/condition-landing"
import { getConditionLanding } from "@/lib/condition-landings"
import { StructuredData } from "@/components/blocks/StructuredData"
import { buildConditionJsonLd, metadataForCondition } from "@/lib/structured-data"

const landing = getConditionLanding("ansiedade")!

export const metadata = metadataForCondition(landing)

export default function AnsiedadePage() {
  return (
    <>
      <StructuredData items={buildConditionJsonLd(landing)} />
      <ConditionLandingView landing={landing} />
    </>
  )
}
