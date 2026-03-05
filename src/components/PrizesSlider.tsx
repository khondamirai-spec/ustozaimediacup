"use client";

import { useState, useEffect } from "react";
import { Gift } from "lucide-react";

const PRIZES = [
    { id: 1, title: "1-o'rin", image: "/bl/1.jpg" },
    { id: 2, title: "2-o'rin", image: "/bl/2.jpg" },
    { id: 4, title: "4-o'rin", image: "/bl/4.jpg" },
    { id: 5, title: "Sovrin 5", image: "/bl/5.jpg" },
    { id: 6, title: "Sovrin 6", image: "/bl/6.jpg" },
    { id: 7, title: "Sovrin 7", image: "/bl/7.jpg" },
    { id: 8, title: "Sovrin 8", image: "/bl/8.jpg" }
];

export function PrizesSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % PRIZES.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full mt-8 sm:mt-12 flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] shrink-0">
                    <Gift className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight font-heading">
                    Ustoz AI Pro — qimmatbaho sovg‘alar va imkoniyatlar
                </h3>
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-[2rem] overflow-hidden border border-slate-700/60 shadow-2xl bg-[#0a1120] group">
                {PRIZES.map((prize, index) => (
                    <div
                        key={prize.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <img
                            src={prize.image}
                            alt={prize.title}
                            className="w-full h-full object-contain relative z-10 transition-transform duration-[4000ms] group-hover:scale-105"
                        />
                        {/* Blurred background version of the same image to fill gaps if any */}
                        <div
                            className="absolute inset-0 z-0 opacity-30 blur-2xl scale-110"
                            style={{
                                backgroundImage: `url(${prize.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        {/* Dark overlay for better text/indicator contrast */}
                        <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />
                    </div>
                ))}

                {/* Indicators */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex gap-2.5">
                    {PRIZES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-blue-500 w-8 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                                : "bg-slate-500/40 hover:bg-slate-400/80 w-2.5"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress Bar (matched to 3 seconds) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800/50 z-30">
                    <div
                        key={currentIndex}
                        className="h-full bg-blue-500/80 w-full animate-[progress_3s_linear]"
                    />
                </div>
            </div>
        </div>
    );
}

// Ensure progress animation duration matches the timer
// In index.css or global.css, the progress animation should be defined.
// Assuming it is already defined since it worked before.
