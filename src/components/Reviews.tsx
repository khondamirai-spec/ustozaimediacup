"use client";

import { Star, MessageSquare } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "@Sardor_mj",
    role: "Matematika Kursi",
    content: "Kattakon rahmat ustoz AI jamoasiga sovğalarim keldi menga judayam yoqdi ajoyib super darslar uchun ☺️☺️",
    rating: 5,
  },
  {
    id: 2,
    name: "Malika_2004",
    role: "Video Montaj",
    content: "Man har doim Video montajiga qiziqib yurardim, kotta rahmat, 6 soatda montaj qilishni o‘rganish bu prosta super!!!! ❤️❤️",
    rating: 5,
  },
  {
    id: 3,
    name: "Javohir B.",
    role: "Video Montaj",
    content: "Menga eng yoqqan dars videomantaj bo'ldi, videomantajni umuman bilmas edim, 0 dan o'rgandim va hozirda premiere pro orqali videolar mantaj qilyabman. Juda darslar sifatli bo'ldi.",
    rating: 5,
  },
  {
    id: 4,
    name: "Aziza K.",
    role: "Uzum Market Kursi",
    content: "SIZga katta rahmat, мен 52 ёшдаман ва бу маълумотингиз менga жуда ёқди (анча маълумот олдим).",
    rating: 5,
  },
  {
    id: 5,
    name: "Akobir_tursunov",
    role: "Ish Topish Kursi",
    content: "Мен Тожикистондан дарсингиз фойдали булибдими ёки буптими кайси бири тугри узбек тилини яхши биламан деб юрардим кантентни куриб изох ёзилгахам журъатим етмай колди",
    rating: 5,
  },
  {
    id: 6,
    name: "Doston V.",
    role: "Suniy Intelektlar",
    content: "Qoyil qolmay iloji yo'q. Judayam mashaqqatli mehnatingiz uchun katta rahmat. Imkonsizlar uchun imkoniyat.",
    rating: 5,
  },
];

export function Reviews() {
  const getInitial = (name: string) => {
    return name.replace(/^@/, "").charAt(0).toUpperCase();
  };

  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 sm:pt-20 overflow-hidden">
      <div className="flex items-center gap-4 sm:gap-5 mb-12 px-4 sm:px-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight">
          Ustoz AI Pro haqida
        </h2>
      </div>

      <div className="relative w-full overflow-hidden pb-3 sm:pb-6">
        {/* Left and Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#090e17] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#090e17] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, setIdx) => (
            REVIEWS.map((review) => (
              <div
                key={`${setIdx}-${review.id}`}
                className="mx-1.5 sm:mx-2 min-w-[220px] sm:min-w-[260px] max-w-[260px] bg-[#101724] border border-slate-800/80 rounded-xl p-4 shadow-lg flex flex-col gap-3 group transition-colors hover:border-slate-600 shrink-0"
              >
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-[13px] leading-relaxed italic">"{review.content}"</p>
                <div className="mt-auto flex items-center gap-2.5 pt-3 border-t border-slate-800/60 transition-colors group-hover:border-slate-700">
                  {/* Initial Avatar */}
                  <div className="w-8 h-8 rounded-full shrink-0 border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-sky-600/20 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.1)] group-hover:border-blue-400/50 transition-colors">
                    <span className="text-blue-400 font-black text-xs select-none">
                      {getInitial(review.name)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-[12px] tracking-wide leading-none">{review.name}</span>
                    <span className="text-slate-500 text-[10px] mt-1 leading-none">{review.role}</span>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

