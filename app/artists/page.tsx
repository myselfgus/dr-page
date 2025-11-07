import { FeaturedArtists } from "@/components/featured-artists"

export default function ArtistsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h1 className="font-serif text-4xl lg:text-6xl font-light mb-6">Featured Artists</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover the masters who have shaped the world of art across centuries. From Renaissance pioneers to
            contemporary visionaries, explore the lives and works of history's most influential artists.
          </p>
        </div>
        <FeaturedArtists />
      </div>
    </main>
  )
}
