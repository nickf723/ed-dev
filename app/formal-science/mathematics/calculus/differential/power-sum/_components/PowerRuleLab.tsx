"use client";
import React, { useState } from 'react';
import { Zap, FunctionSquare, ArrowDown } from 'lucide-react';
import { M } from '@/components/Math';

export default function PowerRuleLab() {
  const [power, setPower] = useState(2); // x^2, x^3, x^4
  
  // Math Engine
  const f = (x: number) => Math.pow(x, power);
  const df = (x: number) => power * Math.pow(x, power - 1);

  // SVG Config
  const width = 600;
  const height = 300;
  const scaleX = 40; // 1 unit = 40px
  const scaleY = 10; // 1 unit = 10px (flatter y for high powers)
  const offsetX = width / 2;
  const offsetY = height / 2 + 50;

  const toSvgX = (x: number) => offsetX + x * scaleX;
  const toSvgY = (y: number) => offsetY - y * scaleY;

  const generateF = () => {
    let d = "";
    for(let x = -4; x <= 4; x+=0.1) {
        const y = f(x);
        if (Math.abs(y) > 20) continue; // Clip
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        d += x === -4 ? `M ${sx} ${sy}` : ` L ${sx} ${sy}`;
    }
    return d;
  };

  const generateDF = () => {
    let d = "";
    for(let x = -4; x <= 4; x+=0.1) {
        const y = df(x);
        if (Math.abs(y) > 20) continue;
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        d += x === -4 ? `M ${sx} ${sy}` : ` L ${sx} ${sy}`;
    }
    return d;
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-orange-500 flex items-center gap-2">
                <FunctionSquare size={14} /> Polynomial Analyzer
            </div>
            <div className="flex gap-2">
                 {[1, 2, 3].map(n => (
                     <button 
                        key={n}
                        onClick={() => setPower(n)}
                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase border transition-all ${power === n ? 'bg-orange-600 border-orange-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}
                     >
                        x^{n}
                     </button>
                 ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-black/20 relative h-[300px]">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Grid */}
                    <line x1={0} y1={offsetY} x2={width} y2={offsetY} stroke="#333" strokeWidth="1"/>
                    <line x1={offsetX} y1={0} x2={offsetX} y2={height} stroke="#333" strokeWidth="1"/>

                    {/* F (Blue) */}
                    <path d={generateF()} fill="none" stroke="#3b82f6" strokeWidth="4" className="opacity-80" />
                    
                    {/* DF (Red) */}
                    <path d={generateDF()} fill="none" stroke="#ef4444" strokeWidth="4" className="opacity-80" />

                    {/* Legend */}
                    <g transform="translate(20, 20)">
                        <circle cx="0" cy="0" r="4" fill="#3b82f6"/>
                        <text x="10" y="4" fill="#3b82f6" fontSize="12" fontFamily="monospace">f(x) = x^{power}</text>
                    </g>
                    <g transform="translate(20, 40)">
                        <circle cx="0" cy="0" r="4" fill="#ef4444"/>
                        <text x="10" y="4" fill="#ef4444" fontSize="12" fontFamily="monospace">f'(x) = {power}x^{power-1}</text>
                    </g>
                 </svg>
            </div>

            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                <div>
                    <h3 className="text-white font-bold mb-2">The Pattern</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                        Notice how the derivative is always exactly <strong className="text-orange-400">one degree lower</strong> than the original function.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-black/40 p-4 rounded-xl border border-neutral-800 text-center">
                        <div className="text-[10px] uppercase font-bold text-blue-400 mb-2">Original</div>
                        <div className="text-2xl font-mono text-white">x<sup className="text-orange-500">{power}</sup></div>
                    </div>
                    
                    <div className="flex justify-center text-neutral-600">
                        <ArrowDown size={24} />
                    </div>

                    <div className="bg-black/40 p-4 rounded-xl border border-neutral-800 text-center">
                        <div className="text-[10px] uppercase font-bold text-red-400 mb-2">Derivative</div>
                        <div className="text-2xl font-mono text-white">
                            <span className="text-orange-500">{power}</span>x<sup className="text-orange-500">{power-1}</sup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}