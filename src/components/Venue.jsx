import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function Venue({ weddingData }) {
  return (
    <section id="venue" className="section-shell relative py-10 sm:py-12">
      <div className="mb-8 text-center sm:mb-10">
        <span className="section-kicker">Location &amp; directions</span>
        <h2 className="section-heading">The wedding venue</h2>
        <div className="section-divider" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid overflow-hidden rounded-[2rem] border border-[#d7b168]/50 bg-[#fffdfb] shadow-[0_18px_40px_rgba(35,17,19,0.08)] md:grid-cols-2"
      >
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d7b168]/50 bg-[#fffaf5] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#a7701b]">
              <Compass className="h-3.5 w-3.5" />
              Event destination
            </div>

            <h3 className="font-serif-heading text-3xl text-[#4b1720]">{weddingData.venueName}</h3>
            <p className="mt-3 text-base leading-relaxed text-[#4d3b35]">{weddingData.venueAddress}</p>

            {weddingData.venueLandmark && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#d7b168]/35 bg-[#fffaf5] p-3 text-sm text-[#6e554d]">
                <MapPin className="mt-0.5 h-4 w-4 text-[#a7701b]" />
                <span><span className="font-semibold text-[#4b1720]">Landmark:</span> {weddingData.venueLandmark}</span>
              </div>
            )}
          </div>

          <div className="mt-7">
            <a
              href={weddingData.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#4b1720] px-5 py-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#f8e8b7] shadow-md transition hover:-translate-y-0.5"
            >
              <Navigation className="h-4 w-4 text-[#f5dca6]" />
              <span>View on Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="min-h-[280px] border-t border-[#d7b168]/40 bg-[#f4eee8] md:min-h-[360px] md:border-l md:border-t-0">
          {weddingData.embedMapUrl ? (
            <iframe
              title="Venue Google Map"
              src={weddingData.embedMapUrl}
              className="h-full min-h-[280px] w-full border-0 md:min-h-[360px]"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <MapPin className="mb-2 h-12 w-12 text-[#a7701b]" />
              <p className="font-serif-heading text-2xl text-[#4b1720]">{weddingData.venueName}</p>
              <p className="mt-2 max-w-xs text-sm text-[#6a4f43]">{weddingData.venueAddress}</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
