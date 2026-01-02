"use client";
import { useState } from "react";
import { Wind, AlertTriangle, ArrowUp } from "lucide-react";

export default function LiftLab() {
  const [angle, setAngle] = useState(0); // Degrees

  // Simple Aerodynamic Model
  // Lift coeff (Cl) ~ linear with angle until stall
  // Drag coeff (Cd) ~ exponential with angle
  
  const stallAngle = 15;
  
  let lift = 0;
  let drag = 0;
  let status = "LAMINAR"; // Laminar, Turbulent, Stall

  if (angle <= stallAngle) {
      lift = angle * 0.1 + 0.2; // Linear increase
      drag = 0.01 + (angle * angle) * 0.001; // Low drag
      status = "LAMINAR";
  } else {
      // POST-STALL
      lift = 1.7 - (angle - stallAngle) * 0.05; // Lift drops
      drag = 0.2 + (angle - stallAngle) * 0.02; // Drag spikes
      status = "STALL";
  }

  // Visualization Colors
  const streamColor = status === "STALL" ? "#ef4444" : status === "LAMINAR" ? "#10b981" : "#f59e0b";

  return (
    <div className="bg-slate-900/90 border border-blue-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-blue-100 flex items-center gap-2 font-mono tracking-wider">
                <Wind size={18} className="text-blue-500" /> WIND_TUNNEL
            </h3>
            <div className={`text-[10px] font-bold font-mono px-2 py-1 rounded ${status === "STALL" ? "bg-red-500/20 text-red-400 animate-pulse" : "bg-blue-500/10 text-blue-400"}`}>
                {status === "STALL" ? "⚠ STALL WARNING" : "FLOW: STABLE"}
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="relative h-48 bg-black/40 border border-white/5 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            
            {/* Wind Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {Array.from({length: 5}).map((_, i) => (
                    <line 
                        key={i}
                        x1="0" y1={30 + i*30} 
                        x2="300" y2={30 + i*30}
                        stroke={streamColor}
                        strokeWidth="2"
                        strokeDasharray={status === "STALL" ? "5 5" : "0"}
                        className="transition-all duration-300"
                        style={{ transform: `rotate(${-angle/4}deg)`, transformOrigin: "center" }} // Fake flow deflection
                    />
                ))}
            </svg>

            {/* The Wing (Airfoil) */}
            <div 
                className="w-40 h-8 bg-slate-200 rounded-[50%_50%_50%_50%_/_100%_100%_0%_0%] relative z-10 transition-transform duration-100 shadow-xl"
                style={{ transform: `rotate(-${angle}deg)` }}
            >
                {/* Center of Lift Marker */}
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Lift Vector */}
            <div 
                className="absolute flex flex-col items-center transition-all duration-100 z-20"
                style={{ 
                    height: `${lift * 100}px`, 
                    bottom: "50%", 
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                <span className="text-[10px] font-bold text-green-400 mb-1">LIFT</span>
                <div className="w-1 flex-1 bg-green-500" />
                <ArrowUp size={16} className="text-green-500 -mt-2" />
            </div>

        </div>

        {/* CONTROLS */}
        <div className="space-y-4">
            <div className="space-y-1">
                <div className="flex justify-between text-blue-200 text-xs font-bold">
                    <span>Angle of Attack (α)</span>
                    <span>{angle}°</span>
                </div>
                <input 
                    type="range" min="0" max="30" step="1"
                    value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
                    className={`w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full ${status === "STALL" ? "[&::-webkit-slider-thumb]:bg-red-500 bg-red-900" : "[&::-webkit-slider-thumb]:bg-blue-500 bg-blue-900"}`}
                />
            </div>

            {/* READOUTS */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-2 rounded border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Lift Coeff.</div>
                    <div className="text-xl font-mono text-green-400 font-bold">{lift.toFixed(2)}</div>
                </div>
                <div className="bg-black/30 p-2 rounded border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Drag Coeff.</div>
                    <div className={`text-xl font-mono font-bold ${status === "STALL" ? "text-red-500" : "text-orange-400"}`}>{drag.toFixed(2)}</div>
                </div>
            </div>
        </div>

        <p className="mt-4 text-[10px] text-slate-400 text-center leading-relaxed">
            The pilot must balance angle. Too low = no lift. Too high = stall (separation of airflow).
        </p>

    </div>
  );
}