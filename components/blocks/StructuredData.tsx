// Injeta os blocos JSON-LD da página como <script type="application/ld+json">.
export function StructuredData({ items }: { items: Record<string, unknown>[] }) {
  if (!items || items.length === 0) return null
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
