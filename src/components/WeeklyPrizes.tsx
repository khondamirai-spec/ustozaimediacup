"use client";

import { Trophy } from "lucide-react";

export function WeeklyPrizes() {
    return (
        <div className="w-full mt-10 sm:mt-12 bg-gradient-to-br from-[#0f172a] to-[#080d17] rounded-[2rem] sm:rounded-[2.5rem] border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">

            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-700"></div>
            <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-700"></div>

            <div className="flex flex-col relative z-10">
                {/* Content Side */}
                <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative">
                    {/* Header */}
                    <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 group-hover:animate-pulse" />
                        </div>
                        <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight font-heading tracking-tight">
                            Media Cup sovrinlari
                        </h3>
                    </div>

                    {/* Description Text */}
                    <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 font-bold leading-relaxed max-w-lg">
                        1 oy davomida sertifikat olgan foydalanuvchilar o‘rtasida sovrinlar o‘ynaladi
                    </p>

                    {/* Prizes List */}
                    <div className="flex flex-col gap-6 pl-1">
                        <div className="flex items-center gap-5 group/item">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 shrink-0 shadow-inner group-hover/item:scale-110 transition-transform duration-300">
                                <span className="text-2xl sm:text-3xl drop-shadow-md">🥇</span>
                            </div>
                            <span className="text-xl sm:text-3xl font-black text-white tracking-tight">5 ta noutbuk</span>
                        </div>

                        <div className="flex items-center gap-5 group/item">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-400/10 flex items-center justify-center border border-slate-400/20 shrink-0 shadow-inner group-hover/item:scale-110 transition-transform duration-300">
                                <span className="text-2xl sm:text-3xl drop-shadow-md">🥈</span>
                            </div>
                            <span className="text-xl sm:text-3xl font-black text-white tracking-tight">5 ta smartfon</span>
                        </div>

                        <div className="flex items-center gap-5 group/item">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-600/10 flex items-center justify-center border border-orange-600/20 shrink-0 shadow-inner group-hover/item:scale-110 transition-transform duration-300">
                                <span className="text-2xl sm:text-3xl drop-shadow-md">🥉</span>
                            </div>
                            <span className="text-xl sm:text-3xl font-black text-white tracking-tight">5 ta smart soat</span>
                        </div>
                    </div>
                </div>

                {/* Image Side */}
                <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] w-full overflow-hidden bg-[#080d17] border-t border-slate-800/80">
                    <img
                        src="/bl/3.jpg"
                        alt="Gadgets and Prizes"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    />
                </div>
            </div>
        </div>
    );
}
