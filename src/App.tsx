/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, HelpCircle, Sparkles } from 'lucide-react';
import { ScreenState } from './types';
import SoundButton from './components/SoundButton';
import HeartsEffect from './components/HeartsEffect';
import Envelope from './components/Envelope';
import ShayariSlider from './components/ShayariSlider';
import Proposal from './components/Proposal';
import { synth } from './components/MusicSynth';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('envelope');
  const [isAccepted, setIsAccepted] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  // Trigger hearts particle explosion from hearts emitter
  const triggerHeartsBurst = () => {
    setBurstTrigger(prev => prev + 1);
    // Extra sparkles
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        setBurstTrigger(prev => prev + 1);
      }, i * 200);
    }
  };

  const handleOpenEnvelope = () => {
    setScreen('letter');
  };

  const handleStartShayari = () => {
    synth.playNote(349.23, 0.4); // F4
    setScreen('shayari');
  };

  const handleStartProposal = () => {
    synth.playNote(440.00, 0.5); // A4
    setScreen('propose');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden romantic-gradient text-stone-900 font-sans">
      
      {/* Background Hearts Particle Flow & Bursts */}
      <HeartsEffect burstTrigger={burstTrigger} />

      {/* Persistent Floating Sound & Music Controller */}
      <SoundButton />

      {/* Central Screen Renderer */}
      <main className="flex-grow flex items-center justify-center w-full max-w-5xl mx-auto px-4 py-12 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: MYSTERY ENVELOPE */}
          {screen === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <Envelope onOpen={handleOpenEnvelope} />
            </motion.div>
          )}

          {/* STEP 2: CUTE PERSONAL LETTER COVER */}
          {screen === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <div className="glass-card rounded-3xl p-6 md:p-8 text-center custom-shadow border-2 border-rose-100 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white p-3 rounded-full glow-red">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                
                <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-rose-950 mt-4 mb-4 tracking-tight">
                  Pyaari Alisha Ke Liye... 💌
                </h2>

                <div className="font-sans text-rose-900 text-sm md:text-base leading-relaxed text-left space-y-4 my-6 bg-rose-50/40 p-4.5 rounded-2xl border border-rose-100">
                  <p>
                    Hey Alisha, you are someone extremely beautiful and close to my heart. Aapke aane se zindagi me jo raunak aayi hai, ushe lafzon me bayaan kar pana mushkil hai.
                  </p>
                  <p>
                    Isiliye maine apne dil ko thoda hawa di hai aur aapke liye kuch madhur shayariyan (mixed with Hindi & English feels) likhi hain. 
                  </p>
                  <p>
                    Aage chalne ke liye niche button par touch karein aur muskura kar padhein! 💕
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartShayari}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm rounded-full shadow-md glow-red transform transition-all cursor-pointer"
                >
                  Shayari Padhein 🌹🏼
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: POETRY SLIDESHOW CAROUSEL */}
          {screen === 'shayari' && (
            <motion.div
              key="shayari"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <ShayariSlider onContinue={handleStartProposal} />
            </motion.div>
          )}

          {/* STEP 4: CORE PROPOSAL & RECEPT FLOW */}
          {screen === 'propose' && (
            <motion.div
              key="propose"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <Proposal 
                onYesPressed={triggerHeartsBurst} 
                isAccepted={isAccepted} 
                setIsAccepted={setIsAccepted} 
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Decorative Interactive Bottom Timeline Marker Tracker */}
      <footer className="w-full py-4 px-6 border-t border-rose-100/30 bg-white/10 backdrop-blur-sm flex justify-between items-center text-xs text-rose-500 font-medium z-10">
        <div className="flex items-center gap-1.5 opacity-80">
          <Sparkles className="w-4 h-4 fill-rose-100 text-rose-400" />
          <span>Crafted with endless love & care</span>
        </div>

        {/* Dynamic Timeline Dots */}
        <div className="flex items-center gap-3">
          <span 
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              screen === 'envelope' ? 'bg-rose-500 scale-125' : 'bg-rose-300'
            }`} 
          />
          <span 
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              screen === 'letter' ? 'bg-rose-500 scale-125' : 'bg-rose-300'
            }`} 
          />
          <span 
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              screen === 'shayari' ? 'bg-rose-500 scale-125' : 'bg-rose-300'
            }`} 
          />
          <span 
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              screen === 'propose' && !isAccepted ? 'bg-rose-500 scale-125' : 'bg-rose-300'
            }`} 
          />
          <span 
            className={`w-3.5 h-3.5 flex items-center justify-center rounded-full transition-all ${
              isAccepted ? 'bg-rose-500 scale-125 glow-red' : 'bg-rose-100 text-rose-300'
            }`}
          >
            <Heart className="w-2.5 h-2.5 fill-current" />
          </span>
        </div>
      </footer>
    </div>
  );
}
