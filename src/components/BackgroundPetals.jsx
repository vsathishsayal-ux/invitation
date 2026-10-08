import React, { useMemo } from 'react';

export default function BackgroundPetals({ count = 18 }) {
  const petals = useMemo(() => {
    const types = ['🌹', '🌸', '✨', '🌺', '🌼'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      symbol: types[i % types.length],
      left: Math.random() * 100, // percentage
      delay: Math.random() * 8, // seconds
      duration: 10 + Math.random() * 12, // seconds
      size: 14 + Math.random() * 16, // px
      rotation: Math.random() * 360,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-40px] opacity-70 transition-opacity"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animation: `petalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          {petal.symbol}
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
