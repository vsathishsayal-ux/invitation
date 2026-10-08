import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';

export default function WeddingDetails({ weddingData }) {
  return (
    <section id="details" className="py-16 px-4 relative max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#aa771c] font-bold block mb-2">
          Save The Date
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#4a0e17] font-bold">
          Wedding Ceremony Details
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3" />
      </div>

      {/* Main Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#fdfbf7] rounded-2xl border-2 border-[#d4af37]/60 card-shadow p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Gold Corner Ribbon / Badge */}
        <div className="absolute top-0 right-0 maroon-bg-gradient text-[#fcf6ba] text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-bl-xl border-l border-b border-[#d4af37]">
          Main Ceremony
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          
          {/* Item 1: DATE */}
          <div className="flex flex-col items-center text-center p-6 bg-[#faf6f0] rounded-xl border border-[#d4af37]/30 hover:border-[#d4af37] transition">
            <div className="w-12 h-12 rounded-full maroon-bg-gradient text-[#fcf6ba] flex items-center justify-center mb-4 shadow-md border border-[#d4af37]">
              <Calendar className="w-6 h-6 text-[#d4af37]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#8c6b2d] font-bold mb-1">
              Date
            </span>
            <p className="font-serif-heading font-bold text-lg text-[#4a0e17]">
              {weddingData.displayDate || "Sunday, 15 December 2026"}
            </p>
          </div>

          {/* Item 2: TIME */}
          <div className="flex flex-col items-center text-center p-6 bg-[#faf6f0] rounded-xl border border-[#d4af37]/30 hover:border-[#d4af37] transition">
            <div className="w-12 h-12 rounded-full maroon-bg-gradient text-[#fcf6ba] flex items-center justify-center mb-4 shadow-md border border-[#d4af37]">
              <Clock className="w-6 h-6 text-[#d4af37]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#8c6b2d] font-bold mb-1">
              Time &amp; Muhurtham
            </span>
            <p className="font-serif-heading font-bold text-lg text-[#4a0e17]">
              {weddingData.weddingTime}
            </p>
            {weddingData.muhurthamTime && (
              <span className="text-xs text-[#aa771c] font-medium mt-1">
                Muhurtham: {weddingData.muhurthamTime}
              </span>
            )}
          </div>

          {/* Item 3: VENUE */}
          <div className="flex flex-col items-center text-center p-6 bg-[#faf6f0] rounded-xl border border-[#d4af37]/30 hover:border-[#d4af37] transition">
            <div className="w-12 h-12 rounded-full maroon-bg-gradient text-[#fcf6ba] flex items-center justify-center mb-4 shadow-md border border-[#d4af37]">
              <MapPin className="w-6 h-6 text-[#d4af37]" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#8c6b2d] font-bold mb-1">
              Venue
            </span>
            <p className="font-serif-heading font-bold text-base text-[#4a0e17] line-clamp-2">
              {weddingData.venueName}
            </p>
            <p className="text-xs text-[#6e532b] mt-1 line-clamp-2">
              {weddingData.venueAddress}
            </p>
          </div>

        </div>

        {/* Action Button: Add to Calendar */}
        {weddingData.googleCalendarUrl && (
          <div className="mt-8 text-center">
            <a
              href={weddingData.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#faf6f0] border border-[#d4af37] text-[#4a0e17] font-sans-clean font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#4a0e17] hover:text-[#fcf6ba] transition shadow-md group"
            >
              <CalendarPlus className="w-4 h-4 text-[#aa771c] group-hover:text-[#d4af37]" />
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#fcf6ba]" />
            </a>
          </div>
        )}

      </motion.div>

    </section>
  );
}
