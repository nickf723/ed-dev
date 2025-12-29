"use client";
import { link } from "fs";
import { useState } from "react";

const eras = [
    { id: "pre", label: "Prehistory", range: "2.5M - 3000 BC", color: "bg-stone-700", width: "15%", link: "/humanities/history/prehistory" },
    { id: "ant", label: "Antiquity", range: "3000 BC - 500 AD", color: "bg-amber-700", width: "25%", link: "/humanities/history/antiquity" },
    { id: "med", label: "Medieval", range: "500 - 1500", color: "bg-red-900", width: "20%", link: "/humanities/history/medieval" },
    { id: "ear", label: "Early Modern", range: "1500 - 1800", color: "bg-amber-600", width: "15%", link: "/humanities/history/early-modern" },
    { id: "mod", label: "Modern", range: "1800 - Present", color: "bg-yellow-500", width: "25%", link: "/humanities/history/modern" },
];

export default function EraTimeline() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full mb-12">
        <div className="flex items-center justify-between text-[10px] font-mono text-amber-500/50 mb-2 uppercase tracking-widest">
            <span>Origins</span>
            <span>Present Day</span>
        </div>
        
        <div className="flex h-16 w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            {eras.map((era) => (
                <div
                    key={era.id}
                    onMouseEnter={() => setHovered(era.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative h-full transition-all duration-500 ease-out cursor-pointer ${era.color} flex items-center justify-center border-r border-black/20`}
                    style={{ 
                        width: hovered === era.id ? "40%" : hovered ? "15%" : era.width,
                        opacity: hovered && hovered !== era.id ? 0.5 : 1
                    }}
                    onClick={() => window.location.href = era.link}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/20" />
                    
                    {/* Label Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center whitespace-nowrap overflow-hidden">
                        <span className={`font-bold font-serif text-white drop-shadow-md transition-all ${hovered === era.id ? "text-lg" : "text-xs opacity-70"}`}>
                            {era.label}
                        </span>
                        {hovered === era.id && (
                            <span className="text-[10px] font-mono text-white/80 animate-fadeIn mt-1">
                                {era.range}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}