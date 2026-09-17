"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-vintage-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Overlapping Editorial Photography */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Primary Large Image */}
            <div className="relative w-full max-w-[440px] h-[520px] shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1000"
                alt="Vintage Salon Luxurious Interior Sanctum"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vintage-espresso/40 to-transparent" />
            </div>

            {/* Overlapping Secondary Accent Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 sm:right-4 w-[220px] h-[260px] shadow-2xl border-4 border-vintage-ivory hidden sm:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"
                alt="Bespoke Hair Styling Craftsmanship"
                fill
                className="object-cover"
                sizes="220px"
              />
            </motion.div>

            {/* Badge overlay */}
            <div className="absolute top-8 left-0 sm:-left-6 bg-vintage-espresso text-vintage-ivory px-6 py-4 border border-vintage-champagne/30 shadow-xl">
              <span className="font-serif text-3xl font-semibold text-vintage-champagne block">
                4.9 ★
              </span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-vintage-ivory/80">
                Delhi&apos;s Highest Rated
              </span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-[0.25em] text-vintage-rose uppercase">
              <Sparkles className="w-3.5 h-3.5 text-vintage-champagne" />
              The Vintage Philosophy
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.15] text-vintage-espresso">
              More Than a Salon. <br />
              <span className="italic font-light text-vintage-rose">A Moment for Yourself.</span>
            </h2>

            <div className="space-y-4 font-sans text-vintage-muted font-light text-base sm:text-lg leading-relaxed">
              <p>
                At Vintage, we believe beauty isn&apos;t just about treatments — it&apos;s a tranquil sanctuary away from the hustle of Pitampura and Rani Bagh. Every detail of our space, from our warm ivory aesthetics to our tailored consultations, is designed around your comfort.
              </p>
              <p>
                Whether you visit us for a transformation haircut, couture balayage, HD bridal makeup, or structured nail artistry, our master stylists prioritize individual face structure, skin health, and your personal beauty vision.
              </p>
            </div>

            {/* Feature Bullet Badges */}
            <div className="grid grid-cols-2 gap-4 w-full pt-2 border-t border-vintage-espresso/10">
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-vintage-espresso">01. Personalized Consultation</span>
                <span className="text-xs font-sans text-vintage-muted">Tailored to your hair & skin type</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-vintage-espresso">02. Premium Formulations</span>
                <span className="text-xs font-sans text-vintage-muted">Olaplex, L&apos;Oréal Professional & MAC</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-vintage-espresso uppercase hover:text-vintage-rose transition-colors group pt-2"
            >
              <span>Discover Our Story & Culture</span>
              <ArrowUpRight className="w-4 h-4 text-vintage-rose group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
