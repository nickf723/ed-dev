"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Triangle, Ruler, MoveDiagonal } from 'lucide-react';

export default function TrigRatioSolver() {
  const [angle, setAngle] = useState(60);
  const [hyp, setHyp] = useState(10); // Meters

  // Calculations
  const rad = (angle * Math.PI) / 180;
  const opp = hyp * Math.sin(rad);
  const adj = hyp * Math.cos(rad);

  return (
    <div className="w-full bg-slate-900/90 border border-purple-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col min-h-[500px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Triangle className="text-purple-400" size={16} /> Triangle Solver
        </h3>
        <div className="text-[10px] text-slate-500 uppercase font-bold">
            SOH CAH TOA
        </div>
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-12 items-center justify-center flex-1">
        
        {/* VISUALIZATION */}
        <div className="relative w-64 h-64 border-b border-l border-white/20 bg-grid-white/[0.05]">
            <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible">
                {/* The Triangle */}
                <path 
                    d={`M 0 256 L ${adj * 20} 256 L ${adj * 20} ${256 - opp * 20} Z`} 
                    fill="rgba(192, 132, 252, 0.2)" 
                    stroke="#c084fc" 
                    strokeWidth="2"
                />
                
                {/* Labels */}
                <text x={adj * 10} y={276} fill="white" fontSize="12" textAnchor="middle">Adj: {adj.toFixed(1)}m</text>
                <text x={adj * 20 + 10} y={256 - opp * 10} fill="white" fontSize="12" writingMode="tb">Opp: {opp.toFixed(1)}m</text>
                <text x={adj * 10} y={256 - opp * 10} fill="yellow" fontSize="12" textAnchor="middle" transform={`rotate(${-angle} ${adj*10} ${256-opp*10})`}>Hyp: {hyp}m</text>
            </svg>
            <div className="absolute bottom-1 left-1 w-8 h-8 border-t border-r border-white/30" /> {/* Right Angle Marker */}
        </div>

        {/* CONTROLS */}
        <div className="w-full max-w-xs space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-white uppercase">
                    <span>Angle (θ)</span>
                    <span className="text-yellow-400">{angle}°</span>
                </div>
                <input 
                    type="range" min="15" max="85" step="1"
                    value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-white uppercase">
                    <span>Hypotenuse (Length)</span>
                    <span className="text-yellow-400">{hyp}m</span>
                </div>
                <input 
                    type="range" min="5" max="20" step="1"
                    value={hyp} onChange={(e) => setHyp(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                    <span>sin({angle}) =</span>
                    <span className="text-white">{Math.sin(rad).toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                    <span>cos({angle}) =</span>
                    <span className="text-white">{Math.cos(rad).toFixed(3)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 text-center text-purple-300">
                    Calculated Height: <span className="font-bold text-white">{opp.toFixed(2)}m</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}