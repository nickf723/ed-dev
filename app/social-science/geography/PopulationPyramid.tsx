"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PopulationPyramid() {
  const [model, setModel] = useState<'expanding' | 'stable' | 'contracting'>('expanding');

  // Normalized data for visualization
  const data = {
    expanding: [90, 85, 75, 60, 45, 30, 20, 10, 5],
    stable:    [60, 62, 61, 60, 58, 55, 45, 30, 15],
    contracting: [35, 40, 55, 65, 70, 68, 55, 40, 20]
  };

  const ageGroups = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {(['expanding', 'stable', 'contracting'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter transition-all ${
              model === m ? 'bg-sky-500 text-white' : 'bg-white/5 text-slate-500 hover:text-sky-400'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="relative h-64 w-full flex items-end justify-center gap-1 overflow-hidden">
        {/* Left Side (Male) */}
        <div className="flex flex-col-reverse gap-1 items-end w-1/2">
          {data[model].map((val, i) => (
            <motion.div
              key={`m-${i}`}
              initial={false}
              animate={{ width: `${val}%` }}
              className="h-6 bg-sky-500/40 border-r border-sky-400/50 flex items-center justify-end px-2"
            >
              <span className="text-[8px] font-mono text-sky-200 opacity-0 group-hover:opacity-100">{val}%</span>
            </motion.div>
          ))}
        </div>

        {/* Right Side (Female) */}
        <div className="flex flex-col-reverse gap-1 items-start w-1/2">
          {data[model].map((val, i) => (
            <motion.div
              key={`f-${i}`}
              initial={false}
              animate={{ width: `${val}%` }}
              className="h-6 bg-pink-500/40 border-l border-pink-400/50"
            />
          ))}
        </div>

        {/* Center Age Axis */}
        <div className="absolute inset-0 flex flex-col-reverse justify-around pointer-events-none">
          {ageGroups.map(age => (
            <div key={age} className="w-full text-center text-[8px] font-mono text-slate-500 bg-slate-950/50 backdrop-blur-sm">
              {age}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
        <div className="text-sky-400 text-right uppercase tracking-widest">Male</div>
        <div className="text-pink-400 text-left uppercase tracking-widest">Female</div>
      </div>
      
      <p className="text-[10px] text-slate-500 italic leading-tight text-center max-w-xs mx-auto">
        {model === 'expanding' && "Stage 2: High birth rates, rapidly falling death rates."}
        {model === 'stable' && "Stage 4: Low birth and death rates, population plateau."}
        {model === 'contracting' && "Stage 5: Aging population, death rates exceed birth rates."}
      </p>
    </div>
  );
}