"use client";
import React from "react";
import { X, Microscope, AlertTriangle, Activity, Dna, FileWarning } from "lucide-react";
import { MicrobeRecord } from "./useWikiMicrobe";
import { MICROBE_CONFIG, BSL_CONFIG } from "./microbiology-data";

export default function MicrobiologyModal({ microbe, onClose }: { microbe: MicrobeRecord, onClose: () => void }) {
  const config = MICROBE_CONFIG[microbe.type];
  const bslConfig = BSL_CONFIG[microbe.bsl];
  const BslIcon = bslConfig.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer" />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Left: Microscopy View */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-[#020606] border-r border-white/10 group">
             {/* Simulated Microscope Overlay */}
             <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#000_100%)] opacity-80" />
             
             {/* Crosshairs */}
             <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-30">
                 <div className="w-full h-[1px] bg-cyan-500/50" />
                 <div className="h-full w-[1px] bg-cyan-500/50 absolute" />
                 <div className="w-20 h-20 border border-cyan-500/50 rounded-full" />
             </div>

             {microbe.thumbnail ? (
                 <img src={microbe.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000 grayscale group-hover:grayscale-0" />
             ) : (
                 <div className="w-full h-full flex items-center justify-center text-cyan-900 font-mono text-xs">NO SAMPLE</div>
             )}
             
             {/* Live Data Overlay */}
             <div className="absolute top-4 left-4 z-30">
                 <div className={`px-2 py-1 rounded border ${bslConfig.color.replace('text', 'border')} bg-black/80 backdrop-blur text-[10px] font-bold uppercase tracking-widest ${bslConfig.color} flex items-center gap-2`}>
                     <BslIcon size={12} /> {microbe.bsl}
                 </div>
             </div>
        </div>

        {/* Right: Lab Report */}
        <div className="flex-1 p-8 md:p-10 bg-gradient-to-br from-neutral-900 to-black">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-widest">
                    <Microscope size={14} /> Analysis Report
                </div>
                <button onClick={onClose}><X className="text-stone-500 hover:text-white" /></button>
            </div>

            <h2 className="text-4xl font-black text-white mb-2 leading-none tracking-tighter">{microbe.title}</h2>
            <div className={`text-xs font-bold uppercase tracking-widest mb-6 ${config.color}`}>
                Domain: {config.label}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 rounded bg-white/5 border border-white/5">
                    <div className="text-[9px] uppercase text-stone-500 mb-1">Morphology</div>
                    <div className="text-white font-mono text-xs">{microbe.shape}</div>
                </div>
                <div className="p-3 rounded bg-white/5 border border-white/5">
                    <div className="text-[9px] uppercase text-stone-500 mb-1">Risk Factor</div>
                    <div className={`${bslConfig.color} font-mono text-xs`}>{bslConfig.label}</div>
                </div>
            </div>

            <p className="text-stone-400 leading-relaxed text-sm mb-8">
                {microbe.extract}
            </p>

            <button className="w-full py-3 rounded border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-widest hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2">
                <Dna size={14} /> Sequence Genome
            </button>
        </div>
      </div>
    </div>
  );
}