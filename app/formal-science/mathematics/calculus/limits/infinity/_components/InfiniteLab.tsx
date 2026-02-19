"use client";
import React, { useState } from 'react';
import { ZoomOut, Calculator, Zap } from 'lucide-react';

export default function InfiniteLab() {
  const [xVal, setXVal] = useState(0.5);
  const [power, setPower] = useState(1);
  
  const f = (x: number) => (x === 0 ? Infinity : 1 / Math.pow(x, power));
  const yVal = f(xVal);
  
  // Dynamic Y-Scaling to visualize "The Explosion"
  const scaleY = (y: number) => {
      const height = 300; // Smaller height for embedded view
      const centerY = height / 2;
      const visualY = Math.sign(y) * Math.log10(Math.abs(y) + 1) * 40; 
      return centerY - visualY;
  };

  const generatePath = () => {
    let d = "";
    for (let i = 0.05; i <= 4; i += 0.05) {
      const xPx = 300 + (i * 60); // Tighter X scale
      d += i === 0.05 ? `M ${xPx} ${scaleY(f(i))}` : ` L ${xPx} ${scaleY(f(i))}`;
    }
    for (let i = -4; i <= -0.05; i += 0.05) {
      const xPx = 300 + (i * 60);
      d += i === -4 ? `M ${xPx} ${scaleY(f(i))}` : ` L ${xPx} ${scaleY(f(i))}`;
    }
    return d;
  };

  return (
    <div className="my-8 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        {/* HEADER TOOLBAR */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-purple-400 flex items-center gap-2">
                <Zap size={14} /> Interactive Lab
            </div>
            <div className="flex gap-2">
                 <button onClick={() => setPower(1)} className={`px-3 py-1 rounded text-[10px] font-bold uppercase border transition-all ${power === 1 ? 'bg-purple-600 border-purple-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}>1/x</button>
                 <button onClick={() => setPower(2)} className={`px-3 py-1 rounded text-[10px] font-bold uppercase border transition-all ${power === 2 ? 'bg-purple-600 border-purple-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}>1/x²</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
            {/* GRAPH */}
            <div className="md:col-span-2 relative h-[350px] bg-black/20">
                 <svg viewBox="0 0 600 300" className="w-full h-full cursor-crosshair">
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#333" strokeWidth="1" />
                    <line x1="300" y1="0" x2="300" y2="300" stroke="#333" strokeWidth="1" strokeDasharray="4" />
                    <path d={generatePath()} fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
                    <g transform={`translate(${300 + (xVal * 60)}, ${scaleY(yVal)})`}>
                        <circle r="6" fill="white" className="animate-pulse" />
                        <line x1="0" y1="0" x2="0" y2={150 - scaleY(yVal)} stroke="white" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
                    </g>
                 </svg>
                 
                 {/* SLIDER */}
                 <div className="absolute bottom-4 left-6 right-6">
                    <input 
                        type="range" min="-3" max="3" step="0.001" 
                        value={xVal} 
                        onChange={e => {
                            const v = parseFloat(e.target.value);
                            setXVal(Math.abs(v) < 0.01 ? (v < 0 ? -0.01 : 0.01) : v);
                        }}
                        className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                 </div>
            </div>

            {/* DATA SIDEBAR */}
            <div className="p-6 border-l border-neutral-800 flex flex-col gap-6 bg-neutral-900/30">
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Input (Distance)</div>
                    <div className="font-mono text-xl text-white">x = {xVal.toFixed(4)}</div>
                </div>
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Output (Energy)</div>
                    <div className="font-mono text-3xl text-purple-400 font-bold">
                        {Math.abs(yVal) > 10000 ? "∞" : yVal.toFixed(1)}
                    </div>
                </div>
                <div className="mt-auto text-xs text-neutral-400 leading-relaxed">
                    Notice: As <span className="text-white">x</span> gets smaller (0.1, 0.01, 0.001), the result grows by factors of 10. This is the definition of a vertical asymptote.
                </div>
            </div>
        </div>
    </div>
  );
}