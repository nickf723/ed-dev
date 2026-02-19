"use client";
import React, { useState, useEffect } from 'react';
import { Target, AlertTriangle, CheckCircle } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'hole',
    name: 'Rational Function',
    fn: (x: number) => (Math.abs(x - 1) < 0.001 ? null : (x * x - 1) / (x - 1)),
    targetX: 1,
    expectedL: 2,
    domain: [0, 2]
  },
  {
    id: 'sine',
    name: 'Dampened Sine',
    fn: (x: number) => Math.sin(x * 5) * 0.3 + x,
    targetX: 1.5,
    expectedL: Math.sin(1.5 * 5) * 0.3 + 1.5,
    domain: [0, 3]
  }
];

export default function EpsilonDeltaLab() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [epsilon, setEpsilon] = useState(0.5); // Hitbox Height
  const [delta, setDelta] = useState(0.5);     // Safe Zone Width
  const [isSafe, setIsSafe] = useState(false);

  // SVG Config
  const width = 600;
  const height = 300;
  const padding = 20;

  // Coordinate Mapping
  const toSvgX = (x: number) => {
    const range = scenario.domain[1] - scenario.domain[0];
    return padding + ((x - scenario.domain[0]) / range) * (width - padding * 2);
  };
  const toSvgY = (y: number) => {
    const rangeY = 4; // Vertical view range
    const minY = scenario.expectedL - rangeY / 2;
    return height - (padding + ((y - minY) / rangeY) * (height - padding * 2));
  };

  // Logic Loop
  useEffect(() => {
    let safe = true;
    const step = delta / 50;
    // Check 100 points inside the delta window
    for (let x = scenario.targetX - delta; x <= scenario.targetX + delta; x += step) {
      if (Math.abs(x - scenario.targetX) < 0.001) continue; 
      const y = scenario.fn(x);
      if (y !== null && Math.abs(y - scenario.expectedL) > epsilon) {
         safe = false; break;
      }
    }
    setIsSafe(safe);
  }, [delta, epsilon, scenario]);

  // Path Gen
  const generatePath = () => {
    let d = "";
    const steps = 200;
    const range = scenario.domain[1] - scenario.domain[0];
    for (let i = 0; i <= steps; i++) {
      const x = scenario.domain[0] + (i * range) / steps;
      const y = scenario.fn(x);
      if (y === null || Math.abs(y) > 10) continue;
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      d += i === 0 ? `M ${sx} ${sy}` : ` L ${sx} ${sy}`;
    }
    return d;
  };

  return (
    <div className="my-8 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-amber-500 flex items-center gap-2">
                <Target size={14} /> The Hitbox Game
            </div>
            <div className="flex gap-2">
                {SCENARIOS.map(s => (
                    <button 
                        key={s.id} 
                        onClick={() => setScenario(s)}
                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase border transition-all ${scenario.id === s.id ? 'bg-amber-600 border-amber-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
            {/* GRAPH */}
            <div className="md:col-span-2 relative h-[300px] bg-black/20">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Zones */}
                    <rect 
                        x={toSvgX(scenario.targetX - delta)} y={0}
                        width={toSvgX(scenario.targetX + delta) - toSvgX(scenario.targetX - delta)} height={height}
                        fill="rgba(59, 130, 246, 0.1)"
                    />
                    <rect 
                        x={0} y={toSvgY(scenario.expectedL + epsilon)}
                        width={width} height={toSvgY(scenario.expectedL - epsilon) - toSvgY(scenario.expectedL + epsilon)}
                        fill="rgba(245, 158, 11, 0.1)"
                    />
                    <rect
                        x={toSvgX(scenario.targetX - delta)} y={toSvgY(scenario.expectedL + epsilon)}
                        width={toSvgX(scenario.targetX + delta) - toSvgX(scenario.targetX - delta)} 
                        height={toSvgY(scenario.expectedL - epsilon) - toSvgY(scenario.expectedL + epsilon)}
                        fill="none" stroke={isSafe ? "#10b981" : "#ef4444"} strokeWidth="2" strokeDasharray="4 4"
                    />
                    {/* Function */}
                    <path d={generatePath()} fill="none" stroke="#fff" strokeWidth="2" />
                    <circle cx={toSvgX(scenario.targetX)} cy={toSvgY(scenario.expectedL)} r="4" fill="#000" stroke="#fff" strokeWidth="2"/>
                 </svg>
            </div>

            {/* CONTROLS */}
            <div className="p-6 border-l border-neutral-800 flex flex-col gap-6 bg-neutral-900/30">
                <div>
                    <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase mb-2">
                        <span className="text-amber-500">Hitbox Height (ε)</span>
                        <span>{epsilon.toFixed(2)}</span>
                    </div>
                    <input 
                        type="range" min="0.1" max="1.0" step="0.05" 
                        value={epsilon} onChange={e => setEpsilon(parseFloat(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg accent-amber-500 appearance-none cursor-pointer"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase mb-2">
                        <span className="text-blue-500">Safe Zone Width (δ)</span>
                        <span>{delta.toFixed(2)}</span>
                    </div>
                    <input 
                        type="range" min="0.1" max="1.0" step="0.05" 
                        value={delta} onChange={e => setDelta(parseFloat(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg accent-blue-500 appearance-none cursor-pointer"
                    />
                </div>

                <div className={`mt-auto p-3 rounded text-center border ${isSafe ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}>
                     <div className="flex items-center justify-center gap-2 text-sm font-bold">
                         {isSafe ? <CheckCircle size={16}/> : <AlertTriangle size={16}/>}
                         {isSafe ? "PROOF VALID" : "FAILED"}
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
}