"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const galleryEl = target.closest("[data-cursor='view']");
      const bookEl = target.closest("[data-cursor='book']");

      if (galleryEl) {
        setCursorText("VIEW");
        setIsHovered(true);
      } else if (bookEl) {
        setCursorText("BOOK");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full bg-vintage-espresso/90 text-[10px] font-sans font-semibold tracking-widest text-vintage-ivory shadow-xl mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovered ? 28 : 8),
        y: mousePosition.y - (isHovered ? 28 : 8),
        width: isHovered ? 56 : 16,
        height: isHovered ? 56 : 16,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.1 }}
    >
      {isHovered && <span className="animate-fade-in uppercase">{cursorText}</span>}
    </motion.div>
  );
}
