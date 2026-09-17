import Link from "next/link";
import { MapPin, Phone, Instagram, Facebook, Clock, ArrowUpRight } from "lucide-react";
import { SALON_INFO } from "@/lib/mock-data";

export default function Footer() {
  return (
    <footer className="bg-vintage-espresso text-vintage-ivory border-t border-vintage-champagne/20 pt-20 pb-28 md:pb-12 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-vintage-ivory/15">
        
        {/* Brand Column */}
        <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-3xl font-semibold tracking-wider text-vintage-ivory group-hover:text-vintage-rose transition-colors">
              VINTAGE
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-vintage-champagne font-medium mt-1">
              Boutique Beauty Studio • Delhi
            </span>
          </Link>

          <p className="font-sans text-sm text-vintage-ivory/70 font-light max-w-sm leading-relaxed">
            {SALON_INFO.tagline} Delhi&apos;s luxury destination for couture hair, HD airbrush makeup, sculptured gel nails, and restorative skin therapy.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 bg-vintage-ivory/10 border border-vintage-ivory/15 rounded-full hover:bg-vintage-rose hover:text-vintage-espresso hover:border-vintage-rose transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 bg-vintage-ivory/10 border border-vintage-ivory/15 rounded-full hover:bg-vintage-rose hover:text-vintage-espresso hover:border-vintage-rose transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation Column */}
        <div className="lg:col-span-3 flex flex-col space-y-4 text-left">
          <h4 className="font-serif text-lg font-medium text-vintage-champagne tracking-wide">
            Navigation
          </h4>
          <nav className="flex flex-col space-y-2 text-xs uppercase tracking-widest font-medium text-vintage-ivory/80">
            <Link href="/" className="hover:text-vintage-rose transition-colors">Home</Link>
            <Link href="/about" className="hover:text-vintage-rose transition-colors">About Vintage</Link>
            <Link href="/services" className="hover:text-vintage-rose transition-colors">Service Catalog</Link>
            <Link href="/gallery" className="hover:text-vintage-rose transition-colors">Editorial Gallery</Link>
            <Link href="/reviews" className="hover:text-vintage-rose transition-colors">Client Reviews</Link>
            <Link href="/booking" className="hover:text-vintage-rose transition-colors">Book Appointment</Link>
            <Link href="/admin" className="hover:text-vintage-rose transition-colors text-vintage-champagne mt-2">Owner Portal (/admin)</Link>
          </nav>
        </div>

        {/* Contact & Location Column */}
        <div className="lg:col-span-4 flex flex-col space-y-4 text-left">
          <h4 className="font-serif text-lg font-medium text-vintage-champagne tracking-wide">
            Visit Us
          </h4>

          <div className="space-y-3 text-xs font-light text-vintage-ivory/80">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-vintage-rose shrink-0 mt-0.5" />
              <span>{SALON_INFO.location}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-vintage-champagne shrink-0" />
              <a href={`tel:${SALON_INFO.phoneNumeric}`} className="hover:text-vintage-rose transition-colors">
                {SALON_INFO.phone}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-vintage-champagne shrink-0" />
              <span>{SALON_INFO.openingHours}</span>
            </div>
          </div>

          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-vintage-champagne uppercase hover:text-vintage-rose transition-colors pt-2"
          >
            <span>Get Directions on Google Maps</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Copyright Sub-footer */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans font-light text-vintage-ivory/50 gap-4">
        <span>© 2026 Vintage Beauty Salon. All Rights Reserved.</span>
        <span className="text-[10px] tracking-widest uppercase text-vintage-ivory/40">
          Sant Nagar • Rani Bagh • Pitampura, Delhi
        </span>
      </div>
    </footer>
  );
}
