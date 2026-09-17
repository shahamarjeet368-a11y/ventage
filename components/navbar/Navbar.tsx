"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, Phone } from "lucide-react";
import { SALON_INFO } from "@/lib/mock-data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-vintage-ivory/95 backdrop-blur-md py-4 border-b border-vintage-espresso/10 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-vintage-espresso transition-colors group-hover:text-vintage-rose">
              VINTAGE
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-vintage-muted font-sans font-medium">
              Beauty Studio • Delhi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-sans font-medium tracking-widest uppercase transition-colors hover:text-vintage-rose ${
                    isActive ? "text-vintage-rose" : "text-vintage-espresso"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-vintage-rose rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/booking"
              data-cursor="book"
              className="px-6 py-2.5 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-medium tracking-widest uppercase border border-vintage-espresso rounded-none hover:bg-vintage-rose hover:border-vintage-rose transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-vintage-champagne" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-vintage-espresso focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-vintage-espresso text-vintage-ivory flex flex-col justify-between p-8 md:hidden animate-fade-in">
          <div className="flex items-center justify-between border-b border-vintage-ivory/15 pb-6">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col">
              <span className="font-serif text-2xl tracking-widest text-vintage-ivory">VINTAGE</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-vintage-champagne font-sans">
                Pitampura, Delhi
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-vintage-ivory hover:text-vintage-rose"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-light tracking-wide text-vintage-ivory hover:text-vintage-rose transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="space-y-4 pt-6 border-t border-vintage-ivory/15 text-center">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-vintage-rose text-vintage-espresso text-xs font-sans font-semibold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment Now
            </Link>

            <a
              href={`tel:${SALON_INFO.phoneNumeric}`}
              className="flex items-center justify-center gap-2 text-sm font-sans tracking-wider text-vintage-ivory/80 hover:text-vintage-champagne"
            >
              <Phone className="w-4 h-4 text-vintage-champagne" />
              {SALON_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
