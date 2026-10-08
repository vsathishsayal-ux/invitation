import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Phone, MessageSquare, CheckCircle, Heart, User, Sparkles } from 'lucide-react';

export default function RSVP({ weddingData }) {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [attendingStatus, setAttendingStatus] = useState('yes');
  const [blessingMsg, setBlessingMsg] = useState('');
  const [savedBlessings, setSavedBlessings] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_blessings');
      if (stored) {
        setSavedBlessings(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore fallback
    }
  }, []);

  const handleSubmitRSVP = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newBlessing = {
      id: Date.now(),
      name: guestName.trim(),
      status: attendingStatus,
      count: guestCount,
      message: blessingMsg.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    const updated = [newBlessing, ...savedBlessings];
    setSavedBlessings(updated);
    try {
      localStorage.setItem('wedding_blessings', JSON.stringify(updated));
    } catch (err) {}

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#4A0E17', '#F3E5AB']
      });
    } catch (err) {}
  };

  const getWhatsAppLink = (phone, text) => {
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(text || `Hello! I would love to attend the wedding of ${weddingData.brideFirstName} & ${weddingData.groomFirstName}!`);
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  };

  return (
    <section id="rsvp" className="py-16 px-4 relative max-w-4xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#aa771c] font-bold block mb-2">
          Your Presence Is Requested
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#4a0e17] font-bold">
          RSVP &amp; Direct Contacts
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#fdfbf7] rounded-3xl border-2 border-[#d4af37]/50 card-shadow p-6 sm:p-10 relative overflow-hidden"
      >
        <p className="text-center font-serif-heading text-xl sm:text-2xl text-[#4a0e17] font-bold mb-8">
          We would be delighted to celebrate this special day with you.
        </p>

        {/* Quick Action Contact Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          
          {/* WhatsApp RSVP */}
          <a
            href={getWhatsAppLink(weddingData.rsvpWhatsapp, `Hi! Confirming my attendance for ${weddingData.brideFirstName} & ${weddingData.groomFirstName}'s wedding.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl maroon-bg-gradient text-[#fcf6ba] font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#d4af37] hover:scale-105 transition shadow-lg text-center"
          >
            <MessageSquare className="w-4 h-4 text-[#d4af37]" />
            <span>RSVP via WhatsApp</span>
          </a>

          {/* Contact Bride */}
          <a
            href={`tel:${weddingData.bridePhone}`}
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#faf6f0] border border-[#d4af37]/60 text-[#4a0e17] font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#4a0e17] hover:text-[#fcf6ba] transition shadow-md text-center group"
          >
            <Phone className="w-4 h-4 text-[#aa771c] group-hover:text-[#d4af37]" />
            <span>Contact Bride</span>
          </a>

          {/* Contact Groom */}
          <a
            href={`tel:${weddingData.groomPhone}`}
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#faf6f0] border border-[#d4af37]/60 text-[#4a0e17] font-sans-clean font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#4a0e17] hover:text-[#fcf6ba] transition shadow-md text-center group"
          >
            <Phone className="w-4 h-4 text-[#aa771c] group-hover:text-[#d4af37]" />
            <span>Contact Groom</span>
          </a>

        </div>

        {/* Direct Guest Blessing / RSVP Form */}
        <div className="bg-[#faf6f0] p-6 sm:p-8 rounded-2xl border border-[#d4af37]/30">
          <h3 className="font-serif-heading font-bold text-lg text-[#4a0e17] mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
            <span>Send Your Warm Wishes &amp; RSVP</span>
          </h3>
          <p className="text-xs text-gray-600 mb-6">
            Leave your name and a heartfelt blessing message for the couple.
          </p>

          {isSubmitted ? (
            <div className="bg-[#fdfbf7] p-6 rounded-xl border border-[#d4af37] text-center">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-serif-heading font-bold text-lg text-[#4a0e17]">Thank You!</h4>
              <p className="text-xs text-gray-600 mt-1">Your blessings &amp; response have been recorded with warmth.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-xs font-bold text-[#aa771c] underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRSVP} className="space-y-4 font-sans-clean text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar & Family"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d4af37]/50 bg-white focus:outline-none focus:border-[#4a0e17]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Will you attend?</label>
                  <select
                    value={attendingStatus}
                    onChange={(e) => setAttendingStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#d4af37]/50 bg-white focus:outline-none focus:border-[#4a0e17]"
                  >
                    <option value="yes">Joyfully Accept (Attending)</option>
                    <option value="maybe">Will Try to Attend</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Blessing / Wishes Message</label>
                <textarea
                  rows="3"
                  placeholder="May your love grow stronger with each passing day..."
                  value={blessingMsg}
                  onChange={(e) => setBlessingMsg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d4af37]/50 bg-white focus:outline-none focus:border-[#4a0e17]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl maroon-bg-gradient text-[#fcf6ba] font-semibold tracking-wider uppercase text-xs sm:text-sm border border-[#d4af37] hover:opacity-95 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#d4af37]" />
                <span>Submit RSVP &amp; Blessings</span>
              </button>
            </form>
          )}
        </div>

        {/* Display Saved Guest Blessings wall */}
        {savedBlessings.length > 0 && (
          <div className="mt-8">
            <h4 className="font-serif-heading font-bold text-sm uppercase tracking-widest text-[#aa771c] mb-4 text-center">
              Guest Blessings Wall ({savedBlessings.length})
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {savedBlessings.map((b) => (
                <div key={b.id} className="bg-[#faf6f0] p-3.5 rounded-xl border border-[#d4af37]/30 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#4a0e17] mb-1">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#d4af37]" />
                      {b.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal">{b.date}</span>
                  </div>
                  {b.message && <p className="text-gray-700 italic font-serif-body text-sm">"{b.message}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>

    </section>
  );
}
