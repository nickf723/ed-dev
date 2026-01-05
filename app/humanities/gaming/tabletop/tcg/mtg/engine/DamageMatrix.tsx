"use client";
import { PlayerState } from "./types";
import { X, Sword, Shield } from "lucide-react";

interface Props {
    players: PlayerState[];
    onModify: (targetId: string, sourceId: string, amount: number) => void;
    onClose: () => void;
}

export default function DamageMatrix({ players, onModify, onClose }: Props) {
    return (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#1c1917] border border-red-900/50 p-6 rounded-xl w-full max-w-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sword className="text-red-500" /> Commander Damage
                    </h3>
                    <button onClick={onClose}><X className="text-zinc-500 hover:text-white" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {players.map(victim => (
                        <div key={victim.id} className="bg-black/40 rounded-lg p-4 border border-white/5">
                            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                                <Shield size={16} className="text-zinc-500" />
                                <span className="font-bold text-white">{victim.name}</span>
                                <span className="text-xs text-zinc-500 ml-auto">Has taken:</span>
                            </div>
                            
                            <div className="space-y-2">
                                {players.filter(p => p.id !== victim.id).map(attacker => {
                                    const dmg = victim.commanderDamage[attacker.id] || 0;
                                    const isLethal = dmg >= 21;

                                    return (
                                        <div key={attacker.id} className="flex items-center justify-between text-sm">
                                            <span className="text-zinc-400 w-24 truncate">vs {attacker.name}</span>
                                            
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => onModify(victim.id, attacker.id, -1)} className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400">-</button>
                                                
                                                <div className={`w-8 text-center font-bold font-mono ${isLethal ? "text-red-500 animate-pulse" : "text-white"}`}>
                                                    {dmg}
                                                </div>
                                                
                                                <button onClick={() => onModify(victim.id, attacker.id, 1)} className="w-6 h-6 bg-red-900/30 hover:bg-red-900/50 rounded text-red-400">+</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}