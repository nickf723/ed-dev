"use client";
import Link from "next/link";
import CircuitBoardBackground from "./CircuitBoardBackground";
import OhmsLawLab from "./OhmsLawLab";
import { 
  Zap, Cpu, Radio, BatteryCharging, 
  Activity, Server, ArrowRight, MousePointer2 
} from "lucide-react";
import ElectricBackground from "./ElectricBackground";

export default function ElectricalEngineeringPage() {
  const subfields = [
    { title: "Power Systems", icon: Zap, color: "text-amber-400", desc: "Generation, transmission, and distribution of energy.", href: "/applied-science/engineering/electrical/power-systems" },
    { title: "Electronics", icon: Cpu, color: "text-blue-400", desc: "Design of circuits, transistors, and microchips.", href: "/applied-science/engineering/electrical/electronics" },
    { title: "Telecommunications", icon: Radio, color: "text-cyan-400", desc: "Transmission of information via cables or radio waves.", href: "/applied-science/engineering/electrical/telecommunications" },
    { title: "Control Systems", icon: Activity, color: "text-emerald-400", desc: "Automation and dynamic system behavior.", href: "/applied-science/engineering/electrical/control-systems" },
    { title: "Embedded Systems", icon: Server, color: "text-purple-400", desc: "Computing within larger mechanical systems.", href: "/applied-science/engineering/electrical/embedded-systems" },
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] text-slate-200 overflow-hidden font-sans selection:bg-amber-500/30">
     
      <CircuitBoardBackground /> 
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO HEADER */}
        <header className="mb-16 border-b border-amber-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded">
              <Zap className="text-amber-400 animate-pulse" size={20} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400">
              Engineering // Electrical
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            ELEC<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">TRICAL</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-amber-500/50 pl-6">
            The study and application of electricity, electronics, and electromagnetism. It powers our cities, drives our computation, and connects our world.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: SUBFIELDS */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Theory Intro */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BatteryCharging className="text-amber-400" /> The Flow of Charge
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                At its core, electrical engineering manipulates the flow of electrons to do work. Whether it's gigawatts on a grid or nanowatts in a processor, the fundamental laws—<strong className="text-amber-300">Maxwell's Equations</strong> and <strong className="text-amber-300">Ohm's Law</strong>—remain the same.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Core Disciplines</h3>
              <div className="grid grid-cols-1 gap-3">
                {subfields.map((s) => (
                  <div key={s.title} className="group relative p-4 bg-black/40 border border-white/5 hover:border-amber-500/50 rounded-xl transition-all hover:translate-x-2">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                        <s.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-white">{s.title}</h4>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
                        </div>
                        <p className="text-xs text-slate-500">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-5 space-y-6">
            <OhmsLawLab />
            
            {/* Component Reference */}
            <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-black/40 border border-white/10 rounded-xl text-center">
                    <div className="text-lg font-bold text-white mb-1">R</div>
                    <div className="text-[9px] text-slate-500 uppercase">Resistor</div>
                    <div className="text-[8px] text-slate-600">Limits Current</div>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-xl text-center">
                    <div className="text-lg font-bold text-white mb-1">C</div>
                    <div className="text-[9px] text-slate-500 uppercase">Capacitor</div>
                    <div className="text-[8px] text-slate-600">Stores Charge</div>
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-xl text-center">
                    <div className="text-lg font-bold text-white mb-1">L</div>
                    <div className="text-[9px] text-slate-500 uppercase">Inductor</div>
                    <div className="text-[8px] text-slate-600">Resists Change</div>
                </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 opacity-50 text-[10px] text-slate-500 font-mono">
                <MousePointer2 size={12} /> INTERACTIVE SIMULATION ACTIVE
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}