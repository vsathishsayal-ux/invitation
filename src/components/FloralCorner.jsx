import React from 'react';

// Photorealistic vector SVG floral corner arrangement featuring
// Fresh White Roses, Pure White Jasmine Blossoms, Soft Pink Lilies, and Natural Green Vines
export default function FloralCorner({ className = "w-32 h-32", position = "top-left" }) {
  // Rotation / Flip transforms based on corner position
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scaleX(-1) scaleY(-1)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className={`pointer-events-none select-none z-20 ${className}`}
      style={{ transform: getTransform() }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow(0 6px 10px rgba(0,0,0,0.15))"
      >
        <defs>
          {/* Pure White Rose Radial Gradient */}
          <radialGradient id="whiteRoseCenter" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fffdf8" />
            <stop offset="85%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#ebd494" />
          </radialGradient>

          {/* Soft Cream Rose Gradient */}
          <radialGradient id="creamRoseGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#faf5e8" />
            <stop offset="100%" stopColor="#dfcf9b" />
          </radialGradient>

          {/* Deep Red Rose Accent Gradient */}
          <radialGradient id="redRoseAccent" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e63956" />
            <stop offset="60%" stopColor="#9e0c24" />
            <stop offset="100%" stopColor="#450009" />
          </radialGradient>

          {/* Jasmine Petal Radial Gradient */}
          <radialGradient id="jasmineGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fffdfa" />
            <stop offset="100%" stopColor="#fef3c7" />
          </radialGradient>

          {/* Pink Lily Gradient */}
          <linearGradient id="lilyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fbcfe8" />
            <stop offset="75%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          {/* Leaves Gradients */}
          <linearGradient id="leafGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>

        {/* 1. GREEN LEAF & VINE BACKDROP */}
        <g id="vines-and-leaves">
          <path
            d="M 10 185 Q 20 80 185 10"
            stroke="#047857"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 10 145 Q 30 50 145 10"
            stroke="#065f46"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Vine Leaves */}
          <path d="M 45 95 C 25 80, 20 60, 40 65 C 60 70, 55 90, 45 95 Z" fill="url(#leafGradDark)" />
          <path d="M 85 55 C 70 35, 50 30, 55 50 C 60 70, 80 65, 85 55 Z" fill="url(#leafGradLight)" />
          <path d="M 125 35 C 115 15, 95 10, 100 30 C 105 50, 120 45, 125 35 Z" fill="url(#leafGradDark)" />
          <path d="M 25 135 C 10 120, 5 100, 20 105 C 35 110, 30 130, 25 135 Z" fill="url(#leafGradLight)" />
          
          {/* Leaf Veins */}
          <path d="M 45 95 Q 38 78 35 70" stroke="#a7f3d0" strokeWidth="0.8" opacity="0.6" />
          <path d="M 85 55 Q 72 45 62 40" stroke="#a7f3d0" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* 2. PURE WHITE ROSE (Large Central Flower) */}
        <g id="main-white-rose" transform="translate(42, 42)">
          {/* Outer Petals */}
          <path d="M 35 5 C 60 -5, 75 20, 68 45 C 60 70, 25 75, 5 60 C -15 45, -5 15, 15 5 Z" fill="url(#whiteRoseCenter)" />
          {/* Overlapping Petal Layers */}
          <path d="M 20 10 C 45 0, 58 18, 52 38 C 45 58, 18 60, 8 48 C -2 35, 5 15, 20 10 Z" fill="url(#creamRoseGrad)" opacity="0.95" />
          <path d="M 28 15 C 48 8, 55 22, 48 38 C 40 54, 20 52, 12 40 C 4 28, 12 18, 28 15 Z" fill="#ffffff" />
          <path d="M 32 20 C 45 15, 50 25, 44 35 C 38 45, 24 44, 18 35 C 14 26, 20 18, 32 20 Z" fill="#fffdf8" />
          {/* Core Center Details */}
          <circle cx="32" cy="28" r="7" fill="#fef08a" />
          <circle cx="32" cy="28" r="4" fill="#d4af37" />
        </g>

        {/* 3. SECONDARY WHITE ROSE / CREAM BLOOM (Lower Left) */}
        <g id="secondary-white-rose" transform="translate(22, 110) scale(0.72)">
          <path d="M 35 5 C 60 -5, 75 20, 68 45 C 60 70, 25 75, 5 60 C -15 45, -5 15, 15 5 Z" fill="url(#creamRoseGrad)" />
          <path d="M 20 10 C 45 0, 58 18, 52 38 C 45 58, 18 60, 8 48 C -2 35, 5 15, 20 10 Z" fill="#ffffff" />
          <circle cx="32" cy="28" r="6" fill="#d4af37" />
        </g>

        {/* 4. RED ROSE ACCENT BLOOM (Top Right Accent) */}
        <g id="red-rose-accent" transform="translate(108, 25) scale(0.65)">
          <path d="M 35 5 C 60 -5, 75 20, 68 45 C 60 70, 25 75, 5 60 C -15 45, -5 15, 15 5 Z" fill="url(#redRoseAccent)" />
          <circle cx="32" cy="28" r="6" fill="#300107" />
        </g>

        {/* 5. PINK LILY (Side Cluster) */}
        <g id="pink-lily" transform="translate(115, 75) scale(0.6)">
          <path d="M25 25 C15 -5, 35 -20, 25 -30 C15 -20, 35 -5, 25 25 Z" fill="url(#lilyGrad)" />
          <path d="M25 25 C-5 15, -20 35, -30 25 C-20 15, -5 35, 25 25 Z" fill="url(#lilyGrad)" transform="rotate(72 25 25)" />
          <path d="M25 25 C-5 15, -20 35, -30 25 C-20 15, -5 35, 25 25 Z" fill="url(#lilyGrad)" transform="rotate(144 25 25)" />
          <path d="M25 25 C-5 15, -20 35, -30 25 C-20 15, -5 35, 25 25 Z" fill="url(#lilyGrad)" transform="rotate(216 25 25)" />
          <path d="M25 25 C-5 15, -20 35, -30 25 C-20 15, -5 35, 25 25 Z" fill="url(#lilyGrad)" transform="rotate(288 25 25)" />
          <circle cx="25" cy="25" r="4" fill="#881337" />
        </g>

        {/* 6. PURE WHITE JASMINE STAR BLOOMS */}
        {/* Jasmine 1 */}
        <g id="jasmine-1" transform="translate(95, 125) scale(0.7)">
          <g fill="url(#jasmineGrad)">
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(0 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(72 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(144 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(216 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(288 15 15)" />
          </g>
          <circle cx="15" cy="15" r="2.2" fill="#d4af37" />
        </g>

        {/* Jasmine 2 */}
        <g id="jasmine-2" transform="translate(155, 35) scale(0.6)">
          <g fill="url(#jasmineGrad)">
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(18 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(90 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(162 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(234 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(306 15 15)" />
          </g>
          <circle cx="15" cy="15" r="2" fill="#d4af37" />
        </g>

        {/* Jasmine 3 */}
        <g id="jasmine-3" transform="translate(60, 155) scale(0.6)">
          <g fill="url(#jasmineGrad)">
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(36 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(108 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(180 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(252 15 15)" />
            <path d="M15 15 C13 5, 17 0, 15 -2 C13 0, 17 5, 15 15 Z" transform="rotate(324 15 15)" />
          </g>
          <circle cx="15" cy="15" r="2" fill="#d4af37" />
        </g>
      </svg>
    </div>
  );
}
