import ServiceSection from "@/components/services/ServiceSection";
import FeaturedService from "@/components/services/FeaturedService";
import { INITIAL_SERVICES } from "@/lib/mock-data";

export const metadata = {
  title: "Salon Services & Price Menu | Vintage Beauty Salon Pitampura Delhi",
  description: "Explore Vintage Salon services in Sant Nagar, Rani Bagh, Pitampura, Delhi. Signature haircuts, global balayage, HD bridal makeup, gel extensions & facials.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 bg-vintage-ivory">
      <div className="bg-vintage-espresso text-vintage-ivory py-20 px-6 md:px-12 text-center border-b border-vintage-champagne/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            Crafted for Perfection
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-vintage-ivory">
            Our Services & Menu
          </h1>
          <p className="font-sans text-base text-vintage-ivory/80 max-w-xl mx-auto font-light">
            Bespoke beauty services tailored for women across Pitampura, Rani Bagh, and Delhi.
          </p>
        </div>
      </div>

      <ServiceSection initialServices={INITIAL_SERVICES} />
      <FeaturedService />
    </div>
  );
}
