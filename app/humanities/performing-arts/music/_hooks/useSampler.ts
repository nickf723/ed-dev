"use client";
import { useRef, useState, useCallback } from 'react';
import { InstrumentPatch } from './useAudioEngine';

// --- GLOBAL STORAGE ---
const AUDIO_CACHE = new Map<string, AudioBuffer>();
const LOADED_PATCHES = new Set<string>();

const getMidi = (note: string) => {
  const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const name = note.slice(0, -1);
  const oct = parseInt(note.slice(-1));
  return (oct + 1) * 12 + notes.indexOf(name);
};

export function useSampler(audioCtx: AudioContext | null, outputNode: AudioNode | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [_, setVersion] = useState(0); // Force re-render on load
  
  const activeSources = useRef<Record<string, { stop: () => void }>>({});

  const isLoaded = (patchId: string) => LOADED_PATCHES.has(patchId);
  const stopAll = useCallback(() => {
    Object.values(activeSources.current).forEach(s => s.stop());
    activeSources.current = {};
  }, []);

  // --- LOAD ---
  const loadPatch = useCallback(async (patch: InstrumentPatch) => {
    if (!audioCtx || !patch.base_url || !patch.sampleMap) return;
    if (LOADED_PATCHES.has(patch.id)) return;

    setIsLoading(true);
    setProgress(0);

    // Map: { "C4": "C4.mp3" }
    const entries = Object.entries(patch.sampleMap);
    let loadedCount = 0;

    await Promise.all(entries.map(async ([note, filename]) => {
        const cacheKey = `${patch.id}:${note}`; // "steinway:C4"
        const url = `${patch.base_url}${filename}`;

        if (!AUDIO_CACHE.has(cacheKey)) {
            try {
                const res = await fetch(url);
                if (res.ok) {
                    const buf = await res.arrayBuffer();
                    const decoded = await audioCtx.decodeAudioData(buf);
                    AUDIO_CACHE.set(cacheKey, decoded);
                }
            } catch (e) {
                console.warn(`Missing sample: ${url}`);
            }
        }
        loadedCount++;
        setProgress(Math.round((loadedCount / entries.length) * 100));
    }));

    LOADED_PATCHES.add(patch.id);
    setIsLoading(false);
    setVersion(v => v + 1);
  }, [audioCtx]);

  // --- TRIGGER ---
  const triggerAttack = useCallback((noteFull: string, patch: InstrumentPatch) => {
    if (!audioCtx || !outputNode) return;
    
    // Stop previous instance of this note
    if (activeSources.current[noteFull]) activeSources.current[noteFull].stop();

    let buffer: AudioBuffer | null = null;
    let playbackRate = 1.0;

    // A. DRUMS (Exact Match)
    if (patch.id === 'drums') {
        buffer = AUDIO_CACHE.get(`${patch.id}:${noteFull}`) || null;
    } 
    // B. INSTRUMENTS (Pitch Stretch)
    else {
        const targetMidi = getMidi(noteFull);
        let bestNote = "";
        let minDiff = Infinity;

        // Iterate ONLY the notes defined in the patch's map
        if (patch.sampleMap) {
            for (const mapNote of Object.keys(patch.sampleMap)) {
                // Check if we actually have this note in RAM
                if (AUDIO_CACHE.has(`${patch.id}:${mapNote}`)) {
                    const mapMidi = getMidi(mapNote);
                    const diff = Math.abs(targetMidi - mapMidi);
                    
                    if (diff < minDiff) {
                        minDiff = diff;
                        bestNote = mapNote;
                    }
                }
            }
        }

        // Found a sample?
        if (bestNote) {
            buffer = AUDIO_CACHE.get(`${patch.id}:${bestNote}`) || null;
            const anchorMidi = getMidi(bestNote);
            playbackRate = Math.pow(2, (targetMidi - anchorMidi) / 12);
        }
    }

    if (!buffer) return;

    // --- PLAYBACK GRAPH ---
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = playbackRate;

    const env = audioCtx.createGain();
    // Start Silent
    env.gain.setValueAtTime(0, audioCtx.currentTime);
    // Fast Attack (prevent popping)
    env.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 0.01);

    src.connect(env);
    env.connect(outputNode);
    src.start();

    // Store release handler
    activeSources.current[noteFull] = {
      stop: () => {
        const now = audioCtx.currentTime;
        const fade = patch.id === 'drums' ? 0.05 : 0.3; // Quick fade for drums
        
        try {
            env.gain.cancelScheduledValues(now);
            env.gain.setValueAtTime(env.gain.value, now); // Lock value
            env.gain.linearRampToValueAtTime(0, now + fade); // Fade out
            src.stop(now + fade + 0.1);
        } catch(e) {}
      }
    };

  }, [audioCtx, outputNode]);

  const triggerRelease = useCallback((noteFull: string) => {
      if (activeSources.current[noteFull]) activeSources.current[noteFull].stop();
  }, []);

  return { 
      isLoading, progress, loadPatch, triggerAttack, triggerRelease, stopAll, 
      isLoaded: (id: string) => LOADED_PATCHES.has(id)
  };
}