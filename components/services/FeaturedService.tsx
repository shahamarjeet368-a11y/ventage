import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedService() {
  return (
    <section className="relative w-full bg-vintage-espresso text-vintage-ivory py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Statement */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left z-10">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-vintage-champagne">
            Featured Transformation
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight tracking-wide text-vintage-ivory">
            HAIR <br />
            <span className="italic font-light text-vintage-rose">TRANSFORMATION</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-vintage-ivory/80 font-light max-w-lg leading-relaxed">
            Discover a signature hair style that honors your natural texture while delivering high-fashion sheen. From dimensional global balayage to restorative keratin infusion.
          </p>

          <Link
            href="/services?category=Hair"
            data-cursor="book"
            className="mt-4 px-8 py-4 bg-vintage-ivory text-vintage-espresso text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-ivory hover:bg-vintage-rose hover:border-vintage-rose hover:text-vintage-espresso transition-all duration-300 shadow-xl flex items-center gap-3 group"
          >
            <span>Explore Hair Services</span>
            <ArrowUpRight className="w-4 h-4 text-vintage-rose group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Right Large Immersive Photography */}
        <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] w-full border border-vintage-champagne/30 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200"
            alt="Hair Transformation Haircare at Vintage Salon"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vintage-espresso/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs font-sans tracking-widest text-vintage-ivory/90 uppercase border-t border-vintage-ivory/20 pt-4">
            <span>Precision Cuts • Balayage • Keratin</span>
            <span className="text-vintage-champagne">Pitampura • Delhi</span>
          </div>
        </div>

      </div>
    </section>
  );
}
