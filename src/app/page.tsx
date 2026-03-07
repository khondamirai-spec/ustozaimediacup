"use client";

import { useState, useEffect } from "react";
import {
  Trophy, ArrowDown, Play, FileText, Target, Award, Tag,
  Check, User, Phone, CheckCircle2, Lock, Flame, Sparkles, Clock
} from "lucide-react";
import { Reviews } from "@/components/Reviews";
import { PrizesSlider } from "@/components/PrizesSlider";
import { WeeklyPrizes } from "@/components/WeeklyPrizes";

const PRICES = {
  monthly: 39000,
  yearly: 429000
};

export default function Home() {
  const [phone, setPhone] = useState("+998 ");
  const [fullName, setFullName] = useState("");
  const [promoCode] = useState("mediacup20");
  const [promoStatus] = useState<"success" | "idle" | "error">("success");
  const [subscription, setSubscription] = useState<"monthly" | "yearly">("yearly");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer state (Initial 35 days)
  const [timeLeft, setTimeLeft] = useState({
    days: 35,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    setMounted(true);

    // Set a fixed target date: April 9, 2026, at 15:00:00 (+35 days from March 5)
    // This ensures the timer "goes on even if you are not on site" by counting down to a specific moment.
    const targetDate = new Date("2026-04-09T15:00:00");

    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return true; // stop timer
      }
      return false;
    };

    // Initial calculation
    const shouldStop = calculateTime();
    if (shouldStop) return;

    const timer = setInterval(() => {
      const stop = calculateTime();
      if (stop) clearInterval(timer);
    }, 60000);

    return () => clearInterval(timer);
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

    if (rawDigits.length <= 9) {
      setPhone("+998 " + formatted);
    }
  };

  const handlePayment = async () => {
    if (!fullName.trim()) {
      alert("Iltimos, ismingizni kiriting");
      return;
    }

    const rawPhone = phone.replace(/\D/g, "");
    if (rawPhone.length < 12) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting");
      return;
    }

    setIsPaymentLoading(true);

    try {
      const response = await fetch("https://api.ustozaibot.uz/api/v1/premium/generate-payment-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: rawPhone,
          fullname: fullName.trim(),
          playType: subscription === "monthly" ? "MONTHLY" : "YEARLY",
          code: promoStatus === "success" ? promoCode : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "To'lov linkini olishda xatolik yuz berdi");
      }

      if (data.link) {
        window.location.href = data.link;
      } else {
        throw new Error("API muvaffaqiyatli javob berdi, lekin link topilmadi");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      alert(err.message || "Tizimda xatolik yuz berdi. Keyinroq qayta urinib ko'ring.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const currentPrice = PRICES[subscription];
  const finalPrice = promoStatus === "success"
    ? (subscription === "yearly" ? 299000 : currentPrice * 0.8)
    : currentPrice;

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative flex flex-col font-sans transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'} pb-12`}>
      {/* Abstract Background Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute right-[-10%] top-[40%] w-[400px] h-[400px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-12 z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between">

        {/* LEFT COLUMN: HERO & FEATURES */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 pt-4">

          {/* Header Texts */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 border border-blue-400/30 bg-blue-400/10 backdrop-blur-md px-5 py-2 rounded-full mb-8 mt-2 shadow-[0_0_20px_rgba(56,189,248,0.1)] group">
              <Trophy className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] leading-none">
                MEDIA CUP • MAXSUS TAKLIF
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 tracking-tight leading-[1.05] text-white font-heading">
              Ustoz AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-600">Pro</span>
            </h1>

            <div className="relative group max-w-2xl">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-50"></div>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300/90 mb-10 pl-6 leading-relaxed font-medium">
                Zamonaviy kasblarni o‘rganing, <span className="text-white font-bold underline decoration-blue-500/50 decoration-2 underline-offset-4">sertifikat oling</span> va <span className="text-white font-bold">TOP kompaniyalarda</span> amaliyot o‘ting.<br />
                <span className="inline-flex items-center gap-1 text-blue-400 font-bold mt-1">Yuqori daromad va sovrinlarni qo‘lga kiriting <Sparkles className="w-4 h-4" /></span>
              </p>
            </div>


            <button
              onClick={() => document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="lg:hidden bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full px-6 py-4 font-black text-lg flex items-center justify-center gap-2 mb-4 w-full sm:w-auto shadow-lg shadow-blue-500/20"
            >
              Hoziroq boshlash <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden lg:flex bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full px-10 py-4 font-black text-xl items-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 ease-in-out"
            >
              Hoziroq boshlash <ArrowDown className="w-5 h-5 ml-1" />
            </button>
          </div>

          {/* Video Box */}
          <div
            className="relative w-full aspect-[9/16] max-w-[400px] mx-auto bg-[#0f1524]/80 backdrop-blur-md rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center group overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:border-slate-600 mt-2"
            onClick={() => {
              const video = document.getElementById('hero-video') as HTMLVideoElement;
              if (video) {
                if (video.paused) {
                  video.play();
                  setIsPlaying(true);
                } else {
                  video.pause();
                  setIsPlaying(false);
                }
              }
            }}
          >
            <video
              id="hero-video"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://pub-53b0592c8c664875bac6456d9e6568fc.r2.dev/IMG_1243%20(1).mp4"
              poster="/video_thumbnail.png"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {!isPlaying && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                <div className="z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600/30 flex items-center justify-center backdrop-blur-sm border border-blue-500/50 group-hover:bg-blue-600/50 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1"></div>
                </div>

                <span className="z-20 mt-4 text-slate-300 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                  VIDEONI KO'RISH
                </span>
              </>
            )}
          </div>



          <WeeklyPrizes />


          {/* Added Promotional Image Block (Screenshot_7) */}
          <div className="mt-8 sm:mt-12 w-full relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] group bg-[#020817] border border-slate-800/60">
            {/* Subtle Inner Glow to blend */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50 mix-blend-overlay z-10 pointer-events-none"></div>

            {/* The image itself with 'lighten' to drop its dark background and blend into our container */}
            <img
              src="/zap.png"
              alt="Eng Foydali Tanlov"
              className="w-full h-auto object-cover relative z-0 transition-transform duration-700 ease-out group-hover:scale-[1.02] mix-blend-screen opacity-90 hover:opacity-100"
            />

            {/* Inset Shadow to erase hard image borders and feather the edges */}
            <div className="absolute inset-0 rounded-3xl sm:rounded-[2.5rem] shadow-[inset_0_0_40px_3px_#020817] z-10 pointer-events-none"></div>
          </div>

          {/* How It Works Section */}
          <div className="mt-8 sm:mt-12 w-full flex flex-col gap-6 lg:gap-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight font-heading flex items-center gap-3">
              <span className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Sparkles className="w-6 h-6 text-blue-400 animate-pulse" /></span> Qanday boshlash mumkin?
            </h2>

            <div className="flex flex-col gap-4 relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-[35px] sm:left-[47px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500/80 via-blue-500/40 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.3)] z-0"></div>

              {[
                {
                  title: "Ustoz AI Media Cup aksiyasi orqali kirishni xarid qiling",
                  desc: "Media Cup — <b class='text-white font-black'>1 oylik tanlov. Maxsus aksiya narxida</b> Ustoz AI Pro obunasini shu sahifa orqali xarid qiling."
                },
                {
                  title: "Ustoz AI ilovasini yuklab oling va tizimga kiring",
                  desc: "To‘lov qilgan <b class='text-white font-black'>telefon raqamingiz</b> orqali tizimga kiring."
                },
                {
                  title: "Kurslarni o‘rganing, sertifikat oling va daromadli kasb egasi bo‘ling",
                  desc: "Zamonaviy kasblarni o‘rganing, rasmiy sertifikat oling, TOP kompaniyalarda amaliyot o‘ting va kamida <b class='text-white font-black'>$300 daromadli kasb egasi</b> bo‘ling."
                },
                {
                  title: "Coinlar to‘plang va qimmatbaho sovrinlarni yuting",
                  desc: "Kurslarni tugating, coinlar to‘plang va Media Cup hamda Ustoz AI Market orqali <b class='text-white font-black'>uy, avtomobil, sayohat va 100+ qimmatbaho sovrinlarni yuting.</b>"
                }
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 sm:gap-6 bg-[#162132]/90 border border-blue-500/20 p-5 sm:p-7 rounded-3xl z-10 shadow-xl overflow-hidden group/card">
                  {/* Subtle background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>

                  <div className="relative w-12 h-12 rounded-2xl bg-[#0a1120] border-2 border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400 font-black text-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] z-10 group-hover/card:border-blue-400 transition-colors">
                    <span className="relative z-10">{idx + 1}</span>
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-sm pointer-events-none"></div>
                  </div>

                  <div className="flex flex-col gap-2 z-10 text-left">
                    <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-500 font-black text-lg sm:text-xl leading-snug">
                      {step.title}
                    </h4>
                    <p
                      className="text-white/70 text-sm sm:text-base leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: step.desc }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes Slider */}
          <PrizesSlider />

        </div>

        {/* RIGHT COLUMN: PAYMENT FORM */}
        <div className="w-full lg:w-1/2 flex flex-col items-end gap-6 mt-4 lg:mt-0" id="payment-form">
          {/* Countdown Timer Block */}
          <div className="w-full max-w-[480px] p-5 sm:p-7 rounded-[2.5rem] bg-[#162132]/60 border border-slate-700/50 backdrop-blur-sm flex flex-col items-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="mb-5 sm:mb-6 flex flex-col items-center">
              <span className="text-blue-400 font-black uppercase tracking-[0.25em] text-[10px] sm:text-[11px] drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                Maxsus taklif tugash vaqti
              </span>
              <div className="h-0.5 w-8 bg-blue-500/30 rounded-full mt-1.5" />
            </div>

            <div className="flex items-center gap-3 sm:gap-4 z-10 shrink-0">
              <div className="flex flex-col items-center bg-[#0a1120] p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[80px] sm:min-w-[90px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-hover:border-blue-500/30 transition-colors">
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1.5">kun</span>
              </div>
              <span className="text-white/40 font-black text-2xl sm:text-3xl animate-pulse">:</span>
              <div className="flex flex-col items-center bg-[#0a1120] p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[80px] sm:min-w-[90px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-hover:border-blue-500/30 transition-colors">
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1.5">soat</span>
              </div>
              <span className="text-white/40 font-black text-2xl sm:text-3xl animate-pulse">:</span>
              <div className="flex flex-col items-center bg-[#0a1120] p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[80px] sm:min-w-[90px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-hover:border-blue-500/30 transition-colors">
                <span className="text-3xl sm:text-4xl font-black text-blue-400 tabular-nums tracking-tight drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1.5">daqiqa</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[480px] bg-[#162132] rounded-3xl p-6 sm:p-8 border border-slate-700/70 shadow-2xl relative lg:ml-auto">

            <h3 className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-4 text-center sm:text-left">PROMOKOD</h3>

            {/* Promo Label Badge */}
            <div className="inline-flex items-center justify-between border border-[#1e4a2d] bg-[#0c2e17] rounded-full px-3 sm:px-4 py-3 mb-3 w-full sm:w-max sm:min-w-[300px]">
              <div className="flex items-center gap-2 text-white font-mono font-bold tracking-widest uppercase">
                <Tag className="w-5 h-5 text-green-500 mr-1" />
                mediacup20
              </div>
              <div className="flex items-center gap-1.5 border border-[#16944e]/30 bg-[#0d5930]/80 rounded-full px-3 py-1 text-[10px] text-green-400 font-bold ml-4">
                <Check className="w-3 h-3" strokeWidth={3} />
                AKTIV
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-green-500 text-xs sm:text-sm font-medium mb-6 sm:mb-8 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              20% chegirma muvaffaqiyatli qo'llanildi!
            </div>

            {/* Subscription Cards */}
            <div className="flex flex-col gap-4 mb-8">
              {/* YEARLY PLAN */}
              <button
                onClick={() => setSubscription("yearly")}
                className={`relative flex flex-col p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-left ${subscription === "yearly"
                  ? "border-blue-500 bg-[#1e2e46] shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "border-slate-800 bg-[#101724] hover:bg-[#151d2d] hover:border-slate-700"
                  }`}
              >
                <div className="absolute -top-[14px] right-4 bg-yellow-400 text-black text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10 leading-none uppercase">
                  <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600" /> ENG FOYDALI TANLOV
                </div>

                <div className="flex justify-between items-start w-full pr-1 sm:pr-2 pt-1">
                  <div className="flex flex-col">
                    <span className="text-slate-300 font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">YILLIK OBUNA</span>
                    <div className="flex items-end gap-2.5 mb-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                        {(promoStatus === "success" ? 299000 : PRICES.yearly).toLocaleString('en-US')} so'm
                      </span>
                      {promoStatus === "success" && (
                        <span className="text-slate-500 line-through text-sm sm:text-base leading-none mb-0.5">
                          {PRICES.yearly.toLocaleString('en-US')}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-xs sm:text-sm">yiliga bir marta to'lov</span>
                  </div>
                  <div className="mt-1">
                    {subscription === "yearly" ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-600 bg-slate-800/50 shrink-0" />
                    )}
                  </div>
                </div>
              </button>

              {/* MONTHLY PLAN */}
              <button
                onClick={() => setSubscription("monthly")}
                className={`relative flex flex-col p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-left ${subscription === "monthly"
                  ? "border-blue-500 bg-[#1e2e46] shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "border-slate-800 bg-[#101724] hover:bg-[#151d2d] hover:border-slate-700"
                  }`}
              >
                <div className="flex justify-between items-start w-full pr-1 sm:pr-2">
                  <div className="flex flex-col">
                    <span className="text-slate-300 font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">OYLIK OBUNA</span>
                    <div className="flex items-end gap-2.5 mb-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-white leading-none">{(PRICES.monthly * 0.8).toLocaleString('en-US')} so'm</span>
                      <span className="text-slate-500 line-through text-sm sm:text-base leading-none mb-0.5">{PRICES.monthly.toLocaleString('en-US')}</span>
                    </div>
                    <span className="text-slate-400 text-xs sm:text-sm">oyiga bir marta to'lov</span>
                  </div>
                  <div className="mt-1">
                    {subscription === "monthly" ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-600 bg-slate-800/50 shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* Single Input group block */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col">
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-2 pl-1">TO'LIQ ISMINGIZ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Abdulla Qodiriy"
                    className="w-full bg-[#101724] border border-slate-700/80 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/60 transition-colors placeholder:text-slate-600 text-[15px] sm:text-base shadow-inner shadow-black/20"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-2 pl-1">TELEFON RAQAM</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+998"
                    className="w-full bg-[#101724] border border-slate-700/80 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/60 transition-colors text-[15px] sm:text-base shadow-inner shadow-black/20"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 my-6"></div>

            {/* Total Row */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 text-sm sm:text-base">Jami to'lov:</span>
              <span className="text-2xl sm:text-3xl font-black text-white">{finalPrice.toLocaleString('en-US')} so'm</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isPaymentLoading}
              className={`w-full bg-[#2a7af5] hover:bg-blue-500 py-3.5 sm:py-4 rounded-[1.25rem] text-white font-bold text-base sm:text-lg uppercase tracking-wide transition-all shadow-[0_4px_25px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.4)] hover:scale-[1.01] active:scale-[0.99] ${isPaymentLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isPaymentLoading ? 'KUTILMOQDA...' : "TO'LOV QILISH"}
            </button>

            {/* Secure Footer */}
            <div className="mt-5 flex items-center justify-center gap-2 text-slate-500 text-[11px] sm:text-xs font-medium bg-black/10 rounded-full py-1.5 w-max mx-auto px-4 border border-white/5">
              <Lock className="w-3.5 h-3.5" />
              <span>Xavfsiz to'lov | Turon Bank</span>
            </div>

          </div>
        </div>
      </main>

      <Reviews />
    </div>
  );
}
