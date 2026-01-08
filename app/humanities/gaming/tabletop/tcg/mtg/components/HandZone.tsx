"use client";
import { CardState } from "../engine/types";
import { ArrowUpCircle } from "lucide-react";

interface Props {
    cards: CardState[];
    playerId: string;
    onPlay: (cardId: string) => void;
}

export default function HandZone({ cards, playerId, onPlay }: Props) {
    if (cards.length === 0) {
        return <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-mono uppercase">Hand is Empty</div>;
    }

    return (
        <div className="w-full h-full overflow-x-auto flex items-center px-8 pb-4 pt-8">
            <div className="flex mx-auto">
                {cards.map((card, i) => {
                    // Visual calculation for fanning effect
                    const rotation = (i - (cards.length - 1) / 2) * 3; 
                    const translateY = Math.abs(i - (cards.length - 1) / 2) * 4;

                    return (
                        <div 
                            key={card.instanceId}
                            className="relative group transition-all duration-300 hover:z-50"
                            style={{ 
                                marginLeft: i > 0 ? "-50px" : "0",
                                zIndex: i 
                            }}
                        >
                            <div 
                                className="w-[140px] h-[200px] bg-black rounded-xl border border-zinc-700 shadow-2xl cursor-pointer relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-12 group-hover:scale-110 group-hover:rotate-0"
                                style={{ transform: `rotate(${rotation}deg) translateY(${translateY}px)` }}
                                onClick={() => onPlay(card.instanceId)}
                            >
                                {card.imageUrl ? (
                                    <img src={card.imageUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="p-2 text-white text-xs text-center mt-10">{card.name}</div>
                                )}
                                
                                {/* Hover Play Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <ArrowUpCircle className="text-[#fbbf24]" size={32} />
                                </div>
                                
                                {/* Mana Cost Badge */}
                                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded shadow border border-white/10">
                                    {card.manaCost || "?"}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}