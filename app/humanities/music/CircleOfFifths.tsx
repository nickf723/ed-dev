"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Disc } from "lucide-react";

const KEYS = [
  { name: "C", relative: "Am", sharps: 0 },
  { name: "G", relative: "Em", sharps: 1 },
  { name: "D", relative: "Bm", sharps: 2 },
  { name: "A", relative: "F#m", sharps: 3 },
  { name: "E", relative: "C#m", sharps: 4 },
  { name: "B", relative: "G#m", sharps: 5 },
  { name: "F#", relative: "D#m", sharps: 6 },
  { name: "Db", relative: "Bbm", sharps: 5 },
  { name: "Ab", relative: "Fm", sharps: 4 },
  { name: "Eb", relative: "Cm", sharps: 3 },
  { name: "Bb", relative: "Gm", sharps: 2 },
  { name: "F", relative: "Dm", sharps: 1 },
];

export default function CircleOfFifths() {
  const [activeKey, setActiveKey] = useState<number | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Disc size={14} className="text-rose-400" /> Harmonic Circle
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* The Wheel */}
        <div className="relative w-48 h-48 mb-6">
            {KEYS.map((k, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const r = 80; // Radius
                const x = Math.cos(angle) * r + 96; // Center 96
                const y = Math.sin(angle) * r + 96;
                
                const isActive = activeKey === i;

                return (
                    <button
                        key={k.name}
                        onMouseEnter={() => setActiveKey(i)}
                        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                            ${isActive 
                                ? "bg-rose-500 text-white scale-125 shadow-[0_0_15px_rgba(244,63,94,0.5)] z-10" 
                                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"}
                        `}
                        style={{ left: x, top: y }}
                    >
                        {k.name}
                    </button>
                );
            })}
            
            {/* Center Info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-white/5 bg-neutral-950/50 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                    {activeKey !== null ? (
                        <>
                            <span className="text-xl font-black text-rose-400">{KEYS[activeKey].name}</span>
                            <span className="text-[10px] text-neutral-500 uppercase">Major</span>
                        </>
                    ) : (
                        <Music size={24} className="text-neutral-700" />
                    )}
                </div>
            </div>
        </div>

        {/* Details Panel */}
        <div className="w-full bg-neutral-950/50 rounded-lg border border-white/5 p-4">
            {activeKey !== null ? (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-[10px] uppercase text-neutral-500 font-bold block mb-1">Relative Minor</span>
                        <span className="text-sm text-white font-mono">{KEYS[activeKey].relative}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-neutral-500 font-bold block mb-1">Key Signature</span>
                        <span className="text-sm text-white font-mono">{KEYS[activeKey].sharps} {activeKey > 5 && activeKey < 11 ? "Flats (b)" : "Sharps (#)"}</span>
                    </div>
                </div>
            ) : (
                <p className="text-center text-[10px] text-neutral-500 italic">
                    Hover over a key to analyze its harmonic properties.
                </p>
            )}
        </div>

      </div>
    </div>
  );
}