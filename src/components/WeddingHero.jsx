import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CalendarDays } from 'lucide-react';

export default function WeddingHero({ weddingData }) {
  return (
    <section id="welcome" className="section-shell relative pb-7 sm:pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.8 }}
        className="section-card p-6 sm:p-8 lg:p-10"
      >
        <div className="pointer-events-none absolute inset-0 mandala-bg opacity-20" aria-hidden="true" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <span className="section-kicker">The wedding celebration</span>
            <h2 className="section-heading leading-tight">
              A new chapter begins with love, blessings, and togetherness.
            </h2>
            <div className="section-divider lg:mx-0" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {weddingData.invitationMessage}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7b168]/55 bg-[#fffaf5] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#5f4339]">
                <CalendarDays className="h-3.5 w-3.5 text-[#b77a20]" />
                {weddingData.displayDate}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7b168]/55 bg-[#fffaf5] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#5f4339]">
                <Heart className="h-3.5 w-3.5 text-[#b77a20]" />
                {weddingData.weddingTime}
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="soft-glow relative overflow-hidden rounded-[2rem] border border-[#d7b168]/60 bg-[linear-gradient(180deg,#f9f4ee_0%,#f1e7df_100%)] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(199,154,71,0.18),transparent_45%)]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[#d7b168]/40 bg-[#f5e9e0]">
                <img
                  src="/preloader.jpeg"
                  alt="Couple portrait"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4 rounded-[1.2rem] border border-[#d7b168]/40 bg-[#fffaf5] px-4 py-3 text-center">
                <p className="font-serif-heading text-2xl tracking-[0.12em] text-[#4b1720]">
                  {weddingData.groomName} <span className="mx-1 text-[#b77a20]">&amp;</span> {weddingData.brideName}
                </p>
              </div>
            </div>
            <div className="absolute -left-3 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7b168]/60 bg-[#fffaf5] text-[#b77a20] shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="absolute -right-3 bottom-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7b168]/60 bg-[#fffaf5] text-[#b77a20] shadow-md">
              <Heart className="h-5 w-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
