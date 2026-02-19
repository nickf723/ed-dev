"use client";
import React, { useState, useEffect } from 'react';
import { 
  Scan, Target, ZoomIn, Microscope, 
  AlertTriangle, CheckCircle 
} from 'lucide-react';

// --- MATH ENGINE ---
type MathFunc = (x: number) => number | null;

interface LimitScenario {
  id: string;
  name: string;
  description: string;
  fn: MathFunc;
  targetX: number;
  expectedL: number;
  domain: [number, number];
  hasHole?: boolean;
}

const SCENARIOS: LimitScenario[] = [
  {
    id: 'hole',
    name: 'The "Hole" (Rational)',
    description: 'f(x) = (x² - 1) / (x - 1). At x=1, the function breaks. But the limit stands.',
    fn: (x) => {
      if (Math.abs(x - 1) < 0.00001) return null; 
      return (x * x - 1) / (x - 1);
    },
    targetX: 1,
    expectedL: 2,
    domain: [0, 2],
    hasHole: true
  },
  {
    id: 'continuous',
    name: 'The Parabola (Continuous)',
    description: 'f(x) = 0.5x². Smooth, unbroken, predictable.',
    fn: (x) => 0.5 * x * x,
    targetX: 2,
    expectedL: 2,
    domain: [0, 4]
  },
  {
    id: 'oscillation',
    name: 'The Dampened Sine',
    description: 'f(x) = sin(5x)/x + x. Complex behavior near zero, shifting targets.',
    fn: (x) => (x === 0 ? null : Math.sin(x * 5) * 0.5 + x),
    targetX: 1.5,
    expectedL: Math.sin(1.5 * 5) * 0.5 + 1.5,
    domain: [0, 3]
  }
];

export default function LimitsLab() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [userX, setUserX] = useState(0.5); 
  const [epsilon, setEpsilon] = useState(0.5); 
  const [delta, setDelta] = useState(0.5);    
  const [showHitbox, setShowHitbox] = useState(false);
  const [isSafe, setIsSafe] = useState(false);

  const width = 600;
  const height = 400;
  const padding = 40;

  // --- MATH MAPPING ---
  const toSvgX = (x: number) => {
    const range = scenario.domain[1] - scenario.domain[0];
    const percent = (x - scenario.domain[0]) / range;
    return padding + percent * (width - padding * 2);
  };

  const toSvgY = (y: number) => {
    const centerY = scenario.expectedL;
    const rangeY = 4; 
    const minY = centerY - rangeY / 2;
    const percent = (y - minY) / rangeY;
    return height - (padding + percent * (height - padding * 2));
  };

  // --- HITBOX CHECKER ---
  useEffect(() => {
    if (!showHitbox) return;
    let safe = true;
    const step = delta / 50;
    
    for (let x = scenario.targetX - delta; x <= scenario.targetX + delta; x += step) {
      if (Math.abs(x - scenario.targetX) < 0.001) continue; 
      const y = scenario.fn(x);
      if (y !== null) {
         if (Math.abs(y - scenario.expectedL) > epsilon) {
             safe = false;
             break;
         }
      }
    }
    setIsSafe(safe);
  }, [delta, epsilon, scenario, showHitbox]);


  const generatePath = () => {
    let d = "";
    const steps = 300;
    const range = scenario.domain[1] - scenario.domain[0];
    const stepSize = range / steps;

    for (let i = 0; i <= steps; i++) {
      const x = scenario.domain[0] + i * stepSize;
      const y = scenario.fn(x);
      
      if (y === null || isNaN(y) || Math.abs(y) > 20) { 
        // Skip invalid
        const nextX = scenario.domain[0] + (i+1) * stepSize;
        const nextY = scenario.fn(nextX);
        if (nextY !== null) d += `M ${toSvgX(nextX)} ${toSvgY(nextY)} `;
        continue;
      }
      const svgX = toSvgX(x);
      const svgY = toSvgY(y);
      d += i === 0 ? `M ${svgX} ${svgY}` : ` L ${svgX} ${svgY}`;
    }
    return d;
  };

  const userY = scenario.fn(userX);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 text-neutral-200">
        
        {/* CONTROLS HEADER */}
        <div className="flex justify-between items-center bg-neutral-900/80 backdrop-blur p-4 rounded-xl border border-neutral-800">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
                <Microscope className="text-blue-500" />
                LIMIT DEFINITION
            </h2>
            <div className="flex gap-2">
                {SCENARIOS.map(s => (
                    <button
                        key={s.id}
                        onClick={() => { setScenario(s); setUserX(s.domain[0]); setShowHitbox(false); }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${scenario.id === s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-black border border-neutral-700 text-neutral-500 hover:text-white'}`}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* GRAPH */}
            <div className="lg:col-span-2 bg-black/50 backdrop-blur rounded-xl border border-neutral-800 relative overflow-hidden shadow-2xl">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="cursor-crosshair">
                    {/* Grid */}
                    <line x1={0} y1={toSvgY(0)} x2={width} y2={toSvgY(0)} stroke="#333" strokeWidth="1" strokeDasharray="4" />
                    <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={height} stroke="#333" strokeWidth="1" strokeDasharray="4" />

                    {showHitbox && (
                        <>
                            <rect 
                                x={toSvgX(scenario.targetX - delta)} y={0}
                                width={toSvgX(scenario.targetX + delta) - toSvgX(scenario.targetX - delta)} height={height}
                                fill="rgba(59, 130, 246, 0.05)"
                            />
                            <rect 
                                x={0} y={toSvgY(scenario.expectedL + epsilon)}
                                width={width} height={toSvgY(scenario.expectedL - epsilon) - toSvgY(scenario.expectedL + epsilon)}
                                fill="rgba(16, 185, 129, 0.05)"
                            />
                            <rect
                                x={toSvgX(scenario.targetX - delta)} y={toSvgY(scenario.expectedL + epsilon)}
                                width={toSvgX(scenario.targetX + delta) - toSvgX(scenario.targetX - delta)} height={toSvgY(scenario.expectedL - epsilon) - toSvgY(scenario.expectedL + epsilon)}
                                fill="none" stroke={isSafe ? "#10b981" : "#ef4444"} strokeWidth="2" strokeDasharray="4 4"
                            />
                        </>
                    )}

                    <path d={generatePath()} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx={toSvgX(scenario.targetX)} cy={toSvgY(scenario.expectedL)} r={scenario.hasHole ? 6 : 4} fill={scenario.hasHole ? "#000" : "#fff"} stroke="#fff" strokeWidth="2"/>

                    {userY !== null && (
                        <g transform={`translate(${toSvgX(userX)}, ${toSvgY(userY)})`}>
                            <circle r="6" fill="#f59e0b" className="animate-pulse"/>
                            <line x1="0" y1="0" x2="0" y2={height} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" opacity="0.5"/>
                        </g>
                    )}
                </svg>

                <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur p-4 rounded-lg border border-neutral-700 flex items-center gap-4">
                    <div className="text-xs font-bold text-amber-500 uppercase whitespace-nowrap">Input X</div>
                    <input 
                        type="range" min={scenario.domain[0]} max={scenario.domain[1]} step="0.001" 
                        value={userX} onChange={(e) => setUserX(parseFloat(e.target.value))}
                        className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="flex flex-col gap-6">
                
                {/* 1. COORDINATES */}
                <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-6 border border-neutral-800 shadow-lg">
                    <h3 className="text-xs font-bold text-neutral-500 uppercase mb-4 flex items-center gap-2"><Scan size={14}/> Inspector</h3>
                    <div className="space-y-4 font-mono">
                        <div className="flex justify-between items-center p-2 bg-black rounded border border-neutral-800">
                            <span className="text-neutral-400">f({userX.toFixed(3)})</span>
                            <span className={`font-bold ${userY === null ? 'text-red-500' : 'text-blue-400'}`}>
                                {userY === null ? "UNDEFINED" : userY.toFixed(4)}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-neutral-800/50 rounded text-xs text-neutral-400 italic">
                        "{scenario.description}"
                    </div>
                </div>

                {/* 2. GAME */}
                <div className={`rounded-xl p-6 border transition-all ${showHitbox ? 'bg-blue-900/10 border-blue-500/50' : 'bg-neutral-900/80 border-neutral-800'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2"><Target size={14}/> Proof Engine</h3>
                        <label className="flex items-center gap-2 text-[10px] uppercase font-bold text-neutral-400 cursor-pointer hover:text-white">
                            <input type="checkbox" checked={showHitbox} onChange={() => setShowHitbox(!showHitbox)} className="accent-blue-500"/>
                            Enable
                        </label>
                    </div>

                    {showHitbox ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                             <div>
                                 <div className="flex justify-between text-xs mb-1">
                                     <span className="text-green-400 font-bold">Epsilon (Height)</span>
                                     <span>{epsilon.toFixed(3)}</span>
                                 </div>
                                 <input type="range" min="0.05" max="1.0" step="0.05" value={epsilon} onChange={e => setEpsilon(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-700 rounded accent-green-500"/>
                             </div>

                             <div>
                                 <div className="flex justify-between text-xs mb-1">
                                     <span className="text-blue-400 font-bold">Delta (Width)</span>
                                     <span>{delta.toFixed(3)}</span>
                                 </div>
                                 <input type="range" min="0.05" max="1.0" step="0.05" value={delta} onChange={e => setDelta(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-700 rounded accent-blue-500"/>
                             </div>

                             <div className={`p-3 rounded text-center border ${isSafe ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}>
                                 <div className="flex items-center justify-center gap-2 text-sm font-bold">
                                     {isSafe ? <CheckCircle size={16}/> : <AlertTriangle size={16}/>}
                                     {isSafe ? "VALID" : "INVALID"}
                                 </div>
                             </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 opacity-50">
                            <ZoomIn size={32} className="mx-auto mb-2"/>
                            <p className="text-xs">Turn on to prove the limit.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}