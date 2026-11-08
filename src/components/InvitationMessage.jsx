import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

export default function InvitationMessage({ weddingData }) {
  return (
    <section id="message" className="section-shell relative py-10 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="section-card p-6 sm:p-8 lg:p-12"
      >
        <div className="pointer-events-none absolute inset-0 mandala-bg opacity-20" aria-hidden="true" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#d7b168]/50 bg-[#fffaf5] text-[#a7701b] shadow-sm">
            <Quote className="h-6 w-6 rotate-180" />
          </div>

          <p className="font-script text-4xl italic leading-none text-[#4b1720] sm:text-5xl">
            With the blessings of our beloved families
          </p>

          <div className="mx-auto my-6 h-px w-20 bg-gradient-to-r from-transparent via-[#d7b168] to-transparent" />

          <p className="mx-auto max-w-3xl font-serif-body text-xl leading-relaxed text-[#392821] italic sm:text-2xl">
            “{weddingData.invitationMessage}”
          </p>

          <div className="mt-8 grid gap-5 text-left md:grid-cols-2">
            <div className="detail-card p-5">
              <div className="mb-3 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[#a7701b]">
                <Sparkles className="h-3.5 w-3.5" />
                Bride's parents
              </div>
              <p className="font-serif-heading text-xl text-[#4b1720]">{weddingData.brideParents}</p>
            </div>

            <div className="detail-card p-5">
              <div className="mb-3 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-[#a7701b]">
                <Sparkles className="h-3.5 w-3.5" />
                Groom's parents
              </div>
              <p className="font-serif-heading text-xl text-[#4b1720]">{weddingData.groomParents}</p>
            </div>
          </div>

          {weddingData.grandParents && (
            <p className="mt-6 text-sm font-serif-body italic text-[#7a5a45]">
              {weddingData.grandParents}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
