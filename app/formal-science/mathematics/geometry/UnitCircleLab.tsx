"use client";
import { useState, useRef } from "react";
import { Circle, RefreshCw, Triangle } from "lucide-react";

export default function UnitCircleLab() {
  const [angle, setAngle] = useState(45); // Degrees

  // Math
  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.tan(rad);

  // SVG Config
  const R = 80; // Radius
  const CX = 100;
  const CY = 100;
  
  // Point P on circle
  const px = CX + R * cos;
  const py = CY - R * sin; // SVG Y is inverted

  // Handle Drag (Simplified as slider for stability)
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAngle(parseInt(e.target.value));
  };

  return (
    <div className="bg-emerald-900/80 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-sm">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-emerald-100 flex items-center gap-2 font-mono tracking-wider">
                <Circle size={18} className="text-emerald-500" /> UNIT_CIRCLE
            </h3>
            <div className="text-[10px] font-mono text-emerald-500/50">TRIGONOMETRY.MOD</div>
        </div>

        {/* VISUALIZER */}
        <div className="relative w-full aspect-square bg-black/40 border border-white/5 rounded-lg mb-6 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Axes */}
                <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.2)" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.2)" />
                
                {/* Circle */}
                <circle cx="100" cy="100" r={R} fill="none" stroke="white" strokeOpacity="0.5" />

                {/* Triangle Lines */}
                {/* Cosine (Green) - Horizontal */}
                <line x1="100" y1="100" x2={px} y2="100" stroke="#34d399" strokeWidth="2" />
                {/* Sine (Red/Pink) - Vertical */}
                <line x1={px} y1="100" x2={px} y2={py} stroke="#f472b6" strokeWidth="2" />
                {/* Radius (White) */}
                <line x1="100" y1="100" x2={px} y2={py} stroke="white" strokeWidth="1" strokeDasharray="4" />

                {/* Angle Arc */}
                <path d={`M ${100 + 20} 100 A 20 20 0 0 0 ${100 + 20 * Math.cos(rad)} ${100 - 20 * Math.sin(rad)}`} fill="none" stroke="yellow" strokeOpacity="0.5" />

                {/* Point */}
                <circle cx={px} cy={py} r="4" fill="white" />
            </svg>
        </div>

        {/* CONTROLS */}
        <input 
            type="range" min="0" max="360" 
            value={angle} onChange={handleSlider}
            className="w-full h-1 bg-emerald-950 rounded appearance-none cursor-pointer mb-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
        />

        {/* DATA */}
        <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-black/20 p-2 rounded border border-emerald-500/20">
                <div className="text-[10px] text-emerald-400 font-bold mb-1">SIN (Y)</div>
                <div className="text-sm font-mono text-pink-400">{sin.toFixed(2)}</div>
            </div>
            <div className="bg-black/20 p-2 rounded border border-emerald-500/20">
                <div className="text-[10px] text-emerald-400 font-bold mb-1">COS (X)</div>
                <div className="text-sm font-mono text-emerald-400">{cos.toFixed(2)}</div>
            </div>
            <div className="bg-black/20 p-2 rounded border border-emerald-500/20">
                <div className="text-[10px] text-emerald-400 font-bold mb-1">TAN</div>
                <div className="text-sm font-mono text-yellow-400">{Math.abs(tan) > 10 ? "∞" : tan.toFixed(2)}</div>
            </div>
        </div>

    </div>
  );
}