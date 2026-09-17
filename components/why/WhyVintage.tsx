import { Users, HeartHandshake, Sparkles, Star } from "lucide-react";
import { SALON_INFO } from "@/lib/mock-data";

export default function WhyVintage() {
  const features = [
    {
      icon: <Users className="w-5 h-5 text-vintage-champagne" />,
      title: "Professional Team",
      desc: "Thoughtful service with a professional, consultation-led approach.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-vintage-rose" />,
      title: "Relaxing Experience",
      desc: "A calm, serene environment designed around your personal comfort.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-vintage-champagne" />,
      title: "Beauty Expertise",
      desc: "Bespoke hair, HD makeup, sculptured nails & medical-grade skin care.",
    },
    {
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
      title: "Trusted by Clients",
      desc: `${SALON_INFO.rating}★ rating based on ${SALON_INFO.reviewsCount} authentic Google reviews.`,
    },
  ];

  return (
    <section className="py-20 bg-vintage-espresso text-vintage-ivory border-t border-vintage-champagne/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            The Vintage Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-vintage-ivory">
            Why Discerning Clients Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-vintage-ivory/5 border border-vintage-ivory/10 p-8 flex flex-col items-start space-y-4 hover:border-vintage-rose/50 transition-colors duration-300"
            >
              <div className="p-3 bg-vintage-ivory/10 border border-vintage-champagne/30">
                {feat.icon}
              </div>
              <h3 className="font-serif text-xl font-medium text-vintage-ivory">
                {feat.title}
              </h3>
              <p className="font-sans text-sm text-vintage-ivory/70 font-light leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
