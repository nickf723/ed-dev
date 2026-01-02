"use client";
import Link from "next/link";
import BlueprintBackground from "@/app/applied-science/engineering/BlueprintBackground";
import GearMechanic from "@/app/applied-science/engineering/GearMechanic";
import { 
  ArrowLeft, Hammer, PenTool, Cpu, Zap, 
  FlaskConical, Rocket, Wrench, Building2, 
  Settings, ArrowUpRight, Code
} from "lucide-react";

// --- CONFIGURATION: EDIT DISCIPLINES HERE ---
const DISCIPLINES = [
  {
    id: "civil",
    title: "Civil Engineering",
    icon: Building2,
    desc: "The design and construction of public works: bridges, dams, and infrastructure.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  {
    id: "mechanical",
    title: "Mechanical Eng.",
    icon: Settings, // or Hammer
    desc: "The branch involving machinery, thermodynamics, and mechanical systems.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
  {
    id: "electrical",
    title: "Electrical Eng.",
    icon: Zap,
    desc: "The study of electricity, electronics, and electromagnetism.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    id: "aerospace",
    title: "Aerospace Eng.",
    icon: Rocket,
    desc: "The development of aircraft and spacecraft.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20"
  },
  {
    id: "chemical",
    title: "Chemical Eng.",
    icon: FlaskConical,
    desc: "Turning raw materials into useful products through chemical processes.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    id: "software",
    title: "Software Eng.",
    icon: Code,
    desc: "The systematic application of engineering approaches to software development.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20"
  }
];

export default function EngineeringPage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-zinc-200 overflow-hidden font-sans selection:bg-orange-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <BlueprintBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#172554]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             {/* Back to Parent (Applied Science) */}
             <Link href="/applied-science" className="flex items-center gap-2 text-xs font-mono text-blue-300/50 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Applied Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-blue-900 border border-white/10 rounded">
                    <Hammer size={18} className="text-white" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    ENGINEERING
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-blue-300/50 uppercase tracking-widest">
            The Application of Science
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES GRID */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-blue-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Building the World</h2>
                            <p className="text-sm text-blue-200 leading-relaxed mb-6">
                                Scientists ask "Why?" Engineers ask "How?" <br/>
                                This is the rigorous application of scientific principles to design, build, and maintain the systems that power modern civilization.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <PenTool size={14} className="text-orange-400" />
                                    <span className="text-xs font-mono">Design</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Wrench size={14} className="text-orange-400" />
                                    <span className="text-xs font-mono">Build</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DISCIPLINES.map((discipline) => (
                            <Link 
                                key={discipline.id} 
                                href={`/applied-science/engineering/${discipline.id}`}
                                className={`
                                    group flex flex-col p-5 rounded-xl border backdrop-blur-sm bg-blue-900/40 transition-all duration-300 
                                    hover:-translate-y-1 hover:shadow-xl hover:bg-blue-900/60
                                    ${discipline.border}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <discipline.icon className={discipline.color} size={20} />
                                        <h3 className="font-bold text-white text-sm">{discipline.title}</h3>
                                    </div>
                                    <ArrowUpRight size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-blue-200/60 leading-relaxed">
                                    {discipline.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <GearMechanic />

                    {/* ENGINEERING METHOD CARD */}
                    <div className="bg-blue-900/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2">The Design Process</h3>
                        

[Image of engineering design cycle]

                        <ol className="text-xs text-blue-200/70 space-y-2 list-decimal list-inside font-mono">
                            <li>Define the Problem</li>
                            <li>Do Background Research</li>
                            <li>Specify Requirements</li>
                            <li>Brainstorm Solutions</li>
                            <li>Prototype & Test</li>
                            <li>Iterate</li>
                        </ol>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}