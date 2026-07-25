import { ConditionLandingView } from "@/components/condition-landing"
import { getConditionLanding } from "@/lib/condition-landings"
import { StructuredData } from "@/components/blocks/StructuredData"
import { buildConditionJsonLd, metadataForCondition } from "@/lib/structured-data"

const landing = getConditionLanding("panico")!

export const metadata = metadataForCondition(landing)

export default function PanicoPage() {
  return (
    <>
      <StructuredData items={buildConditionJsonLd(landing)} />
      <ConditionLandingView landing={landing} />
    </>
  )
}
