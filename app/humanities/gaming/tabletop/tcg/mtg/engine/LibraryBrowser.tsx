"use client";
import { useState } from "react";
import { CardState } from "./types";
import { Search, ArrowUpCircle, X } from "lucide-react";

interface Props {
    library: CardState[];
    playerId: string;
    onPlay: (playerId: string, cardId: string) => void;
    onClose: () => void;
}

export default function LibraryBrowser({ library, playerId, onPlay, onClose }: Props) {
    const [filter, setFilter] = useState("");

    const filtered = library.filter(c => 
        c.name.toLowerCase().includes(filter.toLowerCase()) || 
        c.typeLine?.toLowerCase().includes(filter.toLowerCase()) ||
        c.notes?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex justify-end">
            <div className="w-96 h-full bg-[#1c1917] border-l border-[#b45309] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0c0a09]">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Search size={16} className="text-[#fbbf24]" /> Library ({library.length})
                    </h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={20}/></button>
                </div>
                <div className="p-4 border-b border-white/10">
                    <input 
                        autoFocus
                        placeholder="Search name or tag (e.g. Ramp)"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full bg-black border border-zinc-700 p-2 rounded text-sm text-white focus:border-[#fbbf24] outline-none"
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {filtered.map(card => (
                        <div key={card.instanceId} className="group flex gap-3 p-2 bg-[#292524] rounded border border-white/5 hover:border-[#fbbf24] transition-all">
                            <div className="w-12 h-16 bg-black rounded overflow-hidden flex-shrink-0">
                                {card.imageUrl ? <img src={card.imageUrl} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-zinc-800"/>}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="text-sm font-bold text-white leading-tight">{card.name}</div>
                                    <div className="text-[10px] text-zinc-500 truncate">{card.typeLine}</div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {card.notes && card.notes.split(', ').map(tag => (
                                        tag && <span key={tag} className="text-[8px] bg-zinc-800 text-zinc-300 px-1 rounded border border-zinc-700">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={() => onPlay(playerId, card.instanceId)}
                                className="self-center p-2 bg-[#b45309] hover:bg-[#d97706] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <ArrowUpCircle size={20} />
                            </button>
                        </div>
                    ))}
                    {filtered.length === 0 && <div className="text-center text-zinc-500 text-xs mt-4">No cards found.</div>}
                </div>
            </div>
        </div>
    );
}