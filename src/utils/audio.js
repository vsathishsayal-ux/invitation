// Audio Engine for Personalized Romantic Tamil Wedding Invitation
// Supports HTML5 Audio playback (with https://assets.einvitation.site/songs/Muzumathi-(Instrumental).mp3)
// AND Web Audio API Mohanam Raga synthesis fallback.

let audioEle = null;
let audioCtx = null;
let musicInterval = null;
let isPlayingInternal = false;
let currentVolume = 0.40; // Soft romantic volume (40%)

export function getAudioState() {
  return isPlayingInternal;
}

export function playChimeSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    
    // Play a gentle 3-note chime (E5, G#5, B5 - Indian Wedding Chime)
    const notes = [659.25, 830.61, 987.77];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 2.0);
    });
  } catch (e) {}
}

export function startAmbientWeddingMusic(customAudioUrl = 'https://assets.einvitation.site/songs/Muzumathi-(Instrumental).mp3') {
  if (isPlayingInternal) return;
  isPlayingInternal = true;

  const targetUrl = customAudioUrl || 'https://assets.einvitation.site/songs/Muzumathi-(Instrumental).mp3';

  // Attempt 1: Try HTML5 Audio with loopable Muzumathi instrumental track
  try {
    if (!audioEle) {
      audioEle = new Audio();
      audioEle.loop = true;
      audioEle.volume = currentVolume;
    }
    audioEle.src = targetUrl;

    const playPromise = audioEle.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback started successfully
        })
        .catch(() => {
          // Fallback to Web Audio Raga Synthesizer if file or autoplay policy blocks
          startWebAudioRagaSynthesizer();
        });
    }
  } catch (e) {
    startWebAudioRagaSynthesizer();
  }
}

export function stopAmbientWeddingMusic() {
  isPlayingInternal = false;
  
  if (audioEle) {
    try {
      audioEle.pause();
    } catch (e) {}
  }

  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

export function setMusicVolume(vol) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (audioEle) {
    audioEle.volume = currentVolume;
  }
}

// Web Audio API Fallback: Romantic South Indian Mohanam Raga (D, E, F#, A, B)
function startWebAudioRagaSynthesizer() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99];
    let noteIndex = 0;

    musicInterval = setInterval(() => {
      if (!isPlayingInternal || !audioCtx) return;
      const freq = scale[noteIndex % scale.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % scale.length;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine'; // Soft vocal/flute tone
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04 * currentVolume, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 2.6);
    }, 1300);

  } catch (err) {}
}
