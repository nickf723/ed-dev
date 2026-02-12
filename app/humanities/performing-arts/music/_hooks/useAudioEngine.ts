"use client";
import { useEffect, useRef, useCallback, useState } from 'react';

export type OscillatorShape = 'triangle' | 'sine' | 'square' | 'sawtooth';

export interface SynthParams {
  wave: OscillatorShape;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const PRESETS: Record<string, SynthParams> = {
  'Grand Piano': { wave: 'triangle', attack: 0.02, decay: 0.8, sustain: 0.1, release: 1.5 },
  'Synthwave':   { wave: 'sawtooth', attack: 0.05, decay: 0.1, sustain: 0.4, release: 0.2 },
  'Glass Pad':   { wave: 'sine',     attack: 0.5,  decay: 1.0, sustain: 0.8, release: 2.0 },
};

export function useAudioEngine() {
  const [volume, setVolume] = useState(0.5);
  const [reverb, setReverb] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Custom Sound Design State
  const [params, setParams] = useState<SynthParams>(PRESETS['Grand Piano']);

  const audioCtx = useRef<AudioContext | null>(null);
  const masterGain = useRef<GainNode | null>(null);
  const delayNode = useRef<DelayNode | null>(null);
  const activeOscillators = useRef<Record<string, { stop: () => void }>>({});

  // INIT
  useEffect(() => {
    audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx.current;

    masterGain.current = ctx.createGain();
    masterGain.current.gain.value = volume;
    masterGain.current.connect(ctx.destination);

    // Simple Delay/Reverb Bus
    delayNode.current = ctx.createDelay();
    delayNode.current.delayTime.value = 0.3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.4;

    delayNode.current.connect(feedback);
    feedback.connect(delayNode.current);
    delayNode.current.connect(masterGain.current); // Wet signal

    return () => { ctx.close(); };
  }, []);

  // Update Volume
  useEffect(() => {
    if (masterGain.current) masterGain.current.gain.value = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // TRIGGER NOTE
  const triggerAttack = useCallback((noteId: string, freq: number) => {
    if (!audioCtx.current || !masterGain.current) return;
    const ctx = audioCtx.current;
    const now = ctx.currentTime;

    // Stop previous if active
    if (activeOscillators.current[noteId]) activeOscillators.current[noteId].stop();

    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = params.wave;
    osc.frequency.setValueAtTime(freq, now);

    // ADSR Envelope Logic
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + params.attack);
    env.gain.exponentialRampToValueAtTime(params.sustain * 0.5 + 0.001, now + params.attack + params.decay);

    // Routing
    osc.connect(env);
    env.connect(masterGain.current);
    if (reverb && delayNode.current) env.connect(delayNode.current);

    osc.start();

    // Store release handler
    activeOscillators.current[noteId] = {
      stop: () => {
        const releaseNow = ctx.currentTime;
        env.gain.cancelScheduledValues(releaseNow);
        env.gain.setValueAtTime(env.gain.value, releaseNow);
        env.gain.exponentialRampToValueAtTime(0.001, releaseNow + params.release);
        osc.stop(releaseNow + params.release);
        delete activeOscillators.current[noteId];
      }
    };
  }, [params, reverb]);

  const triggerRelease = useCallback((noteId: string) => {
    if (activeOscillators.current[noteId]) {
      activeOscillators.current[noteId].stop();
    }
  }, []);

  return {
    triggerAttack,
    triggerRelease,
    volume, setVolume,
    reverb, setReverb,
    isMuted, setIsMuted,
    params, setParams,
    PRESETS
  };
}