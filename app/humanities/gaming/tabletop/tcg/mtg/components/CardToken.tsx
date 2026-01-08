"use client";
import { CardState } from "../engine/types";

interface Props {
    card: CardState;
    onTap: () => void;
    onContextMenu: (e: React.MouseEvent) => void;
}

export default function CardToken({ card, onTap, onContextMenu }: Props) {
    // WITH THE NEW CHECK:
    const isFlying = card.keywords.includes("Flying");
    const isVigilance = card.keywords.includes("Vigilance");
    const isHaste = card.keywords.includes("Haste");
    const isTrample = card.keywords.includes("Trample");

    // Keep using notes for custom tags
    const isCommander = card.notes?.includes("Commander");
    const isToken = card.notes?.includes("TOKEN");
    const isLegend = card.notes?.includes("LEGEND");
    const isInteraction = card.mechanics.isInteraction;

    return (
        <div 
            onClick={(e) => { e.stopPropagation(); onTap(); }}
            onContextMenu={onContextMenu}
            className={`
                relative w-24 h-32 rounded-[5%] cursor-pointer transition-all duration-300 group select-none shadow-lg bg-[#171717]
                
                /* TAPPED STATE */
                ${card.tapped 
                    ? "rotate-90 ring-1 ring-zinc-500 opacity-60 translate-y-2 grayscale-[0.5]" 
                    : "hover:-translate-y-2 hover:z-50 hover:ring-2 ring-[#fbbf24] hover:shadow-[0_10px_25px_rgba(251,191,36,0.2)]"
                }

                /* ANIMATIONS */
                ${!card.tapped && isFlying ? "animate-float shadow-xl z-10" : ""}
                ${!card.tapped && isHaste ? "animate-haste" : ""}
                ${!card.tapped && isVigilance ? "animate-vigilance border-blue-400/30" : ""}

                /* BORDERS */
                ${isCommander ? "border-2 border-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.1)]" : "border border-white/5"}
                ${isLegend && !isCommander ? "border border-[#fbbf24]/50" : ""}
                
                active:scale-95
            `}
        >
            <div className="w-full h-full rounded-[4%] overflow-hidden relative">
                {card.imageUrl ? (
                    <img src={card.imageUrl} className="w-full h-full object-cover" alt={card.name} />
                ) : (
                    <div className="w-full h-full flex flex-col p-2 items-center justify-center text-center bg-zinc-900">
                        <div className="text-[9px] font-bold text-white leading-tight">{card.name}</div>
                        <div className="text-[8px] text-zinc-500 mt-1">{card.power}/{card.toughness}</div>
                        {card.notes && <div className="text-[7px] text-[#fbbf24] mt-1 uppercase truncate max-w-full px-1">{card.notes}</div>}
                    </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {card.counters > 0 && (
                    <div className="absolute top-1 right-1 min-w-[1.5rem] h-6 px-1 bg-white/90 rounded text-black font-bold flex items-center justify-center text-xs shadow-lg z-10 animate-in zoom-in">
                        {card.counters}
                    </div>
                )}
            </div>
            
            {/* Keyword Badges */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isFlying && <div className="text-[6px] font-bold bg-sky-600 text-white px-1 rounded-full shadow border border-white/10">FLY</div>}
                {isVigilance && <div className="text-[6px] font-bold bg-white text-black px-1 rounded-full shadow">VIG</div>}
            </div>
        </div>
    );
}