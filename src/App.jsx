import React, { useEffect, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';
import { initialWeddingData } from './data/weddingData';
import FloatingHearts from './components/FloatingHearts';
import InvitationOpening from './components/InvitationOpening';

import WeddingHero from './components/WeddingHero';
import InvitationMessage from './components/InvitationMessage';
import WeddingDetails from './components/WeddingDetails';
import Countdown from './components/Countdown';
import Venue from './components/Venue';
import Events from './components/Events';
import Blessings from './components/Blessings';
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
  const [isOpeningSoundFinished, setIsOpeningSoundFinished] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => subscribeAudioState(setIsMusicPlaying), []);

  useEffect(() => {
    prepareAmbientWeddingMusic(weddingData.musicUrl)
      .catch((error) => console.error('Unable to prepare the background music player.', error));
  }, [weddingData.musicUrl]);

  // Toggle background wedding ambient audio
  const handleToggleMusic = () => {
    if (isOpeningScreenVisible || !isOpeningSoundFinished) return;

    if (isMusicPlaying) {
      setIsMusicMuted(toggleAmbientWeddingMusicMute());
      return;
    }

    setIsMusicMuted(false);
    startAmbientWeddingMusic(weddingData.musicUrl);
  };

  const handleStartOpeningSound = () => {
    playChimeSound()
      .then(() => {
        setIsOpeningSoundFinished(true);
        startAmbientWeddingMusic(weddingData.musicUrl);
      })
      .catch((error) => {
        console.error('Unable to play the invitation opening sound.', error);
        setIsOpeningSoundFinished(true);
        startAmbientWeddingMusic(weddingData.musicUrl);
      });
  };

  // Called after the opening animation completes
  const handleOpenComplete = () => {
    setIsOpeningScreenVisible(false);
  };

  // Save personalized data
  const handleSaveData = (newData) => {
    setWeddingData(newData);
    try {
      localStorage.setItem('wedding_invitation_data', JSON.stringify(newData));
    } catch (e) {}
  };

  return (
    <div className="theme-shell relative min-h-screen paper-texture selection:bg-[#c79a47]/40 selection:text-[#4b1720]">

      {!isOpeningScreenVisible && <FloatingHearts count={12} />}

      {isOpeningScreenVisible && (
        <InvitationOpening
          weddingData={weddingData}
          onOpenComplete={handleOpenComplete}
          onStartOpeningSound={handleStartOpeningSound}
        />
      )}

      <div className={`transition-all duration-1000 ${isOpeningScreenVisible ? 'pointer-events-none opacity-20 blur-sm' : 'opacity-100'}`}>
        <section className="relative px-4 pt-6 pb-5 sm:pt-8 sm:pb-8">
          <div className="section-shell">
            <div className="hero-stage relative px-5 py-8 sm:px-8 sm:py-10">
              <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,220,166,0.12),transparent_58%)]" />
                <div className="absolute left-6 top-6 h-14 w-14 rounded-full border border-[#f5dca6]/30 bg-[#fffaf7]/10" />
                <div className="absolute right-8 top-10 h-14 w-14 rounded-full border border-[#f5dca6]/25 bg-[#f4e3d3]/10" />
                <div className="absolute bottom-7 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border border-[#f5dca6]/25 bg-[#f1d5bf]/10" />
                <span className="absolute left-5 top-5 text-xl text-[#f5dca6]">❤</span>
                <span className="absolute right-5 top-5 text-xl text-[#f5dca6]">❤</span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="soft-glow mb-6 overflow-hidden rounded-[1.7rem] border border-[#f5dca6]/50 bg-[#f8f1ea] p-2 shadow-[0_18px_35px_rgba(17,13,15,0.14)] w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]">
                  <img
                    src="/preloader.jpeg"
                    alt="Wedding couple portrait"
                    className="h-full w-full rounded-[1.3rem] object-cover object-center"
                  />
                </div>

                <p className="font-serif-heading text-[0.8rem] uppercase tracking-[0.35em] text-[#f6e9c8] sm:text-[0.9rem]">
                  Together with their families
                </p>

                <h1 className="mt-4 font-serif-heading text-4xl font-bold tracking-[0.08em] text-[#f4e7c2] sm:text-5xl md:text-6xl">
                  {weddingData.groomName} <span className="mx-2 text-[#f5dca6]">&amp;</span> {weddingData.brideName}
                </h1>

                <p className="mt-5 max-w-2xl font-script text-4xl italic leading-none tracking-[0.02em] text-[#f8efd9] sm:text-5xl md:text-[4rem]">
                  "Your presence and blessings mean the world to us."
                </p>

                <div className="mt-7 flex items-center justify-center gap-4">
                  <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#f5dca6] to-transparent" />
                  <span className="text-[#f5dca6]">❈</span>
                  <span className="h-px w-16 bg-gradient-to-r from-transparent via-[#f5dca6] to-transparent" />
                </div>

                <p className="mt-6 text-[10px] sm:text-xs uppercase tracking-[0.45em] text-[#f1d89f] font-sans-clean font-bold">
                  With love, joy &amp; gratitude
                </p>
              </div>
            </div>
          </div>
        </section>

        <WeddingHero weddingData={weddingData} />
        <InvitationMessage weddingData={weddingData} />
        <WeddingDetails weddingData={weddingData} />
        <Countdown targetDateString={weddingData.weddingDate} />
        <Venue weddingData={weddingData} />
        <Events events={weddingData.events} />
        <Blessings weddingData={weddingData} />
        <Footer weddingData={weddingData} />
      </div>

      <PersonalizeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentData={weddingData}
        onSave={handleSaveData}
      />

      <button
        type="button"
        onClick={handleToggleMusic}
        disabled={isOpeningScreenVisible || !isOpeningSoundFinished}
        aria-label={isMusicPlaying ? (isMusicMuted ? 'Unmute background music' : 'Mute background music') : 'Play background music'}
        title={isMusicPlaying ? (isMusicMuted ? 'Unmute background music' : 'Mute background music') : 'Play background music'}
        className="fixed bottom-5 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-[#f5dca6]/80 bg-[#4b1720]/90 text-[#f3e5ab] shadow-lg backdrop-blur transition hover:scale-105 hover:bg-[#4b1720] disabled:cursor-not-allowed disabled:opacity-60 sm:bottom-6 sm:right-6"
      >
        {isMusicPlaying && !isMusicMuted
          ? <Music2 className="h-5 w-5 animate-pulse text-[#f5dca6]" />
          : <VolumeX className="h-5 w-5" />}
      </button>
    </div>
  );
}
