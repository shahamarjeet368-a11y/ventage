"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/lib/mock-data";

interface Props {
  initialGallery: GalleryItem[];
}

export default function GallerySection({ initialGallery }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Hair", "Makeup", "Nails", "Salon"];

  const filteredGallery = activeCategory === "All"
    ? initialGallery
    : initialGallery.filter(g => g.category.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-vintage-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col items-start space-y-3">
            <span className="text-xs font-sans font-medium tracking-[0.25em] text-vintage-rose uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-vintage-champagne" />
              Visual Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-vintage-espresso">
              The Gallery
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-vintage-espresso text-vintage-ivory border-vintage-espresso shadow-sm"
                    : "bg-white/60 text-vintage-espresso border-vintage-espresso/15 hover:border-vintage-rose hover:text-vintage-rose"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGallery.map((item, idx) => {
              // Create asymmetric height classes for editorial masonry feel
              const isTall = idx % 3 === 1;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openLightbox(idx)}
                  data-cursor="view"
                  className={`group relative overflow-hidden bg-vintage-softIvory border border-vintage-espresso/10 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ${
                    isTall ? "h-[460px]" : "h-[360px]"
                  }`}
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vintage-espresso/80 via-vintage-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-vintage-champagne uppercase block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl text-white font-medium">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Fullscreen Gallery Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-vintage-espresso/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-vintage-ivory hover:text-vintage-rose transition-colors z-50 bg-white/10 rounded-full"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 p-3 text-vintage-ivory hover:text-vintage-rose transition-colors z-50 bg-white/10 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 p-3 text-vintage-ivory hover:text-vintage-rose transition-colors z-50 bg-white/10 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full h-[75vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full border border-vintage-champagne/30 shadow-2xl">
              <Image
                src={filteredGallery[lightboxIndex].image_url}
                alt={filteredGallery[lightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-serif text-2xl text-vintage-ivory font-light">
                {filteredGallery[lightboxIndex].title}
              </h4>
              <span className="text-xs font-sans text-vintage-champagne tracking-widest uppercase">
                {filteredGallery[lightboxIndex].category} • Vintage Portfolio
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
