import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import FloralBorder from './FloralBorder';

export default function WeddingHero({ weddingData }) {
  return (
    <section id="welcome" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Hero Card Wrapped in Integrated Floral Border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-3xl mx-auto z-20"
      >
        <FloralBorder className="bg-[#fdfbf7] p-8 sm:p-12 text-center relative">
          
          {/* REALISTIC FLORAL GARLAND ARCH BANNER */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="w-full max-w-md sm:max-w-lg mx-auto mb-4 overflow-hidden rounded-xl"
          >
            <img
              src="/assets/floral_garland.jpg"
              alt="Traditional Wedding Floral Garland"
              className="w-full h-auto object-contain mix-blend-multiply filter drop-shadow-md"
            />
          </motion.div>

          {/* Welcome Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#aa771c] font-sans-clean font-semibold mb-3"
          >
            {weddingData.welcomeTitle || "Together with their families"}
          </motion.p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-5">
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1" />
          </div>

          {/* BRIDE & GROOM NAMES (HIGH CONTRAST DEEP MAROON & GOLD ACCENT) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="py-2"
          >
            {/* Bride Name */}
            <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl text-[#4a0e17] font-extrabold tracking-tight drop-shadow-md leading-tight">
              {weddingData.brideName}
            </h1>

            {/* Ampersand */}
            <div className="my-2 sm:my-3">
              <span className="font-script text-4xl sm:text-6xl text-[#aa771c] block select-none drop-shadow">
                &amp;
              </span>
            </div>

            {/* Groom Name */}
            <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl text-[#4a0e17] font-extrabold tracking-tight drop-shadow-md leading-tight">
              {weddingData.groomName}
            </h1>
          </motion.div>

          {/* Invitation Callout */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-serif-body italic text-lg sm:text-2xl text-[#5c3a21] max-w-xl mx-auto font-medium mt-4"
          >
            We invite you to celebrate our wedding
          </motion.p>

          {/* Quick Date & Location Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-sans-clean relative z-20"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#faf6f0] border border-[#d4af37]/60 text-[#4a0e17] shadow-sm font-semibold">
              <Calendar className="w-4 h-4 text-[#aa771c]" />
              <span>{weddingData.displayDate || "15 December 2026"}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#faf6f0] border border-[#d4af37]/60 text-[#4a0e17] shadow-sm font-semibold">
              <MapPin className="w-4 h-4 text-[#aa771c]" />
              <span>{weddingData.venueName || "Chennai, Tamil Nadu"}</span>
            </div>
          </motion.div>

        </FloralBorder>
      </motion.div>

    </section>
  );
}
