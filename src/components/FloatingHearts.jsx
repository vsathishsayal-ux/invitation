import React, { useId, useMemo } from 'react';

const heartColors = ['#e8a5b2', '#d97589', '#c95670', '#d4af37'];
const heartSymbols = ['♡', '♥'];

const randomValue = (seed, index, step) => {
  const seedValue = [...seed].reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  const value = Math.sin((seedValue + 1) * (index * 8 + step + 1)) * 10000;
  return value - Math.floor(value);
};

export default function FloatingHearts({ count = 12, zIndex = 'z-10' }) {
  const instanceId = useId();
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const random = (step) => randomValue(instanceId, index, step);
        return {
          id: index,
          left: 3 + random(0) * 94,
          size: 12 + random(1) * 9,
          duration: 12 + random(2) * 9,
          delay: random(3) * 14,
          drift: (random(4) - 0.5) * 70,
          rotation: (random(5) - 0.5) * 50,
          color: heartColors[Math.floor(random(6) * heartColors.length)],
          symbol: heartSymbols[Math.floor(random(7) * heartSymbols.length)],
        };
      }),
    [count, instanceId],
  );

  return (
    <div className={`fixed inset-0 ${zIndex} overflow-hidden pointer-events-none`} aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart absolute bottom-[-2rem] block select-none"
          style={{
            left: `${heart.left}%`,
            color: heart.color,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            '--heart-drift': `${heart.drift}px`,
            '--heart-rotation': `${heart.rotation}deg`,
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  );
}
