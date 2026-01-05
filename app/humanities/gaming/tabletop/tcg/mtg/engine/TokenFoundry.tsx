"use client";
import { useState } from "react";
import { Coins, Skull, Scroll, Search, X } from "lucide-react";

interface Props {
    playerId: string;
    onCreate: (pid: string, name: string, p?: string, t?: string) => void;
    onClose: () => void;
}

const COMMON_TOKENS = [
    { name: "Treasure", icon: Coins, color: "text-yellow-500", label: "Treasure" },
    { name: "Zombie", icon: Skull, color: "text-purple-500", label: "2/2 Zombie", p: "2", t: "2" },
    { name: "Clue", icon: Search, color: "text-blue-400", label: "Clue" },
    { name: "Food", icon: Scroll, color: "text-green-500", label: "Food" },
];

export default function TokenFoundry({ playerId, onCreate, onClose }: Props) {
    const [customName, setCustomName] = useState("");
    const [customP, setCustomP] = useState("");
    const [customT, setCustomT] = useState("");

    return (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c1917] border border-zinc-600 p-6 rounded-xl w-full max-w-sm shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold flex items-center gap-2">Token Foundry</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={18}/></button>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    {COMMON_TOKENS.map(t => (
                        <button 
                            key={t.name}
                            onClick={() => { onCreate(playerId, t.name + " Token", t.p, t.t); onClose(); }}
                            className="flex items-center gap-3 p-3 bg-zinc-800 hover:bg-zinc-700 border border-white/5 rounded-lg transition-colors group"
                        >
                            <t.icon className={`${t.color} group-hover:scale-110 transition-transform`} size={20} />
                            <span className="text-sm font-bold text-zinc-300">{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* Custom Creator */}
                <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="text-xs text-zinc-500 font-bold uppercase">Custom Token</div>
                    <input 
                        placeholder="Name (e.g. Dragon)"
                        value={customName}
                        onChange={e => setCustomName(e.target.value)}
                        className="w-full bg-black border border-zinc-700 p-2 rounded text-sm text-white focus:border-[#fbbf24] outline-none"
                    />
                    <div className="flex gap-2">
                        <input 
                            placeholder="Pow" 
                            value={customP} onChange={e => setCustomP(e.target.value)}
                            className="w-1/2 bg-black border border-zinc-700 p-2 rounded text-sm text-white text-center"
                        />
                        <input 
                            placeholder="Tgh" 
                            value={customT} onChange={e => setCustomT(e.target.value)}
                            className="w-1/2 bg-black border border-zinc-700 p-2 rounded text-sm text-white text-center"
                        />
                    </div>
                    <button 
                        onClick={() => { onCreate(playerId, customName + " Token", customP, customT); onClose(); }}
                        disabled={!customName}
                        className="w-full py-2 bg-[#b45309] hover:bg-[#d97706] disabled:opacity-50 text-white font-bold rounded"
                    >
                        FORGE TOKEN
                    </button>
                </div>
            </div>
        </div>
    );
}