"use client";
import { useState } from "react";
import { Crown, Shield, Sword, Hammer, ArrowDown, ArrowUp } from "lucide-react";

const tiers = [
    {
        id: "monarch",
        label: "THE MONARCH",
        icon: Crown,
        color: "bg-amber-600",
        gives: "Land (Fiefs) & Protection",
        receives: "Loyalty & Military Aid",
        desc: "The King/Queen owns all land. They grant portions to Nobles in exchange for support."
    },
    {
        id: "nobles",
        label: "NOBLES (LORDS)",
        icon: Shield,
        color: "bg-red-700",
        gives: "Land & Protection",
        receives: "Military Service & Taxes",
        desc: "Vassals to the King. They manage large estates and provide knights for the King's army."
    },
    {
        id: "knights",
        label: "KNIGHTS (VASSALS)",
        icon: Sword,
        color: "bg-slate-600",
        gives: "Protection & Shelter",
        receives: "Food & Labor",
        desc: "The warrior class. They fight for their Lords in exchange for smaller plots of land."
    },
    {
        id: "peasants",
        label: "PEASANTS (SERFS)",
        icon: Hammer,
        color: "bg-stone-600",
        gives: "Labor & Food",
        receives: "Protection",
        desc: "The foundation. Serfs were bound to the land, working it in exchange for physical safety inside the castle walls."
    }
];

export default function FeudalPyramid() {
  const [activeTier, setActiveTier] = useState("monarch");
  const current = tiers.find(t => t.id === activeTier) || tiers[0];

  return (
    <div className="bg-[#1c1917]/90 border border-stone-700 rounded-xl p-6 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* THE PYRAMID VISUAL */}
        <div className="flex flex-col items-center justify-center gap-2 md:w-1/2">
            <h3 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-2">Social Hierarchy</h3>
            {tiers.map((tier) => (
                <button
                    key={tier.id}
                    onClick={() => setActiveTier(tier.id)}
                    className={`
                        w-full transition-all duration-300 flex items-center justify-center gap-3 p-3 rounded shadow-lg border border-black/20
                        ${activeTier === tier.id 
                            ? `${tier.color} text-white scale-105 ring-2 ring-white/20` 
                            : "bg-[#292524] text-stone-500 hover:bg-[#35312f]"
                        }
                    `}
                    style={{ width: `${100 - (tiers.indexOf(tier) * 15)}%` }} // Tapering width
                >
                    <tier.icon size={16} />
                    <span className="font-bold text-xs tracking-wider">{tier.label}</span>
                </button>
            ))}
        </div>

        {/* INFO PANEL */}
        <div className="flex-1 border-l border-stone-700 pl-6 flex flex-col justify-center">
            <h2 className="text-2xl font-black font-serif text-white mb-2">{current.label}</h2>
            <p className="text-sm text-stone-400 leading-relaxed mb-6">
                {current.desc}
            </p>

            <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded border border-white/5 flex items-center gap-3">
                    <div className="p-2 bg-green-900/30 rounded text-green-500"><ArrowDown size={14} /></div>
                    <div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase">GIVES DOWN</div>
                        <div className="text-sm text-stone-200">{current.gives}</div>
                    </div>
                </div>
                <div className="bg-black/30 p-3 rounded border border-white/5 flex items-center gap-3">
                    <div className="p-2 bg-blue-900/30 rounded text-blue-500"><ArrowUp size={14} /></div>
                    <div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase">RECEIVES UP</div>
                        <div className="text-sm text-stone-200">{current.receives}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}