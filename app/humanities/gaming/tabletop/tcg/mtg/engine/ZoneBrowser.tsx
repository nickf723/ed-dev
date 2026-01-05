"use client";
import { CardState } from "./types";
import { X, Reply, ArrowUpCircle } from "lucide-react";

interface Props {
    title: string;
    cards: CardState[];
    onClose: () => void;
    onMove: (cardId: string, dest: 'hand' | 'battlefield' | 'library') => void;
}

export default function ZoneBrowser({ title, cards, onClose, onMove }: Props) {
    return (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex justify-end">
            <div className="w-80 h-full bg-[#0c0a09] border-l border-zinc-800 flex flex-col animate-in slide-in-from-right">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-white uppercase tracking-widest text-xs">{title} ({cards.length})</h3>
                    <button onClick={onClose}><X size={18} className="text-zinc-500 hover:text-white"/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {cards.length === 0 && <div className="text-center text-zinc-600 text-xs mt-10">Zone is empty.</div>}
                    
                    {cards.map(card => (
                        <div key={card.instanceId} className="flex gap-2 p-2 bg-zinc-900/50 rounded border border-white/5 group">
                            <div className="w-10 h-14 bg-black rounded overflow-hidden">
                                {card.imageUrl && <img src={card.imageUrl} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"/>}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="text-xs font-bold text-zinc-300 truncate">{card.name}</div>
                                <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => onMove(card.instanceId, 'hand')} className="p-1 bg-blue-900/50 text-blue-300 rounded text-[10px] flex gap-1 items-center border border-blue-900"><Reply size={10}/> Hand</button>
                                    <button onClick={() => onMove(card.instanceId, 'battlefield')} className="p-1 bg-green-900/50 text-green-300 rounded text-[10px] flex gap-1 items-center border border-green-900"><ArrowUpCircle size={10}/> Board</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}