import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Countdown({ targetDateString }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateString || '2026-12-15T10:30:00').getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsPast(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateString]);

  return (
    <section id="countdown" className="section-shell relative py-10 sm:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2rem] border border-[#d7b168]/70 bg-[linear-gradient(180deg,#4b1720_0%,#2a0d13_100%)] p-8 text-center shadow-[0_24px_60px_rgba(30,7,9,0.14)] sm:p-12"
      >
        <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full border border-[#f5dca6]/20" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full border border-[#f5dca6]/20" />

        <div className="relative z-10 mb-8">
          <Heart className="mx-auto mb-3 h-8 w-8 text-[#f5dca6]" />
          <h2 className="font-serif-heading text-3xl text-[#f8e8b7] sm:text-4xl">
            Counting down to our special day
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#f5dca6] to-transparent" />
        </div>

        {isPast ? (
          <div className="relative z-10 py-6 font-serif-heading text-2xl font-bold text-[#f8e8b7]">
            🎉 The celebration has begun! 🎉
          </div>
        ) : (
          <div className="relative z-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#f5dca6]/35 bg-[#fffaf5]/8 p-3 backdrop-blur-sm sm:p-4">
                <div className="font-serif-heading text-3xl font-bold text-[#f8e8b7] sm:text-5xl">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="mt-2 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#f5dca6] sm:text-[0.66rem]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
