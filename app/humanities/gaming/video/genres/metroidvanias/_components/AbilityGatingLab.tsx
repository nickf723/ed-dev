"use client";
import React, { useState } from 'react';
import { Map, Lock, Unlock, Zap } from 'lucide-react';

type Ability = 'doubleJump' | 'morphSphere' | 'dash';

export default function AbilityGatingLab() {
    const [abilities, setAbilities] = useState<Record<Ability, boolean>>({
        doubleJump: false,
        morphSphere: false,
        dash: false
    });

    const toggleAbility = (ability: Ability) => {
        setAbilities(prev => ({ ...prev, [ability]: !prev[ability] }));
    };

    // ------------------------------------------------------------------------
    // TAILWIND BEST PRACTICE:
    // Define exact, complete class strings so the compiler can find them!
    // Using native Tailwind shadow colors (e.g., shadow-emerald-500/40) is much safer.
    // ------------------------------------------------------------------------
    const nodes = [
        { 
            id: 1, name: 'Landing Site', requires: [], x: 50, y: 15, 
            theme: { 
                box: 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px] shadow-emerald-500/40', 
                textBorder: 'border-emerald-500/50 text-white', 
                line: 'stroke-emerald-500/50 stroke-[3px]' 
            } 
        },
        { 
            id: 2, name: 'High Balcony', requires: ['doubleJump'], x: 50, y: 40, 
            theme: { 
                box: 'bg-sky-500/20 border-sky-500 text-sky-400 shadow-[0_0_20px] shadow-sky-500/40', 
                textBorder: 'border-sky-500/50 text-white', 
                line: 'stroke-sky-500/50 stroke-[3px]' 
            } 
        },
        { 
            id: 3, name: 'Narrow Vents', requires: ['doubleJump', 'morphSphere'], x: 20, y: 65, 
            theme: { 
                box: 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_20px] shadow-amber-500/40', 
                textBorder: 'border-amber-500/50 text-white', 
                line: 'stroke-amber-500/50 stroke-[3px]' 
            } 
        },
        { 
            id: 4, name: 'Chasm of Winds', requires: ['doubleJump', 'dash'], x: 80, y: 65, 
            theme: { 
                box: 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_20px] shadow-purple-500/40', 
                textBorder: 'border-purple-500/50 text-white', 
                line: 'stroke-purple-500/50 stroke-[3px]' 
            } 
        },
        { 
            id: 5, name: 'The Core', requires: ['doubleJump', 'morphSphere', 'dash'], x: 50, y: 85, 
            theme: { 
                box: 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_20px] shadow-rose-500/40', 
                textBorder: 'border-rose-500/50 text-white', 
                line: 'stroke-rose-500/50 stroke-[3px]' 
            } 
        },
    ];

    const edges = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 5 },
        { from: 4, to: 5 }
    ];

    const isNodeAccessible = (reqs: string[]) => reqs.every(req => abilities[req as Ability]);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-zinc-900 border-b border-zinc-800 p-5 flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                    <Map size={18} className="text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold tracking-wide">Utility-Gating Simulator</h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Interactive Network Map</p>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                
                {/* LEFT: Inventory */}
                <div className="w-full md:w-1/3 space-y-4">
                    <h4 className="text-xs font-black uppercase text-zinc-500 tracking-widest mb-4">Acquired Upgrades</h4>
                    
                    <button onClick={() => toggleAbility('doubleJump')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${abilities.doubleJump ? 'bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>
                        <span className="font-bold text-sm">Gravity Boots</span><Zap size={16} className={abilities.doubleJump ? 'opacity-100' : 'opacity-0'} />
                    </button>
                    <button onClick={() => toggleAbility('morphSphere')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${abilities.morphSphere ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>
                        <span className="font-bold text-sm">Morph Sphere</span><Zap size={16} className={abilities.morphSphere ? 'opacity-100' : 'opacity-0'} />
                    </button>
                    <button onClick={() => toggleAbility('dash')} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${abilities.dash ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>
                        <span className="font-bold text-sm">Phase Dash</span><Zap size={16} className={abilities.dash ? 'opacity-100' : 'opacity-0'} />
                    </button>
                </div>

                {/* RIGHT: The Visual SVG Map */}
                <div className="w-full md:w-2/3 bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative min-h-[400px]">
                    
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {edges.map((edge, i) => {
                            const n1 = nodes.find(n => n.id === edge.from)!;
                            const n2 = nodes.find(n => n.id === edge.to)!;
                            const isActive = isNodeAccessible(n1.requires) && isNodeAccessible(n2.requires);
                            
                            return (
                                <line 
                                    key={i} x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`}
                                    className={`transition-all duration-700 ${isActive ? n2.theme.line : 'stroke-zinc-800 stroke-[2px] stroke-dasharray-4'}`}
                                />
                            );
                        })}
                    </svg>

                    {nodes.map((node) => {
                        const isAccessible = isNodeAccessible(node.requires);
                        return (
                            <div 
                                key={node.id} 
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-500"
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${isAccessible ? node.theme.box : 'bg-zinc-950 border-zinc-800 text-zinc-600'}`}>
                                    {isAccessible ? <Unlock size={16} /> : <Lock size={16} />}
                                </div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap px-2 py-1 rounded bg-zinc-950/80 border ${isAccessible ? node.theme.textBorder : 'border-zinc-800 text-zinc-600'}`}>
                                    {node.name}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}