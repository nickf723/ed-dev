"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Move } from "lucide-react";

const IDEOLOGIES = [
  { id: "auth-left", label: "Authoritarian Left", desc: "State-planned economy.", x: 25, y: 25, color: "bg-red-500" },
  { id: "auth-right", label: "Authoritarian Right", desc: "Traditional values, strong state.", x: 75, y: 25, color: "bg-blue-500" },
  { id: "lib-left", label: "Libertarian Left", desc: "Social equality, personal freedom.", x: 25, y: 75, color: "bg-green-500" },
  { id: "lib-right", label: "Libertarian Right", desc: "Free markets, minimal state.", x: 75, y: 75, color: "bg-yellow-500" },
  { id: "center", label: "Centrism", desc: "Balance and compromise.", x: 50, y: 50, color: "bg-neutral-400" },
];

export default function PoliticalCompassWidget() {
  const [active, setActive] = useState(IDEOLOGIES[4]); // Default to center

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Move size={14} className="text-violet-400" /> Ideology Spectrum
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* The Grid */}
        <div className="relative w-48 h-48 bg-neutral-900/50 rounded-lg border border-white/10 mb-6 grid grid-cols-2 grid-rows-2 overflow-hidden">
            {/* Axis Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-white/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-px bg-white/20" />
            </div>

            {/* Quadrant Backgrounds (Subtle) */}
            <div className="bg-red-900/10 hover:bg-red-900/20 transition-colors" />
            <div className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors" />
            <div className="bg-green-900/10 hover:bg-green-900/20 transition-colors" />
            <div className="bg-yellow-900/10 hover:bg-yellow-900/20 transition-colors" />

            {/* Points */}
            {IDEOLOGIES.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActive(item)}
                    className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border border-white/50 shadow-lg transition-all duration-300
                        ${item.color} ${active.id === item.id ? "scale-150 ring-2 ring-white" : "opacity-70 hover:scale-125"}
                    `}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                />
            ))}
        </div>

        {/* Labels (Axis) */}
        <div className="w-full flex justify-between text-[8px] font-bold uppercase text-neutral-600 mb-4 px-2">
            <span>Economic Left</span>
            <span>Economic Right</span>
        </div>

        {/* Info Panel */}
        <div className="w-full text-center min-h-[60px]">
            <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className={`text-sm font-bold mb-1 ${active.color.replace("bg-", "text-").replace("-500", "-400")}`}>
                    {active.label}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                    {active.desc}
                </p>
            </motion.div>
        </div>

      </div>
    </div>
  );
}