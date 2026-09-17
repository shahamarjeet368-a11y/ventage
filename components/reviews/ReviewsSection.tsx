import { Star, Quote, CheckCircle2 } from "lucide-react";
import { SALON_INFO, ReviewItem } from "@/lib/mock-data";

interface Props {
  initialReviews: ReviewItem[];
}

export default function ReviewsSection({ initialReviews }: Props) {
  return (
    <section id="reviews" className="py-24 bg-white border-t border-vintage-espresso/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Rating Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            <span className="text-xs font-sans font-medium tracking-[0.25em] text-vintage-rose uppercase">
              Google Verified Reputation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-vintage-espresso">
              Loved by 362+ Clients in Delhi
            </h2>
            <p className="font-sans text-base text-vintage-muted font-light max-w-lg">
              Every review reflects real experiences at our Sant Nagar salon. We take pride in delivering consistent perfection with every consultation.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-lg-end">
            <div className="w-full bg-vintage-ivory border border-vintage-champagne/30 p-8 flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="font-serif text-6xl font-normal text-vintage-espresso leading-none">
                  {SALON_INFO.rating}
                </span>
                <div className="flex text-amber-500 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-sans text-vintage-muted font-medium uppercase tracking-wider">
                  Official Google Rating
                </span>
              </div>

              <div className="h-16 w-px bg-vintage-espresso/15 mx-6" />

              <div className="flex flex-col text-right">
                <span className="font-serif text-3xl font-semibold text-vintage-espresso">
                  {SALON_INFO.reviewsCount}
                </span>
                <span className="text-xs font-sans text-vintage-muted font-medium uppercase tracking-wider">
                  Verified Reviews
                </span>
                <span className="text-[10px] text-emerald-700 font-sans font-semibold flex items-center justify-end gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Genuine
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialReviews.map((item) => (
            <div
              key={item.id}
              className="bg-vintage-ivory/50 border border-vintage-espresso/10 p-8 flex flex-col justify-between hover:bg-vintage-ivory transition-all duration-300 relative shadow-sm"
            >
              <Quote className="w-8 h-8 text-vintage-champagne/40 mb-4" />

              <div className="space-y-4 mb-6">
                <div className="flex text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                  ))}
                </div>
                <p className="font-sans text-sm text-vintage-espresso font-light leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-vintage-espresso/10 flex items-center justify-between">
                <span className="font-serif text-base font-medium text-vintage-espresso">
                  {item.customer_name}
                </span>
                <span className="text-[10px] font-sans font-semibold text-vintage-muted uppercase tracking-widest bg-white border border-vintage-espresso/10 px-2 py-0.5">
                  {item.source}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
