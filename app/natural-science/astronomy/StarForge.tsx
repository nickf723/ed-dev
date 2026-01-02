"use client";
import { useState } from "react";
import { Sparkles, Activity, Disc, AlertTriangle } from "lucide-react";

export default function StarForge() {
  const [mass, setMass] = useState(1.0); // Solar Masses

  // Stellar Physics Approximation
  // Luminosity ~ Mass^3.5
  // Lifetime ~ Mass^-2.5
  // Radius ~ Mass^0.8
  
  const radius = Math.pow(mass, 0.8);
  const temp = Math.pow(mass, 0.5) * 5778; // Kelvin
  const luminosity = Math.pow(mass, 3.5);
  const lifespan = Math.pow(mass, -2.5) * 10; // Billion Years

  // Determine Class
  let type = "G-Type (Yellow Dwarf)";
  let color = "#facc15"; // Sun Yellow
  let endState = "White Dwarf";
  let shadow = "rgba(250, 204, 21, 0.5)";

  if (mass < 0.5) {
      type = "M-Type (Red Dwarf)";
      color = "#ef4444"; // Red
      shadow = "rgba(239, 68, 68, 0.5)";
  } else if (mass > 8) {
      type = "O-Type (Blue Supergiant)";
      color = "#60a5fa"; // Blue
      shadow = "rgba(96, 165, 250, 0.8)";
      endState = "Black Hole";
  } else if (mass > 2) {
      type = "A-Type (White/Blue)";
      color = "#e0f2fe"; // White Blue
      shadow = "rgba(224, 242, 254, 0.6)";
      endState = mass > 8 ? "Neutron Star" : "White Dwarf";
  }

  return (
    <div className="bg-slate-900/80 border border-purple-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md relative overflow-hidden">
        
        {/* HUD Elements */}
        <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-75" />
            <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-150" />
        </div>

        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-purple-200 flex items-center gap-2 font-mono tracking-wider">
                <Sparkles size={18} className="text-purple-500" /> STAR_FORGE
            </h3>
            <div className="text-[10px] text-purple-500/50 font-mono border border-purple-500/20 px-2 py-1 rounded">
                MAIN_SEQUENCE
            </div>
        </div>

        {/* STAR VISUALIZER */}
        <div className="relative h-56 bg-black/60 border border-white/5 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            
            {/* The Star */}
            <div 
                className="rounded-full transition-all duration-500 relative z-10"
                style={{ 
                    width: `${Math.min(180, 40 * radius)}px`, 
                    height: `${Math.min(180, 40 * radius)}px`,
                    backgroundColor: color,
                    boxShadow: `0 0 40px ${shadow}, inset 0 0 20px rgba(255,255,255,0.5)`
                }}
            >
                {/* Surface Turbulence Animation */}
                <div className="absolute inset-0 rounded-full opacity-50 bg-[url('/noise.png')] animate-spin-slow mix-blend-overlay" />
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        </div>

        {/* CONTROLS */}
        <div className="space-y-4 mb-6">
            <div className="space-y-1">
                <div className="flex justify-between text-purple-200 text-xs font-bold">
                    <span>STELLAR MASS</span>
                    <span>{mass.toFixed(1)} M☉</span>
                </div>
                <input 
                    type="range" min="0.1" max="20" step="0.1"
                    value={mass} onChange={(e) => setMass(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:shadow-[0_0_10px_purple]"
                />
            </div>
        </div>

        {/* DATA READOUT */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-black/40 p-2 rounded border border-white/5">
                <div className="text-zinc-500 mb-1">CLASSIFICATION</div>
                <div style={{ color: color }} className="font-bold">{type}</div>
            </div>
            <div className="bg-black/40 p-2 rounded border border-white/5">
                <div className="text-zinc-500 mb-1">TEMPERATURE</div>
                <div className="text-white font-bold">{temp.toFixed(0)} K</div>
            </div>
            <div className="bg-black/40 p-2 rounded border border-white/5">
                <div className="text-zinc-500 mb-1">LIFESPAN</div>
                <div className="text-white font-bold">{lifespan < 0.01 ? "< 10 My" : `${lifespan.toFixed(1)} By`}</div>
            </div>
            <div className="bg-black/40 p-2 rounded border border-white/5">
                <div className="text-zinc-500 mb-1">FATE</div>
                <div className={`font-bold ${mass > 8 ? "text-red-500 animate-pulse" : "text-zinc-300"}`}>{endState}</div>
            </div>
        </div>

    </div>
  );
}