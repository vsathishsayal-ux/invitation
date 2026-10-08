import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';

export default function InvitationMessage({ weddingData }) {
  return (
    <section className="py-16 px-4 relative max-w-4xl mx-auto">
      
      {/* Decorative Envelope Frame Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#fdfbf7] rounded-2xl border-2 border-[#d4af37]/50 card-shadow p-8 sm:p-12 text-center paper-texture overflow-hidden"
      >
        {/* Subtle Mandala Background watermark */}
        <div className="absolute inset-0 mandala-bg opacity-40 pointer-events-none" />

        {/* Top Quote Icon */}
        <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#faf6f0] border border-[#d4af37]/40 flex items-center justify-center text-[#aa771c]">
          <Quote className="w-6 h-6 rotate-180" />
        </div>

        {/* Main Invitation Note */}
        <p className="font-serif-body text-xl sm:text-2xl text-[#3a2517] leading-relaxed max-w-2xl mx-auto font-medium italic">
          "{weddingData.invitationMessage}"
        </p>

        {/* Decorative Floral Divider */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-8" />

        {/* Parents Blessings Sub-section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-2 text-center font-sans-clean">
          
          {/* Bride Parents */}
          <div className="bg-[#faf6f0]/80 p-5 rounded-xl border border-[#d4af37]/30">
            <span className="text-[10px] uppercase tracking-widest text-[#aa771c] font-bold block mb-1">
              Bride's Parents
            </span>
            <p className="font-serif-heading font-semibold text-[#4a0e17] text-base sm:text-lg">
              {weddingData.brideParents}
            </p>
          </div>

          {/* Groom Parents */}
          <div className="bg-[#faf6f0]/80 p-5 rounded-xl border border-[#d4af37]/30">
            <span className="text-[10px] uppercase tracking-widest text-[#aa771c] font-bold block mb-1">
              Groom's Parents
            </span>
            <p className="font-serif-heading font-semibold text-[#4a0e17] text-base sm:text-lg">
              {weddingData.groomParents}
            </p>
          </div>

        </div>

        {/* Grandparents / Ancestral Blessings */}
        {weddingData.grandParents && (
          <p className="mt-6 text-xs text-[#8c6b2d] font-serif-body italic">
            {weddingData.grandParents}
          </p>
        )}

      </motion.div>

    </section>
  );
}
