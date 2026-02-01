"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, MousePointerClick, Eye, Layers } from 'lucide-react';

export default function StateLifecycleLab() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (phase === 'trigger') {
      setTimeout(() => setPhase('render'), 500);
    }
    if (phase === 'render') {
      setTimeout(() => setPhase('commit'), 500);
    }
    if (phase === 'commit') {
      setTimeout(() => setPhase('idle'), 500);
    }
  }, [phase]);

  const handleClick = () => {
    if (phase === 'idle') {
        setCount(c => c + 1);
        setPhase('trigger');
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <RefreshCw className="text-cyan-400" size={16} /> Render Cycle
        </h3>
        <div className="text-[10px] font-mono text-slate-500 uppercase">
            Phase: <span className="text-cyan-400">{phase}</span>
        </div>
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* INTERACTIVE COMPONENT */}
        <div className="relative">
            <button 
                onClick={handleClick}
                className="w-32 h-32 rounded-full border-4 border-cyan-500/30 flex items-center justify-center text-4xl font-black text-white hover:bg-cyan-500/10 transition-colors active:scale-95"
            >
                {count}
            </button>
            <div className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-slate-500 uppercase font-bold">
                View (Component)
            </div>
            
            {/* Click Visual */}
            {phase === 'trigger' && (
                <motion.div 
                    initial={{ scale: 1, opacity: 1 }} animate={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
                />
            )}
        </div>

        {/* CYCLE STEPS */}
        <div className="flex flex-col gap-2 w-full max-w-xs">
            <CycleStep active={phase === 'trigger'} icon={MousePointerClick} label="1. State Update" desc="setCount(c + 1)" />
            <CycleStep active={phase === 'render'} icon={Layers} label="2. Render" desc="React calculates diff" />
            <CycleStep active={phase === 'commit'} icon={Eye} label="3. Commit" desc="DOM updated" />
        </div>

      </div>
    </div>
  );
}

function CycleStep({ active, icon: Icon, label, desc }: any) {
    return (
        <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-4 ${active ? 'bg-cyan-500/20 border-cyan-500 text-cyan-50' : 'bg-slate-800 border-white/5 text-slate-500 opacity-50'}`}>
            <Icon size={20} />
            <div>
                <div className="text-xs font-bold uppercase">{label}</div>
                <div className="text-[10px] font-mono opacity-80">{desc}</div>
            </div>
        </div>
    )
}