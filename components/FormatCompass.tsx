"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Users, Trophy, History, RotateCw } from "lucide-react";

const FORMATS = [
  { 
    id: "commander", name: "Commander", 
    x: 80, y: 80, // High Pool, High Social
    color: "text-green-400",
    desc: "Multiplayer, 100-card decks. The most popular social format." 
  },
  { 
    id: "standard", name: "Standard", 
    x: 20, y: 20, // Low Pool, High Comp
    color: "text-blue-400",
    desc: "Rotating card pool (last ~2 years). The baseline for competitive play." 
  },
  { 
    id: "modern", name: "Modern", 
    x: 60, y: 30, // Mid Pool, High Comp
    color: "text-red-400",
    desc: "Non-rotating (cards from 2003+). High power, fast gameplay." 
  },
  { 
    id: "vintage", name: "Vintage", 
    x: 95, y: 10, // Max Pool, Max Comp
    color: "text-purple-400",
    desc: "Every card is legal (including the Power 9). The absolute peak of power." 
  },
  { 
    id: "limited", name: "Draft / Sealed", 
    x: 10, y: 50, // Min Pool, Mid Social
    color: "text-yellow-400",
    desc: "Build your deck from packs you open on the spot. Tests improvisation." 
  },
];

export default function FormatCompass() {
  const [activeFormat, setActiveFormat] = useState(FORMATS[0]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Compass size={14} className="text-blue-400" /> Format Matrix
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* The Chart */}
        <div className="relative w-full aspect-square bg-neutral-950 rounded-xl border border-white/10 mb-6">
            {/* Axis Labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] uppercase font-bold text-neutral-600">Competitive</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] uppercase font-bold text-neutral-600">Social / Casual</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] uppercase font-bold text-neutral-600 -rotate-90">Small Pool</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] uppercase font-bold text-neutral-600 rotate-90">Eternal Pool</div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-white/5" />
                <div className="h-full w-[1px] bg-white/5 absolute" />
            </div>

            {/* Points */}
            {FORMATS.map((f) => (
                <button
                    key={f.id}
                    onMouseEnter={() => setActiveFormat(f)}
                    className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-2 transition-all duration-300
                        ${activeFormat.id === f.id 
                            ? `bg-white scale-150 z-10 border-white shadow-[0_0_10px_white]` 
                            : `bg-neutral-800 border-neutral-500 opacity-60`}
                    `}
                    style={{ left: `${f.x}%`, top: `${f.y}%` }}
                />
            ))}
        </div>

        {/* Info */}
        <div className="w-full text-left">
            <h4 className={`text-sm font-bold ${activeFormat.color} mb-1`}>
                {activeFormat.name}
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
                {activeFormat.desc}
            </p>
        </div>

      </div>
    </div>
  );
}