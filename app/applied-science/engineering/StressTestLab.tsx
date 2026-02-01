"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function StressTestLab() {
  const [load, setLoad] = useState(50); // 0-100%
  const [material, setMaterial] = useState(1.0); // Multiplier (Steel vs Wood)

  // Simulation Logic
  const capacity = 80 * material; 
  const stress = (load / capacity) * 100;
  const isFailure = stress > 100;
  const isWarning = stress > 80 && !isFailure;

  return (
    <div className="w-full p-6 bg-slate-900/80 border border-violet-500/20 rounded-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Activity className="text-violet-400" size={18} /> Structural Analysis
        </h3>
        <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${isFailure ? 'bg-red-500/10 border-red-500 text-red-500' : isWarning ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'}`}>
          {isFailure ? <AlertTriangle size={12}/> : <CheckCircle size={12}/>}
          {isFailure ? 'FAILURE' : isWarning ? 'HIGH STRESS' : 'STABLE'}
        </div>
      </div>

      {/* The Beam Visualizer */}
      <div className="relative h-32 mb-8 border-b-4 border-slate-700 flex items-end justify-center">
        {/* The Load Arrow */}
        <motion.div 
          animate={{ y: load * 0.5 }} 
          className="absolute top-0 flex flex-col items-center"
        >
            <div className="w-2 h-8 bg-gradient-to-b from-transparent to-white/50 mb-1" />
            <div className="text-[10px] font-mono text-slate-400">{load}kN</div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-white" />
        </motion.div>

        {/* The Beam itself - Bends based on load */}
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Simple quadratic bezier to simulate bending */}
            <motion.path 
                animate={{ d: `M 0 128 Q 150 ${128 + (stress * 0.8)} 300 128` }}
                stroke={isFailure ? '#ef4444' : isWarning ? '#f59e0b' : '#38bdf8'}
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
            />
        </svg>

        {/* Supports */}
        <div className="absolute bottom-[-4px] left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-slate-600" />
        <div className="absolute bottom-[-4px] right-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-slate-600" />
      </div>

      {/* Controls */}
      <div className="space-y-6 bg-black/20 p-4 rounded-xl">
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                <span>Applied Load</span>
                <span>{load} kN</span>
            </div>
            <input 
                type="range" min="0" max="150" value={load} 
                onChange={(e) => setLoad(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
        </div>

        <div className="flex gap-2">
            <button onClick={() => setMaterial(0.8)} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded border ${material === 0.8 ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-800 border-white/5 text-slate-500'}`}>
                Wood
            </button>
            <button onClick={() => setMaterial(1.0)} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded border ${material === 1.0 ? 'bg-slate-500/20 border-slate-400 text-slate-200' : 'bg-slate-800 border-white/5 text-slate-500'}`}>
                Concrete
            </button>
            <button onClick={() => setMaterial(1.5)} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded border ${material === 1.5 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-800 border-white/5 text-slate-500'}`}>
                Steel
            </button>
        </div>
      </div>
    </div>
  );
}