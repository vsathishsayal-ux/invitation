import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer({ weddingData, onReopenEnvelope }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="maroon-bg-gradient text-[#fcf6ba] pt-12 pb-8 px-4 border-t-2 border-[#d4af37] relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Decorative Wedding Symbol */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#fdfbf7]/10 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
          <Heart className="w-6 h-6 fill-[#d4af37]" />
        </div>

        {/* Bride & Groom Names */}
        <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#fcf6ba] font-bold tracking-wide mb-1">
          {weddingData.brideName} &amp; {weddingData.groomName}
        </h2>

        {/* Subtitle */}
        <p className="font-serif-body italic text-base text-[#d4af37] mb-4 font-medium">
          With love and happiness
        </p>

        {weddingData.hashtag && (
          <p className="text-xs uppercase tracking-widest text-[#fcf6ba]/80 font-sans-clean mb-6 font-semibold">
            {weddingData.hashtag}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mb-8 text-xs font-sans-clean">
          <button
            onClick={onReopenEnvelope}
            className="px-4 py-2 rounded-full bg-[#fdfbf7]/10 hover:bg-[#fdfbf7]/20 border border-[#d4af37]/40 text-[#fcf6ba] transition"
          >
            Re-open Envelope Animation
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37] text-[#fcf6ba] transition font-medium"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#d4af37]" />
          </button>
        </div>

        {/* Divider line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mb-6" />

        <p className="text-[11px] text-[#fcf6ba]/60 font-sans-clean">
          Personalized Digital Wedding Invitation &copy; {new Date().getFullYear()}
        </p>

      </div>

    </footer>
  );
}
