"use client";
import { useState } from "react";
import { Sun, Droplet, Wind, Zap } from "lucide-react";
import { M } from "@/components/Math";

export default function PhotosynthesisWidget() {
  const [light, setLight] = useState(50);
  const [water, setWater] = useState(50);
  const [co2, setCo2] = useState(50);

  // Calculate Efficiency based on "Limiting Factor" principle
  // Production is limited by the scarcest resource
  const efficiency = Math.min(light, water, co2);
  
  // Color shifting leaf based on health
  const getLeafColor = () => {
      if (efficiency < 30) return "text-yellow-600"; // Wilting
      if (efficiency < 70) return "text-emerald-600"; // Healthy
      return "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"; // Thriving
  };

  return (
    <div className="bg-neutral-900/90 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-emerald-100 flex items-center gap-2">
                <Zap size={18} className="text-yellow-400" /> Photosynthesis Engine
            </h3>
            <div className="text-xs font-mono text-emerald-500">
                OUTPUT: {efficiency.toFixed(0)}%
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="flex items-center justify-center py-6 relative">
            {/* The Leaf */}
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className={`transition-all duration-1000 ${getLeafColor()}`}>
                <path d="M2 22C2 22 2.00001 16.1983 2.6167 13.9928C3.60742 10.4491 5.96825 7.42352 9.15579 5.60252C12.3433 3.78152 16.1042 3.31023 19.6649 4.28639C19.6649 4.28639 22 2 22 2C22 2 21.0066 6.45262 19.8973 8.79155C18.1152 12.5489 14.8219 15.3377 10.8719 16.5921C8.41187 17.3734 2 22 2 22Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 22C2 22 7.72816 16.3263 19.6649 4.28638" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Particles (Bubbles of O2) */}
            {efficiency > 50 && (
                <div className="absolute top-0 right-10 animate-bounce text-cyan-300 text-xs font-bold">O₂</div>
            )}
        </div>

        {/* CONTROLS */}
        <div className="space-y-4">
            
            {/* Light */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-yellow-200">
                    <span className="flex items-center gap-1"><Sun size={10} /> PHOTONS</span>
                    <span>{light} lx</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={light} 
                    onChange={(e) => setLight(parseInt(e.target.value))}
                    className="w-full h-1 bg-yellow-900/50 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
            </div>

            {/* Water */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-cyan-200">
                    <span className="flex items-center gap-1"><Droplet size={10} /> H₂O INPUT</span>
                    <span>{water} mL</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={water} 
                    onChange={(e) => setWater(parseInt(e.target.value))}
                    className="w-full h-1 bg-cyan-900/50 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
            </div>

            {/* CO2 */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span className="flex items-center gap-1"><Wind size={10} /> CO₂ CONCENTRATION</span>
                    <span>{co2} ppm</span>
                </div>
                <input 
                    type="range" min="0" max="100" value={co2} 
                    onChange={(e) => setCo2(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-300"
                />
            </div>

        </div>

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <div className="text-xs font-serif text-emerald-200/60">
                <M>{"6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2"}</M>
            </div>
        </div>
    </div>
  );
}