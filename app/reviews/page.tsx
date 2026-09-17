import ReviewsSection from "@/components/reviews/ReviewsSection";
import WhyVintage from "@/components/why/WhyVintage";
import { INITIAL_REVIEWS } from "@/lib/mock-data";

export const metadata = {
  title: "Client Reviews (4.9★ Google Rating) | Vintage Beauty Salon Pitampura",
  description: "Read 362+ verified Google reviews for Vintage Beauty Salon in Rani Bagh / Pitampura, Delhi. Highly rated for hair spa, HD bridal makeup, and customer care.",
};

export default function ReviewsPage() {
  return (
    <div className="pt-28 bg-vintage-ivory">
      <div className="bg-vintage-espresso text-vintage-ivory py-20 px-6 md:px-12 text-center border-b border-vintage-champagne/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            4.9 ⭐ Google Rating
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-vintage-ivory">
            Verified Client Feedback
          </h1>
          <p className="font-sans text-base text-vintage-ivory/80 max-w-xl mx-auto font-light">
            Genuine experiences from clients across Pitampura, Rani Bagh, and Delhi.
          </p>
        </div>
      </div>

      <ReviewsSection initialReviews={INITIAL_REVIEWS} />
      <WhyVintage />
    </div>
  );
}
