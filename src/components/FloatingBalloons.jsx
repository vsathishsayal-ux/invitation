import React, { useMemo } from 'react';

export default function FloatingBalloons({ count = 6, zIndex = 'z-30' }) {
  // Ultra-realistic 3D small balloons placed gracefully along screen edges (3 on left, 3 on right)
  const balloons = useMemo(() => {
    const colorSchemes = [
      {
        name: 'champagne',
        body: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #fff7e6 20%, #e6c594 58%, #a67c3b 100%)',
        shadow: 'rgba(110, 80, 30, 0.3)',
        string: '#d4af37'
      },
      {
        name: 'royalMaroon',
        body: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #a83246 22%, #7d1927 60%, #30060d 100%)',
        shadow: 'rgba(60, 10, 20, 0.4)',
        string: '#f3e5ab'
      },
      {
        name: 'gold',
        body: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #fff6cb 20%, #d4af37 60%, #8c6405 100%)',
        shadow: 'rgba(100, 70, 10, 0.35)',
        string: '#aa771c'
      },
      {
        name: 'ivory',
        body: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #fffdf8 30%, #f3ebdb 65%, #b5ac8b 100%)',
        shadow: 'rgba(90, 80, 60, 0.25)',
        string: '#c5a059'
      },
      {
        name: 'rosePink',
        body: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #ffedf0 20%, #e8a5a5 60%, #9c5555 100%)',
        shadow: 'rgba(130, 50, 60, 0.3)',
        string: '#e2a7a7'
      }
    ];

    const perSide = Math.max(2, Math.floor(count / 2));

    // Left screen margin balloons (2.5% to 13%)
    const leftBalloons = Array.from({ length: perSide }).map((_, i) => {
      const leftPercent = 2.5 + (i * 4.5) + (Math.random() * 1.5);
      const scheme = colorSchemes[i % colorSchemes.length];
      const scale = 0.55 + Math.random() * 0.3;
      const duration = 8.5 + Math.random() * 5.5; // Slow, luxurious float
      const delay = i * 2.5;
      const drift = (Math.random() - 0.5) * 24;

      return {
        id: `balloon-left-${i}`,
        left: leftPercent,
        scheme,
        scale,
        duration,
        delay,
        drift
      };
    });

    // Right screen margin balloons (84.5% to 95%)
    const rightBalloons = Array.from({ length: perSide }).map((_, i) => {
      const leftPercent = 84.5 + (i * 4.5) + (Math.random() * 1.5);
      const scheme = colorSchemes[(i + 2) % colorSchemes.length];
      const scale = 0.55 + Math.random() * 0.3;
      const duration = 8.5 + Math.random() * 5.5;
      const delay = (i * 2.5) + 1.25;
      const drift = (Math.random() - 0.5) * 24;

      return {
        id: `balloon-right-${i}`,
        left: leftPercent,
        scheme,
        scale,
        duration,
        delay,
        drift
      };
    });

    return [...leftBalloons, ...rightBalloons];
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none ${zIndex} overflow-hidden`} aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-0 pointer-events-none transform-gpu"
          style={{
            left: `${b.left}%`,
            animation: `realisticBalloonFly ${b.duration}s cubic-bezier(0.25, 0.65, 0.35, 1) infinite`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div
            className="relative flex flex-col items-center animate-balloon-sway"
            style={{
              transform: `scale(${b.scale}) translateX(${b.drift}px)`,
            }}
          >
            {/* Photorealistic 3D Small Oval Balloon Body */}
            <div
              className="relative w-9 h-11 sm:w-11 sm:h-14 rounded-t-[50%] rounded-b-[45%]"
              style={{
                background: b.scheme.body,
                boxShadow: `0 8px 16px ${b.scheme.shadow}, inset 5px 5px 12px rgba(255,255,255,0.85)`,
              }}
            >
              {/* Gloss Specular Curve Highlight 1 */}
              <div
                className="absolute top-1.5 left-2 w-2.5 h-5 sm:w-3 sm:h-6 rounded-full bg-white/70"
                style={{ transform: 'rotate(-28deg)' }}
              />
              {/* Gloss Soft Rim Highlight 2 */}
              <div className="absolute top-3 left-3.5 w-1.5 h-2.5 rounded-full bg-white/50 blur-[0.4px] transform -rotate-12" />
            </div>

            {/* Balloon Tied Knot */}
            <div
              className="w-2.5 h-2 rounded-b-sm -mt-0.5 shadow-sm"
              style={{ background: b.scheme.string }}
            />

            {/* Natural Curling Silk Ribbon String */}
            <svg
              width="18"
              height="65"
              viewBox="0 0 18 65"
              fill="none"
              className="opacity-80 -mt-0.5"
            >
              <path
                d="M9 0 C 4 15, 14 30, 9 45 C 4 55, 14 60, 9 65"
                stroke={b.scheme.string}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
