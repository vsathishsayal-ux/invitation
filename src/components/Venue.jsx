import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function Venue({ weddingData }) {
  return (
    <section id="venue" className="py-16 px-4 relative max-w-4xl mx-auto">
      
      {/* Section Title */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#aa771c] font-bold block mb-2">
          Location &amp; Directions
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#4a0e17] font-bold">
          The Wedding Venue
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3" />
      </div>

      {/* Main Venue Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#fdfbf7] rounded-3xl border-2 border-[#d4af37]/50 card-shadow overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left Venue Details */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf6f0] border border-[#d4af37]/40 text-[#aa771c] text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Event Destination</span>
            </div>

            <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#4a0e17] font-bold mb-3">
              {weddingData.venueName}
            </h3>

            <p className="text-sm text-[#3c2a21] leading-relaxed mb-4">
              {weddingData.venueAddress}
            </p>

            {weddingData.venueLandmark && (
              <div className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#d4af37]/30 text-xs text-[#8c6b2d] mb-6 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span><strong>Landmark:</strong> {weddingData.venueLandmark}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={weddingData.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full maroon-bg-gradient text-[#fcf6ba] font-sans-clean font-semibold text-xs sm:text-sm uppercase tracking-wider border border-[#d4af37] hover:scale-105 transition shadow-lg"
            >
              <Navigation className="w-4 h-4 text-[#d4af37]" />
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Embedded Map Preview */}
        <div className="relative min-h-[260px] sm:min-h-[340px] bg-[#e5e3df] border-t md:border-t-0 md:border-l border-[#d4af37]/40 overflow-hidden">
          {weddingData.embedMapUrl ? (
            <iframe
              title="Venue Google Map"
              src={weddingData.embedMapUrl}
              className="w-full h-full border-0 min-h-[280px]"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#f7f3ec]">
              <MapPin className="w-12 h-12 text-[#d4af37] mb-2" />
              <p className="font-serif-heading font-bold text-[#4a0e17]">{weddingData.venueName}</p>
              <p className="text-xs text-gray-600 mt-1 max-w-xs">{weddingData.venueAddress}</p>
            </div>
          )}
        </div>

      </motion.div>

    </section>
  );
}
