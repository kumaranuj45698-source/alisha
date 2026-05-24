import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { synth } from './MusicSynth';

export default function SoundButton() {
  const [muted, setMuted] = useState(true); // Default to muted to comply with browser autocomplete policies smoothly
  const [interactionRegistered, setInteractionRegistered] = useState(false);

  useEffect(() => {
    // Sync initial state
    synth.setMuted(muted);
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    synth.setMuted(nextMuted);
    
    if (!nextMuted) {
      synth.init();
      // Start ambient melody
      synth.startMelody();
      // Play a lovely high note to acknowledge sound activation
      synth.playNote(523.25, 1.0); // C5
    } else {
      synth.stopMelody();
    }
    setInteractionRegistered(true);
  };

  // Register first document-wide click to optionally start music or setup audio context
  useEffect(() => {
    const handleFirstClick = () => {
      if (!interactionRegistered && muted) {
        // Just warm up the web audio context
        synth.init();
      }
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [interactionRegistered, muted]);

  return (
    <button
      id="sound-toggle-btn"
      onClick={toggleSound}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full cursor-pointer transition-all duration-300 shadow-md ${
        muted
          ? 'bg-rose-50 border border-rose-100 text-rose-500 hover:bg-rose-100'
          : 'bg-rose-500 text-white hover:bg-rose-600 glow-red'
      }`}
      title={muted ? "Play romantic background music" : "Mute music"}
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        {muted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4 animate-bounce" />
        )}
      </div>
      <span className="text-xs font-medium tracking-wide">
        {muted ? "Music: OFF" : "Music: ON"}
      </span>

      {/* Visual equalizer lines when unmuted */}
      {!muted && (
        <div className="flex items-end gap-[2px] h-3 ml-1">
          <div className="w-[2px] bg-white rounded-full animate-pulse h-3" style={{ animationDelay: '0ms' }} />
          <div className="w-[2px] bg-white rounded-full animate-pulse h-1.5" style={{ animationDelay: '150ms' }} />
          <div className="w-[2px] bg-white rounded-full animate-pulse h-2.5" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </button>
  );
}
