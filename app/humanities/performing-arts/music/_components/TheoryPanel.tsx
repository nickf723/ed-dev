"use client";
import React from 'react';
import { Music, Play, Square, GripHorizontal, MoreHorizontal } from 'lucide-react';
import { NOTES, FORMULAS } from '../_assets/musicTheoryDB';

interface TheoryPanelProps {
  root: string; setRoot: (r: string) => void;
  mode: 'scale' | 'chord'; setMode: (m: 'scale' | 'chord') => void;
  selectedType: string; setSelectedType: (t: string) => void;
  chordStyle: 'block' | 'arp'; setChordStyle: (s: 'block' | 'arp') => void;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function TheoryPanel({
  root, setRoot, mode, setMode, selectedType, setSelectedType,
  chordStyle, setChordStyle, isPlaying, onPlay
}: TheoryPanelProps) {
  
  return (
    <div className="lg:col-span-4 bg-neutral-900/90 backdrop-blur rounded-xl p-4 border border-white/10 flex flex-col gap-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase pb-2 border-b border-white/5">
            <Music size={14} /> Theory Engine
        </div>
        
        {/* Key & Type */}
        <div className="flex gap-2">
             <select value={root} onChange={e => setRoot(e.target.value)} className="flex-1 bg-black border border-neutral-700 text-white text-xs font-bold rounded p-2 outline-none">
                {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
             </select>
             <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="flex-1 bg-black border border-neutral-700 text-white text-xs font-bold rounded p-2 outline-none">
                {Object.keys(mode === 'scale' ? FORMULAS.scales : FORMULAS.chords).map(t => <option key={t} value={t}>{t}</option>)}
             </select>
        </div>

        {/* Mode Toggles */}
        <div className="flex bg-black rounded p-1 border border-neutral-800">
            <button onClick={() => setMode('scale')} className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase ${mode === 'scale' ? 'bg-amber-700 text-white' : 'text-neutral-500'}`}>Scale</button>
            <button onClick={() => setMode('chord')} className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase ${mode === 'chord' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}>Chord</button>
        </div>

        {/* Arp/Block Toggle (Visible only in Chord Mode) */}
        {mode === 'chord' && (
            <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded border border-white/5 animate-in slide-in-from-top-1">
                <span className="text-[9px] font-bold text-neutral-500 uppercase">Playback</span>
                <div className="flex gap-1">
                    <button 
                        onClick={() => setChordStyle('block')}
                        className={`p-1.5 rounded ${chordStyle === 'block' ? 'bg-blue-600 text-white' : 'text-neutral-600 hover:text-white'}`}
                        title="Block (Simultaneous)"
                    >
                        <GripHorizontal size={14} />
                    </button>
                    <button 
                        onClick={() => setChordStyle('arp')}
                        className={`p-1.5 rounded ${chordStyle === 'arp' ? 'bg-blue-600 text-white' : 'text-neutral-600 hover:text-white'}`}
                        title="Arpeggio (Broken)"
                    >
                        <MoreHorizontal size={14} />
                    </button>
                </div>
            </div>
        )}

        {/* Play Button */}
        <button 
            onClick={onPlay}
            disabled={isPlaying}
            className={`w-full py-3 rounded font-black uppercase text-xs flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-neutral-800 text-neutral-500' : 'bg-amber-500 text-black hover:bg-amber-400'}`}
        >
            {isPlaying ? <span className="animate-pulse">Playing...</span> : <><Play size={14} fill="currentColor"/> Play Selection</>}
        </button>
    </div>
  );
}