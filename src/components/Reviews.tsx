"use client";

import { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";

const REVIEW_IMAGES = Array.from({ length: 15 }, (_, i) => `/reviews/${i + 1}.jpg`);
// Triple the array to ensure smooth infinite scroll in both directions
const INFINITE_IMAGES = [...REVIEW_IMAGES, ...REVIEW_IMAGES, ...REVIEW_IMAGES];

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Set initial scroll position to the middle set of images
    const singleSetWidth = container.scrollWidth / 3;
    container.scrollLeft = singleSetWidth;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const singleSetWidth = container.scrollWidth / 3;

      // If we scroll too far left, jump to the same position in the middle set
      if (scrollLeft <= 5) {
        container.scrollLeft = singleSetWidth + scrollLeft;
      }
      // If we scroll too far right, jump to the same position in the middle set
      else if (scrollLeft >= singleSetWidth * 2 - 5) {
        container.scrollLeft = scrollLeft - singleSetWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 sm:pt-20 overflow-hidden">
      <div className="flex items-center gap-4 sm:gap-5 mb-12 px-4 sm:px-0 max-w-7xl mx-auto">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight">
          O'quvchilar natijalari
        </h2>
      </div>

      <div className="relative w-full">
        {/* Horizontal Scrolling Gallery - "snap-none" for free feel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 px-4 pb-10 scrollbar-hide select-none active:cursor-grabbing cursor-grab overscroll-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {INFINITE_IMAGES.map((src, index) => (
            <div
              key={index}
              className="flex-none w-[280px] sm:w-[320px] lg:w-[380px]"
            >
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02] pointer-events-none">
                <img
                  src={src}
                  alt={`Review ${index + 1}`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Visual cues for interaction */}
        <div className="flex justify-center gap-1.5 mt-2 opacity-50">
          <div className="h-0.5 w-24 bg-blue-500/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}


