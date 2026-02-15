"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

export function useRhythmEngine(audioCtx: AudioContext | null, masterGain: GainNode | null, playNote: (note: string) => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [arpMode, setArpMode] = useState<'OFF' | 'UP' | 'DOWN' | 'RANDOM'>('OFF');
  const [metronomeOn, setMetronomeOn] = useState(false);

  const nextNoteTime = useRef(0);
  const timerID = useRef<number | null>(null);
  const noteIndex = useRef(0);
  const targetNotes = useRef<string[]>([]);

  const playClick = (time: number, isDownbeat: boolean) => {
    if (!audioCtx || !metronomeOn || !masterGain) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.frequency.value = isDownbeat ? 1200 : 800;
    osc.type = 'square';
    
    // Boost click volume
    gain.gain.value = 0.5; 
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(masterGain); 
    osc.start(time);
    osc.stop(time + 0.1);
  };

  const triggerArpNote = (time: number) => {
    if (targetNotes.current.length === 0) return;

    let idx = 0;
    if (arpMode === 'OFF' || arpMode === 'UP') idx = noteIndex.current % targetNotes.current.length;
    if (arpMode === 'DOWN') idx = (targetNotes.current.length - 1) - (noteIndex.current % targetNotes.current.length);
    if (arpMode === 'RANDOM') idx = Math.floor(Math.random() * targetNotes.current.length);

    // Trigger the note
    playNote(targetNotes.current[idx]);
  };

  const scheduler = useCallback(() => {
    const lookahead = 25.0;
    const scheduleAheadTime = 0.1;

    if (!audioCtx) return;

    while (nextNoteTime.current < audioCtx.currentTime + scheduleAheadTime) {
      // 1. Play Metronome
      playClick(nextNoteTime.current, noteIndex.current % 4 === 0);
      
      // 2. Play Note (Scale or Arp)
      // Even if ArpMode is OFF, if we are playing, we step through the notes (Scale Mode)
      // We sync visual trigger with audio time
      const delay = (nextNoteTime.current - audioCtx.currentTime) * 1000;
      setTimeout(() => triggerArpNote(0), Math.max(0, delay));

      const secondsPerBeat = 60.0 / bpm;
      // If ArpMode is OFF, we play 1 note per beat (Quarter notes). 
      // If ON, we play 8th notes (2 per beat)
      const division = arpMode !== 'OFF' ? 2 : 1; 
      nextNoteTime.current += secondsPerBeat / division;
      
      noteIndex.current++;
    }
    timerID.current = window.setTimeout(scheduler, lookahead);
  }, [bpm, audioCtx, masterGain, metronomeOn, arpMode, playNote]); 

  const togglePlay = (notes: string[]) => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerID.current) clearTimeout(timerID.current);
    } else {
      if (!audioCtx) return;
      setIsPlaying(true);
      noteIndex.current = 0;
      nextNoteTime.current = audioCtx.currentTime + 0.05;
      targetNotes.current = notes;
      scheduler();
    }
  };

  useEffect(() => {
      targetNotes.current = targetNotes.current;
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