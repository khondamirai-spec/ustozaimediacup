"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [phone, setPhone] = useState("+998 ");
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "success" | "error">("idle");
  const [price, setPrice] = useState(33000);

  // Animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998 ")) {
      val = val.startsWith("+998") ? "+998 " + val.slice(4) : "+998 ";
    }
    const rawDigits = val.slice(5).replace(/\D/g, "");
    let formatted = "";
    if (rawDigits.length > 0) formatted += rawDigits.substring(0, 2);
    if (rawDigits.length >= 3) formatted += "-" + rawDigits.substring(2, 5);
    if (rawDigits.length >= 6) formatted += "-" + rawDigits.substring(5, 7);
    if (rawDigits.length >= 8) formatted += "-" + rawDigits.substring(7, 9);

    // Max length check
    if (rawDigits.length <= 9) {
      setPhone("+998 " + formatted);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "mediacup20") {
      setPromoStatus("success");
      setPrice(26400);
    } else {
      setPromoStatus("error");
      setPrice(33000);
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-body transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#1E3A5F] rounded-full blur-[150px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0066FF] rounded-full blur-[120px] opacity-20" />

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-40 left-10 w-24 h-24 border border-white/5 rotate-45" />
      </div>

      {/* Header */}
      <header className="w-full max-w-[1400px] mx-auto px-2 md:px-6 py-4 md:py-8 z-20">
        <div className="grid grid-cols-4 items-center justify-items-center gap-x-2 md:gap-x-6 glass-panel py-4 md:py-6 px-2 md:px-10 rounded-2xl border-white/5 bg-white/5 backdrop-blur-md">
          {/* Yoshlar Ishlari */}
          <div className="w-full h-6 md:h-12 relative flex items-center justify-center transition-opacity hover:opacity-80">
            <Image
              src="/yia logo _white-01.png"
              alt="Yoshlar Ishlari Agentligi"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* AICA */}
          <div className="w-full h-6 md:h-14 relative flex items-center justify-center transition-all duration-300 hover:scale-110">
            <div className="relative w-full h-full scale-125 md:scale-150">
              <Image
                src="/1.png"
                alt="AICA"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Yoshlar Ventures */}
          <div className="w-full h-6 md:h-12 relative flex items-center justify-center transition-opacity hover:opacity-80">
            <Image
              src="/Asset 2@2x-8.png"
              alt="Yoshlar Ventures"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Ustoz AI - THE ONLY ONE MADE BIGGER */}
          <div className="w-full h-12 md:h-24 relative flex items-center justify-center transition-all duration-300 hover:scale-110">
            <div className="relative w-full h-full scale-[1.8] md:scale-[2.2] translate-y-1">
              <Image
                src="/Full_2.png"
                alt="Ustoz AI"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Title */}
      <section className="w-full max-w-[1400px] mx-auto px-6 pt-12 pb-0 text-center z-10">
        <h1 className="font-display font-black text-5xl md:text-8xl tracking-tight text-white mb-4 glow-text uppercase">
          USTOZ AI <span className="text-gradient-gold">MEDIA CUP</span>
        </h1>

        {/* Mobile Scroll Indicator */}
        <button
          onClick={() => document.getElementById('register-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="md:hidden mx-auto mt-6 flex flex-col items-center gap-2 cursor-pointer z-50 pb-2"
        >
          <span className="text-lg font-black tracking-[0.2em] uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">RO'YXATDAN O'TISH</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-gold drop-shadow-[0_0_15px_rgba(255,184,0,0.8)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-4 z-10 flex flex-col md:flex-row gap-8 lg:gap-16 items-stretch justify-center -mt-2">

        {/* Left Column: Video (45%) */}
        <div className="w-full md:w-[40%] flex flex-col gap-6">
          <div className="relative w-full aspect-[9/16] md:aspect-auto md:flex-1 md:h-full rounded-3xl overflow-hidden glass-panel border-white/20 shadow-2xl group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
            {/* Main Featured Image / Video Placeholder */}
            <Image
              src="/Full_2.png"
              alt="Ustoz AI Media Cup"
              fill
              className="object-cover"
              priority
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Promocode Badge */}
          <div className="flex flex-col items-center justify-center p-6 md:p-8 glass-panel rounded-3xl bg-white/5 relative overflow-hidden group border-white/10">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
            <span className="font-display text-gold uppercase tracking-[0.4em] text-[11px] md:text-xs font-bold mb-2 md:mb-3 opacity-80">Rasmiy Promokod</span>
            <div className="font-display text-2xl md:text-4xl font-black text-white tracking-[0.2em] relative z-10 group-hover:scale-105 transition-transform duration-500">
              MEDIACUP20
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors" />
          </div>
        </div>

        {/* Right Column: Form (55%) */}
        <div className="w-full md:w-[60%] flex flex-col gap-6">
          <div id="register-section" className="glass-panel p-6 md:p-12 rounded-[2.5rem] border-white/10 bg-white/5 shadow-2xl relative overflow-hidden">

            {/* Abstract background for form */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-electric/5 rounded-full blur-[80px]" />

            {/* Form Header */}
            <div className="mb-6 md:mb-10 text-center md:text-left relative z-10">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-3 font-display tracking-tight uppercase leading-tight">
                RO'YXATDAN <span className="text-gradient-gold">O'TISH</span>
              </h2>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase tracking-[0.2em] ml-1">To'liq ismingiz</label>
                <input
                  type="text"
                  placeholder="Ism Familiya"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white hover:border-white/20 focus:border-gold/50 transition-all outline-none text-lg placeholder:text-white/10 shadow-xl"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase tracking-[0.2em] ml-1">Telefon raqam</label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white hover:border-white/20 focus:border-gold/50 transition-all outline-none font-mono text-xl tracking-wider placeholder:text-white/10 shadow-xl"
                />
              </div>

              <div className="mt-6 flex flex-col gap-6">
                {/* Promo Code Input Field */}
                <div className="relative group">
                  <input
                    type="text"
                    className={`w-full bg-transparent border-b-2 py-4 text-center font-display text-2xl uppercase tracking-[0.3em] outline-none transition-colors placeholder:text-white/5 placeholder:text-sm ${promoStatus === 'success'
                      ? 'border-green-500 text-green-500'
                      : promoStatus === 'error'
                        ? 'border-red-500 text-red-500'
                        : 'border-white/10 text-gold focus:border-gold'
                      }`}
                    placeholder="PROMOKOD KIRITING"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoStatus('idle');
                      setPrice(33000);
                    }}
                  />
                  {/* Status Indicator / Underline animation */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-500 group-focus-within:w-full ${promoStatus === 'success' ? 'w-full bg-green-500' :
                    promoStatus === 'error' ? 'w-full bg-red-500' :
                      'w-0 bg-gold'
                    }`} />

                  {/* Success Checkmark */}
                  {promoStatus === 'success' && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 text-xl animate-in fade-in zoom-in duration-300">
                      ✓
                    </div>
                  )}
                </div>

                {/* Quick Apply Promo Link */}
                <div className="text-center -mt-2 mb-2">
                  <button
                    onClick={() => {
                      setPromoCode("mediacup20");
                      setPromoStatus("success");
                      setPrice(26400);
                    }}
                    className="text-white/40 text-xs uppercase tracking-widest hover:text-gold transition-colors underline decoration-dotted underline-offset-4"
                  >
                    Promokoddan foydalanish
                  </button>
                </div>

                {/* Primary Button - Only visible when typing and not verified */}
                {promoCode.length > 0 && promoStatus !== 'success' && (
                  <button
                    onClick={handleApplyPromo}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 py-3 rounded-2xl text-white font-bold text-xs uppercase tracking-[0.3em] backdrop-blur-sm animate-in fade-in slide-in-from-top-2"
                  >
                    TASDIQLANG
                  </button>
                )}

                {/* Price Summary */}
                <div className="flex justify-between items-end px-4 py-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">To'lov miqdori</span>
                    <span className="text-white/60 font-medium">Jami:</span>
                  </div>
                  <div className="text-right">
                    {promoStatus === 'success' && (
                      <span className="text-sm text-white/30 line-through block mb-1">33 000 so'm</span>
                    )}
                    <span className="text-4xl font-black text-white font-display uppercase">
                      {price.toLocaleString().replace(/,/g, " ")} <span className="text-lg text-gold ml-1">so'm</span>
                    </span>
                  </div>
                </div>

                {/* Secondary Button - Solid Gold */}
                <button className="w-full bg-gradient-to-r from-[#FFB800] to-[#FF9500] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 py-6 rounded-2xl text-primary font-black text-xl uppercase tracking-[0.1em] shadow-[0_20px_40px_rgba(255,184,0,0.2)]">
                  TO'LOV QILISH
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* Footer */}
      <footer className="w-full py-8 text-center border-t border-white/5">
        <p className="text-white/30 text-xs font-bold tracking-[0.2em] font-display">© 2026 USTOZ AI MEDIA CUP</p>
      </footer>
    </div>
  );
}

