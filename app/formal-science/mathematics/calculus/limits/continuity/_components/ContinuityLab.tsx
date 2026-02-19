"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, PenTool } from 'lucide-react';

export default function ContinuityLab() {
  const [k, setK] = useState(0); 
  const [isSuccess, setIsSuccess] = useState(false);
  const targetK = 3;

  useEffect(() => {
    setIsSuccess(Math.abs(k - targetK) < 0.15);
  }, [k]);

  // SVG Mappers
  const width = 600; 
  const height = 300;
  const toSvgX = (x: number) => (x / 6) * width;
  const toSvgY = (y: number) => height - (y / 8) * height;

  return (
    <div className="my-8 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-green-400 flex items-center gap-2">
                <PenTool size={14} /> Bridge Repair Game
            </div>
            <div className={`px-3 py-1 rounded text-[10px] font-bold uppercase border ${isSuccess ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'}`}>
                {isSuccess ? "CONTINUOUS" : "DISCONTINUOUS"}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
            {/* GAME CANVAS */}
            <div className="md:col-span-2 relative h-[300px] bg-black/20">
                 <svg viewBox="0 0 600 300" className="w-full h-full">
                    {/* Grid */}
                    <line x1={toSvgX(2)} y1="0" x2={toSvgX(2)} y2="300" stroke="#333" strokeWidth="1" strokeDasharray="4" />
                    
                    {/* Function Lines */}
                    <path d={`M ${toSvgX(0)} ${toSvgY(1)} L ${toSvgX(2)} ${toSvgY(3)}`} stroke={isSuccess ? "#22c55e" : "#3b82f6"} strokeWidth="4" strokeLinecap="round" />
                    <path d={`M ${toSvgX(2)} ${toSvgY(3)} Q ${toSvgX(3)} ${toSvgY(8)} ${toSvgX(4)} ${toSvgY(15)}`} stroke={isSuccess ? "#22c55e" : "#3b82f6"} strokeWidth="4" strokeLinecap="round" fill="none" />
                    
                    {/* Holes */}
                    <circle cx={toSvgX(2)} cy={toSvgY(3)} r="6" fill="#000" stroke="#333" strokeWidth="2" />

                    {/* The Plug */}
                    <g transform={`translate(${toSvgX(2)}, ${toSvgY(k)})`}>
                         <circle r="8" fill={isSuccess ? "#22c55e" : "#ef4444"} />
                         <text x="15" y="5" fill="white" fontSize="12" fontFamily="monospace">f(2) = {k.toFixed(1)}</text>
                    </g>
                 </svg>
            </div>

            {/* CHECKLIST SIDEBAR */}
            <div className="p-6 border-l border-neutral-800 flex flex-col gap-4 bg-neutral-900/30">
                <div className="text-[10px] font-bold text-neutral-500 uppercase mb-2">Continuity Checklist</div>
                
                {/* Check 1 */}
                <div className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                    <div className="text-xs text-neutral-300">
                        <strong>1. Defined</strong><br/>
                        <span className="opacity-50">f(2) exists.</span>
                    </div>
                </div>

                {/* Check 2 */}
                <div className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                    <div className="text-xs text-neutral-300">
                        <strong>2. Limit Exists</strong><br/>
                        <span className="opacity-50">Left/Right meet at y=3.</span>
                    </div>
                </div>

                {/* Check 3 */}
                <div className="flex gap-2 items-start">
                    {isSuccess ? <CheckCircle2 size={14} className="text-green-500 mt-0.5"/> : <XCircle size={14} className="text-red-500 mt-0.5"/>}
                    <div className="text-xs text-neutral-300">
                        <strong>3. They Match</strong><br/>
                        <span className={isSuccess ? "text-green-400" : "text-red-400"}>
                            {k.toFixed(1)} {isSuccess ? "==" : "!="} 3.0
                        </span>
                    </div>
                </div>

                {/* SLIDER */}
                <div className="mt-auto">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase mb-2 block">Set f(2)</label>
                    <input 
                        type="range" min="0" max="6" step="0.1" 
                        value={k} onChange={e => setK(parseFloat(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isSuccess ? 'bg-green-900 accent-green-500' : 'bg-red-900 accent-red-500'}`}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}