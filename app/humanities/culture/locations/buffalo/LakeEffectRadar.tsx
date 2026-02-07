"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CloudSnow, Wind } from 'lucide-react';

export default function LakeEffectRadar() {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col md:flex-row h-[280px]">
      
      {/* LEFT: THE RADAR MAP */}
      <div className="relative flex-1 bg-[#0f172a] overflow-hidden group">
        {/* Map Outline (Abstract Lake Erie) */}
        <svg viewBox="0 0 400 300" className="w-full h-full opacity-50">
            <path d="M 50 200 Q 150 250 300 180 T 450 150" fill="none" stroke="#334155" strokeWidth="4" />
            <text x="100" y="240" fill="#475569" fontSize="10" fontWeight="bold">LAKE ERIE</text>
            <circle cx="320" cy="170" r="4" fill="white" />
            <text x="330" y="170" fill="white" fontSize="12" fontWeight="bold">BUF</text>
        </svg>

        {/* The Storm Band (Blob) */}
        <motion.div 
            className="absolute top-[120px] left-[50px] w-[250px] h-[80px] bg-blue-500/30 blur-xl rounded-full mix-blend-screen"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Radar Sweep Line */}
        <div className="absolute inset-0 origin-bottom-right animate-[spin_4s_linear_infinite]">
            <div className="w-full h-full border-b border-green-500/50 bg-gradient-to-t from-green-500/10 to-transparent transform rotate-45 origin-bottom-right" />
        </div>

        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none" />
        
        <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 bg-black/60 rounded border border-white/10 text-[9px] font-bold text-green-400 uppercase tracking-widest">
            <CloudSnow size={10} /> Doppler 7000
        </div>
      </div>

      {/* RIGHT: METRICS */}
      <div className="w-full md:w-48 bg-slate-950 border-l border-slate-800 p-4 flex flex-col justify-between">
          <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Current Conditions</div>
              <div className="text-3xl font-black text-white mb-1">-4°F</div>
              <div className="text-xs text-blue-400 font-bold flex items-center gap-1">
                  <Wind size={12} /> Wind Chill: -20°
              </div>
          </div>

          <div className="space-y-2">
              <div className="p-2 bg-blue-900/20 border border-blue-800 rounded">
                  <div className="text-[9px] text-blue-300 uppercase font-bold">Snow Rate</div>
                  <div className="text-white font-mono">2.5 in/hr</div>
              </div>
              <div className="p-2 bg-red-900/20 border border-red-800 rounded">
                  <div className="text-[9px] text-red-300 uppercase font-bold">Driving Ban</div>
                  <div className="text-white font-mono animate-pulse">ACTIVE</div>
              </div>
          </div>
      </div>

    </div>
  );
}