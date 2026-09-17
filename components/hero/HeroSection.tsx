"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Star, ArrowDown } from "lucide-react";
import { SALON_INFO } from "@/lib/mock-data";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMouseOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-vintage-ivory flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 overflow-hidden selection:bg-vintage-rose selection:text-vintage-espresso"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-vintage-champagne/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content & Line-Art Composition */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        
        {/* Left Editorial Copy Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
        >
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-vintage-espresso/15 bg-vintage-ivory text-[11px] font-sans font-medium tracking-[0.2em] text-vintage-espresso uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-vintage-rose animate-pulse" />
            Boutique Beauty Studio • Sant Nagar, Delhi
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-vintage-espresso">
            Beauty, <span className="italic font-light text-vintage-rose">Refined.</span> <br />
            Confidence, <span className="italic font-light text-vintage-champagne">Redefined.</span>
          </h1>

          {/* Paragraph */}
          <p className="font-sans text-base md:text-lg text-vintage-muted max-w-xl font-light leading-relaxed">
            Welcome to Vintage — Sant Nagar&apos;s premier salon experience where luxury editorial craftsmanship meets personalized hair, makeup, and skin care.
          </p>

          {/* CTA & Rating Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto">
            <Link
              href="/booking"
              data-cursor="book"
              className="px-8 py-4 bg-vintage-espresso text-vintage-ivory text-xs font-sans font-semibold tracking-[0.2em] uppercase border border-vintage-espresso hover:bg-vintage-rose hover:border-vintage-rose transition-all duration-300 shadow-md flex items-center justify-center gap-3 group"
            >
              <CalendarDays className="w-4 h-4 text-vintage-champagne group-hover:scale-110 transition-transform" />
              Book Appointment
            </Link>

            <div className="flex items-center gap-3 px-4 py-3 bg-white/60 border border-vintage-espresso/10 backdrop-blur-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-sm font-semibold text-vintage-espresso leading-tight">
                  {SALON_INFO.rating} ★ Google Rating
                </span>
                <span className="text-[10px] font-sans text-vintage-muted font-medium">
                  Based on {SALON_INFO.reviewsCount} Authentic Reviews
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right 2D Line-Art Animated Composition Column */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[380px] sm:h-[460px]">
          {/* Subtle Parallax Group */}
          <motion.div
            style={{
              x: mouseOffset.x * 0.8,
              y: mouseOffset.y * 0.8,
            }}
            className="relative w-full h-full max-w-[420px] flex items-center justify-center"
          >
            {/* Soft Editorial Card Frame Background */}
            <div className="absolute inset-4 border border-vintage-champagne/40 bg-vintage-softIvory/30 -rotate-2 rounded-sm" />
            <div className="absolute inset-6 border border-vintage-espresso/10 bg-white/40 rotate-1 rounded-sm shadow-sm" />

            {/* SVG 2D Line-Art Beauty Drawing */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full relative z-10 drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated Path 1: Abstract Woman Face Outline */}
              <motion.path
                d="M 220 120 C 180 160 170 240 210 320 C 230 360 270 380 300 370 C 330 360 340 330 330 290"
                stroke="#211A17"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />

              {/* Animated Path 2: Flowing Editorial Hair Contours */}
              <motion.path
                d="M 190 100 C 130 140 100 240 120 340 C 130 390 180 430 240 440 C 290 448 360 420 390 350 C 410 300 400 220 360 150 C 330 100 260 80 200 95"
                stroke="#C98F87"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2.8, ease: "easeInOut", delay: 0.3 }}
              />

              {/* Animated Path 3: Botanical / Leaf Line Accents */}
              <motion.path
                d="M 330 180 C 370 140 420 160 410 210 C 400 250 350 230 330 180 Z"
                stroke="#C9A46C"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
              />

              {/* Animated Path 4: Scissors Silhouette Outline */}
              <g opacity="0.65">
                <motion.circle
                  cx="150"
                  cy="170"
                  r="16"
                  stroke="#211A17"
                  strokeWidth="1.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <motion.circle
                  cx="180"
                  cy="150"
                  r="16"
                  stroke="#211A17"
                  strokeWidth="1.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
                <motion.line
                  x1="162"
                  y1="162"
                  x2="240"
                  y2="240"
                  stroke="#211A17"
                  strokeWidth="1.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.line
                  x1="188"
                  y1="144"
                  x2="250"
                  y2="210"
                  stroke="#211A17"
                  strokeWidth="1.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
              </g>

              {/* Sparkle Details */}
              <motion.path
                d="M 360 110 L 365 125 L 380 130 L 365 135 L 360 150 L 355 135 L 340 130 L 355 125 Z"
                fill="#C9A46C"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </svg>
          </motion.div>
        </div>

      </div>

      {/* Bottom Scroll Indicator & Location Badge */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-vintage-espresso/10 text-xs font-sans text-vintage-muted font-medium">
        <span className="tracking-widest uppercase text-[10px] text-vintage-espresso font-semibold">
          Sant Nagar • Rani Bagh • Pitampura, Delhi – 110034
        </span>

        <a
          href="#about"
          className="flex items-center gap-2 hover:text-vintage-rose transition-colors uppercase tracking-widest text-[10px]"
        >
          <span>Explore Vintage</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-vintage-rose" />
        </a>
      </div>
    </section>
  );
}
