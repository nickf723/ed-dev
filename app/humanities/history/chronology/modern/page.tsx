"use client";
import Link from "next/link";
import ModernBackground from "@/app/humanities/history/modern/ModernBackground";
import AccelerationGraph from "@/app/humanities/history/modern/AccelerationGraph";
import { 
  ArrowLeft, Factory, Globe, Rocket, Radio, 
  Cpu, Activity
} from "lucide-react";

export default function ModernPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-200 overflow-hidden selection:bg-cyan-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <ModernBackground />
      
      {/* OVERLAY: Scanlines & Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-0 opacity-20" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto">
             <Link href="/humanities/history" className="flex items-center gap-2 text-xs font-mono text-cyan-600 hover:text-cyan-500 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> History // Modern
             </Link>
             <div className="flex items-center gap-4">
                 <div className="p-3 bg-zinc-900 border border-cyan-500/20 rounded-md shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <Activity size={32} className="text-cyan-500" />
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl">
                    MODERNITY
                 </h1>
             </div>
             <p className="mt-4 text-zinc-400 max-w-xl text-lg border-l-2 border-cyan-900 pl-4 font-mono">
                 1789 - Present. The era of machines, total war, and information. The world shrinks as the pace of change accelerates.
             </p>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: THE THREE REVOLUTIONS */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* INDUSTRIAL REVOLUTION */}
                <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 p-8 rounded-xl relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Factory size={24} className="text-orange-500" />
                        <h2 className="text-2xl font-bold text-white">The Industrial Revolution</h2>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        The shift from hand production to machines. Steam power, fossil fuels, and the rise of factories fundamentally altered human society and the environment.
                    </p>
                    <div className="flex gap-2 font-mono text-xs">
                        <span className="bg-black/30 px-3 py-1 rounded text-orange-200/60 border border-white/5">Steam Engine (1769)</span>
                        <span className="bg-black/30 px-3 py-1 rounded text-orange-200/60 border border-white/5">Telegraph (1844)</span>
                    </div>
                </div>

                {/* THE AGE OF EXTREMES (20th Century) */}
                <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 p-8 rounded-xl relative overflow-hidden group hover:border-rose-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe size={24} className="text-rose-500" />
                        <h2 className="text-2xl font-bold text-white">The Age of Extremes</h2>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        The 20th century saw the deadliest conflicts in history (WWI, WWII) and the ideological battle between Capitalism and Communism. It ended with the splitting of the atom and the exploration of space.
                    </p>
                    

[Image of Saturn V rocket]

                    <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mt-2">
                        <Rocket size={14} /> <span>1969: MOON LANDING</span>
                    </div>
                </div>

                {/* THE DIGITAL REVOLUTION */}
                <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 p-8 rounded-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Cpu size={24} className="text-cyan-500" />
                        <h2 className="text-2xl font-bold text-white">The Information Age</h2>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        The transition from mechanical/analog to digital electronics. The Internet has democratized information, created a global economy, and introduced the age of Artificial Intelligence.
                    </p>
                </div>

            </div>


            {/* RIGHT: DATA & METRICS */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <AccelerationGraph />

                {/* GLOBALIZATION */}
                <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Radio size={18} className="text-emerald-400" /> Globalization
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        The compression of time and space. Culture, capital, and people move freely across borders, creating a singular global system.
                    </p>
                    {/* Visual: Connectivity lines */}
                    <div className="h-16 w-full bg-black/40 rounded border border-white/5 relative overflow-hidden">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/20" />
                        <div className="absolute top-0 left-1/2 h-full w-[1px] bg-emerald-500/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}