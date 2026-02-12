"use client";
import React from 'react';
import { Settings, Volume2, VolumeX, Sliders, Activity, Zap, Eye, Layers } from 'lucide-react';
import { InstrumentType } from './_hooks/useAudioEngine';

interface SynthConsoleProps {
  // Sound Props
  instrument: InstrumentType;
  setInstrument: (i: InstrumentType) => void;
  volume: number;
  setVolume: (v: number) => void;
  reverb: boolean;
  setReverb: (r: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  
  // UI Props
  showLabels: boolean;
  toggleLabels: () => void;
  focusMode: boolean;
  toggleFocus: () => void;
  showIntervals: boolean;
  toggleIntervals: () => void;
}

export default function SynthConsole({
  instrument, setInstrument, volume, setVolume, reverb, setReverb, isMuted, toggleMute,
  showLabels, toggleLabels, focusMode, toggleFocus, showIntervals, toggleIntervals
}: SynthConsoleProps) {
  
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex gap-2">
       {/* Quick Toggles */}
       <div className="flex bg-neutral-900 rounded border border-neutral-800 p-1 gap-1">
            <button onClick={toggleFocus} className={`p-2 rounded ${focusMode ? 'text-amber-500 bg-neutral-800' : 'text-neutral-500 hover:text-white'}`} title="Focus Mode"><Zap size={16} /></button>
            <button onClick={toggleLabels} className={`p-2 rounded ${showLabels ? 'text-white bg-neutral-800' : 'text-neutral-500 hover:text-white'}`} title="Labels"><Eye size={16} /></button>
            <button onClick={toggleIntervals} className={`p-2 rounded ${showIntervals ? 'text-blue-400 bg-neutral-800' : 'text-neutral-500 hover:text-white'}`} title="Theory Colors"><Layers size={16} /></button>
       </div>

       {/* Sound Menu */}
       <div className="relative">
           <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`h-full px-4 rounded border flex items-center gap-2 text-xs font-bold uppercase ${isOpen ? 'bg-neutral-800 border-amber-500 text-amber-500' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}
           >
               <Sliders size={14} /> Sound
           </button>

           {isOpen && (
               <div className="absolute top-full right-0 mt-2 z-50 bg-[#151515] border border-neutral-700 rounded-xl p-4 shadow-2xl w-64">
                   <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase mb-4 pb-2 border-b border-neutral-800">
                       <Activity size={14} /> Audio Rack
                   </div>
                   
                   {/* Instruments */}
                   <div className="space-y-1 mb-4">
                       <label className="text-[10px] font-bold text-neutral-400">Patch</label>
                       {['Grand Piano', 'Trumpet', '8-Bit Synth'].map((inst) => (
                           <button 
                                key={inst} 
                                onClick={() => setInstrument(inst as any)}
                                className={`w-full text-left px-3 py-2 rounded text-xs font-bold ${instrument === inst ? 'bg-amber-600 text-black' : 'bg-neutral-900 text-neutral-400'}`}
                           >
                               {inst}
                           </button>
                       ))}
                   </div>

                   {/* Volume & FX */}
                   <div className="space-y-4">
                       <div className="flex justify-between items-center">
                           <label className="text-[10px] font-bold text-neutral-400">Reverb</label>
                           <button onClick={() => setReverb(!reverb)} className={`w-8 h-4 rounded-full relative ${reverb ? 'bg-green-500' : 'bg-neutral-700'}`}>
                               <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${reverb ? 'translate-x-4' : 'translate-x-0'}`} />
                           </button>
                       </div>
                       <div className="flex justify-between items-center">
                           <label className="text-[10px] font-bold text-neutral-400">Gain</label>
                           <input 
                                type="range" min="0" max="1" step="0.1" value={volume} 
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-20 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                           />
                       </div>
                   </div>
               </div>
           )}
       </div>
       
       <button onClick={toggleMute} className={`p-2 rounded border ${isMuted ? 'border-red-900 bg-red-900/20 text-red-500' : 'border-neutral-800 bg-neutral-900 text-neutral-400'}`}>
           {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
       </button>
    </div>
  );
}