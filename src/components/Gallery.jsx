import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Heart, Maximize2 } from 'lucide-react';

export default function Gallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-16 px-4 relative max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#aa771c] font-bold block mb-2">
          Pre-Wedding &amp; Moments
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#4a0e17] font-bold">
          Our Special Memories
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3" />
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {gallery.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedImage(item)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 border-[#d4af37]/30 shadow-md bg-[#faf6f0]"
          >
            {/* Image */}
            <img
              src={item.url}
              alt={item.title || "Wedding Memory"}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4a0e17]/90 via-[#4a0e17]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-[#fcf6ba]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif-heading font-bold text-base text-[#fcf6ba]">{item.title}</h4>
                  <p className="text-xs text-[#d4af37] font-serif-body italic">{item.caption}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1a0306]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[#fdfbf7] rounded-3xl overflow-hidden border-2 border-[#d4af37] card-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full maroon-bg-gradient border border-[#d4af37] text-[#fcf6ba] flex items-center justify-center hover:scale-110 transition shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image */}
              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Image Footer Caption */}
              <div className="p-6 text-center bg-[#fdfbf7] border-t border-[#d4af37]/30">
                <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37] mx-auto mb-2" />
                <h3 className="font-serif-heading text-xl text-[#4a0e17] font-bold">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-[#8c6b2d] font-serif-body italic mt-1">
                  {selectedImage.caption}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
