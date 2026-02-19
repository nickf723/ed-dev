"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { useSampler, type InstrumentPreset, type SampledInstrumentId } from "./useSampler";

/** Back-compat types expected by SynthConsole */
export type InstrumentEngine = "sampler" | "synth";

export type InstrumentPatch = {
  id: string;
  name: string;
  engine: InstrumentEngine;

  sampler?: { presetId: SampledInstrumentId };
  synth?: { type?: Tone.ToneOscillatorType };
};

/** Sample presets (404-proof: conservative note lists + correct baseUrl/ext) */
export const INSTRUMENT_PRESETS: Record<SampledInstrumentId, InstrumentPreset> = {
  piano: {
    id: "piano",
    label: "Piano",
    baseUrl: "https://cdn.jsdelivr.net/npm/tonejs-instrument-piano-mp3@1.1.2/",
    ext: ".mp3",
    sampleNotes: ["A2", "C3", "Ds3", "Fs3", "A3", "C4", "Ds4", "Fs4", "A4", "C5"],
    release: 1.2,
  },
  harmonium: {
    id: "harmonium",
    label: "Harmonium",
    baseUrl: "https://cdn.jsdelivr.net/npm/tonejs-instrument-harmonium-mp3@1.1.2/",
    ext: ".mp3",
    sampleNotes: ["C2", "A2", "C3", "Ds3", "Fs3", "A3", "C4", "Ds4", "Fs4", "A4", "C5"],
    release: 0.9,
  },
  "guitar-acoustic": {
    id: "guitar-acoustic",
    label: "Guitar (Acoustic)",
    baseUrl: "https://cdn.jsdelivr.net/npm/tonejs-instrument-guitar-acoustic-ogg@1.1.0/",
    ext: ".ogg",
    sampleNotes: [
      "E2",
      "A2",
      "D3",
      "G3",
      "B3",
      "E4",
      "A3",
      "D4",
      "G4",
      "B4",
      "C3",
      "C4",
      "C5",
      "Cs3",
      "Ds3",
      "Fs3",
      "Gs3",
      "As3",
      "Cs4",
      "Ds4",
      "Fs4",
      "Gs4",
      "As4",
    ],
    release: 0.8,
  },
  violin: {
    id: "violin",
    label: "Violin",
    baseUrl: "https://cdn.jsdelivr.net/npm/tonejs-instrument-violin-mp3@1.1.1/",
    ext: ".mp3",
    sampleNotes: ["G3", "A3", "C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6", "E6", "G6", "C7"],
    release: 1.0,
  },
};

/** ✅ Back-compat registry expected by SynthConsole */
export const ORCHESTRA: Record<string, InstrumentPatch> = {
  piano: { id: "piano", name: "Piano", engine: "sampler", sampler: { presetId: "piano" } },
  harmonium: { id: "harmonium", name: "Harmonium", engine: "sampler", sampler: { presetId: "harmonium" } },
  guitar: { id: "guitar", name: "Guitar (Acoustic)", engine: "sampler", sampler: { presetId: "guitar-acoustic" } },
  violin: { id: "violin", name: "Violin", engine: "sampler", sampler: { presetId: "violin" } },

  synth_sine: { id: "synth_sine", name: "Synth (Sine)", engine: "synth", synth: { type: "sine" } },
  synth_triangle: { id: "synth_triangle", name: "Synth (Triangle)", engine: "synth", synth: { type: "triangle" } },
};

async function ensureToneRunning() {
  // Tone.start() must be called from a user gesture (click/tap) at least once
  if (Tone.context.state !== "running") {
    await Tone.start();
  }
}

/**
 * IMPORTANT: Avoid constructing Tone synth nodes before Tone.start()
 * (prevents "param must be an AudioParam" in Next/Turbopack edge cases).
 */
function createPolySynthSafe(): Tone.PolySynth {
  // Use the v15 object-style constructor
  const p = new Tone.PolySynth({
    voice: Tone.Synth,
    options: {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.4, release: 0.8 },
    },
    maxPolyphony: 16,
  });

  p.toDestination();
  return p;
}

export function useAudioEngine() {
  const [currentPatch, setCurrentPatch] = useState<InstrumentPatch>(ORCHESTRA.piano);
  const [volume, setVolumeState] = useState<number>(0.9);

  // Track which sampler patches have successfully loaded at least once
  const [loadedSamplerPatches, setLoadedSamplerPatches] = useState<Record<string, boolean>>({});

  // Lazy-created synth (only after Tone.start succeeds)
  const polyRef = useRef<Tone.PolySynth | null>(null);

  const samplerPreset: InstrumentPreset = useMemo(() => {
    const presetId = currentPatch.sampler?.presetId ?? "piano";
    return INSTRUMENT_PRESETS[presetId];
  }, [currentPatch]);

  const sampler = useSampler(samplerPreset);

  // Apply master volume to destination (in dB)
  useEffect(() => {
    // guard: Tone may not be fully started yet, but Destination exists
    Tone.Destination.volume.value = Tone.gainToDb(Math.max(0.0001, volume));
  }, [volume]);

  // When sampler finishes loading for the current patch, mark it loaded
  useEffect(() => {
    if (currentPatch.engine !== "sampler") return;
    if (!sampler.ready) return;
    setLoadedSamplerPatches((prev) => ({ ...prev, [currentPatch.id]: true }));
  }, [currentPatch.engine, currentPatch.id, sampler.ready]);

  const isLoaded = useCallback(
    (patchId: string) => {
      return !!loadedSamplerPatches[patchId];
    },
    [loadedSamplerPatches]
  );

  const resume = useCallback(async () => {
    await ensureToneRunning();
    // Create synth after audio context is running (prevents AudioParam error)
    if (!polyRef.current) polyRef.current = createPolySynthSafe();
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const loadSamples = useCallback(async () => {
    // keep old call sites happy
    if (currentPatch.engine !== "sampler") return;
    await resume(); // ensure Tone is running first
    await sampler.load();
  }, [currentPatch.engine, resume, sampler]);

  /**
   * triggerAttack/Release are sync in your UI, but we need Tone.start() first.
   * So we "fire and forget" an async chain that becomes audible once allowed.
   */
  const triggerAttack = useCallback(
    (noteName: string, velocity01 = 0.85) => {
      void (async () => {
        await resume();

        const v = Math.max(0, Math.min(1, velocity01));
        const poly = polyRef.current;

        if (currentPatch.engine === "sampler") {
          if (sampler.ready) {
            sampler.triggerAttack(noteName, v);
          } else {
            // fallback while loading
            poly?.triggerAttack(noteName, Tone.now(), v);
          }
          return;
        }

        // synth mode
        const oscType = currentPatch.synth?.type ?? "triangle";
        if (poly) (poly as any).set({ oscillator: { type: oscType } });
        poly?.triggerAttack(noteName, Tone.now(), v);
      })();
    },
    [currentPatch, resume, sampler]
  );

  const triggerRelease = useCallback(
    (noteName: string) => {
      void (async () => {
        await resume();

        const poly = polyRef.current;

        if (currentPatch.engine === "sampler") {
          if (sampler.ready) sampler.triggerRelease(noteName);
          else poly?.triggerRelease(noteName);
          return;
        }

        poly?.triggerRelease(noteName);
      })();
    },
    [currentPatch.engine, resume, sampler]
  );

  const stopAll = useCallback(() => {
    // no need to resume for panic
    sampler.stopAll();
    try {
      polyRef.current?.releaseAll();
    } catch {
      // ignore
    }
  }, [sampler]);

  return {
    // what your UI expects
    ORCHESTRA,
    currentPatch,
    setCurrentPatch,

    // ✅ SynthConsole expects this
    isLoaded,

    // engine controls
    isReady: Tone.context.state === "running",
    resume,

    // sampler status
    samplesLoaded: sampler.ready,
    loadingProgress: sampler.ready ? 100 : 0,
    samplerError: sampler.lastError,

    // audio controls
    volume,
    setVolume,

    // actions
    loadSamples,
    triggerAttack,
    triggerRelease,
    stopAll,
  };
}