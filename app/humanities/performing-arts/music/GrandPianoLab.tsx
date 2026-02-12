"use client";
import React, { useState, useEffect } from 'react';
import { Play, Square, Music, Volume2, VolumeX, Eye, EyeOff, Layers, Key } from 'lucide-react';
import { useAudioEngine } from './_hooks/useAudioEngine';
import { getFreq, NOTES, FORMULAS } from './_assets/musicTheoryDB';
import PianoKeyboard from './PianoKeyboard';
import SynthDesigner from './SynthDesigner';

// CONFIG: 3 Octaves
const START_OCTAVE = 3;
const OCTAVE_COUNT = 3;

export default function GrandPianoLab() {
  const audio = useAudioEngine();
  
  // STATE
  const [root, setRoot] = useState("C");
  const [mode, setMode] = useState<'scale' | 'chord'>('scale');
  const [selectedType, setSelectedType] = useState("Major");
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // UI OPTIONS
  const [showLabels, setShowLabels] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  // --- LOGIC: Theory to Notes ---
  const getTheoryNotes = () => {
      const rootIndex = NOTES.indexOf(root);
      const formula = mode === 'scale' 
        ? FORMULAS.scales[selectedType as keyof typeof FORMULAS.scales] 
        : FORMULAS.chords[selectedType as keyof typeof FORMULAS.chords];
      
      return (formula || []).map((interval, i) => ({
          note: NOTES[(rootIndex + interval) % 12],
          interval: i
      }));
  };
  const theoryNotes = getTheoryNotes();

  // --- AUDIO HANDLERS ---
  const playNote = (noteFull: string) => {
      if (!activeKeys.includes(noteFull)) {
          setActiveKeys(p => [...p, noteFull]);
          const name = noteFull.slice(0, -1);
          const oct = parseInt(noteFull.slice(-1));
          
          // Calculate Frequency
          // Base C3 = ~130.81Hz
          // Standard Formula: 440 * 2^((n-69)/12) where n is MIDI number
          // For simplicity, we use our getFreq helper which anchors to A4
          audio.triggerAttack(noteFull, getFreq(name, oct));
      }
  };

  const stopNote = (noteFull: string) => {
      setActiveKeys(p => p.filter(k => k !== noteFull));
      audio.triggerRelease(noteFull);
  };

  // --- DEMO SEQUENCE ---
  const playDemo = async () => {
      if (isPlaying) return;
      setIsPlaying(true);

      // Generate a sequence that fits our 3 octaves
      // We start at Root + Start Octave
      const sequence: string[] = [];
      const rootIdx = NOTES.indexOf(root);
      
      theoryNotes.forEach(n => {
          const noteIdx = NOTES.indexOf(n.note);
          // If note is "lower" than root alphabetically (e.g. A < C), bump octave
          const octaveOffset = noteIdx < rootIdx ? 1 : 0;
          sequence.push(`${n.note}${START_OCTAVE + octaveOffset}`);
      });

      if (mode === 'chord') {
          sequence.forEach(n => playNote(n));
          await new Promise(r => setTimeout(r, 1500));
          sequence.forEach(n => stopNote(n));
      } else {
          for (const n of sequence) {
              playNote(n);
              await new Promise(r => setTimeout(r, 300));
              stopNote(n);
          }
      }
      setIsPlaying(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
        
        {/* CONTROL DECK */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* LEFT: Theory Engine */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-700 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <Music size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white font-serif tracking-wide">GRAND <span className="text-amber-500">LAB</span></h2>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest">Interactive Workstation</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {/* Root */}
                        <div className="col-span-1">
                            <label className="text-[9px] font-bold text-neutral-500 uppercase block mb-1">Key</label>
                            <select 
                                value={root} onChange={e => setRoot(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-700 text-white font-bold rounded p-2 outline-none focus:border-amber-500"
                            >
                                {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        {/* Mode */}
                        <div className="col-span-1">
                            <label className="text-[9px] font-bold text-neutral-500 uppercase block mb-1">Mode</label>
                            <div className="flex bg-neutral-900 rounded border border-neutral-700 p-1 h-[38px]">
                                <button onClick={() => setMode('scale')} className={`flex-1 text-[10px] font-bold uppercase rounded ${mode === 'scale' ? 'bg-amber-600 text-white' : 'text-neutral-500'}`}>Scale</button>
                                <button onClick={() => setMode('chord')} className={`flex-1 text-[10px] font-bold uppercase rounded ${mode === 'chord' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}>Chord</button>
                            </div>
                        </div>
                        {/* Type */}
                        <div className="col-span-2">
                            <label className="text-[9px] font-bold text-neutral-500 uppercase block mb-1">Type</label>
                            <select 
                                value={selectedType} onChange={e => setSelectedType(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-700 text-white font-bold rounded p-2 outline-none focus:border-amber-500"
                            >
                                {Object.keys(mode === 'scale' ? FORMULAS.scales : FORMULAS.chords).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* BIG PLAY BUTTON */}
                    <button 
                        onClick={playDemo}
                        disabled={isPlaying}
                        className="w-full h-14 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest shadow-lg transition-transform active:scale-[0.98]"
                    >
                        {isPlaying ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                        {isPlaying ? "Playing..." : "Play Selection"}
                    </button>
                </div>

                {/* MIDDLE: Customization Toggles */}
                <div className="w-full lg:w-48 space-y-4 pt-2">
                    <div className="text-xs font-bold text-neutral-500 uppercase border-b border-neutral-800 pb-2">Display</div>
                    <button onClick={() => setShowLabels(!showLabels)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-400 hover:text-white p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Note Labels</span> {showLabels ? <Eye size={14} className="text-amber-500" /> : <EyeOff size={14} />}
                    </button>
                    <button onClick={() => setShowColor(!showColor)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-400 hover:text-white p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Theory Colors</span> {showColor ? <Layers size={14} className="text-blue-500" /> : <Layers size={14} />}
                    </button>
                    <button onClick={() => setFocusMode(!focusMode)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-400 hover:text-white p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Focus Mode</span> {focusMode ? <Key size={14} className="text-green-500" /> : <Key size={14} />}
                    </button>
                    <button onClick={() => audio.setIsMuted(!audio.isMuted)} className="w-full flex items-center justify-between text-xs font-bold text-neutral-400 hover:text-white p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Master Audio</span> {audio.isMuted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} />}
                    </button>
                </div>

                {/* RIGHT: Synth Console */}
                <div className="w-full lg:w-auto">
                    <SynthDesigner {...audio} />
                </div>
            </div>
        </div>

        {/* THE PIANO BED */}
        <div className="w-full overflow-x-auto rounded-xl shadow-2xl border-t-8 border-amber-900 bg-[#080808] p-4">
             <div className="min-w-[800px] flex justify-center">
                 <PianoKeyboard 
                    range={{ start: START_OCTAVE, count: OCTAVE_COUNT }}
                    activeKeys={activeKeys}
                    highlightedKeys={theoryNotes}
                    onNoteStart={playNote}
                    onNoteEnd={stopNote}
                    showLabels={showLabels}
                    showIntervals={showColor}
                    focusMode={focusMode}
                 />
             </div>
        </div>

    </div>
  );
}