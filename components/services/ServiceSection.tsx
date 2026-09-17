"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Scissors, Sparkles, Heart, Clock } from "lucide-react";
import { ServiceItem } from "@/lib/mock-data";

interface Props {
  initialServices: ServiceItem[];
}

export default function ServiceSection({ initialServices }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Hair", "Makeup", "Nails", "Treatments"];

  const filteredServices = activeCategory === "All"
    ? initialServices
    : initialServices.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="services" className="py-24 bg-white border-t border-vintage-espresso/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col items-start space-y-3">
            <span className="text-xs font-sans font-medium tracking-[0.25em] text-vintage-rose uppercase flex items-center gap-2">
              <Scissors className="w-3.5 h-3.5 text-vintage-champagne" />
              Service Menu & Treatments
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-vintage-espresso">
              Our Services
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-vintage-espresso text-vintage-ivory border-vintage-espresso shadow-sm"
                    : "bg-vintage-ivory/50 text-vintage-espresso border-vintage-espresso/15 hover:border-vintage-rose hover:text-vintage-rose"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-vintage-ivory/40 border border-vintage-espresso/10 p-6 flex flex-col justify-between hover:bg-vintage-ivory hover:shadow-xl hover:border-vintage-rose/50 transition-all duration-500"
              >
                <div>
                  {/* Card Number & Image Container */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-vintage-champagne">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-vintage-muted px-2.5 py-1 bg-white border border-vintage-espresso/10">
                      {service.category}
                    </span>
                  </div>

                  <div className="relative w-full h-56 mb-6 overflow-hidden bg-vintage-softIvory">
                    <Image
                      src={service.image_url}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-vintage-espresso/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="font-serif text-xl font-medium text-vintage-espresso mb-3 group-hover:text-vintage-rose transition-colors">
                    {service.name}
                  </h3>

                  <p className="font-sans text-sm text-vintage-muted font-light leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-vintage-espresso/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-lg font-semibold text-vintage-espresso block">
                      {service.price}
                    </span>
                    <span className="text-[10px] font-sans text-vintage-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-vintage-champagne" /> {service.duration}
                    </span>
                  </div>

                  <Link
                    href={`/booking?serviceId=${service.id}`}
                    data-cursor="book"
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-vintage-espresso uppercase group-hover:text-vintage-rose transition-colors"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
