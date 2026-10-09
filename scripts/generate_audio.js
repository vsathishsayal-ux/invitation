import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 44.1kHz 16-bit PCM Mono WAV generator
const sampleRate = 44100;
const durationSeconds = 32; // 32 seconds loop
const numSamples = sampleRate * durationSeconds;
const buffer = Buffer.alloc(44 + numSamples * 2);

// WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
buffer.writeUInt16LE(1, 22);  // NumChannels (1 for Mono)
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
buffer.writeUInt16LE(2, 32);  // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

// Raga Mohanam frequencies (Root D = 293.66Hz)
const notes = {
  D4: 293.66,
  E4: 329.63,
  Fs4: 369.99,
  A4: 440.00,
  B4: 493.88,
  D5: 587.33,
  E5: 659.25,
  Fs5: 739.99,
  A5: 880.00
};

// Sequence of notes for romantic melody phrase (Tamil flute style)
const melodySequence = [
  { note: notes.D4, dur: 2.0 },
  { note: notes.Fs4, dur: 1.0 },
  { note: notes.A4, dur: 1.5 },
  { note: notes.B4, dur: 1.5 },
  { note: notes.A4, dur: 2.0 },
  
  { note: notes.D5, dur: 2.0 },
  { note: notes.E5, dur: 1.0 },
  { note: notes.Fs5, dur: 2.5 },
  { note: notes.E5, dur: 1.5 },
  { note: notes.D5, dur: 2.0 },
  { note: notes.B4, dur: 2.0 },

  { note: notes.A4, dur: 1.5 },
  { note: notes.Fs4, dur: 1.5 },
  { note: notes.E4, dur: 1.5 },
  { note: notes.Fs4, dur: 2.0 },
  { note: notes.D4, dur: 3.0 },
  
  { note: notes.A4, dur: 1.5 },
  { note: notes.D5, dur: 2.0 },
  { note: notes.Fs5, dur: 2.5 }
];

let offset = 44;

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  
  // Find current melody note
  let timeSum = 0;
  let currentNoteFreq = notes.D4;
  let noteStart = 0;
  let noteDur = 2.0;

  for (let m = 0; m < melodySequence.length; m++) {
    const item = melodySequence[m];
    if (t >= timeSum && t < timeSum + item.dur) {
      currentNoteFreq = item.note;
      noteStart = timeSum;
      noteDur = item.dur;
      break;
    }
    timeSum += item.dur;
    if (m === melodySequence.length - 1 && t >= timeSum) {
      // Loop back
      const loopTime = t % timeSum;
      let loopSum = 0;
      for (let k = 0; k < melodySequence.length; k++) {
        const kItem = melodySequence[k];
        if (loopTime >= loopSum && loopTime < loopSum + kItem.dur) {
          currentNoteFreq = kItem.note;
          noteStart = t - (loopTime - loopSum);
          noteDur = kItem.dur;
          break;
        }
        loopSum += kItem.dur;
      }
    }
  }

  // Envelope for note (attack, decay, sustain, release)
  const elapsed = t - noteStart;
  let env = 1;
  if (elapsed < 0.1) env = elapsed / 0.1;
  else if (elapsed > noteDur - 0.2) env = Math.max(0, (noteDur - elapsed) / 0.2);

  // Tanpura / String Drone layers
  const drone1 = Math.sin(2 * Math.PI * 146.83 * t) * 0.15; // D3
  const drone2 = Math.sin(2 * Math.PI * 220.00 * t) * 0.10; // A3
  const drone3 = Math.sin(2 * Math.PI * 293.66 * t) * 0.08; // D4

  // Flute / Vocal-like melody tone with slight vibrato
  const vibrato = 1 + 0.015 * Math.sin(2 * Math.PI * 5 * t);
  const freq = currentNoteFreq * vibrato;
  
  // Harmonics for warm acoustic instrument tone
  const h1 = Math.sin(2 * Math.PI * freq * t) * 0.35;
  const h2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.12;
  const h3 = Math.sin(2 * Math.PI * freq * 3 * t) * 0.05;

  const melodySignal = (h1 + h2 + h3) * env;

  // Combine signals
  let sample = (drone1 + drone2 + drone3 + melodySignal) * 0.55;

  // Soft master fade in / fade out at loop boundaries
  if (t < 1.0) sample *= t;
  if (t > durationSeconds - 1.0) sample *= (durationSeconds - t);

  // Clamp to 16-bit range
  sample = Math.max(-1, Math.min(1, sample));
  const intSample = Math.floor(sample * 32767);
  
  buffer.writeInt16LE(intSample, offset);
  offset += 2;
}

const dir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'romantic-tamil-melody.wav'), buffer);
console.log('Successfully generated public/audio/romantic-tamil-melody.wav');
