"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, X, ArrowRight, Divide, Citrus, Droplets } from 'lucide-react';

export default function ProportionSolverLab() {
  const [scale, setScale] = useState(1);
  const [showMath, setShowMath] = useState(false);

  // Base Ratio: 2 Lemons per 3 Cups
  const baseA = 2;
  const baseB = 3;

  const targetA = baseA * scale;
  const targetB = baseB * scale;

  return (
    <div className="w-full bg-slate-900/90 border border-rose-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col min-h-[500px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Scale className="text-rose-400" size={16} /> The Ratio Machine
        </h3>
        <div className="text-[10px] text-slate-500 uppercase font-bold">
            Recipe Scaler
        </div>
      </div>

      <div className="p-8 flex flex-col items-center flex-1">
        
        {/* VISUAL REPRESENTATION */}
        <div className="flex gap-12 mb-12">
            {/* Lemons */}
            <div className="flex flex-col items-center gap-2 w-24">
                <div className="text-xs font-bold text-yellow-400 uppercase">Lemons</div>
                <div className="text-4xl font-black text-white">{targetA}</div>
                <div className="flex flex-wrap justify-center gap-1 w-24">
                    {Array.from({ length: Math.ceil(targetA) }).map((_, i) => (
                        <motion.div 
                            key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="text-yellow-400"
                        >
                            <Citrus size={16} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="h-32 w-px bg-white/10" />

            {/* Water */}
            <div className="flex flex-col items-center gap-2 w-24">
                <div className="text-xs font-bold text-cyan-400 uppercase">Water (Cups)</div>
                <div className="text-4xl font-black text-white">{targetB}</div>
                <div className="flex flex-wrap justify-center gap-1 w-24">
                    {Array.from({ length: Math.ceil(targetB) }).map((_, i) => (
                        <motion.div 
                            key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="text-cyan-400"
                        >
                            <Droplets size={16} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* MATH BREAKDOWN (THE BUTTERFLY) */}
        <div className="relative p-6 bg-black/40 border border-white/10 rounded-xl mb-8 w-full max-w-md">
            <div className="absolute -top-3 left-4 px-2 bg-slate-900 text-[10px] font-bold text-slate-500 uppercase">Proportion Logic</div>
            
            <div className="flex items-center justify-center gap-8 text-2xl font-mono text-white">
                <div className="flex flex-col items-center">
                    <span className="text-yellow-400">{baseA}</span>
                    <div className="w-8 h-0.5 bg-white/20 my-1" />
                    <span className="text-cyan-400">{baseB}</span>
                </div>
                <div className="text-slate-500">=</div>
                <div className="flex flex-col items-center">
                    <span className="text-yellow-400">{targetA}</span>
                    <div className="w-8 h-0.5 bg-white/20 my-1" />
                    <span className="text-cyan-400">{targetB}</span>
                </div>
            </div>

            {/* Cross Product Visual Lines */}
            {scale > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    {/* Simplified lines for demo visual */}
                    <line x1="40%" y1="35%" x2="60%" y2="65%" stroke="#fb7185" strokeWidth="2" />
                    <line x1="40%" y1="65%" x2="60%" y2="35%" stroke="#fb7185" strokeWidth="2" />
                </svg>
            )}
            
            <div className="mt-4 text-center text-xs text-rose-300">
                {baseA} × {targetB} = {baseA * targetB} <br/>
                {baseB} × {targetA} = {baseB * targetA}
            </div>
        </div>

        {/* SLIDER CONTROL */}
        <div className="w-full max-w-md">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold uppercase">
                <span>Base Recipe (1x)</span>
                <span>Party Size (10x)</span>
            </div>
            <input 
                type="range" min="1" max="10" step="1"
                value={scale} onChange={(e) => setScale(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="text-center mt-4 font-bold text-white">
                Scaling Factor: <span className="text-rose-400">{scale}x</span>
            </div>
        </div>

      </div>
    </div>
  );
}