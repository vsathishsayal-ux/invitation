import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Countdown({ targetDateString }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateString || "2026-12-15T10:30:00").getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsPast(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateString]);

  return (
    <section id="countdown" className="py-16 px-4 relative max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="maroon-bg-gradient rounded-3xl p-8 sm:p-12 border-2 border-[#d4af37] shadow-2xl text-center relative overflow-hidden"
      >
        {/* Subtle Decorative Golden Rings in background */}
        <div className="absolute -top-16 -left-16 w-48 h-48 border border-[#d4af37]/20 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 border border-[#d4af37]/20 rounded-full pointer-events-none" />

        {/* Section Heading */}
        <div className="relative z-10 mb-8">
          <Heart className="w-8 h-8 text-[#d4af37] mx-auto mb-3 animate-pulse" />
          <h2 className="font-serif-heading text-2xl sm:text-4xl text-[#fcf6ba] font-bold">
            Counting Down To Our Special Day
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3" />
        </div>

        {/* Countdown Timer Display */}
        {isPast ? (
          <div className="py-6 text-center text-[#fcf6ba] font-serif-heading text-2xl font-bold">
            🎉 The Celebration Has Begun! 🎉
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto relative z-10">
            
            {/* Days */}
            <div className="bg-[#fdfbf7]/10 backdrop-blur-md rounded-2xl border border-[#d4af37]/40 p-3 sm:p-5 flex flex-col items-center shadow-inner">
              <span className="font-serif-heading text-2xl sm:text-5xl font-bold text-[#fcf6ba]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="bg-[#fdfbf7]/10 backdrop-blur-md rounded-2xl border border-[#d4af37]/40 p-3 sm:p-5 flex flex-col items-center shadow-inner">
              <span className="font-serif-heading text-2xl sm:text-5xl font-bold text-[#fcf6ba]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-[#fdfbf7]/10 backdrop-blur-md rounded-2xl border border-[#d4af37]/40 p-3 sm:p-5 flex flex-col items-center shadow-inner">
              <span className="font-serif-heading text-2xl sm:text-5xl font-bold text-[#fcf6ba]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-[#fdfbf7]/10 backdrop-blur-md rounded-2xl border border-[#d4af37]/40 p-3 sm:p-5 flex flex-col items-center shadow-inner">
              <span className="font-serif-heading text-2xl sm:text-5xl font-bold text-[#fcf6ba]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                Seconds
              </span>
            </div>

          </div>
        )}

      </motion.div>
    </section>
  );
}
