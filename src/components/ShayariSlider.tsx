import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Feather } from 'lucide-react';
import { synth } from './MusicSynth';

interface ShayariSliderProps {
  onContinue: () => void;
}

const SHAYARI_LIST = [
  {
    id: 1,
    title: "The First Feeling ✨",
    lines: [
      "Tumhe dekha toh ek khwaab sa laga,",
      "Tumhe socha toh ek pyara ehsaas mila...",
      "Alisha, your beautiful smile lights up",
      "my entire world, every single day!"
    ],
    translation: "Looking at you feels like a dream alive. Thinking of you makes my heart warm.",
    meterLabel: "Love Level: Infinite ♾️",
    bgAccent: "from-rose-50 to-pink-100/50"
  },
  {
    id: 2,
    title: "My Safest Haven 🏡❤️",
    lines: [
      "Dil ki deewaron par bas naam hai tumhara,",
      "Tum mile toh mila hai mujhe sahara...",
      "With you by my side,",
      "every second feels like pure magic!"
    ],
    translation: "Your name is written on the walls of my heart. Your hand in mine is my ultimate anchor.",
    meterLabel: "Beating Rate: 160 BPM 💓",
    bgAccent: "from-pink-50 to-rose-100/30"
  },
  {
    id: 3,
    title: "All I Need 🌹✨",
    lines: [
      "Na chahiye mujhe is zamane ki daulat,",
      "na chahiye koi bada khushiyon ka mela...",
      "Keh do bas tum khush ho saath mere,",
      "meri jannat toh tumhare hi aanchal me hai!"
    ],
    translation: "I do not seek global riches or transient celebrations. Your smile in my arms is my heaven.",
    meterLabel: "Forever Promise: 100% 🤝",
    bgAccent: "from-rose-50/80 to-rose-100/40"
  },
  {
    id: 4,
    title: "The Center of My Sky 🌅",
    lines: [
      "Teri muskaan se din mera shuru hota hai,",
      "Tere bina yeh dil adhura-adhura sa sota hai...",
      "You are my ultimate peace, my home,",
      "and my most wonderful, favorite thought!"
    ],
    translation: "My sky is bright because you smile. My heart remains complete only when you are near.",
    meterLabel: "Soul Connection: Absolute 👩‍❤️‍👨",
    bgAccent: "from-pink-50/70 to-pink-100/40"
  }
];

export default function ShayariSlider({ onContinue }: ShayariSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const handleNext = () => {
    // Play sweet key sound
    synth.playNote(392.00 + currentIdx * 50, 0.5, "sine");
    if (currentIdx < SHAYARI_LIST.length - 1) {
      setDirection(1);
      setCurrentIdx(currentIdx + 1);
    } else {
      onContinue();
    }
  };

  const handlePrev = () => {
    synth.playNote(293.66 + currentIdx * 30, 0.5, "sine");
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(currentIdx - 1);
    }
  };

  const currentShayari = SHAYARI_LIST[currentIdx];

  // Framer Motion slide transition settings
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] p-4 max-w-lg mx-auto">
      {/* Narrative Progress Header */}
      <div className="w-full flex items-center justify-between mb-8 px-2 z-10">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
          Step {currentIdx + 1} of {SHAYARI_LIST.length}: Shayari for Alisha
        </span>
        <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full text-rose-500 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          Love Meter Active
        </div>
      </div>

      {/* Main card viewport */}
      <div className="relative w-full h-[400px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentShayari.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute w-full h-full glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between custom-shadow border-2 border-rose-200/40 relative overflow-hidden`}
          >
            {/* Subtle romantic corner accents */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-20 h-20 text-rose-500" />
            </div>
            
            {/* Heading / Cute Card Tag */}
            <div className="flex items-center gap-2 mb-4">
              <Feather className="w-4 h-4 text-rose-400" />
              <h3 className="font-serif text-lg font-bold text-rose-800 tracking-tight">
                {currentShayari.title}
              </h3>
            </div>

            {/* Core Lines of Roman poetry/Shayari */}
            <div className="flex-grow flex flex-col justify-center my-4 space-y-3.5">
              {currentShayari.lines.map((line, idx) => (
                <p 
                  key={idx} 
                  className={`font-serif text-lg md:text-xl font-medium tracking-wide text-rose-950 ${
                    idx % 2 === 1 ? 'pl-4 italic text-rose-800' : 'text-rose-900'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Bottom Translation and Card Footer info */}
            <div className="border-t border-rose-100/60 pt-4 mt-auto">
              <p className="text-xs italic font-sans text-stone-600 mb-4 tracking-wide leading-relaxed">
                "{currentShayari.translation}"
              </p>

              {/* Romantic gauge/tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wide text-pink-600 bg-pink-100/40 px-2.5 py-1 rounded-full">
                  {currentShayari.meterLabel}
                </span>

                {/* Sparkling Mini Hearts */}
                <span className="flex items-center gap-0.5 text-rose-400">
                  {Array.from({ length: currentShayari.id }).map((_, i) => (
                    <Heart key={i} className="w-3.5 h-3.5 fill-rose-400" />
                  ))}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicator Bullets */}
      <div className="flex justify-center gap-1.5 mt-6 z-10">
        {SHAYARI_LIST.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              synth.playNote(261.63 + idx * 50, 0.4);
              setDirection(idx > currentIdx ? 1 : -1);
              setCurrentIdx(idx);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIdx 
                ? 'bg-rose-500 scale-125 shadow-sm shadow-rose-300' 
                : 'bg-rose-200 hover:bg-rose-300'
            }`}
          />
        ))}
      </div>

      {/* Back and Forward Controller Trigger actions */}
      <div className="flex items-center justify-between w-full mt-8 gap-4 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            currentIdx === 0
              ? 'text-rose-300 pointer-events-none opacity-40'
              : 'text-rose-700 bg-white shadow-sm border border-rose-100 hover:bg-rose-50 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Peeche
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-600 font-semibold text-sm shadow-md hover:from-rose-600 hover:to-pink-700 glow-red transform hover:scale-103 cursor-pointer transition-all duration-300"
        >
          {currentIdx === SHAYARI_LIST.length - 1 ? (
            <>
              Dil Ki Baat Suno 💖
              <Heart className="w-4 h-4 fill-white" />
            </>
          ) : (
            <>
              Aage Chalo
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
