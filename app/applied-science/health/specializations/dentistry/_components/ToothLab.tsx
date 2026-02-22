"use client";
import React, { useState } from 'react';
import { Smile, Bug, ShieldAlert, Zap, Syringe } from 'lucide-react';

export default function ToothLab() {
  const [decay, setDecay] = useState(0); // 0 to 100

  // Calculate clinical stages
  let stage = "Healthy";
  let symptoms = "None. The enamel armor is intact.";
  let treatment = "Brushing, Flossing, Fluoride";
  let painLevel = 0;
  let icon = <Smile size={16} className="text-teal-400" />;

  if (decay > 5 && decay <= 30) {
      stage = "Enamel Demineralization";
      symptoms = "Bacteria produce lactic acid, dissolving surface minerals. White spot lesions form. Painless, as enamel has no nerves.";
      treatment = "Reversible with Fluoride & Hygiene";
      painLevel = 1;
      icon = <Bug size={16} className="text-yellow-400" />;
  } else if (decay > 30 && decay <= 65) {
      stage = "Dentin Decay (Cavity)";
      symptoms = "The acid breaches the enamel and hits the porous dentin. Fluid in dentinal tubules shifts, causing sharp pain to cold/sweets.";
      treatment = "Drill & Composite Filling";
      painLevel = 5;
      icon = <ShieldAlert size={16} className="text-orange-500" />;
  } else if (decay > 65 && decay <= 90) {
      stage = "Pulpitis (Nerve Infection)";
      symptoms = "Bacteria reach the pulp chamber. The nerve becomes violently inflamed. Throbbing, spontaneous, agonizing pain.";
      treatment = "Root Canal Therapy (Endodontics)";
      painLevel = 10;
      icon = <Zap size={16} className="text-red-500" />;
  } else if (decay > 90) {
      stage = "Necrosis & Abscess";
      symptoms = "The nerve dies. Infection spills out the tip of the root into the jawbone, forming a pocket of pus. Swelling and severe risk.";
      treatment = "Extraction or Complex Root Canal";
      painLevel = 8; // Pain sometimes drops slightly when the nerve fully dies before pressure builds
      icon = <Syringe size={16} className="text-red-700" />;
  }

  // SVG Stylized Molar Paths
  const enamelPath = "M 100 120 C 100 80, 120 70, 150 90 C 180 70, 200 80, 200 120 C 200 160, 180 170, 175 190 L 180 280 C 180 300, 160 300, 155 280 L 150 220 L 145 280 C 140 300, 120 300, 120 280 L 125 190 C 120 170, 100 160, 100 120 Z";
  const dentinPath = "M 115 125 C 115 100, 130 95, 150 110 C 170 95, 185 100, 185 125 C 185 150, 170 165, 165 185 L 170 270 C 170 280, 160 280, 155 270 L 150 200 L 145 270 C 140 280, 130 280, 130 270 L 135 185 C 130 165, 115 150, 115 125 Z";
  const pulpPath   = "M 135 135 C 135 120, 145 115, 150 125 C 155 115, 165 120, 165 135 C 165 150, 155 160, 155 180 L 160 265 L 150 190 L 140 265 L 145 180 C 145 160, 135 150, 135 135 Z";

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-teal-400 flex items-center gap-2 tracking-widest">
                <Smile size={14} /> Dental Caries Simulator
            </div>
            <div className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${decay > 65 ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-teal-900/20 text-teal-400 border border-teal-500/30'}`}>
                Depth: {decay}%
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-[#020808] relative p-8 flex justify-center items-center min-h-[400px]">
                 <svg viewBox="0 0 300 350" className="w-full max-w-[250px] drop-shadow-2xl">
                    
                    {/* Jawbone/Gum line reference */}
                    <path d="M 50 180 Q 150 200 250 180 L 250 350 L 50 350 Z" fill="rgba(225, 29, 72, 0.1)" />
                    <line x1="50" y1="180" x2="250" y2="180" stroke="rgba(225, 29, 72, 0.3)" strokeWidth="2" strokeDasharray="4"/>

                    {/* Tooth Anatomy */}
                    <path d={enamelPath} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" /> {/* Enamel (White) */}
                    <path d={dentinPath} fill="#fef3c7" stroke="#fde68a" strokeWidth="2" /> {/* Dentin (Yellowish) */}
                    
                    {/* Pulp changes color if necrotic */}
                    <path d={pulpPath} fill={decay > 90 ? "#451a1f" : "#ef4444"} /> {/* Pulp (Red Nerve) */}

                    {/* The Decay (Cavity) */}
                    {decay > 0 && (
                        <circle 
                            cx="150" 
                            cy="90" 
                            r={decay * 0.5} 
                            fill={decay > 30 ? "#27272a" : "#713f12"} // Turns blacker as it gets deeper
                            className="transition-all duration-200"
                        />
                    )}

                    {/* Abscess at the root apex */}
                    {decay > 90 && (
                        <circle cx="140" cy="275" r={(decay - 90) * 1.5} fill="#facc15" opacity="0.8" className="animate-pulse" />
                    )}
                 </svg>

                 {/* Labels */}
                 <div className="absolute top-1/4 left-4 text-[10px] font-bold text-neutral-400 uppercase">Enamel</div>
                 <div className="absolute top-1/3 left-4 text-[10px] font-bold text-yellow-600 uppercase">Dentin</div>
                 <div className="absolute top-1/2 left-4 text-[10px] font-bold text-red-500 uppercase">Pulp</div>
            </div>

            {/* CLINICAL DATA PANEL */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                
                <div className="bg-black/60 p-5 rounded-xl border border-neutral-800 min-h-[180px]">
                    <div className="flex items-center gap-2 mb-3">
                        {icon}
                        <h4 className="text-white font-black tracking-tight">{stage}</h4>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                        {symptoms}
                    </p>
                    <div className="border-t border-neutral-800 pt-3">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Clinical Intervention</span>
                        <span className="text-xs font-mono text-teal-300">{treatment}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-neutral-500">
                        <span>Patient Pain Level</span>
                        <span className={painLevel > 7 ? 'text-red-500' : painLevel > 3 ? 'text-orange-500' : 'text-green-500'}>
                            {painLevel} / 10
                        </span>
                    </div>
                    {/* Pain Bar */}
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-300 ${painLevel > 7 ? 'bg-red-500' : painLevel > 3 ? 'bg-orange-500' : 'bg-green-500'}`} 
                            style={{ width: `${painLevel * 10}%` }}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-teal-500 mb-2 tracking-widest">
                        <span>Acid Exposure Time</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" step="1" 
                        value={decay} onChange={e => setDecay(parseInt(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                </div>

            </div>
        </div>
    </div>
  );
}