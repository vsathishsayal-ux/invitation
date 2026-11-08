import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';

export default function WeddingDetails({ weddingData }) {
  return (
    <section id="details" className="section-shell relative py-10 sm:py-12">
      <div className="mb-8 text-center sm:mb-10">
        <span className="section-kicker">Save the date</span>
        <h2 className="section-heading">Wedding details</h2>
        <div className="section-divider" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-card p-5 sm:p-8 lg:p-10"
      >
        <div className="absolute right-0 top-0 z-10 rounded-bl-2xl border-l border-b border-[#d7b168]/70 bg-[#4b1720] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#f8e8b7]">
          Main ceremony
        </div>

        <div className="relative z-10 grid gap-5 md:grid-cols-3">
          <div className="detail-card flex flex-col items-center p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4b1720] text-[#f5dca6] shadow-sm">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#a7701b]">Date</span>
            <p className="font-serif-heading text-xl text-[#4b1720]">{weddingData.displayDate || 'Sunday, 15 December 2026'}</p>
          </div>

          <div className="detail-card flex flex-col items-center p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4b1720] text-[#f5dca6] shadow-sm">
              <Clock className="h-5 w-5" />
            </div>
            <span className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#a7701b]">Time</span>
            <p className="font-serif-heading text-xl text-[#4b1720]">{weddingData.weddingTime}</p>
            {weddingData.muhurthamTime && (
              <span className="mt-2 text-xs font-medium text-[#7a5a45]">Muhurtham: {weddingData.muhurthamTime}</span>
            )}
          </div>

          <div className="detail-card flex flex-col items-center p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4b1720] text-[#f5dca6] shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#a7701b]">Venue</span>
            <p className="font-serif-heading text-xl text-[#4b1720]">{weddingData.venueName}</p>
            <p className="mt-2 text-sm text-[#6a4f43]">{weddingData.venueAddress}</p>
          </div>
        </div>

        {weddingData.googleCalendarUrl && (
          <div className="relative z-10 mt-8 text-center">
            <a
              href={weddingData.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d7b168]/65 bg-[#fffaf5] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#4b1720] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#4b1720] hover:text-[#f8e8b7]"
            >
              <CalendarPlus className="h-4 w-4 text-[#a7701b]" />
              <span>Add to calendar</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}
