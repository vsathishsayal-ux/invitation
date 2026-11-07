import React, { useState, useEffect } from 'react';
import { Edit3, RotateCcw, Menu, X } from 'lucide-react';

export default function HeaderControls({
  onReopenEnvelope,
  onOpenEditModal,
  brideName,
  groomName
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      const top = window.scrollY + el.getBoundingClientRect().top - headerHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const groomInit = groomName?.[0] || 'S';
  const brideInit = brideName?.[0] || 'A';
  const navItems = [
    ['Home', 'welcome'],
    ['Invitation', 'message'],
    ['Details', 'details'],
    ['Countdown', 'countdown'],
    ['Events', 'events'],
    ['Venue', 'venue'],
    ['RSVP', 'rsvp'],
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#4a0e17]/95 backdrop-blur-md border-b border-[#d4af37]/40 shadow-lg py-2.5'
          : 'bg-gradient-to-b from-[#3a0910]/90 via-[#3a0910]/40 to-transparent py-4'
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        {/* Left Monogram / Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('welcome')}>
          <div className="w-9 h-9 rounded-full maroon-bg-gradient border-2 border-[#d4af37] flex items-center justify-center text-[#fcf6ba] font-serif-heading font-bold text-xs shadow-md">
            {groomInit} &amp; {brideInit}
          </div>
          <div className="hidden sm:block">
            <span className="font-serif-heading text-xs tracking-wider text-[#fcf6ba] block font-semibold">
              {groomName?.split(' ')[0]} &amp; {brideName?.split(' ')[0]}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#d4af37]">
              Wedding Invitation
            </span>
          </div>
        </div>

        {/* Center Quick Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 text-xs uppercase tracking-widest font-sans-clean font-medium text-[#fcf6ba]/90">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToSection(id)} className="hover:text-[#d4af37] transition">
              {label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Re-open Envelope button */}
          <button
            onClick={onReopenEnvelope}
            title="Re-open Invitation Envelope"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdfbf7]/10 hover:bg-[#fdfbf7]/20 border border-[#d4af37]/40 text-[#fcf6ba] text-xs font-sans-clean transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Envelope</span>
          </button>

          {/* Personalize / Edit button */}
          <button
            onClick={onOpenEditModal}
            title="Customize Wedding Data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37] text-[#fcf6ba] text-xs font-sans-clean transition font-medium cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            type="button"
            className="lg:hidden w-9 h-9 rounded-full border border-[#d4af37]/50 text-[#fcf6ba] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close section menu' : 'Open section menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile section navigation"
            className="absolute left-4 right-4 top-full mt-2 grid grid-cols-2 gap-1 rounded-xl border border-[#d4af37]/50 bg-[#4a0e17]/95 p-2 text-xs uppercase tracking-wider text-[#fcf6ba] shadow-xl backdrop-blur-md lg:hidden"
          >
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="rounded-lg px-3 py-2.5 text-left hover:bg-[#d4af37]/20"
              >
                {label}
              </button>
            ))}
          </nav>
        )}

      </div>
    </header>
  );
}
