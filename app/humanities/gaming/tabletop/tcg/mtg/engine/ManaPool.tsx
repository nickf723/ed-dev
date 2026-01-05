"use client";
import { Sun, Droplets, Skull, Flame, TreePine, Hexagon, LucideIcon } from "lucide-react";
import { ManaColor } from "./types"; 

interface Props {
    // strict record type
    pool: Record<ManaColor, number>;
    onModify: (color: ManaColor, amount: number) => void;
}

// Strict config type ensures 'key' matches the pool keys exactly
type IconConfig = {
    key: ManaColor;
    icon: LucideIcon;
    color: string;
    bg: string;
};

export default function ManaPool({ pool, onModify }: Props) {
    const ICONS: IconConfig[] = [
        { key: 'W', icon: Sun, color: "text-[#fde047]", bg: "bg-[#fde047]/10" },
        { key: 'U', icon: Droplets, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
        { key: 'B', icon: Skull, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
        { key: 'R', icon: Flame, color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
        { key: 'G', icon: TreePine, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
        { key: 'C', icon: Hexagon, color: "text-zinc-400", bg: "bg-zinc-500/10" },
    ];

    return (
        <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/5 backdrop-blur-sm">
            {ICONS.map((m) => (
                <div key={m.key} className={`relative flex flex-col items-center justify-center w-8 h-10 rounded ${m.bg} group cursor-pointer border border-transparent hover:border-white/20`}>
                    
                    {/* NO CASTING NEEDED: Typescript knows m.key is 'W' | 'U' etc */}
                    <div className={`font-mono font-bold text-sm ${pool[m.key] > 0 ? "opacity-100" : "opacity-40"} ${m.color}`}>
                        {pool[m.key]}
                    </div>
                    
                    <m.icon size={10} className={`absolute bottom-1 opacity-20 ${m.color}`} />

                    {/* Hover Controls */}
                    <div className="absolute inset-0 bg-black/90 hidden group-hover:flex flex-col items-center justify-center rounded z-10">
                         <button onClick={() => onModify(m.key, 1)} className={`w-full h-1/2 flex items-center justify-center text-[8px] hover:bg-white/10 ${m.color}`}>+</button>
                         <button onClick={() => onModify(m.key, -1)} className={`w-full h-1/2 flex items-center justify-center text-[8px] hover:bg-white/10 ${m.color}`}>-</button>
                    </div>
                </div>
            ))}
        </div>
    );
}