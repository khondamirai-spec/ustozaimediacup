"use client";

import { useState, useEffect } from "react";
import {
  Trophy, ArrowDown, Play, FileText, Target, Award, Tag,
  Check, User, Phone, CheckCircle2, Lock
} from "lucide-react";

const PRICES = {
  monthly: 39000,
  yearly: 277000
};

export default function Home() {
  const [phone, setPhone] = useState("+998 ");
  const [fullName, setFullName] = useState("");
  const [promoCode] = useState("MEDIACUP20");
  const [promoStatus] = useState<"success" | "idle" | "error">("success");
  const [subscription, setSubscription] = useState<"monthly" | "yearly">("yearly");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
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

    if (rawDigits.length <= 9) {
      setPhone("+998 " + formatted);
    }
  };

  const handlePayment = async () => {
    if (!fullName.trim()) {
      alert("Iltimos, ismingizni kiriting");
      return;
    }

    const rawPhone = phone.replace(/[^\d+]/g, "");
    if (rawPhone.length < 13) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting");
      return;
    }

    setIsPaymentLoading(true);

    try {
      const response = await fetch("https://dev-api.ustozaibot.uz/api/v1/premium/generate-payment-url", {
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
  const discount = promoStatus === "success" ? 0.2 : 0;
  const finalPrice = currentPrice * (1 - discount);

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative flex flex-col font-body transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'} pb-12`}>
      {/* Abstract Background Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute right-[-10%] top-[40%] w-[400px] h-[400px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-12 z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between">

        {/* LEFT COLUMN: HERO & FEATURES */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 pt-4">

          {/* Header Texts */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 rounded-full mb-6 mt-2">
              <Trophy className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-yellow-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                MEDIA LIGA • MAXSUS TAKLIF
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-[1.1] text-white">
              Ustoz AI
            </h1>

            <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 font-medium">
              Barcha kurslarga <span className="text-blue-400 font-bold">20% chegirma</span> va
              <br className="hidden sm:block" /> Media Liga imkoniyatlari.
            </p>

            <button
              onClick={() => document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="lg:hidden bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full px-6 py-3.5 font-bold flex items-center justify-center gap-2 mb-4 w-full sm:w-auto shadow-lg shadow-blue-500/20"
            >
              Hoziroq obuna bo'ling <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden lg:flex bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full px-8 py-3.5 font-bold items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 ease-in-out"
            >
              Hoziroq obuna bo'ling <ArrowDown className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Video Box */}
          <div className="relative w-full aspect-video bg-[#0f1524]/80 backdrop-blur-md rounded-2xl border border-slate-700/60 flex flex-col items-center justify-center group overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:border-slate-600 mt-2">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

            <div className="z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600/30 flex items-center justify-center backdrop-blur-sm border border-blue-500/50 group-hover:bg-blue-600/50 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1"></div>
            </div>

            <span className="z-20 mt-4 text-slate-300 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
              VIDEONI KO'RISH
            </span>
          </div>

          {/* Features Section */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-[28px] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Nima uchun Ustoz AI?</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex bg-[#1E293B] p-3 h-12 w-12 rounded-full items-center justify-center shrink-0 border border-slate-700">
                  <FileText className="w-6 h-6 text-slate-200" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1">19+ Professional kurslar</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    IT, Marketing, Biznes va barcha sohalar bo'yicha mukammal bilimlar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex bg-[#1E293B] p-3 h-12 w-12 rounded-full items-center justify-center shrink-0 border border-slate-700">
                  <Target className="w-6 h-6 text-slate-200" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1">SMM va Target sirlari</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    Zamonaviy kasblarni o'rganib, daromadga chiqing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex bg-[#1E293B] p-3 h-12 w-12 rounded-full items-center justify-center shrink-0 border border-slate-700">
                  <Award className="w-6 h-6 text-slate-200" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1">Rasmiy sertifikat</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    O'quv kurslarini yakunlang va ishga joylashish uchun sertifikat oling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PAYMENT FORM */}
        <div className="w-full lg:w-1/2 flex lg:justify-end mt-4 lg:mt-0" id="payment-form">
          <div className="w-full max-w-[480px] bg-[#162132] rounded-3xl p-6 sm:p-8 border border-slate-700/70 shadow-2xl relative lg:ml-auto">

            <h3 className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-4 text-center sm:text-left">PROMOKOD</h3>

            {/* Promo Label Badge */}
            <div className="inline-flex items-center justify-between border border-[#1e4a2d] bg-[#0c2e17] rounded-full px-3 sm:px-4 py-3 mb-3 w-full sm:w-max sm:min-w-[300px]">
              <div className="flex items-center gap-2 text-white font-mono font-bold tracking-widest uppercase">
                <Tag className="w-5 h-5 text-green-500 mr-1" />
                MEDIACUP20
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
                <div className="absolute -top-[14px] right-4 bg-yellow-400 text-black text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10 leading-none">
                  <span className="text-[12px] leading-none mb-[1px]">★</span> TAVSIYA ETILADI
                </div>

                <div className="flex justify-between items-start w-full pr-1 sm:pr-2 pt-1">
                  <div className="flex flex-col">
                    <span className="text-slate-300 font-bold text-xs sm:text-sm uppercase tracking-wider mb-1.5">YILLIK OBUNA</span>
                    <div className="flex items-end gap-2.5 mb-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-white leading-none">{(PRICES.yearly * 0.8).toLocaleString('en-US')} so'm</span>
                      <span className="text-slate-500 line-through text-sm sm:text-base leading-none mb-0.5">{PRICES.yearly.toLocaleString('en-US')}</span>
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
    </div>
  );
}
