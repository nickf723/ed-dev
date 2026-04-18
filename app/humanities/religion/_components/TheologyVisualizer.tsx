"use client";
import React, { useState } from 'react';
import { Eye, Network, Sun, Infinity, Flame } from 'lucide-react';

type Paradigm = 'monotheism' | 'polytheism' | 'pantheism' | 'cyclic';

export default function TheologyVisualizer() {
    const [paradigm, setParadigm] = useState<Paradigm>('monotheism');

    return (
        <div className="w-full bg-[#1c120c]/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans select-none">
            <div className="bg-amber-950/30 border-b border-amber-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded-lg">
                        <Eye size={18} className="text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Theological Architecture</h3>
                        <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-widest">Structural Paradigms</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row min-h-[400px]">
                
                {/* LEFT: Controls & Theory */}
                <div className="w-full md:w-1/3 bg-black/40 border-b md:border-b-0 md:border-r border-amber-500/10 p-6 flex flex-col gap-3 justify-center">
                    <button 
                        onClick={() => setParadigm('monotheism')}
                        className={`p-4 rounded-xl text-left transition-all border ${paradigm === 'monotheism' ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'bg-black/50 border-white/5 hover:border-amber-500/30'}`}
                    >
                        <div className="text-amber-400 font-bold text-sm mb-1 flex items-center gap-2"><Sun size={14}/> Monotheism</div>
                        <div className="text-[10px] text-zinc-400">A single, absolute, transcendent creator distinct from creation.</div>
                    </button>

                    <button 
                        onClick={() => setParadigm('polytheism')}
                        className={`p-4 rounded-xl text-left transition-all border ${paradigm === 'polytheism' ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-black/50 border-white/5 hover:border-purple-500/30'}`}
                    >
                        <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2"><Network size={14}/> Polytheism</div>
                        <div className="text-[10px] text-zinc-400">A pantheon of specialized deities governing different aspects of nature.</div>
                    </button>

                    <button 
                        onClick={() => setParadigm('pantheism')}
                        className={`p-4 rounded-xl text-left transition-all border ${paradigm === 'pantheism' ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-black/50 border-white/5 hover:border-emerald-500/30'}`}
                    >
                        <div className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-2"><Flame size={14}/> Pantheism</div>
                        <div className="text-[10px] text-zinc-400">The universe and the divine are identical. God is the cosmos itself.</div>
                    </button>

                    <button 
                        onClick={() => setParadigm('cyclic')}
                        className={`p-4 rounded-xl text-left transition-all border ${paradigm === 'cyclic' ? 'bg-rose-500/10 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'bg-black/50 border-white/5 hover:border-rose-500/30'}`}
                    >
                        <div className="text-rose-400 font-bold text-sm mb-1 flex items-center gap-2"><Infinity size={14}/> Dharmic / Cyclic</div>
                        <div className="text-[10px] text-zinc-400">Non-theistic focus on cosmic law, karma, and cyclical rebirth.</div>
                    </button>
                </div>

                {/* RIGHT: Visual Render */}
                <div className="w-full md:w-2/3 bg-[#0a0503] relative overflow-hidden flex items-center justify-center p-8">
                    <div className="relative w-full max-w-[300px] aspect-square">
                        
                        {/* MONOTHEISM: One big orb at top, lines down to humanity */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${paradigm === 'monotheism' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-400 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.6)] animate-pulse" />
                            <svg className="w-full h-full absolute inset-0 text-amber-500/30" stroke="currentColor" strokeWidth="2">
                                {[10, 30, 50, 70, 90].map((x, i) => (
                                    <line key={i} x1="50%" y1="20%" x2={`${x}%`} y2="90%" />
                                ))}
                            </svg>
                            {[10, 30, 50, 70, 90].map((x, i) => (
                                <div key={i} className="absolute bottom-4 w-3 h-3 bg-zinc-400 rounded-full" style={{ left: `calc(${x}% - 6px)` }} />
                            ))}
                        </div>

                        {/* POLYTHEISM: Constellation of orbs, humanity connects to various ones */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${paradigm === 'polytheism' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            {[
                                { x: 20, y: 15 }, { x: 80, y: 20 }, { x: 50, y: 35 }, { x: 15, y: 45 }, { x: 85, y: 50 }
                            ].map((pos, i) => (
                                <div key={i} className="absolute w-8 h-8 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }} />
                            ))}
                            <svg className="w-full h-full absolute inset-0 text-purple-500/30" stroke="currentColor" strokeWidth="1.5">
                                {/* Messy, interwoven connection network */}
                                <line x1="20%" y1="15%" x2="50%" y2="35%" />
                                <line x1="80%" y1="20%" x2="50%" y2="35%" />
                                <line x1="50%" y1="35%" x2="30%" y2="90%" />
                                <line x1="15%" y1="45%" x2="10%" y2="90%" />
                                <line x1="85%" y1="50%" x2="70%" y2="90%" />
                                <line x1="85%" y1="50%" x2="90%" y2="90%" />
                                <line x1="20%" y1="15%" x2="10%" y2="90%" />
                            </svg>
                            {[10, 30, 50, 70, 90].map((x, i) => (
                                <div key={i} className="absolute bottom-4 w-3 h-3 bg-zinc-400 rounded-full" style={{ left: `calc(${x}% - 6px)` }} />
                            ))}
                        </div>

                        {/* PANTHEISM: The container itself is the divine */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${paradigm === 'pantheism' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="absolute inset-4 rounded-full border-[10px] border-emerald-500/30 shadow-[inset_0_0_50px_rgba(16,185,129,0.3),_0_0_50px_rgba(16,185,129,0.3)] animate-[spin_20s_linear_infinite]">
                                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.2] mix-blend-overlay rounded-full" />
                            </div>
                            {/* Dots are inside and part of the structure */}
                            {[20, 35, 50, 65, 80].map((y, i) => (
                                <div key={i} className="absolute w-3 h-3 bg-emerald-300 rounded-full shadow-[0_0_10px_rgba(110,231,183,0.8)]" style={{ left: `50%`, top: `${y}%`, transform: 'translateX(-50%)' }} />
                            ))}
                        </div>

                        {/* CYCLIC: Dharma wheel / Samsara loop */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${paradigm === 'cyclic' ? 'opacity-100' : 'opacity-0 pointer-events-none'} flex items-center justify-center`}>
                            <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-rose-500/40 animate-[spin_10s_linear_infinite]" stroke="currentColor" strokeWidth="2" fill="none">
                                <circle cx="50" cy="50" r="45" />
                                <circle cx="50" cy="50" r="10" />
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <line key={i} x1="50" y1="50" x2="50" y2="5" transform={`rotate(${i * 45} 50 50)`} />
                                ))}
                            </svg>
                            {/* Single human node traversing the wheel */}
                            <div className="absolute w-4 h-4 bg-rose-300 rounded-full shadow-[0_0_15px_rgba(251,113,133,0.8)] animate-[spin_10s_linear_infinite]" style={{ transformOrigin: '120px center', left: 'calc(50% - 120px)' }} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}