// Procedural Sound Engine for Ananthu CA Triangle
class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientGain: GainNode | null = null;
  private isEnabled = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleAmbient(forceState?: boolean): boolean {
    this.init();
    if (!this.ctx) return false;

    const targetState = forceState !== undefined ? forceState : !this.isEnabled;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (targetState) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }

    return this.isEnabled;
  }

  private startAmbient() {
    if (this.ambientOsc || !this.ctx) return;

    try {
      // Harmonic low-frequency cinematic drone
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sawtooth';
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
      this.ambientFilter.Q.setValueAtTime(5, this.ctx.currentTime);

      // Subtle LFO modulation to keep it animated and luxury-like
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // very slow
      lfoGain.gain.setValueAtTime(30, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.ambientFilter.frequency);
      lfo.start();

      this.ambientOsc.connect(this.ambientFilter);
      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      // Slow fade-in duration
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      this.ambientOsc.start();
      this.isEnabled = true;
    } catch (e) {
      console.warn('Audio launch postponed until interaction', e);
    }
  }

  private stopAmbient() {
    if (!this.ctx || !this.ambientGain || !this.ambientOsc) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      const osc = this.ambientOsc;
      setTimeout(() => {
        try {
          osc.stop();
        } catch (err) {}
      }, 1500);

      this.ambientOsc = null;
      this.ambientGain = null;
      this.ambientFilter = null;
      this.isEnabled = false;
    } catch (e) {
      console.error(e);
    }
  }

  public playHover() {
    this.init();
    if (!this.ctx || !this.isEnabled || this.ctx.state === 'suspended') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const bandpass = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.12);

      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(300, this.ctx.currentTime);
      bandpass.Q.setValueAtTime(3, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  public playClick() {
    this.init();
    if (!this.ctx || !this.isEnabled || this.ctx.state === 'suspended') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  public playActionTransition() {
    this.init();
    if (!this.ctx || !this.isEnabled || this.ctx.state === 'suspended') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, this.ctx.currentTime + 0.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.0);
    } catch (e) {}
  }

  public getActiveState(): boolean {
    return this.isEnabled;
  }
}

export const soundEngine = new SoundEngine();
