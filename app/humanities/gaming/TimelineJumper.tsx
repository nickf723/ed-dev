"use client";
import { useState, useEffect, useRef } from "react";
import { Gamepad2, ChevronRight, ChevronLeft, History } from "lucide-react";

const ERAS = [
    { id: 0, year: "3500 BCE", title: "Ancient Origins", desc: "Senet, Royal Game of Ur. Games as religious connection.", icon: "♟️", color: "text-amber-500" },
    { id: 1, year: "600 CE", title: "Strategy Evolves", desc: "Chaturanga (Chess ancestor), Go. Abstract strategy emerges.", icon: "🏯", color: "text-red-500" },
    { id: 2, year: "1974", title: "The RPG Birth", desc: "Dungeons & Dragons published. Collaborative storytelling begins.", icon: "🐉", color: "text-green-500" },
    { id: 3, year: "1977", title: "The Golden Age", desc: "Atari 2600, Space Invaders. The arcade enters the living room.", icon: "🕹️", color: "text-yellow-500" },
    { id: 4, year: "1993", title: "The 3D Revolution", desc: "Doom, Myst. Immersion through perspective and polygons.", icon: "🧊", color: "text-blue-500" },
    { id: 5, year: "Present", title: "The Metaverse", desc: "Esports, VR, Ubiquitous connectivity. Gaming as lifestyle.", icon: "🥽", color: "text-purple-500" },
];

export default function TimelineJumper() {
  const [position, setPosition] = useState(0); // 0 to 100 range
  const [currentEra, setCurrentEra] = useState(ERAS[0]);
  const trackRef = useRef<HTMLDivElement>(null);

  // Handle Keyboard controls
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "ArrowRight" || e.key === "d") {
              setPosition(p => Math.min(100, p + 5));
          } else if (e.key === "ArrowLeft" || e.key === "a") {
              setPosition(p => Math.max(0, p - 5));
          }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update Era based on position
  useEffect(() => {
      const eraIndex = Math.floor((position / 101) * ERAS.length);
      setCurrentEra(ERAS[eraIndex] || ERAS[ERAS.length-1]);
  }, [position]);


  return (
    <div className="bg-[#0f172a]/80 border-2 border-fuchsia-500/50 rounded-xl p-6 backdrop-blur-md shadow-[0_0_20px_rgba(217,70,239,0.3)] w-full max-w-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-fuchsia-400 flex items-center gap-2 font-mono tracking-wider text-lg">
                <History size={20} className="animate-pulse"/> TIME_WARP.exe
            </h3>
             <div className="px-3 py-1 rounded border border-fuchsia-500/30 bg-black/50 text-[10px] font-mono text-fuchsia-300">
                USE ARROW KEYS TO TRAVEL
            </div>
        </div>

        {/* Era Display Screen (CRT Effect) */}
        <div className="relative min-h-[180px] bg-black border-4 border-slate-700 rounded-lg mb-8 p-6 overflow-hidden relative group">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.2)_0px,rgba(0,0,0,0.2)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10"></div>
            <div className="absolute inset-0 bg-fuchsia-500/5 mix-blend-overlay pointer-events-none z-10 animate-flicker"></div>
            
            <div className="relative z-20 transition-all duration-300 transform group-hover:scale-105">
                <div className={`text-4xl mb-2 ${currentEra.color}`}>{currentEra.icon}</div>
                <div className={`font-mono text-2xl font-bold mb-2 ${currentEra.color} drop-shadow-[0_0_8px_currentColor]`}>
                    {currentEra.year} // {currentEra.title}
                </div>
                <p className="text-slate-300 font-mono text-sm leading-relaxed max-w-md">
                    {currentEra.desc}
                </p>
            </div>
        </div>

        {/* Playable Track */}
        <div className="relative h-12 bg-black/50 border-t-2 border-b-2 border-slate-700 flex items-center" ref={trackRef}>
            
            {/* Checkpoints */}
            {ERAS.map((era, i) => (
                <div 
                    key={i} 
                    className="absolute w-1 h-full bg-slate-700 flex flex-col justify-end pb-1"
                    style={{ left: `${(i / (ERAS.length - 1)) * 96 + 2}%` }} // Distribute checkpoints
                >
                    <div className={`w-2 h-2 rounded-full -ml-0.5 ${i === currentEra.id ? era.color + ' shadow-[0_0_10px_currentColor]' : 'bg-slate-600'}`} />
                </div>
            ))}

            {/* The Player Avatar (Pixel style) */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 transition-all duration-150 ease-out z-30"
                style={{ left: `calc(${position}% - 16px)` }}
            >
                {/* Simple pixel character using CSS box-shadows */}
                <div className="w-2 h-2 bg-cyan-400 shadow-[2px_0_0_#06b6d4,4px_0_0_#06b6d4,0_2px_0_#06b6d4,6px_2px_0_#06b6d4,0_4px_0_#06b6d4,2px_4px_0_#06b6d4,4px_4px_0_#06b6d4,6px_4px_0_#06b6d4,2px_6px_0_#06b6d4,4px_6px_0_#06b6d4] animate-bounce-pixel" />
            </div>

        </div>
        
        <div className="flex justify-between text-xs font-mono text-slate-500 mt-2">
            <span>PAST</span>
            <span>FUTURE</span>
        </div>

    </div>
  );
}