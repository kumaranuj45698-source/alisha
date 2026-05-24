import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Smile, MessageSquareLock, Check, Camera, Compass, Coffee } from 'lucide-react';
import { synth } from './MusicSynth';

interface ProposalProps {
  onYesPressed: () => void;
  isAccepted: boolean;
  setIsAccepted: (val: boolean) => void;
}

const NO_BUTTON_PHRASES = [
  "Oops, system error! Please click YES! 😉",
  "Alisha, is option pe dimaag mat lagao! 😂",
  "Arre, try again! No button is locked today! 😜",
  "My heart doesn't accept 'No'! ❤️",
  "Error: 'No' button has crashed! Click YES! 🤷‍♂️",
  "Ek baar fir se pyaari muskaan ke sath socho! 🥺",
  "Nice try, Alisha! But I love you too much! 😘",
  "Limit exceeded! Please click the big red button! ⏳💖"
];

const POLAROID_DATES = [
  {
    id: 1,
    title: "Chai & Conversations ☕",
    desc: "Countless hours of pure laughter and deep talks over endless warm cups of tea.",
    emoji: "👩‍❤️‍👨",
    icon: Coffee,
  },
  {
    id: 2,
    title: "Walks Under Stars 🌌",
    desc: "Holding hands tightly, walking while counting stars and planning our bright future.",
    icon: Compass,
    emoji: "✨"
  },
  {
    id: 3,
    title: "Capturing Every Smile 📸",
    desc: "Taking silly selfies together, making funny memories, and building our sweet home.",
    icon: Camera,
    emoji: "🧸"
  }
];

export default function Proposal({ onYesPressed, isAccepted, setIsAccepted }: ProposalProps) {
  // Escaping "No" button state
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noPhraseIdx, setNoPhraseIdx] = useState(0);
  const [noAttempts, setNoAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Confession form reply text
  const [replyName, setReplyName] = useState('Alisha');
  const [letterText, setLetterText] = useState('');
  const [messageSaved, setMessageSaved] = useState(false);

  // Load saved message if any
  useEffect(() => {
    const savedMsg = localStorage.getItem('alisha_reply');
    if (savedMsg) {
      setLetterText(savedMsg);
      setMessageSaved(true);
    }
  }, []);

  const handleEscapeNoButton = () => {
    // Play funny buzzer sound
    synth.playEscapeBuzzer();

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      // Button width and height limits safely inside container boundaries
      const safetyPadding = 70;
      const xMax = (containerRect.width / 2) - safetyPadding;
      const xMin = -(containerRect.width / 2) + safetyPadding;
      const yMax = (containerRect.height / 2) - safetyPadding;
      const yMin = -(containerRect.height / 2) + safetyPadding;

      // Choose a random location that forces movement
      const randomX = Math.random() * (xMax - xMin) + xMin;
      const randomY = Math.random() * (yMax - yMin) + yMin;

      setNoPosition({ x: randomX, y: randomY });
      setNoPhraseIdx((prev) => (prev + 1) % NO_BUTTON_PHRASES.length);
      setNoAttempts((prev) => prev + 1);
    }
  };

  const handleYes = () => {
    setIsAccepted(true);
    synth.playSuccessHarp();
    onYesPressed(); // Triggers the hearts burst multiple times
  };

  const saveReply = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('alisha_reply', letterText);
    setMessageSaved(true);
    synth.playNote(523.25, 0.8, "sine"); // Sweet C5 note
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[82vh] flex items-center justify-center p-2 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          /* ACTIVE PROPOSAL SCREEN */
          <motion.div
            key="propose-main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg glass-card rounded-3xl p-6 md:p-8 text-center border border-rose-100/50 relative custom-shadow z-10"
          >
            {/* Pulsing Big Loving Heart */}
            <div className="relative flex justify-center mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-[0_8px_16px_rgba(244,63,94,0.4)] cursor-pointer"
                onClick={handleYes}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white font-serif text-xs font-semibold select-none">
                Love AI
              </div>
            </div>

            {/* Glowing Message */}
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-900 tracking-tight leading-tight mb-3">
              Alisha, Will You Be Mine? 💍🥀
            </h2>
            <p className="font-cursive text-2xl text-rose-600 mb-6 font-semibold">
              Kya tum meri humsafar banogi?
            </p>

            <div className="font-sans text-rose-800/80 leading-relaxed text-sm md:text-base space-y-3 mb-10 max-w-sm mx-auto bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
              <p>
                Maine aapke liye saari shayari dil se likhi hai... Ab is dil ka aakhiri faisla aapke haath me hai.
              </p>
              <p className="font-medium text-rose-600">
                Alisha, you have my whole heart. Forever.
              </p>
            </div>

            {/* Speach bubble for fugitive No button */}
            <AnimatePresence>
              {noAttempts > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="bg-stone-900 text-stone-100 text-xs py-2 px-4 rounded-2xl shadow-md border border-stone-800 inline-block mb-8 relative"
                >
                  {NO_BUTTON_PHRASES[noPhraseIdx]}
                  {/* Speech bubble arrow */}
                  <div className="absolute w-2 h-2 bg-stone-900 rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons: Yes and No */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[100px] w-full">
              
              {/* YES BUTTON (Large, Glowing, Beautiful, Bouncing) */}
              <motion.button
                id="proposal-btn-yes"
                whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="w-40 py-4 font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-full hover:from-rose-600 hover:to-pink-700 glow-red transform tracking-wide text-lg cursor-pointer flex items-center justify-center gap-2"
              >
                HEAAAN! (YES) ❤️
              </motion.button>

              {/* OUTLAW NO BUTTON (Runaway Motion) */}
              <motion.button
                id="proposal-btn-no"
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                onMouseEnter={handleEscapeNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleEscapeNoButton();
                }}
                onClick={handleEscapeNoButton}
                className="w-32 py-2.5 rounded-full border-2 border-stone-300 text-stone-500 hover:text-stone-700 hover:bg-stone-100/50 cursor-default select-none font-medium text-sm text-center"
              >
                Nahi (No) 💔
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* CELEBRATION COMPONENT - WHEN ALISHA SAYS YES! */
          <motion.div
            key="celebration-screen"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="w-full max-w-xl glass-card rounded-3xl p-6 md:p-8 text-center border-2 border-rose-300 relative custom-shadow z-10"
          >
            {/* Sparkles effect icon */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose-500 text-white p-3.5 rounded-full glow-red h-14 w-14 flex items-center justify-center border-4 border-white">
              <Sparkles className="w-6 h-6 fill-white" />
            </div>

            <div className="mt-6 mb-8">
              <span className="text-3xl">🎉😭👩‍❤️‍👨💖🎉</span>
              <h1 className="font-serif text-3.5xl md:text-5.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mt-4 tracking-tight leading-none uppercase">
                Alisha Said Yes!
              </h1>
              <p className="font-cursive text-3xl font-semibold text-rose-800 tracking-wide mt-2">
                Aapne mera din aur meri puri duniya bana di!
              </p>
            </div>

            {/* Cute Imaginary Date Polaroids */}
            <h3 className="font-serif text-lg font-bold text-rose-950 mb-4 text-left border-b border-rose-100 pb-1.5 flex items-center gap-2">
              <span>✈️</span> Plans For Our Future Together:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {POLAROID_DATES.map((date) => {
                const Icon = date.icon;
                return (
                  <motion.div
                    key={date.id}
                    whileHover={{ y: -6, rotate: date.id % 2 === 0 ? 2 : -2 }}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-rose-50 flex flex-col justify-between text-left group"
                  >
                    <div className="w-full h-24 bg-rose-50/50 rounded-xl mb-3 flex items-center justify-center text-rose-500 relative overflow-hidden">
                      <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 z-10" />
                      <span className="absolute bottom-2 right-2 text-2xl opacity-60">{date.emoji}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/10 to-rose-200/20" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-rose-950 truncate mb-1">
                        {date.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        {date.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Love Reply Form */}
            <div className="bg-rose-50/60 border border-rose-100 p-5 rounded-2xl text-left">
              <div className="flex items-center gap-2 mb-3.5 text-rose-900 font-bold text-sm">
                <Smile className="w-4 h-4 text-rose-500" />
                <span>Write a cute message/reply back (Optional) 👇</span>
              </div>
              
              <form onSubmit={saveReply} className="space-y-3.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    placeholder="Apna Pyaara Naam..."
                    className="w-1/3 bg-white border border-rose-200 rounded-xl px-3 py-2 text-sm text-rose-900 focus:outline-none focus:ring-1 focus:ring-rose-400 font-medium"
                    required
                  />
                  <span className="text-xs text-rose-500 flex items-center font-cursive text-lg">Writes a love letter... ✍️</span>
                </div>
                
                <textarea
                  value={letterText}
                  onChange={(e) => {
                    setLetterText(e.target.value);
                    if (messageSaved) setMessageSaved(false);
                  }}
                  placeholder="Hey, write some sweet lines of your own here... Let me know how much you loved this! (stored in local backup)"
                  className="w-full h-20 bg-white border border-rose-200 rounded-xl p-3 text-sm text-rose-900 focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-stone-400"
                  required
                />

                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-[11px] text-stone-400">
                    {messageSaved ? "✓ Love letter saved successfully!" : "⚠️ Draft saves offline."}
                  </span>
                  
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {messageSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Saved!
                      </>
                    ) : (
                      "Lock Reply ❤️"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Back action / Reset to read shayari again */}
            <div className="mt-8 pt-4 border-t border-rose-100/50 flex justify-between items-center text-xs text-stone-450">
              <button
                onClick={() => {
                  synth.playNote(261.63, 0.5);
                  setIsAccepted(false);
                  setNoAttempts(0);
                  setNoPosition({ x:0, y:0 });
                }}
                className="text-rose-500 hover:text-rose-700 underline font-medium cursor-pointer"
              >
                ← Propose Screen firse dekein
              </button>
              <span className="font-mono text-rose-400">Happy Valentine's, Alisha! ❤️</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
