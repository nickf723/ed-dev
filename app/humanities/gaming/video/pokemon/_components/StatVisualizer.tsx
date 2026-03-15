import React from 'react';

export default function StatVisualizer({ stats }: { stats: any }) {
    // 255 is the absolute maximum base stat in the games
    const MAX_STAT = 255; 

    const statRows = [
        { label: 'HP', value: stats.hp, color: 'bg-emerald-500' },
        { label: 'ATTACK', value: stats.attack, color: 'bg-rose-500' },
        { label: 'DEFENSE', value: stats.defense, color: 'bg-amber-500' },
        { label: 'SP. ATK', value: stats.spAtk, color: 'bg-purple-500' },
        { label: 'SP. DEF', value: stats.spDef, color: 'bg-indigo-500' },
        { label: 'SPEED', value: stats.speed, color: 'bg-sky-500' },
    ];

    const total = Object.values(stats).reduce((a: any, b: any) => a + b, 0) as number;

    return (
        <div className="bg-black/50 p-6 rounded-xl border border-neutral-800">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6 flex justify-between">
                <span>Base Stat Distribution</span>
                <span className="text-white">Total: {total}</span>
            </h4>
            
            <div className="space-y-3">
                {statRows.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 group">
                        <span className="w-16 text-[9px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors text-right">
                            {stat.label}
                        </span>
                        <span className="w-8 text-xs font-mono font-black text-white text-right">
                            {stat.value}
                        </span>
                        <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                            <div 
                                className={`h-full ${stat.color} transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]`}
                                style={{ width: `${Math.min((stat.value / MAX_STAT) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}