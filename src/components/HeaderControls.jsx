import React, { useState, useEffect } from 'react';
import { Music, VolumeX, Edit3, RotateCcw, Calendar, MapPin, Image as ImageIcon, Heart, Send } from 'lucide-react';

export default function HeaderControls({ isMusicPlaying, toggleMusic, onReopenEnvelope, onOpenEditModal, brideName, groomName }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#4a0e17]/90 backdrop-blur-md border-b border-[#d4af37]/40 shadow-lg py-2.5'
          : 'bg-gradient-to-b from-[#3a0910]/80 via-[#3a0910]/30 to-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        {/* Left Monogram / Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('welcome')}>
          <div className="w-9 h-9 rounded-full maroon-bg-gradient border border-[#d4af37] flex items-center justify-center text-[#fcf6ba] font-serif-heading font-bold text-xs shadow-md">
            S &amp; A
          </div>
          <div className="hidden sm:block">
            <span className="font-serif-heading text-xs tracking-wider text-[#fcf6ba] block font-semibold">
              {groomName?.split(' ')[0]} &amp; {brideName?.split(' ')[0]}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#d4af37]">
              Wedding Celebration
            </span>
          </div>
        </div>

        {/* Center Quick Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-sans-clean font-medium text-[#fcf6ba]/90">
          <button onClick={() => scrollToSection('welcome')} className="hover:text-[#d4af37] transition">Home</button>
          <button onClick={() => scrollToSection('details')} className="hover:text-[#d4af37] transition">Details</button>
          <button onClick={() => scrollToSection('countdown')} className="hover:text-[#d4af37] transition">Countdown</button>
          <button onClick={() => scrollToSection('events')} className="hover:text-[#d4af37] transition">Events</button>
          <button onClick={() => scrollToSection('gallery')} className="hover:text-[#d4af37] transition">Memories</button>
          <button onClick={() => scrollToSection('venue')} className="hover:text-[#d4af37] transition">Venue</button>
          <button onClick={() => scrollToSection('rsvp')} className="hover:text-[#d4af37] transition">RSVP</button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Re-open Envelope button */}
          <button
            onClick={onReopenEnvelope}
            title="Re-open Invitation Envelope"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdfbf7]/10 hover:bg-[#fdfbf7]/20 border border-[#d4af37]/40 text-[#fcf6ba] text-xs font-sans-clean transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Envelope</span>
          </button>

          {/* Personalize / Edit button */}
          <button
            onClick={onOpenEditModal}
            title="Customize Wedding Data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37] text-[#fcf6ba] text-xs font-sans-clean transition font-medium"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Customize</span>
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            title={isMusicPlaying ? "Mute Background Music" : "Play Background Music"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4a0e17] border border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:scale-105 transition shadow-md"
          >
            {isMusicPlaying ? (
              <Music className="w-4 h-4 text-[#d4af37] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
