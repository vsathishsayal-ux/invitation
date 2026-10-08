import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin } from 'lucide-react';

export default function WeddingHero({ weddingData }) {
  return (
    <section id="welcome" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      
      {/* Decorative Traditional Arch & Border background */}
      <div className="absolute inset-4 sm:inset-8 border border-[#d4af37]/30 rounded-3xl pointer-events-none" />
      <div className="absolute inset-6 sm:inset-10 border-2 border-dashed border-[#d4af37]/20 rounded-2xl pointer-events-none" />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative max-w-3xl mx-auto text-center z-10 py-8 px-4">
        
        {/* Traditional Indian Ganesha / Om / Floral Symbol */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full maroon-bg-gradient border-2 border-[#d4af37] p-3 shadow-xl flex items-center justify-center group transform hover:scale-105 transition"
        >
          <svg className="w-10 h-10 text-[#fcf6ba]" viewBox="0 0 100 100" fill="currentColor">
            {/* Elegant Floral / Mandala Symbol SVG */}
            <path d="M50 5 C60 25 75 40 95 50 C75 60 60 75 50 95 C40 75 25 60 5 50 C25 40 40 25 5 5 Z" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="14" fill="#d4af37" opacity="0.8" />
            <circle cx="50" cy="50" r="6" fill="#4a0e17" />
          </svg>
        </motion.div>

        {/* Welcome Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#aa771c] font-sans-clean font-semibold mb-4"
        >
          {weddingData.welcomeTitle || "Together with their families"}
        </motion.p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1" />
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1" />
        </div>

        {/* BRIDE & GROOM NAMES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="py-4"
        >
          {/* Bride Name */}
          <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl text-[#4a0e17] font-bold tracking-tight gold-text-gradient drop-shadow-sm leading-tight">
            {weddingData.brideName}
          </h1>

          {/* Ampersand */}
          <div className="my-2 sm:my-3">
            <span className="font-script text-4xl sm:text-6xl text-[#aa771c] block select-none drop-shadow">
              &amp;
            </span>
          </div>

          {/* Groom Name */}
          <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl text-[#4a0e17] font-bold tracking-tight gold-text-gradient drop-shadow-sm leading-tight">
            {weddingData.groomName}
          </h1>
        </motion.div>

        {/* Decorative Floral Element */}
        <div className="my-6">
          <svg className="w-32 sm:w-48 h-6 mx-auto text-[#d4af37]" viewBox="0 0 200 20" fill="currentColor">
            <path d="M0 10 Q50 0 100 10 Q150 20 200 10 Q150 0 100 10 Q50 20 0 10 Z" opacity="0.3" />
            <circle cx="100" cy="10" r="4" />
            <circle cx="70" cy="10" r="2" />
            <circle cx="130" cy="10" r="2" />
          </svg>
        </div>

        {/* Invitation Callout */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif-body italic text-lg sm:text-2xl text-[#5c3a21] max-w-xl mx-auto font-medium"
        >
          We invite you to celebrate our wedding
        </motion.p>

        {/* Quick Date & Location Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-sans-clean"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdfbf7] border border-[#d4af37]/40 text-[#4a0e17] shadow-sm font-medium">
            <Calendar className="w-4 h-4 text-[#aa771c]" />
            <span>{weddingData.displayDate || "15 December 2026"}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdfbf7] border border-[#d4af37]/40 text-[#4a0e17] shadow-sm font-medium">
            <MapPin className="w-4 h-4 text-[#aa771c]" />
            <span>{weddingData.venueName || "Chennai, Tamil Nadu"}</span>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
