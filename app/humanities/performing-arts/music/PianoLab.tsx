"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Volume2, VolumeX, Music, Settings, 
  Play, Eye, EyeOff, Cable 
} from 'lucide-react';
import { PIANO_CONFIG, SCALES_DB } from './_assets/pianoData';

// Map specific frequencies to our note names
const FREQ_MAP: Record<string, number> = {
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
  "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00,
  "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
  "C5": 523.25
};

export default function PianoLab() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [selectedScale, setSelectedScale] = useState<keyof typeof SCALES_DB>("C Major");
  const [showLabels, setShowLabels] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [midiStatus, setMidiStatus] = useState("Not Connected");
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  // --- AUDIO ENGINE ---
  useEffect(() => {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      return () => { audioCtxRef.current?.close(); }
  }, []);

  const playFreq = useCallback((freq: number) => {
      if (!audioCtxRef.current || isMuted) return;
      const ctx = audioCtxRef.current;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.0);
  }, [isMuted]);

  // --- INTERACTION HANDLERS ---
  const handleNoteStart = (note: string) => {
      if (!activeKeys.includes(note)) {
          setActiveKeys(prev => [...prev, note]);
          playFreq(FREQ_MAP[note]);
      }
  };

  const handleNoteEnd = (note: string) => {
      setActiveKeys(prev => prev.filter(k => k !== note));
  };

  // Keyboard Mapping
  useEffect(() => {
      const down = (e: KeyboardEvent) => {
          if (e.repeat) return;
          const target = PIANO_CONFIG.notes.find(n => n.key === e.key.toLowerCase());
          if (target) handleNoteStart(target.note);
      };
      const up = (e: KeyboardEvent) => {
          const target = PIANO_CONFIG.notes.find(n => n.key === e.key.toLowerCase());
          if (target) handleNoteEnd(target.note);
      };
      window.addEventListener('keydown', down);
      window.addEventListener('keyup', up);
      return () => {
          window.removeEventListener('keydown', down);
          window.removeEventListener('keyup', up);
      };
  }, [activeKeys]); // Dep needed to capture current state in some patterns, though ref logic preferred for complex apps

  // --- AUTO-PLAY DEMO ---
  const playScaleDemo = async () => {
      const scaleNotes = SCALES_DB[selectedScale];
      for (const note of scaleNotes) {
          // Check if note exists in our visible octave range
          if (FREQ_MAP[note]) {
              handleNoteStart(note);
              await new Promise(r => setTimeout(r, 300));
              handleNoteEnd(note);
              await new Promise(r => setTimeout(r, 100));
          }
      }
  };

  // --- MIDI HOOK (Placeholder for Future) ---
  const requestMidi = async () => {
      if (navigator.requestMIDIAccess) {
          try {
              const access = await navigator.requestMIDIAccess();
              setMidiStatus(access.inputs.size > 0 ? "MIDI Device Found" : "No Device Detected");
          } catch (e) {
              setMidiStatus("MIDI Access Denied");
          }
      } else {
          setMidiStatus("WebMIDI Not Supported");
      }
  };

  // --- RENDERERS ---
  const scaleNotes = SCALES_DB[selectedScale];

  return (
    <div className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow-2xl flex flex-col gap-6">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-neutral-800 pb-4 gap-4">
            <div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Training Module</div>
                <h3 className="text-2xl font-black text-white font-serif">Piano Lab</h3>
            </div>
            
            <div className="flex gap-2">
                 {/* Scale Selector */}
                 <div className="flex flex-col gap-1">
                     <label className="text-[10px] uppercase font-bold text-neutral-500">Scale Mode</label>
                     <select 
                        className="bg-neutral-800 text-white text-xs p-2 rounded border border-neutral-700 outline-none focus:border-amber-500"
                        value={selectedScale}
                        onChange={(e) => setSelectedScale(e.target.value as any)}
                     >
                         {Object.keys(SCALES_DB).map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                 </div>

                 {/* Controls */}
                 <div className="flex items-end gap-2">
                     <button onClick={playScaleDemo} className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded" title="Listen to Scale">
                         <Play size={16} fill="currentColor" />
                     </button>
                     <button onClick={() => setShowLabels(!showLabels)} className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded" title="Toggle Labels">
                         {showLabels ? <Eye size={16} /> : <EyeOff size={16} />}
                     </button>
                     <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded" title="Mute">
                         {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                     </button>
                     <button onClick={requestMidi} className={`p-2 rounded transition-colors ${midiStatus.includes("Found") ? 'bg-green-900/50 text-green-400' : 'bg-neutral-800 text-neutral-400'}`} title={`MIDI: ${midiStatus}`}>
                         <Cable size={16} />
                     </button>
                 </div>
            </div>
        </div>

        {/* PIANO BED */}
        <div className="relative h-64 w-full flex justify-center select-none bg-black p-4 rounded-lg shadow-inner border-t-8 border-neutral-800 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-red-900 z-0" />
            
            <div className="relative flex z-10 shadow-2xl">
                {PIANO_CONFIG.notes.map((n) => {
                    const isActive = activeKeys.includes(n.note);
                    const isInScale = scaleNotes.includes(n.note);

                    if (n.type === 'white') {
                        return (
                            <div 
                                key={n.note}
                                onMouseDown={() => handleNoteStart(n.note)}
                                onMouseUp={() => handleNoteEnd(n.note)}
                                onMouseLeave={() => handleNoteEnd(n.note)}
                                className={`
                                    relative w-12 h-48 border border-neutral-300 rounded-b-lg 
                                    flex flex-col justify-end items-center pb-2 cursor-pointer transition-all 
                                    active:scale-y-[0.98] 
                                    ${isActive ? 'bg-amber-100 shadow-inner translate-y-1' : 'bg-white'}
                                `}
                            >
                                {/* Scale Marker */}
                                {isInScale && !isActive && (
                                    <div className="absolute bottom-12 w-2 h-2 rounded-full bg-amber-500/50" />
                                )}
                                
                                <span className="text-[10px] font-bold text-neutral-400 uppercase mb-1">{n.key}</span>
                                {showLabels && <span className="text-xs font-bold text-neutral-800">{n.note}</span>}
                            </div>
                        );
                    }
                    return null;
                })}

                {/* BLACK KEYS LAYER */}
                <div className="absolute top-0 left-0 flex pointer-events-none w-full h-full">
                     {PIANO_CONFIG.notes.map((n) => {
                         if (n.type === 'black') {
                             // Manual positioning logic relative to C4 (index 0 of white keys)
                             // This is simplified. In a prod app, we'd calculate pixels based on index.
                             let leftOffset = 0;
                             if(n.note === "C#4") leftOffset = 34;
                             if(n.note === "D#4") leftOffset = 82;
                             if(n.note === "F#4") leftOffset = 178;
                             if(n.note === "G#4") leftOffset = 226;
                             if(n.note === "A#4") leftOffset = 274;

                             const isActive = activeKeys.includes(n.note);
                             const isInScale = scaleNotes.includes(n.note);

                             return (
                                 <div 
                                    key={n.note}
                                    style={{ left: `${leftOffset}px` }}
                                    className="absolute top-0 pointer-events-auto"
                                 >
                                     <div 
                                        onMouseDown={() => handleNoteStart(n.note)}
                                        onMouseUp={() => handleNoteEnd(n.note)}
                                        onMouseLeave={() => handleNoteEnd(n.note)}
                                        className={`
                                            relative w-8 h-32 rounded-b-lg border-x border-b border-black cursor-pointer transition-all 
                                            active:scale-y-[0.98] 
                                            ${isActive ? 'bg-neutral-800 shadow-[0_0_10px_rgba(245,158,11,0.5)] translate-y-1' : 'bg-black shadow-lg'}
                                        `}
                                     >
                                         {isInScale && !isActive && (
                                             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                                         )}
                                         {showLabels && (
                                             <div className="absolute bottom-8 left-0 right-0 text-center text-[8px] font-bold text-neutral-500 uppercase pointer-events-none">
                                                 {n.key}
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             );
                         }
                         return null;
                     })}
                </div>
            </div>
        </div>
        
        {/* FOOTER STATUS */}
        <div className="flex justify-between items-center text-xs font-mono text-neutral-500 border-t border-neutral-800 pt-4">
             <div>
                 STATUS: <span className={midiStatus.includes('Found') ? "text-green-500" : "text-neutral-500"}>{midiStatus}</span>
             </div>
             <div>
                 ACTIVE_VOICES: {activeKeys.length}
             </div>
        </div>

    </div>
  );
}