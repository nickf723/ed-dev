"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Music, ChevronDown } from 'lucide-react';

export default function ChordBuilderLab() {
  const [root, setRoot] = useState(0); // 0 = C
  const [quality, setQuality] = useState('maj');

  // Music Logic
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const qualities: any = {
    maj:  { name: 'Major', intervals: [0, 4, 7], desc: 'Happy, stable, resolved.', formula: '1 - 3 - 5' },
    min:  { name: 'Minor', intervals: [0, 3, 7], desc: 'Sad, serious, emotional.', formula: '1 - b3 - 5' },
    dim:  { name: 'Diminished', intervals: [0, 3, 6], desc: 'Tense, scary, unstable.', formula: '1 - b3 - b5' },
    aug:  { name: 'Augmented', intervals: [0, 4, 8], desc: 'Dreamy, floating, unresolved.', formula: '1 - 3 - #5' },
    maj7: { name: 'Major 7', intervals: [0, 4, 7, 11], desc: 'Jazzy, nostalgic, bright.', formula: '1 - 3 - 5 - 7' },
    dom7: { name: 'Dominant 7', intervals: [0, 4, 7, 10], desc: 'Bluesy, tension-heavy.', formula: '1 - 3 - 5 - b7' },
  };

  const activeQuality = qualities[quality];
  // Calculate active note indices (with wrap around)
  const activeIndices = activeQuality.intervals.map((interval: number) => (root + interval) % 12);

  return (
    <div className="w-full bg-slate-900/90 border border-rose-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Layers className="text-rose-400" size={16} /> Chord Constructor
        </h3>
        <div className="text-[10px] text-slate-500 uppercase font-mono">
            {notes[root]} {activeQuality.name}
        </div>
      </div>

      <div className="p-8">
        
        {/* CONTROLS */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center">
            {/* Root Selector */}
            <div className="flex gap-1 bg-slate-800 p-1 rounded-lg overflow-x-auto">
                {notes.map((n, i) => (
                    <button 
                        key={n}
                        onClick={() => setRoot(i)}
                        className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${root === i ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {n}
                    </button>
                ))}
            </div>

            {/* Quality Selector */}
            <div className="flex gap-1 bg-slate-800 p-1 rounded-lg flex-wrap justify-center">
                {Object.keys(qualities).map((q) => (
                    <button 
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`px-3 py-1.5 rounded flex items-center justify-center text-[10px] uppercase font-bold transition-all ${quality === q ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>

        {/* PIANO VISUALIZER */}
        <div className="relative h-32 w-full max-w-lg mx-auto bg-black/40 rounded-xl border-t-4 border-slate-800 flex justify-center overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => {
                // Simplified piano logic just for visual (C to C)
                // Real piano rendering is complex; this is a stylized "keybed" 
                // We map indices 0-11 repeatedly
                const noteIndex = i % 12;
                const isBlack = [1, 3, 6, 8, 10].includes(noteIndex);
                const isActive = activeIndices.includes(noteIndex);

                if (isBlack) return null; // We'll render blacks absolutely on top
                
                return (
                    <div key={i} className={`relative flex-1 bg-white border-r border-slate-300 rounded-b-md ${isActive ? 'bg-rose-100' : ''}`}>
                        {isActive && (
                            <div className="absolute bottom-2 left-0 right-0 text-center">
                                <div className="w-2 h-2 rounded-full bg-rose-500 mx-auto mb-1" />
                                <span className="text-[10px] font-bold text-rose-600">{notes[noteIndex]}</span>
                            </div>
                        )}
                    </div>
                )
            })}
            
            {/* Render Black Keys Absolute overlay for simplicity in this demo */}
            <BlackKey index={0} active={activeIndices.includes(1)} /> 
            <BlackKey index={1} active={activeIndices.includes(3)} /> 
            <div className="w-[8%]" /> {/* Gap for E-F */}
            <BlackKey index={3} active={activeIndices.includes(6)} /> 
            <BlackKey index={4} active={activeIndices.includes(8)} /> 
            <BlackKey index={5} active={activeIndices.includes(10)} />
        </div>

        {/* INFO CARD */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 border border-white/5 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Formula</div>
                <div className="text-xl font-mono text-white">{activeQuality.formula}</div>
            </div>
            <div className="md:col-span-2 p-4 bg-rose-900/10 border border-rose-500/20 rounded-xl flex items-center gap-3">
                <Music className="text-rose-400 shrink-0" />
                <div>
                    <div className="text-sm font-bold text-white uppercase">{activeQuality.name} Quality</div>
                    <div className="text-xs text-rose-200/70">{activeQuality.desc}</div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function BlackKey({ index, active }: any) {
    // Positioning logic is approximated for visual "Piano" feel
    const positions = ['left-[10%]', 'left-[24%]', '', 'left-[53%]', 'left-[67%]', 'left-[81%]'];
    
    return (
        <div className={`absolute top-0 w-[6%] h-[60%] bg-slate-900 rounded-b-sm z-10 ${positions[index]} ${active ? 'bg-rose-900 border-b-4 border-rose-500' : ''}`}>
             {active && <div className="absolute bottom-2 left-0 right-0 w-1 h-1 rounded-full bg-rose-500 mx-auto" />}
        </div>
    )
}