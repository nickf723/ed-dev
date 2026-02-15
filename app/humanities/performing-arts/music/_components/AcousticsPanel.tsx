"use client";
import React, { useState } from 'react';
import { Mic2, Settings } from 'lucide-react';
import SynthConsole from '../SynthConsole';

interface AcousticsPanelProps {
  audio: any; // Passing the whole hook object for convenience
  showLabels: boolean; toggleLabels: () => void;
  showIntervals: boolean; toggleIntervals: () => void;
  focusMode: boolean; toggleFocus: () => void;
}

export default function AcousticsPanel({
  audio, showLabels, toggleLabels, showIntervals, toggleIntervals, focusMode, toggleFocus
}: AcousticsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:col-span-4 bg-neutral-900/90 backdrop-blur rounded-xl p-4 border border-white/10 shadow-lg relative">
         <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase">
                <Mic2 size={14} /> Acoustics
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[9px] uppercase font-bold text-neutral-500 hover:text-white">
                {isOpen ? "Close" : "Open"}
            </button>
         </div>
         
         {isOpen ? (
             <div className="absolute top-12 left-0 right-0 z-50 p-4 bg-[#151515] border border-neutral-600 rounded-xl shadow-2xl">
                 <SynthConsole 
                    {...audio} 
                    toggleMute={() => audio.setIsMuted(!audio.isMuted)}
                    showLabels={showLabels} toggleLabels={toggleLabels}
                    focusMode={focusMode} toggleFocus={toggleFocus}
                    showIntervals={showIntervals} toggleIntervals={toggleIntervals}
                    isLoaded={audio.isLoaded}
                 />
             </div>
         ) : (
             <div className="flex justify-between items-center h-full">
                 <div className="text-xs text-neutral-500">Instrument</div>
                 <div className="px-3 py-1 bg-black rounded text-xs font-bold text-amber-500 border border-neutral-800">
                    {audio.currentPatch.name}
                 </div>
             </div>
         )}
    </div>
  );
}