import GallerySection from "@/components/gallery/GallerySection";
import { INITIAL_GALLERY } from "@/lib/mock-data";

export const metadata = {
  title: "Editorial Gallery & Portfolio | Vintage Beauty Salon Delhi",
  description: "View real hair balayage, HD airbrush makeup, nail extension art, and interior photography from Vintage Beauty Salon in Sant Nagar, Rani Bagh, Delhi.",
};

export default function GalleryPage() {
  return (
    <div className="pt-28 bg-vintage-ivory">
      <div className="bg-vintage-espresso text-vintage-ivory py-20 px-6 md:px-12 text-center border-b border-vintage-champagne/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            Curated Visual Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-vintage-ivory">
            Editorial Gallery
          </h1>
          <p className="font-sans text-base text-vintage-ivory/80 max-w-xl mx-auto font-light">
            Real client transformations, hair artistry, and luxury salon aesthetics from our Pitampura studio.
          </p>
        </div>
      </div>

      <GallerySection initialGallery={INITIAL_GALLERY} />
    </div>
  );
}
