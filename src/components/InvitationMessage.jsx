import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import FloralBorder from './FloralBorder';

export default function InvitationMessage({ weddingData }) {
  return (
    <section id="message" className="py-16 px-4 relative max-w-4xl mx-auto">
      
      {/* Decorative Envelope Frame Card with Integrated Floral Border */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <FloralBorder className="bg-[#fdfbf7] p-8 sm:p-12 text-center relative">
          
          {/* Subtle Mandala Background watermark */}
          <div className="absolute inset-0 mandala-bg opacity-25 pointer-events-none" />

          {/* Top Quote Icon */}
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#faf6f0] border border-[#d4af37]/40 flex items-center justify-center text-[#aa771c] shadow-sm relative z-20">
            <Quote className="w-6 h-6 rotate-180" />
          </div>

          {/* Main Invitation Note */}
          <p className="font-serif-body text-xl sm:text-2xl text-[#3a2517] leading-relaxed max-w-2xl mx-auto font-medium italic relative z-20">
            "{weddingData.invitationMessage}"
          </p>

          {/* Decorative Floral Divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-8 relative z-20" />

          {/* Parents Blessings Sub-section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-2 text-center font-sans-clean relative z-20">
            
            {/* Bride Parents */}
            <div className="bg-[#faf6f0]/90 p-5 rounded-2xl border border-[#d4af37]/40 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#aa771c] font-bold block mb-1">
                Bride's Parents
              </span>
              <p className="font-serif-heading font-semibold text-[#4a0e17] text-base sm:text-lg">
                {weddingData.brideParents}
              </p>
            </div>

            {/* Groom Parents */}
            <div className="bg-[#faf6f0]/90 p-5 rounded-2xl border border-[#d4af37]/40 shadow-sm">
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
            <p className="mt-6 text-xs text-[#8c6b2d] font-serif-body italic relative z-20 font-semibold">
              {weddingData.grandParents}
            </p>
          )}

        </FloralBorder>
      </motion.div>

    </section>
  );
}
