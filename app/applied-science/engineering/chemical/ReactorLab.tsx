"use client";
import { useState, useEffect, useRef } from "react";
import { FlaskConical, Thermometer, Droplets, AlertTriangle } from "lucide-react";

export default function ReactorLab() {
  // State
  const [temp, setTemp] = useState(50); // Celsius (Ideal: 80-120)
  const [concentration, setConcentration] = useState(0); // % Product
  const [cooling, setCooling] = useState(50); // % Valve Open
  const [feedRate, setFeedRate] = useState(50); // % Flow
  
  const [status, setStatus] = useState("STABLE");
  
  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
        setTemp(prevT => {
            const T = prevT;
            
            // 1. Heat Generation (Exothermic Reaction)
            // Reaction rate doubles every 10 degrees (simple rule of thumb)
            const rate = Math.pow(2, (T - 50) / 20) * (feedRate / 50);
            const heatGen = rate * 0.8;
            
            // 2. Heat Removal (Cooling Jacket)
            const heatRemoval = (cooling / 100) * (T - 20) * 0.5; // Cooling water is 20C
            
            // 3. Ambient Loss
            const loss = (T - 25) * 0.05;

            let newT = T + heatGen - heatRemoval - loss;
            
            // Update Concentration based on reaction rate
            setConcentration(c => Math.min(100, Math.max(0, c + (rate * 0.1) - (feedRate * 0.1)))); // Reaction adds, Feed dilutes

            // Safety Logic
            if (newT > 180) setStatus("CRITICAL");
            else if (newT > 140) setStatus("WARNING");
            else if (newT < 40) setStatus("LOW ACTIVITY");
            else setStatus("OPTIMAL");

            return Math.max(20, Math.min(200, newT));
        });
    }, 100);
    return () => clearInterval(interval);
  }, [cooling, feedRate]);

  // Color Mapping
  const fluidColor = `hsl(${120 - (concentration)}, 70%, 50%)`; // Green to Red/Orange as product forms? No, let's go Blue (Reactant) to Lime (Product)
  // Let's do: Hue 200 (Blue) -> Hue 100 (Green)
  const hue = 200 - concentration; 

  return (
    <div className="bg-emerald-950/90 border border-lime-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lime-100 flex items-center gap-2 font-mono tracking-wider">
                <FlaskConical size={18} className="text-lime-500" /> CSTR_REACTOR
            </h3>
            <div className={`text-[10px] font-bold font-mono px-2 py-1 rounded ${status === "CRITICAL" ? "bg-red-500 text-white animate-pulse" : status === "WARNING" ? "bg-orange-500 text-black" : "bg-lime-900 text-lime-400"}`}>
                {status}
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="relative h-48 bg-[#0f172a] border border-white/5 rounded-lg mb-6 flex justify-center overflow-hidden">
            
            {/* The Tank */}
            <div className="relative w-32 h-full border-x-2 border-b-2 border-slate-500 rounded-b-xl overflow-hidden mt-4 bg-slate-800/30">
                {/* Fluid Level */}
                <div 
                    className="absolute bottom-0 w-full transition-all duration-300 opacity-80"
                    style={{ 
                        height: '80%', 
                        backgroundColor: `hsl(${hue}, 70%, 50%)`,
                        boxShadow: `0 0 20px hsl(${hue}, 70%, 50%)`
                    }}
                >
                    {/* Bubbles (Reaction Visual) */}
                    {temp > 80 && (
                        <div className="w-full h-full absolute inset-0 animate-pulse bg-white/10" />
                    )}
                </div>

                {/* Impeller (Mixer) */}
                <div className="absolute top-0 left-1/2 w-1 h-[70%] bg-slate-400 -translate-x-1/2">
                    <div className="absolute bottom-0 left-1/2 w-20 h-2 bg-slate-300 -translate-x-1/2 animate-spin" style={{ animationDuration: '0.5s' }} />
                </div>
            </div>

            {/* Cooling Jacket (Surrounds Tank) */}
            <div className="absolute top-4 w-40 h-[90%] border-2 border-blue-500/30 rounded-b-xl -z-10 flex flex-col justify-end p-1">
                 <div 
                    className="w-full bg-blue-500/20 transition-all duration-300"
                    style={{ height: `${cooling}%` }}
                 />
                 <span className="absolute bottom-1 right-2 text-[9px] text-blue-400 font-mono">COOLING</span>
            </div>

        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-2 gap-6">
            
            {/* FEED RATE */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-amber-500 font-mono flex justify-between">
                    <span>FEED (Reactants)</span>
                    <span>{feedRate}%</span>
                </label>
                <input 
                    type="range" min="0" max="100" 
                    value={feedRate} onChange={(e) => setFeedRate(parseInt(e.target.value))}
                    className="w-full h-1 bg-amber-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                />
            </div>

            {/* COOLING */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-blue-400 font-mono flex justify-between">
                    <span>COOLING VALVE</span>
                    <span>{cooling}%</span>
                </label>
                <input 
                    type="range" min="0" max="100" 
                    value={cooling} onChange={(e) => setCooling(parseInt(e.target.value))}
                    className="w-full h-1 bg-blue-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
            </div>

        </div>

        {/* READOUTS */}
        <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-black/20 p-2 rounded border border-white/5 text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase flex items-center justify-center gap-1"><Thermometer size={10}/> Temp</div>
                <div className={`text-xl font-mono font-bold ${temp > 140 ? "text-red-500" : "text-white"}`}>{temp.toFixed(0)}°C</div>
            </div>
            <div className="bg-black/20 p-2 rounded border border-white/5 text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase flex items-center justify-center gap-1"><Droplets size={10}/> Yield</div>
                <div className="text-xl font-mono text-lime-400 font-bold">{concentration.toFixed(0)}%</div>
            </div>
        </div>

    </div>
  );
}