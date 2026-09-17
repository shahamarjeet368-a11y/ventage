import HeroSection from "@/components/hero/HeroSection";
import TrustStrip from "@/components/trust/TrustStrip";
import AboutSection from "@/components/about/AboutSection";
import ServiceSection from "@/components/services/ServiceSection";
import FeaturedService from "@/components/services/FeaturedService";
import GallerySection from "@/components/gallery/GallerySection";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import WhyVintage from "@/components/why/WhyVintage";
import BookingWidget from "@/components/booking/BookingWidget";
import { INITIAL_SERVICES, INITIAL_GALLERY, INITIAL_REVIEWS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <AboutSection />
      <ServiceSection initialServices={INITIAL_SERVICES} />
      <FeaturedService />
      <GallerySection initialGallery={INITIAL_GALLERY} />
      <ReviewsSection initialReviews={INITIAL_REVIEWS} />
      <WhyVintage />

      {/* Embedded Booking CTA Section */}
      <section className="py-24 bg-vintage-ivory border-t border-vintage-espresso/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-rose">
              Reserve Your Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-vintage-espresso">
              Book Your Appointment
            </h2>
            <p className="font-sans text-sm text-vintage-muted font-light">
              Select your service, preferred date, and time slot. Our team will prepare your personalized beauty session.
            </p>
          </div>

          <BookingWidget />
        </div>
      </section>
    </>
  );
}
