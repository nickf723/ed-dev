"use client";
import Link from "next/link";
import { 
  Blocks, Variable, Triangle, Grid3X3, Activity, 
  BarChart3, Key, BookOpen 
} from "lucide-react";
import { useState } from "react";

const PLANETS = [
  { id: "foundations", label: "Foundations", icon: Blocks, radius: 180, speed: 20, color: "text-rose-400", bg: "bg-rose-500", desc: "K-6 Arithmetic" },
  { id: "discrete", label: "Discrete", icon: Grid3X3, radius: 260, speed: 35, color: "text-cyan-400", bg: "bg-cyan-500", desc: "Logic & Sets" },
  { id: "algebra", label: "Algebra", icon: Variable, radius: 340, speed: 50, color: "text-amber-400", bg: "bg-amber-500", desc: "Structures" },
  { id: "geometry", label: "Geometry", icon: Triangle, radius: 420, speed: 65, color: "text-emerald-400", bg: "bg-emerald-500", desc: "Space & Form" },
  { id: "number-theory", label: "Number Theory", icon: Key, radius: 500, speed: 80, color: "text-fuchsia-400", bg: "bg-fuchsia-500", desc: "Integers" },
  { id: "calculus", label: "Calculus", icon: Activity, radius: 580, speed: 95, color: "text-blue-400", bg: "bg-blue-500", desc: "Change" },
  { id: "statistics", label: "Statistics", icon: BarChart3, radius: 660, speed: 110, color: "text-violet-400", bg: "bg-violet-500", desc: "Data" },
];

export default function MathOrrery() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden perspective-[2000px]">
      
      {/* 3D TILT CONTAINER */}
      <div className="relative transform-style-3d rotate-x-[60deg] scale-75 md:scale-100 transition-transform duration-1000">
        
        {/* THE SUN (Euler's Identity) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 group cursor-default">
            {/* Sun Glow */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse-slow" />
            
            {/* Sun Core (Counter-rotated to face user) */}
            <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] transform -rotate-x-[60deg]">
                <div className="text-center">
                    <div className="font-serif italic text-4xl font-bold text-black mb-1">e<sup className="text-sm">iπ</sup></div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">The Core</div>
                </div>
            </div>
        </div>

        {/* ORBITS & PLANETS */}
        {PLANETS.map((planet, index) => {
            const isHovered = hovered === planet.id;
            const isDimmed = hovered && !isHovered;

            return (
                <div 
                    key={planet.id}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500
                        ${isHovered ? "border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "border-white/5"}
                        ${isDimmed ? "opacity-20" : "opacity-100"}
                    `}
                    style={{ 
                        width: planet.radius * 2, 
                        height: planet.radius * 2,
                    }}
                >
                    {/* ORBITING BODY WRAPPER */}
                    <div 
                        className={`absolute w-full h-full animate-spin-linear`}
                        style={{ 
                            animationDuration: `${planet.speed}s`,
                            animationPlayState: hovered ? 'paused' : 'running'
                        }}
                    >
                        {/* THE PLANET (Positioned on the ring) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            
                            {/* COUNTER-ROTATION WRAPPER (Keeps content facing user) */}
                            <div 
                                className="transform -rotate-x-[60deg] transition-all duration-300"
                                style={{ scale: isHovered ? '1.2' : '1' }}
                            >
                                <Link 
                                    href={`/formal-science/mathematics/${planet.id}`}
                                    onMouseEnter={() => setHovered(planet.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="group/planet relative flex flex-col items-center justify-center"
                                >
                                    {/* Icon Sphere */}
                                    <div className={`
                                        w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/20 
                                        flex items-center justify-center shadow-xl transition-all duration-300
                                        group-hover/planet:border-white group-hover/planet:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                                    `}>
                                        <planet.icon size={20} className={planet.color} />
                                    </div>
                                    
                                    {/* Planet Label */}
                                    <div className={`
                                        mt-4 text-center transition-all duration-300
                                        ${isHovered ? "opacity-100 translate-y-0" : "opacity-60 translate-y-2"}
                                    `}>
                                        <div className="text-sm font-bold text-white tracking-widest uppercase bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                            {planet.label}
                                        </div>
                                        {isHovered && (
                                            <div className="text-[10px] text-zinc-400 font-mono mt-1 bg-black/80 px-2 py-1 rounded">
                                                {planet.desc}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}

      </div>
      
      {/* STATIC OVERLAY INFO */}
      <div className="absolute bottom-12 left-0 w-full text-center pointer-events-none">
         <div className="inline-block px-6 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-xs text-zinc-500 font-mono uppercase tracking-[0.2em] animate-pulse">
             System Status: Orbital Alignment
         </div>
      </div>

    </div>
  );
}