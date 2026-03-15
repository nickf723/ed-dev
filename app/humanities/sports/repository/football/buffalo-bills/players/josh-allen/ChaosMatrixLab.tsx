"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, TrendingUp } from 'lucide-react';

export default function ChaosMatrixLab() {
  const [hovered, setHovered] = useState<string | null>(null);

  const qbs = [
    { name: 'Brady', x: 95, y: 10, color: 'bg-slate-400', desc: 'The Surgeon. Pure structure.' },
    { name: 'Lamar', x: 40, y: 95, color: 'bg-purple-500', desc: 'The Athlete. Pure elusiveness.' },
    { name: 'Mahomes', x: 85, y: 80, color: 'bg-red-500', desc: 'The Magician. Creative structure.' },
    { name: 'JOSH ALLEN', x: 90, y: 92, color: 'bg-blue-500', desc: 'The Alien. Power + Arm + Chaos.', pulse: true },
    { name: 'Purdy', x: 75, y: 30, color: 'bg-red-700', desc: 'The System. Efficient execution.' },
  ];

  return (
    <div className="w-full bg-slate-900/90 border border-blue-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Zap className="text-blue-400" size={16} /> The Chaos Matrix
        </h3>
        <div className="text-[10px] text-slate-500 uppercase font-bold">
            QB Archetype Analysis
        </div>
      </div>

      <div className="relative flex-1 bg-[url('/grid-pattern.svg')] bg-slate-950 m-4 border border-white/10 rounded-xl overflow-hidden">
        
        {/* Axes Labels */}
        <div className="absolute bottom-2 right-4 text-[10px] font-bold text-slate-500 uppercase">Structure (Pocket) &rarr;</div>
        <div className="absolute top-4 left-2 text-[10px] font-bold text-slate-500 uppercase origin-top-left rotate-90">&larr; Chaos (Creation)</div>

        {/* Quadrants */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-10 pointer-events-none">
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-white"></div>
            <div className=""></div>
        </div>

        {/* The Players */}
        {qbs.map((qb) => (
            <motion.div
                key={qb.name}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className={`absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer ${qb.color} z-10`}
                style={{ left: `${qb.x}%`, bottom: `${qb.y}%` }}
                onMouseEnter={() => setHovered(qb.name)}
                onMouseLeave={() => setHovered(null)}
            >
                {qb.pulse && (
                    <div className="absolute inset-0 -m-2 border-2 border-blue-500 rounded-full animate-ping opacity-50" />
                )}
                
                {/* Tooltip */}
                {(hovered === qb.name || qb.pulse) && (
                    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-slate-900 border border-white/20 p-3 rounded-lg shadow-xl z-20 ${qb.pulse ? 'border-blue-500' : ''}`}>
                        <div className="text-sm font-black text-white uppercase mb-1">{qb.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{qb.desc}</div>
                    </div>
                )}
            </motion.div>
        ))}

        {/* The "Allen Zone" Label */}
        <div className="absolute top-4 right-4 text-right opacity-50 pointer-events-none">
            <div className="text-2xl font-black text-blue-500/20 uppercase leading-none">The<br/>Anomaly</div>
        </div>

      </div>

      <div className="p-4 bg-slate-900 border-t border-white/5 text-center">
        <p className="text-xs text-slate-400">
            Most QBs trade rushing ability for arm talent. Allen is the only player in the "High-Chaos, High-Structure" quadrant.
        </p>
      </div>
    </div>
  );
}