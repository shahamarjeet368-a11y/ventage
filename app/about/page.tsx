import AboutSection from "@/components/about/AboutSection";
import WhyVintage from "@/components/why/WhyVintage";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, CalendarDays } from "lucide-react";

export const metadata = {
  title: "About Vintage | Luxury Salon in Sant Nagar, Rani Bagh, Delhi",
  description: "Learn about Vintage Beauty Salon in Pitampura, Delhi. Our story, master stylists, hygienic care, and commitment to personal beauty refinement.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 bg-vintage-ivory">
      {/* Subpage Banner Header */}
      <div className="bg-vintage-espresso text-vintage-ivory py-20 px-6 md:px-12 text-center border-b border-vintage-champagne/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            Boutique Beauty Sanctum
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-vintage-ivory">
            About Vintage
          </h1>
          <p className="font-sans text-base text-vintage-ivory/80 max-w-xl mx-auto font-light">
            Founded with a vision to redefine beauty care in Rani Bagh and Pitampura through personalized artistry and peaceful luxury.
          </p>
        </div>
      </div>

      <AboutSection />

      {/* Philosophy Section */}
      <section className="py-20 bg-white border-y border-vintage-espresso/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="space-y-4">
            <span className="font-serif text-3xl font-light text-vintage-champagne">01</span>
            <h3 className="font-serif text-xl font-medium text-vintage-espresso">Human-Centric Artistry</h3>
            <p className="font-sans text-sm text-vintage-muted font-light leading-relaxed">
              We never use one-size-fits-all templates. Every haircut, hair color formula, and makeup application is individually crafted for your facial features.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-3xl font-light text-vintage-rose">02</span>
            <h3 className="font-serif text-xl font-medium text-vintage-espresso">Uncompromised Hygiene</h3>
            <p className="font-sans text-sm text-vintage-muted font-light leading-relaxed">
              From medical-grade tool sterilization to single-use organic towels, your health and peace of mind remain our highest priority.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-3xl font-light text-vintage-champagne">03</span>
            <h3 className="font-serif text-xl font-medium text-vintage-espresso">Calm Serene Atmosphere</h3>
            <p className="font-sans text-sm text-vintage-muted font-light leading-relaxed">
              Step away from chaotic salon noise into our warm ivory, ambient-lit studio designed for deep relaxation and pampering.
            </p>
          </div>
        </div>
      </section>

      <WhyVintage />

      {/* CTA Footer Banner */}
      <div className="py-20 bg-vintage-ivory text-center px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-normal text-vintage-espresso">
            Experience the Vintage Difference
          </h2>
          <p className="font-sans text-sm text-vintage-muted font-light">
            Book your consultation today with our master stylists in Sant Nagar, Delhi.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase hover:bg-vintage-rose hover:text-vintage-espresso transition-colors shadow-lg"
          >
            <CalendarDays className="w-4 h-4 text-vintage-champagne" />
            Book Appointment Now
          </Link>
        </div>
      </div>
    </div>
  );
}
