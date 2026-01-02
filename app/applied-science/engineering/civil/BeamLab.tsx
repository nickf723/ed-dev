"use client";
import { useState } from "react";
import { Ruler, ArrowDownToLine, Anchor } from "lucide-react";

export default function BeamLab() {
  const [load, setLoad] = useState(50); // % Load
  const [span, setSpan] = useState(50); // % Length

  // Physics Simulation (Simplified Visuals)
  // Deflection is proportional to Load * Span^3
  // We normalize inputs to 0-1 range for math
  const P = load / 100;
  const L = span / 100;
  const deflection = (P * Math.pow(L, 3)) * 80; // Scale factor for pixels
  
  // SVG Path Generator for a bent beam
  // Quadratic curve: Start(0,0), Control(Mid, Deflection*2), End(Width, 0)
  const width = 200 + (L * 100); // Visual width changes with span
  const startX = (340 - width) / 2;
  const endX = startX + width;
  const midX = 170;
  const beamY = 60;
  const bendY = beamY + deflection;

  return (
    <div className="bg-zinc-900/90 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-yellow-100 flex items-center gap-2 font-mono tracking-wider">
                <Ruler size={18} className="text-yellow-500" /> BEAM_LAB
            </h3>
            <div className="text-[10px] font-mono text-yellow-500/50">STATICS.MOD</div>
        </div>

        {/* VISUALIZER */}
        <div className="relative h-48 bg-black/40 border border-white/5 rounded-lg mb-6 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Force Arrow */}
            <div 
                className="absolute text-yellow-500 flex flex-col items-center transition-all duration-300"
                style={{ top: bendY - 40, left: 170 - 12 }} // Center is 170
            >
                <span className="text-[10px] font-bold font-mono">{load}kN</span>
                <ArrowDownToLine size={24} />
            </div>

            <svg className="w-full h-full">
                {/* Supports */}
                <polygon points={`${startX},${beamY+10} ${startX-10},${beamY+25} ${startX+10},${beamY+25}`} fill="#52525b" />
                <polygon points={`${endX},${beamY+10} ${endX-10},${beamY+25} ${endX+10},${beamY+25}`} fill="#52525b" />
                
                {/* The Neutral Axis (Dotted) */}
                <path 
                    d={`M ${startX} ${beamY} Q ${midX} ${bendY} ${endX} ${beamY}`}
                    fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="4" strokeWidth="1"
                />

                {/* The Beam Top (Compression - Red) */}
                <path 
                    d={`M ${startX} ${beamY-6} Q ${midX} ${bendY-6} ${endX} ${beamY-6}`}
                    fill="none" stroke="#ef4444" strokeWidth="4"
                />
                
                {/* The Beam Bottom (Tension - Blue) */}
                <path 
                    d={`M ${startX} ${beamY+6} Q ${midX} ${bendY+6} ${endX} ${beamY+6}`}
                    fill="none" stroke="#3b82f6" strokeWidth="4"
                />

                {/* Beam Body Fill (Optional, complex to mask perfectly in simple SVG) */}
            </svg>

            {/* Stress Indicators */}
            <div className="absolute bottom-2 left-4 flex gap-4 text-[9px] font-mono uppercase">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"/> Compression</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"/> Tension</div>
            </div>

        </div>

        {/* CONTROLS */}
        <div className="space-y-4">
            <div className="space-y-1">
                <div className="flex justify-between text-yellow-500/80 text-xs font-bold">
                    <span>LOAD (P)</span>
                    <span>{load} kN</span>
                </div>
                <input 
                    type="range" min="0" max="100" 
                    value={load} onChange={(e) => setLoad(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
                />
            </div>

            <div className="space-y-1">
                <div className="flex justify-between text-zinc-400 text-xs font-bold">
                    <span>SPAN (L)</span>
                    <span>{span} m</span>
                </div>
                <input 
                    type="range" min="20" max="100" 
                    value={span} onChange={(e) => setSpan(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-400"
                />
            </div>
        </div>

    </div>
  );
}