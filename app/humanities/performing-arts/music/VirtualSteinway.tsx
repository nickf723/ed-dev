"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

// Note Data (Frequencies)
const OCTAVE_4 = [
  { note: "C4", freq: 261.63, key: "a", type: "white" },
  { note: "C#4", freq: 277.18, key: "w", type: "black" },
  { note: "D4", freq: 293.66, key: "s", type: "white" },
  { note: "D#4", freq: 311.13, key: "e", type: "black" },
  { note: "E4", freq: 329.63, key: "d", type: "white" },
  { note: "F4", freq: 349.23, key: "f", type: "white" },
  { note: "F#4", freq: 369.99, key: "t", type: "black" },
  { note: "G4", freq: 392.00, key: "g", type: "white" },
  { note: "G#4", freq: 415.30, key: "y", type: "black" },
  { note: "A4", freq: 440.00, key: "h", type: "white" },
  { note: "A#4", freq: 466.16, key: "u", type: "black" },
  { note: "B4", freq: 493.88, key: "j", type: "white" },
  { note: "C5", freq: 523.25, key: "k", type: "white" }
];

export default function VirtualSteinway() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize Audio Engine
  useEffect(() => {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
      return () => { ctx.close(); }
  }, []);

  const playNote = useCallback((freq: number) => {
      if (!audioContext || isMuted) return;
      
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = 'triangle'; // Softer, more piano-like than 'sine' or 'square'
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      // Envelope (Attack/Decay)
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02); // Attack
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5); // Decay
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.start();
      osc.stop(audioContext.currentTime + 1.5);
  }, [audioContext, isMuted]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = OCTAVE_4.find(n => n.key === e.key.toLowerCase());
      if (target) {
          setActiveKeys(prev => [...prev, target.note]);
          playNote(target.freq);
      }
  }, [playNote]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
      const target = OCTAVE_4.find(n => n.key === e.key.toLowerCase());
      if (target) {
          setActiveKeys(prev => prev.filter(k => k !== target.note));
      }
  }, []);

  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
      };
  }, [handleKeyDown, handleKeyUp]);

  // Click Handler
  const handleNoteClick = (n: typeof OCTAVE_4[0]) => {
      playNote(n.freq);
      setActiveKeys([n.note]);
      setTimeout(() => setActiveKeys([]), 200); // Visual flash
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-2xl flex flex-col items-center">
        
        {/* HEADER */}
        <div className="w-full flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
            <div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Performance Lab</div>
                <h3 className="text-2xl font-black text-white font-serif">Steinway Virtual</h3>
            </div>
            <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>

        {/* PIANO BED */}
        <div className="relative h-64 w-full max-w-3xl flex justify-center select-none bg-black p-4 rounded-lg shadow-inner border-t-8 border-neutral-800">
            {/* The "Felt" Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-red-900 z-0" />

            <div className="relative flex z-10 shadow-2xl">
                {OCTAVE_4.map((n, i) => {
                    const isActive = activeKeys.includes(n.note);
                    
                    if (n.type === 'white') {
                        return (
                            <div 
                                key={n.note}
                                onMouseDown={() => handleNoteClick(n)}
                                className={`w-12 h-48 border border-neutral-300 rounded-b-lg flex flex-col justify-end items-center pb-2 cursor-pointer transition-all active:scale-y-[0.98] active:bg-neutral-200 ${isActive ? 'bg-amber-100 shadow-inner translate-y-1' : 'bg-white'}`}
                            >
                                <span className="text-[10px] font-bold text-neutral-400 uppercase mb-1">{n.key}</span>
                                <span className="text-xs font-bold text-neutral-800">{n.note}</span>
                            </div>
                        );
                    }
                    return null; // Black keys handled below absolutely
                })}

                {/* Black Keys Overlay */}
                <div className="absolute top-0 left-0 flex pointer-events-none w-full h-full">
                     {/* We need to place black keys carefully. 
                        White keys are approx 48px wide. 
                        Black keys sit between them.
                     */}
                     {OCTAVE_4.map((n, i) => {
                         if (n.type === 'black') {
                             // Calculate offset based on previous white keys
                             // C# is between C (idx 0) and D (idx 2)
                             // This is a rough manual offset for visual simplicity in this demo
                             let leftOffset = 0;
                             if(n.note === "C#4") leftOffset = 34;
                             if(n.note === "D#4") leftOffset = 82;
                             if(n.note === "F#4") leftOffset = 178;
                             if(n.note === "G#4") leftOffset = 226;
                             if(n.note === "A#4") leftOffset = 274;

                             const isActive = activeKeys.includes(n.note);

                             return (
                                 <div 
                                    key={n.note}
                                    style={{ left: `${leftOffset}px` }}
                                    className="absolute top-0 pointer-events-auto"
                                 >
                                     <div 
                                        onMouseDown={() => handleNoteClick(n)}
                                        className={`w-8 h-32 rounded-b-lg border-x border-b border-black cursor-pointer transition-all active:scale-y-[0.98] ${isActive ? 'bg-neutral-800 shadow-[0_0_10px_rgba(245,158,11,0.5)] translate-y-1' : 'bg-black shadow-lg'}`}
                                     >
                                         <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-bold text-neutral-600 uppercase pointer-events-none">
                                             {n.key}
                                         </div>
                                     </div>
                                 </div>
                             );
                         }
                         return null;
                     })}
                </div>
            </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mt-8 text-center text-neutral-500 text-sm font-mono flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-full border border-neutral-800">
            <Music size={14} className="text-amber-600" />
            Use your keyboard (A - K) or click the keys to play.
        </div>

    </div>
  );
}