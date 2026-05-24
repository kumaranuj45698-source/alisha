import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeartParticle {
  id: number;
  x: number; // percentage width 0 - 100
  y: number; // initial bottom offset
  size: number; // random size
  delay: number;
  duration: number;
  rotate: number;
  color: string;
}

interface HeartsEffectProps {
  burstTrigger: number;
}

const colors = [
  'text-rose-400',
  'text-pink-400',
  'text-rose-500',
  'text-pink-500',
  'text-rose-300',
  'text-pink-300',
  'text-red-400'
];

export default function HeartsEffect({ burstTrigger }: HeartsEffectProps) {
  const [backgroundHearts, setBackgroundHearts] = useState<HeartParticle[]>([]);
  const [burstHearts, setBurstHearts] = useState<HeartParticle[]>([]);

  // Generate gentle background floating hearts
  useEffect(() => {
    const initialHearts: HeartParticle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 12 + 10,
      rotate: Math.random() * 60 - 30,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setBackgroundHearts(initialHearts);

    // Keep background hearts looping
    const interval = setInterval(() => {
      setBackgroundHearts(prev => 
        prev.map(heart => {
          if (Math.random() > 0.8) {
            return {
              ...heart,
              x: Math.random() * 100,
              size: Math.random() * 20 + 10,
              duration: Math.random() * 12 + 10,
              rotate: Math.random() * 60 - 30,
              color: colors[Math.floor(Math.random() * colors.length)]
            };
          }
          return heart;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Trigger high-volume spectacular explosion of hearts from the center
  useEffect(() => {
    if (burstTrigger > 0) {
      const newBurst = Array.from({ length: 48 }).map((_, i) => ({
        id: Date.now() + i,
        x: 40 + Math.random() * 20, // Center cluster
        y: 50, // Center height
        size: Math.random() * 30 + 15,
        delay: Math.random() * 0.4,
        duration: Math.random() * 2.5 + 1.2,
        rotate: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setBurstHearts(prev => [...prev, ...newBurst]);

      // Cleanup burst hearts after they animate away
      const timeout = setTimeout(() => {
        setBurstHearts([])
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [burstTrigger]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background drifting hearts */}
      {backgroundHearts.map(heart => (
        <motion.div
          key={heart.id}
          className={`absolute ${heart.color} opacity-40`}
          initial={{ y: '110vh', x: `${heart.x}vw`, rotate: heart.rotate, scale: 0.2 }}
          animate={{
            y: '-10vh',
            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`, `${heart.x}vw`],
            scale: [0.2, 1, 0.8]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear'
          }}
          style={{ width: heart.size, height: heart.size }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Explosion Burst Hearts */}
      <AnimatePresence>
        {burstHearts.map(heart => {
          const angle = (Math.random() * 360 * Math.PI) / 180;
          const distance = Math.random() * 120 + 80; // Distance to push
          const destX = Math.cos(angle) * distance;
          const destY = Math.sin(angle) * distance - 250; // Fly upwards significantly

          return (
            <motion.div
              key={heart.id}
              className={`absolute ${heart.color} drop-shadow-[0_4px_10px_rgba(244,63,94,0.5)]`}
              initial={{ x: '50vw', y: '50vh', scale: 0, opacity: 0.9, rotate: 0 }}
              animate={{
                x: `calc(50vw + ${destX}px)`,
                y: `calc(50vh + ${destY}px)`,
                scale: [0.5, 1.4, 0.8, 0],
                rotate: heart.rotate,
                opacity: [0.9, 1, 0.4, 0]
              }}
              transition={{
                duration: heart.duration,
                ease: 'easeOut',
                delay: heart.delay
              }}
              style={{ width: heart.size, height: heart.size, marginLeft: -heart.size / 2, marginTop: -heart.size / 2 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
