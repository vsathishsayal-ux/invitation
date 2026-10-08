import React, { useState, useEffect } from 'react';
import { initialWeddingData } from './data/weddingData';
import BackgroundPetals from './components/BackgroundPetals';
import InvitationOpening from './components/InvitationOpening';
import HeaderControls from './components/HeaderControls';
import WeddingHero from './components/WeddingHero';
import InvitationMessage from './components/InvitationMessage';
import WeddingDetails from './components/WeddingDetails';
import Countdown from './components/Countdown';
import Venue from './components/Venue';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Blessings from './components/Blessings';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import PersonalizeModal from './components/PersonalizeModal';
import { playChimeSound, startAmbientWeddingMusic, stopAmbientWeddingMusic } from './utils/audio';

export default function App() {
  const [weddingData, setWeddingData] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_invitation_data');
      return saved ? JSON.parse(saved) : initialWeddingData;
    } catch (e) {
      return initialWeddingData;
    }
  });

  const [isOpeningScreenVisible, setIsOpeningScreenVisible] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Toggle background wedding ambient audio
  const handleToggleMusic = (forcePlay = null) => {
    const nextState = forcePlay !== null ? forcePlay : !isMusicPlaying;
    setIsMusicPlaying(nextState);
    if (nextState) {
      startAmbientWeddingMusic();
    } else {
      stopAmbientWeddingMusic();
    }
  };

  // Called when ribbon untie animation completes
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
      
      {/* Floating flower petals ambient background */}
      <BackgroundPetals count={20} />

      {/* STEP 1 & STEP 2: Physical Envelope & Ribbon Opening Animation Overlay */}
      {isOpeningScreenVisible && (
        <InvitationOpening
          weddingData={weddingData}
          onOpenComplete={handleOpenComplete}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={handleToggleMusic}
        />
      )}

      {/* Main Wedding Invitation Page Content */}
      <div className={`transition-opacity duration-1000 ${isOpeningScreenVisible ? 'opacity-20 pointer-events-none filter blur-sm' : 'opacity-100'}`}>
        
        {/* Header Controls (Nav, Music, Edit) */}
        <HeaderControls
          brideName={weddingData.brideName}
          groomName={weddingData.groomName}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={() => handleToggleMusic()}
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

        {/* SECTION 7 — PHOTO / MEMORIES */}
        <Gallery gallery={weddingData.gallery} />

        {/* SECTION 8 — BLESSINGS / MESSAGE */}
        <Blessings weddingData={weddingData} />

        {/* SECTION 9 — RSVP */}
        <RSVP weddingData={weddingData} />

        {/* SECTION 10 — FOOTER */}
        <Footer weddingData={weddingData} onReopenEnvelope={handleReopenEnvelope} />

      </div>

      {/* Personalize Editor Modal */}
      <PersonalizeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentData={weddingData}
        onSave={handleSaveData}
      />

    </div>
  );
}
