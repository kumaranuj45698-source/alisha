import React from 'react';
import { motion } from 'motion/react';
import { Heart, MailOpen } from 'lucide-react';
import { synth } from './MusicSynth';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const handleClick = () => {
    // Play warm music note
    synth.playNote(329.63, 0.8, "sine"); // E4
    setTimeout(() => {
      synth.playNote(392.00, 1.0, "sine"); // G4
    }, 150);
    onOpen();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md w-full"
      >
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100/50 text-rose-500 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-rose-500 animate-pulse text-rose-500" />
          A Secret Valentine Delivery
        </div>

        {/* Title */}
        <h1 className="font-serif text-3.5xl md:text-5xl font-bold text-rose-900 tracking-tight leading-tight mb-4">
          Hey <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 font-extrabold relative">
            Alisha
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-rose-200/50 rounded" />
          </span> ✨
        </h1>
        <p className="font-sans text-rose-700/80 mb-10 text-sm md:text-base max-w-sm mx-auto">
          Apne dil me thodi jagah banaye rakhiye... Kyuki aapke liye ek bahut hi madhur aur pyaara sa sandesh aaya hai! 💌
        </p>

        {/* Interactive Interactive Envelope Container */}
        <motion.div 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 border-2 border-dashed border-rose-200 cursor-pointer custom-shadow hover:border-solid hover:border-rose-400/80 transition-all duration-300 group"
          id="mystery-envelope-wrapper"
        >
          {/* Pulsing Backglow */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl -z-10 opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-500" />

          {/* Letter Icon Envelope Wrapper */}
          <div className="relative flex flex-col items-center py-6">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative flex items-center justify-center w-28 h-28 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-lg shadow-rose-300/40 border border-rose-400/30 group-hover:from-rose-500 group-hover:to-pink-600"
            >
              <Heart className="w-14 h-14 text-white fill-white/10 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Inner Mini Sealed Stamp */}
              <div className="absolute w-12 h-12 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm -bottom-3 -right-3 flex items-center justify-center shadow-md">
                <span className="text-white text-base">💝</span>
              </div>
            </motion.div>

            {/* Inscription label */}
            <div className="mt-8">
              <span className="font-cursive text-3xl font-bold text-rose-800 tracking-wide block">
                For Alisha Jaan ❤️
              </span>
              <p className="font-sans text-xs font-semibold text-rose-500/80 tracking-widest uppercase mt-1">
                TAP TO OPEN SURPRISE
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <p className="text-xs font-mono text-rose-400 mt-6">
          Hint: Turn up your volume or turn on Music on top right for full feels! 🎧
        </p>
      </motion.div>
    </div>
  );
}
