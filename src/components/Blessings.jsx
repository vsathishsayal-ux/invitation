import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Blessings({ weddingData }) {
  return (
    <section className="py-16 px-4 relative max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#faf6f0] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden card-shadow"
      >
        {/* Subtle Decorative Floral Background motif */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-full maroon-bg-gradient border border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-md">
          <Heart className="w-6 h-6 fill-[#d4af37]" />
        </div>

        <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#4a0e17] font-bold mb-3">
          Blessings &amp; Wishes
        </h3>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />

        <p className="font-serif-body text-xl sm:text-2xl text-[#3a2517] italic leading-relaxed font-medium">
          "{weddingData.blessingsText || "Your presence and blessings mean the world to us."}"
        </p>

        <p className="text-xs uppercase tracking-[0.25em] text-[#aa771c] font-sans-clean font-bold mt-6">
          With Love, Joy &amp; Gratitude
        </p>

      </motion.div>
    </section>
  );
}
