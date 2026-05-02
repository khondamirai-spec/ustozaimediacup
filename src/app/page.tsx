"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sponsors = [
    "/logo/yia logo _white-02.png",
    "/logo/Asset 2@2x-8.png",
    "/logo/Font_1.png",
    "/logo/1.png",
    "/logo/logo png.png",
    "/logo/yosh tadbirkor.png",
    "/logo/Unicorns venture fund.png"
  ];

  const sponsorElements = sponsors.map((src, i) => (
    <div
      key={i}
      className="flex items-center justify-center w-full h-36 sm:h-56 bg-[#162132]/30 rounded-[2.5rem] border border-slate-700/40 hover:bg-[#1a2b42]/80 hover:border-blue-500/50 transition-all duration-300 group shadow-xl p-2 sm:p-3"
    >
      <img
        src={src}
        alt={`Sponsor ${i + 1}`}
        className="max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  ));

  return (
    <div className={`min-h-screen w-full overflow-hidden relative flex flex-col font-sans transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'} pb-12`}>
      {/* Abstract Background Glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 blur-[200px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 z-10 flex flex-col items-center justify-center text-center">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 border border-blue-400/30 bg-blue-400/10 backdrop-blur-md px-5 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
          <CheckCircle2 className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-xs sm:text-sm font-black uppercase tracking-[0.2em] leading-none mt-0.5">
            TANLOV YAKUNLANDI
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-black mb-8 tracking-tight leading-[1.1] text-white">
          Media Cup Challenge <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-600">yakunlandi</span>
        </h1>

        {/* Body Text */}
        <div className="bg-[#101724]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl max-w-2xl w-full">
          <div className="flex flex-col gap-4 text-base sm:text-xl text-slate-300 font-medium leading-relaxed">
            <p>
              Ustoz AI Media Cup doirasidagi tanlov muddati yakunlandi.
            </p>
            <p>
              Ishtirok etgan barcha foydalanuvchilarga rahmat.
            </p>
            <div className="border-t border-slate-700/50 my-2"></div>
            <p className="text-slate-400 text-sm sm:text-base flex items-center gap-3 text-left">
              <span className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                <Info className="w-5 h-5" />
              </span>
              G‘oliblar va keyingi bosqichlar bo‘yicha ma’lumotlar Ustoz AI rasmiy sahifalarida e’lon qilinadi.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <a
          href="https://linktr.ee/ustozai"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 sm:px-10 py-4 sm:py-5 font-black text-lg sm:text-xl transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] hover:-translate-y-1"
        >
          <span>Ustoz AI ekotizimiga o'tish</span>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </a>

      </main>

      {/* Sponsors Section */}
      <section className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20 z-10 flex flex-col items-center">
        <h2 className="text-sm sm:text-base font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 text-center">
          Tanlov hamkorlari:
        </h2>

        {/* 7 Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
          {/* We spread 7 items nicely. In mobile: 2 cols, md: 4 cols, lg: 7 cols */}
          {sponsorElements.map((element, index) => (
            <div key={index} className="flex w-full">
              {element}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

