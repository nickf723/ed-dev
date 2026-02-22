"use client";
import React, { useState } from 'react';
import { Activity, Heart, Zap } from 'lucide-react';

export default function ECGLab() {
  const [time, setTime] = useState(0); // 0 to 100 percentage of cycle

  // ECG Data Points (Simplified for SVG rendering)
  // Format: [x, y] mapped to a 0-100 X scale and 0-100 Y scale (baseline 70)
  const ecgPath = `
    M 0 70 L 10 70 
    Q 15 50 20 70 
    L 25 70 L 28 75 
    L 32 10 
    L 36 85 L 39 70 
    L 50 70 
    Q 60 40 70 70 
    L 100 70
  `;

  // Determine current phase based on time
  let phase = "Resting";
  let description = "The heart is in diastole. Blood is passively filling the atria and ventricles.";
  let activeChamber = "None";
  let color = "text-neutral-500";

  if (time > 10 && time < 25) {
      phase = "P-Wave (Atrial Depolarization)";
      description = "The SA Node fires. Electrical signal sweeps across the atria, causing them to contract and push the last 20% of blood into the ventricles.";
      activeChamber = "Atria";
      color = "text-yellow-400";
  } else if (time >= 25 && time < 40) {
      phase = "QRS Complex (Ventricular Depolarization)";
      description = "The massive electrical discharge fires through the Purkinje fibers. The powerful ventricles contract, slamming the AV valves shut (the 'Lub' sound) and pumping blood to the body and lungs.";
      activeChamber = "Ventricles";
      color = "text-red-500";
  } else if (time >= 40 && time < 50) {
      phase = "ST Segment";
      description = "The ventricles are fully contracted and emptying. This should be perfectly flat—if it's elevated, it indicates a heart attack (STEMI).";
      activeChamber = "Ventricles (Contracted)";
      color = "text-orange-500";
  } else if (time >= 50 && time < 75) {
      phase = "T-Wave (Ventricular Repolarization)";
      description = "The electrical system resets. The ventricles relax, the aortic valve snaps shut (the 'Dub' sound), and the heart prepares for the next beat.";
      activeChamber = "Resetting";
      color = "text-blue-400";
  }

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-red-500 flex items-center gap-2">
                <Activity size={14} /> The Electrocardiogram (ECG/EKG)
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-black/40 relative p-8 flex flex-col justify-center">
                 {/* Background Grid */}
                 <div className="absolute inset-0 opacity-20" 
                      style={{ backgroundImage: 'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                 
                 <svg viewBox="0 0 100 100" className="w-full h-48 overflow-visible relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    {/* The Trace */}
                    <path d={ecgPath} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* The Scrubber Line */}
                    <line x1={time} y1="-10" x2={time} y2="110" stroke="#fff" strokeWidth="1" strokeDasharray="2" />
                    <circle cx={time} cy="70" r="3" fill="#fff" className="drop-shadow-lg" />
                 </svg>

                 {/* Wave Labels */}
                 <div className="absolute top-1/2 left-0 w-full flex text-[10px] font-bold text-red-300/50 font-mono -translate-y-12 px-8">
                     <span className="absolute" style={{left: '15%'}}>P</span>
                     <span className="absolute" style={{left: '32%', top: '-40px'}}>R</span>
                     <span className="absolute" style={{left: '28%', top: '20px'}}>Q</span>
                     <span className="absolute" style={{left: '38%', top: '20px'}}>S</span>
                     <span className="absolute" style={{left: '60%'}}>T</span>
                 </div>
            </div>

            {/* CONTROLS & DATA */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                
                <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl h-32">
                    <div className={`text-xs font-bold uppercase mb-2 ${color} flex items-center gap-2`}>
                        <Zap size={14} /> {phase}
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-neutral-500">Active Chamber</span>
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                            <Heart size={14} className={activeChamber !== 'None' && activeChamber !== 'Resetting' ? 'text-red-500 fill-red-500/20' : 'text-neutral-600'} />
                            {activeChamber}
                        </span>
                    </div>
                    <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-neutral-500">Timeline</span>
                        <span className="text-sm font-bold text-white font-mono">
                            {(time * 8).toFixed(0)} ms
                        </span>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500 mb-2">
                        <span>Timeline Scrub</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" step="0.5" 
                        value={time} onChange={e => setTime(parseFloat(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                </div>

            </div>
        </div>
    </div>
  );
}