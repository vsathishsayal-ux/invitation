import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Sparkles } from 'lucide-react';
import { initialWeddingData } from '../data/weddingData';

export default function PersonalizeModal({ isOpen, onClose, currentData, onSave }) {
  const [formData, setFormData] = useState(currentData);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleResetDefault = () => {
    setFormData(initialWeddingData);
    onSave(initialWeddingData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#1a0306]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-2xl w-full bg-[#fdfbf7] rounded-3xl border-2 border-[#d4af37] card-shadow overflow-hidden my-8"
        >
          {/* Header */}
          <div className="maroon-bg-gradient text-[#fcf6ba] p-6 border-b border-[#d4af37] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <h2 className="font-serif-heading font-bold text-xl">Personalize Invitation</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#fcf6ba]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto font-sans-clean text-xs sm:text-sm">
            
            <p className="text-xs text-gray-600 mb-4 bg-[#faf6f0] p-3 rounded-xl border border-[#d4af37]/30">
              Customize the bride &amp; groom details, wedding date, venue, and contact links below to personalize this wedding invitation in real time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Bride Full Name</label>
                <input
                  type="text"
                  value={formData.brideName || ''}
                  onChange={(e) => {
                    handleChange('brideName', e.target.value);
                    if (!formData.brideFirstName) {
                      handleChange('brideFirstName', e.target.value.split(' ')[0]);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Groom Full Name</label>
                <input
                  type="text"
                  value={formData.groomName || ''}
                  onChange={(e) => {
                    handleChange('groomName', e.target.value);
                    if (!formData.groomFirstName) {
                      handleChange('groomFirstName', e.target.value.split(' ')[0]);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Wedding Date String (For Countdown)</label>
                <input
                  type="text"
                  value={formData.weddingDate || ''}
                  onChange={(e) => handleChange('weddingDate', e.target.value)}
                  placeholder="2026-12-15T10:30:00"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Display Date Text</label>
                <input
                  type="text"
                  value={formData.displayDate || ''}
                  onChange={(e) => handleChange('displayDate', e.target.value)}
                  placeholder="Sunday, 15 December 2026"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Venue Name</label>
              <input
                type="text"
                value={formData.venueName || ''}
                onChange={(e) => handleChange('venueName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Venue Address</label>
              <textarea
                rows="2"
                value={formData.venueAddress || ''}
                onChange={(e) => handleChange('venueAddress', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Bride Phone Number</label>
                <input
                  type="text"
                  value={formData.bridePhone || ''}
                  onChange={(e) => handleChange('bridePhone', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Groom Phone Number</label>
                <input
                  type="text"
                  value={formData.groomPhone || ''}
                  onChange={(e) => handleChange('groomPhone', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4a0e17] focus:outline-none"
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetDefault}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Default</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl maroon-bg-gradient text-[#fcf6ba] font-bold border border-[#d4af37] flex items-center gap-2 shadow-md hover:opacity-95"
                >
                  <Save className="w-4 h-4 text-[#d4af37]" />
                  <span>Save Personalization</span>
                </button>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
