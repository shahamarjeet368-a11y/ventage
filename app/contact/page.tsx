import { SALON_INFO } from "@/lib/mock-data";
import { MapPin, Phone, Clock, MessageSquare, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us & Location | Vintage Beauty Salon Pitampura Delhi",
  description: "Contact Vintage Beauty Salon in Sant Nagar, Rani Bagh, Pitampura, Delhi – 110034. Call 098990 00879 or get Google Maps directions for your appointment.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 bg-vintage-ivory">
      {/* Header Banner */}
      <div className="bg-vintage-espresso text-vintage-ivory py-20 px-6 md:px-12 text-center border-b border-vintage-champagne/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-vintage-ivory">
            Visit Our Studio
          </h1>
          <p className="font-sans text-base text-vintage-ivory/80 max-w-xl mx-auto font-light">
            Conveniently located in Sant Nagar, Rani Bagh, Pitampura, Delhi – 110034.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Information & Action Cards */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-sans font-medium tracking-[0.2em] text-vintage-rose uppercase">
                Location & Opening Hours
              </span>
              <h2 className="font-serif text-3xl font-normal text-vintage-espresso">
                Vintage Beauty Salon
              </h2>
            </div>

            <div className="space-y-6 text-sm font-sans text-vintage-muted font-light">
              <div className="p-6 bg-white border border-vintage-espresso/10 space-y-3 shadow-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-vintage-rose shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-vintage-espresso block font-medium">Address</strong>
                    <span>{SALON_INFO.location}</span>
                  </div>
                </div>

                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-vintage-rose uppercase tracking-wider hover:underline pt-2"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-6 bg-white border border-vintage-espresso/10 space-y-3 shadow-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-vintage-champagne shrink-0" />
                  <div>
                    <strong className="text-vintage-espresso block font-medium">Phone / Call</strong>
                    <a href={`tel:${SALON_INFO.phoneNumeric}`} className="hover:text-vintage-rose text-base font-serif font-semibold text-vintage-espresso">
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-vintage-espresso/10 space-y-3 shadow-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-vintage-champagne shrink-0" />
                  <div>
                    <strong className="text-vintage-espresso block font-medium">Working Hours</strong>
                    <span>{SALON_INFO.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`tel:${SALON_INFO.phoneNumeric}`}
                className="p-4 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-wider uppercase text-center border border-vintage-espresso hover:bg-vintage-rose hover:border-vintage-rose transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-vintage-champagne" />
                Call Salon
              </a>

              <a
                href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hello%20Vintage%20Salon,%20I%20want%20to%20book%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-emerald-700 text-white text-xs font-sans font-semibold tracking-wider uppercase text-center hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Interactive Google Map Preview Container */}
          <div className="lg:col-span-7 bg-vintage-softIvory border border-vintage-espresso/15 shadow-xl relative min-h-[460px] flex flex-col justify-between p-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-vintage-espresso text-vintage-champagne text-[11px] font-sans uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Google Business Location
              </div>
              <h3 className="font-serif text-3xl font-normal text-vintage-espresso">
                Find Us in Sant Nagar, Rani Bagh
              </h3>
              <p className="font-sans text-sm text-vintage-muted font-light leading-relaxed">
                Located right near Rani Bagh market in Pitampura, Delhi – 110034. Easily accessible with dedicated parking space and peaceful salon interior.
              </p>
            </div>

            {/* Map Placeholder Graphic / Frame */}
            <div className="w-full h-64 bg-vintage-espresso/5 border border-vintage-espresso/20 flex flex-col items-center justify-center p-6 text-center my-6 space-y-3">
              <MapPin className="w-10 h-10 text-vintage-rose animate-bounce" />
              <span className="font-serif text-lg font-medium text-vintage-espresso">
                Sant Nagar, Rani Bagh, Pitampura, Delhi – 110034
              </span>
              <span className="text-xs font-sans text-vintage-muted">
                Google Rating: 4.9 ★ (362+ Reviews)
              </span>
            </div>

            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase text-center hover:bg-vintage-rose hover:text-vintage-espresso transition-colors flex items-center justify-center gap-2"
            >
              <span>Get Directions on Google Maps</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
