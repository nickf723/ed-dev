"use client";
import React, { useState } from 'react';
import { Lock, Unlock, Eye } from 'lucide-react';

type Relationship = 'none' | 'vertical' | 'linear' | 'alt-int' | 'corresp';

export default function TransversalLab() {
  const [isParallel, setIsParallel] = useState(false);
  const [transAngle, setTransAngle] = useState(60); // Degrees
  const [highlight, setHighlight] = useState<Relationship>('none');

  // Calculate Angles
  // Line 1 is always 0 deg. Line 2 is 0 deg if parallel, else slight tilt.
  const line2Tilt = isParallel ? 0 : 15;
  
  // Angle Logic for display (simplified for visualizer)
  const acute = transAngle;
  const obtuse = 180 - transAngle;

  const getAngleColor = (idx: number) => {
      if (highlight === 'none') return 'text-slate-500';
      
      const pairs: Record<string, number[]> = {
          'vertical': [1, 4, 2, 3, 5, 8, 6, 7], // All vertical pairs
          'linear': [1, 2, 3, 4], // Just top pairs for demo
          'alt-int': [3, 6, 4, 5],
          'corresp': [1, 5, 2, 6, 3, 7, 4, 8]
      };

      return pairs[highlight]?.includes(idx) ? 'text-pink-400 font-bold scale-110' : 'text-slate-700 opacity-50';
  };

  return (
    <div className="w-full bg-slate-900 border border-pink-500/30 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* CONTROLS */}
        <div className="w-full md:w-80 space-y-8">
            <div className="pb-4 border-b border-slate-700">
                <div className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Relationship Scanner</div>
                <h3 className="text-3xl font-black text-white">Transversals</h3>
            </div>

            {/* Parallel Toggle */}
            <button 
                onClick={() => setIsParallel(!isParallel)}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${isParallel ? 'bg-green-900/20 border-green-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
                <div className="text-left">
                    <div className="font-bold uppercase text-xs">Lines L1 & L2</div>
                    <div className="text-sm font-bold">{isParallel ? "PARALLEL" : "INTERSECTING"}</div>
                </div>
                {isParallel ? <Lock size={20} className="text-green-500" /> : <Unlock size={20} />}
            </button>

            {/* Transversal Angle Slider */}
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-4">
                    Transversal Angle <span className="text-white">{transAngle}°</span>
                </label>
                <input 
                    type="range" min="30" max="150" value={transAngle}
                    onChange={(e) => setTransAngle(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
            </div>

            {/* Highlight Buttons */}
            <div className="grid grid-cols-2 gap-2">
                {[
                    { id: 'vertical', label: 'Vertical' },
                    { id: 'linear', label: 'Linear Pair' },
                    { id: 'alt-int', label: 'Alt. Interior' },
                    { id: 'corresp', label: 'Corresponding' }
                ].map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setHighlight(btn.id as Relationship)}
                        className={`p-2 rounded text-[10px] font-bold uppercase border transition-all ${highlight === btn.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="flex-1 bg-black/40 rounded-xl border border-slate-700 relative flex items-center justify-center overflow-hidden h-[400px]">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />

            {/* SVG Visualizer */}
            <svg className="w-full h-full" viewBox="0 0 400 400">
                {/* Line 1 (Top) */}
                <line x1="50" y1="120" x2="350" y2="120" stroke="white" strokeWidth="3" />
                <text x="360" y="125" fill="gray" fontSize="12" fontWeight="bold">L1</text>

                {/* Line 2 (Bottom - Rotates if not parallel) */}
                <line 
                    x1="50" y1="280" x2="350" y2={isParallel ? "280" : "250"} 
                    stroke="white" strokeWidth="3" 
                />
                <text x="360" y={isParallel ? "285" : "255"} fill="gray" fontSize="12" fontWeight="bold">L2</text>

                {/* Transversal */}
                {/* We calculate geometry based on center (200, 200) and angle */}
                <line 
                    x1={200 + Math.cos((transAngle+90) * Math.PI/180) * 200} 
                    y1={200 - Math.sin((transAngle+90) * Math.PI/180) * 200}
                    x2={200 - Math.cos((transAngle+90) * Math.PI/180) * 200} 
                    y2={200 + Math.sin((transAngle+90) * Math.PI/180) * 200}
                    stroke="#ec4899" strokeWidth="3"
                />

                {/* Angle Labels (Hardcoded positions for demo simplicity) */}
                <g className="font-mono text-xs cursor-default select-none transition-colors">
                    {/* Top Intersection */}
                    <text x="160" y="110" className={getAngleColor(1)}>1</text>
                    <text x="230" y="110" className={getAngleColor(2)}>2</text>
                    <text x="180" y="145" className={getAngleColor(3)}>3</text>
                    <text x="210" y="145" className={getAngleColor(4)}>4</text>

                    {/* Bottom Intersection */}
                    <text x={isParallel ? "130" : "135"} y="270" className={getAngleColor(5)}>5</text>
                    <text x={isParallel ? "200" : "205"} y="270" className={getAngleColor(6)}>6</text>
                    <text x={isParallel ? "150" : "155"} y="305" className={getAngleColor(7)}>7</text>
                    <text x={isParallel ? "180" : "185"} y="305" className={getAngleColor(8)}>8</text>
                </g>
            </svg>
            
            <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-500">
                {isParallel ? "Theorem Active: Angles match" : "Theorem Inactive: Lines not ||"}
            </div>
        </div>
    </div>
  );
}