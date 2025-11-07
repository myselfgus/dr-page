import { ArtSpaces } from "@/components/art-spaces"
import { ArtworkGrid } from "@/components/artwork-grid"

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6">Gallery</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our curated collection of masterpieces and discover the spaces where art comes alive. From iconic
            works to the galleries that house them, immerse yourself in the world of fine art.
          </p>
        </div>
        <ArtworkGrid />
        <div className="mt-20 lg:mt-32">
          <ArtSpaces />
        </div>
      </div>
    </main>
  )
}
