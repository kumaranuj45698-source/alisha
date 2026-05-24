/**
 * Romantic Music Synthesizer
 * Uses Web Audio API to synthesize beautiful piano/harp chords and chime sounds without external assets.
 */

class RomanticSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgTimer: any = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMelody();
    }
  }

  getIsMuted() {
    return this.isMuted;
  }

  // Play a single soft pluck sound (like a harp or music box)
  public playNote(freq: number, duration: number = 0.8, type: OscillatorType = "sine") {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const delayNode = this.ctx.createDelay();
      const feedbackNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      // Add soft delay for a dream-like echo space effect
      delayNode.delayTime.setValueAtTime(0.15, this.ctx.currentTime);
      feedbackNode.gain.setValueAtTime(0.3, this.ctx.currentTime);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      // Connect delay path
      gainNode.connect(delayNode);
      delayNode.connect(feedbackNode);
      feedbackNode.connect(delayNode);
      delayNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }

  // Play a beautiful romantic C-major scale wave on success (accepting proposal)
  public playSuccessHarp() {
    if (this.isMuted) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 1.2, "sine");
      }, idx * 100);
    });
  }

  // Play a comedic quick buzzer note for the escaping "No" button
  public playEscapeBuzzer() {
    if (this.isMuted) return;
    this.playNote(150, 0.25, "triangle");
    setTimeout(() => {
      this.playNote(120, 0.35, "triangle");
    }, 100);
  }

  // Play beautiful soft chords in sequence (ambient loop)
  public startMelody() {
    if (this.isMuted) return;
    this.stopMelody();

    // Chords of progression: Am, F, C, G (classical emotional progression)
    const am = [220.00, 261.63, 329.63, 440.00]; // A3, C4, E4, A4
    const f = [174.61, 261.63, 349.23, 440.00];  // F3, C4, F4, A4
    const c = [261.63, 329.63, 392.00, 523.25];  // C4, E4, G4, C5
    const g = [196.00, 293.66, 392.00, 493.88];  // G3, D4, G4, B4

    const chords = [am, f, c, g];
    let currentChordIndex = 0;

    const playNextChord = () => {
      if (this.isMuted) return;
      
      const chord = chords[currentChordIndex];
      // Arpeggiate chord notes
      chord.forEach((note, idx) => {
        setTimeout(() => {
          if (!this.isMuted) {
            this.playNote(note * 1.5, 2.5, "sine");
          }
        }, idx * 250);
      });

      currentChordIndex = (currentChordIndex + 1) % chords.length;
      // Repeat chord every 4.5 seconds
      this.bgTimer = setTimeout(playNextChord, 4500);
    };

    // Begin
    playNextChord();
  }

  public stopMelody() {
    if (this.bgTimer) {
      clearTimeout(this.bgTimer);
      this.bgTimer = null;
    }
  }
}

export const synth = new RomanticSynth();
