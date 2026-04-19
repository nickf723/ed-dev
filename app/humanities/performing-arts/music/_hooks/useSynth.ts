"use client";
import { useRef, useCallback } from 'react';
import { InstrumentPatch } from './useAudioEngine';

type LegacySynthParams = {
  wave?: OscillatorType;
  filterFreq?: number;
  vibratoDepth?: number;
  vibratoSpeed?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
};

const toNativeWave = (wave?: string): OscillatorType => {
  if (!wave) return 'triangle';
  if (wave.startsWith('sine')) return 'sine';
  if (wave.startsWith('square')) return 'square';
  if (wave.startsWith('triangle')) return 'triangle';
  if (wave.startsWith('sawtooth')) return 'sawtooth';
  return 'triangle';
};

const getMidi = (note: string) => {
  const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const name = note.slice(0, -1);
  const oct = parseInt(note.slice(-1));
  return (oct + 1) * 12 + notes.indexOf(name);
};

export function useSynth(audioCtx: AudioContext | null, outputNode: AudioNode | null) {
  // Store active oscillators so we can stop them later
  const activeVoices = useRef<Record<string, { stop: (now: number) => void }>>({});

  const triggerAttack = useCallback((noteFull: string, patch: InstrumentPatch) => {
    if (!audioCtx || !outputNode) return;

    const legacy = patch as InstrumentPatch & LegacySynthParams;

    // Stop existing voice if re-triggering
    if (activeVoices.current[noteFull]) {
        activeVoices.current[noteFull].stop(audioCtx.currentTime);
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const env = audioCtx.createGain();
    
    // 1. Oscillator Setup
    osc.type = toNativeWave(legacy.wave || patch.synth?.type);
    const freq = 440 * Math.pow(2, (getMidi(noteFull) - 69) / 12);
    osc.frequency.setValueAtTime(freq, now);

    // 2. Filter (Optional)
    let source: AudioNode = osc;
    if (legacy.filterFreq) {
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
      filter.frequency.setValueAtTime(legacy.filterFreq, now);
        // Key Tracking: Brighter on higher notes
      filter.frequency.linearRampToValueAtTime(legacy.filterFreq + (freq * 0.5), now + 0.5);
        osc.connect(filter);
        source = filter;
    }

    // 3. Vibrato (Optional)
    let lfo: OscillatorNode | null = null;
    if (legacy.vibratoDepth) {
        lfo = audioCtx.createOscillator();
      lfo.frequency.value = legacy.vibratoSpeed || 5;
        const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = legacy.vibratoDepth;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);
    }

    // 4. Envelope: ATTACK & DECAY -> SUSTAIN
    // Start at 0
    env.gain.setValueAtTime(0, now);
    // Ramp to Peak (Attack)
    env.gain.linearRampToValueAtTime(0.5, now + (legacy.attack ?? 0.02));
    // Decay to Sustain Level
    const sustainLevel = (legacy.sustain ?? 0.7) * 0.5; // Scale down to avoid clipping
    env.gain.exponentialRampToValueAtTime(
      Math.max(0.001, sustainLevel),
      now + (legacy.attack ?? 0.02) + (legacy.decay ?? 0.15)
    );

    // Routing
    source.connect(env);
    env.connect(outputNode);
    osc.start(now);

    // Store the "Stop" function for this specific note
    activeVoices.current[noteFull] = {
      stop: (releaseTime: number) => {
        // Cancel any future envelope changes (like long decays)
        env.gain.cancelScheduledValues(releaseTime);
        
        // Grab current value to prevent popping
        env.gain.setValueAtTime(env.gain.value, releaseTime);
        
        // Ramp to 0 (Release)
        env.gain.exponentialRampToValueAtTime(0.001, releaseTime + (legacy.release ?? 0.2));
        
        // Stop Oscillators
        osc.stop(releaseTime + (legacy.release ?? 0.2) + 0.1); // Small buffer
        if (lfo) lfo.stop(releaseTime + (legacy.release ?? 0.2) + 0.1);
        
        // Cleanup Ref
        delete activeVoices.current[noteFull];
      }
    };

  }, [audioCtx, outputNode]);

  const triggerRelease = useCallback((noteFull: string) => {
      if (!audioCtx) return;
      const voice = activeVoices.current[noteFull];
      if (voice) {
          voice.stop(audioCtx.currentTime);
      }
  }, [audioCtx]);

  const stopAll = useCallback(() => {
    if (!audioCtx) return;
    Object.values(activeVoices.current).forEach(v => v.stop(audioCtx.currentTime));
    activeVoices.current = {};
  }, [audioCtx]);

  return { triggerAttack, triggerRelease, stopAll };
}