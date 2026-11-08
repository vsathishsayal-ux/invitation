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
    <section id="events" className="section-shell relative py-10 sm:py-12">
      <div className="mb-8 text-center sm:mb-10">
        <span className="section-kicker">Wedding itinerary</span>
        <h2 className="section-heading">Celebration functions</h2>
        <div className="section-divider" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((evt, index) => {
          const IconComponent = iconMap[evt.icon] || Sparkles;

          return (
            <motion.div
              key={evt.id || index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-[1.7rem] border border-[#d7b168]/45 bg-[#fffdfb] p-6 shadow-[0_12px_30px_rgba(35,17,19,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#4b1720_0%,#c79a47_50%,#4b1720_100%)]" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4b1720] text-[#f5dca6] shadow-sm">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="font-serif-heading text-2xl text-[#4b1720]">{evt.title}</h3>
              </div>

              <p className="mb-5 border-b border-[#d7b168]/25 pb-4 font-serif-body text-lg italic leading-relaxed text-[#5e463f]">
                {evt.description}
              </p>

              <div className="space-y-3 text-sm">
                <div className="detail-card flex items-start gap-3 p-3">
                  <Clock className="mt-0.5 h-4 w-4 text-[#a7701b]" />
                  <div>
                    <span className="block font-bold text-[#4b1720]">{evt.date}</span>
                    <span className="text-[#5c473d]">{evt.time}</span>
                  </div>
                </div>

                <div className="detail-card flex items-start gap-3 p-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#a7701b]" />
                  <div>
                    <span className="block font-bold text-[#4b1720]">Venue</span>
                    <span className="text-[#5c473d]">{evt.venue}</span>
                  </div>
                </div>

                {evt.attire && (
                  <div className="detail-card flex items-start gap-3 p-3">
                    <Shirt className="mt-0.5 h-4 w-4 text-[#a7701b]" />
                    <div>
                      <span className="block font-bold text-[#4b1720]">Suggested attire</span>
                      <span className="text-[#7a5a45]">{evt.attire}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
