"use client";
import { useEffect, useRef, useCallback, useState } from 'react';
import { useSampler } from './useSampler';
import { useSynth } from './useSynth';

export type EngineType = 'synth' | 'sampler';
export type OscillatorShape = 'triangle' | 'sine' | 'square' | 'sawtooth';

export interface InstrumentPatch {
  id: string;
  name: string;
  engine: EngineType;
  base_url?: string;
  sampleMap?: Record<string, string>;
  wave?: OscillatorShape;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  vibratoSpeed?: number;
  vibratoDepth?: number;
  filterFreq?: number;
}

// --- MAPS ---
const PIANO_MAP = {
  'A0': 'A0.mp3', 'C1': 'C1.mp3', 'D#1': 'Ds1.mp3', 'F#1': 'Fs1.mp3', 'A1': 'A1.mp3',
  'C2': 'C2.mp3', 'D#2': 'Ds2.mp3', 'F#2': 'Fs2.mp3', 'A2': 'A2.mp3',
  'C3': 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3', 'A3': 'A3.mp3',
  'C4': 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', 'A4': 'A4.mp3',
  'C5': 'C5.mp3', 'D#5': 'Ds5.mp3', 'F#5': 'Fs5.mp3', 'A5': 'A5.mp3',
  'C6': 'C6.mp3', 'D#6': 'Ds6.mp3', 'F#6': 'Fs6.mp3', 'A6': 'A6.mp3',
  'C7': 'C7.mp3', 'D#7': 'Ds7.mp3', 'F#7': 'Fs7.mp3', 'A7': 'A7.mp3',
  'C8': 'C8.mp3'
};

const DRUM_MAP = {
  'C3': 'kick.mp3', 'D3': 'snare.mp3', 'E3': 'hihat.mp3',
  'F3': 'tom1.mp3', 'G3': 'tom2.mp3', 'A3': 'tom3.mp3'
};

const STRING_MAP = {
  'A2': 'A2.mp3', 'A3': 'A3.mp3', 'A4': 'A4.mp3', 'A5': 'A5.mp3',
  'C3': 'C3.mp3', 'C4': 'C4.mp3', 'C5': 'C5.mp3', 'C6': 'C6.mp3',
  'E3': 'E3.mp3', 'E4': 'E4.mp3', 'E5': 'E5.mp3'
};

const GUITAR_MAP = {
  'A2': 'A2.mp3', 'A3': 'A3.mp3', 'A4': 'A4.mp3',
  'C3': 'C3.mp3', 'C4': 'C4.mp3', 'C5': 'C5.mp3',
  'E2': 'E2.mp3', 'E3': 'E3.mp3', 'E4': 'E4.mp3'
};

// --- ORCHESTRA ---
export const ORCHESTRA: Record<string, InstrumentPatch> = {
  'steinway': { id: 'steinway', name: 'Steinway Grand', engine: 'sampler', attack: 0.02, decay: 0.1, sustain: 1.0, release: 0.5, base_url: "https://tonejs.github.io/audio/salamander/", sampleMap: PIANO_MAP },
  'drums': { id: 'drums', name: 'Studio Drum Kit', engine: 'sampler', attack: 0.01, decay: 0.1, sustain: 0, release: 0.1, base_url: "https://tonejs.github.io/audio/drum/", sampleMap: DRUM_MAP },
  'cello': { id: 'cello', name: 'Cello', engine: 'sampler', attack: 0.1, decay: 0.3, sustain: 0.8, release: 1.0, base_url: "https://raw.githubusercontent.com/NBRosio/Tone.js-Instruments/master/samples/cello/", sampleMap: STRING_MAP },
  'guitar': { id: 'guitar', name: 'Acoustic Guitar', engine: 'sampler', attack: 0.05, decay: 0.2, sustain: 0.4, release: 0.5, base_url: "https://raw.githubusercontent.com/NBRosio/Tone.js-Instruments/master/samples/guitar-acoustic/", sampleMap: GUITAR_MAP },
  'violin': { id: 'violin', name: 'Violin', engine: 'sampler', attack: 0.4, decay: 0.2, sustain: 0.9, release: 0.8, base_url: "https://raw.githubusercontent.com/NBRosio/Tone.js-Instruments/master/samples/violin/", sampleMap: STRING_MAP },
  'harmonium': { id: 'harmonium', name: 'Harmonium', engine: 'sampler', attack: 0.1, decay: 0.1, sustain: 1.0, release: 0.5, base_url: "https://raw.githubusercontent.com/NBRosio/Tone.js-Instruments/master/samples/harmonium/", sampleMap: STRING_MAP },
  '8bit': { id: '8bit', name: '8-Bit Lead', engine: 'synth', wave: 'square', attack: 0.01, decay: 0.1, sustain: 0.4, release: 0.1 },
  'flute': { id: 'flute', name: 'Synth Flute', engine: 'synth', wave: 'sine', attack: 0.1, decay: 0.1, sustain: 0.9, release: 0.3, vibratoSpeed: 5.0, vibratoDepth: 20 }
};

export function useAudioEngine() {
  const [isReady, setIsReady] = useState(false);
  const [currentPatch, setCurrentPatch] = useState<InstrumentPatch>(ORCHESTRA['8bit']);
  const [volume, setVolume] = useState(0.5);
  const [reverb, setReverb] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtx = useRef<AudioContext | null>(null);
  const masterGain = useRef<GainNode | null>(null);
  const reverbNode = useRef<ConvolverNode | null>(null);

  const sampler = useSampler(audioCtx.current, masterGain.current);
  const synth = useSynth(audioCtx.current, masterGain.current);

  // Init Audio
  useEffect(() => {
    if (audioCtx.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx.current = new AudioContextClass();
    const ctx = audioCtx.current;

    masterGain.current = ctx.createGain();
    masterGain.current.gain.value = volume;
    masterGain.current.connect(ctx.destination);

    // Reverb Impulse
    const length = ctx.sampleRate * 2.5;
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
       const d = impulse.getChannelData(c);
       for (let i = 0; i < length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
    }
    reverbNode.current = ctx.createConvolver();
    reverbNode.current.buffer = impulse;
    const reverbSend = ctx.createGain();
    reverbSend.gain.value = 0.3;
    masterGain.current.connect(reverbSend);
    reverbSend.connect(reverbNode.current);
    reverbNode.current.connect(ctx.destination);

    if (ctx.state === 'running') setIsReady(true);
  }, []);

  const resume = async () => {
    if (audioCtx.current?.state === 'suspended') await audioCtx.current.resume();
    setIsReady(true);
  };

  useEffect(() => {
    if (masterGain.current) masterGain.current.gain.setTargetAtTime(isMuted ? 0 : volume, audioCtx.current?.currentTime || 0, 0.1);
  }, [volume, isMuted]);

  // Trigger Logic
  const triggerAttack = useCallback((noteFull: string) => {
      if (audioCtx.current?.state === 'suspended') audioCtx.current.resume();

      if (currentPatch.engine === 'sampler') {
          if (sampler.isLoaded(currentPatch.id)) {
              sampler.triggerAttack(noteFull, currentPatch);
          }
      } else {
          synth.triggerAttack(noteFull, currentPatch);
      }
  }, [currentPatch, sampler, synth]);

  const triggerRelease = useCallback((noteFull: string) => {
      if (currentPatch.engine === 'sampler') {
          sampler.triggerRelease(noteFull);
      } else {
          synth.triggerRelease(noteFull);
      }
  }, [currentPatch, sampler, synth]);

  const stopAll = useCallback(() => {
      sampler.stopAll();
      synth.stopAll();
  }, [sampler, synth]);

  const loadSamples = () => {
      if (currentPatch.engine === 'sampler') {
          sampler.loadPatch(currentPatch);
      }
  };

  // Helper to check ANY instrument status (for UI list)
  const isLoaded = (id: string) => {
      const patch = ORCHESTRA[id];
      // Synths are always "loaded", Samplers rely on the hook
      return patch?.engine === 'synth' || sampler.isLoaded(id);
  };

  return {
      audioCtx: audioCtx.current,
      masterGain: masterGain.current,
      isReady, resume, stopAll,
      triggerAttack, triggerRelease,
      currentPatch, setCurrentPatch,
      loadSamples, 
      isLoaded, // <--- EXPORTED NOW
      samplesLoaded: isLoaded(currentPatch.id),
      loadingProgress: sampler.progress,
      volume, setVolume, reverb, setReverb, isMuted, setIsMuted,
      ORCHESTRA
  };
}