"use client";
import Link from "next/link";
import MechanicalBackground from "@/app/applied-science/engineering/mechanical/MechanicalBackground";
import SteamEngine from "@/app/applied-science/engineering/mechanical/SteamEngine";
import { 
  ArrowLeft, Settings, Wrench, Truck, Fan, 
  Thermometer, Bot, Layers, ArrowUpRight
} from "lucide-react";

// --- CONFIGURATION: SUB-DISCIPLINES ---
const DISCIPLINES = [
  {
    id: "thermo", title: "Thermodynamics", icon: Thermometer,
    desc: "Heat, work, temperature, and energy. The engine of the universe.",
    color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20"
  },
  {
    id: "robotics", title: "Robotics & Control", icon: Bot,
    desc: "Designing autonomous machines and the systems that guide them.",
    color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20"
  },
  {
    id: "fluids", title: "Fluid Mechanics", icon: Fan,
    desc: "The behavior of liquids and gases in motion (aerodynamics, hydraulics).",
    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20"
  },
  {
    id: "materials", title: "Materials Science", icon: Layers,
    desc: "Understanding and creating materials with specific properties (strength, lightness).",
    color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20"
  },
  {
    id: "automotive", title: "Automotive Eng.", icon: Truck,
    desc: "The design and manufacture of vehicles and their subsystems.",
    color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20"
  },
];

export default function MechanicalPage() {
  return (
    <main className="relative min-h-screen bg-[#1c1917] text-zinc-200 overflow-hidden font-sans selection:bg-amber-500/30">
      
      {/* 1. VISUAL ENGINE (Scroll-driven) */}
      <MechanicalBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-amber-900/30 bg-[#1c1917]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science/engineering" className="flex items-center gap-2 text-xs font-mono text-amber-500/50 hover:text-amber-300 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Engineering
             </Link>
             <div className="h-4 w-px bg-amber-500/20" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-amber-950/50 border border-amber-500/50 rounded">
                    <Settings size={18} className="text-amber-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    MECHANICAL
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-amber-500/50 uppercase tracking-widest">
            Masters of Motion
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES GRID */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-[#292524]/80 backdrop-blur-md border border-amber-700/30 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
                        {/* Decorative Gear */}
                        <Settings size={200} className="absolute -top-20 -right-20 text-amber-950/30 animate-spin-slow" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4 font-serif">The Physics of Doing</h2>
                            <p className="text-sm text-amber-100/80 leading-relaxed mb-6">
                                Mechanical engineering is one of the broadest and oldest engineering disciplines. It applies the principles of <strong className="text-amber-400">physics</strong> and <strong className="text-amber-400">materials science</strong> for the design, analysis, manufacturing, and maintenance of mechanical systems. If it moves, a mechanical engineer probably designed it.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-amber-900/50">
                                    <Wrench size={14} className="text-amber-500" />
                                    <span className="text-xs font-mono text-amber-200">Force</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-amber-900/50">
                                    <Settings size={14} className="text-amber-500 animate-spin" style={{animationDuration: '5s'}} />
                                    <span className="text-xs font-mono text-amber-200">Motion</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DISCIPLINES.map((d) => (
                            <Link 
                                key={d.id} 
                                href={`/applied-science/engineering/mechanical/${d.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-[#292524]/60 transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(0,0,0,0.3)] hover:bg-[#292524]/90
                                    ${d.border}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${d.bg}`}>
                                            <d.icon className={d.color} size={18} />
                                        </div>
                                        <h3 className="font-bold text-white text-sm font-serif">{d.title}</h3>
                                    </div>
                                    <ArrowUpRight size={16} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center sticky top-24">
                    
                    {/* WIDGET */}
                    <SteamEngine />

                    {/* CALL TO ACTION */}
                    <div className="bg-[#292524]/60 border border-amber-700/30 rounded-xl p-4 w-full text-center">
                        <p className="text-xs text-amber-200/70 font-mono animate-pulse">
                            <span className="text-amber-500">SCROLL DOWN</span> TO POWER THE MACHINE
                        </p>
                    </div>

                </div>

            </div>
      </div>
      
      {/* Extra scroll space to drive the animation */}
      <div className="h-[50vh]" /> 

    </main>
  );
}