import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({ weddingData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#d7b168]/60 bg-[linear-gradient(180deg,#4b1720_0%,#2a0d13_100%)] px-4 pb-8 pt-10 text-[#f8e8b7] shadow-[0_-12px_35px_rgba(30,7,9,0.12)] sm:pt-12">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
          <img
            src="/assets/floral_corner.jpg"
            alt="Floral wedding decoration"
            className="absolute inset-0 h-full w-full object-contain opacity-95 drop-shadow-[0_12px_18px_rgba(0,0,0,0.18)]"
          />

          <div className="relative z-10 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
            <Heart className="h-full w-full fill-[#f5dfe7] text-[#7a0c2e] drop-shadow-[0_4px_8px_rgba(74,14,23,0.25)]" />
            <span className="absolute inset-0 flex items-center justify-center font-serif-heading text-[0.58rem] font-bold tracking-[0.14em] text-[#4b1720] sm:text-[0.7rem]">
              S &amp; B
            </span>
          </div>
        </div>

        <h2 className="mb-1 font-serif-heading text-2xl tracking-wide text-[#f8e8b7] sm:text-3xl">
          {weddingData.groomName} &amp; {weddingData.brideName}
        </h2>

        <div className="mb-8 flex items-center justify-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-[#f5dca6]/50 bg-[#fffaf5]/10 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#f8e8b7] transition hover:bg-[#f8e8b7]/10"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#f5dca6]" />
          </button>
        </div>

        <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-[#f5dca6]/60 to-transparent" />

        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#f8e8b7]/70">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
