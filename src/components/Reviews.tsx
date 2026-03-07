"use client";

import { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";

const REVIEW_IMAGES = Array.from({ length: 15 }, (_, i) => `/reviews/${i + 1}.jpg`);
const INFINITE_IMAGES = [...REVIEW_IMAGES, ...REVIEW_IMAGES, ...REVIEW_IMAGES];

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Set initial scroll position to the middle set of images
    const singleSetWidth = container.scrollWidth / 3;
    container.scrollLeft = singleSetWidth;

    // --- INFINITE LOOP LOGIC ---
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const singleSetWidth = container.scrollWidth / 3;
      if (scrollLeft <= 5) {
        container.scrollLeft = singleSetWidth + scrollLeft;
      } else if (scrollLeft >= singleSetWidth * 2 - 5) {
        container.scrollLeft = scrollLeft - singleSetWidth;
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });

    // --- MOUSE DRAG LOGIC ---
    const onMouseDown = (e: MouseEvent) => {
      isDown.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeftStart.current = container.scrollLeft;
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const onMouseLeave = () => {
      if (!isDown.current) return;
      isDown.current = false;
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
    };

    const onMouseUp = () => {
      isDown.current = false;
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 1.5; // multiply for faster feel
      container.scrollLeft = scrollLeftStart.current - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 sm:pt-20 overflow-hidden">
      <div className="flex items-center gap-4 sm:gap-5 mb-12 px-4 sm:px-0 max-w-7xl mx-auto">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight">
          Ustoz AI Pro haqida
        </h2>
      </div>

      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto gap-4 sm:gap-6 px-4 pb-10 scrollbar-hide select-none cursor-grab"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {INFINITE_IMAGES.map((src, index) => (
            <div
              key={index}
              className="flex-none bg-[#111827] border border-slate-700/60 rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center">
                <img
                  src={src}
                  alt={`Review ${index + 1}`}
                  className="w-auto h-auto max-w-[85vw] sm:max-w-[400px] max-h-[60vh] lg:max-h-[500px] object-contain block pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-2 opacity-50">
          <div className="h-0.5 w-24 bg-blue-500/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
