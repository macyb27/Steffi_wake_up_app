export type Envelope = {
  attack: number
  decay: number
  sustain: number
  release: number
}

export type PresetName = 'sunriseChimes' | 'ocean' | 'birdsong' | 'lofi'

export type SoundPreset = {
  name: PresetName
  build: (ctx: AudioContext, destination: AudioNode, time: number) => void
}

// Utility to create a gentle gain envelope
function applyEnvelope(gain: GainNode, startTime: number, env: Envelope) {
  const g = gain.gain
  g.cancelScheduledValues(0)
  g.setValueAtTime(0.0001, startTime)
  g.linearRampToValueAtTime(1.0, startTime + env.attack)
  g.linearRampToValueAtTime(env.sustain, startTime + env.attack + env.decay)
}

function releaseEnvelope(gain: GainNode, releaseTime: number, env: Envelope) {
  const g = gain.gain
  g.cancelScheduledValues(0)
  g.setValueAtTime(g.value, releaseTime)
  g.linearRampToValueAtTime(0.0001, releaseTime + env.release)
}

// Preset: sunrise chimes
function sunriseChimes(ctx: AudioContext, destination: AudioNode, t0: number) {
  const master = new GainNode(ctx, { gain: 0.2 })
  master.connect(destination)
  const env: Envelope = { attack: 3.0, decay: 4.0, sustain: 0.6, release: 2.5 }
  applyEnvelope(master, t0, env)

  for (let i = 0; i < 3; i++) {
    const t = t0 + i * 1.5
    const osc = new OscillatorNode(ctx, { type: 'triangle', frequency: 660 / (i + 1) })
    const bell = new BiquadFilterNode(ctx, { type: 'bandpass', Q: 12, frequency: 1200 })
    osc.connect(bell).connect(master)
    osc.start(t)
    osc.stop(t + 6)
  }

  // gentle stop after 12s
  releaseEnvelope(master, t0 + 10, env)
}

// Preset: ocean
function ocean(ctx: AudioContext, destination: AudioNode, t0: number) {
  const master = new GainNode(ctx, { gain: 0.15 })
  master.connect(destination)
  const env: Envelope = { attack: 2, decay: 3, sustain: 0.8, release: 3 }
  applyEnvelope(master, t0, env)

  // Noise generator for waves
  const bufferSize = 2 * ctx.sampleRate
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const noise = new AudioBufferSourceNode(ctx, { buffer: noiseBuffer, loop: true })
  const filter = new BiquadFilterNode(ctx, { type: 'lowpass', frequency: 500 })
  const lfo = new OscillatorNode(ctx, { type: 'sine', frequency: 0.2 })
  const lfoGain = new GainNode(ctx, { gain: 300 })
  lfo.connect(lfoGain).connect(filter.frequency)
  noise.connect(filter).connect(master)
  noise.start(t0)
  lfo.start(t0)
  noise.stop(t0 + 12)
  lfo.stop(t0 + 12)

  releaseEnvelope(master, t0 + 10, env)
}

// Preset: birdsong
function birdsong(ctx: AudioContext, destination: AudioNode, t0: number) {
  const master = new GainNode(ctx, { gain: 0.18 })
  master.connect(destination)
  const env: Envelope = { attack: 1.2, decay: 2.5, sustain: 0.7, release: 2.5 }
  applyEnvelope(master, t0, env)

  // A few chirps
  for (let i = 0; i < 5; i++) {
    const t = t0 + i * 1.8
    const osc = new OscillatorNode(ctx, { type: 'sine', frequency: 900 + i * 60 })
    const gain = new GainNode(ctx, { gain: 0 })
    osc.connect(gain).connect(master)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.4, t + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
    osc.start(t)
    osc.stop(t + 0.5)
  }

  releaseEnvelope(master, t0 + 10, env)
}

// Preset: lo-fi
function lofi(ctx: AudioContext, destination: AudioNode, t0: number) {
  const master = new GainNode(ctx, { gain: 0.2 })
  master.connect(destination)
  const env: Envelope = { attack: 2.0, decay: 3.0, sustain: 0.7, release: 2.0 }
  applyEnvelope(master, t0, env)

  const base = new OscillatorNode(ctx, { type: 'sawtooth', frequency: 220 })
  const lowpass = new BiquadFilterNode(ctx, { type: 'lowpass', frequency: 800 })
  const wow = new OscillatorNode(ctx, { type: 'sine', frequency: 0.3 })
  const wowAmt = new GainNode(ctx, { gain: 4 })
  wow.connect(wowAmt).connect(lowpass.frequency)
  base.connect(lowpass).connect(master)
  base.start(t0)
  wow.start(t0)
  base.stop(t0 + 12)
  wow.stop(t0 + 12)

  releaseEnvelope(master, t0 + 10, env)
}

export const presets: Record<PresetName, SoundPreset> = {
  sunriseChimes: { name: 'sunriseChimes', build: sunriseChimes },
  ocean: { name: 'ocean', build: ocean },
  birdsong: { name: 'birdsong', build: birdsong },
  lofi: { name: 'lofi', build: lofi },
}

export function playPreset(name: PresetName) {
  if (typeof window === 'undefined') return
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const t0 = ctx.currentTime + 0.05
  const destination = ctx.destination
  presets[name].build(ctx, destination, t0)
  // auto close after 15s to free audio context
  setTimeout(() => ctx.close(), 15000)
}
