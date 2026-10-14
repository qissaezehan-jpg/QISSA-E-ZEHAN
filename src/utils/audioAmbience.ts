// Web Audio API ambient soundscape engine for Mushaira & Poetry contemplation

class MushairaAmbience {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private intervalId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tanpura classical drone simulation (Root C#3 ~ 138.59 Hz, Fifth G#3 ~ 207.65 Hz)
  public startDrone(type: 'tanpura' | 'sarangi_glow' = 'tanpura') {
    this.initContext();
    if (!this.ctx) return;
    this.stopDrone();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Fundamental frequencies for Indian Classical Tanpura (Sa, Pa, Sa')
    // C#3 = 138.59Hz, G#3 = 207.65Hz, C#4 = 277.18Hz
    const freqs = type === 'tanpura' 
      ? [138.59, 207.65, 277.18, 138.59 * 0.5] 
      : [146.83, 220.0, 293.66, 440.0];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Warm rich harmonics
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low frequency oscillator for gentle shimmer / breathing resonance
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      lfo.connect(gain.gain);
      lfo.start();
      this.oscillators.push(lfo);

      gain.gain.setValueAtTime(0.06 / (idx + 1), this.ctx.currentTime);
      osc.connect(gain);
      if (this.masterGain) {
        gain.connect(this.masterGain);
      }

      osc.start();
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });

    this.isPlaying = true;
  }

  public stopDrone() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.oscillators = [];
    this.gainNodes.forEach(g => {
      try {
        g.disconnect();
      } catch {
        // ignore
      }
    });
    this.gainNodes = [];
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stopDrone();
      return false;
    } else {
      this.startDrone('tanpura');
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Play traditional "Daad" celebratory chime
  public playDaadChime() {
    this.initContext();
    if (!this.ctx) return;

    const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bhairavi / Kalyan chime)
    chimeNotes.forEach((note, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.08);
      osc.stop(this.ctx.currentTime + i * 0.08 + 1.3);
    });
  }

  // Play subtle acoustic cue when microphone starts or stops listening
  public playMicCue(start: boolean) {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      if (start) {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      } else {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.12);
      }
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio context might be restricted
    }
  }

  // Web Speech API with rich event lifecycle
  public reciteWithEvents(options: {
    text: string;
    lang?: 'ur' | 'en';
    rate?: number;
    pitch?: number;
    voiceName?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: unknown) => void;
  }): SpeechSynthesisUtterance | null {
    if (!('speechSynthesis' in window)) {
      if (options.onError) options.onError(new Error('Speech synthesis not supported in this browser'));
      return null;
    }

    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const {
      text,
      lang = 'ur',
      rate = 0.82,
      pitch = 0.98,
      voiceName,
      onStart,
      onEnd,
      onError
    } = options;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // Poetic deliberate cadence
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();

    if (voiceName) {
      const selected = voices.find(v => v.name === voiceName);
      if (selected) utterance.voice = selected;
    } else if (lang === 'ur') {
      // Prioritize Urdu voices, then Hindi / regional voices that share phonetic phonemes
      const urduVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('ur') || 
        v.name.toLowerCase().includes('urdu')
      ) || voices.find(v => 
        v.lang.toLowerCase().startsWith('hi') || 
        v.name.toLowerCase().includes('hindi')
      );

      if (urduVoice) {
        utterance.voice = urduVoice;
      }
      utterance.lang = 'ur-PK';
    } else {
      utterance.lang = 'en-US';
    }

    if (onStart) utterance.onstart = () => onStart();
    if (onEnd) utterance.onend = () => onEnd();
    if (onError) utterance.onerror = (e) => onError(e);

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      if (onError) onError(err);
    }

    return utterance;
  }

  // Web Speech API for reciting Urdu or English (quick convenience wrapper)
  public reciteText(text: string, lang: 'ur' | 'en' = 'ur') {
    return this.reciteWithEvents({ text, lang });
  }

  public pauseRecitation() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public resumeRecitation() {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public stopRecitation() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices();
  }
}

export const ambienceEngine = new MushairaAmbience();
