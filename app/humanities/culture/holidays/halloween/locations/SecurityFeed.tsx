"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Radio, Signal, Disc } from 'lucide-react';
import { SETTINGS } from '../nightmareData';

export default function SecurityFeed() {
  const [activeCam, setActiveCam] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [time, setTime] = useState("");

  // Clock
  useEffect(() => {
    const t = setInterval(() => {
        const d = new Date();
        setTime(d.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleSwitch = (idx: number) => {
      setGlitch(true);
      setActiveCam(idx);
      setTimeout(() => setGlitch(false), 300);
  };

  const activeSetting = SETTINGS[activeCam];

  return (
    <div className="bg-[#0a0a0a] p-6 rounded-xl border border-stone-800 shadow-2xl relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3 text-stone-500 font-mono text-xs uppercase tracking-widest">
                <Radio size={14} className="text-red-600 animate-pulse" /> 
                <span className="text-red-600">LIVE</span> // Remote Link
            </div>
            <div className="flex gap-4 font-mono text-xs text-stone-600">
                <div className="flex items-center gap-1"><Signal size={10} /> 84%</div>
                <div className="text-red-600 font-bold">{time}</div>
            </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* MAIN MONITOR (The Feed) */}
            <div className="lg:col-span-2 relative aspect-video bg-black rounded border-4 border-stone-900 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden">
                 
                 {/* 1. The Image Layer */}
                 {!glitch && (
                     <div 
                        className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75 scale-105"
                        style={{ backgroundImage: `url(${activeSetting.image})` }}
                     />
                 )}

                 {/* 2. Visual Effects Overlays */}
                 <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay pointer-events-none" /> {/* Night Vision Tint */}
                 <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-30 pointer-events-none z-20" />
                 <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-20" />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10" />
                 
                 {/* 3. Glitch Effect (Static) */}
                 {glitch && (
                     <div className="absolute inset-0 bg-stone-200 z-50 flex items-center justify-center">
                         <div className="w-full h-full bg-[url('/noise.svg')] opacity-50 animate-pulse" />
                     </div>
                 )}

                 {/* 4. HUD Elements */}
                 <div className="absolute top-4 left-4 z-30">
                     <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded animate-pulse">REC</div>
                        <div className="text-white font-mono text-xs drop-shadow-md text-shadow-sm">CAM-{activeCam + 1}: {activeSetting.title.toUpperCase()}</div>
                     </div>
                 </div>

                 {/* 5. Sensory Text */}
                 <div className="absolute bottom-6 left-6 right-6 z-30">
                     <p className="font-mono text-xs text-stone-300 italic bg-black/60 p-2 inline-block rounded">
                         "{activeSetting.sensory}"
                     </p>
                 </div>
            </div>

            {/* SIDEBAR: CHANNEL SELECTOR */}
            <div className="space-y-1 h-full flex flex-col">
                <div className="text-[9px] font-bold text-stone-600 uppercase mb-2 flex justify-between">
                    <span>Select Feed</span>
                    <span>AUTO-CYCLE: OFF</span>
                </div>
                {SETTINGS.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => handleSwitch(i)}
                        className={`w-full p-3 rounded border text-left transition-all flex items-center justify-between group relative overflow-hidden ${activeCam === i ? 'bg-stone-800 border-stone-600' : 'bg-[#0f0f0f] border-stone-900 hover:border-stone-700'}`}
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <Camera size={14} className={activeCam === i ? 'text-white' : 'text-stone-600'} />
                            <div>
                                <div className={`text-xs font-bold font-mono ${activeCam === i ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'}`}>CAM-0{i+1}</div>
                                <div className="text-[10px] text-stone-600 uppercase">{s.title}</div>
                            </div>
                        </div>
                        {activeCam === i && <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse relative z-10" />}
                        
                        {/* Selected Bg Highlight */}
                        {activeCam === i && (
                            <div className="absolute inset-0 bg-white/5" />
                        )}
                    </button>
                ))}
                
                {/* Console Log Area */}
                <div className="mt-auto pt-4 border-t border-stone-800">
                    <div className="h-24 bg-black rounded border border-stone-900 p-2 font-mono text-[9px] text-green-900 overflow-hidden flex flex-col justify-end">
                        <div className="opacity-30">System check complete...</div>
                        <div className="opacity-50">Connecting to node {activeSetting.id}...</div>
                        <div className="opacity-70">Video feed established.</div>
                        <div className="text-green-600">Packet loss detected (34%)...</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}