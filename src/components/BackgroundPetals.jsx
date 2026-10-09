import React, { useMemo } from 'react';

export default function BackgroundPetals({ count = 22 }) {
  const petals = useMemo(() => {
    // Types of photorealistic petals
    const petalTypes = ['redRose', 'pinkRose', 'jasmineBloom', 'lilyPetal'];

    return Array.from({ length: count }).map((_, i) => {
      const type = petalTypes[i % petalTypes.length];
      const left = Math.random() * 98; // percentage
      const delay = Math.random() * 12; // seconds
      const duration = 12 + Math.random() * 14; // slow natural drift
      const size = 18 + Math.random() * 16; // size px
      const initialRotation = Math.random() * 360;
      const swayAmplitude = 20 + Math.random() * 30;

      return {
        id: i,
        type,
        left,
        delay,
        duration,
        size,
        initialRotation,
        swayAmplitude,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-50px] transform-gpu"
          style={{
            left: `${petal.left}%`,
            animation: `naturalPetalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
          }}
        >
          {/* Photorealistic Petal Renderer */}
          {petal.type === 'redRose' && (
            <svg
              width={petal.size}
              height={petal.size * 1.3}
              viewBox="0 0 40 52"
              fill="none"
              style={{ transform: `rotate(${petal.initialRotation}deg)` }}
            >
              <defs>
                <linearGradient id={`roseGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#800a1d" />
                  <stop offset="40%" stopColor="#b81d36" />
                  <stop offset="80%" stopColor="#6e0514" />
                  <stop offset="100%" stopColor="#450009" />
                </linearGradient>
                <radialGradient id={`roseShine-${petal.id}`} cx="40%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#e6425e" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#800a1d" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Petal Outer Contour */}
              <path
                d="M20 2 C32 2, 39 12, 38 28 C37 42, 26 50, 20 50 C14 50, 3 42, 2 28 C1 12, 8 2, 20 2 Z"
                fill={`url(#roseGrad-${petal.id})`}
              />
              {/* Petal Highlight & Texture Curves */}
              <path
                d="M20 2 C32 2, 39 12, 38 28 C37 42, 26 50, 20 50 Z"
                fill={`url(#roseShine-${petal.id})`}
              />
              <path
                d="M20 6 C24 16, 26 30, 20 44"
                stroke="#f7889b"
                strokeWidth="0.8"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M14 12 C18 20, 18 34, 15 42"
                stroke="#f7889b"
                strokeWidth="0.6"
                strokeOpacity="0.25"
              />
            </svg>
          )}

          {petal.type === 'pinkRose' && (
            <svg
              width={petal.size}
              height={petal.size * 1.25}
              viewBox="0 0 40 50"
              fill="none"
              style={{ transform: `rotate(${petal.initialRotation}deg)` }}
            >
              <defs>
                <linearGradient id={`pinkRoseGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#9f1239" />
                </linearGradient>
              </defs>
              <path
                d="M20 2 C34 4, 38 16, 36 30 C34 44, 25 48, 20 48 C15 48, 6 44, 4 30 C2 16, 6 4, 20 2 Z"
                fill={`url(#pinkRoseGrad-${petal.id})`}
                opacity="0.92"
              />
              <path
                d="M20 4 Q28 20 20 44"
                stroke="#fff"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
            </svg>
          )}

          {petal.type === 'jasmineBloom' && (
            <svg
              width={petal.size * 0.9}
              height={petal.size * 0.9}
              viewBox="0 0 40 40"
              fill="none"
              style={{ transform: `rotate(${petal.initialRotation}deg)` }}
            >
              <defs>
                <radialGradient id={`jasmineGrad-${petal.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#fffdfa" />
                  <stop offset="100%" stopColor="#f3e5ab" />
                </radialGradient>
              </defs>
              {/* 5 Delicate Star Petals of Jasmine */}
              <g fill={`url(#jasmineGrad-${petal.id})`}>
                <path d="M20 20 C18 10, 22 2, 20 0 C18 2, 22 10, 20 20 Z" transform="rotate(0 20 20)" />
                <path d="M20 20 C18 10, 22 2, 20 0 C18 2, 22 10, 20 20 Z" transform="rotate(72 20 20)" />
                <path d="M20 20 C18 10, 22 2, 20 0 C18 2, 22 10, 20 20 Z" transform="rotate(144 20 20)" />
                <path d="M20 20 C18 10, 22 2, 20 0 C18 2, 22 10, 20 20 Z" transform="rotate(216 20 20)" />
                <path d="M20 20 C18 10, 22 2, 20 0 C18 2, 22 10, 20 20 Z" transform="rotate(288 20 20)" />
              </g>
              {/* Golden Stamen Center */}
              <circle cx="20" cy="20" r="2.5" fill="#d4af37" />
              <circle cx="20" cy="20" r="1" fill="#8c6b2d" />
            </svg>
          )}

          {petal.type === 'lilyPetal' && (
            <svg
              width={petal.size * 0.8}
              height={petal.size * 1.5}
              viewBox="0 0 30 60"
              fill="none"
              style={{ transform: `rotate(${petal.initialRotation}deg)` }}
            >
              <defs>
                <linearGradient id={`lilyGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fbcfe8" />
                  <stop offset="80%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#be185d" />
                </linearGradient>
              </defs>
              <path
                d="M15 0 C25 12, 28 35, 15 60 C2 35, 5 12, 15 0 Z"
                fill={`url(#lilyGrad-${petal.id})`}
                opacity="0.9"
              />
              {/* Lily Speckles */}
              <circle cx="15" cy="30" r="0.8" fill="#831843" opacity="0.6" />
              <circle cx="13" cy="36" r="0.7" fill="#831843" opacity="0.6" />
              <circle cx="17" cy="38" r="0.7" fill="#831843" opacity="0.6" />
            </svg>
          )}
        </div>
      ))}

      <style>{`
        @keyframes naturalPetalFall {
          0% {
            transform: translateY(-40px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          40% {
            transform: translateY(40vh) rotateX(180deg) rotateY(90deg) rotateZ(120deg) translateX(25px);
          }
          70% {
            transform: translateY(70vh) rotateX(270deg) rotateY(180deg) rotateZ(240deg) translateX(-20px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(106vh) rotateX(360deg) rotateY(360deg) rotateZ(360deg) translateX(15px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
