import Link from "next/link";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { SALON_INFO } from "@/lib/mock-data";

export default function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-vintage-espresso text-vintage-ivory border-t border-vintage-champagne/30 py-3 px-4 md:hidden flex items-center justify-around shadow-2xl">
      {/* Call */}
      <a
        href={`tel:${SALON_INFO.phoneNumeric}`}
        className="flex flex-col items-center space-y-1 text-[10px] font-sans uppercase tracking-widest text-vintage-ivory/90 hover:text-vintage-champagne transition-colors"
      >
        <Phone className="w-4 h-4 text-vintage-champagne" />
        <span>CALL</span>
      </a>

      <div className="h-6 w-px bg-vintage-ivory/20" />

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hello%20Vintage%20Salon,%20I%20would%20like%20to%20inquire%20about%20beauty%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center space-y-1 text-[10px] font-sans uppercase tracking-widest text-vintage-ivory/90 hover:text-emerald-400 transition-colors"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>WHATSAPP</span>
      </a>

      <div className="h-6 w-px bg-vintage-ivory/20" />

      {/* Book Appointment */}
      <Link
        href="/booking"
        className="flex items-center gap-1.5 px-4 py-2 bg-vintage-rose text-vintage-espresso text-[11px] font-sans font-semibold tracking-wider uppercase rounded-none shadow-md"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>BOOK</span>
      </Link>
    </div>
  );
}
