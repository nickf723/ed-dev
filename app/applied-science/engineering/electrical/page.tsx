"use client";
import Link from "next/link";
import ElectricBackground from "@/app/applied-science/engineering/electrical/ElectricBackground";
import Oscilloscope from "@/app/applied-science/engineering/electrical/Oscilloscope";
import CircuitGame from "@/app/applied-science/engineering/electrical/CircuitGame";
import { 
  ArrowLeft, Zap, Cpu, Radio, Battery, 
  Lightbulb, Triangle, CheckCircle2
} from "lucide-react";

export default function ElectricalPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-zinc-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <ElectricBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#020617]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science/engineering" className="flex items-center gap-2 text-xs font-mono text-cyan-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Engineering
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-slate-900 border border-cyan-500/50 rounded">
                    <Zap size={18} className="text-cyan-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    ELECTRICAL
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">
            Harnessing the Electron
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES (Concepts) */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Invisible Force</h2>
                            <p className="text-sm text-cyan-100/80 leading-relaxed mb-6">
                                Electrical engineering is the study and application of electricity, electronics, and electromagnetism. From the microscopic transistors in your phone to the massive turbines in a dam, it is the discipline that powers the modern age.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Battery size={14} className="text-cyan-400" />
                                    <span className="text-xs font-mono">Power</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Radio size={14} className="text-cyan-400" />
                                    <span className="text-xs font-mono">Signals</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OHM'S LAW BANNER */}
                    <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-white/10 p-6 rounded-xl flex items-center justify-between gap-6">
                        <div>
                            <h3 className="font-bold text-white mb-1">Ohm's Law</h3>
                            <p className="text-xs text-slate-400">
                                The relationship between Voltage (V), Current (I), and Resistance (R).
                            </p>
                        </div>
                        <div className="text-2xl font-mono font-bold text-cyan-400 bg-black/20 px-4 py-2 rounded border border-cyan-500/30">
                            V = IR
                        </div>
                    </div>

                    

[Image of basic electrical circuit diagram]


                    {/* AC/DC CARD */}
                    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Triangle size={18} className="text-yellow-500 fill-yellow-500" /> AC vs DC
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-black/20 p-4 rounded border border-white/5">
                                <h4 className="text-xs font-bold text-cyan-100 mb-1 flex items-center gap-2"><CheckCircle2 size={12}/> Direct Current (DC)</h4>
                                <p className="text-[10px] text-slate-400">Flows in one direction (Edison). Used in batteries and electronics.</p>
                            </div>
                            <div className="bg-black/20 p-4 rounded border border-white/5">
                                <h4 className="text-xs font-bold text-green-100 mb-1 flex items-center gap-2"><Radio size={12}/> Alternating Current (AC)</h4>
                                <p className="text-[10px] text-slate-400">Reverses direction periodically (Tesla). Used for long-distance power.</p>
                            </div>
                        </div>
                    </div>

                    {/* DOMAINS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-cyan-500/30 transition-colors group">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2"><Zap size={16} className="text-cyan-500"/> Power</h3>
                            <p className="text-xs text-slate-400">Grid infrastructure, motors, and generators.</p>
                        </div>
                        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl hover:border-green-500/30 transition-colors group">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2"><Cpu size={16} className="text-green-500"/> Electronics</h3>
                            <p className="text-xs text-slate-400">Semiconductors, PCBs, and integrated circuits.</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT: THE INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* 1. VISUALIZER */}
                    <div className="w-full relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <Oscilloscope />
                    </div>

                    {/* 2. THE GAME */}
                    <div className="w-full relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <CircuitGame />
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}