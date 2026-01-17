"use client";
import React from "react";
import { X, Sun, Droplets, ScanLine, Sprout } from "lucide-react";
import { PlantRecord } from "./useWikiBotany";
import { USAGE_CONFIG } from "./botany-data";

export default function BotanyModal({ plant, onClose }: { plant: PlantRecord, onClose: () => void }) {
  const config = USAGE_CONFIG[plant.usage];
  const UsageIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm cursor-pointer" />

      <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#022c22] to-black border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in slide-in-from-bottom-8 duration-500">
        
        {/* LEFT: IMAGE */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black/50">
             {plant.thumbnail && (
                 <img src={plant.thumbnail} className="w-full h-full object-cover opacity-80" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent" />
             
             {/* Overlay Stats */}
             <div className="absolute bottom-6 left-6 flex gap-4">
                 <div className="p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur text-center min-w-[60px]">
                     <Sun size={14} className="mx-auto text-yellow-400 mb-1" />
                     <div className="text-[9px] font-bold text-stone-400 uppercase">{plant.sun}</div>
                 </div>
                 <div className="p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur text-center min-w-[60px]">
                     <Droplets size={14} className="mx-auto text-blue-400 mb-1" />
                     <div className="text-[9px] font-bold text-stone-400 uppercase">{plant.water}</div>
                 </div>
             </div>
        </div>

        {/* RIGHT: DATA */}
        <div className="flex-1 p-8 md:p-10">
            <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full border ${config.border} bg-white/5 flex items-center gap-2`}>
                    <UsageIcon size={12} className={config.color} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${config.color}`}>
                        {config.label} Class
                    </span>
                </div>
                <button onClick={onClose}><X className="text-stone-500 hover:text-white" /></button>
            </div>

            <h2 className="text-4xl font-black text-white mb-2 leading-none">{plant.title}</h2>
            <div className="text-xs font-mono text-emerald-600 mb-6 flex items-center gap-2">
                <ScanLine size={12} /> INDEX: {plant.id.toUpperCase()}
            </div>

            <p className="text-stone-300 leading-relaxed text-sm mb-8 border-l-2 border-emerald-500/20 pl-4">
                {plant.extract}
            </p>

            <button className="w-full py-3 rounded bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 font-bold text-xs uppercase tracking-widest hover:bg-emerald-600/30 transition-colors flex items-center justify-center gap-2">
                <Sprout size={14} /> Add to Germination Queue
            </button>
        </div>
      </div>
    </div>
  );
}