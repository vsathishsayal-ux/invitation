// Web Audio API ambient wedding melody generator & chime synthesizer

let audioCtx = null;
let musicInterval = null;
let isPlayingInternal = false;

export function playChimeSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    
    // Play a gentle 3-note chime (E5, G#5, B5 - Major chord)
    const notes = [659.25, 830.61, 987.77];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 2.0);
    });
  } catch (e) {
    // Audio Context not allowed without gesture
  }
}

export function startAmbientWeddingMusic() {
  if (isPlayingInternal) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    isPlayingInternal = true;

    // Pentatonic South Indian wedding raga notes (Mohanam / Bhupali: C, D, E, G, A)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let noteIndex = 0;

    musicInterval = setInterval(() => {
      if (!isPlayingInternal || !audioCtx) return;
      const freq = scale[noteIndex % scale.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % scale.length;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 2.3);
    }, 1200);

  } catch (err) {
    // Ignore audio errors
  }
}

export function stopAmbientWeddingMusic() {
  isPlayingInternal = false;
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}
