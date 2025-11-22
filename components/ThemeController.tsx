"use client";
import { useState, useEffect } from "react";
import { Sliders, Zap } from "lucide-react";

const PRESETS = [
  { name: "Neon Cyber", primary: "#06b6d4", secondary: "#d946ef", bg: "#000000" },
  { name: "Matrix", primary: "#22c55e", secondary: "#166534", bg: "#022c22" },
  { name: "Vaporwave", primary: "#f472b6", secondary: "#60a5fa", bg: "#2e1065" },
  { name: "Monochrome", primary: "#ffffff", secondary: "#525252", bg: "#171717" },
];

export default function ThemeController() {
  const [primary, setPrimary] = useState("#ffffff");
  const [secondary, setSecondary] = useState("#ffffff");
  
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-icon-hover", primary);
    root.style.setProperty("--theme-text-title", primary);
    root.style.setProperty("--theme-text-header", secondary);
    root.style.setProperty("--theme-gradient-start", primary);
    root.style.setProperty("--theme-gradient-end", secondary);
  }, [primary, secondary]);

  const applyPreset = (p: typeof PRESETS[0]) => {
    setPrimary(p.primary);
    setSecondary(p.secondary);
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Sliders size={14} className="text-cyan-400" /> Style Injector
        </h3>
        <Zap size={14} className="text-yellow-400 animate-pulse" />
      </div>

      <div className="space-y-4 mb-8">
        <div>
            <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-2">Primary Token</label>
            <div className="flex gap-3 items-center">
                <input 
                    type="color" 
                    value={primary} 
                    onChange={(e) => setPrimary(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer bg-transparent border border-white/20"
                />
                <span className="font-mono text-xs text-neutral-300">{primary}</span>
            </div>
        </div>
        <div>
            <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-2">Secondary Token</label>
            <div className="flex gap-3 items-center">
                <input 
                    type="color" 
                    value={secondary} 
                    onChange={(e) => setSecondary(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer bg-transparent border border-white/20"
                />
                <span className="font-mono text-xs text-neutral-300">{secondary}</span>
            </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-3">Quick Load</label>
        <div className="grid grid-cols-2 gap-2">
            {PRESETS.map(p => (
                <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    className="px-3 py-2 rounded border border-white/10 bg-white/5 text-xs font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-colors text-left flex items-center gap-2"
                >
                    <div className="w-2 h-2 rounded-full" style={{ background: p.primary }} />
                    {p.name}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}