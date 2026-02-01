"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, MousePointer2, Palette } from 'lucide-react';

export default function CssBoxModelLab() {
  const [padding, setPadding] = useState(24);
  const [radius, setRadius] = useState(12);
  const [shadow, setShadow] = useState(20);
  const [gap, setGap] = useState(10);

  // Generate CSS string for display
  const cssCode = `
.card {
  padding: ${padding}px;
  border-radius: ${radius}px;
  box-shadow: 0 10px ${shadow}px rgba(0,0,0,0.5);
  gap: ${gap}px;
}`;

  return (
    <div className="w-full bg-slate-900/90 border border-sky-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT: CONTROLS (The Editor) */}
      <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-white/5 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon icon={Palette} color="text-pink-400" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Style Editor</h3>
        </div>

        <Control label="Padding (Space Inside)" value={padding} max={60} onChange={setPadding} color="accent-sky-400" />
        <Control label="Border Radius (Roundness)" value={radius} max={50} onChange={setRadius} color="accent-pink-400" />
        <Control label="Box Shadow (Depth)" value={shadow} max={100} onChange={setShadow} color="accent-violet-400" />
        <Control label="Gap (Layout)" value={gap} max={40} onChange={setGap} color="accent-yellow-400" />

        {/* Code Snippet Display */}
        <div className="mt-6 p-4 bg-black/50 rounded-lg border border-white/5 font-mono text-[10px] text-slate-400 relative group">
           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Code size={12} />
           </div>
           <pre>{cssCode}</pre>
        </div>
      </div>

      {/* RIGHT: PREVIEW (The Browser) */}
      <div className="w-full md:w-1/2 p-8 bg-[url('/grid-pattern.svg')] bg-slate-950 flex items-center justify-center relative">
        <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-500 uppercase flex items-center gap-1">
            <MousePointer2 size={10} /> Live Preview
        </div>

        {/* The Component Being Styled */}
        <motion.div 
            layout
            className="bg-slate-800 border border-white/10 flex flex-col items-start w-full max-w-[200px]"
            style={{ 
                padding: `${padding}px`,
                borderRadius: `${radius}px`,
                boxShadow: `0 10px ${shadow}px rgba(0,0,0,0.5)`,
                gap: `${gap}px`
            }}
        >
            <div className="w-8 h-8 rounded-full bg-sky-500" />
            <div className="space-y-2 w-full">
                <div className="h-2 w-3/4 bg-slate-600 rounded" />
                <div className="h-2 w-1/2 bg-slate-700 rounded" />
            </div>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded text-[10px] text-white transition-colors border border-white/5">
                Interact
            </button>
        </motion.div>
      </div>
    </div>
  );
}

function Control({ label, value, max, onChange, color }: any) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                <span>{label}</span>
                <span>{value}px</span>
            </div>
            <input 
                type="range" min="0" max={max} value={value} 
                onChange={(e) => onChange(parseInt(e.target.value))}
                className={`w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer ${color}`}
            />
        </div>
    )
}

function SettingsIcon({ icon: Icon, color }: any) {
    return (
        <div className={`p-1.5 rounded bg-white/5 border border-white/5 ${color}`}>
            <Icon size={14} />
        </div>
    )
}