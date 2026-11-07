// Audio Engine for Personalized Romantic Tamil Wedding Invitation
// Supports HTML5 Audio playback (with https://assets.einvitation.site/songs/Muzumathi-(Instrumental).mp3)
// AND Web Audio API Mohanam Raga synthesis fallback.

let audioEle = null;
let audioCtx = null;
let musicInterval = null;
let isPlayingInternal = false;
let isMutedInternal = false;
let currentVolume = 0.40; // Soft romantic volume (40%)
let soundCloudPlayer = null;
let soundCloudPlayerReadyPromise = null;
let soundCloudPlayerIsReady = false;
let soundCloudIframe = null;
let soundCloudHasStartedPlayback = false;
let soundCloudStartPending = false;
let soundCloudTrackUrl = null;
let soundCloudApiPromise = null;
let soundCloudRequestId = 0;
const audioStateListeners = new Set();

function updateAudioState(isPlaying) {
  isPlayingInternal = isPlaying;
  audioStateListeners.forEach((listener) => listener(isPlaying));
}

function loadSoundCloudWidgetApi() {
  if (window.SC?.Widget) return Promise.resolve(window.SC);
  if (soundCloudApiPromise) return soundCloudApiPromise;

  soundCloudApiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.onload = () => {
      if (window.SC?.Widget) {
        resolve(window.SC);
      } else {
        reject(new Error('SoundCloud Widget API loaded without its player interface.'));
      }
    };
    script.onerror = () => reject(new Error('Unable to load the SoundCloud Widget API.'));
    document.head.appendChild(script);
  }).catch((error) => {
    soundCloudApiPromise = null;
    throw error;
  });

  return soundCloudApiPromise;
}

function getSoundCloudPlayer(trackUrl) {
  if (soundCloudTrackUrl === trackUrl && soundCloudPlayerReadyPromise) {
    return soundCloudPlayerReadyPromise;
  }

  if (soundCloudIframe) soundCloudIframe.remove();
  soundCloudIframe = null;
  soundCloudPlayer = null;
  soundCloudPlayerIsReady = false;
  soundCloudHasStartedPlayback = false;
  soundCloudPlayerReadyPromise = null;
  soundCloudTrackUrl = trackUrl;

  const playerPromise = (async () => {
    const soundCloud = await loadSoundCloudWidgetApi();
    const iframe = document.createElement('iframe');
    const playerUrl = new URL('https://w.soundcloud.com/player/');
    playerUrl.searchParams.set('url', trackUrl);
    playerUrl.searchParams.set('auto_play', 'false');
    playerUrl.searchParams.set('loop', 'true');
    playerUrl.searchParams.set('visual', 'false');
    playerUrl.searchParams.set('show_artwork', 'false');
    playerUrl.searchParams.set('show_comments', 'false');
    playerUrl.searchParams.set('show_user', 'false');
    playerUrl.searchParams.set('show_reposts', 'false');
    playerUrl.searchParams.set('show_teaser', 'false');
    playerUrl.searchParams.set('sharing', 'false');
    playerUrl.searchParams.set('download', 'false');
    playerUrl.searchParams.set('buying', 'false');
    playerUrl.searchParams.set('hide_related', 'true');
    playerUrl.searchParams.set('color', '#d4af37');

    iframe.src = playerUrl.toString();
    iframe.width = '320';
    iframe.height = '166';
    iframe.title = 'SoundCloud background music player';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.tabIndex = -1;
    iframe.setAttribute('aria-hidden', 'true');
    Object.assign(iframe.style, {
      position: 'fixed',
      width: '320px',
      height: '166px',
      right: '0',
      bottom: '0',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '1',
      border: '0',
    });
    document.body.appendChild(iframe);

    soundCloudIframe = iframe;
    const player = soundCloud.Widget(iframe);
    soundCloudPlayer = player;

    return new Promise((resolve, reject) => {
      const readyTimeout = window.setTimeout(() => {
        if (soundCloudIframe === iframe) {
          iframe.remove();
          soundCloudIframe = null;
          soundCloudPlayer = null;
          soundCloudTrackUrl = null;
          soundCloudPlayerReadyPromise = null;
        }
        reject(new Error('SoundCloud player did not become ready.'));
      }, 15000);

      player.bind(soundCloud.Widget.Events.ERROR, (error) => {
        if (soundCloudIframe !== iframe) return;
        soundCloudStartPending = false;
        soundCloudHasStartedPlayback = false;
        console.error('SoundCloud playback failed.', error);
        updateAudioState(false);
      });
      player.bind(soundCloud.Widget.Events.READY, () => {
        if (soundCloudIframe !== iframe) return;
        window.clearTimeout(readyTimeout);
        soundCloudPlayerIsReady = true;
        player.setVolume(isMutedInternal ? 0 : Math.round(currentVolume * 100));
        player.bind(soundCloud.Widget.Events.PLAY, () => {
          soundCloudStartPending = false;
          soundCloudHasStartedPlayback = true;
          updateAudioState(true);
        });
        player.bind(soundCloud.Widget.Events.PAUSE, () => {
          if (!soundCloudHasStartedPlayback) return;
          soundCloudHasStartedPlayback = false;
          updateAudioState(false);
        });
        player.bind(soundCloud.Widget.Events.FINISH, () => {
          player.seekTo(0);
          player.play();
        });
        resolve(player);
      });
    });
  })();

  soundCloudPlayerReadyPromise = playerPromise;
  playerPromise.catch((error) => {
    if (soundCloudTrackUrl === trackUrl && soundCloudPlayerReadyPromise === playerPromise) {
      soundCloudIframe?.remove();
      soundCloudIframe = null;
      soundCloudPlayer = null;
      soundCloudTrackUrl = null;
      soundCloudPlayerReadyPromise = null;
    }
    return error;
  });

  return playerPromise;
}

export function subscribeAudioState(listener) {
  audioStateListeners.add(listener);
  return () => {
    audioStateListeners.delete(listener);
  };
}

export function prepareAmbientWeddingMusic(trackUrl) {
  if (!/^https?:\/\/(?:www\.)?soundcloud\.com\//i.test(trackUrl || '')) {
    return Promise.resolve();
  }

  return getSoundCloudPlayer(trackUrl);
}

export function getAudioState() {
  return isPlayingInternal;
}

export function playChimeSound() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) {
    return Promise.reject(new Error('Web Audio is not available in this browser.'));
  }

  let ctx;
  try {
    ctx = new Ctx();
  } catch (error) {
    return Promise.reject(error);
  }

  return ctx.resume().then(() => new Promise((resolve, reject) => {
    try {
      let remainingNotes = 3;
      const notes = [659.25, 830.61, 987.77];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.15;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.onended = () => {
          remainingNotes -= 1;
          if (remainingNotes === 0) {
            ctx.close().catch((error) => {
              console.error('Unable to close the invitation sound context.', error);
            });
            resolve();
          }
        };
        osc.start(startTime);
        osc.stop(startTime + 2.0);
      });
    } catch (error) {
      ctx.close().catch((closeError) => {
        console.error('Unable to close the invitation sound context.', closeError);
      });
      reject(error);
    }
  })).catch((error) => {
    if (ctx.state !== 'closed') {
      ctx.close().catch((closeError) => {
        console.error('Unable to close the invitation sound context.', closeError);
      });
    }
    throw error;
  });
}

export function startAmbientWeddingMusic(customAudioUrl = 'https://assets.einvitation.site/songs/Muzumathi-(Instrumental).mp3') {
  if (isPlayingInternal || soundCloudStartPending) return;
  const targetUrl = customAudioUrl || 'https://assets.einvitation.site/songs/Muzumathi-(Instrumental).mp3';

  if (/^https?:\/\/(?:www\.)?soundcloud\.com\//i.test(targetUrl)) {
    soundCloudStartPending = true;
    const requestId = ++soundCloudRequestId;
    if (soundCloudTrackUrl === targetUrl && soundCloudPlayerIsReady && soundCloudPlayer) {
      soundCloudPlayer.play();
      window.setTimeout(() => {
        if (requestId !== soundCloudRequestId || !soundCloudStartPending) return;
        soundCloudPlayer.isPaused((isPaused) => {
          if (requestId !== soundCloudRequestId || !soundCloudStartPending) return;
          soundCloudStartPending = false;
          updateAudioState(!isPaused);
        });
      }, 1500);
      return;
    }

    getSoundCloudPlayer(targetUrl)
      .then((player) => {
        if (requestId === soundCloudRequestId && soundCloudStartPending) {
          player.play();
          window.setTimeout(() => {
            if (requestId !== soundCloudRequestId || !soundCloudStartPending) return;
            player.isPaused((isPaused) => {
              if (requestId !== soundCloudRequestId || !soundCloudStartPending) return;
              soundCloudStartPending = false;
              updateAudioState(!isPaused);
            });
          }, 1500);
        }
      })
      .catch((error) => {
        console.error('Unable to start SoundCloud background music.', error);
        if (requestId === soundCloudRequestId) {
          soundCloudStartPending = false;
          updateAudioState(false);
        }
      });
    return;
  }

  updateAudioState(true);

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
  updateAudioState(false);
  soundCloudRequestId += 1;
  soundCloudStartPending = false;
  soundCloudHasStartedPlayback = false;
  
  if (audioEle) {
    try {
      audioEle.pause();
    } catch (e) {}
  }

  if (soundCloudPlayerReadyPromise) {
    soundCloudPlayerReadyPromise
      .then((player) => player.pause())
      .catch((error) => console.error('Unable to pause SoundCloud background music.', error));
  }

  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

export function toggleAmbientWeddingMusicMute() {
  isMutedInternal = !isMutedInternal;
  const volume = isMutedInternal ? 0 : Math.round(currentVolume * 100);

  if (audioEle) audioEle.volume = isMutedInternal ? 0 : currentVolume;
  if (soundCloudPlayerReadyPromise) {
    soundCloudPlayerReadyPromise
      .then((player) => player.setVolume(volume))
      .catch((error) => console.error('Unable to toggle SoundCloud mute.', error));
  }

  return isMutedInternal;
}

export function setMusicVolume(vol) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (audioEle) {
    audioEle.volume = isMutedInternal ? 0 : currentVolume;
  }
  if (soundCloudPlayerReadyPromise) {
    soundCloudPlayerReadyPromise
      .then((player) => player.setVolume(isMutedInternal ? 0 : Math.round(currentVolume * 100)))
      .catch((error) => console.error('Unable to set SoundCloud playback volume.', error));
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
