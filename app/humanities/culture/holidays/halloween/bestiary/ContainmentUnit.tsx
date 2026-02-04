"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Dna, Skull, Zap, Activity } from 'lucide-react';
import { MONSTER_DB, type MonsterData } from './monsterDb';

export default function ContainmentUnit() {
  const [selected, setSelected] = useState<MonsterData>(MONSTER_DB[0]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (m: MonsterData) => {
    if (m.id === selected.id) return;
    setLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
        setSelected(m);
        setLoading(false);
    }, 600);
  };

  return (
    <div className="w-full h-[600px] bg-black border border-stone-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      
      {/* LEFT: THE ROSTER */}
      <div className="w-full md:w-80 bg-stone-950 border-r border-stone-800 flex flex-col">
          <div className="p-4 border-b border-stone-800 bg-[#0a0a0a]">
              <div className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert size={14} className="animate-pulse" /> Inmate Roster
              </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
              {MONSTER_DB.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(m)}
                    className={`w-full text-left p-4 border-b border-stone-900 hover:bg-white/5 transition-all group ${selected.id === m.id ? 'bg-red-900/10 border-l-4 border-l-red-600' : 'border-l-4 border-l-transparent'}`}
                  >
                      <div className="text-[10px] text-stone-500 font-mono uppercase mb-1">{m.codename}</div>
                      <div className={`font-bold uppercase ${selected.id === m.id ? 'text-white' : 'text-stone-400 group-hover:text-white'}`}>
                          {m.name}
                      </div>
                  </button>
              ))}
          </div>
      </div>

      {/* RIGHT: THE CELL */}
      <div className="flex-1 relative bg-black p-8 flex flex-col">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
          
          <AnimatePresence mode="wait">
             {loading ? (
                 <div key="loader" className="flex-1 flex flex-col items-center justify-center text-red-600 space-y-4">
                     <Dna size={48} className="animate-spin" />
                     <div className="font-mono text-xs uppercase animate-pulse">Decrypting File...</div>
                 </div>
             ) : (
                 <motion.div 
                    key={selected.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="flex-1 flex flex-col h-full relative z-10"
                 >
                     {/* Header */}
                     <div className="flex justify-between items-start mb-6">
                         <div>
                             <div className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{selected.name}</div>
                             <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-900/20 border border-red-900/50 rounded text-[10px] font-bold text-red-400 uppercase">
                                 Class: {selected.class}
                             </div>
                         </div>
                         <div className="text-right">
                             <div className="text-[10px] text-stone-500 uppercase font-bold">Threat Level</div>
                             <div className="text-xl font-black text-red-600 uppercase">{selected.threatLevel}</div>
                         </div>
                     </div>

                     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                         
                         {/* The Image (The Specimen) */}
                         <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-900/50 group">
                             <div 
                                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${selected.image})` }}
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 flex justify-between items-center bg-black/60 backdrop-blur-sm">
                                <span className="text-[10px] font-mono text-stone-400">FIG A: VISUAL ID</span>
                                <Activity size={14} className="text-red-500" />
                             </div>
                         </div>

                         {/* The Stats */}
                         <div className="space-y-6">
                             <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                 <h4 className="text-xs font-bold text-stone-400 uppercase mb-3 flex items-center gap-2">
                                     <Zap size={12} /> Biological Metrics
                                 </h4>
                                 <StatBar label="Strength" val={selected.stats.strength} color="bg-red-600" />
                                 <StatBar label="Intelligence" val={selected.stats.intelligence} color="bg-blue-600" />
                                 <StatBar label="Speed" val={selected.stats.speed} color="bg-amber-600" />
                             </div>

                             <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                 <h4 className="text-xs font-bold text-stone-400 uppercase mb-2 flex items-center gap-2">
                                     <Skull size={12} /> Analysis
                                 </h4>
                                 <p className="text-xs text-stone-300 leading-relaxed mb-4">
                                     {selected.desc}
                                 </p>
                                 <div className="text-[10px] uppercase font-bold text-red-400">
                                     Weakness: {selected.weakness}
                                 </div>
                             </div>
                         </div>

                     </div>
                 </motion.div>
             )}
          </AnimatePresence>
      </div>
    </div>
  );
}

function StatBar({ label, val, color }: any) {
    return (
        <div className="mb-3 last:mb-0">
            <div className="flex justify-between text-[10px] uppercase font-bold text-stone-500 mb-1">
                <span>{label}</span>
                <span>{val}/100</span>
            </div>
            <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${val}%` }} 
                    className={`h-full ${color}`} 
                />
            </div>
        </div>
    )
}