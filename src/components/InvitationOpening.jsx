import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Music, VolumeX, MailOpen } from 'lucide-react';
import BackgroundPetals from './BackgroundPetals';
import FloatingBalloons from './FloatingBalloons';

export default function InvitationOpening({ weddingData, onOpenComplete, isMusicPlaying, toggleMusic }) {
  // animationStage:
  // 0 = Envelope Closed (Wax Seal Intact)
  // 1 = Unsealing (Wax Seal Breaks with Gold Sparkles)
  // 2 = Inner Invitation Gift Paper Card Slides Up Out of Envelope
  // 3 = Transitioning to Main Invitation Page
  const [animationStage, setAnimationStage] = useState(0);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

  const handleOpenClick = () => {
    if (animationStage > 0) return;

    // 1. Unseal phase: Wax seal breaks
    setAnimationStage(1);

    // 2. Inner Gift Paper Invitation Card slides UPWARDS with confetti
    setTimeout(() => {
      setAnimationStage(2);
      try {
        confetti({
          particleCount: 120,
          spread: 110,
          origin: { y: 0.45 },
          colors: ['#D4AF37', '#7D1927', '#F3E5AB', '#ffffff', '#E6C280', '#F9D5D5'],
          disableForReducedMotion: true
        });
      } catch (e) {}
    }, 550);

    // 3. Expand card focus & transition to main app
    setTimeout(() => {
      setAnimationStage(3);
    }, 2100);

    // 4. Complete opening & trigger background audio playback
    setTimeout(() => {
      setIsFullyOpened(true);
      if (onOpenComplete) onOpenComplete();
    }, 2900);
  };

  const brideName = weddingData?.brideFirstName || weddingData?.brideName || 'Sayal';
  const groomName = weddingData?.groomFirstName || weddingData?.groomName || 'Sathish';
  const brideInit = brideName[0] || 'S';
  const groomInit = groomName[0] || 'S';
  const monogram = `${brideInit} & ${groomInit}`;

  if (isFullyOpened) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 sm:p-6 select-none"
      >
        {/* Real Wood & Linen Flatlay Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/invitation_flatlay_bg.jpg"
            alt="Natural Invitation Table Flatlay"
            className="w-full h-full object-cover scale-105 filter brightness-[0.85] contrast-[1.05]"
          />
          {/* Warm ambient vignette overlay */}
          <div className="absolute inset-0 bg-radial from-[#240509]/60 via-[#180306]/85 to-[#0d0103]/95" />
          
          {/* Subtle natural sunlight beam animation */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#fff6d6]/15 via-[#fcf0c0]/5 to-transparent blur-3xl pointer-events-none transform -rotate-12" />
        </div>

        {/* Photorealistic falling rose & jasmine flower petals */}
        <BackgroundPetals count={24} />

        {/* Tasteful Floating Balloons along screen edges */}
        <FloatingBalloons count={6} zIndex="z-30" />

        {/* Music toggle control pill on top right */}
        <button
          onClick={() => toggleMusic && toggleMusic()}
          className="absolute top-5 right-5 z-50 flex items-center gap-2 bg-[#ffffff]/15 hover:bg-[#ffffff]/25 backdrop-blur-md border border-[#d4af37]/60 text-[#f3e5ab] px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xl cursor-pointer hover:scale-105"
        >
          {isMusicPlaying ? (
            <>
              <Music className="w-4 h-4 text-[#d4af37] animate-bounce" />
              <span className="tracking-wide">Music Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-300" />
              <span className="tracking-wide">Music Off</span>
            </>
          )}
        </button>

        {/* Outer 3D Envelope Container Wrapper */}
        <div className="relative w-full max-w-[460px] sm:max-w-[520px] mx-auto flex flex-col items-center justify-center z-20 perspective-[1400px]">
          
          {/* Main Interactive Envelope Assembly */}
          <motion.div
            initial={{ scale: 0.92, y: 25 }}
            animate={
              animationStage === 3
                ? { scale: 1.12, y: -20, opacity: 0 }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOpenClick}
            className="relative w-full cursor-pointer group transform-gpu"
          >
            {/* ENVELOPE DIMENSIONS (Classic 7x5 Wedding Pocket Ratio) */}
            <div className="relative w-full aspect-[1.38/1] rounded-2xl envelope-pocket-shadow preserve-3d">
              
              {/* ============================================================ */}
              {/* LAYER A: ENVELOPE BACKING & INNER POCKET LINING              */}
              {/* ============================================================ */}
              <div className="absolute inset-0 bg-[#f7f3ea] rounded-2xl border border-[#d4af37]/50 overflow-hidden shadow-inner">
                {/* Inner Pocket Floral Lining Pattern */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#aa771c_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute inset-2 border border-dashed border-[#d4af37]/30 rounded-xl pointer-events-none" />
              </div>

              {/* ============================================================ */}
              {/* LAYER B: THE INNER WEDDING INVITATION CARD (GIFT PAPER)      */}
              {/* ============================================================ */}
              <motion.div
                initial={{ y: 15, scale: 0.96 }}
                animate={
                  animationStage >= 2
                    ? { y: -160, scale: 1.04 }
                    : { y: 15, scale: 0.96 }
                }
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-3 sm:inset-x-4 top-3 bottom-3 z-15 deckled-paper rounded-xl border-2 border-[#d4af37]/70 card-shadow p-5 sm:p-7 flex flex-col justify-between text-center overflow-hidden"
              >
                {/* Traditional Auspicious Ganesha / Om / Leaf Motif Top Icon */}
                <div className="flex flex-col items-center justify-center pt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa820a] p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-[#4a0e17] rounded-full flex items-center justify-center">
                      <span className="font-serif-heading text-[#f3e5ab] text-xs font-bold tracking-widest">
                        卐
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#aa771c] font-bold mt-1.5 block">
                    Royal Wedding Invitation
                  </span>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-1" />
                </div>

                {/* Couple Names Calligraphy & Wedding Details */}
                <div className="my-auto py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8c6b2d] font-serif-body font-bold mb-1">
                    Solemnizing the Marriage of
                  </p>
                  
                  <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#4a0e17] font-bold tracking-wide drop-shadow-sm">
                    {brideName}
                  </h1>

                  <div className="flex items-center justify-center gap-3 my-1">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
                    <span className="font-script text-3xl sm:text-4xl text-[#aa771c] leading-none">&amp;</span>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
                  </div>

                  <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#4a0e17] font-bold tracking-wide drop-shadow-sm">
                    {groomName}
                  </h1>

                  <p className="text-xs sm:text-sm font-serif-body text-[#7d1927] font-semibold tracking-wider mt-2.5">
                    {weddingData.displayDate || "Sunday, 15 December 2026"}
                  </p>
                  <p className="text-[11px] font-serif-body italic text-[#8c6b2d]">
                    {weddingData.venueName || "The Leela Palace, Chennai"}
                  </p>
                </div>

                {/* Card Footer Tagline */}
                <div className="pb-1 border-t border-[#d4af37]/30 pt-2">
                  <p className="text-[10px] text-[#4a0e17]/80 font-serif-body italic">
                    "Two hearts, one journey, blessed by love"
                  </p>
                </div>

                {/* Inner Gold Foil Frame */}
                <div className="absolute inset-2 border border-[#d4af37]/30 rounded-lg pointer-events-none" />
              </motion.div>

              {/* ============================================================ */}
              {/* LAYER C: ENVELOPE FRONT SLEEVE (LOWER POCKET HOLDER)        */}
              {/* ============================================================ */}
              <div 
                className="absolute inset-x-0 bottom-0 h-[58%] z-20 bg-[#f7f3ea] rounded-b-2xl border-t-2 border-[#d4af37] shadow-md flex flex-col justify-end p-4 text-center overflow-hidden"
                style={{
                  clipPath: 'polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%)',
                  backgroundImage: 'radial-gradient(#d4af37 0.3px, transparent 0.3px), radial-gradient(#6b1626 0.3px, #f7f3ea 0.3px)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 8px 8px'
                }}
              >
                {/* Gold foil filigree along top sleeve edge */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#aa771c] via-[#fcf6ba] to-[#aa771c]" />
                
                {/* Fine embossed details on front sleeve */}
                <div className="mb-2 relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#7d1927] font-bold">
                    Tap Seal to Unfold
                  </p>
                </div>
              </div>

              {/* ============================================================ */}
              {/* LAYER D: TOP ENVELOPE TRIANGULAR FLAP (FADES OUT ON OPEN)    */}
              {/* ============================================================ */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={
                  animationStage >= 2
                    ? { opacity: 0, scaleY: 0.8 }
                    : { opacity: 1, scaleY: 1 }
                }
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{ transformOrigin: 'top center' }}
                className="absolute inset-x-0 top-0 h-[56%] z-25 pointer-events-none"
              >
                {/* Front Side of Triangular Flap (Closed View) */}
                <div
                  className="absolute inset-0 bg-[#f4eee2] border-b-2 border-[#d4af37] shadow-lg flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    backgroundImage: 'radial-gradient(#d4af37 0.4px, transparent 0.4px), radial-gradient(#6b1626 0.4px, #f4eee2 0.4px)',
                    backgroundSize: '16px 16px'
                  }}
                >
                  {/* Flap Outer Gold Foil V-Border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="0,0 100,0 50,98" fill="none" stroke="#d4af37" strokeWidth="2.5" />
                    <polygon points="3,0 97,0 50,92" fill="none" stroke="#aa771c" strokeWidth="0.8" strokeDasharray="3 2" />
                  </svg>

                  {/* Top Crest Monogram Icon on Flap */}
                  <div className="mb-6 text-center">
                    <span className="font-serif-heading text-[#7d1927] text-xs sm:text-sm font-bold tracking-widest block">
                      {monogram}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ============================================================ */}
              {/* LAYER E: INTERACTIVE ROYAL 3D WAX SEAL STAMP                 */}
              {/* ============================================================ */}

              {/* Center Royal 3D Crimson Wax Seal Button */}
              <AnimatePresence>
                {animationStage < 2 && (
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={
                      animationStage === 1
                        ? { scale: [1, 1.35, 0], rotate: [0, 20, -30], opacity: [1, 1, 0] }
                        : { scale: [1, 1.05, 1] }
                    }
                    exit={{ scale: 0, opacity: 0 }}
                    transition={
                      animationStage === 1
                        ? { duration: 0.5, ease: "easeOut" }
                        : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
                    }
                    className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-20 h-20 sm:w-24 sm:h-24 cursor-pointer group"
                  >
                    {/* Realistic 3D Organic Crimson Wax Seal Stamp Body */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7d1927] via-[#5c121e] to-[#3a0910] border-2 border-[#d4af37] wax-seal-shadow flex items-center justify-center ring-4 ring-[#aa771c]/40 animate-pulse-seal">
                      
                      {/* Inner Embossed Gold Monogram Ring */}
                      <div className="w-15 h-15 sm:w-18 sm:h-18 rounded-full border border-dashed border-[#fcf6ba]/70 flex flex-col items-center justify-center p-1 text-center bg-[#4a0e17]/50">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin mb-0.5" style={{ animationDuration: '7s' }} />
                        <span className="font-serif-heading text-xs sm:text-sm font-bold tracking-widest text-[#fcf6ba] drop-shadow-md block">
                          {monogram}
                        </span>
                        <span className="text-[7px] uppercase tracking-widest text-[#d4af37] block font-sans-clean font-bold mt-0.5">
                          Open
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

          {/* Bottom Interactive CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleOpenClick}
              disabled={animationStage > 0}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full maroon-bg-gradient text-[#fcf6ba] font-serif-heading font-medium tracking-widest uppercase text-xs sm:text-sm border-2 border-[#d4af37] animate-pulse-glow hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer"
            >
              <MailOpen className="w-4.5 h-4.5 text-[#d4af37]" />
              <span>
                {animationStage === 0
                  ? "Tap Wax Seal to Open Invitation"
                  : animationStage === 1
                  ? "Unsealing Invitation..."
                  : "Opening Wedding Card..."}
              </span>
              <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
            </button>
            <p className="text-[#f3e5ab]/90 text-xs mt-3 font-serif-body italic drop-shadow-md">
              Step into our celebration of love, culture &amp; togetherness
            </p>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
