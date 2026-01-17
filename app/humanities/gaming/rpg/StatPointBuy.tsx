"use client";
import React from "react";
import { Plus, Minus, ShieldAlert } from "lucide-react";
import { StatLabel, STAT_CONFIG } from "./rpg-data";

interface Props {
  stats: Record<StatLabel, number>;
  pointsRemaining: number;
  onUpdate: (stat: StatLabel, delta: number) => void;
}

export default function StatPointBuy({ stats, pointsRemaining, onUpdate }: Props) {
  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center mb-6 p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Points Pool</span>
            <span className="text-2xl font-black text-white font-mono">{pointsRemaining}</span>
        </div>

        {Object.entries(stats).map(([key, val]) => {
            const k = key as StatLabel;
            const cfg = STAT_CONFIG[k];
            // Point buy logic costs: 8-13 (1pt), 14-15 (2pts)
            const costNext = val >= 13 ? 2 : 1;
            const canIncrease = pointsRemaining >= costNext && val < 15;
            const canDecrease = val > 8;

            return (
                <div key={key} className="flex items-center justify-between group">
                    <div className="w-24">
                        <div className="text-xs font-bold text-stone-400 group-hover:text-white transition-colors">{cfg.full}</div>
                        <div className="text-[9px] font-mono text-stone-600">{key}</div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => onUpdate(k, -1)}
                            disabled={!canDecrease}
                            className="p-1 rounded hover:bg-white/10 text-stone-500 disabled:opacity-20"
                        >
                            <Minus size={14} />
                        </button>
                        
                        <div className="w-8 text-center font-mono font-bold text-lg" style={{ color: cfg.color }}>
                            {val}
                        </div>

                        <button 
                            onClick={() => onUpdate(k, 1)}
                            disabled={!canIncrease}
                            className="p-1 rounded hover:bg-white/10 text-stone-500 disabled:opacity-20"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            )
        })}
    </div>
  );
}