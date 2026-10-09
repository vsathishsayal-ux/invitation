import React from 'react';

// Refined Premium Indian Wedding Floral Border Frame
// Floral vines and flowers begin directly at the inner gold border line,
// growing organically along the frame with a denser cluster at the 4 corners
// and lighter leaves & small blossoms extending gracefully along the edges.
export default function FloralBorder({ children, className = "" }) {
  return (
    <div className={`relative rounded-3xl border border-[#d4af37]/60 card-shadow paper-texture overflow-hidden ${className}`}>
      
      {/* INTEGRATED ORGANIC FLORAL BORDER SVG OVERLAY */}
      <svg
        viewBox="0 0 500 360"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-20 filter drop-shadow(0 3px 5px rgba(0,0,0,0.12))"
      >
        <defs>
          {/* White Rose Radial Gradient */}
          <radialGradient id="fbRoseWhite" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fffdf6" />
            <stop offset="85%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#d4af37" />
          </radialGradient>

          {/* Soft Cream Rose Gradient */}
          <radialGradient id="fbRoseCream" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#faf5e8" />
            <stop offset="100%" stopColor="#dfcf9b" />
          </radialGradient>

          {/* Leaf Gradients */}
          <linearGradient id="fbLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          <linearGradient id="fbLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* Pink Lily Gradient */}
          <linearGradient id="fbLilyPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fbcfe8" />
            <stop offset="80%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          {/* Single Reusable Jasmine Blossom Definition */}
          <g id="jasmineBloom">
            <g fill="#ffffff">
              <path d="M0 -7 C-2 -2, -6 0, -6 -1.5 C-6 -3, -2 -2, 0 -7 Z" />
              <path d="M0 -7 C-2 -2, -6 0, -6 -1.5 C-6 -3, -2 -2, 0 -7 Z" transform="rotate(72)" />
              <path d="M0 -7 C-2 -2, -6 0, -6 -1.5 C-6 -3, -2 -2, 0 -7 Z" transform="rotate(144)" />
              <path d="M0 -7 C-2 -2, -6 0, -6 -1.5 C-6 -3, -2 -2, 0 -7 Z" transform="rotate(216)" />
              <path d="M0 -7 C-2 -2, -6 0, -6 -1.5 C-6 -3, -2 -2, 0 -7 Z" transform="rotate(288)" />
            </g>
            <circle cx="0" cy="0" r="1.5" fill="#d4af37" />
          </g>
        </defs>

        {/* 1. INNER GOLD FOIL BORDER LINE (Inset 16px from edges) */}
        <rect
          x="16"
          y="16"
          width="468"
          height="328"
          rx="18"
          ry="18"
          stroke="#d4af37"
          strokeWidth="1.5"
          strokeDasharray="none"
          opacity="0.75"
        />

        {/* 2. FLORAL VINES ATTACHED DIRECTLY TO GOLD BORDER LINE */}
        
        {/* TOP-LEFT CORNER ORGANIC VINES & BLOOMS */}
        <g id="tl-corner">
          {/* Main Vine growing out of the gold border line corner */}
          <path d="M 16 75 C 16 35, 35 16, 75 16" stroke="#059669" strokeWidth="2" />
          <path d="M 16 95 Q 28 35 95 16" stroke="#047857" strokeWidth="1.5" opacity="0.8" />
          
          {/* Leaves along vine */}
          <path d="M 28 48 C 18 36, 12 28, 24 30 C 36 32, 32 44, 28 48 Z" fill="url(#fbLeafDark)" />
          <path d="M 48 28 C 36 18, 28 12, 30 24 C 32 36, 44 32, 48 28 Z" fill="url(#fbLeafLight)" />
          <path d="M 68 20 C 58 12, 50 10, 56 18 Z" fill="url(#fbLeafDark)" />
          <path d="M 20 68 C 12 58, 10 50, 18 56 Z" fill="url(#fbLeafLight)" />

          {/* Denser Corner Flowers */}
          {/* Main White Rose at Corner Intersection (16, 16) */}
          <g transform="translate(30, 30)">
            <circle cx="0" cy="0" r="14" fill="url(#fbRoseWhite)" />
            <circle cx="0" cy="0" r="9" fill="#ffffff" opacity="0.95" />
            <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
            <circle cx="0" cy="0" r="2" fill="#d4af37" />
          </g>

          {/* Secondary Cream Rose */}
          <g transform="translate(18, 55) scale(0.75)">
            <circle cx="0" cy="0" r="13" fill="url(#fbRoseCream)" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            <circle cx="0" cy="0" r="3.5" fill="#d4af37" />
          </g>

          {/* Pink Lily Accent */}
          <g transform="translate(55, 18) scale(0.6)">
            <path d="M0 0 C-10 -15, 10 -25, 0 -30 C-10 -25, 10 -15, 0 0 Z" fill="url(#fbLilyPink)" />
            <path d="M0 0 C-10 -15, 10 -25, 0 -30 C-10 -25, 10 -15, 0 0 Z" fill="url(#fbLilyPink)" transform="rotate(90)" />
            <path d="M0 0 C-10 -15, 10 -25, 0 -30 C-10 -25, 10 -15, 0 0 Z" fill="url(#fbLilyPink)" transform="rotate(180)" />
            <path d="M0 0 C-10 -15, 10 -25, 0 -30 C-10 -25, 10 -15, 0 0 Z" fill="url(#fbLilyPink)" transform="rotate(270)" />
            <circle cx="0" cy="0" r="2.5" fill="#881337" />
          </g>

          {/* Jasmine Star Blossoms extending along border line */}
          <g transform="translate(80, 16) scale(0.9)">
            <use href="#jasmineBloom" />
          </g>
          <g transform="translate(16, 80) scale(0.9)">
            <use href="#jasmineBloom" />
          </g>
          <g transform="translate(42, 42) scale(0.85)">
            <use href="#jasmineBloom" />
          </g>
        </g>

        {/* TOP-RIGHT CORNER ORGANIC VINES & BLOOMS */}
        <g id="tr-corner" transform="translate(500, 0) scale(-1, 1)">
          <path d="M 16 75 C 16 35, 35 16, 75 16" stroke="#059669" strokeWidth="2" />
          <path d="M 16 95 Q 28 35 95 16" stroke="#047857" strokeWidth="1.5" opacity="0.8" />
          <path d="M 28 48 C 18 36, 12 28, 24 30 C 36 32, 32 44, 28 48 Z" fill="url(#fbLeafDark)" />
          <path d="M 48 28 C 36 18, 28 12, 30 24 C 32 36, 44 32, 48 28 Z" fill="url(#fbLeafLight)" />
          
          <g transform="translate(30, 30)">
            <circle cx="0" cy="0" r="14" fill="url(#fbRoseWhite)" />
            <circle cx="0" cy="0" r="9" fill="#ffffff" opacity="0.95" />
            <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
            <circle cx="0" cy="0" r="2" fill="#d4af37" />
          </g>

          <g transform="translate(18, 55) scale(0.75)">
            <circle cx="0" cy="0" r="13" fill="url(#fbRoseCream)" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            <circle cx="0" cy="0" r="3.5" fill="#d4af37" />
          </g>

          <g transform="translate(80, 16) scale(0.9)">
            <use href="#jasmineBloom" />
          </g>
          <g transform="translate(16, 80) scale(0.9)">
            <use href="#jasmineBloom" />
          </g>
        </g>

        {/* BOTTOM-LEFT CORNER ORGANIC VINES & BLOOMS */}
        <g id="bl-corner" transform="translate(0, 360) scale(1, -1)">
          <path d="M 16 65 C 16 30, 30 16, 65 16" stroke="#059669" strokeWidth="2" />
          <path d="M 28 40 C 18 30, 12 22, 22 24 Z" fill="url(#fbLeafDark)" />
          <path d="M 40 28 C 30 18, 22 12, 24 22 Z" fill="url(#fbLeafLight)" />
          
          <g transform="translate(28, 28)">
            <circle cx="0" cy="0" r="12" fill="url(#fbRoseWhite)" />
            <circle cx="0" cy="0" r="7.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
          </g>
          
          <g transform="translate(65, 16) scale(0.85)">
            <use href="#jasmineBloom" />
          </g>
        </g>

        {/* BOTTOM-RIGHT CORNER ORGANIC VINES & BLOOMS */}
        <g id="br-corner" transform="translate(500, 360) scale(-1, -1)">
          <path d="M 16 65 C 16 30, 30 16, 65 16" stroke="#059669" strokeWidth="2" />
          <path d="M 28 40 C 18 30, 12 22, 22 24 Z" fill="url(#fbLeafDark)" />
          <path d="M 40 28 C 30 18, 22 12, 24 22 Z" fill="url(#fbLeafLight)" />
          
          <g transform="translate(28, 28)">
            <circle cx="0" cy="0" r="12" fill="url(#fbRoseWhite)" />
            <circle cx="0" cy="0" r="7.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
          </g>
          
          <g transform="translate(65, 16) scale(0.85)">
            <use href="#jasmineBloom" />
          </g>
        </g>

        {/* LIGHT VINE & LEAF EXTENSIONS ALONG TOP & BOTTOM BORDER EDGES */}
        <g id="edge-decorations" opacity="0.85">
          {/* Top Edge Leaf Accent */}
          <path d="M 210 16 C 225 12, 235 12, 240 16 C 245 20, 235 22, 220 18 Z" fill="url(#fbLeafLight)" />
          <g transform="translate(250, 16) scale(0.75)">
            <use href="#jasmineBloom" />
          </g>
          <path d="M 290 16 C 275 12, 265 12, 260 16 Z" fill="url(#fbLeafDark)" />

          {/* Bottom Edge Leaf Accent */}
          <path d="M 220 344 C 235 348, 245 348, 250 344 Z" fill="url(#fbLeafLight)" />
          <g transform="translate(250, 344) scale(0.75)">
            <use href="#jasmineBloom" />
          </g>
        </g>

      </svg>

      {/* Card Content Slot */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}
