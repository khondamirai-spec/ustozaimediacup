"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("+998 ");
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Prefixni saqlab qolish
    if (!val.startsWith("+998 ")) {
      if (val.startsWith("+998")) {
        val = "+998 " + val.slice(4);
      } else {
        val = "+998 ";
      }
    }

    const rawDigits = val.slice(5).replace(/\D/g, "");

    // Format: 99-123-45-67
    let formatted = "";
    if (rawDigits.length > 0) {
      formatted += rawDigits.substring(0, 2);
    }
    if (rawDigits.length >= 3) {
      formatted += "-" + rawDigits.substring(2, 5);
    }
    if (rawDigits.length >= 6) {
      formatted += "-" + rawDigits.substring(5, 7);
    }
    if (rawDigits.length >= 8) {
      formatted += "-" + rawDigits.substring(7, 9);
    }

    // Limit to 9 digits (+998 XX-XXX-XX-XX)
    const finalFormatted = formatted.length > 12 ? formatted.substring(0, 12) : formatted;

    setPhone("+998 " + finalFormatted);
  };

  const handleApplyPromo = () => {
    // Case insensitive check
    if (promoCode.trim().toLowerCase() === "media20") {
      setPromoStatus("success");
    } else {
      setPromoStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex flex-col items-center font-sans selection:bg-primary selection:text-black">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 z-10 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="font-serif text-3xl font-black text-white tracking-widest border-b-2 border-primary pb-1">
            USTOZ AI
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight text-white mb-3 glow-text drop-shadow-2xl">
          MEDIA <span className="text-gold">CUP</span>
        </h1>
        <p className="font-bold text-blue-200/80 text-sm md:text-lg tracking-[0.3em] uppercase">
          Media Mukammalligi Kelajagi
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-start justify-center">

        {/* Left Column: 9:16 Video Section */}
        <div className="w-full md:w-[40%] flex flex-col items-center">
          <div className="relative w-full max-w-xs mx-auto aspect-[9/16] rounded-2xl glow-box group cursor-pointer overflow-hidden border-2 border-primary/30 bg-black/60 shadow-2xl shadow-blue-900/50">
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary"></div>

            {/* Video Placeholder Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-primary/80 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/20">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-primary border-b-[12px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* Live/Status Label */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <span className="font-bold text-[10px] tracking-[0.2em] text-white uppercase px-3 py-1 bg-red-600 rounded-full shadow-lg animate-pulse">
                Jonli Efir
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-blue-200/60 uppercase tracking-widest text-xs font-bold">Rasmiy Promokod</span>
            <div className="px-8 py-3 bg-white/5 border border-primary/30 rounded-xl backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
              <span className="font-mono text-3xl font-black text-gold tracking-widest relative z-10">media20</span>
            </div>
            <p className="text-white/40 text-xs max-w-[200px] text-center mt-2">Maxsus imtiyoz uchun ushbu koddan foydalaning.</p>
          </div>
        </div>

        {/* Right Column: CTA & Form */}
        <div className="w-full md:w-[60%] flex flex-col gap-6 max-w-lg pt-4">
          {/* Adjusted padding for specific mobile optimization */}
          <div className="glass-panel p-6 md:p-10 rounded-3xl flex flex-col gap-8 relative border border-white/10 bg-gradient-to-br from-blue-900/40 to-black/60 shadow-2xl">

            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-blue-300 mb-2 uppercase tracking-wider ml-1">To'liq ismingiz</label>
                <input
                  type="text"
                  placeholder="Ism va familiyangizni kiriting"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-bold outline-none focus:border-primary transition-all placeholder:text-white/20 focus:ring-2 focus:ring-primary/20 focus:bg-black/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-300 mb-2 uppercase tracking-wider ml-1">Telefon raqami</label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={17}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-bold outline-none focus:border-primary transition-all placeholder:text-white/20 focus:ring-2 focus:ring-primary/20 focus:bg-black/60 font-mono tracking-wider text-xl"
                />
              </div>

              {/* Redesigned Promocode Section with Validation */}
              <div className={`bg-blue-950/30 rounded-xl p-4 border transition-colors duration-300 ${promoStatus === 'success' ? 'border-green-500/50 bg-green-900/10' : promoStatus === 'error' ? 'border-red-500/50 bg-red-900/10' : 'border-blue-500/20'}`}>
                {/* Wraps flex content for small screens */}
                <label className="text-xs font-bold text-gold mb-3 uppercase tracking-wider flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Promokodingiz bormi?</span>
                  {promoStatus === 'success' && <span className="text-green-400">Kod qabul qilindi ✓</span>}
                  {promoStatus === 'error' && <span className="text-red-400">Kod noto'g'ri ✕</span>}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      if (promoStatus !== 'idle') setPromoStatus('idle');
                    }}
                    placeholder="KOD"
                    // Added min-w-0 to fix flex overflow issue
                    className="flex-1 min-w-0 bg-black/40 border border-dashed border-white/20 rounded-lg px-4 py-3 text-white text-center font-mono uppercase tracking-widest outline-none focus:border-primary transition-colors focus:bg-black/60"
                  />
                  <button
                    onClick={handleApplyPromo}
                    // Adjusted padding and kept text on one line
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-lg text-sm border border-white/10 transition-all uppercase tracking-wide whitespace-nowrap"
                  >
                    Qo'llash
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <button className="w-full group relative overflow-hidden rounded-xl shadow-lg shadow-blue-900/20 transform transition-all hover:scale-[1.02] active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-blue-700 transition-colors duration-300"></div>
                <div className="relative px-6 py-5 flex items-center justify-center gap-3">
                  <span className="font-bold text-white text-lg tracking-[0.15em] uppercase text-center leading-tight">
                    To'lash va qo'shilish
                  </span>
                  <svg className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="text-center">
              <p className="text-blue-300/40 text-[10px] uppercase font-bold tracking-widest">
                Ustoz AI orqali xavfsiz to'lov
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center z-10 border-t border-white/5 bg-black/20 backdrop-blur-lg mt-auto">
        <p className="text-white/30 text-xs font-bold tracking-widest">© 2026 USTOZ AI MEDIA CUP. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
