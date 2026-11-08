import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({ weddingData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="maroon-bg-gradient text-[#fcf6ba] pt-12 pb-8 px-4 border-t-2 border-[#d4af37] relative overflow-hidden">

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
          <img
            src="/assets/floral_corner.jpg"
            alt="Floral wedding decoration"
            className="absolute inset-0 h-full w-full object-contain opacity-95 drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
          />

          <div className="relative z-10 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
            <Heart className="h-full w-full fill-[#f5dfe7] text-[#7a0c2e] drop-shadow-[0_4px_8px_rgba(74,14,23,0.25)]" />
            <span className="absolute inset-0 flex items-center justify-center font-serif-heading text-[0.58rem] font-bold tracking-[0.14em] text-[#4a0e17] sm:text-[0.7rem]">
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
