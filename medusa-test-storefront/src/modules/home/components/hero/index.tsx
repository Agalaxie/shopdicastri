import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-dicastri-grey-light relative overflow-hidden">
      {/* Image de fond */}
      <Image
        src="/bg-shop.jpg"
        alt="DiCastri - Costumes sur mesure"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      {/* Contenu */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-5xl leading-tight text-white font-light tracking-wide"
          >
            L'élégance sur mesure
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-10 text-white font-light mt-4"
          >
            Costumes d'exception, fabriqués à Paris
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <Button
            variant="secondary"
            className="bg-dicastri-primary text-dicastri-white hover:bg-dicastri-grey-dark transition-colors px-8 py-3"
          >
            Découvrir nos costumes
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
