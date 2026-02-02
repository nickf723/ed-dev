"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Users } from 'lucide-react';

export default function FormationLab() {
  const [offense, setOffense] = useState('I-Form');
  const [defense, setDefense] = useState('4-3 Base');

  // Relative positions (0,0 is ball)
  const formations: any = {
    'I-Form': {
        off: [
            { id: 'QB', x: 0, y: 1, label: 'QB' },
            { id: 'FB', x: 0, y: 3, label: 'FB' },
            { id: 'RB', x: 0, y: 5, label: 'RB' },
            { id: 'LT', x: -4, y: 0, label: 'OL' }, { id: 'LG', x: -2, y: 0, label: 'OL' }, { id: 'C', x: 0, y: 0, label: 'C' }, { id: 'RG', x: 2, y: 0, label: 'OL' }, { id: 'RT', x: 4, y: 0, label: 'OL' },
            { id: 'TE', x: 6, y: 0, label: 'TE' },
            { id: 'WR1', x: -12, y: 0, label: 'WR' }, { id: 'WR2', x: 12, y: 1, label: 'WR' }
        ],
        desc: "Power Running. The FB acts as a lead blocker for the RB."
    },
    'Shotgun': {
        off: [
            { id: 'QB', x: 0, y: 4, label: 'QB' },
            { id: 'RB', x: 2, y: 4, label: 'RB' },
            { id: 'LT', x: -4, y: 0, label: 'OL' }, { id: 'LG', x: -2, y: 0, label: 'OL' }, { id: 'C', x: 0, y: 0, label: 'C' }, { id: 'RG', x: 2, y: 0, label: 'OL' }, { id: 'RT', x: 4, y: 0, label: 'OL' },
            { id: 'WR1', x: -12, y: 0, label: 'WR' }, { id: 'WR2', x: 12, y: 0, label: 'WR' },
            { id: 'WR3', x: -8, y: 1, label: 'Slot' }, { id: 'TE', x: 6, y: 0, label: 'TE' }
        ],
        desc: "Passing. QB has better vision and time to throw."
    }
  };

  const defenses: any = {
    '4-3 Base': {
        def: [
            { id: 'DE1', x: -5, y: -2, label: 'DL' }, { id: 'DT1', x: -1, y: -2, label: 'DL' }, { id: 'DT2', x: 1, y: -2, label: 'DL' }, { id: 'DE2', x: 5, y: -2, label: 'DL' },
            { id: 'WLB', x: -3, y: -5, label: 'LB' }, { id: 'MLB', x: 0, y: -5, label: 'LB' }, { id: 'SLB', x: 3, y: -5, label: 'LB' },
            { id: 'CB1', x: -12, y: -10, label: 'CB' }, { id: 'CB2', x: 12, y: -10, label: 'CB' },
            { id: 'FS', x: -4, y: -15, label: 'S' }, { id: 'SS', x: 4, y: -12, label: 'S' }
        ],
        desc: "Balanced. 4 Linemen to stop run, 3 Linebackers for flex."
    },
    'Nickel': {
        def: [
            { id: 'DE1', x: -5, y: -2, label: 'DL' }, { id: 'DT1', x: -1, y: -2, label: 'DL' }, { id: 'DT2', x: 1, y: -2, label: 'DL' }, { id: 'DE2', x: 5, y: -2, label: 'DL' },
            { id: 'WLB', x: -2, y: -5, label: 'LB' }, { id: 'MLB', x: 2, y: -5, label: 'LB' },
            { id: 'CB1', x: -12, y: -10, label: 'CB' }, { id: 'CB2', x: 12, y: -10, label: 'CB' }, { id: 'NCB', x: -6, y: -6, label: 'Ni' },
            { id: 'FS', x: -4, y: -15, label: 'S' }, { id: 'SS', x: 4, y: -15, label: 'S' }
        ],
        desc: "Pass Defense. Swaps a LB for a 5th DB (Nickel) to cover Slot WR."
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Users className="text-emerald-400" size={16} /> Tactical Board
        </h3>
        <div className="flex gap-2">
            <div className="px-2 py-1 bg-orange-500/20 border border-orange-500/50 rounded text-[10px] text-orange-200">Offense</div>
            <div className="px-2 py-1 bg-sky-500/20 border border-sky-500/50 rounded text-[10px] text-sky-200">Defense</div>
        </div>
      </div>

      <div className="p-6">
        
        {/* CONTROLS */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className="space-y-2 text-center">
                <div className="text-[10px] uppercase font-bold text-orange-400">Offense Set</div>
                <div className="flex bg-slate-800 rounded p-1">
                    {Object.keys(formations).map(f => (
                        <button key={f} onClick={() => setOffense(f)} className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${offense === f ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>{f}</button>
                    ))}
                </div>
            </div>
            <div className="space-y-2 text-center">
                <div className="text-[10px] uppercase font-bold text-sky-400">Defense Set</div>
                <div className="flex bg-slate-800 rounded p-1">
                    {Object.keys(defenses).map(f => (
                        <button key={f} onClick={() => setDefense(f)} className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${defense === f ? 'bg-sky-500 text-white' : 'text-slate-400'}`}>{f}</button>
                    ))}
                </div>
            </div>
        </div>

        {/* FIELD VISUALIZER */}
        <div className="relative h-64 w-full bg-[#0c4a34] rounded-xl border-2 border-white/10 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Yard Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-20 pointer-events-none">
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
            </div>
            {/* Scrimmage Line */}
            <div className="absolute w-full h-0.5 bg-blue-500/50 z-0 top-1/2" />

            {/* OFFENSE DOTS (Orange) */}
            {formations[offense].off.map((p: any) => (
                <motion.div 
                    key={p.id}
                    layoutId={`off-${p.id}`}
                    className="absolute w-6 h-6 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white z-10 shadow-lg"
                    initial={false}
                    animate={{ x: p.x * 12, y: p.y * 12 + 10 }} // Scale positions
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    {p.label}
                </motion.div>
            ))}

            {/* DEFENSE DOTS (Blue) */}
            {defenses[defense].def.map((p: any) => (
                <motion.div 
                    key={p.id}
                    layoutId={`def-${p.id}`}
                    className="absolute w-6 h-6 rounded-full bg-sky-600 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white z-10 shadow-lg"
                    initial={false}
                    animate={{ x: p.x * 12, y: p.y * 12 - 10 }} // Scale positions
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    {p.label}
                </motion.div>
            ))}
        </div>

        {/* INFO */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-orange-900/20 border border-orange-500/20 rounded-lg">
                <div className="font-bold text-orange-400 mb-1">{offense}</div>
                <div className="text-slate-400 leading-snug">{formations[offense].desc}</div>
            </div>
            <div className="p-3 bg-sky-900/20 border border-sky-500/20 rounded-lg">
                <div className="font-bold text-sky-400 mb-1">{defense}</div>
                <div className="text-slate-400 leading-snug">{defenses[defense].desc}</div>
            </div>
        </div>

      </div>
    </div>
  );
}