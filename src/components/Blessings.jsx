import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Blessings({ weddingData }) {
  return (
    <section className="section-shell relative py-10 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-card p-8 text-center sm:p-12"
      >
        <div className="pointer-events-none absolute inset-0 mandala-bg opacity-18" aria-hidden="true" />

        <div className="relative z-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#4b1720] text-[#f5dca6] shadow-md">
            <Heart className="h-6 w-6" />
          </div>

          <h3 className="font-serif-heading text-3xl text-[#4b1720] sm:text-4xl">Blessings &amp; wishes</h3>
          <div className="mx-auto my-5 h-px w-20 bg-gradient-to-r from-transparent via-[#d7b168] to-transparent" />

          <p className="mx-auto max-w-2xl font-serif-body text-xl italic leading-relaxed text-[#392821] sm:text-2xl">
            “{weddingData.blessingsText || 'Your presence and blessings mean the world to us.'}”
          </p>

          <p className="mt-6 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[#a7701b]">
            With love, joy &amp; gratitude
          </p>
        </div>
      </motion.div>
    </section>
  );
}
