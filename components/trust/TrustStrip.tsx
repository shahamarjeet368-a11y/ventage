import { Star, ShieldCheck, MapPin, Award } from "lucide-react";
import { SALON_INFO } from "@/lib/mock-data";

export default function TrustStrip() {
  const trustItems = [
    {
      icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
      title: `${SALON_INFO.rating} ★ Google Rating`,
      subtitle: `${SALON_INFO.reviewsCount} Verified Reviews`,
    },
    {
      icon: <Award className="w-4 h-4 text-vintage-champagne" />,
      title: "Master Artists & Stylists",
      subtitle: "Bespoke Hair, Makeup & Skin",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-vintage-rose" />,
      title: "Hygienic & Premium Care",
      subtitle: "Autoclaved Tools & Organic Products",
    },
    {
      icon: <MapPin className="w-4 h-4 text-vintage-espresso" />,
      title: "Sant Nagar, Pitampura",
      subtitle: "Heart of Rani Bagh, Delhi",
    },
  ];

  return (
    <section className="w-full bg-vintage-espresso text-vintage-ivory py-8 border-y border-vintage-champagne/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-vintage-ivory/10">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-3.5 ${
                idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""
              }`}
            >
              <div className="p-2.5 bg-vintage-ivory/5 rounded-full border border-vintage-champagne/30">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-sm font-semibold tracking-wide text-vintage-ivory">
                  {item.title}
                </span>
                <span className="text-[11px] font-sans text-vintage-ivory/70 font-light tracking-wider uppercase">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
