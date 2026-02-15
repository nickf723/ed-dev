"use client";
import React from 'react';
import { 
  Settings, Zap, Volume2, VolumeX, 
  DownloadCloud, Music, Mic2, Check
} from 'lucide-react';
import { InstrumentPatch, ORCHESTRA } from './_hooks/useAudioEngine';

interface SynthConsoleProps {
  currentPatch: InstrumentPatch;
  setCurrentPatch: (p: InstrumentPatch) => void;
  samplesLoaded: boolean;
  loadSamples: () => void;
  loadingProgress: number;
  volume: number;
  setVolume: (v: number) => void;
  reverb: boolean;
  setReverb: (r: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  toggleLabels: () => void;
  toggleIntervals: () => void;
  toggleFocus: () => void;
  showLabels: boolean;
  showIntervals: boolean;
  focusMode: boolean;
  isLoaded: (id: string) => boolean; // NEW PROP: Checks if a specific instrument is ready
}

export default function SynthConsole({ 
    currentPatch, setCurrentPatch, loadSamples, loadingProgress,
    volume, setVolume, reverb, setReverb, isMuted, toggleMute,
    toggleLabels, toggleIntervals, toggleFocus,
    showLabels, showIntervals, focusMode, isLoaded
}: SynthConsoleProps) {

  return (
    <div className="flex flex-col gap-4">
        
        {/* ROW 1: INSTRUMENT SELECTOR */}
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="text-[9px] font-bold text-neutral-500 uppercase flex items-center gap-2">
                    <Music size={12} /> Instrument Rack
                </div>
                {/* Global Load Button (Only shows if current selection needs loading) */}
                {currentPatch.engine === 'sampler' && !isLoaded(currentPatch.id) && (
                    <button onClick={loadSamples} className="text-[9px] font-bold uppercase text-amber-500 hover:text-white flex items-center gap-1 animate-pulse">
                       <DownloadCloud size={10} /> 
                       {loadingProgress > 0 ? `Downloading ${loadingProgress}%` : `Download ${currentPatch.name}`}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[120px] overflow-y-auto pr-1">
                {Object.values(ORCHESTRA).map(inst => {
                    const ready = inst.engine === 'synth' || isLoaded(inst.id);
                    const isSelected = currentPatch.id === inst.id;
                    
                    return (
                        <button
                            key={inst.id}
                            onClick={() => setCurrentPatch(inst)}
                            // FIXED: Removed 'disabled' prop so you can always select
                            className={`
                                text-left px-3 py-2 rounded text-[10px] font-bold uppercase border transition-all flex items-center justify-between
                                ${isSelected 
                                    ? 'bg-amber-600 border-amber-500 text-white' 
                                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'}
                            `}
                        >
                            <span className="flex items-center gap-2">
                                {inst.engine === 'sampler' ? <Mic2 size={10} /> : <Zap size={10} />}
                                {inst.name}
                            </span>
                            {/* Status Icon */}
                            {inst.engine === 'sampler' && (
                                ready ? <Check size={10} className="text-green-400"/> : <DownloadCloud size={10} className="opacity-50"/>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* ROW 2: FX */}
        <div className="space-y-3 pt-4 border-t border-white/5">
             <div className="flex justify-between items-center">
                 <span className="text-[9px] font-bold text-neutral-500 uppercase flex items-center gap-2">
                    {isMuted ? <VolumeX size={10} className="text-red-500"/> : <Volume2 size={10} />} Output
                 </span>
                 <input 
                    type="range" min="0" max="1" step="0.1" 
                    value={volume} onChange={e => setVolume(parseFloat(e.target.value))}
                    className="w-24 h-1 bg-neutral-700 rounded appearance-none cursor-pointer accent-green-500"
                 />
             </div>
             
             <div className="flex gap-2">
                 <button onClick={() => setReverb(!reverb)} className={`flex-1 py-2 rounded text-[10px] font-bold uppercase border transition-all flex items-center justify-center gap-2 ${reverb ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}>
                     <Zap size={12} /> Reverb
                 </button>
                 <button onClick={toggleMute} className={`flex-1 py-2 rounded text-[10px] font-bold uppercase border transition-all flex items-center justify-center gap-2 ${isMuted ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}>
                     {isMuted ? "Unmute" : "Mute"}
                 </button>
             </div>
        </div>

        {/* ROW 3: VISUALS */}
        <div className="grid grid-cols-3 gap-1 pt-2">
             <button onClick={toggleLabels} className={`py-1.5 rounded text-[9px] font-bold uppercase transition-colors ${showLabels ? 'bg-neutral-700 text-white' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>Labels</button>
             <button onClick={toggleIntervals} className={`py-1.5 rounded text-[9px] font-bold uppercase transition-colors ${showIntervals ? 'bg-blue-900/30 text-blue-400' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>Colors</button>
             <button onClick={toggleFocus} className={`py-1.5 rounded text-[9px] font-bold uppercase transition-colors ${focusMode ? 'bg-amber-900/30 text-amber-500' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>Focus</button>
        </div>
    </div>
  );
}