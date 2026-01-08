"use client";
import { useState } from "react";
import { PlayerState, CardState } from "../engine/types";
import { 
    Plus, Search, Dices, Skull, Ghost, 
    Eye, EyeOff 
} from "lucide-react";

// SUB-COMPONENTS (Code provided below, save in same folder or import)
import ManaPool from "../engine/ManaPool";
import CardToken from "./CardToken";
import HandZone from "./HandZone";

interface Props {
    player: PlayerState;
    isActive: boolean;
    isShake: boolean;
    
    // Actions passed from Parent
    onModifyLife: (amt: number) => void;
    onModifyHand: (amt: number) => void;
    onModifyMana: (color: any, amt: number) => void;
    onPlayCommander: () => void;
    onToggleTap: (cardId: string) => void;
    onContextMenu: (e: React.MouseEvent, card: CardState) => void;
    
    // Modal Triggers
    onOpenLibrary: () => void;
    onOpenFoundry: () => void;
    onOpenOracle: () => void;
    onOpenZone: (zone: 'graveyard' | 'exile') => void;
    
    // Hand Actions
    onPlayFromHand: (cardId: string) => void;
}

export default function PlayerQuadrant({ 
    player, 
    isActive, 
    isShake,
    onModifyLife,
    onModifyHand,
    onModifyMana,
    onPlayCommander,
    onToggleTap,
    onContextMenu,
    onOpenLibrary,
    onOpenFoundry,
    onOpenOracle,
    onOpenZone,
    onPlayFromHand
}: Props) {
    
    const [showHand, setShowHand] = useState(false);

    // Fallback if 'hand' array doesn't exist yet in your types (transition period)
    // In the future, player.hand will be a real array. 
    // For now, we simulate it by grabbing from library if strictly needed, or assuming empty.
    const visualHand = player.hand; 

    return (
        <div className={`
            relative flex flex-col group border-r border-b border-white/5 last:border-0 overflow-hidden
            ${isActive ? "ring-2 ring-inset ring-[#fbbf24]/30" : ""}
            ${isShake ? "animate-shake bg-red-900/10" : ""}
        `}>
            
            {/* --- 1. HEADER HUD --- */}
            <div className="h-14 bg-[#0c0a09]/95 border-b border-white/5 flex items-center justify-between px-4 z-30 backdrop-blur-sm">
                
                {/* Name & Mana */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full ${isActive ? "bg-[#fbbf24] animate-pulse" : "bg-zinc-600"}`} />
                    <span className="font-bold text-white text-xs truncate max-w-[100px]">{player.name}</span>
                    <div className="ml-2 hidden xl:block scale-90 origin-left">
                        <ManaPool pool={player.manaPool} onModify={onModifyMana} />
                    </div>
                </div>

                {/* Counters */}
                <div className="flex items-center gap-4">
                    {/* Life */}
                    <div className="flex flex-col items-center">
                        <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-wider">LIFE</span>
                        <div className="flex items-center bg-black/40 rounded border border-white/10">
                            <button onClick={() => onModifyLife(-1)} className="px-2 hover:text-white text-red-500 transition-colors">-</button>
                            <span className="w-8 text-center font-mono font-bold text-white text-sm">{player.life}</span>
                            <button onClick={() => onModifyLife(1)} className="px-2 hover:text-white text-green-500 transition-colors">+</button>
                        </div>
                    </div>

                    {/* Hand Toggle */}
                    <button 
                        onClick={() => setShowHand(!showHand)}
                        className={`
                            flex flex-col items-center justify-center border rounded px-2 py-0.5 transition-all
                            ${showHand ? "bg-blue-900/20 border-blue-500/50 text-blue-300" : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300"}
                        `}
                    >
                         <div className="flex items-center gap-1">
                            {showHand ? <Eye size={10}/> : <EyeOff size={10}/>}
                            <span className="text-[7px] uppercase font-bold tracking-wider">HAND</span>
                         </div>
                         <span className="font-mono font-bold text-sm">{player.handSize}</span>
                    </button>
                </div>
            </div>

            {/* --- 2. MAIN BATTLEFIELD --- */}
            <div className="flex-1 relative overflow-hidden bg-[#0f0f0f]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

                {/* Card Grid */}
                <div className={`
                    absolute inset-0 p-4 flex flex-wrap content-start gap-3 overflow-y-auto transition-transform duration-500 ease-in-out
                    ${showHand ? "-translate-y-[30%] opacity-30 scale-95 blur-[1px]" : ""}
                `}>
                    {player.board.length === 0 && !showHand && (
                        <div className="w-full text-center text-zinc-800 text-xs font-bold uppercase mt-10 tracking-widest">Empty Board</div>
                    )}
                    
                    {player.board.map(c => (
                        <CardToken 
                            key={c.instanceId} 
                            card={c} 
                            onTap={() => onToggleTap(c.instanceId)}
                            onContextMenu={(e) => onContextMenu(e, c)}
                        />
                    ))}
                </div>

                {/* --- 3. FLOATING UI ELEMENTS --- */}

                {/* Command Zone (Top Right) */}
                {player.command.length > 0 && !showHand && (
                    <div className="absolute top-4 right-4 z-20 flex flex-col items-center animate-in slide-in-from-right">
                            <div className="text-[9px] font-bold text-[#fbbf24] bg-black/80 px-2 rounded-t border-t border-x border-[#fbbf24]/30 backdrop-blur-md">
                            TAX: {player.commanderTax}
                            </div>
                            <div 
                            onClick={onPlayCommander}
                            className="w-16 h-20 rounded border-2 border-[#fbbf24] bg-zinc-900 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.3)] relative group overflow-hidden"
                            >
                            {player.command[0].imageUrl ? <img src={player.command[0].imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="Commander"/> : <div className="p-1 text-[8px] text-center text-[#fbbf24]">{player.command[0].name}</div>}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] text-white">
                                CAST
                            </div>
                            </div>
                    </div>
                )}

                {/* Zone Toggles (Bottom Left) */}
                <div className={`absolute bottom-2 left-4 flex gap-3 text-[9px] font-mono text-zinc-600 z-20 transition-opacity ${showHand ? "opacity-0" : "opacity-100"}`}>
                    <button onClick={() => onOpenZone('graveyard')} className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
                        <Skull size={10} /> GY: {player.graveyard.length}
                    </button>
                    <button onClick={() => onOpenZone('exile')} className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
                        <Ghost size={10} /> EX: {player.exile.length}
                    </button>
                </div>

                {/* Action Buttons (Bottom Right Hover) */}
                <div className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-200 z-30 ${showHand ? "translate-y-20" : "opacity-0 group-hover:opacity-100"}`}>
                    <button onClick={onOpenLibrary} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Library"><Search size={16}/></button>
                    <button onClick={onOpenFoundry} className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full shadow-lg border border-zinc-600" title="Tokens"><Dices size={16}/></button>
                    <button onClick={onOpenOracle} className="bg-[#b45309] hover:bg-[#d97706] text-white p-2 rounded-full shadow-lg shadow-orange-900/20" title="Summon"><Plus size={16}/></button>
                </div>
            </div>

            {/* --- 4. HAND ZONE DRAWER --- */}
            <div className={`
                absolute bottom-0 left-0 right-0 h-64 bg-[#1a1a1a]/95 border-t border-[#fbbf24]/50 backdrop-blur-xl
                transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-40
                ${showHand ? "translate-y-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" : "translate-y-full"}
            `}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-black text-[9px] font-bold px-3 py-0.5 rounded-t uppercase tracking-widest">
                    Player Hand
                </div>
                <HandZone 
                    cards={visualHand} 
                    playerId={player.id} 
                    onPlay={onPlayFromHand} 
                />
            </div>

        </div>
    );
}