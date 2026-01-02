"use client";
import { useState } from "react";
import { Settings, Gauge, Activity, RotateCw } from "lucide-react";

export default function GearMechanic() {
  const [driverTeeth, setDriverTeeth] = useState(12);
  const [drivenTeeth, setDrivenTeeth] = useState(24);
  
  // Physics
  const ratio = drivenTeeth / driverTeeth;
  const speedMult = 1 / ratio; // Speed is inverse to teeth
  const torqueMult = ratio;    // Torque is proportional to teeth ratio
  
  // Animation speeds (CSS durations)
  const baseSpeed = 4; // seconds per rotation
  const driverSpeed = baseSpeed;
  const drivenSpeed = baseSpeed * ratio; // If driven is bigger (ratio > 1), it spins slower (larger duration)

  return (
    <div className="bg-slate-900/90 border border-orange-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-orange-100 flex items-center gap-2 font-mono tracking-wider">
                <Settings size={18} className="text-orange-500" /> TRANSMISSION
            </h3>
            <div className="text-[10px] font-mono text-orange-500/50">MECHANICAL.SYS</div>
        </div>

        {/* VISUALIZER */}
        <div className="relative h-48 bg-blue-950/30 border border-white/5 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-1">
                {/* DRIVER GEAR */}
                <div 
                    className="relative rounded-full border-4 border-dashed border-zinc-400 bg-zinc-800 flex items-center justify-center animate-spin-linear"
                    style={{ 
                        width: driverTeeth * 4, 
                        height: driverTeeth * 4,
                        animationDuration: `${driverSpeed}s`
                    }}
                >
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                
                {/* DRIVEN GEAR */}
                <div 
                    className="relative rounded-full border-4 border-dashed border-orange-500 bg-orange-900/20 flex items-center justify-center animate-spin-linear-reverse"
                    style={{ 
                        width: drivenTeeth * 4, 
                        height: drivenTeeth * 4,
                        animationDuration: `${drivenSpeed}s`
                    }}
                >
                    <div className="w-2 h-2 bg-white rounded-full" />
                </div>
            </div>
            
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-500">
                RPM Ratio: 1 : {(1/ratio).toFixed(2)}
            </div>
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 flex justify-between">
                    <span>DRIVER (Input)</span>
                    <span className="text-white">{driverTeeth}t</span>
                </label>
                <input 
                    type="range" min="8" max="40" step="4"
                    value={driverTeeth} onChange={(e) => setDriverTeeth(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 flex justify-between">
                    <span>DRIVEN (Output)</span>
                    <span className="text-white">{drivenTeeth}t</span>
                </label>
                <input 
                    type="range" min="8" max="40" step="4"
                    value={drivenTeeth} onChange={(e) => setDrivenTeeth(parseInt(e.target.value))}
                    className="w-full h-1 bg-orange-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                />
            </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-3 rounded border border-white/5 flex flex-col items-center">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1">
                    <RotateCw size={10} /> Speed
                </div>
                <div className={`text-xl font-mono font-bold ${speedMult > 1 ? "text-green-400" : speedMult < 1 ? "text-red-400" : "text-white"}`}>
                    {speedMult.toFixed(2)}x
                </div>
            </div>
            <div className="bg-black/30 p-3 rounded border border-white/5 flex flex-col items-center">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1">
                    <Activity size={10} /> Torque
                </div>
                <div className={`text-xl font-mono font-bold ${torqueMult > 1 ? "text-green-400" : torqueMult < 1 ? "text-red-400" : "text-white"}`}>
                    {torqueMult.toFixed(2)}x
                </div>
            </div>
        </div>

        <p className="mt-4 text-[10px] text-zinc-500 text-center leading-relaxed">
            Trade-off: A smaller driver spinning a larger gear creates <strong>Torque</strong> (Strength) but loses Speed.
        </p>

    </div>
  );
}