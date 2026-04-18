"use client";
import React, { useState } from 'react';
import { Skull, Heart, RefreshCw, Plus, Minus, UserCircle } from 'lucide-react';

type Player = {
    id: number;
    name: string;
    life: number;
    poison: number;
    color: string;
};

const MANA_COLORS = {
    white: 'text-amber-100 border-amber-100/30 bg-amber-100/5',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    black: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
    red: 'text-red-500 border-red-500/30 bg-red-500/5',
    green: 'text-green-400 border-green-500/30 bg-green-500/5',
    colorless: 'text-zinc-300 border-zinc-500/30 bg-zinc-500/5'
};

export default function CommanderScoreboard() {
    const [players, setPlayers] = useState<Player[]>([
        { id: 1, name: 'Nick', life: 40, poison: 0, color: 'blue' },
        { id: 2, name: 'Kenney', life: 40, poison: 0, color: 'red' },
        { id: 3, name: 'Nate', life: 40, poison: 0, color: 'green' },
        { id: 4, name: 'Player 4', life: 40, poison: 0, color: 'black' }
    ]);

    const updateStat = (id: number, stat: 'life' | 'poison', amount: number) => {
        setPlayers(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, [stat]: p[stat] + amount };
            }
            return p;
        }));
    };

    const resetGame = () => {
        setPlayers(prev => prev.map(p => ({ ...p, life: 40, poison: 0 })));
    };

    return (
        <div className="w-full bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl font-sans">
            
            {/* Header Toolbar */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40">
                <div className="flex items-center gap-3">
                    <Heart size={18} className="text-zinc-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Commander Tracker</span>
                </div>
                <button 
                    onClick={resetGame}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            {/* 4-Player Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
                {players.map((player) => {
                    const theme = MANA_COLORS[player.color as keyof typeof MANA_COLORS];
                    const [textColor, borderColor, bgColor] = theme.split(' ');

                    return (
                        <div key={player.id} className={`relative flex flex-col p-6 rounded-2xl border ${borderColor} ${bgColor} backdrop-blur-md transition-colors`}>
                            
                            {/* Player Name */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <UserCircle size={16} className={textColor} />
                                    <input 
                                        type="text" 
                                        value={player.name}
                                        onChange={(e) => setPlayers(prev => prev.map(p => p.id === player.id ? { ...p, name: e.target.value } : p))}
                                        className={`bg-transparent border-none outline-none font-bold uppercase tracking-widest text-xs ${textColor} w-24`}
                                    />
                                </div>
                                <select 
                                    value={player.color}
                                    onChange={(e) => setPlayers(prev => prev.map(p => p.id === player.id ? { ...p, color: e.target.value } : p))}
                                    className="bg-black/50 text-[10px] text-zinc-400 border border-white/10 rounded px-2 py-1 outline-none uppercase"
                                >
                                    <option value="white">White</option>
                                    <option value="blue">Blue</option>
                                    <option value="black">Black</option>
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="colorless">Colorless</option>
                                </select>
                            </div>

                            {/* Life Total Area */}
                            <div className="flex items-center justify-between mb-8">
                                <button 
                                    onClick={() => updateStat(player.id, 'life', -1)}
                                    className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-black/40 hover:bg-black/60 border border-white/5 ${textColor} transition-transform active:scale-95`}
                                >
                                    <Minus size={24} />
                                </button>
                                
                                <div className={`text-6xl md:text-8xl font-black tabular-nums tracking-tighter ${textColor}`}>
                                    {player.life}
                                </div>

                                <button 
                                    onClick={() => updateStat(player.id, 'life', 1)}
                                    className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-black/40 hover:bg-black/60 border border-white/5 ${textColor} transition-transform active:scale-95`}
                                >
                                    <Plus size={24} />
                                </button>
                            </div>

                            {/* Secondary Counters (Poison) */}
                            <div className="flex justify-center mt-auto">
                                <div className="flex items-center bg-black/50 border border-white/10 rounded-full px-1 py-1">
                                    <button onClick={() => updateStat(player.id, 'poison', -1)} className="p-2 text-zinc-500 hover:text-zinc-300">
                                        <Minus size={12} />
                                    </button>
                                    <div className="flex items-center gap-2 px-4 min-w-[80px] justify-center">
                                        <Skull size={14} className={player.poison > 0 ? 'text-green-500' : 'text-zinc-600'} />
                                        <span className={`font-mono font-bold ${player.poison > 0 ? 'text-green-500' : 'text-zinc-600'}`}>{player.poison}</span>
                                    </div>
                                    <button onClick={() => updateStat(player.id, 'poison', 1)} className="p-2 text-zinc-500 hover:text-zinc-300">
                                        <Plus size={12} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}