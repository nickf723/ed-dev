"use client";
import React from 'react';
import { Clock, Activity, Award } from 'lucide-react';

interface RhythmPanelProps {
  bpm: number; setBpm: (b: number) => void;
  metronomeOn: boolean; toggleMetronome: () => void;
  trainerMode: boolean; toggleTrainer: () => void;
}

export default function RhythmPanel({
  bpm, setBpm, metronomeOn, toggleMetronome, trainerMode, toggleTrainer
}: RhythmPanelProps) {
  return (
    <div className="lg:col-span-4 bg-neutral-900/90 backdrop-blur rounded-xl p-4 border border-white/10 flex flex-col gap-4 shadow-lg">
         <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase pb-2 border-b border-white/5">
            <Clock size={14} /> Rhythm & Training
        </div>
        
        <div className="flex items-center justify-between bg-black/50 p-2 rounded">
             <div className="flex items-center gap-2">
                 <input 
                    type="number" value={bpm} onChange={e => setBpm(parseInt(e.target.value))} 
                    className="w-12 bg-transparent text-white font-mono font-bold text-center border-b border-neutral-700 focus:border-blue-500 outline-none" 
                 />
                 <span className="text-[10px] text-neutral-500">BPM</span>
             </div>
             <button 
                onClick={toggleMetronome} 
                className={`p-1.5 rounded flex items-center gap-2 text-[9px] font-bold uppercase transition-all ${metronomeOn ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-500'}`}
             >
                 <Activity size={12}/> Metronome
             </button>
        </div>

        <div className="bg-neutral-800/50 p-3 rounded text-[10px] text-neutral-400 leading-relaxed">
            <strong className="text-white block mb-1">How to Practice:</strong>
            Use the metronome to keep time. Switch to "Sight Read" to test your note recognition.
        </div>

        <button 
            onClick={toggleTrainer} 
            className={`w-full py-2 rounded font-bold uppercase text-xs flex items-center justify-center gap-2 transition-all ${trainerMode ? 'bg-amber-100 text-amber-900' : 'bg-neutral-800 text-neutral-400'}`}
        >
            <Award size={16} /> {trainerMode ? "Stop Trainer" : "Sight Read"}
        </button>
    </div>
  );
}