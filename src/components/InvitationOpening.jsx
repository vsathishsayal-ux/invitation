import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Music, VolumeX, MailOpen, Lock } from 'lucide-react';

export default function InvitationOpening({ weddingData, onOpenComplete, isMusicPlaying, toggleMusic }) {
  const [isOpenAnimationStarted, setIsOpenAnimationStarted] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

  const handleOpenClick = () => {
    if (isOpenAnimationStarted) return;
    setIsOpenAnimationStarted(true);

    // Trigger audio if paused
    if (!isMusicPlaying && toggleMusic) {
      toggleMusic(true);
    }

    // Confetti burst on ribbon untie
    setTimeout(() => {
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#4A0E17', '#F3E5AB', '#ffffff', '#E6C280'],
          disableForReducedMotion: true
        });
      } catch (e) {
        // Fallback silently if confetti library issue
      }
    }, 900);

    // Complete transition after animation
    setTimeout(() => {
      setIsFullyOpened(true);
      if (onOpenComplete) onOpenComplete();
    }, 2400);
  };

  const getMonogram = () => {
    const groomInit = weddingData?.groomFirstName?.[0] || 'S';
    const brideInit = weddingData?.brideFirstName?.[0] || 'A';
    return `${groomInit} & ${brideInit}`;
  };

  if (isFullyOpened) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d090e] paper-texture overflow-hidden p-4 sm:p-6"
      >
        {/* Subtle background ambient glow */}
        <div className="absolute inset-0 bg-radial from-[#5c121e]/80 via-[#3a0910]/95 to-[#1a0306] pointer-events-none" />
        
        {/* Ambient floating sparkles/petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#4a0e17]/40 rounded-full blur-3xl" />
        </div>

        {/* Audio control top right */}
        <button
          onClick={() => toggleMusic && toggleMusic()}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-md border border-[#d4af37]/30 text-[#f3e5ab] px-3 py-1.5 rounded-full text-xs font-medium transition"
        >
          {isMusicPlaying ? <Music className="w-3.5 h-3.5 text-[#d4af37] animate-bounce" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
          <span>{isMusicPlaying ? "Music On" : "Music Off"}</span>
        </button>

        {/* Outer Container / Envelope Wrapper */}
        <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center">
          
          {/* Card Envelope Container */}
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={
              isOpenAnimationStarted
                ? { scale: [0.98, 1.04, 0.9], y: [0, -10, 80], opacity: [1, 1, 0] }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 2.2, ease: "easeInOut" }}
            onClick={handleOpenClick}
            className="relative w-full aspect-[4/3] sm:aspect-[1.4/1] bg-[#fdfbf7] rounded-xl border-2 border-[#d4af37]/40 envelope-shadow cursor-pointer select-none overflow-hidden p-6 sm:p-8 flex flex-col justify-between group transform-gpu"
          >
            {/* Corner Decorative Floral Flourishes */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-[#d4af37]/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/60 rounded-br-lg pointer-events-none" />

            {/* Inner Pattern Line */}
            <div className="absolute inset-4 border border-[#d4af37]/20 rounded-lg pointer-events-none" />

            {/* Top Header of Envelope */}
            <div className="text-center pt-2 relative z-10">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#aa771c] font-semibold block">
                Wedding Invitation
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-1" />
            </div>

            {/* Center Monogram & Couple Names */}
            <div className="text-center my-auto py-4 relative z-10">
              <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#4a0e17] tracking-wide font-bold">
                {weddingData.brideFirstName}
              </h1>
              <div className="flex items-center justify-center gap-3 my-1">
                <div className="h-px w-8 bg-[#d4af37]/50" />
                <span className="font-script text-3xl sm:text-4xl text-[#aa771c]">&amp;</span>
                <div className="h-px w-8 bg-[#d4af37]/50" />
              </div>
              <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#4a0e17] tracking-wide font-bold">
                {weddingData.groomFirstName}
              </h1>
              <p className="text-[11px] sm:text-xs text-[#8c6b2d] font-serif-body italic mt-2">
                {weddingData.displayDate || "Save Our Date"}
              </p>
            </div>

            {/* Bottom Invitation Badge */}
            <div className="text-center pb-1 relative z-10">
              <p className="text-[10px] tracking-widest text-[#4a0e17]/70 uppercase font-medium">
                Click Ribbon to Untie
              </p>
            </div>

            {/* ENVELOPE FLAP SHADOW (Top triangular fold visual) */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#f3e9d8]/80 to-transparent pointer-events-none rounded-t-xl" />

            {/* SATIN RIBBON HORIZONTAL */}
            <motion.div
              animate={
                isOpenAnimationStarted
                  ? { x: [-10, -500], opacity: [1, 0] }
                  : { x: 0, opacity: 1 }
              }
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-14 bg-gradient-to-r from-[#4a0e17] via-[#7d1927] to-[#4a0e17] border-y border-[#d4af37]/70 shadow-lg flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
            </motion.div>

            {/* SATIN RIBBON VERTICAL */}
            <motion.div
              animate={
                isOpenAnimationStarted
                  ? { y: [0, 500], opacity: [1, 0] }
                  : { y: 0, opacity: 1 }
              }
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-14 bg-gradient-to-b from-[#4a0e17] via-[#7d1927] to-[#4a0e17] border-x border-[#d4af37]/70 shadow-lg z-20 pointer-events-none"
            />

            {/* CENTRAL WAX SEAL & RIBBON BOW */}
            <motion.div
              animate={
                isOpenAnimationStarted
                  ? { scale: [1, 1.4, 0], rotate: [0, 25, -45], opacity: [1, 1, 0] }
                  : { scale: [1, 1.03, 1] }
              }
              transition={
                isOpenAnimationStarted
                  ? { duration: 0.9, ease: "easeIn" }
                  : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
              }
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center"
            >
              {/* Wax Seal Outer Ring */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full maroon-bg-gradient border-2 border-[#d4af37] shadow-2xl flex items-center justify-center ring-4 ring-[#aa771c]/30">
                {/* Gold Rim Details */}
                <div className="absolute inset-1 border border-dashed border-[#fcf6ba]/60 rounded-full" />
                
                {/* Inner Wax Seal Monogram */}
                <div className="text-center text-[#fcf6ba]">
                  <Sparkles className="w-4 h-4 mx-auto text-[#d4af37] animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="font-serif-heading text-base sm:text-lg font-bold tracking-widest block text-shadow">
                    {getMonogram()}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-[#d4af37] block font-sans-clean">
                    Seal
                  </span>
                </div>

                {/* Satin Ribbon Bow tails */}
                <div className="absolute -bottom-6 -left-3 w-8 h-12 bg-gradient-to-b from-[#7d1927] to-[#3a0910] border-l border-[#d4af37]/60 transform -rotate-12 rounded-b-md shadow-md" />
                <div className="absolute -bottom-6 -right-3 w-8 h-12 bg-gradient-to-b from-[#7d1927] to-[#3a0910] border-r border-[#d4af37]/60 transform rotate-12 rounded-b-md shadow-md" />
              </div>
            </motion.div>

          </motion.div>

          {/* Interactive Instructions / CTA Button below invitation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleOpenClick}
              disabled={isOpenAnimationStarted}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full maroon-bg-gradient text-[#fcf6ba] font-serif-heading font-medium tracking-widest uppercase text-xs sm:text-sm border-2 border-[#d4af37] animate-pulse-glow hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer"
            >
              <MailOpen className="w-4 h-4 text-[#d4af37]" />
              <span>{isOpenAnimationStarted ? "Opening Invitation..." : "Click to Open Invitation"}</span>
              <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
            </button>
            <p className="text-[#d4af37]/70 text-xs mt-3 font-serif-body italic">
              A physical wedding invitation experience crafted with love
            </p>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
