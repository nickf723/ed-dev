"use client";
import Link from "next/link";
import SoftwareBackground from "@/app/applied-science/engineering/software/SoftwareBackground";
import BigORace from "@/app/applied-science/engineering/software/BigORace";
import { 
  ArrowLeft, Code, Terminal, Layers, Globe, 
  Smartphone, Database, ShieldCheck, Cpu, GitBranch
} from "lucide-react";

// --- CONFIG: DISCIPLINES ---
const DISCIPLINES = [
  {
    id: "frontend", title: "Frontend", icon: Layers,
    desc: "Building the visual interface. React, CSS, UX.",
    color: "text-blue-400", border: "border-blue-500/20",
    href: "/applied-science/engineering/software/frontend"
  },
  {
    id: "backend", title: "Backend", icon: Database,
    desc: "Server-side logic, APIs, and databases.",
    color: "text-green-400", border: "border-green-500/20",
    href: "/applied-science/engineering/software/backend"
  },
  {
    id: "devops", title: "DevOps", icon: Terminal,
    desc: "Infrastructure, CI/CD, and cloud scaling.",
    color: "text-orange-400", border: "border-orange-500/20",
    href: "/applied-science/engineering/software/devops"
  },
  {
    id: "embedded", title: "Embedded", icon: Cpu,
    desc: "Coding close to the metal (IoT, Firmware).",
    color: "text-purple-400", border: "border-purple-500/20",
    href: "/applied-science/engineering/software/embedded"
  },
  {
    id: "security", title: "Security", icon: ShieldCheck,
    desc: "Protecting systems from exploits and attacks.",
    color: "text-red-400", border: "border-red-500/20",
    href: "/applied-science/engineering/software/security"
  },
  {
    id: "ai", title: "AI/ML Eng", icon: Smartphone, // Using phone as generic tech icon
    desc: "Implementing and scaling machine learning models.",
    color: "text-pink-400", border: "border-pink-500/20",
    href: "/applied-science/engineering/software/ai-ml"
  }
];

export default function SoftwarePage() {
  return (
    <main className="relative min-h-screen bg-[#1e1e1e] text-zinc-300 overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SoftwareBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#1e1e1e]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/applied-science/engineering" className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Engineering
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-[#007acc] rounded">
                    <Code size={18} className="text-white" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    SOFTWARE
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Compiling Reality...
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE DISCIPLINES */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD (IDE STYLE) */}
                    <div className="bg-[#252526] border border-[#3e3e42] rounded-xl p-0 overflow-hidden shadow-2xl font-mono text-sm">
                        {/* Tab Bar */}
                        <div className="flex items-center bg-[#2d2d2d] border-b border-[#1e1e1e]">
                            <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-white flex items-center gap-2">
                                <span className="text-yellow-400">JS</span> definition.ts
                            </div>
                        </div>
                        {/* Code Body */}
                        <div className="p-6 text-zinc-300 leading-relaxed">
                            <p><span className="text-pink-400">const</span> <span className="text-blue-400">SoftwareEngineering</span> = <span className="text-yellow-400">{"{"}</span></p>
                            <p className="pl-4">
                                <span className="text-sky-300">definition</span>: <span className="text-orange-300">"The application of engineering to software development"</span>,
                            </p>
                            <p className="pl-4">
                                <span className="text-sky-300">corePrinciple</span>: <span className="text-orange-300">"DRY (Don't Repeat Yourself)"</span>,
                            </p>
                            <p className="pl-4">
                                <span className="text-sky-300">goal</span>: <span className="text-orange-300">"Manage complexity"</span>
                            </p>
                            <p className="text-yellow-400">{"}"}</p>
                        </div>
                    </div>

                    

[Image of software architecture diagram]


                    {/* DYNAMIC DISCIPLINES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DISCIPLINES.map((d) => (
                            <Link
                                key={d.id}
                                href={`/applied-science/engineering/software/${d.id}`}
                                className={`
                                    flex flex-col p-5 rounded-xl border bg-[#252526] hover:bg-[#2d2d2d] transition-colors
                                    ${d.border}
                                `}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <d.icon className={d.color} size={18} />
                                    <h3 className="font-bold text-zinc-100 text-sm">{d.title}</h3>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    {d.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <BigORace />

                    {/* ABSTRACTION CARD */}
                    <div className="bg-[#252526] border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <GitBranch size={18} className="text-purple-400" /> Abstraction
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            Software engineering is the art of hiding complexity. We build layers upon layers (Transistors → Assembly → C → Python → AI) so that we can solve massive problems without thinking about the electrons.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}