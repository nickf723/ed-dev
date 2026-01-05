"use client";
import { ChevronRight, RotateCcw } from "lucide-react";

interface Props {
    activePlayerName: string;
    phase: string;
    onNextPhase: (p: string) => void;
    onPassTurn: () => void;
}

const PHASES = ["Untap", "Upkeep", "Draw", "Main 1", "Combat", "Main 2", "End"];

export default function PhaseTracker({ activePlayerName, phase, onNextPhase, onPassTurn }: Props) {
    const currentIdx = PHASES.indexOf(phase);

    const advance = () => {
        if (currentIdx < PHASES.length - 1) {
            onNextPhase(PHASES[currentIdx + 1]);
        } else {
            onPassTurn();
        }
    };

    return (
        <div className="flex items-center gap-4 bg-[#1c1917] border border-[#b45309]/50 px-4 py-2 rounded-full shadow-lg">
            
            {/* Active Player Badge */}
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
                <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{activePlayerName}</span>
            </div>

            {/* Phase Bar */}
            <div className="flex items-center gap-1">
                {PHASES.map((p, i) => (
                    <div 
                        key={p} 
                        onClick={() => onNextPhase(p)}
                        className={`
                            px-2 py-1 rounded text-[9px] font-mono cursor-pointer transition-colors
                            ${p === phase ? "bg-[#fbbf24] text-black font-bold" : i < currentIdx ? "text-zinc-600 line-through" : "text-zinc-500 hover:text-zinc-300"}
                        `}
                    >
                        {p}
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <button 
                onClick={advance}
                className="ml-2 w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-[#fbbf24] hover:text-black rounded-full transition-colors"
                title={currentIdx === PHASES.length - 1 ? "Pass Turn" : "Next Phase"}
            >
                {currentIdx === PHASES.length - 1 ? <RotateCcw size={14} /> : <ChevronRight size={14} />}
            </button>
        </div>
    );
}