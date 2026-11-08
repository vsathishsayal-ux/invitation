import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({ weddingData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="maroon-bg-gradient text-[#fcf6ba] pt-12 pb-8 px-4 border-t-2 border-[#d4af37] relative overflow-hidden">

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <div className="relative mx-auto mb-6 h-40 w-full max-w-[420px] sm:h-48">
          <img
            src="/assets/floral_corner.jpg"
            alt="Floral wedding decoration"
            className="h-full w-full object-contain opacity-95 drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
          />

          <div className="absolute left-1/2 top-[55%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_6px_12px_rgba(74,14,23,0.28)]" aria-hidden="true">
              <path
                d="M60 98C54 92 27 72 19 55C11 37 16 19 34 18C47 17 55 26 60 35C65 26 73 17 86 18C104 19 109 37 101 55C93 72 66 92 60 98Z"
                fill="#f5dfe7"
                stroke="#7a0c2e"
                strokeWidth="2.5"
              />
              <path
                d="M60 38C60 28 67 18 78 18C89 18 96 27 95 39C94 51 84 60 60 73C36 60 26 51 25 39C24 27 31 18 42 18C53 18 60 28 60 38Z"
                fill="rgba(212,175,55,0.18)"
                stroke="#d4af37"
                strokeWidth="1.5"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-serif-heading text-[0.7rem] font-bold tracking-[0.18em] text-[#4a0e17] sm:text-xs">
              S &amp; B
            </span>
          </div>
        </div>

        {/* Couple Names */}
        <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#fcf6ba] font-bold tracking-wide mb-1">
          {weddingData.groomName} &amp; {weddingData.brideName}
        </h2>

        {/* Back to Top */}
        <div className="flex items-center justify-center mb-8 text-xs font-sans-clean">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37] text-[#fcf6ba] transition font-medium cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#d4af37]" />
          </button>
        </div>

        {/* Divider line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mb-6" />

        <p className="text-[11px] text-[#fcf6ba]/60 font-sans-clean">
          &copy; {new Date().getFullYear()}
        </p>

      </div>

    </footer>
  );
}
