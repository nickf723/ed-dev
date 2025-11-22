"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Bone, Brain, Heart, Layers } from "lucide-react";

const LAYERS = [
  { id: "skeletal", label: "Skeletal", icon: Bone, color: "text-neutral-200", desc: "Framework & Protection" },
  { id: "circulatory", label: "Circulatory", icon: Heart, color: "text-red-400", desc: "Transport & Exchange" },
  { id: "nervous", label: "Nervous", icon: Brain, color: "text-cyan-400", desc: "Control & Communication" },
];

export default function AnatomyWidget() {
  const [activeLayer, setActiveLayer] = useState("skeletal");

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Activity size={14} className="text-teal-400" /> Anatomy Scan
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Visualization Area */}
        <div className="relative w-32 h-64 bg-neutral-950 rounded-2xl border border-white/10 mb-6 overflow-hidden flex items-center justify-center">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Layer Representations (Abstract) */}
            <motion.div 
                key={activeLayer}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="z-10"
            >
                {activeLayer === 'skeletal' && (
                    <div className="flex flex-col items-center gap-1 opacity-80">
                        <div className="w-8 h-8 rounded-full border-2 border-neutral-400" /> {/* Skull */}
                        <div className="w-1 h-4 bg-neutral-400" /> {/* Spine */}
                        <div className="w-16 h-0.5 bg-neutral-400" /> {/* Shoulders */}
                        <div className="w-1 h-12 bg-neutral-400" /> {/* Spine */}
                        <div className="flex gap-4">
                            <div className="w-1 h-16 bg-neutral-400 -rotate-6" /> {/* Leg */}
                            <div className="w-1 h-16 bg-neutral-400 rotate-6" /> {/* Leg */}
                        </div>
                    </div>
                )}
                {activeLayer === 'circulatory' && (
                    <div className="flex flex-col items-center gap-0 opacity-80 text-red-500">
                        <Heart size={32} fill="currentColor" className="animate-pulse" />
                        <div className="w-full h-32 border-l-2 border-r-2 border-red-500/50 w-16 rounded-b-full mt-[-10px]" />
                    </div>
                )}
                {activeLayer === 'nervous' && (
                    <div className="flex flex-col items-center gap-1 opacity-80 text-cyan-400">
                        <Brain size={32} />
                        <div className="w-0.5 h-40 bg-cyan-400/50 shadow-[0_0_10px_cyan]" />
                        <div className="absolute top-12 w-24 h-0.5 bg-cyan-400/30" />
                    </div>
                )}
            </motion.div>

            {/* Scan Line */}
            <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-teal-400/50 shadow-[0_0_15px_#2dd4bf] z-20"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Controls */}
        <div className="w-full space-y-2">
            {LAYERS.map((layer) => (
                <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-all
                        ${activeLayer === layer.id
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/5"}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <layer.icon size={14} className={layer.color.replace("text-", "text-")} />
                        <span className="font-bold">{layer.label}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeLayer === layer.id ? "bg-teal-400" : "bg-neutral-800"}`} />
                </button>
            ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 w-full">
             <p className="text-[10px] text-neutral-500 text-center">
                {LAYERS.find(l => l.id === activeLayer)?.desc}
             </p>
        </div>
        
      </div>
    </div>
  );
}