"use client";
import React, { useState } from 'react';
import { LayoutGrid, Plus, X } from 'lucide-react';

const ROSTER = [
    { id: 1, name: 'Bulbasaur', color: 'emerald' },
    { id: 4, name: 'Charmander', color: 'rose' },
    { id: 7, name: 'Squirtle', color: 'sky' },
    { id: 25, name: 'Pikachu', color: 'amber' }
];

export default function PokemonGroupingLab() {
    const [activeMon, setActiveMon] = useState(ROSTER[0]);
    const [groups, setGroups] = useState(3);
    const [perGroup, setPerGroup] = useState(4);

    const total = groups * perGroup;

    // Generate the repeated addition string (e.g., "4 + 4 + 4")
    const repeatedAddition = Array(groups).fill(perGroup).join(' + ');

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl font-sans">
            
            {/* Header */}
            <div className="bg-emerald-950/30 border-b border-emerald-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                        <LayoutGrid size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Pokémon Daycare</h3>
                        <p className="text-[10px] text-emerald-300/60 font-mono uppercase tracking-widest">Array Builder</p>
                    </div>
                </div>
                
                {/* Roster Selector */}
                <div className="flex gap-2">
                    {ROSTER.map(mon => (
                        <button 
                            key={mon.id}
                            onClick={() => setActiveMon(mon)}
                            className={`w-8 h-8 rounded-full border-2 transition-all bg-zinc-900 ${activeMon.id === mon.id ? `border-${mon.color}-400 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)]` : 'border-transparent opacity-50 hover:opacity-100'}`}
                            style={{ backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.id}.png')`, backgroundSize: '150%', backgroundPosition: 'center' }}
                        />
                    ))}
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center">
                
                {/* Controls */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-black/40 p-6 rounded-2xl border border-white/5">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold tracking-widest uppercase">
                            <span className="text-emerald-400">Number of Pens (Groups)</span>
                            <span className="text-white bg-emerald-500/20 px-3 py-1 rounded-lg font-mono">{groups}</span>
                        </div>
                        <input 
                            type="range" min="1" max="6" step="1" 
                            value={groups} onChange={(e) => setGroups(Number(e.target.value))}
                            className="w-full accent-emerald-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold tracking-widest uppercase">
                            <span className="text-emerald-400">Pokémon Per Pen</span>
                            <span className="text-white bg-emerald-500/20 px-3 py-1 rounded-lg font-mono">{perGroup}</span>
                        </div>
                        <input 
                            type="range" min="1" max="6" step="1" 
                            value={perGroup} onChange={(e) => setPerGroup(Number(e.target.value))}
                            className="w-full accent-emerald-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                {/* Visual Array */}
                <div className="w-full min-h-[200px] flex flex-wrap justify-center gap-4 mb-8">
                    {Array.from({ length: groups }).map((_, groupIdx) => (
                        <div key={groupIdx} className={`bg-white/5 border border-${activeMon.color}-500/30 rounded-2xl p-3 flex flex-wrap justify-center content-center min-w-[100px] shadow-inner`}>
                            {Array.from({ length: perGroup }).map((_, itemIdx) => (
                                <div 
                                    key={itemIdx}
                                    className="w-12 h-12 bg-contain bg-no-repeat bg-center animate-in zoom-in"
                                    style={{ backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${activeMon.id}.png')` }}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Math Translation Panel */}
                <div className="w-full bg-black/60 p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-4 text-center">
                    <div className="text-zinc-400 font-medium">
                        You have <span className={`text-${activeMon.color}-400 font-bold`}>{groups} groups</span> of <span className={`text-${activeMon.color}-400 font-bold`}>{perGroup}</span>.
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 text-2xl font-black">
                        {/* Repeated Addition */}
                        <div className="flex items-center gap-2 text-zinc-500">
                            {repeatedAddition} <span className="text-white">= {total}</span>
                        </div>
                        
                        <div className="hidden md:block w-px h-8 bg-white/10" />
                        
                        {/* Multiplication */}
                        <div className="flex items-center gap-3 text-white">
                            <span className="text-emerald-400">{groups}</span> 
                            <X size={20} className="text-zinc-500" /> 
                            <span className="text-emerald-400">{perGroup}</span> 
                            <span className="text-zinc-500">=</span> 
                            <span className={`text-${activeMon.color}-400 text-3xl`}>{total}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}