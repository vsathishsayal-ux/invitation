import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, GlassWater, Clock, MapPin, Shirt } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  GlassWater: GlassWater,
};

export default function Events({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <section id="events" className="py-16 px-4 relative max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#aa771c] font-bold block mb-2">
          Wedding Itinerary
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#4a0e17] font-bold">
          Celebration Functions
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3" />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {events.map((evt, index) => {
          const IconComponent = iconMap[evt.icon] || Sparkles;
          
          return (
            <motion.div
              key={evt.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-[#fdfbf7] rounded-2xl border-2 border-[#d4af37]/40 card-shadow p-6 flex flex-col justify-between hover:border-[#d4af37] transition group relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 maroon-bg-gradient" />

              <div>
                {/* Event Icon & Title Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full maroon-bg-gradient text-[#fcf6ba] flex items-center justify-center border border-[#d4af37] shadow-sm">
                    <IconComponent className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif-heading font-bold text-xl text-[#4a0e17] group-hover:text-[#aa771c] transition">
                    {evt.title}
                  </h3>
                </div>

                <p className="text-xs text-[#5c4233] leading-relaxed mb-6 font-serif-body italic">
                  {evt.description}
                </p>

                {/* Details List */}
                <div className="space-y-3 text-xs font-sans-clean">
                  <div className="flex items-start gap-2.5 text-[#3a2517] bg-[#faf6f0] p-2.5 rounded-lg border border-[#d4af37]/20">
                    <Clock className="w-4 h-4 text-[#aa771c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[#4a0e17]">{evt.date}</span>
                      <span className="text-gray-600">{evt.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-[#3a2517] bg-[#faf6f0] p-2.5 rounded-lg border border-[#d4af37]/20">
                    <MapPin className="w-4 h-4 text-[#aa771c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#4a0e17] block">Venue</span>
                      <span className="text-gray-600">{evt.venue}</span>
                    </div>
                  </div>

                  {evt.attire && (
                    <div className="flex items-start gap-2.5 text-[#3a2517] bg-[#faf6f0] p-2.5 rounded-lg border border-[#d4af37]/20">
                      <Shirt className="w-4 h-4 text-[#aa771c] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#4a0e17] block">Suggested Attire</span>
                        <span className="text-[#aa771c] font-medium">{evt.attire}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
