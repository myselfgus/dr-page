import { permanentRedirect } from "next/navigation"

/** Preserva links antigos e conduz para o tema de maior interesse atual. */
export default function DomiciliarPage() {
  permanentRedirect("/tdah-adultos")
}
