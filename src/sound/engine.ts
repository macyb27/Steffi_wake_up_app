export type AlarmSoundName = 'Lullaby' | 'Sunrise' | 'Chiptune' | 'Ocean' | 'SoftPiano';

export type AlarmPlayer = {
  stop: () => void;
};

function createContext(): AudioContext {
  const Ctx: typeof AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
  return new Ctx();
}

function envelope(gain: GainNode, ctx: AudioContext, start: number, attack = 0.02, decay = 0.3, sustain = 0.3, release = 0.3) {
  const now = start;
  gain.gain.cancelScheduledValues(0);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(1.0, now + attack);
  gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  return (endAt: number) => {
    gain.gain.setTargetAtTime(0.0001, endAt, release);
  };
}

function playNote(ctx: AudioContext, dest: AudioNode, freq: number, when: number, duration: number, type: OscillatorType = 'sine') {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const release = envelope(gain, ctx, when);
  osc.connect(gain).connect(dest);
  osc.start(when);
  release(when + duration);
  osc.stop(when + duration + 0.05);
}

function makeMaster(ctx: AudioContext, volume: number) {
  const master = ctx.createGain();
  master.gain.value = Math.max(0, Math.min(1, volume));
  master.connect(ctx.destination);
  return master;
}

function lullaby(ctx: AudioContext, dest: AudioNode, t0: number) {
  const base = 392; // G4
  const seq = [0, 2, 4, 7, 4, 2, 0, -3, 0, 2, 4, 5, 4, 2, 0];
  seq.forEach((s, i) => playNote(ctx, dest, base * Math.pow(2, s/12), t0 + i * 0.4, 0.35, 'triangle'));
}

function sunrise(ctx: AudioContext, dest: AudioNode, t0: number) {
  const base = 330; // E4 arpeggio
  const seq = [0, 4, 7, 12, 19, 24, 19, 12, 7, 4];
  seq.forEach((s, i) => playNote(ctx, dest, base * Math.pow(2, s/12), t0 + i * 0.3, 0.25, 'sawtooth'));
}

function chiptune(ctx: AudioContext, dest: AudioNode, t0: number) {
  const base = 440;
  const seq = [0, 7, 12, 7, 0, -5, 0, 7];
  seq.forEach((s, i) => playNote(ctx, dest, base * Math.pow(2, s/12), t0 + i * 0.18, 0.14, 'square'));
}

function ocean(ctx: AudioContext, dest: AudioNode, t0: number) {
  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.6;
  }
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  const gain = ctx.createGain();
  gain.gain.value = 0.25;
  noise.connect(filter).connect(gain).connect(dest);
  noise.start(t0);
  noise.stop(t0 + 4);
}

function softPiano(ctx: AudioContext, dest: AudioNode, t0: number) {
  const base = 261.63; // C4
  const seq = [0, 3, 7, 12, 7, 3, 0];
  seq.forEach((s, i) => playNote(ctx, dest, base * Math.pow(2, s/12), t0 + i * 0.5, 0.45, 'sine'));
}

export function playAlarmLoop(sound: AlarmSoundName, volume: number): AlarmPlayer {
  const ctx = createContext();
  const master = makeMaster(ctx, volume);
  let stopped = false;
  function cycle() {
    if (stopped) return;
    const t0 = ctx.currentTime + 0.05;
    switch (sound) {
      case 'Lullaby': lullaby(ctx, master, t0); break;
      case 'Sunrise': sunrise(ctx, master, t0); break;
      case 'Chiptune': chiptune(ctx, master, t0); break;
      case 'Ocean': ocean(ctx, master, t0); break;
      case 'SoftPiano': softPiano(ctx, master, t0); break;
    }
    setTimeout(cycle, 2200);
  }
  cycle();
  return {
    stop: () => {
      stopped = true;
      try { ctx.close(); } catch {}
    }
  };
}

export function playClick() {
  const ctx = createContext();
  const gain = ctx.createGain();
  gain.gain.value = 0.2;
  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.value = 880;
  osc.connect(gain).connect(ctx.destination);
  const now = ctx.currentTime;
  osc.start(now);
  osc.stop(now + 0.05);
  setTimeout(() => ctx.close(), 300);
}
