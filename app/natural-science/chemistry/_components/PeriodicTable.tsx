"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { APIElement, fetchPeriodicTable } from "./chemistry-api";
import { RefreshCw } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
    'diatomic nonmetal': 'border-emerald-500/50 text-emerald-400',
    'polyatomic nonmetal': 'border-emerald-500/50 text-emerald-400',
    'noble gas': 'border-cyan-500/50 text-cyan-400',
    'alkali metal': 'border-rose-500/50 text-rose-400',
    'alkaline earth metal': 'border-orange-500/50 text-orange-400',
    'metalloid': 'border-yellow-500/50 text-yellow-400',
    'post-transition metal': 'border-sky-500/50 text-sky-400',
    'transition metal': 'border-indigo-500/50 text-indigo-400',
    'lanthanide': 'border-purple-500/50 text-purple-400',
    'actinide': 'border-fuchsia-500/50 text-fuchsia-400',
    'unknown, probably transition metal': 'border-neutral-500/50 text-neutral-400',
    'unknown, probably post-transition metal': 'border-neutral-500/50 text-neutral-400',
    'unknown, probably metalloid': 'border-neutral-500/50 text-neutral-400',
    'unknown, predicted noble gas': 'border-neutral-500/50 text-neutral-400'
};

export default function PeriodicTable({ onSelect, activeZ }: { onSelect: (e: APIElement) => void, activeZ: number }) {
    const [elements, setElements] = useState<APIElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPeriodicTable().then(data => {
            setElements(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="h-[400px] w-full flex flex-col items-center justify-center">
                <RefreshCw size={32} className="text-emerald-500 animate-spin mb-4" />
                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Querying IUPAC Database...</span>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="grid gap-1 min-w-[900px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))", gridTemplateRows: "repeat(10, minmax(0, 1fr))" }}>
                {elements.map((e) => {
                    const style = CATEGORY_COLORS[e.category] || "border-zinc-700 text-zinc-500";
                    const isActive = activeZ === e.number;
                    
                    return (
                        <motion.button
                            key={e.number}
                            onClick={() => onSelect(e)}
                            whileHover={{ scale: 1.2, zIndex: 10 }}
                            className={`
                                aspect-square flex flex-col items-center justify-center rounded border transition-all
                                ${style}
                                ${isActive ? "ring-2 ring-white z-10 scale-110 bg-zinc-800" : "bg-zinc-950/50 hover:bg-zinc-900"}
                            `}
                            // We use the API's exact xpos and ypos!
                            style={{ gridColumn: e.xpos, gridRow: e.ypos }}
                        >
                            <span className="text-[9px] font-mono opacity-60 leading-none">{e.number}</span>
                            <span className="text-xs md:text-sm font-bold leading-none mt-0.5">{e.symbol}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}