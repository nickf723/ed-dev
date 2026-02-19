"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { probeUrl } from "../_utils/audioCache";

export type SampledInstrumentId =
  | "piano"
  | "harmonium"
  | "guitar-acoustic"
  | "violin";

export type InstrumentPreset = {
  id: SampledInstrumentId;
  label: string;

  /**
   * baseUrl must end with a trailing slash
   * Example: https://cdn.jsdelivr.net/npm/tonejs-instrument-violin-mp3@1.1.1/
   */
  baseUrl: string;

  /** file extension including dot */
  ext: ".mp3" | ".ogg";

  /**
   * Notes that are *actually present* in that sample pack.
   * (If you include a note that doesn't exist, you'll get 404s.)
   *
   * These are the "sample pack note names" like: A3, Cs4, As2, etc.
   */
  sampleNotes: string[];

  /**
   * Optional: control sampler envelope-ish behavior
   */
  release?: number;
};

function midiStyleToSamplePackNote(noteName: string): string {
  // Input: "C#4" / "A#3" / "F4"
  // Output: "Cs4" / "As3" / "F4"
  return noteName.replace("#", "s");
}

function buildUrls(preset: InstrumentPreset): Record<string, string> {
  // Tone.Sampler urls map is: { "C4": "C4.mp3", "D#4": "Ds4.mp3", ... }
  // We'll supply MIDI-style keys (C#4) but filenames in sample-pack style (Cs4.mp3)
  const urls: Record<string, string> = {};

  for (const packNote of preset.sampleNotes) {
    // Convert pack note "Cs4" back to midi-style key "C#4" for Tone's pitch parser
    const key = packNote.replace("s", "#");
    urls[key] = `${packNote}${preset.ext}`;
  }

  return urls;
}

async function ensureToneStarted() {
  if (Tone.context.state !== "running") {
    await Tone.start();
  }
}

export function useSampler(preset: InstrumentPreset) {
  const [ready, setReady] = useState(false);
  const [lastError, setLastError] = useState<string>("");

  const samplerRef = useRef<Tone.Sampler | null>(null);
  const presetRef = useRef<InstrumentPreset>(preset);
  presetRef.current = preset;

  const urls = useMemo(() => buildUrls(preset), [preset]);

  const disposeSampler = useCallback(() => {
    if (samplerRef.current) {
      try {
        samplerRef.current.disconnect();
        samplerRef.current.dispose();
      } catch {
        // ignore
      }
      samplerRef.current = null;
    }
  }, []);

  const load = useCallback(async () => {
    setReady(false);
    setLastError("");

    await ensureToneStarted();

    // Quickly probe a couple URLs to catch baseUrl mistakes early.
    // We only probe up to 3 files, not all of them.
    const sampleKeys = Object.keys(urls).slice(0, 3);
    for (const k of sampleKeys) {
      const file = urls[k];
      const status = await probeUrl(`${preset.baseUrl}${file}`);
      if (status === "missing") {
        setLastError(
          `Sample URL missing: ${preset.baseUrl}${file} (check baseUrl/ext/notes)`
        );
        return;
      }
    }

    disposeSampler();

    try {
      const s = new Tone.Sampler({
        urls,
        baseUrl: preset.baseUrl,
        release: preset.release ?? 0.8,
        onload: () => setReady(true),
      });

      // Route to destination by default
      s.toDestination();
      samplerRef.current = s;
    } catch (e: any) {
      setLastError(e?.message ?? "Failed to create sampler");
    }
  }, [disposeSampler, preset.baseUrl, preset.ext, preset.release, urls]);

  useEffect(() => {
    load();
    return () => disposeSampler();
  }, [load, disposeSampler]);

  const triggerAttack = useCallback((noteName: string, velocity01 = 0.8) => {
    const s = samplerRef.current;
    if (!s) return;

    // Your MIDI layer likely gives "C#4" style notes already.
    // Tone will accept that. Our sampler urls map uses that style as keys.
    // (The filenames are sample-pack style under the hood.)
    s.triggerAttack(noteName, undefined, Math.max(0, Math.min(1, velocity01)));
  }, []);

  const triggerRelease = useCallback((noteName: string) => {
    const s = samplerRef.current;
    if (!s) return;
    s.triggerRelease(noteName);
  }, []);

  const stopAll = useCallback(() => {
    const s = samplerRef.current;
    if (!s) return;
    try {
      s.releaseAll();
    } catch {
      // ignore
    }
  }, []);

  const debugNoteName = useCallback((noteName: string) => {
    // For debugging: show what file would be used *if that exact pitch is in the map*
    const packNote = midiStyleToSamplePackNote(noteName);
    return `${presetRef.current.baseUrl}${packNote}${presetRef.current.ext}`;
  }, []);

  return {
    ready,
    lastError,
    sampler: samplerRef.current,
    load,
    triggerAttack,
    triggerRelease,
    stopAll,
    debugNoteName,
  };
}