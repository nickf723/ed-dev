"use client";
import { useState } from "react";
import { CheckCircle2, Lock, ArrowUpCircle } from "lucide-react";

const needs = [
    { id: 5, label: "Self-Actualization", desc: "Achieving one's full potential, creative activities.", color: "fill-pink-500", text: "text-pink-400" },
    { id: 4, label: "Esteem", desc: "Prestige, feeling of accomplishment.", color: "fill-purple-500", text: "text-purple-400" },
    { id: 3, label: "Belongingness", desc: "Intimate relationships, friends.", color: "fill-indigo-500", text: "text-indigo-400" },
    { id: 2, label: "Safety Needs", desc: "Security, safety.", color: "fill-blue-500", text: "text-blue-400" },
    { id: 1, label: "Physiological", desc: "Food, water, warmth, rest.", color: "fill-teal-500", text: "text-teal-400" },
];

export default function MaslowPyramid() {
  const [level, setLevel] = useState(0); // 0 = none, 5 = top
  const [hovered, setHovered] = useState<number | null>(null);

  const activate = (id: number) => {
      // Logic: Can only activate if previous level is met
      if (id === level + 1) {
          setLevel(id);
      } else if (id <= level) {
          // Re-clicking lower levels just shows info, doesn't reset (unless we want to?)
      }
  };

  const currentInfo = needs.find(n => n.id === (hovered || (level === 0 ? 1 : level)));

  return (
    <div className="bg-[#1e1b4b]/80 border border-purple-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-center">
        
        <h3 className="text-xl font-bold text-white mb-2 font-serif">Hierarchy of Needs</h3>
        <p className="text-xs text-purple-300/60 mb-6 uppercase tracking-widest font-mono">
            Abraham Maslow (1943)
        </p>

        {/* PYRAMID SVG */}
        <div className="relative w-64 h-64 mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                {needs.map((n, index) => {
                    // Calculate trapezoid coordinates
                    // Top width gets smaller as index goes up (actually down in array sense)
                    // Array is Top(5) -> Bottom(1)
                    // Let's reverse index for math: 0 (top) to 4 (bottom)
                    const i = 5 - n.id; 
                    const yTop = i * 20;
                    const yBot = (i + 1) * 20;
                    const xTop = i * 10;
                    const xBot = (i + 1) * 10;
                    
                    const isUnlocked = level >= n.id;
                    const isNext = level + 1 === n.id;
                    const isHovered = hovered === n.id;

                    return (
                        <g 
                            key={n.id} 
                            onClick={() => activate(n.id)}
                            onMouseEnter={() => setHovered(n.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="cursor-pointer transition-all duration-300"
                            style={{ opacity: isUnlocked ? 1 : isNext ? 0.6 : 0.2 }}
                        >
                            <path 
                                d={`M ${50 - xTop} ${yTop} L ${50 + xTop} ${yTop} L ${50 + xBot} ${yBot} L ${50 - xBot} ${yBot} Z`}
                                className={`${n.color} stroke-[#0f0518] stroke-[0.5] transition-all duration-300 hover:brightness-125`}
                            />
                            {/* Icon / Status */}
                            {isUnlocked ? (
                                <foreignObject x={46} y={yTop + 5} width="8" height="8">
                                    <CheckCircle2 className="text-white w-full h-full" />
                                </foreignObject>
                            ) : isNext ? (
                                <foreignObject x={46} y={yTop + 5} width="8" height="8">
                                    <ArrowUpCircle className="text-white/50 w-full h-full animate-bounce" />
                                </foreignObject>
                            ) : (
                                <foreignObject x={46} y={yTop + 5} width="8" height="8">
                                    <Lock className="text-black/30 w-full h-full" />
                                </foreignObject>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>

        {/* INFO CARD */}
        <div className="w-full min-h-[100px] bg-black/30 rounded-lg p-4 border border-white/5 text-center transition-all">
            {currentInfo && (
                <div className="animate-fadeIn">
                    <div className={`font-bold text-lg mb-1 ${currentInfo.text}`}>{currentInfo.label}</div>
                    <div className="text-sm text-slate-300 leading-relaxed">{currentInfo.desc}</div>
                    {level < currentInfo.id && currentInfo.id === level + 1 && (
                        <div className="mt-2 text-[10px] text-white/50 uppercase tracking-widest animate-pulse">
                            Click to Fulfill Need
                        </div>
                    )}
                </div>
            )}
        </div>

    </div>
  );
}