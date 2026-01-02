"use client";
import Link from "next/link";
import AeroBackground from "@/app/applied-science/engineering/aerospace/AeroBackground";
import LiftLab from "@/app/applied-science/engineering/aerospace/LiftLab";
import { 
  ArrowLeft, Rocket, Plane, Wind, 
  Satellite, Gauge, Globe2
} from "lucide-react";

export default function AerospacePage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <AeroBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science/engineering" className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Engineering
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-slate-900 border border-blue-500/50 rounded">
                    <Rocket size={18} className="text-orange-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    AEROSPACE
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-blue-300/50 uppercase tracking-widest">
            Ad Astra Per Aspera
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Defying Gravity</h2>
                            <p className="text-sm text-blue-100/80 leading-relaxed mb-6">
                                Aerospace engineering deals with the design, development, testing, and production of aircraft, spacecraft, and propulsion systems. It operates at the extreme limits of physics—where air becomes a solid wall and heat can melt steel.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Plane size={14} className="text-blue-400" />
                                    <span className="text-xs font-mono">Aero (Earth)</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Rocket size={14} className="text-orange-400" />
                                    <span className="text-xs font-mono">Astro (Space)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

[Image of forces on an aircraft in flight]


                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Wind className="text-blue-500" size={20} />
                                <h3 className="font-bold text-white">Aerodynamics</h3>
                            </div>
                            <p className="text-xs text-slate-400">
                                Fluid dynamics. How air flows around objects to generate Lift and Drag.
                            </p>
                        </div>

                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-orange-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Rocket className="text-orange-500" size={20} />
                                <h3 className="font-bold text-white">Propulsion</h3>
                            </div>
                            <p className="text-xs text-slate-400">
                                Engines. Jet turbines, rocket nozzles, and ion thrusters. Newton's 3rd Law.
                            </p>
                        </div>
                        
                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-emerald-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Gauge className="text-emerald-500" size={20} />
                                <h3 className="font-bold text-white">Avionics</h3>
                            </div>
                            <p className="text-xs text-slate-400">
                                The nervous system. Sensors, communications, and fly-by-wire control systems.
                            </p>
                        </div>

                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-purple-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Satellite className="text-purple-500" size={20} />
                                <h3 className="font-bold text-white">Orbital Mechanics</h3>
                            </div>
                            <p className="text-xs text-slate-400">
                                Astrodynamics. Trajectories, Hohmann transfers, and the gravity well.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <LiftLab />

                    {/* ROCKET ENGINE CARD */}
                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Rocket size={18} className="text-orange-500" /> The De Laval Nozzle
                        </h3>
                        
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            The secret to supersonic exhaust. By narrowing the throat (converging) and then widening it (diverging), rocket engines convert high pressure heat into high velocity thrust.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}