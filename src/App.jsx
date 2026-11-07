import React, { useEffect, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';
import { initialWeddingData } from './data/weddingData';
import FloatingHearts from './components/FloatingHearts';
import InvitationOpening from './components/InvitationOpening';
import HeaderControls from './components/HeaderControls';

import WeddingHero from './components/WeddingHero';
import InvitationMessage from './components/InvitationMessage';
import WeddingDetails from './components/WeddingDetails';
import Countdown from './components/Countdown';
import Venue from './components/Venue';
import Events from './components/Events';
import Blessings from './components/Blessings';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import PersonalizeModal from './components/PersonalizeModal';
import { playChimeSound, prepareAmbientWeddingMusic, startAmbientWeddingMusic, subscribeAudioState, toggleAmbientWeddingMusicMute } from './utils/audio';

export default function App() {
  // Always use the real wedding data — clear any stale localStorage
  const [weddingData, setWeddingData] = useState(() => {
    try { localStorage.removeItem('wedding_invitation_data'); } catch (e) {}
    return initialWeddingData;
  });

  const [isOpeningScreenVisible, setIsOpeningScreenVisible] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => subscribeAudioState(setIsMusicPlaying), []);

  useEffect(() => {
    prepareAmbientWeddingMusic(weddingData.musicUrl);
  }, [weddingData.musicUrl]);

  // Toggle background wedding ambient audio
  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      setIsMusicMuted(toggleAmbientWeddingMusicMute());
      return;
    }

    setIsMusicMuted(false);
    startAmbientWeddingMusic(weddingData.musicUrl);
  };

  const handleStartMusic = () => {
    if (isMusicPlaying) return;
    setIsMusicMuted(false);
    startAmbientWeddingMusic(weddingData.musicUrl);
  };

  // Called after wax seal opening animation completes and invitation opens
  const handleOpenComplete = () => {
    setIsOpeningScreenVisible(false);
    playChimeSound();
  };

  // Re-open envelope animation
  const handleReopenEnvelope = () => {
    setIsOpeningScreenVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save personalized data
  const handleSaveData = (newData) => {
    setWeddingData(newData);
    try {
      localStorage.setItem('wedding_invitation_data', JSON.stringify(newData));
    } catch (e) {}
  };

  return (
    <div className="relative min-h-screen paper-texture selection:bg-[#c5a059]/40 selection:text-[#4a0e17]">
      
      {!isOpeningScreenVisible && <FloatingHearts count={12} />}

      {/* Physical Envelope & Ribbon Opening Animation Overlay */}
      {isOpeningScreenVisible && (
        <InvitationOpening
          weddingData={weddingData}
          onOpenComplete={handleOpenComplete}
          onStartMusic={handleStartMusic}
        />
      )}

      {/* Main Wedding Invitation Page Content */}
      <div className={`transition-opacity duration-1000 ${isOpeningScreenVisible ? 'opacity-20 pointer-events-none filter blur-sm' : 'opacity-100'}`}>
        
        <HeaderControls
          brideName={weddingData.brideName}
          groomName={weddingData.groomName}
          onReopenEnvelope={handleReopenEnvelope}
          onOpenEditModal={() => setIsEditModalOpen(true)}
        />

        {/* SECTION 1 — WELCOME & HERO */}
        <WeddingHero weddingData={weddingData} />

        {/* SECTION 2 — WEDDING INVITATION MESSAGE */}
        <InvitationMessage weddingData={weddingData} />

        {/* SECTION 3 — WEDDING DETAILS */}
        <WeddingDetails weddingData={weddingData} />

        {/* SECTION 4 — COUNTDOWN */}
        <Countdown targetDateString={weddingData.weddingDate} />

        {/* SECTION 5 — VENUE */}
        <Venue weddingData={weddingData} />

        {/* SECTION 6 — EVENTS */}
        <Events events={weddingData.events} />

        {/* SECTION 7 — BLESSINGS / MESSAGE */}
        <Blessings weddingData={weddingData} />

        {/* SECTION 8 — RSVP */}
        <RSVP weddingData={weddingData} />

        {/* SECTION 9 — FOOTER */}
        <Footer weddingData={weddingData} onReopenEnvelope={handleReopenEnvelope} />

      </div>

      {/* Personalize Editor Modal */}
      <PersonalizeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentData={weddingData}
        onSave={handleSaveData}
      />

      <button
        type="button"
        onClick={handleToggleMusic}
        aria-label={isMusicPlaying ? (isMusicMuted ? 'Unmute background music' : 'Mute background music') : 'Play background music'}
        title={isMusicPlaying ? (isMusicMuted ? 'Unmute background music' : 'Mute background music') : 'Play background music'}
        className="fixed bottom-5 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/70 bg-[#4a0e17]/90 text-[#f3e5ab] shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[#4a0e17] sm:bottom-6 sm:right-6"
      >
        {isMusicPlaying && !isMusicMuted
          ? <Music2 className="h-5 w-5 animate-pulse text-[#d4af37]" />
          : <VolumeX className="h-5 w-5" />}
      </button>

    </div>
  );
}
