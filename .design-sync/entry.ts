// Design-sync entry: the public surface of drgustavomendes.com's UI layer.
// Primitives (shadcn-derived) + CMS block components. Page-level sections
// (hero, header, footer, …) are intentionally out of scope.
export { Button, buttonVariants } from "@/components/ui/button"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
export { Input } from "@/components/ui/input"
export { Textarea } from "@/components/ui/textarea"
export { CtaButton, WhatsAppIcon, StarIcon } from "@/components/blocks/cta-button"
export { FeatureCards } from "@/components/blocks/FeatureCards"
export { PricingCta } from "@/components/blocks/PricingCta"
export { RichTextBlock } from "@/components/blocks/RichTextBlock"
export { Reveal } from "@/components/reveal"
export { Icon } from "@/components/blocks/icon-map"
