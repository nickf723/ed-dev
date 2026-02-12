"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

export function useRhythmEngine(audioCtx: AudioContext | null, playNote: (note: string) => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [arpMode, setArpMode] = useState<'OFF' | 'UP' | 'DOWN' | 'RANDOM'>('OFF');
  const [metronomeOn, setMetronomeOn] = useState(false);

  // Scheduling State
  const nextNoteTime = useRef(0);
  const timerID = useRef<number | null>(null);
  const noteIndex = useRef(0);
  
  // The notes to arpeggiate (fed from the main component)
  const targetNotes = useRef<string[]>([]);

  // 1. THE METRONOME CLICK
  const playClick = (time: number, isDownbeat: boolean) => {
    if (!audioCtx || !metronomeOn) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.frequency.value = isDownbeat ? 1000 : 800;
    osc.type = 'square';
    
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.1);
  };

  // 2. THE ARPEGGIATOR TRIGGER
  const triggerArpNote = (time: number) => {
    if (arpMode === 'OFF' || targetNotes.current.length === 0) return;

    let idx = 0;
    if (arpMode === 'UP') idx = noteIndex.current % targetNotes.current.length;
    if (arpMode === 'DOWN') idx = (targetNotes.current.length - 1) - (noteIndex.current % targetNotes.current.length);
    if (arpMode === 'RANDOM') idx = Math.floor(Math.random() * targetNotes.current.length);

    const note = targetNotes.current[idx];
    
    // We call the parent's playNote, but we need to inject the precise 'time' 
    // Ideally playNote handles scheduling, but for this demo we trigger immediately 
    // or rely on the main engine's lookahead if we refactored playNote to accept 'time'.
    // For now, we just fire it.
    playNote(note);
  };

  // 3. THE SCHEDULER LOOP (Lookahead)
  const scheduler = useCallback(() => {
    // While there are notes that will need to play before the next interval, schedule them
    const lookahead = 25.0; // ms
    const scheduleAheadTime = 0.1; // sec

    while (nextNoteTime.current < (audioCtx?.currentTime || 0) + scheduleAheadTime) {
      // Schedule the event
      playClick(nextNoteTime.current, noteIndex.current % 4 === 0);
      
      // Trigger Arp Visuals/Audio (approximate sync for visual, precise for audio)
      // Note: React state updates (visual keys) might lag slightly behind audio event
      if (arpMode !== 'OFF') {
          setTimeout(() => triggerArpNote(0), (nextNoteTime.current - (audioCtx?.currentTime || 0)) * 1000);
      }

      // Advance Time
      const secondsPerBeat = 60.0 / bpm;
      const division = arpMode === 'OFF' ? 1 : 2; // Arp plays 8th notes, Metronome plays 4th
      nextNoteTime.current += secondsPerBeat / (arpMode !== 'OFF' ? 2 : 1);
      
      noteIndex.current++;
    }
    timerID.current = window.setTimeout(scheduler, lookahead);
  }, [bpm, audioCtx, metronomeOn, arpMode, playNote]);

  // CONTROL
  const togglePlay = (notes: string[]) => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerID.current) clearTimeout(timerID.current);
    } else {
      if (!audioCtx) return;
      setIsPlaying(true);
      noteIndex.current = 0;
      nextNoteTime.current = audioCtx.currentTime + 0.1;
      targetNotes.current = notes;
      scheduler();
    }
  };

  // Update notes live while playing
  useEffect(() => {
      targetNotes.current = targetNotes.current; // sync logic if needed
  }, [targetNotes]);

  return {
    isPlaying,
    togglePlay,
    bpm, setBpm,
    arpMode, setArpMode,
    metronomeOn, setMetronomeOn,
    updateNotes: (n: string[]) => { targetNotes.current = n; }
  };
}