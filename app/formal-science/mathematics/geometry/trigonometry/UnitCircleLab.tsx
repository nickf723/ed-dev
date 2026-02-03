"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Circle, Triangle, Divide } from 'lucide-react';

export default function UnitCircleLab() {
  const [angle, setAngle] = useState(45); // Degrees
  
  // Math conversions
  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.tan(rad);

  // SVG Config
  const size = 260;
  const center = size / 2;
  const radius = 100;
  
  // Coordinates for the point
  const px = center + cos * radius;
  const py = center - sin * radius; // SVG Y is inverted

  // Handler for basic interaction (simulated slider for robustness)
  // Real drag logic on SVG can be complex, using a slider is accessible and stable
  
  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col min-h-[500px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Circle className="text-cyan-400" size={16} /> Unit Circle Explorer
        </h3>
        <div className="text-[10px] text-slate-500 uppercase font-bold">
            r = 1
        </div>
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-center flex-1">
        
        {/* THE VISUALIZER */}
        <div className="relative">
            <svg width={size} height={size} className="overflow-visible">
                {/* Grid Lines */}
                <line x1={center} y1="0" x2={center} y2={size} stroke="rgba(255,255,255,0.1)" />
                <line x1="0" y1={center} x2={size} y2={center} stroke="rgba(255,255,255,0.1)" />
                
                {/* The Unit Circle */}
                <circle cx={center} cy={center} r={radius} stroke="white" strokeWidth="2" fill="none" opacity="0.2" />

                {/* The Triangle */}
                <path 
                    d={`M ${center} ${center} L ${px} ${py} L ${px} ${center} Z`} 
                    fill="rgba(34, 211, 238, 0.1)" 
                    stroke="none" 
                />

                {/* Hypotenuse (Radius) */}
                <line x1={center} y1={center} x2={px} y2={py} stroke="white" strokeWidth="2" />

                {/* Adjacent (Cosine) - Purple */}
                <line x1={center} y1={center} x2={px} y2={center} stroke="#c084fc" strokeWidth="3" />
                
                {/* Opposite (Sine) - Cyan */}
                <line x1={px} y1={center} x2={px} y2={py} stroke="#22d3ee" strokeWidth="3" />

                {/* The Point */}
                <circle cx={px} cy={py} r="6" fill="white" stroke="#0f172a" strokeWidth="2" />
                
                {/* Angle Arc */}
                <path d={`M ${center + 20} ${center} A 20 20 0 0 0 ${center + Math.cos(rad)*20} ${center - Math.sin(rad)*20}`} stroke="yellow" fill="none" />
            </svg>
            
            {/* Labels overlay */}
            <div className="absolute top-0 right-0 text-[10px] text-slate-400 font-mono">
                (1, 0)
            </div>
        </div>

        {/* CONTROLS & DATA */}
        <div className="w-full max-w-xs space-y-6">
            
            {/* Slider */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-white uppercase">
                    <span>Angle (θ)</span>
                    <span className="text-yellow-400">{angle.toFixed(0)}°</span>
                </div>
                <input 
                    type="range" min="0" max="360" step="1"
                    value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="text-right text-[10px] font-mono text-slate-500">
                    {(rad / Math.PI).toFixed(2)}π Radians
                </div>
            </div>

            {/* The Ratios */}
            <div className="space-y-3">
                <div className="p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg flex justify-between items-center">
                    <div>
                        <div className="text-[10px] text-cyan-400 font-bold uppercase">Sine (Opposite)</div>
                        <div className="text-xs text-slate-400">Height / Hypotenuse</div>
                    </div>
                    <div className="text-xl font-mono font-bold text-white">{sin.toFixed(3)}</div>
                </div>

                <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg flex justify-between items-center">
                    <div>
                        <div className="text-[10px] text-purple-400 font-bold uppercase">Cosine (Adjacent)</div>
                        <div className="text-xs text-slate-400">Width / Hypotenuse</div>
                    </div>
                    <div className="text-xl font-mono font-bold text-white">{cos.toFixed(3)}</div>
                </div>

                <div className="p-3 bg-slate-800 border border-white/10 rounded-lg flex justify-between items-center">
                    <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Tangent (Slope)</div>
                        <div className="text-xs text-slate-500">Sine / Cosine</div>
                    </div>
                    <div className="text-xl font-mono font-bold text-white">{Math.abs(tan) > 10 ? '∞' : tan.toFixed(3)}</div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}