"use client";
import React, { useState } from 'react';
import { Zap, Search, Activity } from 'lucide-react';

export default function LhopitalLab() {
  const [zoom, setZoom] = useState(0); // 0: Normal, 1: Zoomed (Derivatives)

  // Scenario: sin(x) / x at x=0
  // Top: sin(x) -> slope cos(0) = 1
  // Bottom: x -> slope 1
  
  const width = 600;
  const height = 300;
  const toSvgX = (x: number) => 300 + (x * 100);
  const toSvgY = (y: number) => 150 - (y * 100);

  const generateSin = () => {
    let d = "";
    for(let i = -3; i <= 3; i+=0.1) {
        d += i===-3 ? `M ${toSvgX(i)} ${toSvgY(Math.sin(i))}` : ` L ${toSvgX(i)} ${toSvgY(Math.sin(i))}`;
    }
    return d;
  };
  const generateLine = () => {
    return `M ${toSvgX(-3)} ${toSvgY(-3)} L ${toSvgX(3)} ${toSvgY(3)}`;
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-red-500 flex items-center gap-2">
                <Zap size={14} /> The Derivative Hack
            </div>
            <button 
                onClick={() => setZoom(zoom === 0 ? 1 : 0)}
                className={`flex items-center gap-2 px-3 py-1 rounded text-[10px] font-bold uppercase border transition-all ${zoom === 1 ? 'bg-red-600 border-red-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}
            >
                <Search size={12} /> {zoom === 1 ? "Reset View" : "Zoom to Micro-Scale"}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-black/20 relative h-[300px]">
                 <svg viewBox="0 0 600 300" className={`w-full h-full transition-transform duration-1000 ${zoom ? 'scale-[2.0] origin-center' : ''}`}>
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#333" />
                    <line x1="300" y1="0" x2="300" y2="300" stroke="#333" />

                    {/* Functions */}
                    <path d={generateSin()} fill="none" stroke="#ef4444" strokeWidth="4" className="opacity-80" />
                    <path d={generateLine()} fill="none" stroke="#3b82f6" strokeWidth="4" className="opacity-80" />

                    {/* Tangent Lines (Visible on Zoom) */}
                    <g className={`transition-opacity duration-500 ${zoom ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Red Tangent (cos(0) = 1) */}
                        <line x1="200" y1="250" x2="400" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
                        {/* Blue Tangent (1) */}
                        <line x1="200" y1="250" x2="400" y2="50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" strokeDashoffset="8"/>
                    </g>
                 </svg>
            </div>

            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                <div>
                    <h3 className="text-white font-bold mb-2">The Race to Zero</h3>
                    <div className="flex gap-4 text-sm font-mono mb-4">
                        <span className="text-red-400">f(x) = sin(x)</span>
                        <span className="text-blue-400">g(x) = x</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        At x=0, both are zero. We can't divide them.
                        But if we zoom in infinitely close (using derivatives), they look like straight lines.
                    </p>
                </div>

                <div className={`p-4 rounded-xl border border-neutral-800 transition-all ${zoom ? 'bg-red-900/20 border-red-500/30' : 'bg-black/40'}`}>
                    <div className="text-[10px] uppercase font-bold text-neutral-500 mb-2">Ratio of Slopes</div>
                    <div className="text-xl font-mono text-white">
                        {zoom ? "cos(0) / 1 = 1" : "0 / 0 = ?"}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}