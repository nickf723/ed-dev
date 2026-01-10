"use client";
import { PlayerState, CardState } from "../engine/types";
import CardToken from "./CardToken";
import ManaPool from "../engine/ManaPool";
import { Search, Plus, Skull, Ghost, Dices } from "lucide-react";

interface Props {
    players: PlayerState[];
    activePlayerIndex: number;
    shakePlayerId: string | null;
    
    // Actions
    onModifyMana: (pid: string, c: any, a: number) => void;
    onModifyLife: (pid: string, amt: number) => void;
    onModifyHand: (pid: string, amt: number) => void;
    onPlayCommander: (pid: string) => void;
    onToggleTap: (pid: string, cid: string) => void;
    onContextMenu: (e: React.MouseEvent, card: CardState) => void;
    
    // UI Triggers
    onOpenLibrary: (pid: string) => void;
    onOpenFoundry: (pid: string) => void;
    onOpenZone: (pid: string, zone: 'graveyard' | 'exile') => void;
    onSummon: (pid: string) => void;
}

export default function Battlefield({
    players, activePlayerIndex, shakePlayerId,
    onModifyMana, onModifyLife, onModifyHand, onPlayCommander,
    onToggleTap, onContextMenu,
    onOpenLibrary, onOpenFoundry, onOpenZone, onSummon
}: Props) {

    return (
        <div className="flex-1 flex flex-wrap relative bg-[#0f0f0f]">
            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            
            {players.map((p, i) => (
                <div 
                    key={p.id} 
                    className={`
                        w-1/2 h-1/2 border-r border-b border-white/5 last:border-0 relative flex flex-col group 
                        ${i === activePlayerIndex ? "ring-2 ring-inset ring-[#fbbf24]/30" : ""} 
                        ${shakePlayerId === p.id ? "animate-shake bg-red-900/10" : ""}
                    `}
                >
                    {/* --- PLAYER HUD --- */}
                    <div className="h-12 bg-[#0c0a09]/90 border-b border-white/5 flex items-center justify-between px-3 z-20">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-2 h-2 rounded-full ${i===activePlayerIndex ? "bg-[#fbbf24] animate-pulse" : "bg-zinc-600"}`} />
                            <span className="font-bold text-white text-xs truncate">{p.name}</span>
                            <div className="ml-2 hidden 2xl:block scale-90 origin-left">
                                <ManaPool pool={p.manaPool} onModify={(c, a) => onModifyMana(p.id, c, a)} />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <span className="text-[7px] text-zinc-500 uppercase font-bold">LIFE</span>
                                <div className="flex items-center bg-black/40 rounded border border-white/10">
                                    <button onClick={() => onModifyLife(p.id, -1)} className="px-1.5 hover:text-white text-red-500">-</button>
                                    <span className="w-8 text-center font-mono font-bold text-white text-sm">{p.life}</span>
                                    <button onClick={() => onModifyLife(p.id, 1)} className="px-1.5 hover:text-white text-green-500">+</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[7px] text-zinc-500 uppercase font-bold">HAND</span>
                                <div className="flex items-center bg-black/40 rounded border border-white/10">
                                    <button onClick={() => onModifyHand(p.id, -1)} className="px-1.5 hover:text-white text-zinc-500">-</button>
                                    <span className="w-6 text-center font-mono font-bold text-zinc-300 text-sm">{p.handSize}</span>
                                    <button onClick={() => onModifyHand(p.id, 1)} className="px-1.5 hover:text-white text-zinc-500">+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CARD AREA --- */}
                    <div className="flex-1 p-3 flex flex-wrap content-start gap-2 overflow-y-auto bg-[url('/noise.png')] bg-opacity-5 relative">
                        {p.board.map(c => (
                            <CardToken 
                                key={c.instanceId} 
                                card={c} 
                                // We pass the events up to the parent/props
                                // Note: You might need to adjust CardToken signature if it doesn't take these directly yet
                                // For now assuming CardToken is imported and handles its own simple clicks or we pass wrappers
                            />
                        ))}
                    </div>
                    
                    {/* --- ZONE TOGGLES --- */}
                    <div className="absolute bottom-1 left-3 flex gap-3 text-[9px] font-mono text-zinc-600 z-20">
                         <button onClick={() => onOpenZone(p.id, 'graveyard')} className="hover:text-zinc-300 flex items-center gap-1"><Skull size={10} /> {p.graveyard.length}</button>
                         <button onClick={() => onOpenZone(p.id, 'exile')} className="hover:text-zinc-300 flex items-center gap-1"><Ghost size={10} /> {p.exile.length}</button>
                    </div>

                    {/* --- COMMAND ZONE --- */}
                    {p.command.length > 0 && (
                        <div className="absolute top-14 right-3 z-20 flex flex-col items-center animate-in slide-in-from-right">
                             <div className="text-[8px] font-bold text-[#fbbf24] bg-black/60 px-1.5 rounded-t border-t border-x border-[#fbbf24]/30">TAX:{p.commanderTax}</div>
                             <div onClick={() => onPlayCommander(p.id)} className="w-14 h-16 rounded border-2 border-[#fbbf24] bg-zinc-900 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.3)] relative group overflow-hidden">
                                {p.command[0].imageUrl ? <img src={p.command[0].imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="Commander"/> : <div className="p-1 text-[8px] text-center text-[#fbbf24]">{p.command[0].name}</div>}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[8px] text-white">CAST</div>
                             </div>
                        </div>
                    )}

                    {/* --- HOVER ACTIONS --- */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        <button onClick={() => onOpenLibrary(p.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Library"><Search size={14}/></button>
                        <button onClick={() => onOpenFoundry(p.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Tokens"><Dices size={14}/></button>
                        <button onClick={() => onSummon(p.id)} className="bg-[#b45309] hover:bg-[#d97706] text-white p-2 rounded-full shadow-lg shadow-orange-900/20" title="Summon"><Plus size={14}/></button>
                    </div>
                </div>
            ))}
        </div>
    );
}