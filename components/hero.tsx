import { AnimatedBackground } from "./animated-background"

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <div className="hidden lg:block absolute inset-0 opacity-30">
        <AnimatedBackground />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-medium leading-tight mb-8 lg:mb-6 text-balance">
            <span className="block animate-fade-up">E se for</span>
            <span className="block animate-fade-up animation-delay-150">possível viver</span>
            <span className="block animate-fade-up animation-delay-300">de outro modo?</span>
          </h1>
          {/* </CHANGE> */}
          <div className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl space-y-4 sm:space-y-6">
            <span className="block animate-fade-up animation-delay-450">
              <span className="text-foreground font-medium">Psiquiatria verdadeiramente humanizada</span>{" "}
              <span className="text-muted-foreground">que vai além do diagnóstico.</span>
            </span>
            <span className="block animate-fade-up animation-delay-600">
              <span className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Afinal, você não precisa de mais diagnósticos prontos,{" "}
              </span>
              <span className="text-foreground font-medium text-sm sm:text-base md:text-lg">
                você precisa se entender de verdade.
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
